export default function About() {
  return (
    <div className='about-page'>
      {/* Hero Section */}
      <section className='about-hero'>
        <div className='hero-background'>
          <img src="/images/goldbars.avif" alt="Gold bars" />
        </div>
        <div className='container'>
          <div className='about-hero-content'>
            <h1>Why Novara Gold</h1>
            <p className='about-hero-subtitle'>
              Trust, transparency, and honesty at the heart of everything we do
            </p>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className='about-content'>
        <div className='container'>
          <div className='about-content-wrapper'>
            <div className='about-text'>
              <h2>ABOUT</h2>
              <div className='about-description'>
                <p>
                  Novara Gold was established to be an industry changer in an industry that is desperate for change. 
                  We are doing this by making trust, transparency, and honesty at the heart of everything we do. We stand apart from competitors who rely on gimmicks like "free Silver" or pay high prices for celebrity endorsements. These marketing tactics only raise client costs. By avoiding such practices, we keep our pricing fair, our guidance honest, and our focus where it belongs: protecting and growing your wealth.
                </p>
                <p>
                  We believe in clarity, integrity, and personal service tailored to your needs. Every client deserves the confidence of knowing their financial future is supported by real value- not distractions or inflated promises. Our clients trust us because we keep thing clear, direct, and built to last.
                </p>
                <p>
                  We have over 20 years of experience in the financial markets combining Wall St, Commodities markets, and physical precious metals markets. It is this experience that allows us to help educate and navigate our clients through uncertain times. Novara Gold is here to compliment your investing strategy not change it. We at Novara Gold are just one more member of your financial team. Our main focus is to preserve and protect your hard-earned wealth.
                </p>
                <p>
                  Chose Novara Gold because your wealth deserves more than marketing tricks – it deserves real protection, lasting value, and a partner you can trust.
                </p>
                <p className='tagline'>
                  NOVARA GOLD: The Future of Vaulted Wealth
                </p>
              </div>
            </div>
            <div className='about-images'>
              <div className='about-image-item'>
                <img src="/images/businessMeeting.jpg" alt="Business meeting" />
              </div>
              <div className='about-image-item'>
                <img src="/images/Celebration.jpg" alt="Celebration" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className='about-cta'>
        <div className='container'>
          <div className='cta-content'>
            <h2>Choose Novara Gold</h2>
            <p>
              Because your wealth deserves more than marketing tricks – it deserves real protection, lasting value, 
              and a partner you can trust.
            </p>
            <div className='cta-buttons'>
              <a href="/contact" className='btn btn-primary'>Get Started</a>
              <a href="/products" className='btn btn-secondary'>View Products</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}