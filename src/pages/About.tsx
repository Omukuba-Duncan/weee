import React from 'react';
import { useApp } from '../context/AppContext';

interface AboutProps {
  setActivePage: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ setActivePage }) => {
  const { staffMembers } = useApp();
  const certifications = [
    { title: 'ISO 9001:2015 Certified', desc: 'International Standard for Quality Management Systems, ensuring consistent, high-quality recycling processes.', icon: 'fa-solid fa-certificate' },
    { title: 'NEMA Licensed Recycler', desc: 'Fully licensed by the National Environment Management Authority of Kenya for hazardous and non-hazardous e-waste.', icon: 'fa-solid fa-shield-halved' },
    { title: 'KEBS Approved Facility', desc: 'Compliant with Kenya Bureau of Standards guidelines on electrical equipment handling and environmental safety.', icon: 'fa-solid fa-stamp' },
    { title: 'UNEP Partner & Collaborator', desc: 'Active collaborator with United Nations Environment Programme on regional e-waste policy and training.', icon: 'fa-solid fa-globe' }
  ];

  const resources = [
    { title: 'Kenya E-Waste EPR Guidelines 2024', type: 'PDF Document • 4.2 MB', icon: 'fa-solid fa-file-pdf' },
    { title: 'Corporate Data Destruction Standard', type: 'PDF Guide • 2.1 MB', icon: 'fa-solid fa-file-shield' },
    { title: 'Annual Environmental Impact Report', type: 'Publication • 6.8 MB', icon: 'fa-solid fa-book-open' },
    { title: 'Household Recycling Toolkit', type: 'Brochure • 1.5 MB', icon: 'fa-solid fa-file-lines' }
  ];

  return (
    <main>
      {/* Page Header Banner */}
      <header className="bg-soft-green py-5 border-bottom">
        <div className="container py-3 text-center text-md-start">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none text-success">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </nav>
          <h1 className="fw-bold text-dark-green mb-2">About WEEE Centre</h1>
          <p className="text-muted max-w-2xl font-sm mb-0">
            Leading East Africa’s transition towards a circular economy through certified e-waste recycling, corporate data security, and green jobs creation.
          </p>
        </div>
      </header>

      {/* Main About Content */}
      <section className="py-5 my-3">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Who We Are</span>
              <h2 className="section-title mb-4">Pioneering E-Waste Recycling in East Africa</h2>
              <p className="text-muted mb-3">
                Founded with a bold vision to safeguard our environment and public health from the hazards of electronic waste, <strong>WEEE Centre</strong> (Waste Electrical and Electronic Equipment Centre) stands as the premier NEMA-licensed and ISO 9001:2015 certified recycling facility in Kenya.
              </p>
              <p className="text-muted mb-4">
                We provide end-to-end e-waste management services including safe collection, dismantling, material recovery, and certified military-grade data destruction for corporations, government bodies, educational institutions, and households.
              </p>
              
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 bg-light-green rounded-3 border border-success border-opacity-25">
                    <h4 className="fw-bold text-primary-green mb-1">Our Mission</h4>
                    <p className="font-xs text-muted mb-0">To protect human health and the environment through safe collection and eco-friendly recycling of e-waste.</p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 bg-light-green rounded-3 border border-success border-opacity-25">
                    <h4 className="fw-bold text-primary-green mb-1">Our Vision</h4>
                    <p className="font-xs text-muted mb-0">A sustainable East Africa with zero electronic waste in landfills and 100% circular resource recovery.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" alt="WEEE Centre Facility and Technicians" className="img-fluid rounded-4 shadow-lg border" />
                <div className="position-absolute bottom-0 start-0 m-3 bg-white p-3 rounded-3 shadow border d-flex align-items-center gap-3">
                  <div className="bg-success text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="fa-solid fa-award fs-4"></i>
                  </div>
                  <div>
                    <span className="fw-bold d-block text-dark-green font-sm">Over 15 Years of Excellence</span>
                    <span className="font-xs text-muted">Trusted by 250+ Partner Organizations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-5 bg-light border-top border-bottom" id="certifications">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Compliance & Standards</span>
            <h2 className="section-title section-title-center mb-3">Our Certifications & Accreditations</h2>
            <p className="text-muted max-w-2xl mx-auto font-sm">
              We adhere to the strictest domestic and international standards to guarantee environmental safety and corporate compliance.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {certifications.map((cert, idx) => (
              <div className="col-12 col-md-6 col-lg-3" key={idx}>
                <div className="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
                  <div className="service-icon-circle mb-3 mx-auto"><i className={cert.icon}></i></div>
                  <h4 className="fs-5 fw-bold text-dark-green">{cert.title}</h4>
                  <p className="font-sm text-muted mb-0">{cert.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Staff Team Section */}
      <section className="py-5 my-4" id="team">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">The People Behind The Green Mission</span>
            <h2 className="section-title section-title-center mb-3">Our Leadership & Technical Team</h2>
            <p className="text-muted max-w-2xl mx-auto font-sm">
              Meet our certified environmental engineers, logistics coordinators, and executive leadership steering East Africa towards zero e-waste landfills.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {staffMembers.map((staff) => (
              <div className="col-12 col-md-6 col-lg-4" key={staff.id}>
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden h-100 bg-white">
                  <div className="position-relative" style={{ height: '280px', overflow: 'hidden' }}>
                    <img src={staff.photo} alt={staff.name} className="w-100 h-100" style={{ objectFit: 'cover' }} />
                    <span className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 font-xs shadow-sm ${
                      staff.status === 'Active' ? 'bg-success text-white' :
                      staff.status === 'Field Deployment' ? 'bg-warning text-dark' : 'bg-secondary text-white'
                    }`}>
                      <i className="fa-solid fa-circle me-1" style={{ fontSize: '8px' }}></i> {staff.status}
                    </span>
                  </div>
                  <div className="card-body p-4">
                    <span className="badge bg-light text-success border border-success-subtle mb-2 font-xs">{staff.department}</span>
                    <h4 className="fw-bold fs-5 text-dark-green mb-1">{staff.name}</h4>
                    <p className="text-muted font-sm fw-semibold mb-3">{staff.role}</p>
                    <hr className="my-3 opacity-10" />
                    <div className="d-flex flex-column gap-2 font-xs text-muted">
                      <div><i className="fa-solid fa-envelope me-2 text-success"></i><a href={`mailto:${staff.email}`} className="text-decoration-none text-muted">{staff.email}</a></div>
                      <div><i className="fa-solid fa-phone me-2 text-success"></i>{staff.phone}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Education Hub */}
      <section className="py-5 my-3" id="resources">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Knowledge Hub</span>
              <h2 className="section-title mb-0">E-Waste Resources & Guidelines</h2>
            </div>
            <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-outline-success rounded-pill px-4 py-2 font-sm mt-3 mt-md-0">Request Custom Report</button>
          </div>

          <div className="row g-4">
            {resources.map((res, idx) => (
              <div className="col-12 col-md-6" key={idx}>
                <div className="d-flex align-items-center justify-content-between p-3 bg-soft-green rounded-3 border border-success border-opacity-25 shadow-sm">
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-white text-success rounded p-3 shadow-sm fs-4"><i className={res.icon}></i></div>
                    <div>
                      <h5 className="fw-bold fs-6 mb-1 text-dark-green">{res.title}</h5>
                      <span className="font-xs text-muted">{res.type}</span>
                    </div>
                  </div>
                  <button onClick={() => alert(`Downloading ${res.title}...`)} className="btn btn-success btn-sm rounded-pill px-3 py-1 font-xs d-flex align-items-center">
                    <i className="fa-solid fa-download me-1"></i> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
