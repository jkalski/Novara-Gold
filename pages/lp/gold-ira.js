import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'

export default function GoldIRALandingPage() {
  const [formType, setFormType] = useState('investor-guide')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitType, setSubmitType] = useState('investor-guide')
  const [error, setError] = useState('')
  const [videoOpen, setVideoOpen] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [smsExpanded, setSmsExpanded] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState('')
  const [mounted, setMounted] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    window.handleTurnstileCallback = (token) => setTurnstileToken(token)
    window.handleTurnstileExpired = () => setTurnstileToken('')
    return () => {
      delete window.handleTurnstileCallback
      delete window.handleTurnstileExpired
    }
  }, [])

  const scrollToForm = (type) => {
    setFormType(type)
    setSubmitted(false)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

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
          formType: formType === 'investor-guide' ? 'lead' : 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formType === 'portfolio-review' ? 'Portfolio Review Request (Landing Page)' : '',
          message: formType === 'portfolio-review'
            ? `Requested a portfolio review via the Gold IRA landing page.\nPreferred Date: ${formData.preferredDate || 'Not specified'}\nPreferred Time: ${formData.preferredTime || 'Not specified'}`
            : '',
          turnstileToken,
        }),
      })
      if (!res.ok) throw new Error('failed')
      setSubmitType(formType)
      setSubmitted(true)
      if (formType === 'investor-guide') {
        const a = document.createElement('a')
        a.href = '/novara-gold-investor-guide.pdf'
        a.download = 'Novara-Gold-Investor-Guide.pdf'
        a.click()
      }
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '', preferredDate: '', preferredTime: '' })
    setSmsConsent(false)
    setSmsExpanded(false)
    setError('')
  }

  return (
    <>
      <Head>
        <title>The Gold IRA Transparency Problem | Novara Gold</title>
        <meta
          name="description"
          content="Most precious-metals dealers charge hidden markups investors never see. Download our free investor guide to learn how to protect yourself."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />

      <div className="lp-page">

        {/* ── Minimal Nav ── */}
        <header className="lp-nav">
          <div className="lp-nav-inner">
            <Image
              src="/images/NavbarLogo.png"
              alt="Novara Gold"
              width={300}
              height={64}
              priority
              style={{ objectFit: 'contain', margin: '-14px 0' }}
            />
          </div>
        </header>

        {/* ── Hero ── */}
        <section className="lp-hero">
          <div className="lp-hero-bg" />
          <div className="lp-container lp-hero-content">
            <h1 className="lp-hero-headline">
              The Gold IRA Industry Has<br />a Transparency Problem
            </h1>
            <p className="lp-hero-sub">
              Most precious-metals dealers charge hidden markups investors never see —<br className="lp-br-hide" />
              Novara Gold was built to change that.
            </p>
            <div className="lp-hero-btns">
              <button
                className="lp-btn-gold"
                onClick={() => scrollToForm('investor-guide')}
              >
                Download the Investor Guide
              </button>
              <button
                className="lp-btn-outline"
                onClick={() => scrollToForm('portfolio-review')}
              >
                Request a Portfolio Review
              </button>
            </div>
            <div className="lp-trust-bar">
              <span>✓ Transparent Pricing Model</span>
              <span>✓ No Gimmick Promotions</span>
              <span>✓ Institutional Vaulting Partners</span>
              <span>✓ Education-First Approach</span>
            </div>
          </div>
        </section>

        {/* ── Comparison ── */}
        <section className="lp-comparison">
          <div className="lp-container">
            <div className="lp-compare-grid">
              <div className="lp-compare-col lp-compare-dealer">
                <h3>Typical Gold Dealer</h3>
                <ul>
                  <li><span className="lp-check">✓</span> &ldquo;Free Silver&rdquo; Claims</li>
                  <li><span className="lp-check">✓</span> Celebrity Endorsements</li>
                  <li><span className="lp-check">✓</span> Hidden Fees</li>
                  <li><span className="lp-check">✓</span> 40–100% Markups</li>
                </ul>
              </div>
              <div className="lp-compare-col lp-compare-novara">
                <h3>The Novara Gold Difference</h3>
                <ul>
                  <li><span className="lp-check lp-check-gold">✓</span> Transparent Pricing</li>
                  <li><span className="lp-check lp-check-gold">✓</span> Institutional Approach</li>
                  <li><span className="lp-check lp-check-gold">✓</span> Education Before Sales</li>
                  <li><span className="lp-check lp-check-gold">✓</span> Fair Spreads</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Transparency ── */}
        <section className="lp-pricing">
          <div className="lp-container">
            <div className="lp-pricing-inner">
              <div className="lp-pricing-text">
                <h2>What Most Investors Never See</h2>
                <table className="lp-price-table">
                  <thead>
                    <tr>
                      <th>1 oz Coin</th>
                      <th>Market Price</th>
                      <th>Dealer Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 oz Coin</td>
                      <td className="lp-price-market">$4,600</td>
                      <td className="lp-price-dealer">$5,300</td>
                    </tr>
                  </tbody>
                </table>
                <p className="lp-overpaying">Are you overpaying?</p>
                <button
                  className="lp-btn-gold"
                  onClick={() => scrollToForm('investor-guide')}
                >
                  Download Free Guide
                </button>
              </div>
              <div className="lp-pricing-image">
                <Image
                  src="/images/Gold Bullion Bars.png"
                  alt="Gold bullion bars"
                  width={320}
                  height={240}
                  style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Video ── */}
        <section className="lp-video-section">
          <h2 className="lp-video-heading">
            Insights From Inside the Precious Metals Industry
          </h2>
          <div className="lp-container">
            <div className="lp-cover-image-wrap">
              <Image
                src="/images/coverImage.png"
                alt="Insights from inside the precious metals industry"
                width={800}
                height={450}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>
        </section>

        {/* ── Video Modal ── */}
        {videoOpen && (
          <div className="lp-modal-backdrop" onClick={() => setVideoOpen(false)}>
            <div className="lp-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="lp-modal-close"
                onClick={() => setVideoOpen(false)}
                aria-label="Close video"
              >
                ✕
              </button>
              <div className="lp-iframe-wrap">
                {/* Replace the src with your actual YouTube embed URL */}
                <iframe
                  src="https://www.youtube.com/embed/?autoplay=1"
                  title="Gold IRA Lies: Hidden Fees Exposed"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Lead Form ── */}
        <section className="lp-form-section" ref={formRef} id="lead-form">
          <div className="lp-container">
            <div className="lp-form-card">
              {!submitted ? (
                <>
                  <h2 className="lp-form-title">
                    {formType === 'investor-guide'
                      ? 'Download the Novara Gold Investor Guide'
                      : 'Request a Free Portfolio Review'}
                  </h2>
                  <p className="lp-form-sub">
                    {formType === 'investor-guide'
                      ? 'Learn how the precious metals industry really works.'
                      : 'Speak with a Novara specialist about your portfolio goals.'}
                  </p>

                  <div className="lp-tabs">
                    <button
                      className={`lp-tab ${formType === 'investor-guide' ? 'lp-tab-active' : ''}`}
                      onClick={() => setFormType('investor-guide')}
                    >
                      Investor Guide
                    </button>
                    <button
                      className={`lp-tab ${formType === 'portfolio-review' ? 'lp-tab-active' : ''}`}
                      onClick={() => setFormType('portfolio-review')}
                    >
                      Portfolio Review
                    </button>
                  </div>

                  <form className="lp-form" onSubmit={handleSubmit} noValidate>
                    <input
                      className="lp-input"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                    />
                    <input
                      className="lp-input"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                    <input
                      className="lp-input"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                    />
                    {formType === 'portfolio-review' && (
                      <>
                        <label className="lp-input-label">Preferred Date to Be Reached</label>
                        <input
                          className="lp-input"
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <label className="lp-input-label">Preferred Time</label>
                        <input
                          className="lp-input"
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleChange}
                          required
                        />
                      </>
                    )}
                    <label className="lp-sms-consent">
                      <input
                        type="checkbox"
                        checked={smsConsent}
                        onChange={(e) => setSmsConsent(e.target.checked)}
                        required
                      />
                      <span className="lp-sms-text">
                        By clicking this box, you agree to receive SMS messages about appointment reminders and follow-up messages from Novara Gold. Reply STOP to opt out at any time. For help, text HELP to 424-491-8678. Message and data rates may apply. Messaging frequency may vary.{' '}
                        {!smsExpanded ? (
                          <button type="button" className="lp-sms-toggle" onClick={() => setSmsExpanded(true)}>See More</button>
                        ) : (
                          <>
                            You also agree to receive calls, text messages, and prerecorded messages via an automated dialing system about promotions from or on behalf of Novara Gold. You understand that consent is not a condition of purchase.{' '}
                            <button type="button" className="lp-sms-toggle" onClick={() => setSmsExpanded(false)}>See Less</button>
                          </>
                        )}{' '}
                        See our <Link href="/policies/privacy">Privacy Policy</Link> and <Link href="/policies/terms">Terms &amp; Conditions</Link>.
                      </span>
                    </label>
                    {mounted && (
                      <div
                        className="cf-turnstile"
                        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                        data-callback="handleTurnstileCallback"
                        data-expired-callback="handleTurnstileExpired"
                      />
                    )}
                    {error && <p className="lp-form-error">{error}</p>}
                    <button
                      type="submit"
                      className="lp-btn-submit"
                      disabled={submitting || !smsConsent || !turnstileToken}
                    >
                      {submitting
                        ? 'Sending…'
                        : formType === 'investor-guide'
                        ? 'Download Now'
                        : 'Request My Review'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="lp-thankyou">
                  <div className="lp-ty-icon">✓</div>
                  <h2>
                    {submitType === 'investor-guide'
                      ? 'Your Guide is on Its Way!'
                      : 'Request Received!'}
                  </h2>
                  <p>
                    {submitType === 'investor-guide'
                      ? 'Thank you! Your investor guide download should begin shortly. A confirmation has also been sent to your email.'
                      : 'Thank you! A Novara specialist will reach out within 1 business day.'}
                  </p>
                  <button className="lp-btn-gold lp-btn-sm" onClick={resetForm}>
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="lp-footer">
          <div className="lp-container">

            <div className="lp-footer-top">
              {/* Logo */}
              <div className="lp-footer-brand">
                <Image
                  src="/images/NavbarLogo.png"
                  alt="Novara Gold"
                  width={160}
                  height={42}
                  style={{ objectFit: 'contain' }}
                />
                <p className="lp-footer-tagline">
                  © {new Date().getFullYear()} Novara Gold. All rights reserved.
                </p>
              </div>

              {/* Contact */}
              <div className="lp-footer-col">
                <h4 className="lp-footer-heading">Contact</h4>
                <p><span className="lp-footer-label">Phone:</span><br /><a href="tel:+18002431571">(800) 243-1571</a></p>
                <p><span className="lp-footer-label">Email:</span><br /><a href="mailto:info@novaragold.com">info@novaragold.com</a></p>
                <p><span className="lp-footer-label">Address:</span><br />10880 Wilshire Blvd Suite 1101<br />Los Angeles, CA 90024</p>
              </div>

              {/* Invest */}
              <div className="lp-footer-col">
                <h4 className="lp-footer-heading">Invest</h4>
                <Link href="/shop-metals">Shop Metals</Link>
                <Link href="/ira-eligible-metals">IRA-Eligible Metals</Link>
                <h4 className="lp-footer-heading" style={{ marginTop: '1rem' }}>IRA</h4>
                <Link href="/ira">Overview</Link>
                <Link href="/ira/how-it-works">How It Works</Link>
                <Link href="/ira/rollover-transfer">Rollover &amp; Transfer</Link>
                <Link href="/ira/fees-minimums">Fees &amp; Minimums</Link>
              </div>

              {/* Research & Policies */}
              <div className="lp-footer-col">
                <h4 className="lp-footer-heading">Research &amp; Analysis</h4>
                <Link href="/market-chart">Market Chart</Link>
                <Link href="/glossary">Glossary</Link>
                <h4 className="lp-footer-heading" style={{ marginTop: '1rem' }}>Policies &amp; Legal</h4>
                <Link href="/policies/privacy">Privacy Policy</Link>
                <Link href="/policies/sms">SMS Policy</Link>
                <Link href="/policies/risk-disclosure">Risk Disclosure</Link>
                <Link href="/policies/compliance">Compliance &amp; Legal</Link>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="lp-footer-disclaimers">
              <h4 className="lp-footer-disclaimers-title">Compliance &amp; Legal</h4>
              <p><strong>Investment Disclaimer:</strong> Novara Gold and its representatives are precious metals specialists, but we are not licensed or registered investment advisers, CPAs, attorneys, or other financial service professionals. We do not provide financial, tax, legal or investment advice.</p>
              <p><strong>Risk Warning:</strong> Precious metals, like any investment, carry risk of loss and are not suitable for everyone. Past performance does not guarantee future results. Precious metals may appreciate, depreciate, or remain unchanged depending on various factors.</p>
              <p><strong>Investment Considerations:</strong> Anyone considering purchasing precious metals should carefully evaluate associated risks and acquisition costs before investing. Always consult your financial and tax professional before making investment decisions.</p>
              <p><strong>Long-term Investment:</strong> Novara Gold views precious metals as long-term investments. While you can sell at any time, you should be prepared to hold purchased metals for several years.</p>
              <p><strong>No Guarantees:</strong> Novara Gold cannot guarantee that any metals purchased will appreciate or produce a profit above markup/commissions charged, whether bought for direct delivery or within a precious metals IRA.</p>
              <p><strong>Customer Responsibility:</strong> The decision to purchase or sell precious metals is yours alone. All transactions should be based on your own research, prudence, and judgment.</p>
            </div>

          </div>
        </footer>
      </div>
    </>
  )
}

// Opt out of the site-wide Layout (no full navbar/footer)
GoldIRALandingPage.getLayout = (page) => page
