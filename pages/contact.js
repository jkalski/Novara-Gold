import { useState } from 'react'
import { FiMail, FiPhone, FiClock, FiSend } from 'react-icons/fi'
import SEO from '../components/SEO'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    smsConsent: false
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [validationError, setValidationError] = useState('')

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '')
    
    // Don't format if empty
    if (phoneNumber.length === 0) {
      return ''
    }
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return `(${phoneNumber}`
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    // Format phone number if it's the phone field
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value
    
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : formattedValue
    })
    
    // Clear validation error when user interacts with the form
    if (validationError) {
      setValidationError('')
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    
    // Clear any previous validation errors
    setValidationError('')
    
    // Validate that SMS consent is checked
    if (!formData.smsConsent) {
      setValidationError('Please check the SMS consent box to continue.')
      return
    }
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          smsConsent: formData.smsConsent,
          formType: 'contact'
        }),
      })

      if (response.ok) {
        setFormSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          smsConsent: false
        })
        
        setTimeout(() => setFormSubmitted(false), 5000)
      } else {
        setValidationError('Failed to send message. Please try again or call us at (800) 243-1571.')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setValidationError('Failed to send message. Please try again or call us at (800) 243-1571.')
    }
  }

  return (
    <div className='contact-page'>
      <SEO 
        title="Contact Novara Gold - Precious Metals Investment Experts"
        description="Contact Novara Gold for expert precious metals investment guidance. Call (424) 491-8678 or email info@novaragold.com for personalized consultation and support."
        canonical="/contact"
        keywords="contact Novara Gold, precious metals consultation, gold investment advice, silver IRA help, investment consultation"
      />
      <div className='container'>
        <div className='contact-header'>
          <h1>Contact Novara Gold</h1>
          <p>Get in touch with our precious metals experts for personalized guidance and support</p>
        </div>

        <div className='contact-content'>
          <div className='contact-info'>
            <div className='contact-card'>
              <div className='contact-icon'>
                <FiPhone />
              </div>
              <h3>Phone</h3>
              <p>Call our precious metals specialists</p>
              <a href='tel:+1-800-243-1571' className='contact-link'>(800) 243-1571</a>
            </div>

            <div className='contact-card'>
              <div className='contact-icon'>
                <FiMail />
              </div>
              <h3>Email</h3>
              <p>Send us a message anytime</p>
              <a href='mailto:info@novaragold.com' className='contact-link'>info@novaragold.com</a>
            </div>


            <div className='contact-card'>
              <div className='contact-icon'>
                <FiClock />
              </div>
              <h3>Hours</h3>
              <p>Our team is available</p>
              <div className='contact-hours'>
                <div>Monday - Friday: 8:00 AM - 5:00 PM PST</div>
              </div>
            </div>
          </div>

          <div className='contact-form-container'>
            <div className='form-header'>
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 2 hours</p>
            </div>

            {formSubmitted ? (
              <div className='success-message'>
                <div className='success-icon'>✓</div>
                <h4>Thank You for Your Interest!</h4>
                <p>We've received your message and will contact you as soon as possible. For immediate assistance, please call us at <strong>(800) 243-1571</strong>.</p>
                <div className='success-actions'>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className='cta-btn secondary'
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className='contact-form'>
                <div className='form-row'>
                  <div className='form-group'>
                    <label htmlFor='name'>Full Name *</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder='John Smith'
                      required
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address *</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder='john.smith@email.com'
                      required
                    />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                      type='tel'
                      id='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder='(555) 123-4567'
                    />
                  </div>
                  
                  <div className='form-group'>
                    <label htmlFor='subject'>Subject *</label>
                    <select
                      id='subject'
                      name='subject'
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value=''>Select a subject</option>
                      <option value='general'>General Inquiry</option>
                      <option value='products'>Product Information</option>
                      <option value='ira'>IRA Services</option>
                      <option value='pricing'>Pricing Questions</option>
                      <option value='storage'>Storage & Security</option>
                      <option value='buyback'>Buy-Back Program</option>
                      <option value='support'>Customer Support</option>
                    </select>
                  </div>
                </div>

                <div className='form-group'>
                  <label htmlFor='message'>Message *</label>
                  <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder='Tell us how we can help you with your precious metals investment needs...'
                    required
                  />
                </div>

                <div className='form-group checkbox-group'>
                  <label className={`checkbox-label ${validationError ? 'error' : ''}`}>
                    <div className='checkbox-container'>
                      <input
                        type='checkbox'
                        name='smsConsent'
                        checked={formData.smsConsent}
                        onChange={handleInputChange}
                        required
                        className='consent-checkbox'
                      />
                      <span className='checkmark'></span>
                    </div>
                    <span className='consent-text'>
                      By clicking this box, you agree to receive SMS messages about appointment reminders and follow-up messages from Novara Gold. Reply STOP to opt out at any time. For help, text HELP to 424-491-8678. Message and data rates may apply. Messaging frequency may vary. You also agree to receive calls, text messages, and prerecorded messages via an automated dialing system about promotions from or on behalf of Novara Gold. You understand that consent is not a condition of purchase. See our <a href="/policies/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/policies/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.
                    </span>
                  </label>
                  {validationError && (
                    <div className='validation-error'>
                      {validationError}
                    </div>
                  )}
                </div>

                <button type='submit' className='submit-btn'>
                  <FiSend />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        <div className='contact-cta'>
          <h2>Ready to Start Your Precious Metals Journey?</h2>
          <p>Get in touch with our precious metals specialists</p>
          <div className='cta-buttons'>
            <a href='/products' className='cta-btn primary'>Explore Products</a>
          </div>
        </div>
      </div>
    </div>
  )
}