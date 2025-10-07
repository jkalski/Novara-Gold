import { createClient } from 'contentful'

// Check if Contentful is configured
const isContentfulConfigured = () => {
  return process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
}

// Create client only if environment variables are available
let client = null
if (isContentfulConfigured()) {
  try {
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    })
  } catch (error) {
    console.error('Error creating Contentful client:', error)
    client = null
  }
}

export default client

// Helper function to get market updates
export async function getMarketUpdates() {
  if (!client) {
    console.log('Contentful not configured, returning empty array')
    return []
  }
  
  try {
    // Get both blog posts and SEO components
    const [blogPosts, seoComponents] = await Promise.all([
      client.getEntries({
        content_type: 'pageBlogPost',
        order: '-sys.createdAt',
        limit: 5
      }),
      client.getEntries({
        content_type: 'componentSeo',
        order: '-sys.createdAt',
        limit: 5
      })
    ])
    
    // Combine and clean up the data
    const allItems = [
      ...blogPosts.items.map(item => ({
        sys: item.sys,
        fields: {
          title: item.fields.title || item.fields.internalName || 'Blog Post',
          shortDescription: item.fields.shortDescription || item.fields.description || 'Blog post content',
          content: item.fields.content || null,
          publishedDate: item.fields.dateTime || null,
          slug: item.fields.slug || null,
          contentType: 'blog',
          allFields: Object.keys(item.fields) // Show what fields are available
        }
      })),
      ...seoComponents.items.map(item => ({
        sys: item.sys,
        fields: {
          title: item.fields.pageTitle || item.fields.internalName || 'SEO Component',
          shortDescription: item.fields.pageDescription || 'SEO optimization component',
          content: item.fields.youTubeUrl ? `YouTube Video: ${item.fields.youTubeUrl}` : null,
          publishedDate: item.fields.dateTime || null,
          slug: null,
          contentType: 'seo',
          youTubeUrl: item.fields.youTubeUrl || null,
          dateTime: item.fields.dateTime || null,
          allFields: Object.keys(item.fields)
        }
      }))
    ]
    
    // Sort by creation date
    return allItems.sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))
  } catch (error) {
    console.error('Error fetching market updates:', error)
    return []
  }
}

// Helper function to get featured market update
export async function getFeaturedMarketUpdate() {
  if (!client) {
    console.log('Contentful not configured, returning null')
    return null
  }
  
  try {
    // Get the most recent item from either blog posts or SEO components
    const [blogPosts, seoComponents] = await Promise.all([
      client.getEntries({
        content_type: 'pageBlogPost',
        order: '-sys.createdAt',
        limit: 1
      }),
      client.getEntries({
        content_type: 'componentSeo',
        order: '-sys.createdAt',
        limit: 1
      })
    ])
    
    // Find the most recent item
    const allItems = [
      ...blogPosts.items.map(item => ({
        sys: item.sys,
        fields: {
          title: item.fields.title || item.fields.internalName || 'Blog Post',
          shortDescription: item.fields.shortDescription || item.fields.description || 'Blog post content',
          content: item.fields.content || null,
          publishedDate: item.fields.dateTime || null,
          slug: item.fields.slug || null,
          contentType: 'blog',
          allFields: Object.keys(item.fields) // Show what fields are available
        }
      })),
      ...seoComponents.items.map(item => ({
        sys: item.sys,
        fields: {
          title: item.fields.pageTitle || item.fields.internalName || 'SEO Component',
          shortDescription: item.fields.pageDescription || 'SEO optimization component',
          content: item.fields.youTubeUrl ? `YouTube Video: ${item.fields.youTubeUrl}` : null,
          publishedDate: item.fields.dateTime || null,
          slug: null,
          contentType: 'seo',
          youTubeUrl: item.fields.youTubeUrl || null,
          dateTime: item.fields.dateTime || null,
          allFields: Object.keys(item.fields)
        }
      }))
    ]
    
    if (allItems.length === 0) return null
    
    // Return the most recent item
    return allItems.sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))[0]
  } catch (error) {
    console.error('Error fetching featured market update:', error)
    return null
  }
}
