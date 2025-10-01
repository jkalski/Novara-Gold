import { useState } from 'react'
import { 
  FiShield, 
  FiCheckCircle, 
  FiClock, 
  FiDollarSign,
  FiTruck,
  FiFileText,
  FiAlertCircle,
  FiUsers,
  FiLock,
  FiStar
} from 'react-icons/fi'

export default function BuyBackPage() {
  const [activeTab, setActiveTab] = useState('ira')

  const tabs = [
    { id: 'ira', label: 'IRA Storage', icon: FiLock },
    { id: 'personal', label: 'Personal Possession', icon: FiUsers },
    { id: 'external', label: 'External Metals', icon: FiShield }
  ]

  return (
    <div className="section">
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <FiShield className="hero-icon" />
              BUY BACK COMMITMENT
            </h1>
            <p className="hero-subtitle">
              While offering a guaranteed buy back is not legal in the United States, Novara Gold does have a buy back commitment to our clients for metals only purchased through Novara Gold. Once you take possession of your Precious Metals, they are your property. Whether they are stored personally or within a self-directed IRA, you can sell them at any time and to any person or dealer you choose. We ask our clients to come to Novara Gold first. We will do our best to give you the best possible price through our network of dealers.
            </p>
            <div className="hero-cta">
              <a href="tel:1-800-NOVARA-1" className="btn btn-primary btn-large">
                <FiFileText className="btn-icon" />
                Call 1-800-NOVARA-1
              </a>
              <p className="hero-cta-text">Speak with a buy back specialist today</p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Buy Back Service */}
        <div className="benefits-section">
          <h2>Why Choose Novara Gold for Your Buy Back?</h2>
          <p className="benefits-intro">
            When you're ready to sell your precious metals, Novara Gold offers competitive pricing, 
            transparent processes, and honest communication. Here's why our clients trust us:
          </p>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <FiDollarSign className="benefit-icon" />
              <h3>Best Possible Price</h3>
              <p>We work with our network of dealers to ensure you receive the most competitive pricing available in the market.</p>
            </div>
            
            <div className="benefit-item">
              <FiShield className="benefit-icon" />
              <h3>Transparent Process</h3>
              <p>No hidden fees or conditions. We believe in complete transparency about our buy back policies and pricing.</p>
            </div>
            
            <div className="benefit-item">
              <FiCheckCircle className="benefit-icon" />
              <h3>You're Never Locked In</h3>
              <p>Your metals are your property. You can always choose to sell elsewhere if you find a better deal.</p>
            </div>
            
            <div className="benefit-item">
              <FiUsers className="benefit-icon" />
              <h3>Expert Guidance</h3>
              <p>Our specialists guide you through every step of the buy back process, ensuring a smooth transaction.</p>
            </div>
          </div>
        </div>

        {/* Buy Back Process Overview */}
        <div className="process-section">
          <h2>How Our Buy Back Process Works</h2>
          <p className="process-intro">
            We ask our clients to come to Novara Gold first. We will do our best to give you 
            the best possible price through our network of dealers. Our process varies depending 
            on how your metals are stored.
          </p>
          
          <div className="process-tabs">
            <div className="tab-navigation">
              {tabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <IconComponent className="tab-icon" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'ira' && (
            <div className="buyback-scenario">
              <div className="scenario-header">
                <FiLock className="scenario-icon" />
                <h3>Buy Backs for Metals in an IRA and in IRS-approved storage facility</h3>
              </div>
              
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Authorization & Pricing</h4>
                    <p>Once a buy back is authorized and a price is agreed upon by both client and Novara Gold, a sell order will be populated.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Sign Sell Order</h4>
                    <p>The sell order has to be signed by End Of Business Day on the day the sell order is drawn up to lock in the agreed upon price.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Verification Not Required</h4>
                    <p>Since the metals are stored and accounted for in an approved storage facility verification of said metals will not need to be verified.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Fund Transfer</h4>
                    <p>Once the transaction is completed Novara Gold will send funds to the appropriate custodian where the metals were being held.</p>
                  </div>
                </div>
              </div>

              <div className="fees-section">
                <h4>Fee Structure</h4>
                <div className="fee-item">
                  <FiClock className="fee-icon" />
                  <div className="fee-content">
                    <strong>Within 18 months:</strong> 3% restocking fee
                    <p>Since there are a lot of costs involved during processing of original purchase (Sourcing, shipment, verification and insurance) any metals sold within 18 months of original purchase date will be subject to a 3% restocking fee.</p>
                  </div>
                </div>
                <div className="fee-item">
                  <FiCheckCircle className="fee-icon" />
                  <div className="fee-content">
                    <strong>After 18 months:</strong> Commission free
                    <p>Any metals sold after 18 months will be done so commission free.</p>
                  </div>
                </div>
                <div className="fee-item">
                  <FiStar className="fee-icon" />
                  <div className="fee-content">
                    <strong>RMD's:</strong> Always commission free
                    <p>This excludes any RMD's required by law in IRA accounts. All RMD's will be sold commission free.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'personal' && (
            <div className="buyback-scenario">
              <div className="scenario-header">
                <FiUsers className="scenario-icon" />
                <h3>Buy Backs for Metals in Personal Possession</h3>
              </div>
              
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Choose Metals to Sell</h4>
                    <p>Once you chose which metals you want to sell Novara Gold will cover all costs of shipping and insurance from client's address to verification facility.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Inspection & Verification</h4>
                    <p>Once the metals are inspected and verified then a price will be agreed upon between client and Novara Gold.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Sign Sell Order</h4>
                    <p>A sell order will be created and needs to be signed by the client before End of Business Day to lock in agreed price.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Payment</h4>
                    <p>Novara Gold will send payment via Wire or Check (client's choice) within 72 hours of returned signed sell order.</p>
                  </div>
                </div>
              </div>

              <div className="fees-section">
                <h4>Fee Structure</h4>
                <div className="fee-item">
                  <FiClock className="fee-icon" />
                  <div className="fee-content">
                    <strong>Within 18 months:</strong> 3% restocking fee
                    <p>Any metals sold within 18 months of original purchase date will be subject to a 3% restocking fee.</p>
                  </div>
                </div>
                <div className="fee-item">
                  <FiAlertCircle className="fee-icon" />
                  <div className="fee-content">
                    <strong>Fraudulent Metals:</strong> Client responsible for return costs
                    <p>If metals are deemed to be fraudulent and verified that they are not the metals that were purchased for client by Novara Gold, the client will be responsible for costs of shipping and insuring metals to be returned to client.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'external' && (
            <div className="buyback-scenario">
              <div className="scenario-header">
                <FiShield className="scenario-icon" />
                <h3>Buy Backs for Metals not Purchased through Novara Gold</h3>
              </div>
              
              <div className="process-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Verification Required</h4>
                    <p>Any price agreed upon will not be established until a full verification of purity and authenticity is completed.</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Commission Fee</h4>
                    <p>Any new customer or existing customer will be charged a 4% commission for the transaction.</p>
                  </div>
                </div>
              </div>

              <div className="fees-section">
                <h4>Fee Structure</h4>
                <div className="fee-item">
                  <FiDollarSign className="fee-icon" />
                  <div className="fee-content">
                    <strong>Commission:</strong> 4% for all external metals
                    <p>Novara Gold will buy back metals not purchased originally by Novara Gold. Any new customer or existing customer will be charged a 4% commission for the transaction.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legal Notice Section */}
        <div className="legal-section">
          <div className="legal-content">
            <h2>Our Process for Buy Backs</h2>
            <div className="legal-notice">
              <FiAlertCircle className="legal-icon" />
              <div className="legal-text">
                <p><strong>While offering a guaranteed buy back is not legal in the United States</strong>, Novara Gold does have a buy back commitment to our clients for metals only purchased through Novara Gold.</p>
                <p>Once you take possession of your Precious Metals, they are your property. Whether they are stored personally or within a self-directed IRA, you can sell them at any time and to any person or dealer you choose.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="commitment-section">
          <div className="commitment-content">
            <h2>We commit to honesty and transparency</h2>
            <div className="commitment-grid">
              <div className="commitment-item">
                <FiShield className="commitment-icon" />
                <h4>No Hidden Conditions</h4>
                <p>While some firms advertise guaranteed buy-backs, those promises are often misleading and can include hidden conditions. At Novara Gold, we prefer to be upfront: our buy-back policy is a service we strive to offer whenever possible, but never at the expense of honesty and compliance.</p>
              </div>
              
              <div className="commitment-item">
                <FiCheckCircle className="commitment-icon" />
                <h4>You're Never Locked In</h4>
                <p>Even in the rare event that Novara Gold is unable to buy back metals at a given time due to certain market conditions or inventory issues, you are never locked in or stuck. Clients may always choose to sell their metals independently through other dealers, exchanges or private transactions.</p>
              </div>
              
              <div className="commitment-item">
                <FiStar className="commitment-icon" />
                <h4>Fair Market Value</h4>
                <p>We pride ourselves in giving our clients low-cost pricing and we know our clients will see that no matter who they sell it too at fair market value, so whether selling back to Novara Gold or to someone else our clients will be taken care of.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <div className="form-content">
            <h2>Get Your Free Buy Back Quote</h2>
            <p>Contact us today to discuss your buy back options and get the best possible price for your metals.</p>
            
            <div className="form-container">
              <form className="buyback-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="metalType">Type of Metals</label>
                  <select id="metalType" name="metalType">
                    <option value="">Select metal type</option>
                    <option value="gold">Gold</option>
                    <option value="silver">Silver</option>
                    <option value="platinum">Platinum</option>
                    <option value="palladium">Palladium</option>
                    <option value="mixed">Mixed Metals</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="storage">How are your metals stored?</label>
                  <select id="storage" name="storage">
                    <option value="">Select storage type</option>
                    <option value="ira">IRA/401(k) Storage</option>
                    <option value="personal">Personal Possession</option>
                    <option value="external">Purchased Elsewhere</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="hearAbout">Where did you hear about us?</label>
                  <select id="hearAbout" name="hearAbout">
                    <option value="">Select an option</option>
                    <option value="google">Google / Bing</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Personal Referral</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" name="agreement" required />
                    <span className="checkmark"></span>
                    I agree to the Privacy Policy and Terms & Conditions
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary btn-large">
                  <FiFileText className="btn-icon" />
                  Get My Free Quote
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Sell Your Precious Metals?</h2>
            <p>Call us at <strong>1-800-NOVARA-1</strong> to speak with a buy back specialist today.</p>
            <div className="cta-buttons">
              <a href="tel:1-800-NOVARA-1" className="btn btn-primary">
                <FiFileText className="btn-icon" />
                Call Now
              </a>
              <a href="/contact/schedule" className="btn btn-secondary">
                <FiClock className="btn-icon" />
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, var(--gs-blue) 0%, var(--gs-blue-dark) 100%);
          color: white;
          padding: var(--space-20) 0;
          margin-bottom: var(--space-16);
          border-radius: var(--radius-xl);
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .hero-title {
          font-size: 3rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
        }

        .hero-icon {
          font-size: 3.5rem;
          color: var(--gs-gold);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: var(--space-8);
          line-height: 1.7;
          opacity: 0.95;
        }

        .hero-cta {
          text-align: center;
        }

        .hero-cta-text {
          margin-top: var(--space-4);
          font-size: 1rem;
          opacity: 0.9;
        }

        .btn-large {
          padding: var(--space-5) var(--space-10);
          font-size: 1.125rem;
        }

        .benefits-section {
          background: var(--gs-gray-50);
          padding: var(--space-16) 0;
          margin: var(--space-16) 0;
        }

        .benefits-section h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          color: var(--gs-gray-800);
        }

        .benefits-intro {
          text-align: center;
          font-size: 1.25rem;
          color: var(--gs-gray-600);
          max-width: 800px;
          margin: 0 auto var(--space-12);
          line-height: 1.7;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-8);
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .benefit-item {
          background: white;
          padding: var(--space-8);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--gs-gray-200);
          text-align: center;
        }

        .benefit-icon {
          font-size: 3rem;
          color: var(--gs-blue);
          margin-bottom: var(--space-4);
        }

        .benefit-item h3 {
          font-size: 1.5rem;
          font-weight: var(--font-semibold);
          margin-bottom: var(--space-4);
          color: var(--gs-gray-800);
        }

        .benefit-item p {
          color: var(--gs-gray-600);
          line-height: 1.6;
        }

        .process-section {
          margin: var(--space-16) 0;
        }

        .process-section h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          color: var(--gs-gray-800);
        }

        .process-intro {
          text-align: center;
          font-size: 1.25rem;
          color: var(--gs-gray-600);
          max-width: 800px;
          margin: 0 auto var(--space-12);
          line-height: 1.7;
        }

        .process-tabs {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .tab-navigation {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-12);
          justify-content: center;
          flex-wrap: wrap;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          background: var(--gs-gray-100);
          border: 2px solid var(--gs-gray-200);
          border-radius: var(--radius-lg);
          font-weight: var(--font-medium);
          color: var(--gs-gray-700);
          cursor: pointer;
          transition: all var(--transition);
          font-size: 1rem;
        }

        .tab-button:hover {
          background: var(--gs-gray-200);
          border-color: var(--gs-blue);
        }

        .tab-button.active {
          background: var(--gs-blue);
          border-color: var(--gs-blue);
          color: white;
        }

        .tab-icon {
          font-size: 1.25rem;
        }

        .tab-content {
          margin-bottom: var(--space-16);
        }

        .buyback-scenario {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--gs-gray-200);
        }

        .scenario-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          padding-bottom: var(--space-6);
          border-bottom: 2px solid var(--gs-gray-100);
        }

        .scenario-icon {
          font-size: 2rem;
          color: var(--gs-blue);
        }

        .scenario-header h3 {
          font-size: 1.75rem;
          font-weight: var(--font-bold);
          color: var(--gs-gray-800);
        }

        .process-steps {
          margin-bottom: var(--space-8);
        }

        .step {
          display: flex;
          gap: var(--space-6);
          margin-bottom: var(--space-8);
          align-items: flex-start;
        }

        .step-number {
          background: var(--gs-blue);
          color: white;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-bold);
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .step-content h4 {
          font-size: 1.25rem;
          font-weight: var(--font-semibold);
          margin-bottom: var(--space-2);
          color: var(--gs-gray-800);
        }

        .step-content p {
          color: var(--gs-gray-600);
          line-height: 1.6;
        }

        .fees-section {
          background: var(--gs-gray-50);
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          border: 1px solid var(--gs-gray-200);
        }

        .fees-section h4 {
          font-size: 1.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          color: var(--gs-gray-800);
        }

        .fee-item {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          align-items: flex-start;
        }

        .fee-icon {
          font-size: 1.5rem;
          color: var(--gs-blue);
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .fee-content {
          flex: 1;
        }

        .fee-content strong {
          display: block;
          font-weight: var(--font-semibold);
          color: var(--gs-gray-800);
          margin-bottom: var(--space-1);
        }

        .fee-content p {
          color: var(--gs-gray-600);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .commitment-section {
          background: linear-gradient(135deg, var(--gs-gray-50) 0%, var(--gs-gray-100) 100%);
          padding: var(--space-16) 0;
          margin: var(--space-16) 0;
          border-radius: var(--radius-xl);
        }

        .commitment-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .commitment-content h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-12);
          color: var(--gs-gray-800);
        }

        .commitment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-8);
        }

        .commitment-item {
          background: white;
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--gs-gray-200);
          text-align: center;
        }

        .commitment-icon {
          font-size: 2.5rem;
          color: var(--gs-blue);
          margin-bottom: var(--space-4);
        }

        .commitment-item h4 {
          font-size: 1.25rem;
          font-weight: var(--font-semibold);
          margin-bottom: var(--space-4);
          color: var(--gs-gray-800);
        }

        .commitment-item p {
          color: var(--gs-gray-600);
          line-height: 1.6;
        }

        .cta-section {
          background: var(--gs-blue);
          color: white;
          padding: var(--space-16) 0;
          border-radius: var(--radius-xl);
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
        }

        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: var(--space-8);
          opacity: 0.95;
        }

        .cta-buttons {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-lg);
          font-weight: var(--font-semibold);
          text-decoration: none;
          transition: all var(--transition);
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--gs-gold);
          color: white;
          border: 2px solid var(--gs-gold);
        }

        .btn-primary:hover {
          background: var(--gs-gold-dark);
          border-color: var(--gs-gold-dark);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }

        .btn-secondary:hover {
          background: white;
          color: var(--gs-blue);
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 1.25rem;
        }

        .legal-section {
          background: var(--gs-gray-100);
          padding: var(--space-12) 0;
          margin: var(--space-16) 0;
        }

        .legal-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .legal-content h2 {
          text-align: center;
          font-size: 2rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-8);
          color: var(--gs-gray-800);
        }

        .legal-notice {
          background: white;
          padding: var(--space-8);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          border-left: 4px solid var(--gs-gold);
          display: flex;
          gap: var(--space-4);
          align-items: flex-start;
        }

        .legal-icon {
          font-size: 2rem;
          color: var(--gs-gold);
          margin-top: 0.25rem;
          flex-shrink: 0;
        }

        .legal-text p {
          margin-bottom: var(--space-4);
          line-height: 1.6;
          color: var(--gs-gray-700);
        }

        .legal-text p:last-child {
          margin-bottom: 0;
        }

        .contact-form-section {
          background: var(--gs-gray-50);
          padding: var(--space-16) 0;
          margin: var(--space-16) 0;
        }

        .form-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .form-content h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          color: var(--gs-gray-800);
        }

        .form-content p {
          text-align: center;
          font-size: 1.25rem;
          color: var(--gs-gray-600);
          margin-bottom: var(--space-12);
          line-height: 1.7;
        }

        .form-container {
          background: white;
          padding: var(--space-8);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--gs-gray-200);
        }

        .buyback-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-weight: var(--font-medium);
          color: var(--gs-gray-700);
          margin-bottom: var(--space-2);
        }

        .form-group input,
        .form-group select {
          padding: var(--space-3) var(--space-4);
          border: 2px solid var(--gs-gray-200);
          border-radius: var(--radius);
          font-size: 1rem;
          transition: border-color var(--transition);
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--gs-blue);
        }

        .checkbox-group {
          flex-direction: row;
          align-items: center;
          gap: var(--space-3);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          cursor: pointer;
          font-size: 0.95rem;
          color: var(--gs-gray-600);
        }

        .checkbox-label input[type="checkbox"] {
          width: auto;
          margin: 0;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2rem;
            flex-direction: column;
            gap: var(--space-2);
          }

          .hero-icon {
            font-size: 2.5rem;
          }

          .tab-navigation {
            flex-direction: column;
            align-items: center;
          }

          .tab-button {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .step {
            flex-direction: column;
            text-align: center;
          }

          .step-number {
            align-self: center;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .legal-notice {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}
