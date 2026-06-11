import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import SEO from '../components/SEO'
import { getMarketUpdates, getFeaturedMarketUpdate } from '../lib/contentful'

const YT_CHANNEL = 'https://www.youtube.com/@NovaraGold'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:v=|embed\/|youtu\.be\/)([^&?/]+)/)
  return m ? m[1] : null
}

function ArticleModal({ a, onClose }) {
  const fullText = [a.fields.shortDescription, a.fields.additionalText].filter(Boolean).join('\n\n')
  const date = a.fields.publishedDate
    ? new Date(a.fields.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className='am-backdrop' onClick={onClose}>
      <div className='am-modal' onClick={e => e.stopPropagation()}>
        <button className='am-close' onClick={onClose} aria-label="Close">✕</button>

        <div className='am-header'>
          <div className='am-source-row'>
            {a.fields.sourceName && <span className='am-source'>{a.fields.sourceName}</span>}
            {date && <><span className='am-sep'>·</span><span className='am-date'>{date}</span></>}
          </div>
          <h2 className='am-title'>{a.fields.title}</h2>
        </div>

        <div className='am-body'>
          <p>{fullText}</p>
        </div>

        {a.fields.articleLink && (
          <div className='am-footer'>
            <a href={a.fields.articleLink} target="_blank" rel="noopener noreferrer" className='am-source-btn'>
              View Source &nbsp;→
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

function ArticleCard({ a, featured = false }) {
  const [modalOpen, setModalOpen] = useState(false)
  const fullText = [a.fields.shortDescription, a.fields.additionalText].filter(Boolean).join('\n\n')
  const date = a.fields.publishedDate
    ? new Date(a.fields.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  const category = a.fields.sourceName ? a.fields.sourceName.toUpperCase() : 'MARKET INSIGHT'

  return (
    <>
      <div className={`fa-card${featured ? ' fa-card--featured' : ''}`}>
        <div className='fa-card-label-row'>
          <span className='fa-card-label'>{featured ? 'FEATURED ARTICLE' : category}</span>
          <div className='fa-card-label-line' />
        </div>

        <h3 className={featured ? 'fa-featured-title' : 'fa-card-title'}>{a.fields.title}</h3>

        <div className='fa-source-row'>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
          </svg>
          {a.fields.sourceName && <span className='fa-source-name'>{a.fields.sourceName}</span>}
          {date && <><span className='fa-sep'>|</span><span className='fa-date'>{date}</span></>}
        </div>

        {featured && <div className='fa-featured-rule' />}

        <div className='fa-excerpt-wrap'>
          <p className={featured ? 'fa-featured-excerpt' : 'fa-card-excerpt'}>{fullText}</p>
        </div>

        <div className='fa-card-actions'>
          <button className='fa-expand-btn' onClick={() => setModalOpen(true)}>
            Read More &nbsp;→
          </button>
          {a.fields.articleLink && (
            <a href={a.fields.articleLink} target="_blank" rel="noopener noreferrer" className='fa-source-link'>
              Source &nbsp;↗
            </a>
          )}
        </div>

        {featured && (
          <div className='fa-chart-deco' aria-hidden="true">
            <svg viewBox="0 0 240 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polyline points="0,95 35,80 70,86 110,55 148,62 185,30 210,38 240,12" stroke="rgba(201,162,39,0.22)" strokeWidth="2.5" strokeLinejoin="round"/>
              <circle cx="240" cy="12" r="5" fill="rgba(201,162,39,0.35)"/>
            </svg>
          </div>
        )}
      </div>

      {modalOpen && <ArticleModal a={a} onClose={() => setModalOpen(false)} />}
    </>
  )
}

export default function InsightsPage({ marketUpdates, featuredUpdate, contentfulConfigured }) {
  const videos = marketUpdates.filter(u => u.fields.contentType !== 'article')
  const articles = marketUpdates.filter(u => u.fields.contentType === 'article')
  const [showAllArticles, setShowAllArticles] = useState(false)

  const featuredId = getYouTubeId(featuredUpdate?.fields?.youTubeUrl)
  const featuredThumb = featuredId
    ? `https://img.youtube.com/vi/${featuredId}/maxresdefault.jpg`
    : null
  const spotlightArticle = articles[0] || null
  const spotlightDate = spotlightArticle?.fields?.publishedDate
    ? new Date(spotlightArticle.fields.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <div className='insights-page'>
      <SEO
        title="Market Insights & Analysis - Expert Commentary | Novara Gold"
        description="Stay informed with the latest precious metals market insights, expert analysis, and comprehensive research from Novara Gold specialists."
        canonical="/insights"
        keywords="market insights, precious metals analysis, gold market commentary, silver price analysis, expert insights, market research"
      />

      <div className='container'>

        {/* ── Hero Section ── */}
        <section className='ins-hero'>
          <div className='ins-hero-text'>
            <span className='ins-hero-eyebrow'>NOVARA GOLD INSIGHTS</span>
            <h1 className='ins-hero-title'>Market Insights &amp; Analysis</h1>
            <div className='ins-hero-rule' />
            <p className='ins-hero-subtitle'>Expert commentary and analysis on precious metals markets from our specialists.</p>
          </div>

          <div className='ins-spotlight'>
            <div className='ins-spotlight-left'>
              <div className='ins-spotlight-label'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gs-gold)" strokeWidth="1.8">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>SPOTLIGHT</span>
              </div>
              <h2 className='ins-spotlight-title'>
                {spotlightArticle?.fields?.title || 'Expert Precious Metals Market Analysis'}
              </h2>
              <div className='ins-spotlight-divider' />
              <p className='ins-spotlight-desc'>
                {spotlightArticle?.fields?.shortDescription || 'Stay informed with expert commentary and in-depth analysis on gold and silver markets from the Novara Gold team.'}
              </p>
              {spotlightDate && (
                <div className='ins-spotlight-meta'>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{spotlightDate}</span>
                </div>
              )}
              <div className='ins-spotlight-actions'>
                <a href="#articles-section" className='ins-read-btn'>
                    Articles Section
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                <a href="#insights-content" className='ins-view-all'>
                  View All Insights
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className='ins-spotlight-img-wrap'>
              <Image
                src="/images/insights_img.png"
                alt="Precious metals market analysis"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </section>

        {/* ── Section Header ── */}
        <div id='insights-content' className='vi-header'>
          <span className='vi-eyebrow'>VIDEO INSIGHTS</span>
          <h1 className='vi-title'>Expert Insights. Real Results.</h1>
          <div className='vi-title-rule' />
          <p className='vi-subtitle'>
            Subscribe to our YouTube channel for the latest updates, market commentary,
            and exclusive insights from the Novara Gold team.
          </p>
        </div>

        {contentfulConfigured && (featuredUpdate || videos.length > 0) ? (
          <>
            {/* ── Main Video Card ── */}
            <div className='vi-card'>

              {/* Left: Featured big video */}
              {featuredUpdate && (
                <div
                  className='vi-featured'
                  style={featuredThumb ? { backgroundImage: `url(${featuredThumb})` } : {}}
                >
                  <div className='vi-featured-overlay' />
                  <div className='vi-featured-top'>
                    <span className='vi-featured-badge'>FEATURED</span>
                  </div>
                  <a
                    href={featuredUpdate.fields.youTubeUrl || YT_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='vi-play-btn'
                    aria-label="Play video"
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                      <polygon points="6,3 20,12 6,21" />
                    </svg>
                  </a>
                  <div className='vi-featured-bottom'>
                    <h2 className='vi-featured-title'>
                      {featuredUpdate.fields.title || 'Market Analysis'}
                    </h2>
                    {featuredUpdate.fields.shortDescription && (
                      <p className='vi-featured-desc'>{featuredUpdate.fields.shortDescription}</p>
                    )}
                    <a
                      href={featuredUpdate.fields.youTubeUrl || YT_CHANNEL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='vi-watch-btn'
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                        <path d="M21.8 8s-.3-1.7-1.1-2.4c-.9-.9-1.9-.9-2.3-1C15.7 4.4 12 4.4 12 4.4s-3.7 0-6.4.2c-.4.1-1.4.1-2.3 1C2.5 6.3 2.2 8 2.2 8S2 9.9 2 11.8v1.8c0 1.9.2 3.8.2 3.8s.3 1.7 1.1 2.4c.9.9 2.1.8 2.7 1 1.9.2 8 .2 8 .2s3.7 0 6.4-.2c.4-.1 1.4-.1 2.3-1 .8-.7 1.1-2.4 1.1-2.4s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8zM9.7 15.5V8.6l6.6 3.5-6.6 3.4z" />
                      </svg>
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              )}

              {/* Right: Video list */}
              <div className='vi-list'>
                {videos.map(v => {
                  const id = getYouTubeId(v.fields.youTubeUrl)
                  const thumb = id
                    ? `https://img.youtube.com/vi/${id}/mqdefault.jpg`
                    : null
                  const rawDate = v.fields.dateTime || v.fields.publishedDate
                  const date = rawDate
                    ? new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                    : ''
                  return (
                    <a
                      key={v.sys.id}
                      href={v.fields.youTubeUrl || YT_CHANNEL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='vi-list-item'
                    >
                      <div className='vi-list-thumb'>
                        {thumb
                          ? <img src={thumb} alt={v.fields.title || 'Video thumbnail'} />
                          : <div className='vi-thumb-placeholder' />
                        }
                        <div className='vi-list-play'>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <polygon points="6,3 20,12 6,21" />
                          </svg>
                        </div>
                      </div>
                      <div className='vi-list-info'>
                        <span className='vi-list-title'>{v.fields.title || 'Video'}</span>
                        <span className='vi-list-date'>{date}</span>
                        {v.fields.shortDescription && (
                          <span className='vi-list-desc'>{v.fields.shortDescription}</span>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* ── Stay Updated Banner ── */}
            <div className='vi-subscribe-bar'>
              <div className='vi-subscribe-left'>
                <div className='vi-bell-wrap'>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                </div>
                <div>
                  <strong className='vi-subscribe-heading'>Stay Updated</strong>
                  <p className='vi-subscribe-sub'>Subscribe and turn on notifications to never miss an update.</p>
                </div>
              </div>
              <a
                href={YT_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className='vi-subscribe-btn'
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M21.8 8s-.3-1.7-1.1-2.4c-.9-.9-1.9-.9-2.3-1C15.7 4.4 12 4.4 12 4.4s-3.7 0-6.4.2c-.4.1-1.4.1-2.3 1C2.5 6.3 2.2 8 2.2 8S2 9.9 2 11.8v1.8c0 1.9.2 3.8.2 3.8s.3 1.7 1.1 2.4c.9.9 2.1.8 2.7 1 1.9.2 8 .2 8 .2s3.7 0 6.4-.2c.4-.1 1.4-.1 2.3-1 .8-.7 1.1-2.4 1.1-2.4s.2-1.9.2-3.8v-1.8c0-1.9-.2-3.8-.2-3.8zM9.7 15.5V8.6l6.6 3.5-6.6 3.4z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>

            {/* ── Articles Section ── */}
            {articles.length > 0 && (
              <section id='articles-section' className='fa-section'>
                <div className='fa-header'>
                  <span className='fa-eyebrow'>MARKET COMMENTARY</span>
                  <h2 className='fa-title'>Featured Articles</h2>
                  <div className='fa-title-rule' />
                  <p className='fa-subtitle'>Curated reading and market analysis from trusted sources and the Novara Gold team.</p>
                </div>

                <div className='fa-grid'>
                  {articles[0] && <ArticleCard a={articles[0]} featured={true} />}
                  <div className='fa-right-cards'>
                    {articles.slice(1, 5).map(a => (
                      <ArticleCard key={a.sys.id} a={a} />
                    ))}
                  </div>
                </div>

                {showAllArticles && articles.length > 5 && (
                  <div className='fa-overflow-grid'>
                    {articles.slice(5).map(a => (
                      <ArticleCard key={a.sys.id} a={a} />
                    ))}
                  </div>
                )}

                <div className='fa-footer'>
                  {articles.length > 5 && (
                    <button className='fa-view-all' onClick={() => setShowAllArticles(v => !v)}>
                      {showAllArticles ? 'Show Less' : 'View All Articles'} &nbsp;→
                    </button>
                  )}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className='vi-empty'>
            <div className='vi-empty-inner'>
              <div className='vi-empty-icon'>📝</div>
              <h2>Market Insights Coming Soon</h2>
              <p>We're preparing comprehensive market analysis and expert insights to help you make informed investment decisions.</p>
              {!contentfulConfigured && <p><em>Contentful is not configured or no content is available.</em></p>}
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export async function getStaticProps() {
  try {
    const [marketUpdates, featuredUpdate] = await Promise.all([
      getMarketUpdates(),
      getFeaturedMarketUpdate()
    ])
    return {
      props: {
        marketUpdates: marketUpdates || [],
        featuredUpdate: featuredUpdate || null,
        contentfulConfigured: !!(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN),
        lastUpdated: new Date().toISOString()
      },
      revalidate: 300
    }
  } catch (error) {
    console.error('Error fetching Contentful data:', error)
    return {
      props: {
        marketUpdates: [],
        featuredUpdate: null,
        contentfulConfigured: false
      },
      revalidate: 86400
    }
  }
}
