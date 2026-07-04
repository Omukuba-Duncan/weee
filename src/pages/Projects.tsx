import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface ProjectsProps {
  setActivePage: (page: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ setActivePage }) => {
  const { projects: allProjects } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Collection Drives', 'Data Security', 'Community Training', 'Material Recovery'];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <main>
      {/* Page Header Banner */}
      <header className="bg-soft-green py-5 border-bottom">
        <div className="container py-3 text-center text-md-start">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
              <li className="breadcrumb-item"><a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none text-success">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Projects</li>
            </ol>
          </nav>
          <h1 className="fw-bold text-dark-green mb-2">Our Impactful Projects</h1>
          <p className="text-muted max-w-2xl font-sm mb-0">
            Discover how our nationwide initiatives are transforming environmental waste into green opportunities across Kenya and East Africa.
          </p>
        </div>
      </header>

      {/* Projects Grid Section */}
      <section className="py-5 my-3">
        <div className="container">
          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                className={`btn btn-sm rounded-pill px-4 py-2 font-sm ${filter === cat ? 'btn-dark-green' : 'btn-outline-secondary'}`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          <div className="row g-4">
            {filteredProjects.map((p) => (
              <div className="col-12 col-md-6 col-lg-4" key={p.id} id={p.id}>
                <div className="project-card shadow-sm h-100 d-flex flex-column">
                  <div className="project-img-wrapper">
                    <span className="project-badge shadow-sm">{p.badge}</span>
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <div className="project-body d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <span className="font-xs text-accent-green fw-semibold d-block mb-1"><i className="fa-solid fa-calendar-days me-1"></i> {p.date}</span>
                      <h3 className="project-title fs-5">{p.title}</h3>
                      <p className="project-desc font-sm mb-3">{p.desc}</p>
                    </div>
                    <div className="pt-3 border-top border-light mt-2">
                      <span className="font-xs fw-bold text-dark-green d-block mb-2">
                        <i className="fa-solid fa-chart-line text-success me-1"></i> {p.metrics}
                      </span>
                      <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-outline-success btn-sm w-100 rounded-pill font-xs fw-bold">
                        Partner in This Initiative <i className="fa-solid fa-arrow-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-5 bg-dark-green text-white text-center my-4">
        <div className="container py-3">
          <h3 className="text-white fw-bold mb-3">Want to Sponsor a Collection Drive in Your Community?</h3>
          <p className="text-light max-w-2xl mx-auto font-sm mb-4">
            We partner with corporate CSR teams, NGOs, and municipal councils to launch high-impact environmental cleanup drives.
          </p>
          <button onClick={() => { setActivePage('contact'); window.scrollTo({top:0, behavior:'smooth'}); }} className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow">
            Propose a Project <i className="fa-solid fa-handshake ms-2"></i>
          </button>
        </div>
      </section>
    </main>
  );
};
