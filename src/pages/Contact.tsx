import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ContactProps {
  setActivePage: (page: string) => void;
}

export const Contact: React.FC<ContactProps> = ({ setActivePage }) => {
  const { addInquiry, startNewEmailThread } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'E-Waste Collection & Pickup',
    quantity: 'Medium Office (10-50 items)',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: `Company: ${formData.company}. Qty: ${formData.quantity}. Preferred Date: ${formData.date}. Message: ${formData.message}`
    });
    startNewEmailThread(
      formData.email,
      formData.name,
      `Inquiry: ${formData.service}`,
      `Hello WEEE Centre Support,\n\nMy name is ${formData.name} from ${formData.company || 'Private/Individual'}.\n\nI am contacting you regarding: ${formData.service} (${formData.quantity}).\n\nPreferred Date: ${formData.date}\n\nMessage:\n${formData.message || 'No additional details.'}`
    );
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'What types of electronic waste does WEEE Centre collect and recycle?',
      a: 'We accept virtually all electrical and electronic equipment (WEEE). This includes computers, laptops, servers, mobile phones, printers, telecommunication gear, network switches, CRT/LCD monitors, household appliances, battery packs, medical electronics, and solar power equipment.'
    },
    {
      q: 'How do you guarantee that our confidential corporate data is completely destroyed?',
      a: 'We adhere strictly to NIST SP 800-88 and DoD 5220.22-M data sanitization guidelines. We offer both high-voltage magnetic degaussing (which irreversibly destroys magnetic storage) and physical industrial hard drive shredding down to 10mm particles. Upon completion, we issue a legally binding Certificate of Data Destruction complete with drive serial numbers.'
    },
    {
      q: 'Is there a charge for e-waste collection and pickup?',
      a: 'For large corporate batches and institutional cleanouts, collection logistics are typically subsidized or offset by material recovery values. For smaller household drop-offs at our designated community collection points, disposal is 100% free! Contact us with your estimated inventory for a customized logistics evaluation.'
    },
    {
      q: 'How does WEEE Centre support companies with EPR (Extended Producer Responsibility)?',
      a: 'We serve as an accredited Producer Responsibility Organization (PRO) partner under Kenya\'s NEMA regulations. We help brand owners and importers register their EPR schemes, conduct nationwide take-back drives, manage recycling documentation, and provide statutory audit reports required by environmental authorities.'
    }
  ];

  return (
    <main>
      {/* Page Header Banner */}
      <header className="bg-soft-green py-5 border-bottom">
        <div className="container py-3 text-center text-md-start">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none text-success">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
            </ol>
          </nav>
          <h1 className="fw-bold text-dark-green mb-2">Get in Touch & Dispose Responsibly</h1>
          <p className="text-muted max-w-2xl font-sm mb-0">
            Whether you need a scheduled collection for corporate IT scrap or have a general sustainability inquiry, our team in Nairobi is here to assist.
          </p>
        </div>
      </header>

      {/* Main Contact Section */}
      <section className="py-5 my-3">
        <div className="container">
          {submitted ? (
            <div className="alert alert-success rounded-4 shadow-sm p-4 mb-5 border-success d-flex align-items-center" role="alert">
              <i className="fa-solid fa-circle-check fs-2 me-3 text-success"></i>
              <div className="flex-grow-1">
                <h4 className="alert-heading fw-bold fs-5 mb-1">Request Successfully Submitted!</h4>
                <p className="mb-0 font-sm">
                  Thank you, <strong>{formData.name || 'Partner'}</strong>! Your request regarding <strong>"{formData.service}"</strong> has been received. Our logistics and technical team will contact you within 24 business hours.<br />
                  <span className="badge bg-success text-white mt-2 p-2 font-xs"><i className="fa-solid fa-envelope me-1"></i> A working email conversation thread has been opened! Check the floating Email tab at bottom-left.</span>
                </p>
              </div>
              <button onClick={() => setSubmitted(false)} className="btn btn-sm btn-outline-success rounded-pill px-3">Send Another</button>
            </div>
          ) : null}

          <div className="row g-5">
            {/* Left Column: Office Info */}
            <div className="col-12 col-lg-5">
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Contact Details</span>
              <h2 className="section-title mb-4">Reach Our Headquarters</h2>
              <p className="text-muted font-sm mb-4">
                Our recycling facility and corporate offices are open Monday through Friday for deliveries, institutional consultations, and facility tours.
              </p>

              <div className="d-flex flex-column gap-4 mb-5">
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: '54px', height: '54px' }}>
                    <i className="fa-solid fa-location-dot fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-dark-green mb-1">Physical Address & P.O Box</h4>
                    <p className="font-sm text-muted mb-0">P.O Box 69633 – 00400<br />Nairobi, Kenya (Embakasi Facility)</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: '54px', height: '54px' }}>
                    <i className="fa-solid fa-phone fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-dark-green mb-1">Phone & Hotline</h4>
                    <p className="font-sm text-muted mb-0">
                      <a href="tel:+254768449499" className="text-decoration-none text-dark">+254768449499</a><br />
                      <span className="font-xs text-success fw-semibold">Available Mon - Fri, 8:00 AM - 5:00 PM EAT</span>
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style={{ width: '54px', height: '54px' }}>
                    <i className="fa-solid fa-envelope fs-5"></i>
                  </div>
                  <div>
                    <h4 className="fs-6 fw-bold text-dark-green mb-1">Email Addresses</h4>
                    <p className="font-sm text-muted mb-0">
                      <a href="mailto:ogadan254@gmail.com" className="text-decoration-none text-dark">ogadan254@gmail.com</a> (General)<br />
                      <a href="mailto:logistics@weeecentre.com" className="text-decoration-none text-dark">logistics@weeecentre.com</a> (Pickups)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-dark-green text-white rounded-4 shadow-sm">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <i className="fa-solid fa-shield-halved text-light-green fs-4"></i>
                  <h5 className="fs-6 fw-bold mb-0 text-white">Need Urgent Corporate Data Erasure?</h5>
                </div>
                <p className="font-xs text-light mb-3 opacity-90">
                  For immediate enterprise decommissioning and on-site hard drive destruction, request our rapid-response ITAD mobile unit.
                </p>
                <a href="#contactForm" className="btn btn-outline-light btn-sm rounded-pill px-3 font-xs">Request Mobile Unit</a>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="col-12 col-lg-7">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border border-secondary border-opacity-10" id="contactForm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="fw-bold text-dark-green fs-4 mb-0">Send Us an Inquiry</h3>
                  <span className="badge bg-light-green text-dark-green font-xs px-3 py-2 rounded-pill">Response within 24 Hrs</span>
                </div>

                <form onSubmit={handleSubmit} className="row g-3" noValidate>
                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control rounded-3 py-2 font-sm" 
                      required 
                      placeholder="David Mwangi"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Organization / Company</label>
                    <input 
                      type="text" 
                      className="form-control rounded-3 py-2 font-sm" 
                      placeholder="e.g. Safaricom / School"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control rounded-3 py-2 font-sm" 
                      required 
                      placeholder="david@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-control rounded-3 py-2 font-sm" 
                      required 
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label font-sm fw-semibold">Service Required *</label>
                    <select 
                      className="form-select rounded-3 py-2 font-sm"
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                    >
                      <option value="E-Waste Collection & Pickup">🚚 E-Waste Collection & Pickup (Dispose Now)</option>
                      <option value="Secure Data Destruction">🔒 Secure & Certified Data Destruction</option>
                      <option value="EPR Compliance Consultation">📋 EPR Compliance & NEMA Consultation</option>
                      <option value="Training & Awareness Workshop">🎓 Training & Capacity Building Workshop</option>
                      <option value="Project Partnership / Sponsorship">🤝 Project Partnership / Sponsorship</option>
                      <option value="Event Registration">📅 Event Registration / Attendance</option>
                      <option value="General Sustainability Inquiry">💡 General Sustainability Inquiry</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Estimated E-Waste Quantity</label>
                    <select 
                      className="form-select rounded-3 py-2 font-sm"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    >
                      <option value="Small Household (1-10 items)">Small Household (1-10 items / phones / laptops)</option>
                      <option value="Medium Office (10-50 items)">Medium Office (10-50 computers / printers)</option>
                      <option value="Large Enterprise (500 kg - 2 Tonnes)">Large Enterprise (500 kg - 2 Tonnes)</option>
                      <option value="Industrial / Warehouse (Over 2 Tonnes)">Industrial / Warehouse (Over 2 Tonnes)</option>
                      <option value="Not Applicable">Not Applicable</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label font-sm fw-semibold">Preferred Date</label>
                    <input 
                      type="date" 
                      className="form-control rounded-3 py-2 font-sm"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label font-sm fw-semibold">Specific Items or Notes *</label>
                    <textarea 
                      className="form-control rounded-3 py-2 font-sm" 
                      rows={4} 
                      required 
                      placeholder="Please list specific electronic equipment (e.g., 15 Dell desktop monitors, 4 servers) or specify inquiry details..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-dark-green w-100 rounded-pill py-3 fw-bold shadow-sm transition-all d-flex align-items-center justify-content-center fs-6">
                      <i className="fa-solid fa-paper-plane me-2"></i> Submit Request & Schedule Disposal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-5 bg-soft-green border-top border-bottom" id="faq">
        <div className="container max-w-4xl">
          <div className="text-center mb-5">
            <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Common Questions</span>
            <h2 className="section-title section-title-center mb-3">Frequently Asked Questions</h2>
            <p className="text-muted font-sm">Everything you need to know about e-waste disposal, data security, and NEMA compliance.</p>
          </div>

          <div className="accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion">
            {faqs.map((faq, idx) => (
              <div className="accordion-item border-0 border-bottom" key={idx}>
                <h3 className="accordion-header" id={`faq${idx}`}>
                  <button 
                    className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} fw-bold text-dark-green py-3 px-4 font-sm`} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#collapse${idx}`} 
                    aria-expanded={idx === 0} 
                    aria-controls={`collapse${idx}`}
                  >
                    {faq.q}
                  </button>
                </h3>
                <div id={`collapse${idx}`} className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} aria-labelledby={`faq${idx}`} data-bs-parent="#faqAccordion">
                  <div className="accordion-body font-sm text-muted px-4 py-3">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
