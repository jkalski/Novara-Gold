import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { 
  FiTrendingUp, 
  FiCalendar, 
  FiBarChart3, 
  FiFileText, 
  FiClock,
  FiArrowRight,
  FiDollarSign,
  FiActivity,
  FiTrendingDown,
  FiGlobe
} from 'react-icons/fi'
import SEO from '../components/SEO'

export default function NewsPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('daily')

  // Handle URL routing for different news sections
  useEffect(() => {
    if (router.isReady) {
      const { pathname, asPath } = router
      
      // Check for hash-based routing first (from redirect pages)
      if (asPath.includes('#daily')) {
        setActiveSection('daily')
        scrollToSection('daily')
      } else if (asPath.includes('#weekly')) {
        setActiveSection('weekly')
        scrollToSection('weekly')
      } else if (asPath.includes('#commentary')) {
        setActiveSection('commentary')
        scrollToSection('commentary')
      } else if (asPath.includes('#indicators')) {
        setActiveSection('indicators')
        scrollToSection('indicators')
      } else if (asPath.includes('#beginners')) {
        setActiveSection('beginners')
        scrollToSection('beginners')
      } else if (asPath.includes('#education-news')) {
        setActiveSection('education-news')
        scrollToSection('education-news')
      } else if (asPath.includes('#glossary')) {
        setActiveSection('glossary')
        scrollToSection('glossary')
      } else if (pathname === '/news/daily') {
        setActiveSection('daily')
        scrollToSection('daily')
      } else if (pathname === '/news/weekly') {
        setActiveSection('weekly')
        scrollToSection('weekly')
      } else if (pathname === '/news/commentary') {
        setActiveSection('commentary')
        scrollToSection('commentary')
      } else if (pathname === '/news/indicators') {
        setActiveSection('indicators')
        scrollToSection('indicators')
      }
    }
  }, [router.isReady, router.pathname, router.asPath])

  const sections = [
    { id: 'daily', title: 'Daily Analysis', icon: FiCalendar, href: '#daily' },
    { id: 'weekly', title: 'Weekly Reports', icon: FiFileText, href: '#weekly' },
    { id: 'commentary', title: 'Market Commentary', icon: FiTrendingUp, href: '#commentary' },
    { id: 'indicators', title: 'Economic Indicators', icon: FiBarChart3, href: '#indicators' },
    { id: 'beginners', title: 'Beginners Guide', icon: FiFileText, href: '#beginners' },
    { id: 'education-news', title: 'Education News', icon: FiGlobe, href: '#education-news' },
    { id: 'glossary', title: 'Glossary', icon: FiFileText, href: '#glossary' }
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
                  {React.createElement(section.icon, { className: 'nav-icon' })}
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Daily Analysis Section */}
        <section id='daily' className='news-section'>
          <div className='section-header'>
            <FiCalendar className='section-icon' />
            <h2>Daily Market Analysis</h2>
          </div>
          
          <div className='news-content'>
            <div className='featured-article'>
              <div className='article-meta'>
                <span className='date'>December 15, 2024</span>
                <span className='category'>Market Update</span>
              </div>
              <h3>Gold Prices Surge on Federal Reserve Policy Signals</h3>
              <p>Gold prices reached new highs this week as the Federal Reserve signaled a potential shift in monetary policy. The precious metal gained 2.3% in today's trading session, closing at $2,045 per ounce.</p>
              <div className='price-highlights'>
                <div className='price-item'>
                  <span className='metal'>Gold</span>
                  <span className='price'>$2,045.50</span>
                  <span className='change positive'>+2.3%</span>
                </div>
                <div className='price-item'>
                  <span className='metal'>Silver</span>
                  <span className='price'>$24.85</span>
                  <span className='change positive'>+1.8%</span>
                </div>
                <div className='price-item'>
                  <span className='metal'>Platinum</span>
                  <span className='price'>$1,125.30</span>
                  <span className='change positive'>+1.2%</span>
                </div>
                <div className='price-item'>
                  <span className='metal'>Palladium</span>
                  <span className='price'>$1,890.75</span>
                  <span className='change negative'>-0.5%</span>
                </div>
              </div>
            </div>

            <div className='news-grid'>
              <div className='news-card'>
                <div className='card-header'>
                  <span className='time'>2 hours ago</span>
                  <span className='tag'>Breaking</span>
                </div>
                <h4>Inflation Data Shows Continued Pressure on Precious Metals</h4>
                <p>Latest CPI data reveals ongoing inflationary pressures that continue to support precious metals as a hedge against currency devaluation.</p>
              </div>

              <div className='news-card'>
                <div className='card-header'>
                  <span className='time'>4 hours ago</span>
                  <span className='tag'>Analysis</span>
                </div>
                <h4>Central Bank Gold Purchases Reach Record Levels</h4>
                <p>Global central banks continue to accumulate gold reserves at unprecedented rates, signaling long-term confidence in precious metals.</p>
              </div>

              <div className='news-card'>
                <div className='card-header'>
                  <span className='time'>6 hours ago</span>
                  <span className='tag'>Market</span>
                </div>
                <h4>Silver Industrial Demand Remains Strong</h4>
                <p>Industrial applications continue to drive silver demand, with solar panel manufacturing leading the charge in renewable energy sectors.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Reports Section */}
        <section id='weekly' className='news-section'>
          <div className='section-header'>
            <FiFileText className='section-icon' />
            <h2>Weekly Research Reports</h2>
          </div>
          
          <div className='reports-content'>
            <div className='report-featured'>
              <div className='report-meta'>
                <span className='report-date'>Week of December 9-15, 2024</span>
                <span className='report-type'>Comprehensive Analysis</span>
              </div>
              <h3>Precious Metals Market Outlook: Q1 2025</h3>
              <p>Our comprehensive analysis of precious metals markets heading into 2025, including key factors driving gold, silver, platinum, and palladium prices.</p>
              <div className='report-highlights'>
                <div className='highlight-item'>
                  <FiTrendingUp className='highlight-icon' />
                  <span>Gold expected to maintain bullish momentum</span>
                </div>
                <div className='highlight-item'>
                  <FiActivity className='highlight-icon' />
                  <span>Silver industrial demand continues growing</span>
                </div>
                <div className='highlight-item'>
                  <FiGlobe className='highlight-icon' />
                  <span>Global economic uncertainty supports metals</span>
                </div>
              </div>
            </div>

            <div className='reports-grid'>
              <div className='report-card'>
                <div className='report-header'>
                  <span className='report-week'>Week of Dec 2-8</span>
                  <span className='report-status'>Published</span>
                </div>
                <h4>Federal Reserve Policy Impact on Precious Metals</h4>
                <p>Analysis of how recent Fed decisions are affecting precious metals markets and investor sentiment.</p>
                <a href='#' className='read-more'>
                  Read Full Report <FiArrowRight />
                </a>
              </div>

              <div className='report-card'>
                <div className='report-header'>
                  <span className='report-week'>Week of Nov 25 - Dec 1</span>
                  <span className='report-status'>Published</span>
                </div>
                <h4>Holiday Season Trading Patterns in Precious Metals</h4>
                <p>Historical analysis of how precious metals typically perform during the holiday trading season.</p>
                <a href='#' className='read-more'>
                  Read Full Report <FiArrowRight />
                </a>
              </div>

              <div className='report-card'>
                <div className='report-header'>
                  <span className='report-week'>Week of Nov 18-24</span>
                  <span className='report-status'>Published</span>
                </div>
                <h4>Geopolitical Tensions and Safe Haven Demand</h4>
                <p>Examining how global geopolitical events are driving demand for precious metals as safe haven assets.</p>
                <a href='#' className='read-more'>
                  Read Full Report <FiArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Market Commentary Section */}
        <section id='commentary' className='news-section'>
          <div className='section-header'>
            <FiTrendingUp className='section-icon' />
            <h2>Expert Market Commentary</h2>
          </div>
          
          <div className='commentary-content'>
            <div className='expert-commentary'>
              <div className='expert-header'>
                <div className='expert-info'>
                  <h4>Dr. Sarah Chen</h4>
                  <span>Chief Market Analyst</span>
                </div>
                <span className='commentary-date'>December 15, 2024</span>
              </div>
              <h3>"The Fed's Dovish Pivot: A Game Changer for Precious Metals"</h3>
              <p>The Federal Reserve's recent signals of a potential policy shift have created a seismic shift in precious metals markets. After months of hawkish rhetoric, the Fed's acknowledgment of slowing inflation and potential rate cuts has unleashed a wave of buying in gold and silver markets.</p>
              <p>This development represents more than just a short-term trading opportunity. It signals a fundamental shift in the monetary policy landscape that could support precious metals prices for the remainder of 2024 and into 2025. Investors who have been waiting on the sidelines may want to consider this as a potential entry point.</p>
              <div className='commentary-tags'>
                <span className='tag'>Federal Reserve</span>
                <span className='tag'>Monetary Policy</span>
                <span className='tag'>Gold Outlook</span>
              </div>
            </div>

            <div className='commentary-grid'>
              <div className='commentary-card'>
                <div className='commentary-meta'>
                  <span className='author'>Michael Rodriguez</span>
                  <span className='date'>Dec 14, 2024</span>
                </div>
                <h4>Silver's Industrial Renaissance</h4>
                <p>Silver continues to benefit from strong industrial demand, particularly in renewable energy applications. This dual nature as both precious and industrial metal makes it uniquely positioned.</p>
              </div>

              <div className='commentary-card'>
                <div className='commentary-meta'>
                  <span className='author'>Jennifer Walsh</span>
                  <span className='date'>Dec 13, 2024</span>
                </div>
                <h4>Platinum's Supply Constraints</h4>
                <p>Supply disruptions in South Africa continue to support platinum prices, while automotive demand remains steady despite electric vehicle growth.</p>
              </div>

              <div className='commentary-card'>
                <div className='commentary-meta'>
                  <span className='author'>David Kim</span>
                  <span className='date'>Dec 12, 2024</span>
                </div>
                <h4>Central Bank Gold Accumulation</h4>
                <p>Record central bank gold purchases continue to provide a strong foundation for gold prices, with emerging market central banks leading the charge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Economic Indicators Section */}
        <section id='indicators' className='news-section'>
          <div className='section-header'>
            <FiBarChart3 className='section-icon' />
            <h2>Economic Indicators</h2>
          </div>
          
          <div className='indicators-content'>
            <div className='indicators-overview'>
              <h3>Key Economic Metrics Affecting Precious Metals</h3>
              <p>Track the most important economic indicators that influence precious metals prices and market sentiment.</p>
            </div>

            <div className='indicators-grid'>
              <div className='indicator-card'>
                <div className='indicator-header'>
                  <FiDollarSign className='indicator-icon' />
                  <h4>Inflation Rate (CPI)</h4>
                </div>
                <div className='indicator-value'>
                  <span className='value'>3.2%</span>
                  <span className='change positive'>-0.1%</span>
                </div>
                <p>Consumer Price Index shows continued moderation in inflation, supporting precious metals as inflation hedge.</p>
              </div>

              <div className='indicator-card'>
                <div className='indicator-header'>
                  <FiTrendingDown className='indicator-icon' />
                  <h4>Federal Funds Rate</h4>
                </div>
                <div className='indicator-value'>
                  <span className='value'>5.25%</span>
                  <span className='change neutral'>0.0%</span>
                </div>
                <p>Fed maintains current rate with signals of potential cuts in 2024, historically positive for precious metals.</p>
              </div>

              <div className='indicator-card'>
                <div className='indicator-header'>
                  <FiActivity className='indicator-icon' />
                  <h4>Dollar Index (DXY)</h4>
                </div>
                <div className='indicator-value'>
                  <span className='value'>103.45</span>
                  <span className='change negative'>-0.8%</span>
                </div>
                <p>Weaker dollar supports precious metals prices, making them more attractive to international investors.</p>
              </div>

              <div className='indicator-card'>
                <div className='indicator-header'>
                  <FiGlobe className='indicator-icon' />
                  <h4>10-Year Treasury Yield</h4>
                </div>
                <div className='indicator-value'>
                  <span className='value'>4.12%</span>
                  <span className='change negative'>-0.15%</span>
                </div>
                <p>Declining yields reduce opportunity cost of holding non-yielding precious metals assets.</p>
              </div>
            </div>

            <div className='indicators-chart'>
              <h4>Precious Metals vs. Key Economic Indicators</h4>
              <div className='chart-placeholder'>
                <p>Interactive chart showing correlation between precious metals prices and key economic indicators over time.</p>
                <div className='chart-legend'>
                  <div className='legend-item'>
                    <span className='legend-color gold'></span>
                    <span>Gold Price</span>
                  </div>
                  <div className='legend-item'>
                    <span className='legend-color silver'></span>
                    <span>Silver Price</span>
                  </div>
                  <div className='legend-item'>
                    <span className='legend-color inflation'></span>
                    <span>Inflation Rate</span>
                  </div>
                  <div className='legend-item'>
                    <span className='legend-color rates'></span>
                    <span>Interest Rates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beginners Guide Section */}
        <section id='beginners' className='news-section'>
          <div className='section-header'>
            <FiFileText className='section-icon' />
            <h2>Beginners Guide to Precious Metals</h2>
          </div>
          
          <div className='education-content'>
            <div className='education-intro'>
              <h3>Start Your Precious Metals Investment Journey</h3>
              <p>Learn the fundamentals of investing in gold, silver, platinum, and palladium with our comprehensive beginners guide.</p>
            </div>

            <div className='education-grid'>
              <div className='education-card'>
                <h4>Understanding Precious Metals</h4>
                <p>Learn about the unique properties and investment characteristics of gold, silver, platinum, and palladium.</p>
                <ul>
                  <li>Gold: The ultimate store of value and inflation hedge</li>
                  <li>Silver: Industrial demand meets precious metal status</li>
                  <li>Platinum: Rare metal with automotive applications</li>
                  <li>Palladium: Essential for catalytic converters</li>
                </ul>
              </div>

              <div className='education-card'>
                <h4>Investment Strategies</h4>
                <p>Discover different approaches to precious metals investing based on your goals and risk tolerance.</p>
                <ul>
                  <li>Physical ownership vs. paper investments</li>
                  <li>Dollar-cost averaging strategies</li>
                  <li>Portfolio allocation recommendations</li>
                  <li>Long-term vs. short-term approaches</li>
                </ul>
              </div>

              <div className='education-card'>
                <h4>Getting Started</h4>
                <p>Practical steps to begin your precious metals investment journey with confidence.</p>
                <ul>
                  <li>Setting investment goals and budget</li>
                  <li>Choosing between coins, bars, and rounds</li>
                  <li>Understanding premiums and pricing</li>
                  <li>Storage and security considerations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education News Section */}
        <section id='education-news' className='news-section'>
          <div className='section-header'>
            <FiGlobe className='section-icon' />
            <h2>Education & Market Insights</h2>
          </div>
          
          <div className='education-news-content'>
            <div className='education-featured'>
              <h3>Educational Resources & Market Analysis</h3>
              <p>Stay informed with educational content and market insights designed to help you make informed investment decisions.</p>
            </div>

            <div className='education-news-grid'>
              <div className='education-news-card'>
                <h4>Market Education</h4>
                <p>Learn how precious metals markets work, what drives prices, and how to interpret market signals.</p>
                <div className='education-topics'>
                  <span className='topic-tag'>Supply & Demand</span>
                  <span className='topic-tag'>Economic Indicators</span>
                  <span className='topic-tag'>Market Cycles</span>
                </div>
              </div>

              <div className='education-news-card'>
                <h4>Investment Education</h4>
                <p>Understand different investment vehicles, tax implications, and portfolio strategies for precious metals.</p>
                <div className='education-topics'>
                  <span className='topic-tag'>IRA Strategies</span>
                  <span className='topic-tag'>Tax Benefits</span>
                  <span className='topic-tag'>Diversification</span>
                </div>
              </div>

              <div className='education-news-card'>
                <h4>Market Updates</h4>
                <p>Regular updates on market conditions, price movements, and factors affecting precious metals markets.</p>
                <div className='education-topics'>
                  <span className='topic-tag'>Price Analysis</span>
                  <span className='topic-tag'>Market Trends</span>
                  <span className='topic-tag'>Expert Insights</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Glossary Section */}
        <section id='glossary' className='news-section'>
          <div className='section-header'>
            <FiFileText className='section-icon' />
            <h2>Precious Metals Glossary</h2>
          </div>
          
          <div className='glossary-content'>
            <div className='glossary-intro'>
              <h3>Essential Terms & Definitions</h3>
              <p>Master the terminology of precious metals investing with our comprehensive glossary of key terms and concepts.</p>
            </div>

            <div className='glossary-grid'>
              <div className='glossary-category'>
                <h4>Investment Terms</h4>
                <div className='glossary-items'>
                  <div className='glossary-item'>
                    <strong>Premium</strong>
                    <p>The amount above the spot price that investors pay for physical precious metals, covering manufacturing, distribution, and dealer costs.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Spot Price</strong>
                    <p>The current market price for immediate delivery of precious metals, typically quoted per troy ounce.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Allocated Storage</strong>
                    <p>Storage where specific precious metals are segregated and identified as belonging to a particular investor.</p>
                  </div>
                </div>
              </div>

              <div className='glossary-category'>
                <h4>IRA Terms</h4>
                <div className='glossary-items'>
                  <div className='glossary-item'>
                    <strong>Custodian</strong>
                    <p>A financial institution responsible for holding and administering precious metals within a self-directed IRA.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Depository</strong>
                    <p>A secure facility where precious metals are physically stored for IRA accounts.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Rollover</strong>
                    <p>The process of transferring funds from an existing retirement account into a precious metals IRA.</p>
                  </div>
                </div>
              </div>

              <div className='glossary-category'>
                <h4>Market Terms</h4>
                <div className='glossary-items'>
                  <div className='glossary-item'>
                    <strong>Contango</strong>
                    <p>A market condition where futures prices are higher than spot prices, indicating normal market expectations.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Backwardation</strong>
                    <p>A market condition where spot prices are higher than futures prices, indicating immediate supply shortages.</p>
                  </div>
                  <div className='glossary-item'>
                    <strong>Safe Haven</strong>
                    <p>An investment that is expected to retain or increase in value during times of market uncertainty or crisis.</p>
                  </div>
                </div>
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
                  Subscribe <FiArrowRight />
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
