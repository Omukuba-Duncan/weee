import React, { useState } from 'react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 6000);
    }, 1000);
  };

  return (
    <footer className="footer bg-dark-green text-white pt-5 mt-auto border-top border-success border-4">
      <div className="container py-4">
        <div className="row g-4 justify-content-between">
          {/* Column 1: Brand & Tagline */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex align-items-center mb-3">
              <div className="logo-icon-wrapper me-2 bg-white rounded-circle d-flex align-items-center justify-content-center p-2" style={{ width: '42px', height: '42px' }}>
                <i className="fa-solid fa-recycle text-success fs-4"></i>
              </div>
              <div className="d-flex flex-column lh-1">
                <span className="fw-bold fs-5 tracking-tight text-white">WEEE CENTRE</span>
                <span className="text-light-green font-xs tracking-wider">Towards Sustainable Future</span>
              </div>
            </div>
            <p className="text-light font-sm pe-lg-3 mb-4 opacity-85 lh-relaxed">
              Leading the way in responsible e-waste management for a cleaner and greener tomorrow across Kenya and the East African region.
            </p>
            <div className="social-links d-flex gap-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Twitter / X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="YouTube">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Quick Links</h5>
            <ul className="list-unstyled footer-links mb-0 font-sm">
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>About Us</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('services'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Services</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#certifications')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Certifications</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('projects'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Projects</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('events'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Events</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('admin'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-warning text-decoration-none transition-hover fw-bold"><i className="fa-solid fa-user-shield font-xs me-2 text-warning"></i>Admin Portal (CMS)</a></li>
              <li className="mb-0"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Resources</h5>
            <ul className="list-unstyled footer-links mb-0 font-sm">
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#resources')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>E-Waste Education Hub</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#resources')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Guidelines & Policies</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#resources')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Reports & Publications</a></li>
              <li className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('events'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>News & Updates</a></li>
              <li className="mb-0"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('contact'); setTimeout(() => document.querySelector('#faq')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover"><i className="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="col-12 col-md-6 col-lg-2">
            <h5 className="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Contact Us</h5>
            <ul className="list-unstyled mb-0 font-sm pe-lg-2">
              <li className="d-flex mb-3 align-items-start">
                <i className="fa-solid fa-location-dot mt-1 me-2 text-accent-green"></i>
                <span className="text-light">P.O Box 69633 – 00400 Nairobi, Kenya</span>
              </li>
              <li className="d-flex mb-3 align-items-center">
                <i className="fa-solid fa-phone me-2 text-accent-green"></i>
                <a href="tel:+254768449499" className="text-light text-decoration-none">+254768449499</a>
              </li>
              <li className="d-flex mb-3 align-items-center">
                <i className="fa-solid fa-envelope me-2 text-accent-green"></i>
                <a href="mailto:ogadan254@gmail.com" className="text-light text-decoration-none">ogadan254@gmail.com</a>
              </li>
              <li className="d-flex mb-0 align-items-center">
                <i className="fa-solid fa-globe me-2 text-accent-green"></i>
                <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); window.scrollTo({top:0, behavior:'smooth'}); }} className="text-light text-decoration-none">www.weeecentre.com</a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Newsletter</h5>
            <p className="font-sm text-light mb-3 opacity-85">
              Subscribe to our newsletter for latest e-waste regulations, sustainability updates and community drives.
            </p>
            <form className="newsletter-form" onSubmit={handleSubscribe} noValidate>
              <div className="mb-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-sm rounded-pill py-2 px-3 border-0 shadow-sm font-sm" 
                  placeholder="Enter your email" 
                  aria-label="Enter your email for newsletter" 
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-success btn-sm w-100 rounded-pill py-2 fw-semibold shadow-sm transition-all d-flex align-items-center justify-content-center"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane me-2"></i> Subscribe
                  </>
                )}
              </button>
            </form>
            {error && <div className="mt-2 font-xs text-warning"><i className="fa-solid fa-triangle-exclamation me-1"></i> {error}</div>}
            {subscribed && <div className="mt-2 font-xs text-light-green fw-medium"><i className="fa-solid fa-circle-check me-1"></i> Thank you! You've been subscribed to our updates.</div>}
          </div>
        </div>

        {/* Horizontal Divider */}
        <hr className="my-4 border-light opacity-15" />

        {/* Bottom Copyright & Policies */}
        <div className="row align-items-center font-sm text-light opacity-75">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <span>&copy; {new Date().getFullYear()} WEEE Centre. All Rights Reserved.</span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#privacy')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none me-3 transition-hover">Privacy Policy</a>
            <span className="me-3">|</span>
            <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => document.querySelector('#terms')?.scrollIntoView({behavior:'smooth'}), 100); }} className="text-light text-decoration-none transition-hover">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
