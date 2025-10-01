import SEO from '../../components/SEO'
import Image from 'next/image'
import Link from 'next/link'

export default function Products() {
  return (
    <div className='products-page'>
      <SEO 
        title="Precious Metals Products - Gold, Silver, Platinum & Palladium | Novara Gold"
        description="Explore our comprehensive range of precious metals products including gold, silver, platinum, and palladium coins and bars. Secure storage and transparent pricing for all investments."
        canonical="/products"
        keywords="precious metals products, gold coins, silver coins, platinum bars, palladium investment, precious metals portfolio"
      />
      
      {/* Hero Section */}
      <section className='products-hero'>
        <div className='container'>
          <div className='hero-content'>
            <h1>Gold and Silver Products</h1>
            <p className='hero-subtitle'>
              Discover our comprehensive range of precious metals investment products. From gold and silver to platinum and palladium, we offer secure storage and transparent pricing for all your precious metals investments.
            </p>
          </div>
        </div>
      </section>

      <div className='container'>

        {/* Products Grid */}
        <section className='products-grid-section'>
          <div className='products-layout'>
            <div className='products-grid'>
            
            {/* Gold Products */}
            <div className='product-card' id="gold">
              <div className='product-image'>
                <Image 
                  src="/images/Gold American Eagle.png" 
                  alt="United States Mint Gold American Eagle 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold American Eagle</h3>
                <Link href="/products/gold-american-eagle" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold American Buffalo.png" 
                  alt="United States Mint Gold American Buffalo 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold American Buffalo</h3>
                <Link href="/products/gold-american-buffalo" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold Austrian Philharmonic.png" 
                  alt="Austrian Mint Gold Philharmonic 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold Austrian Philharmonic</h3>
                <Link href="/products/gold-austrian-philharmonic" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold Maple Leaf.png" 
                  alt="Royal Canadian Mint Gold Maple Leaf 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold Maple Leaf</h3>
                <Link href="/products/gold-maple-leaf" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold Brittania (2013).png" 
                  alt="The Royal Mint Gold Britannia 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold Britannia (2013-Present)</h3>
                <Link href="/products/gold-britannia" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold Pamp Suisse Bar.png" 
                  alt="Gold Pamp Suisse Bar 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold Pamp Suisse Bar</h3>
                <Link href="/products/gold-pamp-suisse-bar" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Brittania Gold Bar.png" 
                  alt="Britannia Gold Bar 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Britannia Gold Bar</h3>
                <Link href="/products/britannia-gold-bar" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold Bullion Bars.png" 
                  alt="1 oz Gold Generic Bar .9999" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold Bullion Bars</h3>
                <Link href="/products/gold-bullion-bars" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Gold American Eagle Proof Box and COA.png" 
                  alt="United States Mint Gold American Eagle Proof 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Gold American Eagle Proof w/ Box and COA</h3>
                <Link href="/products/gold-american-eagle-proof" className='product-btn'>View Product</Link>
              </div>
            </div>

            {/* Silver Products */}
            <div className='product-card' id="silver">
              <div className='product-image'>
                <Image 
                  src="/images/Silver American Eagle.png" 
                  alt="United States Mint Silver American Eagle 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Silver American Eagle</h3>
                <Link href="/products/silver-american-eagle" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Silver Maple Leaf.png" 
                  alt="Royal Canadian Mint Silver Maple Leaf 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Silver Maple Leaf</h3>
                <Link href="/products/silver-maple-leaf" className='product-btn'>View Product</Link>
              </div>
            </div>

            <div className='product-card'>
              <div className='product-image'>
                <Image 
                  src="/images/Silver Bullion Bars.png" 
                  alt="10 oz Silver Bar" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className='silver-bars-image'
                />
              </div>
              <div className='product-info'>
                <h3>Silver Bullion Bars</h3>
                <Link href="/products/silver-bullion-bars" className='product-btn'>View Product</Link>
              </div>
            </div>

            {/* Platinum Products */}
            <div className='product-card' id="platinum">
              <div className='product-image'>
                <Image 
                  src="/images/Platinum Eagle.png" 
                  alt="United States Mint Platinum Eagle 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                  className='platinum-image'
                />
              </div>
              <div className='product-info'>
                <h3>Platinum Eagle</h3>
                <Link href="/products/platinum-eagle" className='product-btn'>View Product</Link>
              </div>
            </div>

            {/* Palladium Products */}
            <div className='product-card' id="palladium">
              <div className='product-image'>
                <Image 
                  src="/images/Palladium RMC Maple Leaf.png" 
                  alt="Royal Canadian Mint Palladium Maple Leaf 1 oz" 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='product-info'>
                <h3>Palladium RMC Maple Leaf</h3>
                <Link href="/products/palladium-rmc-maple-leaf" className='product-btn'>View Product</Link>
              </div>
            </div>
          </div>
            
          {/* Sidebar */}
          <div className='products-sidebar'>
              <div className='sidebar-section'>
                <h3>Why Choose Novara Gold?</h3>
                <ul>
                  <li>✓ IRA Approved Products</li>
                  <li>✓ Secure Storage Options</li>
                  <li>✓ Transparent Pricing</li>
                  <li>✓ Expert Guidance</li>
                  <li>✓ Fast Delivery</li>
                </ul>
              </div>
              
              <div className='sidebar-section'>
                <h3>Get Your Free Guide</h3>
                <p>Download our comprehensive guide to precious metals investing.</p>
                <a href='#precious-metals' className='sidebar-btn'>Get Your Free Guide</a>
              </div>
              
              <div className='sidebar-section'>
                <h3>Contact Us</h3>
                <p>Have questions about our products?</p>
                <p className='phone-number'>(800) 243-1571</p>
                <button className='sidebar-btn'>Call Now</button>
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
                </div>
                <div className='invest-image-container'>
                  <Image 
                    src="/images/goldbarsbackground2.jpg" 
                    alt="Precious Metals Investment Opportunities"
                    width={600}
                    height={400}
                    className='invest-image'
                  />
                </div>
              </div>
              
              <div className='lead-form-container'>
                <div className='form-header'>
                  <h3>Request Your Free Investor Kit</h3>
                  <p>Get instant access to our exclusive investor resources, market insights, and personalized precious metals guidance from our team of experts.</p>
                </div>
                
                <form className='lead-form'>
                  <div className='form-group'>
                    <label htmlFor='name'>Full Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      required
                    />
                  </div>
                  
                  <div className='form-group checkbox-group'>
                    <label className='checkbox-label'>
                      <input
                        type='checkbox'
                        id='consent'
                        name='consent'
                        required
                        className='consent-checkbox'
                      />
                      <span className='checkmark'></span>
                      <div className='consent-text'>
                        <span>By clicking this box, you agree to receive SMS messages about appointment reminders and follow-up messages from Novara Gold. Reply STOP to opt out at any time. For help, text 424-491-8878. Message and data rates may apply. Messaging frequency may vary. You also agree to receive calls, text messages, and prerecorded messages via an automated dialing system about promotions from or on behalf of Novara Gold. You understand that consent is not a condition of purchase. See our <a href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.</span>
                      </div>
                    </label>
                  </div>
                  
                  <button type='submit' className='submit-btn'>
                    Request Free Investor Kit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{textAlign: 'center', padding: '3rem 0'}}>
          <div className='card' style={{background: 'linear-gradient(135deg, var(--blue-600), var(--blue-800))', color: 'white'}}>
            <h3 style={{marginTop: 0, color: 'white'}}>Ready to Start Your Precious Metals Investment?</h3>
            <p style={{fontSize: '1.1rem', marginBottom: '2rem'}}>
              Contact our experts to discuss your investment goals and find the right precious metals for your portfolio.
            </p>
            <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
              <a href="/contact" style={{
                background: 'white',
                color: 'var(--blue-600)',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                Get Started
              </a>
              <a href="/ira" style={{
                background: 'transparent',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: 'bold',
                border: '2px solid white',
                display: 'inline-block'
              }}>
                Learn About IRA
              </a>
            </div>
        </div>
        </section>
      </div>
    </div>
  )
}