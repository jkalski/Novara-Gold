import Head from 'next/head'

export default function SEO({ 
  title = 'Novara Gold - The Future of Vaulted Wealth',
  description = 'Trusted precious metals investment company offering gold, silver, platinum, and palladium IRAs with secure storage and transparent pricing.',
  canonical = '',
  ogImage = '/images/Main Logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords = 'precious metals, gold IRA, silver IRA, platinum, palladium, investment, retirement, secure storage'
}) {
  const siteUrl = 'https://novaragold.com' // Replace with your actual domain
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Novara Gold" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@NovaraGold" />
      <meta name="twitter:creator" content="@NovaraGold" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Novara Gold" />
      <meta name="theme-color" content="#FFD700" />
      
      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Novara Gold",
            "description": "Trusted precious metals investment company offering gold, silver, platinum, and palladium IRAs with secure storage and transparent pricing.",
            "url": siteUrl,
            "logo": `${siteUrl}/images/Main Logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-424-491-8878",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://twitter.com/NovaraGold",
              "https://linkedin.com/company/novara-gold"
            ]
          })
        }}
      />
    </Head>
  )
}
