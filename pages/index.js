import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  FiShield, 
  FiX, 
  FiUsers, 
  FiLock, 
  FiClock,
  FiUserX 
} from 'react-icons/fi'
import { RiDoubleQuotesL, RiDoubleQuotesR } from 'react-icons/ri'
import SEO from '../components/SEO'

export default function Home() {
  const [currentMetal, setCurrentMetal] = useState(0)
  const [currentMetal2, setCurrentMetal2] = useState(1)
  const [currentMetal3, setCurrentMetal3] = useState(2)
  const [currentMetal4, setCurrentMetal4] = useState(3)
  const [prices, setPrices] = useState({})
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [showFullConsent, setShowFullConsent] = useState(false)

  const metals = [
    { name: 'Gold', symbol: 'Au', icon: '🥇', color: '#FFD700' },
    { name: 'Silver', symbol: 'Ag', icon: '🥈', color: '#C0C0C0' },
    { name: 'Platinum', symbol: 'Pt', icon: '💎', color: '#E5E4E2' },
    { name: 'Palladium', symbol: 'Pd', icon: '⚡', color: '#B4B4B4' },
    { name: 'Copper', symbol: 'Cu', icon: '🟤', color: '#B87333' },
    { name: 'Rhodium', symbol: 'Rh', icon: '🔷', color: '#00A8CC' },
    { name: 'Iridium', symbol: 'Ir', icon: '💠', color: '#8B7D6B' },
    { name: 'Ruthenium', symbol: 'Ru', icon: '🔸', color: '#A8A8A8' }
  ]

  // Simulate live price updates
  useEffect(() => {
    const updatePrices = () => {
      setPrices({
        Gold: (1800 + Math.random() * 100).toFixed(2),
        Silver: (22 + Math.random() * 5).toFixed(2),
        Platinum: (900 + Math.random() * 50).toFixed(2),
        Palladium: (2000 + Math.random() * 200).toFixed(2),
        Copper: (3.5 + Math.random() * 0.5).toFixed(2),
        Rhodium: (15000 + Math.random() * 2000).toFixed(2),
        Iridium: (5000 + Math.random() * 500).toFixed(2),
        Ruthenium: (400 + Math.random() * 50).toFixed(2)
      })
    }
    
    updatePrices()
    const interval = setInterval(updatePrices, 5000)
    return () => clearInterval(interval)
  }, [])

  // Rotate through metals with staggered timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetal((prev) => (prev + 1) % metals.length)
    }, 4000)
    
    const interval2 = setInterval(() => {
      setCurrentMetal2((prev) => (prev + 1) % metals.length)
    }, 4000)
    
    const interval3 = setInterval(() => {
      setCurrentMetal3((prev) => (prev + 1) % metals.length)
    }, 4000)
    
    const interval4 = setInterval(() => {
      setCurrentMetal4((prev) => (prev + 1) % metals.length)
    }, 4000)
    
    return () => {
      clearInterval(interval)
      clearInterval(interval2)
      clearInterval(interval3)
      clearInterval(interval4)
    }
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <SEO 
        title="Novara Gold - The Future of Vaulted Wealth | Precious Metals Investment"
        description="Discover the future of vaulted wealth with Novara Gold. Expert precious metals investment services including gold, silver, platinum, and palladium IRAs with secure storage and transparent pricing."
        canonical="/"
        keywords="precious metals investment, gold IRA, silver IRA, platinum investment, palladium, secure storage, retirement planning, wealth protection"
      />
      {/* Hero Section */}
      <section className='hero'>
        <div className='container'>
          <div className='hero-content'>
            <div className='hero-logo'>
              <Image 
                src="/images/FrontLogo.png" 
                alt="NOVARA GOLD: The Future of Vaulted Wealth"
                width={1000}
                height={200}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <p className='hero-tagline'>The Future of Vaulted Wealth</p>
            <div className='hero-actions'>
              <a href='/products' className='hero-cta'>Explore Products</a>
              <a href='#precious-metals' className='hero-cta-secondary'>Get Started</a>
            </div>
          </div>
        </div>
      </section>

      {/* Live Prices Ticker */}
      <section className='ticker-ribbon'>
        <div className='ticker-track' id='tickerTrack'>
          {/* First set of 4 repetitions */}
          {Array.from({ length: 4 }, (_, repeatIndex) => 
            metals.map((metal, index) => {
              const change = metal.name === 'Gold' ? 2.3 : 
                            metal.name === 'Silver' ? -1.8 : 
                            metal.name === 'Platinum' ? 0.7 : 
                            metal.name === 'Palladium' ? -2.1 : 
                            metal.name === 'Copper' ? 1.2 : 
                            metal.name === 'Rhodium' ? 3.4 : 0.5;
              const isPositive = change >= 0;
              const sign = isPositive ? '+' : '';
              return (
                <div key={`${metal.name}-${repeatIndex}`} className='ticker-link'>
                  <span className='metal-symbol'>{metal.name}</span>
                  <span className='metal-price'>${prices[metal.name] || 'Loading...'}</span>
                  <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                    {sign}{change.toFixed(1)}%
                  </span>
                </div>
              );
            })
          )}
          {/* Second set of 4 repetitions for seamless loop */}
          {Array.from({ length: 4 }, (_, repeatIndex) => 
            metals.map((metal, index) => {
              const change = metal.name === 'Gold' ? 2.3 : 
                            metal.name === 'Silver' ? -1.8 : 
                            metal.name === 'Platinum' ? 0.7 : 
                            metal.name === 'Palladium' ? -2.1 : 
                            metal.name === 'Copper' ? 1.2 : 
                            metal.name === 'Rhodium' ? 3.4 : 0.5;
              const isPositive = change >= 0;
              const sign = isPositive ? '+' : '';
              return (
                <div key={`${metal.name}-copy-${repeatIndex}`} className='ticker-link'>
                  <span className='metal-symbol'>{metal.name}</span>
                  <span className='metal-price'>${prices[metal.name] || 'Loading...'}</span>
                  <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                    {sign}{change.toFixed(1)}%
                  </span>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* About Quote Section */}
      <section className='gs-what-we-do-section'>
        <div className='gs-container'>
          <div className='gs-section-header'>
            <blockquote className='about-quote'>
              <p>
                <RiDoubleQuotesL className='quote-icon-left' />
                Novara Gold was established to be an industry changer in an industry that is desperate for change. We are doing this by making trust, transparency, and honesty at the heart of everything we do. We stand apart from competitors who rely on gimmicks like 'free Silver' or pay high prices for celebrity endorsements. These marketing tactics only raise client costs. By avoiding such practices, we keep our pricing fair, our guidance honest, and our focus where it belongs: protecting and growing your wealth.
                <RiDoubleQuotesR className='quote-icon-right' />
              </p>
              <cite>- Novara Gold</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Core Principles Section - Goldman Sachs Style */}
      <section className='gs-principles-section'>
        <div className='gs-container'>
          <div className='gs-section-header'>
            <h2>Our Core Principles</h2>
            <p>Our commitment to excellence and client success</p>
          </div>
          
          {/* Principles Titles Row */}
          <div className='gs-principles-titles'>
            <a href='/about#integrity' className='gs-principle-title gs-principle-link'>
              <div className='gs-principle-icon'>
                <FiShield />
              </div>
              <h3>Integrity</h3>
            </a>
            
            <a href='/about#no-gimmicks' className='gs-principle-title gs-principle-link'>
              <div className='gs-principle-icon'>
                <FiX />
              </div>
              <h3>No Gimmicks</h3>
            </a>
            
            <a href='/about#no-endorsements' className='gs-principle-title gs-principle-link'>
              <div className='gs-principle-icon'>
                <FiUserX />
              </div>
              <h3>No Endorsements</h3>
            </a>
            
            <a href='/about#security' className='gs-principle-title gs-principle-link'>
              <div className='gs-principle-icon'>
                <FiLock />
              </div>
              <h3>Security</h3>
            </a>
            
            <a href='/about#guidance' className='gs-principle-title gs-principle-link'>
              <div className='gs-principle-icon'>
                <FiClock />
              </div>
              <h3>Guidance</h3>
            </a>
          </div>
          
        </div>
      </section>

      {/* Featured Products Section */}
      <section className='featured-products-section'>
        <div className='gs-container'>
          <div className='gs-section-header'>
            <h2>Featured Products</h2>
            <p>Discover our premium selection of precious metals</p>
          </div>
          
          <div className='featured-products-grid'>
            <div className='featured-product-card'>
              <div className='product-image-container'>
                <Image 
                  src="/images/Gold American Eagle.png" 
                  alt="Gold American Eagle"
                  width={400}
                  height={250}
                  className='product-image'
                  loading="lazy"
                />
              </div>
              <div className='product-info'>
                <h3>Gold American Eagle</h3>
                <p className='product-metal'>Gold</p>
                <p className='product-description'>The most popular gold coin in the world, backed by the U.S. government and IRA-eligible.</p>
                <a href='/products' className='product-link'>View Details →</a>
              </div>
            </div>
            
            <div className='featured-product-card'>
              <div className='product-image-container'>
                <Image 
                  src="/images/Gold Pamp Suisse Bar.png" 
                  alt="Gold PAMP Suisse Bar"
                  width={400}
                  height={250}
                  className='product-image'
                  loading="lazy"
                />
              </div>
              <div className='product-info'>
                <h3>Gold PAMP Suisse Bar</h3>
                <p className='product-metal'>Gold</p>
                <p className='product-description'>Premium gold bars from PAMP Suisse, known for exceptional quality and purity.</p>
                <a href='/products' className='product-link'>View Details →</a>
              </div>
            </div>
            
            <div className='featured-product-card'>
              <div className='product-image-container'>
                <Image 
                  src="/images/Silver American Eagle.png" 
                  alt="Silver American Eagle"
                  width={400}
                  height={250}
                  className='product-image'
                  loading="lazy"
                />
              </div>
              <div className='product-info'>
                <h3>Silver American Eagle</h3>
                <p className='product-metal'>Silver</p>
                <p className='product-description'>America's premier silver bullion coin, offering exceptional value and liquidity.</p>
                <a href='/products' className='product-link'>View Details →</a>
              </div>
            </div>
            
            <div className='featured-product-card'>
              <div className='product-image-container'>
                <Image 
                  src="/images/Palladium RMC Maple Leaf.png" 
                  alt="Palladium RMC Maple Leaf"
                  width={400}
                  height={250}
                  className='product-image'
                  loading="lazy"
                />
              </div>
              <div className='product-info'>
                <h3>Palladium Maple Leaf</h3>
                <p className='product-metal'>Palladium</p>
                <p className='product-description'>Rare palladium coins from the Royal Canadian Mint, offering unique investment opportunities.</p>
                <a href='/products' className='product-link'>View Details →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Thinking Section - Goldman Sachs Style */}
      <section className='gs-thinking-section'>
        <div className='gs-container'>
          <div className='gs-section-header'>
            <h2>Our Thinking</h2>
            <p>Insights on Financial Markets and the Global Economy</p>
          </div>
          
          <div className='gs-thinking-content'>
            <p className='gs-thinking-paragraph'>
              "In times when markets swing like a pendulum and global headlines shift overnight, gold remains the anchor in the sea of uncertainty. At Novara Gold, we analyze trends in inflation, interest rates, and currency movements to help investors understand what the financial noise often hides: True Value Endures. As central banks print, debt rises, and currencies waver, physical gold stands as a timeless store of trust and purchasing power - a safeguard not just against volatility, but against complacency. In short, when others chase trends, we help you preserve wealth that lasts"
              <br />
              <span className='gs-attribution'>- Novara Gold</span>
            </p>
          </div>
          
          <div className='gs-insights-grid'>
            <div className='gs-insight-card'>
              <div className='gs-card-header'>
                <h3>Gold & Silver</h3>
              </div>
              <p>Comprehensive trading and storage solutions for gold and silver investments, from coins to bars.</p>
              <a href='/products' className='gs-service-link'>Explore Gold →</a>
            </div>
            
            <div className='gs-insight-card'>
              <div className='gs-card-header'>
                <h3>Platinum & Palladium</h3>
              </div>
              <p>Specialized services for platinum and palladium investments, including IRA-eligible options.</p>
              <a href='/products' className='gs-service-link'>Explore Platinum →</a>
            </div>
            
            <div className='gs-insight-card'>
              <div className='gs-card-header'>
                <h3>IRA-Eligible Metals</h3>
              </div>
              <p>Expert guidance on IRA-eligible precious metals with full compliance and regulatory support.</p>
              <a href='/ira' className='gs-service-link'>View Options →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Precious Metals Section - Blue Background */}
      <section id='precious-metals' className='precious-metals-section'>
        <div className='container'>
          <div className='metals-content'>
            <div className='carousel-container'>
              <div className='carousel-header'>
                <h2>Unlock Your Precious Metals Potential</h2>
                <p>Discover the power of precious metals investing with our comprehensive investor kit. Get expert insights, market analysis, and personalized guidance from our precious metals specialists.</p>
                
                <div className='features-highlight'>
                  <div className='feature-item'>
                    <h3>IRA-Eligible Metals</h3>
                    <p>Gold, silver, platinum, and palladium coins and bars approved for retirement accounts</p>
                  </div>
                  <div className='feature-item'>
                    <h3>Secure Storage</h3>
                    <p>Industry-leading insured depositories with allocated storage for maximum security</p>
                  </div>
                  <div className='feature-item'>
                    <h3>Expert Guidance</h3>
                    <p>Personalized investment strategies from our precious metals specialists</p>
                  </div>
                  <div className='feature-item'>
                    <h3>Transparent Pricing</h3>
                    <p>No hidden fees, competitive premiums, and real-time market pricing</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='lead-form-container'>
              <div className='form-header'>
                <h3>Request Your Free Investor Kit</h3>
                <p>Get instant access to our exclusive investor resources, market insights, and personalized precious metals guidance from our team of experts.</p>
              </div>
              
              {formSubmitted ? (
                <div className='success-message'>
                  <div className='success-icon'>✓</div>
                  <h4>Investor Kit Requested!</h4>
                  <p>Your free investor kit is being prepared. We'll send it to your email within 24 hours along with a personal consultation invitation from our precious metals experts.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className='lead-form'>
                  <div className='form-group'>
                    <label htmlFor='name'>Full Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className='form-group checkbox-group'>
                    <label className='checkbox-label'>
                      <div className='checkbox-container'>
                        <input
                          type='checkbox'
                          id='consent'
                          name='consent'
                          required
                          className='consent-checkbox'
                        />
                        <span className='checkmark'></span>
                      </div>
                      <span className='consent-text'>
                        By clicking this box, you agree to receive SMS messages about appointment reminders and follow-up messages from Novara Gold. Reply STOP to opt out at any time. For help, text HELP to 424-491-8678. Message and data rates may apply. Messaging frequency may vary.
                        
                        {!showFullConsent && (
                          <button 
                            type='button' 
                            className='see-more-btn'
                            onClick={(e) => {
                              e.preventDefault()
                              setShowFullConsent(true)
                            }}
                          >
                            See More
                          </button>
                        )}
                        
                        {showFullConsent && (
                          <span> You also agree to receive calls, text messages, and prerecorded messages via an automated dialing system about promotions from or on behalf of Novara Gold. You understand that consent is not a condition of purchase.</span>
                        )}
                        
                        <span> See our <a href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.</span>
                      </span>
                    </label>
                  </div>
                  
                  <button type='submit' className='submit-btn'>
                    Request Free Investor Kit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
