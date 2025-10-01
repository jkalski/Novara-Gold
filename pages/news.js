import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SEO from '../components/SEO'
import { getMarketUpdates, getFeaturedMarketUpdate } from '../lib/contentful'

export default function NewsPage({ marketUpdates, featuredUpdate, contentfulConfigured }) {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('chart')

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
            <div className='chart-container'>
              <div className='chart-header'>
                <h3>Gold Price Chart</h3>
                <div className='chart-controls'>
                  <button className='timeframe-btn active'>1D</button>
                  <button className='timeframe-btn'>1W</button>
                  <button className='timeframe-btn'>1M</button>
                  <button className='timeframe-btn'>3M</button>
                  <button className='timeframe-btn'>1Y</button>
                </div>
              </div>
              
              <div className='chart-placeholder'>
                <div className='chart-area'>
                  <div className='chart-title'>Gold Spot Price (USD per ounce)</div>
                  <div className='chart-visual'>
                    <div className='price-display'>
                      <span className='current-price'>$2,045.50</span>
                      <span className='price-change positive'>+$45.20 (+2.26%)</span>
                    </div>
                    <div className='chart-mock'>
                      <div className='chart-line'></div>
                      <div className='chart-points'>
                        <div className='point' style={{left: '10%', bottom: '20%'}}></div>
                        <div className='point' style={{left: '25%', bottom: '35%'}}></div>
                        <div className='point' style={{left: '40%', bottom: '15%'}}></div>
                        <div className='point' style={{left: '55%', bottom: '45%'}}></div>
                        <div className='point' style={{left: '70%', bottom: '25%'}}></div>
                        <div className='point' style={{left: '85%', bottom: '10%'}}></div>
                        <div className='point current' style={{left: '95%', bottom: '5%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className='chart-info'>
                    <div className='info-item'>
                      <span className='label'>Open:</span>
                      <span className='value'>$2,000.30</span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>High:</span>
                      <span className='value'>$2,048.75</span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Low:</span>
                      <span className='value'>$1,995.80</span>
                    </div>
                    <div className='info-item'>
                      <span className='label'>Volume:</span>
                      <span className='value'>1.2M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='chart-sidebar'>
              <div className='price-summary'>
                <h4>Current Prices</h4>
                <div className='price-list'>
                  <div className='price-row'>
                    <span className='metal'>Gold</span>
                    <span className='price'>$2,045.50</span>
                    <span className='change positive'>+2.26%</span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Silver</span>
                    <span className='price'>$24.85</span>
                    <span className='change positive'>+1.85%</span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Platinum</span>
                    <span className='price'>$1,125.30</span>
                    <span className='change positive'>+1.20%</span>
                  </div>
                  <div className='price-row'>
                    <span className='metal'>Palladium</span>
                    <span className='price'>$1,890.75</span>
                    <span className='change negative'>-0.50%</span>
                  </div>
                </div>
              </div>

              <div className='market-news'>
                <h4>Latest Market News</h4>
                <div className='news-list'>
                  <div className='news-item'>
                    <span className='time'>2h ago</span>
                    <p>Fed signals potential rate cuts boost gold demand</p>
                  </div>
                  <div className='news-item'>
                    <span className='time'>4h ago</span>
                    <p>Central bank gold purchases hit record levels</p>
                  </div>
                  <div className='news-item'>
                    <span className='time'>6h ago</span>
                    <p>Inflation data supports precious metals rally</p>
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
            <p>We're working on bringing you expert analysis, market commentary, and relevant news from our precious metals specialists. Stay tuned for professional insights and industry expertise.</p>
            <div className='coming-soon-features'>
              <div className='feature-item'>
                <span className='feature-icon'>🎯</span>
                <span>Expert market insights</span>
              </div>
              <div className='feature-item'>
                <span className='feature-icon'>📰</span>
                <span>Relevant industry news</span>
              </div>
              <div className='feature-item'>
                <span className='feature-icon'>💬</span>
                <span>Professional commentary</span>
              </div>
            </div>
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