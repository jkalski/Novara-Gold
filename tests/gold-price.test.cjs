const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const source = fs.readFileSync(path.join(__dirname, '../pages/api/gold-price.js'), 'utf8')
  .replace('export default async function handler', 'async function handler')
const symbols = { gold: 'XAU', silver: 'XAG', platinum: 'XPT', palladium: 'XPD' }
const closing = { gold: 4000, silver: 50, platinum: 1500, palladium: 1000 }
const current = { gold: 4040, silver: 49, platinum: 1500, palladium: 1030 }

function setup() {
  let now = Date.parse('2026-09-29T18:00:00Z')
  const state = { current, closing, failHistory: false, requests: [] }
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])) }
    static now() { return now }
  }
  const context = vm.createContext({
    Date: Clock,
    process: { env: { METALPRICE_API_KEY: 'test-key' } },
    console: { log() {}, error() {} },
    fetch: async (url) => {
      const endpoint = new URL(url).pathname.split('/').pop()
      state.requests.push(endpoint)
      if (endpoint !== 'latest' && state.failHistory) {
        return { ok: true, json: async () => ({ success: false }) }
      }
      const prices = endpoint === 'latest' ? state.current : state.closing
      return {
        ok: true,
        json: async () => ({
          success: true,
          timestamp: (state.quoteTime ?? now) / 1000,
          rates: Object.fromEntries(Object.entries(symbols).map(([metal, symbol]) => [symbol, 1 / prices[metal]])),
        }),
      }
    },
  })
  vm.runInContext(source, context)
  state.advance = (ms) => { now += ms }
  state.get = async () => {
    let body
    await context.handler({}, { status(code) { assert.equal(code, 200); return this }, json(data) { body = data } })
    return body
  }
  return state
}

test('cold start returns positive, negative and zero changes against the prior close', async () => {
  const state = setup()
  const data = await state.get()
  for (const [metal, expected] of Object.entries({ gold: 1, silver: -2, platinum: 0, palladium: 3 })) {
    assert.ok(Math.abs(data.priceChanges[metal] - expected) < 1e-9)
  }
  assert.deepEqual(state.requests, ['latest', '2026-09-28'])
})

test('30-minute cache and daily baseline reuse limit requests while changes track new prices', async () => {
  const state = setup()
  await state.get()
  await state.get()
  assert.equal(state.requests.length, 2)
  state.advance(31 * 60 * 1000)
  state.current = { ...current, gold: 4080 }
  const data = await state.get()
  assert.ok(Math.abs(data.priceChanges.gold - 2) < 1e-9)
  assert.deepEqual(state.requests, ['latest', '2026-09-28', 'latest'])
})

test('a new GMT quote day fetches a new closing baseline', async () => {
  const state = setup()
  await state.get()
  state.advance(24 * 60 * 60 * 1000)
  state.closing = current
  const data = await state.get()
  assert.equal(data.priceChanges.gold, 0)
  assert.equal(state.requests.at(-1), '2026-09-29')
})

test('historical failure preserves current prices and retries on the next refresh', async () => {
  const state = setup()
  state.failHistory = true
  const data = await state.get()
  assert.equal(data.gold, current.gold)
  assert.equal(Object.keys(data.priceChanges).length, 0)
  assert.equal(data.fallback, undefined)
  state.failHistory = false
  state.advance(31 * 60 * 1000)
  assert.ok((await state.get()).priceChanges.gold > 0)
})

test('failed rollover never uses the old baseline', async () => {
  const state = setup()
  await state.get()
  state.advance(24 * 60 * 60 * 1000)
  state.failHistory = true
  assert.equal(Object.keys((await state.get()).priceChanges).length, 0)
})

test('delayed quotes use their own previous day and invalid history is omitted', async () => {
  const state = setup()
  state.quoteTime = Date.parse('2026-09-28T23:00:00Z')
  state.closing = { ...closing, silver: 0 }
  const data = await state.get()
  assert.equal(state.requests.at(-1), '2026-09-27')
  assert.equal(Object.keys(data.priceChanges).length, 0)
})
