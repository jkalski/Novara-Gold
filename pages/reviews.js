import SEO from '../components/SEO'
import Image from 'next/image'

const reviews = [
  {
    quote: 'Paul and Alan are very knowledgeable, personable, able, patient, and caring. We feel very comfortable and trust that they have our best interest at heart.',
    name: 'Ken/Lisa',
    date: 'Updated May 1, 2026',
    rating: 5,
  },
  {
    quote: "I've bought gold and silver for years, and they beat every dealer I checked. Fair pricing, fast delivery, and they actually educate you instead of just selling.",
    name: 'Stanley Martin',
    date: 'Dec 21, 2025',
    rating: 5,
  },
  {
    quote: 'Novara Gold made the whole process so educational and transparent. They explained everything clearly before I bought, with full pricing upfront.',
    name: 'Mackenzie',
    date: 'Nov 7, 2025',
    rating: 5,
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '0.75rem' }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#00b67a" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

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
          <h1>Client Reviews &amp; Testimonials</h1>
          <p>Hear from our clients about their experience with Novara Gold</p>
        </div>

        {/* Trustpilot banner */}
        <a
          href="https://www.trustpilot.com/review/novaragold.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            background: '#0d0f14',
            border: '1px solid rgba(0,183,122,0.35)',
            borderRadius: '8px',
            padding: '1.25rem 2rem',
            marginBottom: '3rem',
            textDecoration: 'none',
            flexWrap: 'wrap',
          }}
        >
          <Image
            src="/images/TrustPilotImage.png"
            alt="Trustpilot"
            width={140}
            height={36}
            style={{ objectFit: 'contain', height: '36px', width: 'auto' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#00b67a">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span style={{ color: '#e2e8f0', fontSize: '0.95rem', fontWeight: 600 }}>
            See all reviews on Trustpilot &rarr;
          </span>
        </a>

        {/* Review cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}>
          {reviews.map((r) => (
            <a
              key={r.name}
              href="https://www.trustpilot.com/review/novaragold.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1.75rem',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Stars count={r.rating} />
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#374151', marginBottom: '1rem' }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', margin: 0 }}>{r.name}</p>
              <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: '0.2rem 0 0' }}>Trustpilot — {r.date}</p>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="https://www.trustpilot.com/review/novaragold.com"
            target="_blank"
            rel="noopener noreferrer"
            className='btn btn-primary'
          >
            View All Reviews on Trustpilot
          </a>
        </div>

      </div>
    </div>
  )
}
