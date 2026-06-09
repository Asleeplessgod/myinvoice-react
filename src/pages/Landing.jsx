import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="landing-nav">
        <h1 className="landing-logo">myINVOICE</h1>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#pricing">Pricing</a>
          <button className="btn-outline" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-cta" onClick={() => navigate('/register')}>Get Started Free</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">✦ Your Business. Your Invoices. Your Way.</span>
          <h1>Invoice Clients.<br />Get Paid Faster.</h1>
          <p>myINVOICE helps freelancers and small businesses create professional invoices, track payments and send invoices directly to clients — all in one place.</p>
          <div className="hero-buttons">
            <button className="btn-cta large" onClick={() => navigate('/register')}>
              Start for Free →
            </button>
            <button className="btn-outline large" onClick={() => navigate('/login')}>
              Login to Dashboard
            </button>
          </div>
          <p className="hero-note">✓ Free forever &nbsp;&nbsp; ✓ No credit card needed &nbsp;&nbsp; ✓ Setup in 2 minutes</p>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="hero-card-header">
              <span>Invoice #A3F9C2</span>
              <span className="badge-paid-hero">Paid</span>
            </div>
            <div className="hero-card-client">Acme Corporation</div>
            <div className="hero-card-amount">₦450,000</div>
            <div className="hero-card-footer">
              <span>Due: Jun 30, 2026</span>
              <span>✓ Sent</span>
            </div>
          </div>
          <div className="hero-card small">
            <div className="hero-card-header">
              <span>Invoice #B7D1E4</span>
              <span className="badge-unpaid-hero">Unpaid</span>
            </div>
            <div className="hero-card-client">TechStart Lagos</div>
            <div className="hero-card-amount">₦120,000</div>
            <div className="hero-card-footer">
              <span>Due: Jul 15, 2026</span>
              <span>⏳ Pending</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2>Everything you need to get paid</h2>
          <p>Built specifically for freelancers and small business owners who want to look professional and get paid on time.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>Professional Invoices</h3>
            <p>Create clean, branded invoices with your logo and business info in seconds.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Payment Tracking</h3>
            <p>Track paid, unpaid and overdue invoices from one clean dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📧</div>
            <h3>Send to Clients</h3>
            <p>Send invoices directly to your client's email with one click.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📥</div>
            <h3>PDF Download</h3>
            <p>Download any invoice as a clean PDF to share or store for your records.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Overdue Alerts</h3>
            <p>Automatically detects overdue invoices so you never miss a follow-up.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Multi-Currency</h3>
            <p>Support for Naira, Dollar, Pound, Euro and more African currencies.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <span className="section-badge">How it Works</span>
          <h2>Up and running in minutes</h2>
          <p>No complicated setup. No learning curve. Just invoices.</p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Create your account</h3>
            <p>Sign up for free in under 2 minutes. No credit card required.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Set up your business</h3>
            <p>Add your business name, logo and contact details to your profile.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Create your first invoice</h3>
            <p>Fill in your client details, add your services and set a due date.</p>
          </div>
          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Send and get paid</h3>
            <p>Send directly to your client's email or download as PDF and share.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing" id="pricing">
        <div className="section-header">
          <span className="section-badge">Pricing</span>
          <h2>Simple, honest pricing</h2>
          <p>Start free. Upgrade when you're ready. No hidden fees, ever.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <div className="pricing-plan">Free</div>
            <div className="pricing-amount">$0<span>/month</span></div>
            <p className="pricing-desc">Perfect for freelancers just getting started.</p>
            <ul className="pricing-features">
              <li>✓ Up to 5 invoices</li>
              <li>✓ PDF download</li>
              <li>✓ Basic dashboard</li>
              <li>✓ Multi-currency support</li>
              <li className="disabled">✗ Email sending</li>
              <li className="disabled">✗ Business logo on invoices</li>
              <li className="disabled">✗ Priority support</li>
            </ul>
            <button className="btn-cta full" onClick={() => navigate('/register')}>
              Get Started Free
            </button>
          </div>

          <div className="pricing-card featured">
            <div className="pricing-badge">Most Popular</div>
            <div className="pricing-plan">Pro</div>
            <div className="pricing-amount">$3<span>/month</span></div>
            <p className="pricing-desc">For serious freelancers and growing businesses.</p>
            <ul className="pricing-features">
              <li>✓ Unlimited invoices</li>
              <li>✓ PDF download</li>
              <li>✓ Full dashboard & analytics</li>
              <li>✓ Multi-currency support</li>
              <li>✓ Email sending</li>
              <li>✓ Business logo on invoices</li>
              <li>✓ Priority support</li>
            </ul>
            <button className="btn-cta full" disabled>
              Coming Soon
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div>
            <h3>myINVOICE</h3>
            <p>Your Business. Your Invoices. Your Way.</p>
          </div>
          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#pricing">Pricing</a>
            <span onClick={() => navigate('/login')} style={{cursor:'pointer'}}>Login</span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 myINVOICE. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default Landing