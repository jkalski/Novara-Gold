import { useRouter } from 'next/router'
import Image from 'next/image'
import SEO from '../../components/SEO'
import Link from 'next/link'

// Product data - this would typically come from a CMS or database
const products = {
  'gold-american-eagle': {
    name: 'Gold American Eagle',
    description: 'The Gold American Eagle is the official gold bullion coin of the United States. First released in 1986, it is produced by the United States Mint and is backed by the U.S. government.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9167',
      'Mint/Brand': 'United States Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9167 fine Gold',
      'Obverse: Augustus Saint-Gaudens\' design of Lady Liberty',
      'Reverse: Family of eagles design',
      'Sovereign coin backed by the U.S. government',
      'Also available in ½ oz, ¼ oz, and 1/10 oz sizes'
    ],
    image: '/images/Gold American Eagle.png',
    alt: 'United States Mint Gold American Eagle 1 oz'
  },
  'gold-american-buffalo': {
    name: 'Gold American Buffalo',
    description: 'The Gold American Buffalo is the first 24-karat gold coin struck by the U.S. Mint for investment purposes. It features the same design as the classic Buffalo nickel.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'United States Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Obverse: Native American Indian head design',
      'Reverse: American buffalo design',
      'Sovereign coin backed by the U.S. government',
      '24-karat gold purity'
    ],
    image: '/images/Gold American Buffalo.png',
    alt: 'United States Mint Gold American Buffalo 1 oz'
  },
  'gold-austrian-philharmonic': {
    name: 'Gold Austrian Philharmonic',
    description: 'The Gold Austrian Philharmonic is produced by the Austrian Mint and features musical instruments from the Vienna Philharmonic Orchestra, celebrating Austria\'s rich musical heritage.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'Austrian Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Obverse: Musical instruments from the Vienna Philharmonic',
      'Reverse: Great Organ of the Golden Hall in Vienna',
      'Also available in ½ oz, ¼ oz, and 1/10 oz sizes',
      'Celebrates Austria\'s musical heritage'
    ],
    image: '/images/Gold Austrian Philharmonic.png',
    alt: 'Austrian Mint Gold Philharmonic 1 oz'
  },
  'gold-maple-leaf': {
    name: 'Gold Maple Leaf',
    description: 'The Gold Maple Leaf is produced by the Royal Canadian Mint and is one of the purest gold coins available, featuring the iconic maple leaf design.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'Royal Canadian Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Obverse: Queen Elizabeth II portrait',
      'Reverse: Maple leaf design',
      'Also available in ½ oz, ¼ oz, and 1/10 oz sizes',
      'Sovereign coin backed by the Canadian government'
    ],
    image: '/images/Gold Maple Leaf.png',
    alt: 'Royal Canadian Mint Gold Maple Leaf 1 oz'
  },
  'gold-britannia': {
    name: 'Gold Britannia (2013-Present)',
    description: 'The Gold Britannia is produced by The Royal Mint and features the iconic Britannia figure, representing Britain\'s strength and heritage.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'The Royal Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Obverse: Queen Elizabeth II portrait',
      'Reverse: Britannia figure design',
      'Also available in ½ oz, ¼ oz, and 1/10 oz sizes',
      'Sovereign coin backed by the British government'
    ],
    image: '/images/Gold Brittania (2013).png',
    alt: 'The Royal Mint Gold Britannia 1 oz'
  },
  'gold-pamp-suisse-bar': {
    name: 'Gold Pamp Suisse Bar',
    description: 'The Gold Pamp Suisse Bar is produced by Pamp Suisse, one of the world\'s leading precious metals refiners, known for their exceptional quality and security features.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'Pamp Suisse'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Advanced security features',
      'Tamper-evident packaging',
      'Internationally recognized brand',
      'High liquidity and easy resale'
    ],
    image: '/images/Gold Pamp Suisse Bar.png',
    alt: 'Gold Pamp Suisse Bar 1 oz'
  },
  'britannia-gold-bar': {
    name: 'Britannia Gold Bar',
    description: 'The Britannia Gold Bar is produced by The Royal Mint and features the iconic Britannia figure, representing Britain\'s strength and heritage in bar form.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'The Royal Mint'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Features iconic Britannia design',
      'Produced by The Royal Mint',
      'Sovereign-backed quality',
      'High liquidity and easy resale'
    ],
    image: '/images/Brittania Gold Bar.png',
    alt: 'Britannia Gold Bar 1 oz'
  },
  'gold-bullion-bars': {
    name: 'Gold Bullion Bars',
    description: 'Gold Bullion Bars are produced by various trusted refiners and offer excellent value for investors seeking pure gold content without the premium of coins.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'Various'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Gold',
      'Lower premium than coins',
      'Easy to store and transport',
      'High liquidity',
      'Various trusted refiners'
    ],
    image: '/images/Gold Bullion Bars.png',
    alt: '1 oz Gold Generic Bar .9999'
  },
  'gold-american-eagle-proof': {
    name: 'Gold American Eagle Proof w/ Box and COA',
    description: 'The Gold American Eagle Proof is a special edition of the American Eagle with a mirror-like finish, presented in a protective case with a Certificate of Authenticity.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Gold',
      'Metal Content': '1 oz',
      'Purity': '0.9167',
      'Mint/Brand': 'United States Mint',
      'Grade': 'BU – Brilliant Uncirculated',
      'Mint Mark': 'W – West Point'
    },
    highlights: [
      'Contains 1 oz of .9167 fine Gold',
      'Mirror-like proof finish',
      'Includes protective case and COA',
      'Also available in ½ oz, ¼ oz, and 1/10 oz sizes',
      'Minted at West Point facility'
    ],
    image: '/images/Gold American Eagle Proof Box and COA.png',
    alt: 'United States Mint Gold American Eagle Proof 1 oz'
  },
  'silver-american-eagle': {
    name: 'Silver American Eagle',
    description: 'The Silver American Eagle is the official silver bullion coin of the United States, featuring the Walking Liberty design and backed by the U.S. government.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Silver',
      'Metal Content': '1 oz',
      'Purity': '0.9990',
      'Mint/Brand': 'United States Mint'
    },
    highlights: [
      'Contains 1 oz of .9990 fine Silver',
      'Obverse: Walking Liberty design',
      'Reverse: Heraldic eagle design',
      'Sovereign coin backed by the U.S. government',
      'Most popular silver bullion coin'
    ],
    image: '/images/Silver American Eagle.png',
    alt: 'United States Mint Silver American Eagle 1 oz'
  },
  'silver-maple-leaf': {
    name: 'Silver Maple Leaf',
    description: 'The Silver Maple Leaf is produced by the Royal Canadian Mint and features the iconic maple leaf design, known for its exceptional purity and quality.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Silver',
      'Metal Content': '1 oz',
      'Purity': '0.9999',
      'Mint/Brand': 'Royal Canadian Mint'
    },
    highlights: [
      'Contains 1 oz of .9999 fine Silver',
      'Obverse: Queen Elizabeth II portrait',
      'Reverse: Maple leaf design',
      'Sovereign coin backed by the Canadian government',
      'Highest purity silver coin available'
    ],
    image: '/images/Silver Maple Leaf.png',
    alt: 'Royal Canadian Mint Silver Maple Leaf 1 oz'
  },
  'silver-bullion-bars': {
    name: 'Silver Bullion Bars',
    description: 'Silver Bullion Bars are produced by various trusted refiners and offer excellent value for investors seeking pure silver content at competitive prices.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Silver',
      'Metal Content': '10 oz',
      'Purity': '0.999',
      'Mint/Brand': 'Various'
    },
    highlights: [
      'Contains 10 oz of .999 fine Silver',
      'Lower premium than coins',
      'Easy to store and transport',
      'High liquidity',
      'Various trusted refiners'
    ],
    image: '/images/Silver Bullion Bars.png',
    alt: '10 oz Silver Bar'
  },
  'platinum-eagle': {
    name: 'Platinum Eagle',
    description: 'The Platinum Eagle is the official platinum bullion coin of the United States, featuring the Statue of Liberty design and backed by the U.S. government.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Platinum',
      'Metal Content': '1 oz',
      'Purity': '0.9995',
      'Mint/Brand': 'United States Mint',
      'Grade': 'BU – Brilliant Uncirculated (Year Varies)'
    },
    highlights: [
      'Contains 1 oz of .9995 fine Platinum',
      'Obverse: Statue of Liberty design',
      'Reverse: Eagle design',
      'Sovereign coin backed by the U.S. government',
      'Rare and collectible'
    ],
    image: '/images/Platinum Eagle.png',
    alt: 'United States Mint Platinum Eagle 1 oz'
  },
  'palladium-rmc-maple-leaf': {
    name: 'Palladium RMC Maple Leaf',
    description: 'The Palladium RMC Maple Leaf is produced by the Royal Canadian Mint and features the iconic maple leaf design, representing one of the rarest precious metals.',
    specifications: {
      'IRA Approved': 'Yes',
      'Metal Type': 'Palladium',
      'Metal Content': '1 oz',
      'Purity': '0.9995',
      'Mint/Brand': 'Royal Canadian Mint',
      'Grade': 'BU – Brilliant Uncirculated'
    },
    highlights: [
      'Contains 1 oz of .9995 fine Palladium',
      'Obverse: Queen Elizabeth II portrait',
      'Reverse: Maple leaf design',
      'Sovereign coin backed by the Canadian government',
      'One of the rarest precious metals'
    ],
    image: '/images/Palladium RMC Maple Leaf.png',
    alt: 'Royal Canadian Mint Palladium Maple Leaf 1 oz'
  }
}

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query

  if (!slug || !products[slug]) {
    return (
      <div className='product-page'>
        <div className='container'>
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <Link href="/products">← Back to Products</Link>
        </div>
      </div>
    )
  }

  const product = products[slug]

  return (
    <div className='product-page'>
      <SEO 
        title={`${product.name} - Precious Metals Investment | Novara Gold`}
        description={product.description}
        canonical={`/products/${slug}`}
        keywords={`${product.name}, precious metals, gold investment, silver investment, platinum investment, palladium investment`}
      />
      
      <div className='container'>
        <div className='product-header'>
          <div className='product-image'>
            <Image 
              src={product.image} 
              alt={product.alt} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              style={{objectFit: 'cover'}}
              className=""
            />
          </div>
          <div className='product-info'>
            <h1>{product.name}</h1>
            <p className='product-description'>{product.description}</p>
            <div className='product-actions'>
              <button className='btn btn-primary'>CALL NOW FOR PRICING    (800) 243-1571</button>
            </div>
          </div>
        </div>

        <div className='product-details'>
          <div className='details-section'>
            <h2>Details</h2>
            <p>{product.description}</p>
          </div>

          <div className='specifications-section'>
            <h2>Specifications</h2>
            <div className='specs-grid'>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className='spec-item'>
                  <span className='spec-label'>{key}:</span>
                  <span className='spec-value'>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='highlights-section'>
            <h2>Product Highlights</h2>
            <ul className='highlights-list'>
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='back-to-products'>
          <Link href="/products" className='btn btn-outline'>← Back to All Products</Link>
        </div>
      </div>
    </div>
  )
}
