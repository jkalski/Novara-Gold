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
    const response = await client.getEntries({
      content_type: 'marketUpdate',
      order: '-sys.createdAt',
      limit: 10
    })
    return response.items
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
    const response = await client.getEntries({
      content_type: 'marketUpdate',
      'fields.featured': true,
      limit: 1
    })
    return response.items[0] || null
  } catch (error) {
    console.error('Error fetching featured market update:', error)
    return null
  }
}
