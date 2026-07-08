import React from 'react';

interface EventsProps {
  setActivePage: (page: string) => void;
}

export const Events: React.FC<EventsProps> = ({ setActivePage }) => {
  const upcomingEvents = [
    {
      day: '15',
      month: 'AUG',
      title: 'East Africa EPR Corporate Compliance Forum 2024',
      time: '09:00 AM - 01:00 PM EAT',
      location: 'Radisson Blu Hotel, Nairobi & Online Hybrid',
      desc: 'A high-level roundtable for brand owners, importers, and sustainability managers on meeting NEMA’s Extended Producer Responsibility statutory targets.',
      badge: 'Corporate Forum'
    },
    {
      day: '28',
      month: 'AUG',
      title: 'Nairobi Metropolitan Community E-Waste Take-Back Day',
      time: '08:00 AM - 04:00 PM EAT',
      location: 'Sarit Centre & Capital Centre Parking Bays',
      desc: 'Bring your broken laptops, old chargers, TVs, and phones! Free drop-off points with instant certificates of eco-responsibility and electronic vouchers.',
      badge: 'Public Drive'
    },
    {
      day: '12',
      month: 'SEP',
      title: 'Military-Grade Data Sanitization Masterclass',
      time: '10:00 AM - 12:30 PM EAT',
      location: 'Live Interactive Webinar (Zoom)',
      desc: 'Technical demonstration for IT directors and Chief Information Security Officers (CISOs) on degaussing vs physical shredding and Kenya Data Protection Act compliance.',
      badge: 'Webinar'
    }
  ];

  const pastEvents = [
    { title: 'World Environment Day Clean-Up Drive 2024', loc: 'Uhuru Park & CBD, Nairobi', attendees: '1,200+ Participants', img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80' },
    { title: 'UNEP Regional E-Waste Policy Workshop', loc: 'UN Office at Nairobi (UNON)', attendees: '45 Country Delegates', img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80' },
    { title: 'Universities Green Tech & Recycling Hackathon', loc: 'University of Nairobi', attendees: '300+ Engineering Students', img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <main>
      {/* Page Header Banner */}
      <header className="bg-soft-green py-5 border-bottom">
        <div className="container py-3 text-center text-md-start">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none text-success">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Events</li>
            </ol>
          </nav>
          <h1 className="fw-bold text-dark-green mb-2">Events & Community Outreach</h1>
          <p className="text-muted max-w-2xl font-sm mb-0">
            Connect with environmental experts, participate in collection drives, and learn about sustainable IT asset disposal at our upcoming sessions.
          </p>
        </div>
      </header>

      {/* Upcoming Events Section */}
      <section className="py-5 my-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div>
              <span className="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Mark Your Calendar</span>
              <h2 className="section-title mb-0">Upcoming Events & Webinars</h2>
            </div>
            <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-outline-success rounded-pill px-4 py-2 font-sm d-none d-md-inline-block">Suggest an Event</button>
          </div>

          <div className="row g-4">
            {upcomingEvents.map((ev, idx) => (
              <div className="col-12" key={idx}>
                <div className="bg-white rounded-3 shadow-sm border p-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 transition-all hover-translate">
                  <div className="d-flex align-items-center gap-4">
                    <div className="bg-dark-green text-white rounded-3 p-3 text-center flex-shrink-0 shadow-sm" style={{ width: '80px' }}>
                      <span className="d-block fs-3 fw-bold lh-1 text-light-green">{ev.day}</span>
                      <span className="d-block font-xs fw-semibold tracking-wider">{ev.month}</span>
                    </div>
                    <div>
                      <span className="badge bg-soft-green text-dark-green border border-success border-opacity-25 font-xs px-3 py-1 rounded-pill mb-2">{ev.badge}</span>
                      <h3 className="fs-5 fw-bold text-dark-green mb-2">{ev.title}</h3>
                      <div className="d-flex flex-wrap gap-3 font-xs text-muted mb-2">
                        <span><i className="fa-solid fa-clock text-accent-green me-1"></i> {ev.time}</span>
                        <span><i className="fa-solid fa-location-dot text-accent-green me-1"></i> {ev.location}</span>
                      </div>
                      <p className="font-sm text-muted mb-0 max-w-2xl">{ev.desc}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-success rounded-pill px-4 py-2 font-sm fw-semibold shadow-sm w-100">
                      Register Now <i className="fa-solid fa-arrow-right ms-2"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Summary */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title section-title-center mb-3">Past Highlights</h2>
            <p className="text-muted max-w-2xl mx-auto font-sm">
              A glimpse into our successful community symposiums, school environmental clubs, and institutional training programs.
            </p>
          </div>

          <div className="row g-4">
            {pastEvents.map((pe, idx) => (
              <div className="col-12 col-md-4" key={idx}>
                <div className="project-card shadow-sm h-100">
                  <div className="project-img-wrapper" style={{ height: '180px' }}>
                    <img src={pe.img} alt={pe.title} loading="lazy" />
                  </div>
                  <div className="project-body p-3">
                    <span className="font-xs text-muted d-block mb-1"><i className="fa-solid fa-map-pin text-success me-1"></i> {pe.loc}</span>
                    <h4 className="fs-6 fw-bold text-dark-green mb-2">{pe.title}</h4>
                    <span className="badge bg-light text-dark font-xs"><i className="fa-solid fa-users me-1 text-success"></i> {pe.attendees}</span>
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
