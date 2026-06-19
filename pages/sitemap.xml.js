const BASE_URL = 'https://www.novaragold.com'

const staticPages = [
  { path: '/',                    priority: '1.0', changefreq: 'weekly'  },
  { path: '/ira',                 priority: '0.9', changefreq: 'weekly'  },
  { path: '/products',            priority: '0.9', changefreq: 'weekly'  },
  { path: '/insights',            priority: '0.8', changefreq: 'weekly'  },
  { path: '/research',            priority: '0.8', changefreq: 'weekly'  },
  { path: '/ira/how-it-works',    priority: '0.8', changefreq: 'monthly' },
  { path: '/ira/rollover',        priority: '0.8', changefreq: 'monthly' },
  { path: '/ira/faq',             priority: '0.8', changefreq: 'monthly' },
  { path: '/ira/fees',            priority: '0.7', changefreq: 'monthly' },
  { path: '/buyback',             priority: '0.7', changefreq: 'monthly' },
  { path: '/reviews',             priority: '0.7', changefreq: 'monthly' },
  { path: '/about',               priority: '0.6', changefreq: 'monthly' },
  { path: '/contact',             priority: '0.6', changefreq: 'monthly' },
  { path: '/glossary',            priority: '0.5', changefreq: 'monthly' },
]

const productSlugs = [
  'gold-american-eagle',
  'gold-american-buffalo',
  'gold-austrian-philharmonic',
  'gold-maple-leaf',
  'gold-britannia',
  'gold-pamp-suisse-bar',
  'britannia-gold-bar',
  'gold-bullion-bars',
  'gold-american-eagle-proof',
  'silver-american-eagle',
  'silver-maple-leaf',
  'silver-bullion-bars',
  'platinum-eagle',
  'palladium-rmc-maple-leaf',
]

function buildUrl({ path, priority, changefreq }) {
  return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

export default function Sitemap() {
  return null
}

export async function getServerSideProps({ res }) {
  const productPages = productSlugs.map((slug) => ({
    path: `/products/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }))

  const allPages = [...staticPages, ...productPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(buildUrl).join('')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(xml)
  res.end()

  return { props: {} }
}
