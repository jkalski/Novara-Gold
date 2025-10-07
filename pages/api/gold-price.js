// Server-side gold price caching
// Fetches from Metalprice API twice per day and caches the result

let cachedData = null
let lastFetchTime = 0
const FETCH_INTERVAL = 12 * 60 * 60 * 1000 // 12 hours (twice per day)

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
          if (goldPrice < 100) goldPrice = goldPrice * 31.1035
          if (goldPrice < 1000 || goldPrice > 10000) goldPrice = 3899.30
          metals.gold = goldPrice
        }
        
        // Silver (XAG) 
        if (data.rates.XAG) {
          let silverPrice = data.rates.XAG
          if (silverPrice < 1) silverPrice = silverPrice * 31.1035
          if (silverPrice < 10 || silverPrice > 100) silverPrice = 47.53
          metals.silver = silverPrice
        }
        
        // Platinum (XPT)
        if (data.rates.XPT) {
          let platinumPrice = data.rates.XPT
          if (platinumPrice < 100) platinumPrice = platinumPrice * 31.1035
          if (platinumPrice < 500 || platinumPrice > 5000) platinumPrice = 1598.00
          metals.platinum = platinumPrice
        }
        
        // Palladium (XPD)
        if (data.rates.XPD) {
          let palladiumPrice = data.rates.XPD
          if (palladiumPrice < 100) palladiumPrice = palladiumPrice * 31.1035
          if (palladiumPrice < 500 || palladiumPrice > 5000) palladiumPrice = 1290.80
          metals.palladium = palladiumPrice
        }
        
        // Calculate price changes if we have previous data
        let priceChanges = {}
        if (cachedData && cachedData.gold) {
          priceChanges = {
            gold: ((metals.gold - cachedData.gold) / cachedData.gold) * 100,
            silver: ((metals.silver - cachedData.silver) / cachedData.silver) * 100,
            platinum: ((metals.platinum - cachedData.platinum) / cachedData.platinum) * 100,
            palladium: ((metals.palladium - cachedData.palladium) / cachedData.palladium) * 100
          }
        } else {
          // First time or no previous data
          priceChanges = {
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
