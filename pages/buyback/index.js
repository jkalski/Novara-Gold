import { useState } from 'react'
import { 
  FiShield, 
  FiCheckCircle, 
  FiDollarSign,
  FiTruck,
  FiFileText,
  FiAlertCircle,
  FiUsers,
  FiLock,
  FiStar,
  FiHeart,
  FiPhone
} from 'react-icons/fi'
import SEO from '../../components/SEO'

export default function BuyBackPage() {
  const [activeTab, setActiveTab] = useState('ira')

  const tabs = [
    { id: 'ira', label: 'IRA Storage', icon: FiLock },
    { id: 'personal', label: 'Personal Possession', icon: FiUsers },
    { id: 'external', label: 'External Metals', icon: FiShield }
  ]

  return (
    <div className="section">
      <SEO 
        title="Precious Metals Buy Back Program - Sell Your Gold & Silver | Novara Gold"
        description="Sell your precious metals with Novara Gold's buy back program. Competitive pricing for gold, silver, platinum, and palladium. Transparent process with no hidden fees."
        canonical="/buyback"
        keywords="precious metals buy back, sell gold, sell silver, precious metals sell, gold buy back, silver buy back, platinum buy back"
      />
      <div className="container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">
              <FiShield />
            </div>
            <h1>BUY BACK POLICY</h1>
            <p className="hero-subtitle">While offering a guaranteed buy back is not legal is the United States, Novara Gold offers a buy back option to our clients for metals only purchased through Novara Gold. Once you take possession of your Precious Metals, they are your property. Whether they are stored personally or within a self-directed IRA, you can sell them at any time and to any person or dealer you chose. We ask our clients to come to Novara Gold first. We will do our best to give you the best possible price through our network of dealers. Our process for buy backs can be found below:</p>
            <div className="hero-cta">
              <a href="tel:8002431571" className="btn btn-primary btn-large">
                <FiPhone className="btn-icon" />
                Call (800) 243-1571
              </a>
              <p className="hero-cta-text">Speak with a buy back specialist today</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="buyback-content">
          <div className="content-section">
            <div className="section-header">
              <FiLock className="section-icon" />
              <h2>Buy Backs for Metals in an IRA and in IRS-approved storage facility</h2>
            </div>
            <div className="section-content">
              <p>Once a buy back is authorized and a price is agreed upon by both client and Novara Gold, a sell order will be populated. The sell order has to be signed by End Of Business Day on the day the sell order is drawn up to lock in the agreed upon price. Since the metals are stored and accounted for in an approved storage facility verification of said metals will not need to be verified. Once the transaction is completed Novara Gold will send funds to the appropriate custodian where the metals were being held. Since there are a lot of costs involved during processing of original purchase (Sourcing, shipment, verification and insurance) any metals sold within 18 months of original purchase date will be subject to a 3% restocking fee. Any metals sold after 18 months will be done so commission free. This excludes any RMD's required by law in IRA accounts. All RMD's will be sold commission free.</p>
            </div>
            </div>
            
          <div className="content-section">
            <div className="section-header">
              <FiUsers className="section-icon" />
              <h2>Buy Backs for Metals in Personal Possession</h2>
            </div>
            <div className="section-content">
              <p>Once you chose which metals you want to sell Novara Gold will cover all costs of shipping and insurance from client's address to verification facility. Once the metals are inspected and verified then a price will be agreed upon between client and Novara Gold. A sell order will be created and needs to be signed by the client before End of Business Day to lock in agreed price. Novara Gold will send payment via Wire or Check (client's choice) within 72 hours of returned signed sell order. Any metals sold within 18 months of original purchase date will be subject to a 3% restocking fee. If metals are deemed to be fraudulent and verified that they are not the metals that were purchased for client by Novara Gold, the client will be responsible for costs of shipping and insuring metals to be returned to client.</p>
          </div>
        </div>

          <div className="content-section">
            <div className="section-header">
              <FiShield className="section-icon" />
              <h2>Buy Backs for Metals not Purchased through Novara Gold</h2>
            </div>
            <div className="section-content">
              <p>Novara Gold will buy back metals not purchased originally by Novara Gold. Any new customer or existing customer will be charged a 4% commission for the transaction. Any price agreed upon will not be established until a full verification of purity and authenticity is completed.</p>
          </div>
        </div>

          <div className="content-section">
            <div className="section-header">
              <FiHeart className="section-icon" />
              <h2>We commit to honesty and transparency</h2>
            </div>
            <div className="section-content">
              <p>While some firms advertise guaranteed buy-backs, those promises are often misleading and can include hidden conditions. At Novara Gold, we prefer to be upfront: our buy-back policy is a service we strive to offer whenever possible, but never at the expense of honesty and compliance. Even in the rare event that Novara Gold is unable to buy back metals at a given time due to certain market conditions or inventory issues, you are never locked in or stuck. Clients may always choose to sell their metals independently through other dealers, exchanges or private transactions. We pride ourselves in giving our clients low-cost pricing and we know our clients will see that, no matter who they sell it too at fair market value, so whether selling back to Novara Gold or to someone else our clients will be taken care of.</p>
            </div>
          </div>
        </div>
                
        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2>Ready to Sell Your Precious Metals?</h2>
            <p>Call us at <strong>(800) 243-1571</strong> to speak with a buy back specialist today.</p>
            <div className="cta-buttons">
              <a href="tel:8002431571" className="btn btn-primary">
                <FiPhone className="btn-icon" />
                Call Now
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
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/goldbarsBackground.jpg') center/cover;
          opacity: 0.1;
          z-index: 0;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .hero-icon {
          font-size: 4rem;
          color: var(--gs-gold);
          margin-bottom: var(--space-6);
          display: flex;
          justify-content: center;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .hero-content h1 {
          font-size: 3rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-6);
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.7;
          margin-bottom: var(--space-8);
          opacity: 0.95;
        }

        .hero-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }

        .hero-cta-text {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        .buyback-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .content-section {
          background: white;
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          border: 1px solid var(--gs-gray-200);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .content-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          padding-bottom: var(--space-4);
          border-bottom: 3px solid var(--gs-gold);
        }

        .section-icon {
          font-size: 2rem;
          color: var(--gs-blue);
          flex-shrink: 0;
        }

        .section-header h2 {
          font-size: 1.75rem;
          font-weight: var(--font-bold);
          color: var(--gs-gray-900);
          margin: 0;
          line-height: 1.3;
        }

        .section-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--gs-gray-700);
          margin: 0;
        }


        .cta-section {
          background: var(--gs-gray-900);
          color: white;
          padding: var(--space-16) 0;
          margin: var(--space-16) 0;
          border-radius: var(--radius-xl);
          text-align: center;
        }

        .cta-content h2 {
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-4);
        }

        .cta-content p {
          font-size: 1.25rem;
          margin-bottom: var(--space-8);
          opacity: 0.9;
        }

        .cta-buttons {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }


        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }

          .hero-icon {
            font-size: 3rem;
          }

          .section-header {
            flex-direction: column;
            text-align: center;
            gap: var(--space-3);
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          .policy-header {
            flex-direction: column;
            text-align: center;
            gap: var(--space-3);
          }

          .policy-header h2 {
            font-size: 1.75rem;
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

          .content-section {
            padding: var(--space-6);
          }

          .policy-section {
            padding: var(--space-8);
          }
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4) var(--space-6);
          border-radius: var(--radius-lg);
          font-weight: var(--font-semibold);
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }

        .btn-primary {
          background: var(--gs-blue);
          color: white;
        }

        .btn-primary:hover {
          background: var(--gs-blue-dark);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--gs-blue);
          border: 2px solid var(--gs-blue);
        }

        .btn-secondary:hover {
          background: var(--gs-blue);
          color: white;
          transform: translateY(-2px);
        }

        .btn-large {
          padding: var(--space-5) var(--space-8);
          font-size: 1.125rem;
        }

        .btn-icon {
          font-size: 1.25rem;
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

        .process-description {
          margin-bottom: var(--space-8);
        }

        .process-description p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--gs-gray-700);
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

        .policy-section {
          background: linear-gradient(135deg, var(--gs-gray-50) 0%, var(--gs-gray-100) 100%);
          padding: var(--space-16) 0;
          margin: var(--space-16) 0;
          border-radius: var(--radius-xl);
        }

        .policy-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        .policy-content h2 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: var(--font-bold);
          margin-bottom: var(--space-12);
          color: var(--gs-gray-800);
        }

        .policy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: var(--space-8);
        }

        .policy-text {
          max-width: 1000px;
          margin: 0 auto;
        }

        .policy-text p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: var(--gs-gray-700);
          text-align: left;
        }

        .policy-item {
          background: white;
          padding: var(--space-6);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow);
          border: 1px solid var(--gs-gray-200);
          text-align: center;
        }

        .policy-icon {
          font-size: 2.5rem;
          color: var(--gs-blue);
          margin-bottom: var(--space-4);
        }

        .policy-item h4 {
          font-size: 1.25rem;
          font-weight: var(--font-semibold);
          margin-bottom: var(--space-4);
          color: var(--gs-gray-800);
        }

        .policy-item p {
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

        .legal-text h3 {
          font-size: 1.25rem;
          font-weight: var(--font-bold);
          color: var(--gs-gray-800);
          margin: var(--space-6) 0 var(--space-3) 0;
          line-height: 1.3;
        }

        .legal-text h3:first-of-type {
          margin-top: var(--space-4);
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

