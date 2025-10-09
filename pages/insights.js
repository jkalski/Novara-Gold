import React, { useState } from 'react'
import Image from 'next/image'
import SEO from '../components/SEO'
import { getMarketUpdates, getFeaturedMarketUpdate } from '../lib/contentful'

// Component for truncated text with "see more" functionality
function TruncatedText({ text, maxLength = 150 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!text || text.length <= maxLength) {
    return <p className='insight-summary'>{text}</p>
  }
  
  const truncatedText = text.substring(0, maxLength)
  const displayText = isExpanded ? text : truncatedText
  
  return (
    <div className='insight-summary'>
      <span>{displayText}</span>
      {!isExpanded && <span>...</span>}
      <button 
        className='see-more-btn'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'See Less' : 'See More'}
      </button>
    </div>
  )
}

// Component for article excerpt with additional text
function ArticleContent({ excerpt, additionalText, maxLength = 250 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const combinedText = excerpt + (additionalText ? ' ' + additionalText : '')
  const shouldTruncate = combinedText.length > maxLength
  
  if (!shouldTruncate) {
    return (
      <>
        <p className='insight-summary'>{excerpt}</p>
        {additionalText && <p className='article-additional-text'>{additionalText}</p>}
      </>
    )
  }
  
  const truncatedText = combinedText.substring(0, maxLength)
  const excerptLength = excerpt.length
  
  return (
    <>
      {isExpanded ? (
        <>
          <p className='insight-summary'>{excerpt}</p>
          {additionalText && <p className='article-additional-text'>{additionalText}</p>}
        </>
      ) : (
        <p className='insight-summary'>{truncatedText}...</p>
      )}
      <button 
        className='article-see-more-btn'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'see less' : 'see more'}
      </button>
    </>
  )
}

export default function InsightsPage({ marketUpdates, featuredUpdate, contentfulConfigured }) {
  return (
    <div className='insights-page'>
      <SEO 
        title="Market Insights & Analysis - Expert Commentary | Novara Gold"
        description="Stay informed with the latest precious metals market insights, expert analysis, and comprehensive research from Novara Gold specialists."
        canonical="/insights"
        keywords="market insights, precious metals analysis, gold market commentary, silver price analysis, expert insights, market research"
      />
      
      <div className='container'>
        {/* Hero Section */}
        <section className='insights-hero'>
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
            <div className='insights-hero-content'>
              <h1>Market Insights & Analysis</h1>
              <p className='insights-hero-subtitle'>
                Expert commentary and analysis on precious metals markets from our specialists
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        {contentfulConfigured && (marketUpdates.length > 0 || featuredUpdate) ? (
          <div className='insights-content'>
            {/* Featured Analysis */}
            {featuredUpdate && (
              <section className='featured-section'>
                <div className='section-header'>
                  <h2>Spotlight</h2>
                </div>
                
                <div className='featured-insight'>
                  <div className='insight-header'>
                    <h3>{featuredUpdate.fields.title || 'Market Analysis'}</h3>
                  </div>
                  <div className='insight-content'>
                    <TruncatedText text={featuredUpdate.fields.shortDescription || 'Latest market insights and analysis.'} maxLength={200} />
                    {featuredUpdate.fields.youTubeUrl && (
                      <div className='insight-video'>
                        <iframe
                          width="100%"
                          height="315"
                          src={featuredUpdate.fields.youTubeUrl.replace("watch?v=", "embed/")}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                    <div className='insight-details'>
                      <p>{featuredUpdate.fields.dateTime ? new Date(featuredUpdate.fields.dateTime).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 'No date set'}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {/* Market Updates Grid - Blog Posts & Videos Only */}
            {marketUpdates.filter(update => update.fields.contentType !== 'article').length > 0 && (
              <section className='updates-section'>
                <div className='section-header'>
                  <span className='section-icon'>📚</span>
                  <h2>Learn with Novara Gold</h2>
                </div>
                
                <div className='updates-grid'>
                  {marketUpdates.filter(update => update.fields.contentType !== 'article').map((update, index) => (
                    <article key={update.sys.id} className='update-card'>
                      <div className='card-header'>
                        <h3>{update.fields.title || `Update ${index + 1}`}</h3>
                      </div>
                      <div className='card-content'>
                        <TruncatedText text={update.fields.shortDescription || 'Latest market insights and analysis.'} maxLength={120} />
                        {update.fields.youTubeUrl && (
                          <div className='update-video'>
                            <iframe
                              width="100%"
                              height="200"
                              src={update.fields.youTubeUrl.replace("watch?v=", "embed/")}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        )}
                        <div className='update-details'>
                          <p>{(update.fields.dateTime || update.fields.publishedDate) ? new Date(update.fields.dateTime || update.fields.publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 'No date set'}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Article Sections - Separate Section */}
            {marketUpdates.filter(update => update.fields.contentType === 'article').length > 0 && (
              <section className='updates-section articles-section'>
                <div className='section-header'>
                  <span className='section-icon'>📰</span>
                  <h2>Featured Articles</h2>
                </div>
                
                <div className='updates-grid'>
                  {marketUpdates.filter(update => update.fields.contentType === 'article').map((update, index) => (
                    <article key={update.sys.id} className='update-card article-card'>
                      <div className='card-header'>
                        <h3>{update.fields.title || `Article ${index + 1}`}</h3>
                        {update.fields.sourceName && (
                          <span className='source-badge'>{update.fields.sourceName}</span>
                        )}
                      </div>
                      <div className='card-content'>
                        <ArticleContent 
                          excerpt={update.fields.shortDescription || 'External article.'} 
                          additionalText={update.fields.additionalText}
                          maxLength={200}
                        />
                        <div className='update-details'>
                          <p>{update.fields.publishedDate ? new Date(update.fields.publishedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 'No date set'}</p>
                          {update.fields.articleLink && (
                            <a 
                              href={update.fields.articleLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className='article-url-display'
                            >
                              {update.fields.articleLink.replace(/^https?:\/\//, '').split('/')[0]}
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          /* Fallback when no Contentful content */
          <section className='no-content-section'>
            <div className='no-content-content'>
              <div className='no-content-icon'>📝</div>
              <h2>Market Insights Coming Soon</h2>
              <p>We're preparing comprehensive market analysis and expert insights to help you make informed investment decisions.</p>
              <p>Check back soon for the latest precious metals market commentary from our specialists.</p>
              {!contentfulConfigured && (
                <p><em>Contentful is not configured or no content is available.</em></p>
              )}
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
        lastUpdated: new Date().toISOString() // Force refresh
      },
      revalidate: 300 // Revalidate every 5 minutes
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
