import fetch from 'node-fetch'

const SYMBOLS = {
  gold: "GC=F",
  silver: "SI=F"
}

const RANGES = {
  "1W": { range: "5d", interval: "1d" },
  "1M": { range: "1mo", interval: "1d" },
  "6M": { range: "6mo", interval: "1d" },
  "1Y": { range: "1y", interval: "1d" },
  "5Y": { range: "5y", interval: "1d" }
}

function toSeries(json) {
  const r = json?.chart?.result?.[0]
  if (!r) throw new Error("Unexpected Yahoo response")
  const tz = r.meta?.timezone || "UTC"
  const timestamps = r.timestamp?.map(ts => ts * 1000) || []
  const closes = r.indicators?.quote?.[0]?.close || []
  return { timestamps, closes, timezone: tz, meta: r.meta }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const metal = (req.query.metal || "gold").toLowerCase()
    const tf = (req.query.tf || "1W").toUpperCase()

    if (!SYMBOLS[metal]) {
      return res.status(400).json({ error: "Invalid metal. Use gold or silver." })
    }
    if (!RANGES[tf]) {
      return res.status(400).json({ error: "Invalid timeframe. Use 1W,1M,6M,1Y,5Y." })
    }

    const symbol = SYMBOLS[metal]
    const { range, interval } = RANGES[tf]
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`

    const resp = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; novara-gold-charts/1.0)"
      }
    })

    if (!resp.ok) {
      const text = await resp.text()
      return res.status(resp.status).json({ error: "Upstream error", details: text.slice(0, 500) })
    }

    const json = await resp.json()
    const series = toSeries(json)
    const payload = {
      symbol,
      range,
      interval,
      ...series
    }

    res.json(payload)
  } catch (err) {
    res.status(500).json({ error: err.message || "Server error" })
  }
}
