# Contentful CMS Setup Guide

## 1. Create Contentful Account
1. Go to [contentful.com](https://contentful.com)
2. Sign up for a free account
3. Create a new space for your project

## 2. Get API Keys
1. In your Contentful space, go to Settings > API keys
2. Copy your Space ID and Content Delivery API access token
3. Create a `.env.local` file in your project root:

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

## 3. Create Content Models
Create these content types in Contentful:

### Market Update Content Type
- **Content Type ID**: `marketUpdate`
- **Fields**:
  - `title` (Short text)
  - `slug` (Short text, unique)
  - `excerpt` (Long text)
  - `content` (Rich text)
  - `featured` (Boolean)
  - `author` (Short text)
  - `publishDate` (Date & time)
  - `tags` (Short text, list)
  - `featuredImage` (Media)

## 4. Add Sample Content
Create a few sample market updates to test the integration.

## 5. Test Integration
Run the development server and check the Market Updates section.

## Contentful Free Tier Limits
- 25,000 records
- 5 users
- 2,000 API requests per day
- 1,000,000 API requests per month

This should be more than enough for your boss's market updates!
