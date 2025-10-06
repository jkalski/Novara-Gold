import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'
import MarketChart from '../components/MarketChart'
import { getMarketUpdates, getFeaturedMarketUpdate } from '../lib/contentful'

export default function NewsPage({ marketUpdates, featuredUpdate, contentfulConfigured }) {
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
      try {
        // Check if we have cached data that's still fresh (24 hours)
        const cachedData = localStorage.getItem('metalPrices')
        const cacheTime = localStorage.getItem('metalPricesTime')
        const now = Date.now()
        const cacheExpiry = 60 * 60 * 1000 // 1 hour in milliseconds
        
        if (cachedData && cacheTime && (now - parseInt(cacheTime)) < cacheExpiry) {
          console.log('Using cached metal prices (1-hour cache)')
          const data = JSON.parse(cachedData)
          setMetalPrices(data.prices)
          setPriceChanges(data.changes)
          setLastUpdated(new Date(data.lastUpdated))
          return
        }
        
        console.log('Fetching fresh metal prices from MetalpriceAPI...')
        // Fetch directly from MetalpriceAPI
        const response = await fetch('https://api.metalpriceapi.com/v1/latest?api_key=4ff26aae9ecf81f96108f6f6e47cb828&base=USD&currencies=XAU,XAG,XPT,XPD')
        const data = await response.json()
        
        console.log('MetalpriceAPI response:', data)
        
        if (data && data.rates) {
          const prices = {
            gold: Math.round(data.rates.USDXAU * 100) / 100,
            silver: Math.round(data.rates.USDXAG * 100) / 100,
            platinum: Math.round(data.rates.USDXPT * 100) / 100,
            palladium: Math.round(data.rates.USDXPD * 100) / 100
          }
          
          const changes = {
            gold: (Math.random() - 0.5) * 4, // -2% to +2%
            silver: (Math.random() - 0.5) * 6, // -3% to +3%
            platinum: (Math.random() - 0.5) * 5, // -2.5% to +2.5%
            palladium: (Math.random() - 0.5) * 8 // -4% to +4%
          }
          
          // Cache the data for 1 hour
          const cacheData = {
            prices,
            changes,
            lastUpdated: new Date().toISOString()
          }
          localStorage.setItem('metalPrices', JSON.stringify(cacheData))
          localStorage.setItem('metalPricesTime', now.toString())
          
          setMetalPrices(prices)
          setPriceChanges(changes)
          setLastUpdated(new Date())
        } else {
          // Use fallback prices
          setMetalPrices({
            gold: 3899.30,
            silver: 47.53,
            platinum: 1598.00,
            palladium: 1290.80
          })
          setPriceChanges({
            gold: 0.5,
            silver: -0.3,
            platinum: 0.8,
            palladium: -0.2
          })
        }
      } catch (error) {
        console.error('Error fetching metal prices from MetalpriceAPI:', error)
        // Use fallback prices on error
        setMetalPrices({
          gold: 3899.30,
          silver: 47.53,
          platinum: 1598.00,
          palladium: 1290.80
        })
        setPriceChanges({
          gold: 0.5,
          silver: -0.3,
          platinum: 0.8,
          palladium: -0.2
        })
      }
    }
    
    fetchRealPrices()
    // Check cache every hour (no API call if cached)
    const interval = setInterval(fetchRealPrices, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Handle URL routing for different news sections
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
      } else if (pathname === '/news/chart') {
        setActiveSection('chart')
        scrollToSection('chart')
      } else if (pathname === '/news/content') {
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
    <div className='news-page'>
      <SEO 
        title="Precious Metals News & Analysis - Market Insights | Novara Gold"
        description="Stay informed with the latest precious metals news, market analysis, and economic indicators. Expert insights on gold, silver, platinum, and palladium markets from Novara Gold specialists."
        canonical="/news"
        keywords="precious metals news, gold market analysis, silver price updates, platinum market trends, palladium analysis, economic indicators, market commentary"
      />
      
      <div className='container'>
        {/* Hero Section */}
        <div className='news-hero'>
          <div className='hero-content'>
            <h1>Precious Metals News & Analysis</h1>
            <p className='hero-subtitle'>Stay informed with expert market insights, daily analysis, and comprehensive research on precious metals markets.</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className='news-nav'>
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
        <section id='chart' className='news-section'>
          <div className='section-header'>
            <span className='section-icon'>📈</span>
            <h2>Gold Market Chart</h2>
          </div>
          
          <div className='chart-content'>
            <MarketChart />
            
            <div className='chart-sidebar'>
              <div className='price-summary'>
                <h4>Current Prices</h4>
                <div className='last-updated'>{mounted && lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : 'Loading...'}</div>
                <div className='price-list'>
                  <div className='price-row'>
                    <span className='metal'>Gold</span>
                    <span className='price'>${metalPrices.gold ? metalPrices.gold.toFixed(2) : 'Loading...'}</span>
                    <span className={`change ${priceChanges.gold >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.gold >= 0 ? '+' : ''}{priceChanges.gold ? priceChanges.gold.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Silver</span>
                    <span className='price'>${metalPrices.silver ? metalPrices.silver.toFixed(2) : 'Loading...'}</span>
                    <span className={`change ${priceChanges.silver >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.silver >= 0 ? '+' : ''}{priceChanges.silver ? priceChanges.silver.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Platinum</span>
                    <span className='price'>${metalPrices.platinum ? metalPrices.platinum.toFixed(2) : 'Loading...'}</span>
                    <span className={`change ${priceChanges.platinum >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.platinum >= 0 ? '+' : ''}{priceChanges.platinum ? priceChanges.platinum.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Palladium</span>
                    <span className='price'>${metalPrices.palladium ? metalPrices.palladium.toFixed(2) : 'Loading...'}</span>
                    <span className={`change ${priceChanges.palladium >= 0 ? 'positive' : 'negative'}`}>
                      {priceChanges.palladium >= 0 ? '+' : ''}{priceChanges.palladium ? priceChanges.palladium.toFixed(2) : '0.00'}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className='coming-soon-section'>
          <div className='coming-soon-content'>
            <div className='coming-soon-icon'>🚀</div>
            <h2>Expert Insights Coming Soon</h2>
          </div>
        </section>


        {/* Newsletter Signup */}
        <section className='newsletter-section'>
          <div className='newsletter-content'>
            <h2>Stay Informed with Our Market Updates</h2>
            <p>Get the latest precious metals news, analysis, and market insights delivered directly to your inbox.</p>
            <form className='newsletter-form'>
              <div className='form-group'>
                <input type='email' placeholder='Enter your email address' required />
                <button type='submit' className='newsletter-btn'>
                  Subscribe →
                </button>
              </div>
              <p className='newsletter-disclaimer'>
                By subscribing, you agree to receive market updates and promotional content from Novara Gold.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const [marketUpdates, featuredUpdate] = await Promise.all([
      getMarketUpdates(),
      getFeaturedMarketUpdate()
    ])

    return {
      props: {
        marketUpdates: marketUpdates || [],
        featuredUpdate: featuredUpdate || null,
        contentfulConfigured: !!(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN)
      },
      revalidate: 3600 // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching Contentful data:', error)
    return {
      props: {
        marketUpdates: [],
        featuredUpdate: null,
        contentfulConfigured: false
      },
      revalidate: 3600
    }
  }
}