import { useState, useEffect } from 'react'
import SEO from '../../components/SEO'

export default function IRA() {
  const [activeSection, setActiveSection] = useState('overview')

  const sections = [
    { id: 'overview', title: 'Overview', href: '#overview' },
    { id: 'how-it-works', title: 'How It Works', href: '#how-it-works' },
    { id: 'rollover', title: 'Rollover & Transfer Guide', href: '#rollover' },
    { id: 'fees', title: 'Fees & Minimums', href: '#fees' },
    { id: 'custodians', title: 'Custodians & Depositories', href: '#custodians' },
    { id: 'faq', title: 'FAQ', href: '#faq' }
    // { id: 'forms', title: 'Forms & Documents', href: '#forms' } // Temporarily hidden
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && sections.find(s => s.id === hash)) {
      setActiveSection(hash)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className='section'>
      <SEO 
        title="Precious Metals IRA - Gold, Silver, Platinum & Palladium | Novara Gold"
        description="Diversify your retirement portfolio with a precious metals IRA. Gold, silver, platinum, and palladium investments with secure storage, transparent fees, and expert guidance."
        canonical="/ira"
        keywords="precious metals IRA, gold IRA, silver IRA, platinum IRA, palladium IRA, retirement planning, IRA rollover, secure storage"
      />
      <div className='container'>
        <div className='ira-page'>
          {/* Header */}
          <div className='ira-header'>
            <h1>Precious Metals IRA</h1>
            <p className='lead'>Diversify your retirement portfolio with physical precious metals held in a tax-advantaged IRA account.</p>
          </div>

          {/* Navigation */}
          <nav className='ira-nav'>
            <ul>
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    className={activeSection === section.id ? 'active' : ''}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Overview Section */}
          <section id='overview' className='ira-section'>
            <h2>IRA Overview</h2>
            
            <h3>What is a Precious Metals IRA?</h3>
            <p>A Precious Metals IRA (Individual Retirement Account) allows you to hold physical gold, silver, platinum, and palladium within a tax-advantaged retirement account. Unlike traditional IRAs that hold stocks, bonds, or mutual funds, a precious metals IRA holds tangible assets that have historically maintained their value over time.</p>
            
            <h3>Benefits of a Precious Metals IRA</h3>
            <ul>
              <li><strong>Diversification:</strong> Reduce portfolio risk by adding tangible assets</li>
              <li><strong>Inflation Protection:</strong> Precious metals historically hedge against inflation</li>
              <li><strong>Tax Advantages:</strong> Same tax benefits as traditional IRAs</li>
              <li><strong>Tangible Assets:</strong> Own physical metals, not paper certificates</li>
              <li><strong>Portfolio Stability:</strong> Metals often move inversely to stock markets</li>
            </ul>

            <h3>Eligible Metals</h3>
            <p>Only certain precious metals meet IRS requirements for IRA inclusion:</p>
            <ul>
              <li><strong>Gold:</strong> Must be 99.5% pure (24 karat)</li>
              <li><strong>Silver:</strong> Must be 99.9% pure</li>
              <li><strong>Platinum:</strong> Must be 99.95% pure</li>
              <li><strong>Palladium:</strong> Must be 99.95% pure</li>
            </ul>
          </section>

          {/* How It Works Section */}
          <section id='how-it-works' className='ira-section'>
            <h2>HOW IS A PRECIOUS METALS IRA WORKS</h2>
            
            <div className='ira-intro'>
              <h3>Protecting Retirement with Tangible Wealth</h3>
              <p>A precious metals IRA allows you to diversify your retirement saving by holding physical gold and silver inside a self-directed IRA. Unlike traditional paper-based assets, precious metals offer a tangible store of value that has stood the test of time. At Novara Gold, we make the process simple, transparent, and tailored to your needs.</p>
            </div>
            
            <div className='process-step'>
              <h4>STEP 1: OPEN A SELF-DIRECTED IRA</h4>
              <p>You will begin by establishing a self-directed IRA through one of our trusted custodian partners. Unlike standard retirement accounts, self-directed IRA allows you to hold physical assets, including IRS-approved gold and silver coins and bars. Our account set up process is simple and you will usually have an account number within 48 hours if all proper documents are submitted. Our back office will handle everything for our clients, so you can be rest assured that everything will be done correctly.</p>
            </div>

            <div className='process-step'>
              <h4>STEP 2: FUND YOUR ACCOUNT</h4>
              <p>Your new IRA can be funded in several ways.</p>
              <p><strong>Rollover:</strong> Move funds from an existing IRA, 401(K), 403(b), or similar accounts.</p>
              <p><strong>Transfer:</strong> Directly transfer funds from another IRA without triggering taxes.</p>
              <p><strong>New Contribution:</strong> Make a standard annual contribution</p>
              <p>Our specialists guide you through every option to ensure a smooth, compliant process.</p>
            </div>

            <div className='process-step'>
              <h4>STEP 3: SELECT YOUR METALS</h4>
              <p>Once your account is funded, you will be able to set up a full in-depth consultation with one of our specialists and choose from a variety of IRS-approved precious metals. At Novara Gold we focus on metals that provide the best value and security for your retirement.</p>
            </div>

            <div className='process-step'>
              <h4>STEP 4: SECURE STORAGE IN IRS-APPROVED DEPOSITORIES</h4>
              <p>Your metals are shipped directly to an IRS-Approved depository of your choosing for secure storage. These vaults are insured and audited, ensuring your investment is fully protected. You will receive regular account statements and 24/7 visibility of your holdings through your custodian.</p>
            </div>

            <div className='process-step'>
              <h4>STEP 5: MANAGE, GROW, AND WITHDRAW</h4>
              <p>As with any IRA, your account grows tax-deferred (or tax-free if in a Roth IRA). When the time comes, you can choose to:</p>
              <p>Sell Metals within the account for cash distribution, or</p>
              <p>Take Physical Delivery of your metals as part of your retirement distribution.</p>
            </div>

            <div className='process-step'>
              <p>Which ever step you find yourself you will always have a team of specialists at Novara Gold helping you chose which is best for your specific needs and goals, because a Precious Metals IRA in more than just an account- it's peace of mind. At Novara Gold, we handle the details, so you can focus on building a retirement that's both stable and enduring.</p>
            </div>
          </section>

          {/* Rollover Section */}
          <section id='rollover' className='ira-section'>
            <h2>Rollover & Transfer Guide</h2>
            
            <h3>Detailed Rollover Information</h3>
            <p>As outlined in Step 2 of our process, you can fund your precious metals IRA through several methods. Here's detailed information about each option:</p>
            
            <div className='rollover-type'>
              <h4>Rollover from Existing Retirement Accounts</h4>
              <p>Move funds from your existing retirement accounts without tax consequences. This is the most common way to fund a precious metals IRA.</p>
              <ul>
                <li>Traditional IRAs</li>
                <li>Roth IRAs</li>
                <li>401(k) plans</li>
                <li>403(b) plans</li>
                <li>457 plans</li>
                <li>Thrift Savings Plans (TSP)</li>
                <li>Pension plans</li>
              </ul>
            </div>

          </section>

          {/* Fees Section */}
          <section id='fees' className='ira-section'>
            <h2>Fees & Minimums</h2>
            
            <h3>Account Fees & Costs</h3>
            <div className='fee-structure'>
              <div className='fee-item'>
                <h4>Account Setup</h4>
                <p>One-time fee for establishing your precious metals IRA - varies by custodian</p>
              </div>
              <div className='fee-item'>
                <h4>Annual Maintenance</h4>
                <p>Annual fee for account administration and record-keeping - varies by custodian</p>
              </div>
              <div className='fee-item'>
                <h4>Storage Fees</h4>
                <p>Annual fee for secure storage of your precious metals - varies by depository</p>
              </div>
            </div>

            <p><em>All fees and minimums are subject to change and may vary depending on your chosen custodian and depository. Please contact us for current pricing information.</em></p>

            <h3>Minimum Investment Requirements</h3>
            <ul>
              <li><strong>Initial Investment:</strong> $50,000 minimum</li>
              <li><strong>Additional Contributions:</strong> Minimum amounts vary by custodian</li>
            </ul>

            <h3>Fee Transparency</h3>
            <p>All fees are clearly disclosed upfront with no hidden charges. We believe in transparent pricing so you can make informed decisions about your retirement savings.</p>
          </section>

          {/* Custodians Section */}
          <section id='custodians' className='ira-section'>
            <h2>Custodians & Depositories</h2>
            
            <h3>Approved Custodians</h3>
            <p>We work with several IRS-approved custodians who specialize in precious metals IRAs. Our custodians are:</p>
            <ul>
              <li>Fully licensed and regulated</li>
              <li>Experienced in precious metals IRAs</li>
              <li>Committed to excellent customer service</li>
              <li>Transparent with fees and processes</li>
            </ul>

            <h3>Secure Depositories</h3>
            <p>Your precious metals are stored in highly secure, insured depositories that meet strict IRS requirements:</p>
            <ul>
              <li><strong><a href="https://delawaredepository.com/" target="_blank" rel="noopener noreferrer" className="depository-link">Delaware Depository</a></strong></li>
            </ul>

            <h3>Storage Features</h3>
            <ul>
              <li>24/7 security monitoring</li>
              <li>Full insurance coverage</li>
              <li>Regular audits and inspections</li>
              <li>Segregated storage options</li>
              <li>Online account access</li>
            </ul>

            <h3>Your Rights</h3>
            <p>As an IRA holder, you have the right to:</p>
            <ul>
              <li>Inspect your metals at the depository</li>
              <li>Request audits of your holdings</li>
              <li>Receive regular account statements</li>
              <li>Choose your preferred depository</li>
            </ul>
          </section>

          {/* FAQ Section */}
          <section id='faq' className='ira-section'>
            <h2>Frequently Asked Questions</h2>
            
            <div className='faq-item'>
              <h4>Can I take physical possession of my precious metals?</h4>
              <p>No, precious metals in an IRA must be held by a qualified custodian or depository. Taking physical possession would result in a distribution and potential tax penalties.</p>
            </div>

            <div className='faq-item'>
              <h4>What happens to my metals when I reach retirement age?</h4>
              <p>At age 59½, you can take distributions from your IRA. You can choose to receive the metals directly or sell them for cash. Both options are subject to applicable taxes.</p>
            </div>

            <div className='faq-item'>
              <h4>Are there penalties for early withdrawal?</h4>
              <p>Yes, withdrawing from your IRA before age 59½ typically results in a 10% early withdrawal penalty plus applicable taxes, unless you qualify for an exception.</p>
            </div>

            <div className='faq-item'>
              <h4>Can I add to my precious metals IRA over time?</h4>
              <p>Yes, you can make annual contributions up to the IRS limits ($7,000 for 2024, or $8,000 if you're 50 or older).</p>
            </div>

            <div className='faq-item'>
              <h4>What if I want to sell some of my metals?</h4>
              <p>You can sell metals within your IRA without tax consequences. The proceeds remain in your IRA and can be used to purchase other investments or held as cash.</p>
            </div>

            <div className='faq-item'>
              <h4>How do I know my metals are secure?</h4>
              <p>All depositories we work with are fully insured, regularly audited, and meet strict security standards. You can request audits and inspections of your holdings.</p>
            </div>
          </section>

          {/* Forms Section - Temporarily Hidden */}
          {/* 
          <section id='forms' className='ira-section'>
            <h2>Forms & Documents</h2>
            
            <h3>Account Opening Documents</h3>
            <div className='document-list'>
              <div className='document-item'>
                <h4>IRA Application</h4>
                <p>Complete application form to establish your precious metals IRA account</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
              <div className='document-item'>
                <h4>Custodial Agreement</h4>
                <p>Legal agreement between you and your IRA custodian</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
              <div className='document-item'>
                <h4>Depository Agreement</h4>
                <p>Storage agreement for your precious metals</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
            </div>

            <h3>Rollover Documents</h3>
            <div className='document-list'>
              <div className='document-item'>
                <h4>Rollover Request Form</h4>
                <p>Form to initiate rollover from existing retirement account</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
              <div className='document-item'>
                <h4>Transfer Authorization</h4>
                <p>Authorization for custodian-to-custodian transfers</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
            </div>

            <h3>Ongoing Account Management</h3>
            <div className='document-list'>
              <div className='document-item'>
                <h4>Contribution Form</h4>
                <p>Form for making additional contributions to your IRA</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
              <div className='document-item'>
                <h4>Distribution Request</h4>
                <p>Form for requesting distributions from your IRA</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
              <div className='document-item'>
                <h4>Beneficiary Designation</h4>
                <p>Form to designate beneficiaries for your IRA</p>
                <button className='btn-secondary'>Download PDF</button>
              </div>
            </div>

            <h3>Required Information</h3>
            <p>To complete your IRA application, you'll need:</p>
            <ul>
              <li>Social Security Number</li>
              <li>Driver's License or Passport</li>
              <li>Bank account information</li>
              <li>Employment information</li>
              <li>Beneficiary information</li>
            </ul>
          </section>
          */}

          {/* Call to Action */}
          <section className='ira-cta'>
            <div className='cta-card'>
              <h2>Ready to Start Your Precious Metals IRA?</h2>
              <p>Contact our IRA specialists to begin the process of diversifying your retirement portfolio with precious metals.</p>
              <div className='cta-buttons'>
                <button className='btn-primary'>Get Started</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}