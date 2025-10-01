import React, { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'

export default function TradingViewChart() {
  const chartContainerRef = useRef()
  const chartRef = useRef()
  const [timeframe, setTimeframe] = useState('1D')
  const [loading, setLoading] = useState(true)
  const [currentPrice, setCurrentPrice] = useState(2045.50)
  const [priceChange, setPriceChange] = useState(0)
  const [priceChangePercent, setPriceChangePercent] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Fetch gold price data
  const fetchGoldData = async (interval) => {
    try {
      setLoading(true)
      
      // For now, just use mock data to get the chart working
      console.log('Fetching data for interval:', interval)
      const data = generateMockData(interval)
      
      const latestPrice = data[data.length - 1].value
      const previousPrice = data.length > 1 ? data[data.length - 2].value : latestPrice
      
      setCurrentPrice(latestPrice)
      setPriceChange(latestPrice - previousPrice)
      setPriceChangePercent(((latestPrice - previousPrice) / previousPrice) * 100)
      setLastUpdated(new Date())
      
      return data
    } catch (error) {
      console.error('Error fetching gold data:', error)
      return generateMockData(interval)
    }
  }

  // Generate mock data for fallback
  const generateMockData = (interval) => {
    const data = []
    const now = new Date()
    let points = 24
    let intervalMs = 60 * 60 * 1000 // 1 hour

    switch (interval) {
      case '1D':
        points = 24
        intervalMs = 60 * 60 * 1000 // 1 hour
        break
      case '1W':
        points = 7
        intervalMs = 24 * 60 * 60 * 1000 // 1 day
        break
      case '1M':
        points = 30
        intervalMs = 24 * 60 * 60 * 1000 // 1 day
        break
      case '1Y':
        points = 12
        intervalMs = 30 * 24 * 60 * 60 * 1000 // 1 month
        break
    }

    let basePrice = 2000
    for (let i = 0; i < points; i++) {
      const date = new Date(now.getTime() - (points - i - 1) * intervalMs)
      const randomChange = (Math.random() - 0.5) * 20
      basePrice += randomChange
      basePrice = Math.max(1800, Math.min(2200, basePrice))
      
      data.push({
        time: date.toISOString().split('T')[0],
        value: Math.round(basePrice * 100) / 100
      })
    }

    const latestPrice = data[data.length - 1].value
    const previousPrice = data[data.length - 2].value
    
    setCurrentPrice(latestPrice)
    setPriceChange(latestPrice - previousPrice)
    setPriceChangePercent(((latestPrice - previousPrice) / previousPrice) * 100)
    setLastUpdated(new Date())

    return data
  }

  useEffect(() => {
    if (!chartContainerRef.current) {
      console.log('Chart container not ready')
      return
    }

    console.log('Creating chart...')
    
    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: '#6b7280',
        background: { type: 'solid', color: '#ffffff' },
      },
      grid: {
        vertLines: { color: '#e5e7eb' },
        horzLines: { color: '#e5e7eb' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#e5e7eb',
      },
      timeScale: {
        borderColor: '#e5e7eb',
      },
      height: 400,
    })

    chartRef.current = chart
    console.log('Chart created successfully')

    // Add line series - using the correct TradingView API
    const lineSeries = chart.addLineSeries({
      color: '#f59e0b',
      lineWidth: 2,
    })

    // Load initial data
    console.log('Loading initial data...')
    fetchGoldData(timeframe).then(data => {
      console.log('Data received:', data)
      if (data && data.length > 0) {
        lineSeries.setData(data)
        chart.timeScale().fitContent()
        console.log('Data set successfully')
      }
      setLoading(false)
    }).catch(error => {
      console.error('Error loading chart data:', error)
      setLoading(false)
    })

    // Handle resize
    const handleResize = () => {
      chart.applyOptions({ height: 400 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  useEffect(() => {
    if (!chartRef.current) return

    const chart = chartRef.current
    const lineSeries = chart.series()[0]

    fetchGoldData(timeframe).then(data => {
      if (data && data.length > 0) {
        lineSeries.setData(data)
        chart.timeScale().fitContent()
      }
      setLoading(false)
    }).catch(error => {
      console.error('Error updating chart data:', error)
      setLoading(false)
    })
  }, [timeframe])

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe)
  }

  const isPositive = priceChange >= 0

  return (
    <div className="tradingview-chart-container">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3>Gold Spot Price (USD per ounce)</h3>
          <div className="last-updated">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
        <div className="chart-controls">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <button
              key={tf}
              className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => handleTimeframeChange(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="price-display">
        <div className="current-price">
          <span className="price-value">${currentPrice.toFixed(2)}</span>
          <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? '+' : ''}${priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
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
          <div ref={chartContainerRef} className="tradingview-chart" />
        )}
      </div>
      
      <div className="chart-attribution">
        <small>
          Chart powered by <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer">TradingView</a>
        </small>
      </div>
    </div>
  )
}
