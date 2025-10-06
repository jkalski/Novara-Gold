import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const MENU = [
  { 
    label: 'Why Novara', 
    href: '/about',
    columns: [
      { 
        heading: 'WHY NOVARA', 
        links: [
          { label: 'About Us', href: '/about' },
          { label: 'Core Principles', href: '/about#principles' },
          { label: 'Reviews & Testimonials', href: '/reviews' }
        ]
      }
    ]
  },
  { 
    label: 'Products', 
    href: '/products',
    columns: [
      { 
        heading: 'Metals', 
        links: [
          { label: 'Gold (Coins, Bars)', href: '/products#gold' },
          { label: 'Silver (Coins, Bars)', href: '/products#silver' },
          { label: 'Platinum', href: '/products#platinum' },
          { label: 'Palladium', href: '/products#palladium' },
          { label: 'IRA-Eligible Metals List', href: '/products#ira-eligible' }
        ]
      },
    ]
  },
  { 
    label: 'IRA', 
    href: '/ira',
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
    href: '/buyback',
    columns: [
      { 
        heading: 'Buy-Back', 
        links: [
          { label: 'Policy Overview', href: '/buyback' }
        ]
      }
    ]
  },
  { 
    label: 'Research', 
    href: '/research',
    columns: [
      { 
        heading: 'Market Updates', 
        links: [
          { label: 'Market Chart', href: '/research#chart' }
        ]
      },
      { 
        heading: 'Resources', 
        links: [
          { label: 'Glossary', href: '/glossary' }
        ]
      }
    ]
  }
]

export default function Navbar() {
  const [open, setOpen] = useState(null)
  const [mobile, setMobile] = useState(false)

  const closeMobileMenu = () => {
    setMobile(false)
    setOpen(null)
  }

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
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger ${mobile ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          
          <nav className={`primary-nav ${mobile ? 'open' : ''}`}>
            {/* Mobile Home Button - Only visible on mobile */}
            <div className='mobile-home-button'>
              <Link href='/' className='mobile-home-link' onClick={closeMobileMenu}>
                Home
              </Link>
            </div>
            
            <ul className='top-level'>
              {MENU.map((item, index) => (
                <li 
                  key={index} 
                  onMouseEnter={() => setOpen(index)} 
                  onMouseLeave={() => setOpen(null)} 
                  className={item.columns ? 'has-mega' : ''}
                >
                  {item.href ? (
                    <Link href={item.href} className='top-link mobile-hidden' onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ) : (
                    <button 
                      className='top-link mobile-hidden' 
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
                                  <Link href={link.href} onClick={closeMobileMenu}>{link.label}</Link>
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
            
            {/* Mobile Contact Button - Only visible on mobile */}
            <div className='mobile-contact-button'>
              <Link href='/contact' className='mobile-contact-link' onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>
            
            {/* Desktop Contact - Hidden on mobile */}
            <div className='nav-right'>
              <Link href='/contact' className='top-link'>Contact</Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}