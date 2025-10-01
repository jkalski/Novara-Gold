import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const MENU = [
  { 
    label: 'Why Novara', 
    columns: [
      { 
        heading: 'About', 
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Core Principles', href: '/principles' },
          { label: 'Reviews & Testimonials', href: '/reviews' },
          { label: 'Security & Storage Overview', href: '/security' }
        ]
      }
    ]
  },
  { 
    label: 'Products', 
    columns: [
      { 
        heading: 'Metals', 
        links: [
          { label: 'Gold (Coins, Bars)', href: '/products/gold' },
          { label: 'Silver (Coins, Bars)', href: '/products/silver' },
          { label: 'Platinum', href: '/products/platinum' },
          { label: 'Palladium', href: '/products/palladium' },
          { label: 'IRA-Eligible Metals List', href: '/products/ira-eligible' }
        ]
      },
      { 
        heading: 'Pricing', 
        links: [
          { label: 'Live Pricing', href: '/pricing/live' }
        ]
      }
    ]
  },
  { 
    label: 'IRA', 
    columns: [
      { 
        heading: 'IRA', 
        links: [
          { label: 'Overview', href: '/ira#overview' },
          { label: 'How It Works', href: '/ira#how-it-works' },
          { label: 'Rollover & Transfer Guide', href: '/ira#rollover' },
          { label: 'Fees & Minimums', href: '/ira#fees' },
          { label: 'Custodians & Depositories', href: '/ira#custodians' },
          { label: 'FAQ', href: '/ira#faq' },
          { label: 'Forms & Documents', href: '/ira#forms' }
        ]
      }
    ]
  },
  { 
    label: 'Buy-Back', 
    columns: [
      { 
        heading: 'Buy-Back', 
        links: [
          { label: 'Policy Overview', href: '/buyback' },
          { label: 'In-IRA / Depository Process', href: '/buyback/in-ira' },
          { label: 'Personal Possession Process', href: '/buyback/personal' },
          { label: 'Not Purchased From Novara', href: '/buyback/third-party' }
        ]
      }
    ]
  },
  { 
    label: 'News', 
    columns: [
      { 
        heading: 'Market Updates', 
        links: [
          { label: 'Daily Market Analysis', href: '/news/daily' },
          { label: 'Weekly Research Reports', href: '/news/weekly' },
          { label: 'Market Commentary', href: '/news/commentary' },
          { label: 'Economic Indicators', href: '/news/indicators' }
        ]
      },
      { 
        heading: 'Education', 
        links: [
          { label: 'Beginners\' Guide', href: '/education/beginners' },
          { label: 'Market Insights', href: '/education/news' },
          { label: 'Glossary', href: '/education/glossary' }
        ]
      }
    ]
  }
]

export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)

  return (
    <header className='site-header'>
      
      <div className='nav-main'>
        <div className='container nav-inner'>
          <div className='brand'>
            <Link href='/'>
              <Image 
                src="/images/NavbarLogo.png" 
                alt="NOVARA GOLD"
                width={262}
                height={70}
                priority
              />
            </Link>
          </div>
          
          <button 
            className='nav-toggle' 
            onClick={() => setMobile(!mobile)} 
            aria-expanded={mobile}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              color: 'var(--gray-700)'
            }}
          >
            Menu
          </button>
          
          <nav className={`primary-nav ${mobile ? 'open' : ''}`}>
            <ul className='top-level'>
              {MENU.map((item, index) => (
                <li 
                  key={index} 
                  onMouseEnter={() => setOpen(index)} 
                  onMouseLeave={() => setOpen(null)} 
                  className={item.columns ? 'has-mega' : ''}
                >
                  {item.href ? (
                    <Link href={item.href} className='top-link'>
                      {item.label}
                    </Link>
                  ) : (
                    <button 
                      className='top-link' 
                      onClick={() => setOpen(open === index ? null : index)} 
                      aria-expanded={open === index}
                    >
                      {item.label}
                    </button>
                  )}
                  
                  {item.columns && (
                    <div className={`mega ${open === index ? 'open' : ''}`}>
                      <div className='mega-inner'>
                        {item.columns.map((col, colIndex) => (
                          <div className='mega-col' key={colIndex}>
                            <h4>{col.heading}</h4>
                            <ul>
                              {col.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                  <Link href={link.href}>{link.label}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            
            <div className='nav-right'>
              <Link href='/contact' className='top-link'>Contact</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}