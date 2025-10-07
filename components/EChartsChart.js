import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'

export default function EChartsChart() {
  const chartRef = useRef()
  const chartInstance = useRef()
  const [currentMetal, setCurrentMetal] = useState('gold')
  const [currentTf, setCurrentTf] = useState('5Y')
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [mounted, setMounted] = useState(false)

  // Format numbers for display
  const fmtNumber = (n) => {
    if (n == null || isNaN(n)) return "—"
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  // Fetch data from API
  const fetchData = async (metal, tf) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/chart?metal=${encodeURIComponent(metal)}&tf=${encodeURIComponent(tf)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } finally {
      setLoading(false)
    }
  }

  // Apply chart configuration
  const applyChart = ({ timestamps, closes }, title) => {
    if (!chartInstance.current) return

    const data = (timestamps || []).map((t, i) => [t, closes[i]]).filter((d) => d[1] != null)

    const option = {
      animation: true,
      backgroundColor: "transparent",
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "#7297C5",
        borderWidth: 1,
        textStyle: {
          color: "#ffffff"
        },
        valueFormatter: (v) => fmtNumber(v)
      },
      grid: { left: 40, right: 20, top: 10, bottom: 40 },
      xAxis: {
        type: "time",
        boundaryGap: false,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: "#6b7280" },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value",
        scale: true,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: "#6b7280",
          formatter: (v) => fmtNumber(v)
        },
        splitLine: { lineStyle: { color: "rgba(107, 114, 128, 0.2)" } }
      },
      dataZoom: [
        { type: "inside", throttle: 50 },
        { type: "slider", height: 20, bottom: 0, backgroundColor: "#374151", fillerColor: "#7297C5", borderColor: "#4b5563" }
      ],
      series: [{
        name: title,
        type: "line",
        showSymbol: false,
        smooth: true,
        lineStyle: { 
          width: 3,
          color: currentMetal === 'gold' ? '#f59e0b' : '#9ca3af'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: currentMetal === 'gold' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(156, 163, 175, 0.3)'
            }, {
              offset: 1, color: currentMetal === 'gold' ? 'rgba(245, 158, 11, 0.05)' : 'rgba(156, 163, 175, 0.05)'
            }]
          }
        },
        emphasis: { 
          focus: "series",
          lineStyle: {
            width: 4
          }
        },
        data
      }]
    }

    chartInstance.current.setOption(option, true)
  }

  // Load chart data
  const loadChart = async () => {
    const json = await fetchData(currentMetal, currentTf)
    const symLabel = currentMetal === "gold" ? "Gold" : "Silver"
    
    applyChart(json, `${symLabel} (${json.symbol})`)
    if (mounted) {
      setLastUpdated(new Date())
    }
  }

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize chart
  useEffect(() => {
    if (!chartRef.current || !mounted) return

    // Initialize ECharts
    chartInstance.current = echarts.init(chartRef.current, null, { renderer: "canvas" })

    // Handle resize
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize()
      }
    }
    window.addEventListener('resize', handleResize)

    // Load initial data
    loadChart()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstance.current) {
        chartInstance.current.dispose()
      }
    }
  }, [mounted])

  // Reload chart when metal or timeframe changes
  useEffect(() => {
    if (chartInstance.current) {
      loadChart()
    }
  }, [currentMetal, currentTf])

  const timeframes = [
    { id: '1W', label: '1W' },
    { id: '1M', label: '1M' },
    { id: '6M', label: '6M' },
    { id: '1Y', label: '1Y' },
    { id: '5Y', label: '5Y' }
  ]

  return (
    <div className="echarts-chart-container">
      <div className="chart-header">
        <div className="chart-title-section">
          <h3>Precious Metals Chart</h3>
          <div className="last-updated">
            {mounted && lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}
          </div>
        </div>
        <div className="chart-controls">
          <div className="control-group">
            <div className="metal-tabs">
              <button 
                className={`chip ${currentMetal === 'gold' ? 'active' : ''}`}
                onClick={() => setCurrentMetal('gold')}
              >
                Gold
              </button>
              <button 
                className={`chip ${currentMetal === 'silver' ? 'active' : ''}`}
                onClick={() => setCurrentMetal('silver')}
              >
                Silver
              </button>
            </div>
            <div className="timeframe-tabs">
              {timeframes.map((tf) => (
                <button
                  key={tf.id}
                  className={`chip ${currentTf === tf.id ? 'active' : ''}`}
                  onClick={() => setCurrentTf(tf.id)}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="chart-visual">
        {loading ? (
          <div className="chart-loading">
            <div className="loading-spinner"></div>
            <p>Loading chart data...</p>
          </div>
        ) : (
          <div ref={chartRef} className="echarts-chart" />
        )}
      </div>

      <div className="chart-footer">
        <div className="chart-hint">
          Tip: Hover or tap to see exact values. Drag to zoom. Double‑click to reset.
        </div>
      </div>
    </div>
  )
}
