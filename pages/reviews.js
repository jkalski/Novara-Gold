import SEO from '../components/SEO'

export default function Reviews() {
  return (
    <div className='section'>
      <SEO 
        title="Client Reviews & Testimonials - Novara Gold Customer Experiences"
        description="Read authentic client reviews and testimonials about Novara Gold's precious metals investment services. Real customer experiences with gold, silver, platinum, and palladium investments."
        canonical="/reviews"
        keywords="Novara Gold reviews, precious metals testimonials, gold investment reviews, silver IRA reviews, customer testimonials"
      />
      <div className='container'>
        <div className='section-header'>
          <h1>Client Reviews & Testimonials</h1>
          <p>Hear from our satisfied clients about their experience with Novara Gold</p>
        </div>
        
        <div className='coming-soon-content'>
          <div className='coming-soon-card'>
            <h2>Coming Soon</h2>
            <p>We're working hard to bring you authentic client reviews and testimonials. Check back soon to read about our clients' experiences with Novara Gold.</p>
            <div className='coming-soon-cta'>
              <a href='/contact' className='btn btn-primary'>Contact Us</a>
              <a href='/about' className='btn btn-secondary'>Learn More About Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}