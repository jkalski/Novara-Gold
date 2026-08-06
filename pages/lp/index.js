import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import { LuAward, LuCircleDollarSign, LuHandshake, LuLandmark, LuLockKeyhole, LuShieldCheck, LuStar, LuUsersRound } from 'react-icons/lu'

export default function LandingPage() {
  // ── Inline form state ──
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    window.handleTurnstileCallback = (token) => setTurnstileToken(token)
    window.handleTurnstileExpired = () => setTurnstileToken('')
    return () => {
      delete window.handleTurnstileCallback
      delete window.handleTurnstileExpired
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    const timer = setTimeout(() => {
      const el = document.querySelector('.cf-turnstile')
      if (el && window.turnstile) {
        el.innerHTML = ''
        window.turnstile.render(el, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
        })
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [mounted])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'lead',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          turnstileToken,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const scrollToForm = () => {
    document.getElementById('guide-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>What You Don't Know Could Cost You Thousands | Novara Gold</title>
        <meta
          name="description"
          content="Transparent pricing. Institutional service. No gimmicks. No pressure. Request your free 2026 investor guide."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />

      <div className="ng-page">

        {/* ── Nav ── */}
        <header className="ng-nav">
          <div className="ng-logo-wrap">
            <Image
              src="/images/NavbarLogo.png"
              alt="Novara Gold"
              fill
              priority
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
            />
          </div>
          <div className="ng-nav-phone-block">
            <span className="ng-nav-phone-label">SPEAK WITH A METALS SPECIALIST</span>
            <a href="tel:+18002431571" className="ng-nav-phone-number">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d1f3c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.66A2 2 0 012 1.07h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
              800-243-1571
            </a>
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="ng-hero">
          <div className="ng-hero-overlay" />
          <div className="ng-hero-content">
            <h1 className="ng-hero-headline">
              Before You Buy Gold Anywhere, Read This Free Guide.<br />
              <span className="ng-hero-wealth-line">What You Don't Know Can Cost You <span className="ng-hero-gold">Thousands.</span></span>
            </h1>
            <div className="ng-hero-rule" />
            <p className="ng-hero-sub">
              Learn how to avoid overpriced coins, hidden markups, and costly mistakes before making your next precious metals purchase.
            </p>
            <button className="ng-hero-cta" onClick={scrollToForm}>
              REQUEST THE 2026 INVESTOR GUIDE &nbsp;→
            </button>
            <p className="ng-hero-privacy">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              100% Private &amp; Confidential
            </p>
          </div>
        </section>

        {/* ── Offer Bar ── */}
        <div className="ng-offer-bar">
          <div className="ng-offer-left">
            <span className="ng-offer-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <strong className="ng-offer-no-fees">NO SETUP FEES</strong>
          </div>
          <div className="ng-offer-divider" />
          <div className="ng-offer-center">
            <p className="ng-offer-main">1ST YEAR CUSTODIAL FEES COVERED</p>
            <p className="ng-offer-sub">FOR QUALIFYING NEW ACCOUNTS*</p>
          </div>
          <div className="ng-offer-divider" />
          <p className="ng-offer-note">*Terms and conditions apply.<br />Contact us for details.</p>
        </div>

        {/* ── Features Bar ── */}
        <div className="ng-features-bar">
          {[
            {
              icon: <LuShieldCheck />,
              title: 'Transparent Pricing',
              sub: 'No hidden fees',
            },
            {
              icon: <LuLandmark />,
              title: 'Direct Ownership',
              sub: 'You own your metals',
            },
            {
              icon: <LuLockKeyhole />,
              title: 'Secure Storage',
              sub: 'Top-tier depositories',
            },
            {
              icon: <LuUsersRound />,
              title: 'Concierge Service',
              sub: 'Personalized guidance',
            },
          ].map((f) => (
            <div key={f.title} className="ng-feature">
              <span className="ng-feature-icon">{f.icon}</span>
              <div className="ng-feature-text">
                <p className="ng-feature-title">{f.title}</p>
                <p className="ng-feature-sub">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Split: Why Gold + Form ── */}
        <section className="ng-split">

          {/* Left: Why Gold */}
          <div className="ng-why">
            <p className="ng-why-label">WHY INVESTORS CHOOSE PRECIOUS METALS</p>
            <h2 className="ng-why-headline">
              A Proven Store of Value<br />in Uncertain Times
            </h2>
            <div className="ng-why-rule" />
            <p className="ng-why-body">
              For centuries, gold has served as a reliable store of value, protecting wealth across generations. Today, investors turn to physical metals to help safeguard their purchasing power and create lasting financial security.
            </p>
            <ul className="ng-bullets">
              {[
                'No risk to the New digital world',
                'Protection against inflation and currency debasement',
                'Diversification beyond traditional assets',
                'Global demand with a finite supply',
                'Tangible wealth you can hold',
              ].map((item) => (
                <li key={item}>
                  <span className="ng-bullet-check">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Inline Form */}
          <div className="ng-form-card" id="guide-form">
            {!submitted ? (
              <>
                <h2 className="ng-form-title">Get Your Free Guide</h2>
                <p className="ng-form-sub">
                  Discover how sophisticated investors are using precious metals to protect their wealth.
                </p>
                <form className="ng-form" onSubmit={handleSubmit} noValidate>
                  <div className="ng-form-row">
                    <input
                      className="ng-input"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      autoComplete="given-name"
                    />
                    <input
                      className="ng-input"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      autoComplete="family-name"
                    />
                  </div>
                  <input
                    className="ng-input"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                  <input
                    className="ng-input"
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />

                  {mounted && (
                    <div
                      className="cf-turnstile"
                      data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                      data-callback="handleTurnstileCallback"
                      data-expired-callback="handleTurnstileExpired"
                    />
                  )}

                  {error && <p className="ng-form-error">{error}</p>}

                  <p className="ng-implied-consent">
                    By clicking the button below, you agree to receive SMS messages about appointment reminders and follow-up messages from Novara Gold. Reply STOP to opt out at any time. For help, text HELP to 424-491-8678. Message and data rates may apply. Messaging frequency may vary. You also agree to receive calls, text messages, and prerecorded messages via an automated dialing system about promotions from or on behalf of Novara Gold. You understand that consent is not a condition of purchase. See our <Link href="/policies/privacy">Privacy Policy</Link> and <Link href="/policies/terms">Terms &amp; Conditions</Link>.
                  </p>

                  <button
                    type="submit"
                    className="ng-btn-submit"
                    disabled={submitting || !turnstileToken}
                  >
                    {submitting ? 'Sending…' : 'SEND ME THE GUIDE →'}
                  </button>
                </form>
                <p className="ng-form-privacy">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Your information is secure and will never be shared.
                </p>
              </>
            ) : (
              <div className="ng-thankyou">
                <div className="ng-ty-icon">&#10003;</div>
                <h2>Your Guide is on Its Way!</h2>
                <p>Thank you! A Novara specialist will be in touch shortly with your guide and next steps.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Why Novara Gold ── */}
        <section className="ng-pillars">
          <h2 className="ng-pillars-title">Why <span>Novara</span> Gold</h2>
          <p className="ng-pillars-sub">The Precious Metals Industry Needed a Better Standard. We Built One.</p>
          <div className="ng-pillars-grid">
            {[
              {
                icon: <LuAward />,
                title: 'Years of Experience',
                sub: 'Decades of combined industry expertise',
              },
              {
                icon: <LuStar />,
                title: 'Client Focused',
                sub: 'Your goals, our highest priority',
              },
              {
                icon: <LuShieldCheck />,
                title: 'Trusted Partnerships',
                sub: 'Industry-leading custodians & depositories',
              },
              {
                icon: <LuCircleDollarSign />,
                title: 'Buyback Commitment',
                sub: 'Competitive buyback whenever you need it',
              },
              {
                icon: <LuHandshake />,
                title: 'No Gimmicks',
                sub: 'Straightforward service. Always.',
              },
            ].map((p) => (
              <div key={p.title} className="ng-pillar">
                <span className="ng-pillar-icon">{p.icon}</span>
                <p className="ng-pillar-title">{p.title}</p>
                <p className="ng-pillar-sub">{p.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="ng-testimonials">
          <div className="ng-testimonials-inner">
            <div className="ng-test-left">
              <h2 className="ng-test-heading">Trusted By Investors</h2>
              <div className="ng-test-rule" />
              <p className="ng-test-desc">
                Our clients value transparency, integrity, and the confidence that comes with owning real assets.
              </p>
            </div>
            <div className="ng-test-right">
              {[
                {
                  quote: 'Paul and Alan are very knowledgeable, personable, able, patient, and caring. We feel very comfortable and trust that they have our best interest at heart.',
                  name: 'Ken/Lisa',
                  role: 'Trustpilot review - Updated May 1, 2026',
                },
                {
                  quote: "I've bought gold and silver for years, and they beat every dealer I checked. Fair pricing, fast delivery, and they actually educate you instead of just selling.",
                  name: 'Stanley Martin',
                  role: 'Trustpilot review - Dec 21, 2025',
                },
                {
                  quote: 'Novara Gold made the whole process so educational and transparent. They explained everything clearly before I bought, with full pricing upfront.',
                  name: 'Mackenzie',
                  role: 'Trustpilot review - Nov 7, 2025',
                },
              ].map((t) => (
                <a
                  key={t.name}
                  className="ng-testimonial"
                  href="https://www.trustpilot.com/review/novaragold.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ng-quote-icon">&ldquo;</span>
                  <p className="ng-quote-text">{t.quote}</p>
                  <p className="ng-quote-name">{t.name}</p>
                  <p className="ng-quote-role">{t.role}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Logos ── */}
        <div className="ng-trust-logos">
          <div className="ng-trust-logo-item">
            <Image
              src="/images/BBBImage.png"
              alt="Better Business Bureau"
              width={240}
              height={120}
              style={{ objectFit: 'contain', width: 'auto', height: '110px' }}
            />
            <p className="ng-trust-logo-label">Better Business Bureau</p>
          </div>
          <div className="ng-trust-logo-divider" />
          <div className="ng-trust-logo-item">
            <Image
              src="/images/TrustPilotImage.png"
              alt="Trustpilot"
              width={160}
              height={60}
              style={{ objectFit: 'contain', width: 'auto', height: '50px' }}
            />
            <p className="ng-trust-logo-label">Trustpilot</p>
          </div>
          <div className="ng-trust-logo-divider" />
          <div className="ng-trust-logo-item">
            <Image
              src="/images/googleImage.png"
              alt="Google Reviews"
              width={160}
              height={60}
              style={{ objectFit: 'contain', width: 'auto', height: '50px' }}
            />
            <p className="ng-trust-logo-label">Google Reviews</p>
          </div>
        </div>


        {/* ── Footer ── */}
        <footer className="ng-footer">
          <div className="ng-footer-inner">
            <h4 className="ng-footer-disc-title">Compliance &amp; Legal</h4>
            <p><strong>Investment Disclaimer:</strong> Novara Gold and its representatives are precious metals specialists, but we are not licensed or registered investment advisers, CPAs, attorneys, or other financial service professionals. We do not provide financial, tax, legal or investment advice.</p>
            <p><strong>Risk Warning:</strong> Precious metals, like any investment, carry risk of loss and are not suitable for everyone. Past performance does not guarantee future results. Precious metals may appreciate, depreciate, or remain unchanged depending on various factors.</p>
            <p><strong>Investment Considerations:</strong> Anyone considering purchasing precious metals should carefully evaluate associated risks and acquisition costs before investing. Always consult your financial and tax professional before making investment decisions.</p>
            <p><strong>Long-term Investment:</strong> Novara Gold views precious metals as long-term investments. While you can sell at any time, you should be prepared to hold purchased metals for several years.</p>
            <p><strong>No Guarantees:</strong> Novara Gold cannot guarantee that any metals purchased will appreciate or produce a profit above markup/commissions charged, whether bought for direct delivery or within a precious metals IRA.</p>
            <p><strong>Customer Responsibility:</strong> The decision to purchase or sell precious metals is yours alone. All transactions should be based on your own research, prudence, and judgment.</p>
          </div>
        </footer>

      </div>
    </>
  )
}

LandingPage.getLayout = (page) => page
