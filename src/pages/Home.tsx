import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';

interface HomeProps {
  setActivePage: (page: string) => void;
  onOpenDisposeModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActivePage, onOpenDisposeModal }) => {
  const { services, projects, partners } = useApp();
  const partnerTrackRef = useRef<HTMLDivElement>(null);

  const scrollPartners = (direction: 'left' | 'right') => {
    if (partnerTrackRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      partnerTrackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content">
      {/* 1. HERO SECTION */}
      <section className="hero-section position-relative">
        <div className="container position-relative z-2">
          <div className="row align-items-center g-5">
            {/* Left Column */}
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <div className="d-inline-flex align-items-center bg-light-green text-primary-green px-3 py-1 rounded-pill font-xs fw-semibold mb-3 border border-success border-opacity-25 shadow-sm">
                <span className="d-inline-block bg-success rounded-circle me-2" style={{ width: '8px', height: '8px' }}></span>
                ISO 9001:2015 Certified E-Waste Recycler
              </div>
              <h1 className="hero-title mb-3 tracking-tight">
                Responsible E-Waste <br className="d-none d-md-inline" />
                Management for a <br className="d-none d-md-inline" />
                <span className="text-primary-green">Sustainable Future</span>
              </h1>
              <p className="hero-subtitle mb-4 text-muted pe-lg-5 lh-relaxed">
                WEEE Centre is committed to the collection, recycling and responsible disposal of electrical and electronic waste across Kenya and East Africa.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                <button 
                  onClick={onOpenDisposeModal} 
                  className="btn btn-hero-primary d-inline-flex align-items-center shadow-sm"
                >
                  Dispose Now <i className="fa-solid fa-recycle ms-2 rotate-hover"></i>
                </button>
                <button 
                  onClick={() => { setActivePage('about'); window.scrollTo({top:0, behavior:'smooth'}); }} 
                  className="btn btn-hero-secondary d-inline-flex align-items-center"
                >
                  Learn More <i className="fa-solid fa-arrow-right ms-2 font-xs"></i>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-5 pt-3 border-top border-secondary border-opacity-10 d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center gap-4 text-muted font-xs">
                <span className="d-flex align-items-center"><i className="fa-solid fa-shield-halved text-success me-2 fs-6"></i> NEMA Certified</span>
                <span className="d-flex align-items-center"><i className="fa-solid fa-lock text-success me-2 fs-6"></i> Military-Grade Data Erasure</span>
                <span className="d-flex align-items-center"><i className="fa-solid fa-check-double text-success me-2 fs-6"></i> 100% Zero Landfill Policy</span>
              </div>
            </div>

            {/* Right Column: Graphic */}
            <div className="col-12 col-lg-5 d-flex justify-content-center">
              <div className="hero-image-wrapper p-3 bg-white bg-opacity-75 rounded-4 shadow-lg border border-white position-relative">
                <div className="position-absolute top-0 start-0 translate-middle badge bg-success text-white rounded-pill p-3 shadow d-none d-md-block">
                  <i className="fa-solid fa-leaf fs-4"></i>
                </div>
                <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" alt="Responsible E-Waste Recycling Bin and Electronics" className="img-fluid rounded-3 shadow-sm" />
                <div className="mt-3 text-center">
                  <span className="badge bg-soft-green text-dark-green border border-success border-opacity-25 px-3 py-2 rounded-pill font-xs">
                    <i className="fa-solid fa-recycle text-success me-1"></i> Eco-Friendly IT Asset Disposition (ITAD)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURE STRIP */}
      <section className="feature-strip container">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-sm-6 col-xl-3">
            <div className="feature-card d-flex flex-column">
              <div className="feature-icon shadow-sm">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h2 className="feature-title">E-Waste Collection</h2>
              <p className="feature-desc">Safe and efficient collection from homes, offices and institutions across the region.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="feature-card d-flex flex-column">
              <div className="feature-icon shadow-sm">
                <i className="fa-solid fa-recycle"></i>
              </div>
              <h2 className="feature-title">Responsible Recycling</h2>
              <p className="feature-desc">Environmentally sound recycling through certified and NEMA-approved processes.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="feature-card d-flex flex-column">
              <div className="feature-icon shadow-sm">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h2 className="feature-title">Data Security</h2>
              <p className="feature-desc">Secure data destruction for all data-bearing devices and enterprise IT equipment.</p>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-3">
            <div className="feature-card d-flex flex-column">
              <div className="feature-icon shadow-sm">
                <i className="fa-solid fa-leaf"></i>
              </div>
              <h2 className="feature-title">Environmental Impact</h2>
              <p className="feature-desc">Reducing landfill, conserving scarce resources and protecting our delicate ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SERVICES */}
      <section className="services-section py-5 my-3" id="services-overview">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">What We Offer</span>
            <h2 className="section-title section-title-center mb-3">Our Services</h2>
            <p className="text-muted max-w-2xl mx-auto font-sm">
              Comprehensive, secure, and environmentally compliant end-to-end e-waste management services tailored for enterprises, institutions, and communities.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {services.map((svc, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={idx}>
                <div className="service-card shadow-sm h-100">
                  <div>
                    <div className="service-icon-circle shadow-sm">
                      <i className={svc.icon}></i>
                    </div>
                    <h3 className="fw-bold text-dark-green">{svc.title}</h3>
                    <p>{svc.desc}</p>
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); setActivePage('services'); setTimeout(() => document.querySelector('#' + svc.id)?.scrollIntoView({behavior:'smooth'}), 100); }} 
                    className="btn-link-green mt-3"
                  >
                    Learn More <i className="fa-solid fa-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR IMPACT */}
      <section className="impact-section my-5" id="impact">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Measurable Change</span>
            <h2 className="section-title section-title-center mb-3">Our Impact</h2>
            <p className="text-muted max-w-2xl mx-auto font-sm">
              Driven by passion for environmental sustainability and circular economy across Kenya and East Africa.
            </p>
          </div>

          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-6 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon shadow-sm"><i className="fa-solid fa-leaf"></i></div>
                <div className="stat-number">12,500+</div>
                <div className="stat-label">Tonnes of E-waste<br />Collected</div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon shadow-sm"><i className="fa-solid fa-recycle"></i></div>
                <div className="stat-number">9,800+</div>
                <div className="stat-label">Tonnes Recycled<br />Responsibly</div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon shadow-sm"><i className="fa-solid fa-cloud"></i></div>
                <div className="stat-number">18,600+</div>
                <div className="stat-label">Tonnes of CO₂<br />Emissions Avoided</div>
              </div>
            </div>

            <div className="col-6 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon shadow-sm"><i className="fa-solid fa-users"></i></div>
                <div className="stat-number">250+</div>
                <div className="stat-label">Partner<br />Organizations</div>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg">
              <div className="stat-item">
                <div className="stat-icon shadow-sm"><i className="fa-solid fa-shield-check"></i></div>
                <div className="stat-number">100%</div>
                <div className="stat-label">Commitment to a<br />Greener Future</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS */}
      <section className="projects-section py-5 my-4" id="projects">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Recent Initiatives</span>
              <h2 className="section-title mb-0">Featured Projects</h2>
            </div>
            <div className="mt-3 mt-md-0">
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('projects'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn-link-green fs-6">
                View All Projects <i className="fa-solid fa-arrow-right ms-2"></i>
              </a>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {projects.map((proj, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={idx}>
                <div className="project-card shadow-sm">
                  <div className="project-img-wrapper">
                    <span className="project-badge shadow-sm">{proj.badge}</span>
                    <img src={proj.img} alt={proj.title} loading="lazy" />
                  </div>
                  <div className="project-body">
                    <div>
                      <h3 className="project-title">{proj.title}</h3>
                      <p className="project-desc">{proj.desc}</p>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('projects'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn-link-green mt-2">
                      Read More <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR PARTNERS */}
      <section className="partners-section border-top border-bottom py-5 bg-light bg-opacity-50" id="partners">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Collaborative Network</span>
              <h2 className="section-title mb-0">Our Partners</h2>
            </div>
            <div className="d-flex gap-2">
              <button onClick={() => scrollPartners('left')} className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" aria-label="Previous partners" style={{ width: '38px', height: '38px' }}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button onClick={() => scrollPartners('right')} className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" aria-label="Next partners" style={{ width: '38px', height: '38px' }}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div className="d-flex overflow-hidden py-3" ref={partnerTrackRef} style={{ scrollBehavior: 'smooth', gap: '1.5rem' }}>
            {partners.map((ptr, idx) => (
              <div key={idx} className="partner-logo-box bg-white rounded-3 shadow-sm border border-secondary border-opacity-10 flex-shrink-0 d-flex align-items-center justify-content-center px-4 py-3" style={{ minWidth: '190px' }}>
                <div className="d-flex align-items-center gap-2 text-dark-green fw-bold font-sm">
                  <i className={`${ptr.icon} fs-4 text-success`}></i>
                  <span>{ptr.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BANNER */}
      <section className="cta-banner py-5 bg-primary-green text-white position-relative overflow-hidden">
        <div className="container py-4 text-center position-relative z-2">
          <h2 className="text-white fw-bold mb-3">Ready to Dispose of Your E-Waste Responsibly?</h2>
          <p className="text-light max-w-2xl mx-auto mb-4 font-sm opacity-90">
            Partner with East Africa’s leading certified e-waste manager. Whether you have corporate IT scrap, household electronics, or need certified data destruction, we are here to help.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button onClick={onOpenDisposeModal} className="btn btn-light text-dark-green fw-bold rounded-pill px-5 py-3 shadow">
              Schedule a Pickup <i className="fa-solid fa-calendar-check ms-2 text-success"></i>
            </button>
            <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-outline-light fw-semibold rounded-pill px-4 py-3">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
