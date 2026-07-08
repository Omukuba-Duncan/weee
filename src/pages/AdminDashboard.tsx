import React, { useState } from 'react';
import { useApp, ServiceItem, ProjectItem } from '../context/AppContext';

interface AdminDashboardProps {
  setActivePage: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setActivePage }) => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    services,
    addService,
    updateService,
    deleteService,
    projects,
    addProject,
    updateProject,
    deleteProject,
    partners,
    addPartner,
    deletePartner,
    staffMembers,
    addStaff,
    updateStaff,
    deleteStaff,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    emailThreads,
    emailMessages,
    sendEmailMessage,
    activeEmailThreadId,
    setActiveEmailThreadId
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'services' | 'projects' | 'partners' | 'staff' | 'inquiries' | 'emails' | 'xampp'>('stats');

  // Form state for adding/editing services
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    icon: 'fa-solid fa-recycle',
    badge: 'Logistics & Pickups',
    desc: '',
    bullets: 'Nationwide pickup coverage\nCertified disposal report\nZero landfill policy',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  });

  // Form state for adding/editing staff members
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: 'Environmental Engineer',
    department: 'Technical & ITAD',
    email: '',
    phone: '+254 700 000 000',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    status: 'Active' as 'Active' | 'On Leave' | 'Field Deployment'
  });

  // Form state for adding/editing projects
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    category: 'Collection Drives',
    badge: 'Collection Drive',
    title: '',
    date: 'Ongoing Initiative • 2026',
    desc: '',
    metrics: '2,500+ Tonnes Collected | 100% Zero Landfill',
    img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'
  });

  // Form state for adding partners
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    icon: 'fa-solid fa-handshake',
    label: ''
  });

  // Email reply state
  const [adminReplyText, setAdminReplyText] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
    } else {
      setLoginError('Please enter any valid password (e.g., admin123).');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <main className="bg-light py-5 min-vh-100 d-flex align-items-center justify-content-center">
        <div className="container max-w-md">
          <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <div className="bg-light-green text-primary-green rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <i className="fa-solid fa-user-shield fs-3"></i>
              </div>
              <h2 className="fw-bold text-dark-green mb-1">Admin Portal Login</h2>
              <p className="text-muted font-sm">
                Designed for non-programmers to manage WEEE Centre services, projects, partners, and live leads!
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label font-sm fw-semibold">Admin Password / Access Code</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><i className="fa-solid fa-key text-muted"></i></span>
                  <input
                    type="password"
                    className="form-control border-start-0 py-2 font-sm"
                    placeholder="Enter admin password (default: admin123)"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                  />
                </div>
                <div className="form-text font-xs text-success mt-2">
                  <i className="fa-solid fa-circle-info me-1"></i> Tip: You can type any password like <strong>admin123</strong> to login instantly!
                </div>
              </div>

              {loginError && <div className="alert alert-warning py-2 font-xs mb-3">{loginError}</div>}

              <button type="submit" className="btn btn-dark-green w-100 rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center">
                <i className="fa-solid fa-right-to-bracket me-2"></i> Access Dashboard
              </button>
            </form>

            <div className="text-center mt-4 pt-3 border-top">
              <a href="#" onClick={(e) => { e.preventDefault(); setActivePage('index'); }} className="text-decoration-none font-xs text-muted">
                <i className="fa-solid fa-arrow-left me-1"></i> Return to Main Website
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Handle Service Submit
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const bulletsList = serviceForm.bullets.split('\n').filter(b => b.trim() !== '');
    if (editingServiceId) {
      updateService(editingServiceId, {
        title: serviceForm.title,
        icon: serviceForm.icon,
        badge: serviceForm.badge,
        desc: serviceForm.desc,
        bullets: bulletsList,
        img: serviceForm.img
      });
      setEditingServiceId(null);
    } else {
      addService({
        title: serviceForm.title,
        icon: serviceForm.icon,
        badge: serviceForm.badge,
        desc: serviceForm.desc,
        bullets: bulletsList,
        img: serviceForm.img
      });
    }
    setServiceForm({
      title: '',
      icon: 'fa-solid fa-recycle',
      badge: 'Logistics & Pickups',
      desc: '',
      bullets: 'Nationwide pickup coverage\nCertified disposal report\nZero landfill policy',
      img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
    });
  };

  const startEditService = (s: ServiceItem) => {
    setEditingServiceId(s.id);
    setServiceForm({
      title: s.title,
      icon: s.icon,
      badge: s.badge,
      desc: s.desc,
      bullets: s.bullets.join('\n'),
      img: s.img
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Project Submit
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProjectId) {
      updateProject(editingProjectId, {
        category: projectForm.category,
        badge: projectForm.badge,
        title: projectForm.title,
        date: projectForm.date,
        desc: projectForm.desc,
        metrics: projectForm.metrics,
        img: projectForm.img
      });
      setEditingProjectId(null);
    } else {
      addProject({
        category: projectForm.category,
        badge: projectForm.badge,
        title: projectForm.title,
        date: projectForm.date,
        desc: projectForm.desc,
        metrics: projectForm.metrics,
        img: projectForm.img
      });
    }
    setProjectForm({
      category: 'Collection Drives',
      badge: 'Collection Drive',
      title: '',
      date: 'Ongoing Initiative • 2026',
      desc: '',
      metrics: '2,500+ Tonnes Collected | 100% Zero Landfill',
      img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'
    });
  };

  const startEditProject = (p: ProjectItem) => {
    setEditingProjectId(p.id);
    setProjectForm({
      category: p.category,
      badge: p.badge,
      title: p.title,
      date: p.date,
      desc: p.desc,
      metrics: p.metrics,
      img: p.img
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle Partner Submit
  const handleAddPartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name || !partnerForm.label) return;
    addPartner(partnerForm);
    setPartnerForm({
      name: '',
      icon: 'fa-solid fa-handshake',
      label: ''
    });
  };

  // Handle Staff Submit
  const handleSaveStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffForm.name || !staffForm.role) return;
    if (editingStaffId) {
      updateStaff(editingStaffId, staffForm);
      setEditingStaffId(null);
    } else {
      addStaff(staffForm);
    }
    setStaffForm({
      name: '',
      role: 'Environmental Engineer',
      department: 'Technical & ITAD',
      email: '',
      phone: '+254 700 000 000',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      status: 'Active'
    });
  };

  const startEditStaff = (s: any) => {
    setEditingStaffId(s.id);
    setStaffForm({
      name: s.name,
      role: s.role,
      department: s.department,
      email: s.email,
      phone: s.phone,
      photo: s.photo,
      status: s.status
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Handle sending email reply
  const handleSendAdminReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEmailThreadId || !adminReplyText.trim()) return;
    sendEmailMessage(activeEmailThreadId, 'admin', 'WEEE Centre Admin Support', adminReplyText);
    setAdminReplyText('');
  };

  const currentThread = emailThreads.find(t => t.id === activeEmailThreadId);
  const currentThreadMessages = emailMessages.filter(m => m.threadId === activeEmailThreadId);

  const downloadXamppSql = () => {
    const sqlText = `-- WEEE Centre MySQL Database Schema for XAMPP / Apache / phpMyAdmin
-- Generated automatically from live React Admin state!

CREATE DATABASE IF NOT EXISTS \`weeecentre_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`weeecentre_db\`;

-- 1. Table structure for table \`services\`
DROP TABLE IF EXISTS \`services\`;
CREATE TABLE \`services\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`icon\` VARCHAR(100) NOT NULL,
  \`badge\` VARCHAR(100) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table \`services\`
${services.map(s => `INSERT INTO \`services\` (\`id\`, \`title\`, \`icon\`, \`badge\`, \`description\`, \`image_url\`) VALUES ('${s.id}', '${s.title.replace(/'/g, "\\'")}', '${s.icon}', '${s.badge}', '${s.desc.replace(/'/g, "\\'")}', '${s.img}');`).join('\n')}

-- 2. Table structure for table \`projects\`
DROP TABLE IF EXISTS \`projects\`;
CREATE TABLE \`projects\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`category\` VARCHAR(100) NOT NULL,
  \`badge\` VARCHAR(100) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`date_str\` VARCHAR(100) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`metrics\` VARCHAR(255) NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table \`projects\`
${projects.map(p => `INSERT INTO \`projects\` (\`id\`, \`category\`, \`badge\`, \`title\`, \`date_str\`, \`description\`, \`metrics\`, \`image_url\`) VALUES ('${p.id}', '${p.category}', '${p.badge}', '${p.title.replace(/'/g, "\\'")}', '${p.date}', '${p.desc.replace(/'/g, "\\'")}', '${p.metrics.replace(/'/g, "\\'")}', '${p.img}');`).join('\n')}

-- 3. Table structure for table \`partners\`
DROP TABLE IF EXISTS \`partners\`;
CREATE TABLE \`partners\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`icon\` VARCHAR(100) NOT NULL,
  \`label\` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table \`partners\`
${partners.map(p => `INSERT INTO \`partners\` (\`id\`, \`name\`, \`icon\`, \`label\`) VALUES ('${p.id}', '${p.name.replace(/'/g, "\\'")}', '${p.icon}', '${p.label.replace(/'/g, "\\'")}');`).join('\n')}

-- 4. Table structure for table \`inquiries\`
DROP TABLE IF EXISTS \`inquiries\`;
CREATE TABLE \`inquiries\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`ticket_no\` VARCHAR(50) NOT NULL,
  \`type\` VARCHAR(50) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(100) NOT NULL,
  \`subject\` VARCHAR(255) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`status\` VARCHAR(50) DEFAULT 'New',
  \`created_date\` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table \`inquiries\`
${inquiries.map(i => `INSERT INTO \`inquiries\` (\`id\`, \`ticket_no\`, \`type\`, \`name\`, \`email\`, \`phone\`, \`subject\`, \`message\`, \`status\`, \`created_date\`) VALUES ('${i.id}', '${i.ticketNo}', '${i.type}', '${i.name.replace(/'/g, "\\'")}', '${i.email}', '${i.phone}', '${i.subject.replace(/'/g, "\\'")}', '${i.message.replace(/'/g, "\\'")}', '${i.status}', '${i.date}');`).join('\n')}

-- End of SQL dump. Import this file directly into XAMPP phpMyAdmin!
`;

    const blob = new Blob([sqlText], { type: 'text/sql' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weeecentre_database_xampp.sql';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="bg-light min-vh-100 pb-5">
      {/* Top Banner */}
      <div className="bg-dark-green text-white py-4 shadow-sm">
        <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white text-success rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <i className="fa-solid fa-user-gear fs-4"></i>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <h1 className="h4 fw-bold mb-0 text-white">WEEE Centre Admin Portal</h1>
                <span className="badge bg-success text-white font-xs rounded-pill">Non-Programmer UI</span>
              </div>
              <p className="font-xs text-light-green mb-0">No coding required! Edit services, projects, partners, and reply to client emails in real-time.</p>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button onClick={() => setActivePage('index')} className="btn btn-outline-light btn-sm rounded-pill px-3 font-xs d-flex align-items-center">
              <i className="fa-solid fa-globe me-1"></i> View Live Site
            </button>
            <button onClick={logoutAdmin} className="btn btn-danger btn-sm rounded-pill px-3 font-xs d-flex align-items-center">
              <i className="fa-solid fa-right-from-bracket me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        {/* Navigation Tabs */}
        <div className="card border-0 rounded-4 shadow-sm mb-4 bg-white overflow-hidden">
          <div className="card-header bg-white p-2 border-bottom-0">
            <ul className="nav nav-pills nav-fill font-sm fw-semibold flex-column flex-md-row gap-1">
              <li className="nav-item">
                <button onClick={() => setActiveTab('stats')} className={`nav-link rounded-pill py-2 ${activeTab === 'stats' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-chart-pie me-2"></i> Overview ({inquiries.length} Leads)
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('services')} className={`nav-link rounded-pill py-2 ${activeTab === 'services' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-truck-fast me-2"></i> Services ({services.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('projects')} className={`nav-link rounded-pill py-2 ${activeTab === 'projects' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-layer-group me-2"></i> Featured Projects ({projects.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('partners')} className={`nav-link rounded-pill py-2 ${activeTab === 'partners' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-handshake me-2"></i> Partners ({partners.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('staff')} className={`nav-link rounded-pill py-2 ${activeTab === 'staff' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-users me-2"></i> Staff & Team ({staffMembers.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('inquiries')} className={`nav-link rounded-pill py-2 ${activeTab === 'inquiries' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-inbox me-2"></i> Disposal Leads ({inquiries.length})
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('emails')} className={`nav-link rounded-pill py-2 position-relative ${activeTab === 'emails' ? 'active bg-success text-white' : 'text-dark-green'}`}>
                  <i className="fa-solid fa-envelope me-2"></i> Email Conversations
                  {emailThreads.some(t => t.unreadCount > 0) && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                  )}
                </button>
              </li>
              <li className="nav-item">
                <button onClick={() => setActiveTab('xampp')} className={`nav-link rounded-pill py-2 ${activeTab === 'xampp' ? 'active bg-dark text-warning fw-bold' : 'text-muted'}`}>
                  <i className="fa-solid fa-database me-2"></i> XAMPP SQL Export
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'stats' && (
          <div>
            <div className="row g-4 mb-4">
              <div className="col-12 col-md-3">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-success border-4 h-100">
                  <span className="font-xs text-muted text-uppercase fw-bold">Total Services</span>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h3 className="fw-bold fs-2 text-dark-green mb-0">{services.length}</h3>
                    <div className="bg-soft-green text-success p-3 rounded-circle"><i className="fa-solid fa-truck-fast fs-4"></i></div>
                  </div>
                  <button onClick={() => setActiveTab('services')} className="btn btn-link btn-sm text-success text-decoration-none px-0 mt-3 font-xs">Manage Services →</button>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-primary border-4 h-100">
                  <span className="font-xs text-muted text-uppercase fw-bold">Featured Projects</span>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h3 className="fw-bold fs-2 text-dark mb-0">{projects.length}</h3>
                    <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle"><i className="fa-solid fa-layer-group fs-4"></i></div>
                  </div>
                  <button onClick={() => setActiveTab('projects')} className="btn btn-link btn-sm text-primary text-decoration-none px-0 mt-3 font-xs">Manage Projects →</button>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-warning border-4 h-100">
                  <span className="font-xs text-muted text-uppercase fw-bold">Active Partners</span>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h3 className="fw-bold fs-2 text-dark mb-0">{partners.length}</h3>
                    <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-circle"><i className="fa-solid fa-handshake fs-4"></i></div>
                  </div>
                  <button onClick={() => setActiveTab('partners')} className="btn btn-link btn-sm text-warning text-decoration-none px-0 mt-3 font-xs">Manage Partners →</button>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-start border-danger border-4 h-100">
                  <span className="font-xs text-muted text-uppercase fw-bold">Incoming Inquiries</span>
                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <h3 className="fw-bold fs-2 text-dark mb-0">{inquiries.length}</h3>
                    <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle"><i className="fa-solid fa-bell fs-4"></i></div>
                  </div>
                  <button onClick={() => setActiveTab('inquiries')} className="btn btn-link btn-sm text-danger text-decoration-none px-0 mt-3 font-xs">View Disposal Leads →</button>
                </div>
              </div>
            </div>

            {/* Quick Non-Programmer Help Box */}
            <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="bg-soft-green text-success rounded-circle p-2 fs-4"><i className="fa-solid fa-lightbulb"></i></div>
                <div>
                  <h4 className="fs-5 fw-bold text-dark-green mb-0">How Non-Programmer Editing Works</h4>
                  <span className="font-xs text-muted">You do not need to edit HTML, PHP, or TypeScript code!</span>
                </div>
              </div>
              <div className="row g-3 font-sm">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <strong className="d-block text-dark-green mb-1">1. Add or Delete Anything</strong>
                    <p className="text-muted font-xs mb-0">Use the tabs above to add new Services, Projects, or Partners. When you save, the public website updates instantly!</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <strong className="d-block text-dark-green mb-1">2. Real-Time Chat & Emails</strong>
                    <p className="text-muted font-xs mb-0">In the "Email Conversations" tab, you can read messages from clients and reply directly like a normal email inbox.</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-3 h-100">
                    <strong className="d-block text-dark-green mb-1">3. XAMPP SQL Readiness</strong>
                    <p className="text-muted font-xs mb-0">Click the XAMPP SQL Export tab anytime to download a `.sql` file ready to import into phpMyAdmin for local server deployment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES MANAGER */}
        {activeTab === 'services' && (
          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white sticky-top" style={{ top: '90px' }}>
                <h3 className="fs-5 fw-bold text-dark-green mb-3 border-bottom pb-2">
                  {editingServiceId ? '✏️ Edit Existing Service' : '➕ Add New Service'}
                </h3>
                <form onSubmit={handleSaveService}>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Service Title *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. Solar Battery & E-Scrap Recycling"
                      value={serviceForm.title}
                      onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Badge Label</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 font-sm"
                        placeholder="e.g. Renewable Waste"
                        value={serviceForm.badge}
                        onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">FontAwesome Icon Class</label>
                      <select
                        className="form-select rounded-3 py-2 font-sm"
                        value={serviceForm.icon}
                        onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                      >
                        <option value="fa-solid fa-recycle">♻️ Recycle (fa-recycle)</option>
                        <option value="fa-solid fa-truck-fast">🚚 Truck (fa-truck-fast)</option>
                        <option value="fa-solid fa-lock">🔒 Security Lock (fa-lock)</option>
                        <option value="fa-solid fa-graduation-cap">🎓 Graduation Cap (fa-graduation-cap)</option>
                        <option value="fa-solid fa-file-shield">🛡️ Shield File (fa-file-shield)</option>
                        <option value="fa-solid fa-solar-panel">☀️ Solar Panel (fa-solar-panel)</option>
                        <option value="fa-solid fa-microchip">💻 Microchip (fa-microchip)</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Image URL (Unsplash or web link)</label>
                    <input
                      type="url"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="https://images.unsplash.com/..."
                      value={serviceForm.img}
                      onChange={(e) => setServiceForm({ ...serviceForm, img: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Description *</label>
                    <textarea
                      required
                      rows={3}
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="Describe what this service entails for corporate clients..."
                      value={serviceForm.desc}
                      onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label font-xs fw-bold text-muted">Key Highlights (1 bullet per line)</label>
                    <textarea
                      rows={3}
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="Nationwide collection&#10;Certified NEMA certificate&#10;Military data destruction"
                      value={serviceForm.bullets}
                      onChange={(e) => setServiceForm({ ...serviceForm, bullets: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="d-flex gap-2">
                    {editingServiceId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingServiceId(null);
                          setServiceForm({
                            title: '',
                            icon: 'fa-solid fa-recycle',
                            badge: 'Logistics & Pickups',
                            desc: '',
                            bullets: 'Nationwide pickup coverage\nCertified disposal report\nZero landfill policy',
                            img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
                          });
                        }}
                        className="btn btn-outline-secondary rounded-pill font-sm px-3"
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="btn btn-success rounded-pill px-4 py-2 font-sm fw-bold shadow-sm flex-grow-1">
                      {editingServiceId ? 'Update Service' : 'Add Service to Website'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <h3 className="fs-5 fw-bold text-dark-green mb-3">Live Website Services List ({services.length})</h3>
              <div className="row g-3">
                {services.map((svc) => (
                  <div className="col-12" key={svc.id}>
                    <div className="card border-0 rounded-3 shadow-sm p-3 bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-soft-green text-success rounded-circle p-3 fs-4 flex-shrink-0">
                          <i className={svc.icon}></i>
                        </div>
                        <div>
                          <span className="badge bg-light text-dark font-xs mb-1">{svc.badge}</span>
                          <h4 className="fs-6 fw-bold text-dark-green mb-1">{svc.title}</h4>
                          <p className="font-xs text-muted mb-0 line-clamp-2">{svc.desc}</p>
                        </div>
                      </div>
                      <div className="d-flex gap-2 flex-shrink-0">
                        <button onClick={() => startEditService(svc)} className="btn btn-sm btn-outline-primary rounded-pill px-3 font-xs">
                          <i className="fa-solid fa-pen me-1"></i> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${svc.title}"?`)) {
                              deleteService(svc.id);
                            }
                          }}
                          className="btn btn-sm btn-outline-danger rounded-pill px-3 font-xs"
                        >
                          <i className="fa-solid fa-trash me-1"></i> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROJECTS MANAGER */}
        {activeTab === 'projects' && (
          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white sticky-top" style={{ top: '90px' }}>
                <h3 className="fs-5 fw-bold text-dark-green mb-3 border-bottom pb-2">
                  {editingProjectId ? '✏️ Edit Featured Project' : '➕ Add New Featured Project'}
                </h3>
                <form onSubmit={handleSaveProject}>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Project Title *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. Mombasa Port E-Waste Take-Back Drive"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Filter Category</label>
                      <select
                        className="form-select rounded-3 py-2 font-sm"
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      >
                        <option value="Collection Drives">Collection Drives</option>
                        <option value="Data Security">Data Security</option>
                        <option value="Community Training">Community Training</option>
                        <option value="Material Recovery">Material Recovery</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Badge Label</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 font-sm"
                        placeholder="e.g. Collection Drive"
                        value={projectForm.badge}
                        onChange={(e) => setProjectForm({ ...projectForm, badge: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Date / Timeline</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 font-sm"
                        placeholder="e.g. Completed • 2026"
                        value={projectForm.date}
                        onChange={(e) => setProjectForm({ ...projectForm, date: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Key Metrics / Impact</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 font-sm"
                        placeholder="e.g. 1,500 Tonnes | 10,000 People"
                        value={projectForm.metrics}
                        onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Image URL</label>
                    <input
                      type="url"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="https://images.unsplash.com/..."
                      value={projectForm.img}
                      onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label font-xs fw-bold text-muted">Project Description *</label>
                    <textarea
                      required
                      rows={3}
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="Detail the scope and environmental success of this project..."
                      value={projectForm.desc}
                      onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="d-flex gap-2">
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(null);
                          setProjectForm({
                            category: 'Collection Drives',
                            badge: 'Collection Drive',
                            title: '',
                            date: 'Ongoing Initiative • 2026',
                            desc: '',
                            metrics: '2,500+ Tonnes Collected | 100% Zero Landfill',
                            img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'
                          });
                        }}
                        className="btn btn-outline-secondary rounded-pill font-sm px-3"
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="btn btn-success rounded-pill px-4 py-2 font-sm fw-bold shadow-sm flex-grow-1">
                      {editingProjectId ? 'Update Project' : 'Add Project to Website'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <h3 className="fs-5 fw-bold text-dark-green mb-3">Featured Projects ({projects.length})</h3>
              <div className="row g-3">
                {projects.map((proj) => (
                  <div className="col-12 col-md-6" key={proj.id}>
                    <div className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden bg-white d-flex flex-column">
                      <div className="position-relative" style={{ height: '140px' }}>
                        <img src={proj.img} alt={proj.title} className="w-100 h-100 object-fit-cover" />
                        <span className="position-absolute top-0 end-0 m-2 badge bg-success text-white font-xs">{proj.badge}</span>
                      </div>
                      <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                        <div>
                          <span className="font-xs text-muted d-block">{proj.category} • {proj.date}</span>
                          <h4 className="fs-6 fw-bold text-dark-green mt-1 mb-2">{proj.title}</h4>
                          <p className="font-xs text-muted line-clamp-2 mb-2">{proj.desc}</p>
                          <span className="badge bg-soft-green text-dark-green font-xs d-block mb-3 text-truncate">{proj.metrics}</span>
                        </div>
                        <div className="d-flex gap-2 pt-2 border-top">
                          <button onClick={() => startEditProject(proj)} className="btn btn-sm btn-outline-primary rounded-pill px-3 font-xs flex-grow-1">
                            <i className="fa-solid fa-pen me-1"></i> Edit
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="btn btn-sm btn-outline-danger rounded-pill px-3 font-xs"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PARTNERS MANAGER */}
        {activeTab === 'partners' && (
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                <h3 className="fs-5 fw-bold text-dark-green mb-3 border-bottom pb-2">➕ Add New Partner / Sponsor</h3>
                <form onSubmit={handleAddPartner}>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Organization Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. World Bank Group / USAID"
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Short Display Label *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. World Bank Partner"
                      value={partnerForm.label}
                      onChange={(e) => setPartnerForm({ ...partnerForm, label: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label font-xs fw-bold text-muted">Partner Icon</label>
                    <select
                      className="form-select rounded-3 py-2 font-sm"
                      value={partnerForm.icon}
                      onChange={(e) => setPartnerForm({ ...partnerForm, icon: e.target.value })}
                    >
                      <option value="fa-solid fa-handshake">🤝 Handshake (fa-handshake)</option>
                      <option value="fa-solid fa-globe">🌍 Globe / UN (fa-globe)</option>
                      <option value="fa-solid fa-stamp">📜 Certified Stamp (fa-stamp)</option>
                      <option value="fa-solid fa-shield-halved">🛡️ Shield NEMA (fa-shield-halved)</option>
                      <option value="fa-solid fa-signal">📶 Telecom Signal (fa-signal)</option>
                      <option value="fa-solid fa-bolt">⚡ Energy Bolt (fa-bolt)</option>
                      <option value="fa-solid fa-building-ngo">🏛️ NGO Building (fa-building-ngo)</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success rounded-pill w-100 py-2 font-sm fw-bold shadow-sm">
                    Add Partner Logo
                  </button>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <h3 className="fs-5 fw-bold text-dark-green mb-3">Partner Organizations ({partners.length})</h3>
              <div className="row g-3">
                {partners.map((ptr) => (
                  <div className="col-12 col-sm-6" key={ptr.id}>
                    <div className="card border-0 rounded-3 shadow-sm p-3 bg-white d-flex flex-row align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-soft-green text-success rounded p-2 fs-4">
                          <i className={ptr.icon}></i>
                        </div>
                        <div>
                          <strong className="d-block text-dark-green font-sm">{ptr.label}</strong>
                          <span className="font-xs text-muted">{ptr.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Remove partner "${ptr.name}"?`)) {
                            deletePartner(ptr.id);
                          }
                        }}
                        className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: '36px', height: '36px' }}
                        title="Delete partner"
                      >
                        <i className="fa-solid fa-trash font-xs"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: STAFF & TEAM MEMBERS */}
        {activeTab === 'staff' && (
          <div className="row g-4">
            <div className="col-12 col-lg-4">
              <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
                <h3 className="fs-5 fw-bold text-dark-green mb-3 border-bottom pb-2">
                  {editingStaffId ? '✏️ Edit Staff Member' : '➕ Add New Staff Member'}
                </h3>
                <form onSubmit={handleSaveStaff}>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. Eng. Peter Mwau"
                      value={staffForm.name}
                      onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Role / Title *</label>
                    <input
                      type="text"
                      required
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. Senior Dismantling Technician"
                      value={staffForm.role}
                      onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                    />
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Department</label>
                      <input
                        type="text"
                        className="form-control rounded-3 py-2 font-sm"
                        value={staffForm.department}
                        onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label font-xs fw-bold text-muted">Status</label>
                      <select
                        className="form-select rounded-3 py-2 font-sm"
                        value={staffForm.status}
                        onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value as any })}
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Field Deployment">Field Deployment</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Email Address</label>
                    <input
                      type="email"
                      className="form-control rounded-3 py-2 font-sm"
                      placeholder="e.g. p.mwau@weeecentre.com"
                      value={staffForm.email}
                      onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label font-xs fw-bold text-muted">Phone Number</label>
                    <input
                      type="text"
                      className="form-control rounded-3 py-2 font-sm"
                      value={staffForm.phone}
                      onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label font-xs fw-bold text-muted">Photo URL</label>
                    <input
                      type="url"
                      className="form-control rounded-3 py-2 font-sm"
                      value={staffForm.photo}
                      onChange={(e) => setStaffForm({ ...staffForm, photo: e.target.value })}
                    />
                  </div>
                  <div className="d-flex gap-2">
                    {editingStaffId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingStaffId(null);
                          setStaffForm({
                            name: '',
                            role: 'Environmental Engineer',
                            department: 'Technical & ITAD',
                            email: '',
                            phone: '+254 700 000 000',
                            photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
                            status: 'Active'
                          });
                        }}
                        className="btn btn-outline-secondary rounded-pill font-sm px-3"
                      >
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="btn btn-success rounded-pill px-4 py-2 font-sm fw-bold shadow-sm flex-grow-1">
                      {editingStaffId ? 'Update Staff Member' : 'Add Staff Member'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <h3 className="fs-5 fw-bold text-dark-green mb-3">Staff & Team Roster ({staffMembers.length})</h3>
              <div className="row g-3">
                {staffMembers.map((st) => (
                  <div className="col-12" key={st.id}>
                    <div className="card border-0 rounded-3 shadow-sm p-3 bg-white d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
                      <div className="d-flex align-items-center gap-3">
                        <img src={st.photo} alt={st.name} className="rounded-circle shadow-sm" style={{ width: '56px', height: '56px', objectFit: 'cover' }} />
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <strong className="text-dark-green fs-6">{st.name}</strong>
                            <span className={`badge rounded-pill font-xs ${
                              st.status === 'Active' ? 'bg-success-subtle text-success border border-success-subtle' :
                              st.status === 'Field Deployment' ? 'bg-warning-subtle text-dark border border-warning-subtle' : 'bg-secondary-subtle text-secondary'
                            }`}>{st.status}</span>
                          </div>
                          <div className="font-xs text-muted fw-semibold">{st.role} • <span className="text-success">{st.department}</span></div>
                          <div className="font-xs text-muted mt-1">
                            <span className="me-3"><i className="fa-solid fa-envelope me-1 text-success"></i>{st.email}</span>
                            <span><i className="fa-solid fa-phone me-1 text-success"></i>{st.phone}</span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2 align-self-end align-self-md-center">
                        <button
                          onClick={() => startEditStaff(st)}
                          className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 font-xs d-flex align-items-center"
                        >
                          <i className="fa-solid fa-pen me-1"></i> Edit
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete staff member "${st.name}"?`)) {
                              deleteStaff(st.id);
                            }
                          }}
                          className="btn btn-sm btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                          style={{ width: '36px', height: '36px' }}
                          title="Delete staff"
                        >
                          <i className="fa-solid fa-trash font-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES & DISPOSAL LEADS */}
        {activeTab === 'inquiries' && (
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
            <div className="card-header bg-white p-4 border-bottom d-flex align-items-center justify-content-between">
              <div>
                <h3 className="fs-5 fw-bold text-dark-green mb-1">Incoming Disposal Requests & Leads ({inquiries.length})</h3>
                <span className="font-xs text-muted">All submissions from the homepage "Dispose Now" modal and contact forms arrive here.</span>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 font-sm">
                <thead className="bg-light text-muted font-xs text-uppercase">
                  <tr>
                    <th className="py-3 px-4">Ticket</th>
                    <th>Client / Contact</th>
                    <th>Service Subject</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th className="text-end px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-5 text-muted">No disposal requests yet. When clients submit forms, they will appear here!</td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td className="px-4"><span className="badge bg-soft-green text-dark-green font-monospace font-xs">{inq.ticketNo}</span></td>
                        <td>
                          <strong className="d-block text-dark">{inq.name}</strong>
                          <span className="font-xs text-muted">{inq.email} | {inq.phone}</span>
                        </td>
                        <td>
                          <span className="d-block fw-semibold text-truncate" style={{ maxWidth: '240px' }}>{inq.subject}</span>
                          <span className="font-xs text-muted d-block text-truncate" style={{ maxWidth: '240px' }}>{inq.message}</span>
                        </td>
                        <td><span className="badge bg-light text-dark font-xs">{inq.location}</span></td>
                        <td>
                          <select
                            className={`form-select form-select-sm rounded-pill font-xs fw-bold ${
                              inq.status === 'New' ? 'bg-danger text-white' :
                              inq.status === 'In Progress' ? 'bg-warning text-dark' :
                              'bg-success text-white'
                            }`}
                            value={inq.status}
                            onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                            style={{ width: '130px' }}
                          >
                            <option value="New">🔴 New Lead</option>
                            <option value="In Progress">🟡 In Progress</option>
                            <option value="Resolved">🟢 Resolved</option>
                            <option value="Archived">⚪ Archived</option>
                          </select>
                        </td>
                        <td className="font-xs text-muted">{inq.date}</td>
                        <td className="text-end px-4">
                          <button
                            onClick={() => {
                              setActiveTab('emails');
                              // Find matching thread or alert
                              const thread = emailThreads.find(t => t.clientEmail === inq.email);
                              if (thread) setActiveEmailThreadId(thread.id);
                            }}
                            className="btn btn-sm btn-outline-success rounded-pill px-3 font-xs me-2"
                            title="Open Email Thread"
                          >
                            <i className="fa-solid fa-envelope me-1"></i> Email
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete inquiry ticket ${inq.ticketNo}?`)) {
                                deleteInquiry(inq.id);
                              }
                            }}
                            className="btn btn-sm btn-outline-danger rounded-circle p-1"
                            style={{ width: '28px', height: '28px' }}
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash font-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: WORKING EMAIL CONVERSATIONS */}
        {activeTab === 'emails' && (
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
            <div className="card-header bg-white p-4 border-bottom">
              <h3 className="fs-5 fw-bold text-dark-green mb-1">💬 Working Email Conversation Engine</h3>
              <p className="font-xs text-muted mb-0">Reply to clients in real-time. In the downloadable PHP ZIP for XAMPP, this is powered by PHPMailer / MySQL!</p>
            </div>
            <div className="row g-0" style={{ minHeight: '520px' }}>
              {/* Left Column: Thread List */}
              <div className="col-12 col-md-4 border-end bg-light">
                <div className="p-3 border-bottom bg-white fw-bold font-sm text-dark-green d-flex justify-content-between align-items-center">
                  <span>Client Inbox Threads</span>
                  <span className="badge bg-success text-white rounded-pill">{emailThreads.length}</span>
                </div>
                <div className="list-group list-group-flush">
                  {emailThreads.map((thread) => (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => setActiveEmailThreadId(thread.id)}
                      className={`list-group-item list-group-item-action p-3 text-start transition-all border-bottom ${activeEmailThreadId === thread.id ? 'bg-soft-green border-start border-success border-4' : 'bg-white'}`}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong className="font-sm text-truncate text-dark-green" style={{ maxWidth: '160px' }}>{thread.clientName}</strong>
                        <span className="font-xs text-muted">{thread.lastUpdated}</span>
                      </div>
                      <div className="font-xs text-dark fw-semibold text-truncate mb-1">{thread.subject}</div>
                      <div className="font-xs text-muted text-truncate">{thread.clientEmail}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Conversation */}
              <div className="col-12 col-md-8 d-flex flex-column bg-white">
                {currentThread ? (
                  <>
                    <div className="p-3 border-bottom bg-light bg-opacity-50 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fs-6 fw-bold text-dark-green mb-0">{currentThread.subject}</h4>
                        <span className="font-xs text-muted">Client: <strong>{currentThread.clientName}</strong> ({currentThread.clientEmail})</span>
                      </div>
                      <span className="badge bg-success font-xs">Live Email Thread</span>
                    </div>

                    {/* Messages Scroll Box */}
                    <div className="p-4 flex-grow-1 overflow-auto d-flex flex-column gap-3" style={{ maxHeight: '380px' }}>
                      {currentThreadMessages.map((msg) => {
                        const isAdmin = msg.sender === 'admin';
                        return (
                          <div key={msg.id} className={`d-flex flex-column ${isAdmin ? 'align-items-end' : 'align-items-start'}`}>
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <span className="font-xs fw-bold text-dark">{msg.senderName}</span>
                              <span className="font-xs text-muted">{msg.timestamp}</span>
                            </div>
                            <div className={`p-3 rounded-4 font-sm max-w-lg ${isAdmin ? 'bg-dark-green text-white rounded-br-0 shadow-sm' : 'bg-light text-dark rounded-bl-0 border'}`} style={{ maxWidth: '80%', whiteSpace: 'pre-wrap' }}>
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reply Input Box */}
                    <form onSubmit={handleSendAdminReply} className="p-3 border-top bg-light">
                      <div className="input-group">
                        <textarea
                          rows={2}
                          className="form-control rounded-3 font-sm border me-2"
                          placeholder={`Reply via email to ${currentThread.clientName}...`}
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          required
                        ></textarea>
                        <button type="submit" className="btn btn-success rounded-3 px-4 font-sm fw-bold shadow-sm d-flex align-items-center">
                          <i className="fa-solid fa-paper-plane me-2"></i> Send Reply
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted font-sm p-5">
                    Select an email thread from the left to start communicating.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: XAMPP SQL DATABASE GUIDE & EXPORT */}
        {activeTab === 'xampp' && (
          <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-3 fs-3">
                  <i className="fa-solid fa-database"></i>
                </div>
                <div>
                  <h3 className="fs-4 fw-bold text-dark-green mb-1">XAMPP MySQL Database Integration</h3>
                  <span className="font-sm text-muted">Run this entire website and admin backend locally on Apache + MySQL using XAMPP!</span>
                </div>
              </div>
              <button onClick={downloadXamppSql} className="btn btn-warning fw-bold rounded-pill px-4 py-2 shadow-sm d-flex align-items-center">
                <i className="fa-solid fa-download me-2"></i> Download database.sql (MySQL)
              </button>
            </div>

            <div className="row g-4">
              <div className="col-12 col-md-6">
                <h4 className="fs-6 fw-bold text-dark-green mb-3"><i className="fa-solid fa-circle-1 text-success me-2"></i>Step-by-Step XAMPP Setup Guide</h4>
                <ol className="list-group list-group-numbered font-sm gap-2">
                  <li className="list-group-item rounded-3 border">
                    <strong>Start XAMPP Control Panel:</strong> Start both the <code>Apache</code> and <code>MySQL</code> modules.
                  </li>
                  <li className="list-group-item rounded-3 border">
                    <strong>Open phpMyAdmin:</strong> In your browser, go to <a href="http://localhost/phpmyadmin" target="_blank" rel="noreferrer">http://localhost/phpmyadmin</a>.
                  </li>
                  <li className="list-group-item rounded-3 border">
                    <strong>Create Database:</strong> Click "New", name the database exactly <code>weeecentre_db</code>, and click Create.
                  </li>
                  <li className="list-group-item rounded-3 border">
                    <strong>Import SQL Script:</strong> Click "Import", choose the downloaded <code>weeecentre_database_xampp.sql</code> file, and click Go! All tables and live content will be created.
                  </li>
                  <li className="list-group-item rounded-3 border">
                    <strong>Copy PHP Files:</strong> Unzip the template files into your XAMPP folder at <code>C:\xampp\htdocs\weeecentre</code> and visit <a href="http://localhost/weeecentre" target="_blank" rel="noreferrer">http://localhost/weeecentre</a>!
                  </li>
                </ol>
              </div>

              <div className="col-12 col-md-6">
                <h4 className="fs-6 fw-bold text-dark-green mb-3"><i className="fa-solid fa-code text-success me-2"></i>includes/db.php Connection Script</h4>
                <div className="bg-dark text-light p-3 rounded-3 font-monospace font-xs overflow-auto" style={{ maxHeight: '280px' }}>
                  {`<?php
/**
 * WEEE Centre Database Connection for XAMPP
 * File: includes/db.php
 */
\$host = 'localhost';
\$db   = 'weeecentre_db';
\$user = 'root'; // Default XAMPP MySQL user
\$pass = '';     // Default XAMPP MySQL password is blank
\$charset = 'utf8mb4';

\$dsn = "mysql:host=\$host;dbname=\$db;charset=\$charset";
\$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    \$pdo = new PDO(\$dsn, \$user, \$pass, \$options);
} catch (PDOException \$e) {
    die("XAMPP MySQL Connection Failed: " . \$e->getMessage());
}
?>`}
                </div>
                <div className="mt-3 p-3 bg-soft-green rounded-3 border border-success border-opacity-25 font-xs text-muted">
                  <strong className="text-dark-green d-block mb-1"><i className="fa-solid fa-check-double text-success me-1"></i> Complete PHP 8 Admin Package Included!</strong>
                  When you download the PHP ZIP from our bottom-right floating badge, it includes this SQL file, PDO script, and the admin dashboard scripts for XAMPP!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
