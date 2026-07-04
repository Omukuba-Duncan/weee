import React from 'react';
import { useApp } from '../context/AppContext';

interface ServicesProps {
  setActivePage: (page: string) => void;
  onOpenDisposeModal: () => void;
}

export const Services: React.FC<ServicesProps> = ({ setActivePage, onOpenDisposeModal }) => {
  const { services } = useApp();

  return (
    <main>
      {/* Page Header Banner */}
      <header className="bg-soft-green py-5 border-bottom">
        <div className="container py-3 text-center text-md-start">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none text-success">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Services</li>
            </ol>
          </nav>
          <h1 className="fw-bold text-dark-green mb-2">Our Specialized Services</h1>
          <p className="text-muted max-w-2xl font-sm mb-0">
            End-to-end electronic waste management solutions engineered for environmental safety, regulatory compliance, and total data security.
          </p>
        </div>
      </header>

      {/* Main Services Section */}
      <section className="py-5 my-3">
        <div className="container">
          {services.map((s, idx) => {
            const isEven = idx % 2 !== 0;
            return (
              <div className={`row g-5 align-items-center mb-5 pb-4 border-bottom ${isEven ? 'flex-md-row-reverse' : ''}`} id={s.id} key={s.id}>
                <div className="col-12 col-lg-6">
                  <span className="badge bg-soft-green text-dark-green border border-success border-opacity-25 px-3 py-2 rounded-pill font-xs mb-3">
                    <i className={`${s.icon} text-success me-1`}></i> {s.badge}
                  </span>
                  <h2 className="fw-bold text-dark-green fs-3 mb-3">{s.title}</h2>
                  <p className="text-muted font-sm lh-relaxed mb-4">{s.desc}</p>
                  
                  <h5 className="fs-6 fw-bold text-primary-green mb-3"><i className="fa-solid fa-circle-check me-2"></i>Key Service Highlights:</h5>
                  <ul className="list-unstyled font-sm text-dark mb-4">
                    {s.bullets.map((bullet, bIdx) => (
                      <li className="mb-2 d-flex align-items-start" key={bIdx}>
                        <i className="fa-solid fa-check text-success mt-1 me-2 font-xs"></i>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={onOpenDisposeModal} className="btn btn-dark-green rounded-pill px-4 py-2 font-sm shadow-sm">
                    Book This Service <i className="fa-solid fa-arrow-right ms-2"></i>
                  </button>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="position-relative p-2 bg-white rounded-4 shadow-sm border">
                    <img src={s.img} alt={s.title} className="img-fluid rounded-3 w-100" style={{ maxHeight: '360px', objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-5 bg-soft-green border-top">
        <div className="container text-center py-4">
          <h3 className="fw-bold text-dark-green mb-3">Need a Custom Waste Management Solution?</h3>
          <p className="text-muted max-w-2xl mx-auto font-sm mb-4">
            Our environmental engineers and logistics specialists are ready to design a tailored recycling and data destruction plan for your organization.
          </p>
          <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow">
            Contact Our Technical Team <i className="fa-solid fa-headset ms-2"></i>
          </button>
        </div>
      </section>
    </main>
  );
};
