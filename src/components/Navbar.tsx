import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenDisposeModal: () => void;
  onOpenCodeViewer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenDisposeModal,
  onOpenCodeViewer
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'index', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'certifications', label: 'Certifications', targetPage: 'about', anchor: '#certifications' },
    { id: 'projects', label: 'Projects' },
    { id: 'events', label: 'Events' },
    { id: 'resources', label: 'Resources', targetPage: 'about', anchor: '#resources' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'admin', label: '🛡️ Admin Portal' },
  ];

  const handleNavClick = (link: typeof navLinks[0], e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (link.targetPage) {
      setActivePage(link.targetPage);
      setTimeout(() => {
        const el = document.querySelector(link.anchor!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActivePage(link.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky-top z-3">
      {/* Top Bar Notice */}
      <div className="bg-dark-green text-white py-1 px-3 d-none d-lg-block border-bottom border-secondary border-opacity-25" style={{ fontSize: '0.8125rem' }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="me-3"><i className="fa-solid fa-location-dot me-1 text-accent-green"></i> P.O Box 69633 – 00400 Nairobi, Kenya</span>
            <span><i className="fa-solid fa-phone me-1 text-accent-green"></i> +254 700 000 000</span>
          </div>
          <div className="d-flex align-items-center">
            <a href="mailto:info@weeecentre.com" className="text-white text-decoration-none me-3"><i className="fa-solid fa-envelope me-1 text-accent-green"></i> info@weeecentre.com</a>
            <span className="badge bg-success bg-opacity-75 text-white me-2">ISO 9001:2015 Certified</span>
            <button 
              onClick={onOpenCodeViewer} 
              className="btn btn-sm btn-outline-light py-0 px-2 rounded-pill font-xs d-flex align-items-center"
              title="Inspect created PHP template files and download"
            >
              <i className="fa-solid fa-code me-1 text-light-green"></i> PHP Template Code
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`navbar navbar-expand-lg navbar-light bg-white py-2 py-lg-3 transition-all ${isScrolled ? 'shadow-md py-lg-2' : 'shadow-sm'}`} style={{ transition: 'all 0.3s ease' }}>
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand d-flex align-items-center py-0" href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
            <div className="logo-icon-wrapper me-2 d-flex align-items-center justify-content-center">
              <span className="logo-recycle-icon" style={{ fontSize: '1.85rem' }}>
                <i className="fa-solid fa-recycle text-success"></i>
              </span>
            </div>
            <div className="d-flex flex-column lh-1">
              <span className="fw-bold fs-4 tracking-tight text-dark-green logo-title">WEEE CENTRE</span>
              <span className="text-muted font-xs tracking-wider logo-subtitle">Towards Sustainable Future</span>
            </div>
          </a>

          {/* Mobile Toggler */}
          <div className="d-flex align-items-center gap-2 d-lg-none">
            <button 
              onClick={(e) => { e.preventDefault(); setActivePage('admin'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
              className={`btn btn-sm py-1 px-2 rounded-pill font-xs fw-bold d-flex align-items-center ${activePage === 'admin' ? 'btn-success text-white' : 'btn-dark text-white border border-warning'}`}
              title="Open Admin Portal"
            >
              <i className="fa-solid fa-user-shield text-warning me-1"></i> Admin
            </button>
            <button 
              onClick={onOpenCodeViewer} 
              className="btn btn-sm btn-outline-success py-1 px-2 rounded-pill font-xs d-flex align-items-center"
              title="View PHP Code"
            >
              <i className="fa-solid fa-code"></i>
            </button>
            <button 
              className="navbar-toggler border-0 shadow-none px-2" 
              type="button" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen} 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Nav Links & CTA */}
          <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show bg-white p-3 rounded shadow mt-2' : ''}`} id="navbarContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
              {navLinks.map((link) => {
                const isActive = activePage === (link.targetPage || link.id);
                return (
                  <li className="nav-item px-1" key={link.id}>
                    <a 
                      className={`nav-link ${isActive ? 'active fw-bold text-success' : ''}`} 
                      href="#" 
                      onClick={(e) => handleNavClick(link, e)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Action Buttons */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <button 
                onClick={(e) => { e.preventDefault(); setActivePage('admin'); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                className={`btn btn-sm rounded-pill px-3 py-1 font-xs fw-bold d-inline-flex align-items-center shadow-sm ${activePage === 'admin' ? 'btn-success text-white' : 'btn-dark text-white border border-warning'}`}
                title="Non-programmer CMS editor and lead manager"
              >
                <i className="fa-solid fa-user-shield me-1 text-warning"></i> Admin Portal
              </button>

              <button 
                onClick={onOpenCodeViewer}
                className="btn btn-outline-success rounded-pill px-3 py-1 font-xs fw-semibold d-none d-xl-inline-flex align-items-center shadow-sm"
                title="Explore generated PHP & MySQL files"
              >
                <i className="fa-solid fa-folder-tree me-1"></i> PHP Source (16 files)
              </button>

              <button 
                onClick={onOpenDisposeModal} 
                className="btn btn-dark-green btn-dispose rounded-pill px-4 py-2 d-flex align-items-center shadow-sm fw-semibold"
              >
                <i className="fa-solid fa-recycle me-2 rotate-hover"></i> Dispose Now
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
