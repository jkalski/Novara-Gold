import { useState, useEffect } from 'react'
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
  const [formOpen, setFormOpen] = useState(false)
  const [smsConsent, setSmsConsent] = useState(false)
  const [smsExpanded, setSmsExpanded] = useState(false)
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

  const openForm = (type) => {
    setFormType(type)
    setSubmitted(false)
    setFormOpen(true)
  }

  const closeForm = () => {
    setFormOpen(false)
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

        {/* ── Nav ── */}
        <header className="lp-nav">
          <div className="lp-nav-inner">
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '750px', height: '200px' }}>
              <Image
                src="/images/NavbarLogo.png"
                alt="Novara Gold"
                fill
                priority
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          <a href="tel:+18002431571" className="lp-nav-call">
            Call Now &nbsp;(800) 243-1571
          </a>
        </header>

        {/* ── Hero ── */}
        <section className="lp-hero">
          <div className="lp-hero-overlay" />
          <div className="lp-hero-content">
            <p className="lp-hero-eyebrow">GOLD IRA TRUTH MOST PEOPLE NEVER HEAR</p>
            <h1 className="lp-hero-headline">
              THE MARKUP<br />
              <span className="lp-hero-gold">IS THE SCAM.</span>
            </h1>
            <p className="lp-hero-sub">
              Most investors overpay by 20% to 50%<br />and never realize it.
            </p>
          </div>
        </section>

        {/* ── Video Section ── */}
        <section className="lp-video-section">
          <div className="lp-video-grid">

            {/* Left: video thumbnail with play button */}
            <button className="lp-video-thumb-btn" onClick={() => setVideoOpen(true)} aria-label="Play video">
              <div className="lp-video-thumb-img">
                <Image
                  src="https://img.youtube.com/vi/72JVwgM5T3Q/maxresdefault.jpg"
                  alt="Watch the video"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="lp-play-overlay">
                  <div className="lp-play-circle">
                    <span className="lp-play-icon">&#9654;</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Right: content */}
            <div className="lp-video-content">
              <p className="lp-exclusive-label">EXCLUSIVE VIDEO:</p>
              <h2 className="lp-video-title">
                A Retired White Collar Crime Investigator Exposes How Gold IRA Pricing Really Works
              </h2>
              <p className="lp-video-desc">
                He&rsquo;s seen the tactics. He knows the industry.{' '}
                <span className="lp-gold-text">Now he&rsquo;s telling you what to watch for.</span>
              </p>
              <ul className="lp-video-bullets">
                <li><span className="lp-bullet-check">&#10003;</span> Why Gold IRA markups are hidden in plain sight</li>
                <li><span className="lp-bullet-check">&#10003;</span> How dealers protect their profits, not your wealth</li>
                <li><span className="lp-bullet-check">&#10003;</span> What to know before you invest</li>
              </ul>
            </div>
          </div>

          {/* ── CTA Bar ── */}
          <div className="lp-cta-bar">
            <div className="lp-cta-books">
              <Image
                src="/images/Books.png"
                alt="Gold IRA Buyer's Checklist and 7 Red Flags Guide"
                width={500}
                height={340}
                style={{ objectFit: 'contain', width: 'auto', height: '340px' }}
              />
            </div>
            <div className="lp-cta-actions">
              <button
                className="lp-btn-cta"
                onClick={() => { setVideoOpen(true); openForm('investor-guide') }}
              >
                WATCH THE VIDEO &amp; GET THE GUIDE
              </button>
              <button
                className="lp-cta-alt-link"
                onClick={() => openForm('portfolio-review')}
              >
                OR REQUEST A PRIVATE CONSULTATION
              </button>
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
                &#10005;
              </button>
              <div className="lp-iframe-wrap">
                <iframe
                  src="https://www.youtube.com/embed/72JVwgM5T3Q?autoplay=1"
                  title="Gold IRA Lies: Hidden Fees Exposed"
                  style={{ border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Form Modal ── */}
        {formOpen && (
          <div className="lp-modal-backdrop" onClick={closeForm}>
            <div className="lp-form-modal" onClick={(e) => e.stopPropagation()}>
              <button className="lp-modal-close" onClick={closeForm} aria-label="Close form">&#10005;</button>
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
                  <div className="lp-ty-icon">&#10003;</div>
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
        )}

        {/* ── Footer ── */}
        <footer className="lp-footer">
          <div className="lp-container">


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

GoldIRALandingPage.getLayout = (page) => page
