import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MarketChart() {
  const [timeframe, setTimeframe] = useState('1W')
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(3899.30)
  const [priceChange, setPriceChange] = useState(25.50)
  const [priceChangePercent, setPriceChangePercent] = useState(0.66)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [mounted, setMounted] = useState(false)
  const [metalPrices, setMetalPrices] = useState({})
  const [selectedMetal, setSelectedMetal] = useState('gold')


  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
    setLastUpdated(new Date())
  }, [])

  // Convert timeseries data to chart format
  const convertTimeseriesToChartData = (rates, timeframe) => {
    const chartData = []
    const sortedDates = Object.keys(rates).sort()
    
    sortedDates.forEach((date, index) => {
      const price = Math.round(rates[date].USDXAU * 100) / 100
      chartData.push({
        time: new Date(date).getTime(),
        price: price,
        date: date
      })
    })
    
    console.log(`Converted ${chartData.length} historical data points for ${timeframe}`)
    return chartData
  }

  // Convert Alpha Vantage data to chart format
  const convertAlphaVantageToChartData = (timeSeries) => {
    const chartData = []
    
    // Convert time series object to array and sort by timestamp
    const entries = Object.entries(timeSeries).map(([timestamp, data]) => ({
      timestamp: new Date(timestamp).getTime(),
      open: parseFloat(data['1. open']),
      high: parseFloat(data['2. high']),
      low: parseFloat(data['3. low']),
      close: parseFloat(data['4. close']),
      volume: parseInt(data['5. volume'])
    })).sort((a, b) => a.timestamp - b.timestamp)
    
    // Convert to chart format
    for (const entry of entries) {
      if (entry.close > 0) {
        chartData.push({
          time: new Date(entry.timestamp).toISOString(),
          price: Math.round(entry.close * 100) / 100,
          high: Math.round(entry.high * 100) / 100,
          low: Math.round(entry.low * 100) / 100,
          open: Math.round(entry.open * 100) / 100,
          volume: entry.volume,
          date: new Date(entry.timestamp).toISOString()
        })
      }
    }
    
    console.log(`Converted ${chartData.length} intraday data points from Alpha Vantage`)
    return chartData
  }

  // Convert Yahoo Finance data to chart format
  const convertYahooFinanceToChartData = (quote, meta) => {
    const chartData = []
    const timestamps = quote.timestamp || []
    const closes = quote.close || []
    const highs = quote.high || []
    const lows = quote.low || []
    const opens = quote.open || []
    
    // Use close prices for the chart
    for (let i = 0; i < timestamps.length; i++) {
      if (closes[i] !== null && closes[i] !== undefined && closes[i] > 0) {
        chartData.push({
          time: new Date(timestamps[i] * 1000).toISOString(), // Convert to ISO string
          price: Math.round(closes[i] * 100) / 100,
          high: highs[i] ? Math.round(highs[i] * 100) / 100 : null,
          low: lows[i] ? Math.round(lows[i] * 100) / 100 : null,
          open: opens[i] ? Math.round(opens[i] * 100) / 100 : null,
          date: new Date(timestamps[i] * 1000).toISOString()
        })
      }
    }
    
    console.log(`Converted ${chartData.length} intraday data points from Yahoo Finance`)
    return chartData
  }

  // Check if it's a weekend (Saturday or Sunday)
  const isWeekend = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const isWeekendDay = dayOfWeek === 0 || dayOfWeek === 6 // Sunday = 0, Saturday = 6
    console.log(`Today is ${today.toDateString()}, day ${dayOfWeek}, isWeekend: ${isWeekendDay}`)
    return isWeekendDay
  }

  // Get the most recent Friday's date
  const getLastFriday = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const daysToSubtract = dayOfWeek === 0 ? 2 : dayOfWeek === 6 ? 1 : 0 // If Sunday, go back 2 days; if Saturday, go back 1 day
    const lastFriday = new Date(today)
    lastFriday.setDate(today.getDate() - daysToSubtract)
    return lastFriday
  }

  // Fetch real historical data from Yahoo Finance
  const fetchRealData = async (timeframe) => {
    try {
      console.log(`Fetching real historical gold data for ${timeframe}...`)
      
      
        // For all timeframes, use Yahoo Finance API
        let yahooRange = '1mo'
        switch (timeframe) {
          case '1W':
            yahooRange = '5d'
            break
          case '1M':
            yahooRange = '1mo'
            break
          case '6M':
            yahooRange = '6mo'
            break
          case '1Y':
            yahooRange = '1y'
            break
          case '5Y':
            yahooRange = '5y'
            break
        }
        
        console.log(`Fetching ${timeframe} data from Yahoo Finance with range: ${yahooRange}`)
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(`https://query1.finance.yahoo.com/v8/finance/chart/GC=F?interval=1d&range=${yahooRange}`))
        const data = await response.json()
        
        console.log('Yahoo Finance response:', data)
        
        if (data && data.chart && data.chart.result && data.chart.result[0]) {
          const result = data.chart.result[0]
          const quote = result.indicators.quote[0]
          
          // Convert Yahoo Finance data to chart format
          const chartData = convertYahooFinanceToChartData(quote, result.meta)
          
          if (chartData.length > 0) {
            const currentGoldPrice = chartData[chartData.length - 1].price
            console.log(`Current gold price: $${currentGoldPrice} per ounce (real historical data from Yahoo Finance)`)
            
            // Update current price and change
            const latestPrice = chartData[chartData.length - 1].price
            const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : latestPrice
            const change = latestPrice - previousPrice
            const changePercent = previousPrice > 0 ? (change / previousPrice) * 100 : 0
            
            setCurrentPrice(latestPrice)
            setPriceChange(change)
            setPriceChangePercent(changePercent)
            setLastUpdated(new Date())
            
            console.log(`Successfully loaded ${chartData.length} real historical data points for ${timeframe}`)
            return chartData
          }
        }
        
        console.log('No valid data from Yahoo Finance, using mock data')
        return generateMockData(timeframe)
    } catch (error) {
      console.error('Error fetching data from Yahoo Finance:', error)
      return generateMockData(timeframe)
    }
  }

  // Generate historical data based on current real price
  const generateHistoricalDataFromCurrentPrice = (currentPrice, timeframe) => {
    const data = []
    const now = new Date()
    let points = 24
    let interval = 1 // hours

    switch (timeframe) {
      case '1W':
        points = 7
        interval = 24
        break
      case '1M':
        points = 30
        interval = 24
        break
      case '6M':
        points = 180
        interval = 24
        break
      case '1Y':
        points = 365
        interval = 24
        break
      case '5Y':
        points = 1825
        interval = 24
        break
    }

    let basePrice = currentPrice * 0.95 // Start slightly below current price
    for (let i = 0; i < points; i++) {
      const date = new Date(now.getTime() - (points - i - 1) * interval * 60 * 60 * 1000)
      
      // Add realistic price movement
      const randomChange = (Math.random() - 0.5) * 50
      basePrice += randomChange
      
      // Ensure price stays within reasonable bounds
      basePrice = Math.max(currentPrice * 0.8, Math.min(currentPrice * 1.2, basePrice))

      data.push({
        time: date.toISOString(),
        price: Math.round(basePrice * 100) / 100,
        volume: Math.floor(Math.random() * 1000000) + 500000
      })
    }

    // Ensure the last point is the current real price
    if (data.length > 0) {
      data[data.length - 1].price = currentPrice
    }

    return data
  }

  // Generate mock data for different timeframes
  const generateMockData = (timeframe) => {
    const data = []
    const now = new Date()
    let points = 24
    let interval = 1 // hours

    switch (timeframe) {
      case '1W':
        points = 7
        interval = 24
        break
      case '1M':
        points = 30
        interval = 24
        break
      case '6M':
        points = 180
        interval = 24
        break
      case '1Y':
        points = 365
        interval = 24
        break
      case '5Y':
        points = 1825
        interval = 24
        break
    }

    const basePrice = 3900 // Current gold price around $3,900
    let currentPrice = basePrice

    for (let i = 0; i < points; i++) {
      const date = new Date(now.getTime() - (points - i - 1) * interval * 60 * 60 * 1000)
      
      // Add some realistic price movement
      const randomChange = (Math.random() - 0.5) * 50 // Larger movements for higher prices
      currentPrice += randomChange
      
      // Ensure price stays within reasonable bounds for current gold prices
      currentPrice = Math.max(3600, Math.min(4200, currentPrice))

      data.push({
        time: date.toISOString(),
        price: Math.round(currentPrice * 100) / 100,
        volume: Math.floor(Math.random() * 1000000) + 500000
      })
    }

    // Update current price and change
    const latestPrice = data[data.length - 1].price
    const previousPrice = data[data.length - 2].price
    const change = latestPrice - previousPrice
    const changePercent = (change / previousPrice) * 100

    setCurrentPrice(latestPrice)
    setPriceChange(change)
    setPriceChangePercent(changePercent)

    return data
  }



  useEffect(() => {
    setLoading(true)
    // Fetch real data from Alpha Vantage
    fetchRealData(timeframe).then(data => {
      console.log('Setting chart data:', data.length, 'points')
      console.log('Sample chart data:', data.slice(0, 2))
      setChartData(data)
      setLoading(false)
    }).catch(error => {
      console.error('Error loading chart data:', error)
        // Fallback to mock data
        const data = generateMockData(timeframe)
        setChartData(data)
      setLoading(false)
    })


  }, [timeframe])


  const formatTime = (timeStr) => {
    const date = new Date(timeStr)
    if (timeframe === '1W') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else if (timeframe === '1M') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else if (timeframe === '6M') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    } else if (timeframe === '1Y') {
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    } else if (timeframe === '5Y') {
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="tooltip-time">{formatTime(label)}</p>
          <p className="tooltip-price">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  const timeframes = [
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '6M', label: '6M' },
    { id: '1Y', label: '1Y' },
    { id: '5Y', label: '5Y' }
  ]

  return (
    <div className="functional-chart-container">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3>
            Gold Spot Price (USD per ounce)
          </h3>
          <div className="last-updated">
            {mounted && lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}
          </div>
        </div>
        <div className="chart-controls">
          {timeframes.map((tf) => (
            <button
              key={tf.id}
              className={`timeframe-btn ${timeframe === tf.id ? 'active' : ''}`}
              onClick={() => setTimeframe(tf.id)}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="price-display">
        <div className="current-price">
          <span className="price-value">${currentPrice.toFixed(2)}</span>
          <span className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
            {priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>

      <div className="chart-visual">
        {loading ? (
          <div className="chart-loading">
            <div className="loading-spinner"></div>
            <p>Loading chart data...</p>
          </div>
        ) : (
          <>
            {console.log('Rendering chart with data:', chartData.length, 'points')}
            {console.log('Chart data sample:', chartData.slice(0, 2))}
              <ResponsiveContainer width="100%" height={450}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="time" 
                tickFormatter={formatTime}
                stroke="#6b7280"
                fontSize={12}
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
                minTickGap={50}
              />
              <YAxis 
                domain={['dataMin - 10', 'dataMax + 10']}
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
          </>
        )}
      </div>

    </div>
  )
}
