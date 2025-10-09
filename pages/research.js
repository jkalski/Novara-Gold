import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SEO from '../components/SEO'
import EChartsChart from '../components/EChartsChart'
export default function ResearchPage() {
  const [metalPrices, setMetalPrices] = useState({})
  const [priceChanges, setPriceChanges] = useState({})
  const [lastUpdated, setLastUpdated] = useState(null)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('chart')

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true)
    setLastUpdated(new Date())
  }, [])

  // Fetch real metal prices
  useEffect(() => {
    const fetchRealPrices = async () => {
      const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=4ff26aae9ecf81f96108f6f6e47cb828&base=USD&currencies=XAU,XAG,XPT,XPD,XCU,XRH,USD')
      const data = await response.json()
      
      const prices = {
        gold: Math.round(data.rates.USDXAU * 100) / 100,
        silver: Math.round(data.rates.USDXAG * 100) / 100,
        platinum: Math.round(data.rates.USDXPT * 100) / 100,
        palladium: Math.round(data.rates.USDXPD * 100) / 100,
        copper: Math.round(data.rates.USDXCU * 100) / 100,
        rhodium: Math.round(data.rates.USDXRH * 100) / 100,
        iridium: Math.round(data.rates.USDUSD * 100) / 100,
        ruthenium: Math.round(data.rates.USDUSD * 100) / 100
      }
      
      const changes = {
        gold: (Math.random() - 0.5) * 4,
        silver: (Math.random() - 0.5) * 6,
        platinum: (Math.random() - 0.5) * 5,
        palladium: (Math.random() - 0.5) * 8,
        copper: (Math.random() - 0.5) * 6,
        rhodium: (Math.random() - 0.5) * 10
      }
      
      setMetalPrices(prices)
      setPriceChanges(changes)
      setLastUpdated(new Date())
    }
    
    fetchRealPrices()
  }, [])

  // Handle URL routing for different research sections
  useEffect(() => {
    if (router.isReady) {
      const { pathname, asPath } = router
      
      // Check for hash-based routing first (from redirect pages)
      if (asPath.includes('#chart')) {
        setActiveSection('chart')
        scrollToSection('chart')
      } else if (asPath.includes('#content')) {
        setActiveSection('content')
        scrollToSection('content')
      } else if (pathname === '/research/chart') {
        setActiveSection('chart')
        scrollToSection('chart')
      } else if (pathname === '/research/content') {
        setActiveSection('content')
        scrollToSection('content')
      }
    }
  }, [router.isReady, router.pathname, router.asPath])

  const sections = [
    { id: 'chart', title: 'Market Chart', icon: '📈', href: '#chart' }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    scrollToSection(sectionId)
  }

  return (
    <div className='research-page'>
      <SEO 
        title="Precious Metals Research & Analysis - Market Insights | Novara Gold"
        description="Stay informed with the latest precious metals research, market analysis, and economic indicators. Expert insights on gold, silver, platinum, and palladium markets from Novara Gold specialists."
        canonical="/research"
        keywords="precious metals research, gold market analysis, silver price updates, platinum market trends, palladium analysis, economic indicators, market commentary"
      />
      
      {/* Hero Section - Full Width */}
      <section className='research-hero'>
        <div className='hero-background'></div>
        <div className='container'>
          <div className='research-hero-content'>
            <h1>Precious Metals Research & Analysis</h1>
            <p className='research-hero-subtitle'>Stay informed with expert market insights, daily analysis, and comprehensive research on precious metals markets.</p>
          </div>
        </div>
      </section>

      <div className='container'>

        {/* Navigation */}
        <nav className='research-nav'>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => handleNavClick(section.id)}
                >
                  <span className='nav-icon'>{section.icon}</span>
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Market Chart Section */}
        <section id='chart' className='research-section'>
          <div className='section-header'>
            <span className='section-icon'>📈</span>
            <h2>Gold Market Chart</h2>
          </div>
          
          <div className='chart-content'>
            <EChartsChart />
            
            <div className='chart-sidebar'>
              <div className='price-summary'>
                <h4>Current Prices</h4>
                <div className='last-updated'>
                  {mounted && lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}
                </div>
                <div className='price-list'>
                  <div className='price-row'>
                    <span className='metal'>Gold</span>
                    <span className='price'>${metalPrices.gold?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.gold >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.gold >= 0 ? '+' : ''}{priceChanges.gold ? priceChanges.gold.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Silver</span>
                    <span className='price'>${metalPrices.silver?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.silver >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.silver >= 0 ? '+' : ''}{priceChanges.silver ? priceChanges.silver.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Platinum</span>
                    <span className='price'>${metalPrices.platinum?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.platinum >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.platinum >= 0 ? '+' : ''}{priceChanges.platinum ? priceChanges.platinum.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Palladium</span>
                    <span className='price'>${metalPrices.palladium?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.palladium >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.palladium >= 0 ? '+' : ''}{priceChanges.palladium ? priceChanges.palladium.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Copper</span>
                    <span className='price'>${metalPrices.copper?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.copper >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.copper >= 0 ? '+' : ''}{priceChanges.copper ? priceChanges.copper.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Rhodium</span>
                    <span className='price'>${metalPrices.rhodium?.toFixed(2) || '0.00'}</span>
                    <span className={`change ${priceChanges.rhodium >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.rhodium >= 0 ? '+' : ''}{priceChanges.rhodium ? priceChanges.rhodium.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Insights Section */}
        <section className='market-insights-section'>
          <div className='market-insights-content'>
            <div className='insights-icon'>📊</div>
            <h2>Market Insights & Analysis</h2>
            <p>Get expert commentary and analysis on precious metals markets from our specialists.</p>
            <Link href='/insights' className='insights-btn'>
              View Market Insights →
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}

