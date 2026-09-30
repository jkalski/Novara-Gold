// Server-side gold price caching
// Fetches prices every 30 minutes and compares against the previous GMT close.

let cachedData = null
let baselinePrices = null
let lastFetchTime = 0
let baselineDate = null
const FETCH_INTERVAL = 30 * 60 * 1000 // 30 minutes for price updates
const DAY = 24 * 60 * 60 * 1000

export default async function handler(req, res) {
  const now = Date.now()
  
  // Check if we need to fetch new data
  if (!cachedData || (now - lastFetchTime) > FETCH_INTERVAL) {
    try {
      console.log('Fetching fresh gold price data...')
      
      // Fetch from Metalprice API - get all metals in one call
      const apiKey = process.env.METALPRICE_API_KEY
      if (!apiKey) {
        throw new Error('METALPRICE_API_KEY environment variable is not set')
      }
      const response = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,XAG,XPT,XPD`)
      const data = await response.json()
      
      if (response.ok && data.success !== false && data.rates) {
        // Process all metals
        const metals = {}
        
        // Gold (XAU)
        if (data.rates.XAU) {
          let goldPrice = data.rates.XAU
          // Metalprice API returns price per troy ounce, convert if needed
          if (goldPrice < 1) goldPrice = 1 / goldPrice
          metals.gold = goldPrice
        }
        
        // Silver (XAG) 
        if (data.rates.XAG) {
          let silverPrice = data.rates.XAG
          // Metalprice API returns price per troy ounce, convert if needed
          if (silverPrice < 1) silverPrice = 1 / silverPrice
          metals.silver = silverPrice
        }
        
        // Platinum (XPT)
        if (data.rates.XPT) {
          let platinumPrice = data.rates.XPT
          // Metalprice API returns price per troy ounce, convert if needed
          if (platinumPrice < 1) platinumPrice = 1 / platinumPrice
          metals.platinum = platinumPrice
        }
        
        // Palladium (XPD)
        if (data.rates.XPD) {
          let palladiumPrice = data.rates.XPD
          // Metalprice API returns price per troy ounce, convert if needed
          if (palladiumPrice < 1) palladiumPrice = 1 / palladiumPrice
          metals.palladium = palladiumPrice
        }
        
        // Match the baseline to the quote's date, including delayed quotes.
        const quoteTime = Number.isFinite(data.timestamp) ? data.timestamp * 1000 : now
        const previousDate = new Date(quoteTime - DAY).toISOString().slice(0, 10)
        let priceChanges = {}
        try {
          if (!baselinePrices || baselineDate !== previousDate) {
            // One historical request covers all four metals; reuse it for the day.
            const historyResponse = await fetch(`https://api.metalpriceapi.com/v1/${previousDate}?api_key=${apiKey}&base=USD&currencies=XAU,XAG,XPT,XPD`)
            const history = await historyResponse.json()
            if (!historyResponse.ok || history.success === false || !history.rates) {
              throw new Error('Historical metal prices unavailable')
            }
            const nextBaseline = {}
            for (const [metal, symbol] of Object.entries({ gold: 'XAU', silver: 'XAG', platinum: 'XPT', palladium: 'XPD' })) {
              const rate = history.rates[symbol]
              if (!Number.isFinite(rate) || rate <= 0) {
                throw new Error('Invalid historical metal price')
              }
              nextBaseline[metal] = rate < 1 ? 1 / rate : rate
            }
            baselinePrices = nextBaseline
            baselineDate = previousDate
          }
          for (const [metal, price] of Object.entries(metals)) {
            if (Number.isFinite(price) && price > 0) {
              priceChanges[metal] = ((price - baselinePrices[metal]) / baselinePrices[metal]) * 100
            }
          }
        } catch {
          // Keep current prices if history fails; retry on the next price refresh.
          // Do not substitute a made-up zero or a baseline from the wrong day.
          console.error('Previous closing prices unavailable; price changes omitted')
        }

        // Cache the data with price changes
        cachedData = {
          ...metals,
          priceChanges,
          timestamp: now,
          lastUpdated: new Date().toISOString()
        }
        
        lastFetchTime = now
        console.log(`Cached metals prices:`, metals)
      } else {
        console.log('No valid data from Metalprice API')
        // Use fallback prices if API fails
        cachedData = {
          gold: 3899.30,
          silver: 47.53,
          platinum: 1598.00,
          palladium: 1290.80,
          timestamp: now,
          lastUpdated: new Date().toISOString(),
          fallback: true
        }
        lastFetchTime = now
      }
    } catch (error) {
      console.error('Error fetching metals prices:', error)
      // Use fallback prices if API fails
      cachedData = {
        gold: 3899.30,
        silver: 47.53,
        platinum: 1598.00,
        palladium: 1290.80,
        timestamp: now,
        lastUpdated: new Date().toISOString(),
        fallback: true
      }
      lastFetchTime = now
    }
  } else {
    console.log('Using cached gold price data')
  }
  
  // Return cached data
  res.status(200).json(cachedData)
}
