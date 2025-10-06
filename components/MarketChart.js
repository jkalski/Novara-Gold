import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function MarketChart() {
  const [timeframe, setTimeframe] = useState('1D')
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

  // Fetch real historical data from metals-api.com timeseries (except 1D which uses GoldAPI)
  const fetchRealData = async (timeframe) => {
    try {
      console.log(`Fetching real historical gold data for ${timeframe}...`)
      
      // For 1D timeframe, use GoldAPI for real-time data
      if (timeframe === '1D') {
        const myHeaders = new Headers();
        myHeaders.append("x-access-token", "goldapi-akhgqzsmgej2ukd-io");
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch("https://www.goldapi.io/api/XAU/USD", requestOptions)
        const data = await response.json()
        
        console.log('GoldAPI response for 1D:', data)
        
        if (data && data.price) {
          const currentGoldPrice = data.price
          console.log(`Current gold price: $${currentGoldPrice} per ounce (real-time from GoldAPI)`)
          
          // Generate historical data based on current price for 1D
          const chartData = generateHistoricalDataFromCurrentPrice(currentGoldPrice, timeframe)
          return chartData
        } else {
          console.log('No valid data from GoldAPI, using mock data')
          return generateMockData(timeframe)
        }
      }
      
      // For all other timeframes, use metals-api.com timeseries
      const endDate = new Date()
      const startDate = new Date()
      
      switch (timeframe) {
        case '1W':
          startDate.setDate(endDate.getDate() - 7)
          break
        case '1M':
          startDate.setMonth(endDate.getMonth() - 1)
          break
        case '6M':
          startDate.setMonth(endDate.getMonth() - 6)
          break
        case '1Y':
          startDate.setFullYear(endDate.getFullYear() - 1)
          break
        case '5Y':
          startDate.setFullYear(endDate.getFullYear() - 5)
          break
        default:
          startDate.setMonth(endDate.getMonth() - 1)
      }
      
      const startDateStr = startDate.toISOString().split('T')[0]
      const endDateStr = endDate.toISOString().split('T')[0]
      
      // Fetch historical data from metals-api.com
      const response = await fetch(`https://api.metalpriceapi.com/v1/timeframe?api_key=4ff26aae9ecf81f96108f6f6e47cb828&start_date=${startDateStr}&end_date=${endDateStr}&base=USD&currencies=XAU`)
      const data = await response.json()
      
      console.log('Metals-API timeseries response:', data)
      
      if (data && data.success && data.rates) {
        // Convert timeseries data to chart format
        const chartData = convertTimeseriesToChartData(data.rates, timeframe)
        const currentGoldPrice = chartData[chartData.length - 1].price
        console.log(`Current gold price: $${currentGoldPrice} per ounce (real historical data from metals-api.com)`)
        
        // Update current price and change
        const latestPrice = chartData[chartData.length - 1].price
        const previousPrice = chartData.length > 1 ? chartData[chartData.length - 2].price : latestPrice
        const change = latestPrice - previousPrice
        const changePercent = (change / previousPrice) * 100

        setCurrentPrice(latestPrice)
        setPriceChange(change)
        setPriceChangePercent(changePercent)
        setLastUpdated(new Date())
        
        console.log(`Successfully loaded ${chartData.length} data points`)
        return chartData
      } else {
        console.log('No valid data from metals-api.com, using mock data')
        return generateMockData(timeframe)
      }
    } catch (error) {
      console.error('Error fetching historical data from metals-api.com:', error)
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
      case '1D':
        points = 24
        interval = 1
        break
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
      case '1D':
        points = 24
        interval = 1
        break
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
    if (timeframe === '1D') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    } else if (timeframe === '1W') {
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
    { id: '1D', label: '1D' },
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
          <h3>Gold Spot Price (USD per ounce)</h3>
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
        )}
      </div>

    </div>
  )
}
