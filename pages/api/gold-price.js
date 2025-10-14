// Server-side gold price caching
// Fetches prices every 30 minutes, calculates price changes every 12 hours

let cachedData = null
let baselinePrices = null
let lastFetchTime = 0
let lastPriceChangeTime = 0
const FETCH_INTERVAL = 30 * 60 * 1000 // 30 minutes for price updates
const PRICE_CHANGE_INTERVAL = 12 * 60 * 60 * 1000 // 12 hours for price change calculations

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
      
      if (data && data.rates) {
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
        
        // Calculate price changes only every 12 hours
        let priceChanges = {}
        if (baselinePrices && (now - lastPriceChangeTime) > PRICE_CHANGE_INTERVAL) {
          priceChanges = {
            gold: ((metals.gold - baselinePrices.gold) / baselinePrices.gold) * 100,
            silver: ((metals.silver - baselinePrices.silver) / baselinePrices.silver) * 100,
            platinum: ((metals.platinum - baselinePrices.platinum) / baselinePrices.platinum) * 100,
            palladium: ((metals.palladium - baselinePrices.palladium) / baselinePrices.palladium) * 100
          }
          // Update baseline prices for next 12-hour comparison
          baselinePrices = { ...metals }
          lastPriceChangeTime = now
        } else if (!baselinePrices) {
          // First time - set baseline prices
          baselinePrices = { ...metals }
          lastPriceChangeTime = now
          priceChanges = {
            gold: 0,
            silver: 0,
            platinum: 0,
            palladium: 0
          }
        } else {
          // Use existing price changes
          priceChanges = cachedData?.priceChanges || {
            gold: 0,
            silver: 0,
            platinum: 0,
            palladium: 0
          }
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
