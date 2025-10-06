import React from 'react'
import SEO from '../components/SEO'

export default function GlossaryPage() {
  const terms = [
    {
      category: "🪙 Gold & Precious Metals Terms",
      items: [
        {
          term: "Spot Price",
          definition: "The current market price for one ounce of gold, silver, platinum, or palladium."
        },
        {
          term: "Premium",
          definition: "The amount charged above the spot price for coins or bars — this covers minting, handling, and profit margins."
        },
        {
          term: "Bid/Ask Spread",
          definition: "The difference between the dealer's buy price and sell price; smaller spreads usually mean more liquid products."
        },
        {
          term: "Bullion",
          definition: "Precious metals in bar or coin form valued primarily by metal content, not collectibility."
        },
        {
          term: "Numismatic Coins",
          definition: "Coins valued more for rarity, age, or condition than for metal content."
        },
        {
          term: "Buyback Policy",
          definition: "A company's agreement to repurchase metals from clients — not guaranteed, but a liquidity option."
        },
        {
          term: "Purity",
          definition: "The measure of how much pure metal is in a coin or bar (e.g., .9999 fine gold = 99.99% pure)."
        }
      ]
    },
    {
      category: "📈 Economic & Investment Terms",
      items: [
        {
          term: "Inflation",
          definition: "The rise in prices that reduces purchasing power — historically a key driver for gold demand."
        },
        {
          term: "Deflation",
          definition: "The opposite of inflation; when prices fall, often signaling economic weakness."
        },
        {
          term: "Recession",
          definition: "A period of economic decline (usually two quarters of negative GDP growth) that often pushes investors toward gold."
        },
        {
          term: "Diversification",
          definition: "The strategy of spreading investments across asset types to reduce risk — gold is a non-correlated asset."
        },
        {
          term: "Hedge",
          definition: "An investment made to protect against adverse price movements; gold is considered a hedge against inflation and currency risk."
        },
        {
          term: "Safe Haven Asset",
          definition: "A type of investment (like gold) that tends to retain or increase value during market volatility."
        },
        {
          term: "Monetary Policy",
          definition: "Central bank actions (like interest rate changes) that influence inflation and the strength of the U.S. dollar."
        },
        {
          term: "Fiat Currency",
          definition: "Government-issued money not backed by a physical commodity — the value comes from trust in the issuer."
        }
      ]
    },
    {
      category: "🧾 IRA & Retirement Terms",
      items: [
        {
          term: "Self-Directed IRA (SDIRA)",
          definition: "A retirement account that allows alternative assets like physical gold and silver."
        },
        {
          term: "Custodian",
          definition: "A regulated entity that holds and administers IRA assets on behalf of investors."
        },
        {
          term: "Rollover",
          definition: "Moving funds from a 401(k) or another IRA into a new IRA without incurring taxes or penalties."
        },
        {
          term: "Transfer",
          definition: "A tax-free movement of assets between IRA custodians."
        },
        {
          term: "IRS-Approved Metals",
          definition: "Precious metals that meet minimum fineness standards for IRA eligibility (e.g., .995 gold, .999 silver)."
        },
        {
          term: "Required Minimum Distribution (RMD)",
          definition: "The minimum amount you must withdraw from certain IRAs each year after age 73."
        },
        {
          term: "Storage (Depository)",
          definition: "The secure facility where IRA metals are held — typically segregated (individual) or non-segregated (pooled)."
        }
      ]
    },
    {
      category: "💡 Market Sentiment & Currency Terms",
      items: [
        {
          term: "US Dollar Index (DXY)",
          definition: "Measures the dollar's strength against other major currencies — gold often moves inversely."
        },
        {
          term: "Interest Rates",
          definition: "The cost of borrowing money — when rates rise, gold may dip short-term, but remains stable long-term."
        },
        {
          term: "Liquidity",
          definition: "How easily an asset can be converted to cash without losing value."
        },
        {
          term: "Volatility",
          definition: "The degree of variation in trading prices — gold can act as a stabilizer in volatile markets"
        }
      ]
    }
  ]

  return (
    <div className='glossary-page'>
      <SEO 
        title="Precious Metals Glossary - Investment Terms & Definitions | Novara Gold"
        description="Comprehensive glossary of precious metals investment terms, IRA terminology, and economic indicators. Learn the language of gold, silver, platinum, and palladium investing with Novara Gold."
        canonical="/glossary"
        keywords="precious metals glossary, gold investment terms, silver terminology, IRA definitions, bullion terms, numismatic coins, spot price, premium, diversification"
      />
      
      <div className='container'>
        {/* Hero Section */}
        <div className='glossary-hero'>
          <div className='hero-content'>
            <h1>Precious Metals Glossary</h1>
            <p className='hero-subtitle'>Master the language of precious metals investing with our comprehensive guide to terms, definitions, and concepts.</p>
          </div>
        </div>

        {/* Glossary Content */}
        <div className='glossary-content'>
          {terms.map((category, categoryIndex) => (
            <section key={categoryIndex} className='glossary-category'>
              <h2 className='category-title'>{category.category}</h2>
              <div className='terms-grid'>
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='term-card'>
                    <h3 className='term-title'>{item.term}</h3>
                    <p className='term-definition'>{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action */}
        <section className='glossary-cta'>
          <div className='cta-content'>
            <h2>Ready to Start Your Precious Metals Journey?</h2>
            <p>Now that you understand the terminology, let our experts guide you through your investment decisions.</p>
            <div className='cta-buttons'>
              <a href='/products' className='cta-button primary'>Explore Products</a>
              <a href='/contact' className='cta-button secondary'>Get Expert Guidance</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
