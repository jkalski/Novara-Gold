import Image from 'next/image'
import SEO from '../components/SEO'

export default function About() {
  return (
    <div className='about-page'>
      <SEO 
        title="About Novara Gold - Trust, Transparency & Honesty in Precious Metals"
        description="Learn about Novara Gold's commitment to trust, transparency, and honesty in precious metals investment. Over 20 years of experience in financial markets with no gimmicks or celebrity endorsements."
        canonical="/about"
        keywords="about Novara Gold, precious metals company, trust transparency, honest investment advice, financial markets experience"
      />
      {/* Hero Section */}
      <section className='about-hero'>
        <div className='hero-background'>
          <Image 
            src="/images/goldbarsBackground.jpg" 
            alt="Gold bars" 
            width={1920}
            height={1080}
            priority
          />
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
              <div className='about-bbb-badge'>
                <a href="https://www.bbb.org/losangelessiliconvalley/quote/request-novara-gold-llc-1000047985/#buttonclick" target="_blank" rel="nofollow">
                  <img src="https://seal-sanjose.bbb.org/request-a-quote/blue-badge-160-61-blue-bbb-1000047985.png" style={{border: 0}} alt="Novara Gold LLC BBB Business Review" />
                </a>
              </div>
            </div>
            <div className='about-images'>
              <div className='about-image-item'>
                <Image 
                  src="/images/people3.jpg" 
                  alt="Team collaboration" 
                  width={400}
                  height={300}
                />
              </div>
              <div className='about-image-item'>
                <Image 
                  src="/images/people1.jpg" 
                  alt="Business meeting" 
                  width={400}
                  height={300}
                />
              </div>
              <div className='about-image-item'>
                <Image 
                  src="/images/people2.jpg" 
                  alt="Celebration" 
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Section */}
      <section id='principles' className='principles-section'>
        <div className='container'>
          <div className='principles-header'>
            <h2>Our Core Principles</h2>
            <p>Our commitment to excellence and client success</p>
          </div>
          
          <div className='principles-content'>
            <div id='integrity' className='principle-item principle-integrity'>
              <div className='principle-content'>
                <h3>Integrity</h3>
                <p>We provide honest advice without hidden agendas or inflated promises. Every asset will be explained in detail and pricing is straight forward. All costs and markups will be explained. Every bar, coin, or round has been approved by management that is inline with our core values, and our client's best interest in mind.</p>
              </div>
            </div>
            
            <div id='no-gimmicks' className='principle-item principle-no-gimmicks'>
              <div className='principle-content'>
                <h3>No Gimmicks</h3>
                <p>While we do understand other companies need to promote these gimmicks like "free Silver" or "free storage" to attract customers, we at Novara Gold do not feel the same way. Our clients come to Novara Gold because they have been educated correctly and realize that nothing in this industry is free. Our competitors charge large markups to make up for these "promotions". At Novara Gold we do not want to raise costs for our clients. You will never see us offer any "free silver" or "free storage". We will rely on customer experiences to grow our company.</p>
              </div>
            </div>
            
            <div id='no-endorsements' className='principle-item principle-no-endorsements'>
              <div className='principle-content'>
                <h3>No Endorsements</h3>
                <p>No paid celebrities. These well-known endorsers come with very high prices. Those prices have to be passed on to the client. We will not partake in these types of cost pass throughs. We will solely rely on actual client reviews to grow our brand. We feel that actual client experiences are worth much more than someone paid to speak on our behalf.</p>
              </div>
            </div>
            
            <div id='security' className='principle-item principle-security'>
              <div className='principle-content'>
                <h3>Security</h3>
                <p>Industry-leading secure storage solutions with insured depositories, providing peace of mind for your precious metals investments.</p>
              </div>
            </div>
            
            <div id='guidance' className='principle-item principle-guidance'>
              <div className='principle-content'>
                <h3>Guidance</h3>
                <p>Many firms in the precious metals space push clients into high-markup products or semi-numismatic coins that primarily benefit the company- not the client. At Novara Gold, our philosophy is different. We educate and guide our clients towards the metals and strategies that align with their long-term goals, not with our short-term profit. By focusing on suitability, clarity, and value, we ensure that every recommendation is made with one purpose: helping you preserve and grow wealth the right away.</p>
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