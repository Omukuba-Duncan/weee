import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DisposeModal } from './components/DisposeModal';
import { CodeViewerModal } from './components/CodeViewerModal';
import { Chatbot } from './components/Chatbot';
import { EmailSimulatorModal } from './components/EmailSimulatorModal';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Projects } from './pages/Projects';
import { Events } from './pages/Events';
import { Contact } from './pages/Contact';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState<string>('index');
  const [disposeModalOpen, setDisposeModalOpen] = useState<boolean>(false);
  const [codeViewerOpen, setCodeViewerOpen] = useState<boolean>(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'admin':
        return <AdminDashboard setActivePage={setActivePage} />;
      case 'about':
        return <About setActivePage={setActivePage} />;
      case 'services':
        return <Services setActivePage={setActivePage} onOpenDisposeModal={() => setDisposeModalOpen(true)} />;
      case 'projects':
        return <Projects setActivePage={setActivePage} />;
      case 'events':
        return <Events setActivePage={setActivePage} />;
      case 'contact':
        return <Contact setActivePage={setActivePage} />;
      case 'index':
      default:
        return <Home setActivePage={setActivePage} onOpenDisposeModal={() => setDisposeModalOpen(true)} />;
    }
  };

  return (
    <AppProvider>
      <div className="d-flex flex-column min-vh-100 bg-white position-relative">
        {/* Navigation */}
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          onOpenDisposeModal={() => setDisposeModalOpen(true)} 
          onOpenCodeViewer={() => setCodeViewerOpen(true)} 
        />

        {/* Main Page Content */}
        <div className="flex-grow-1">
          {renderPage()}
        </div>

        {/* Footer */}
        <Footer setActivePage={setActivePage} />

        {/* Dispose Now Interactive Booking Modal */}
        <DisposeModal 
          isOpen={disposeModalOpen} 
          onClose={() => setDisposeModalOpen(false)} 
        />

        {/* PHP Architecture & Template Code Viewer Modal */}
        <CodeViewerModal 
          isOpen={codeViewerOpen} 
          onClose={() => setCodeViewerOpen(false)} 
        />

        {/* Real-time AI Client Support Chatbot */}
        <Chatbot />

        {/* Working Email Conversation Simulator Modal */}
        <EmailSimulatorModal />

        {/* Floating Action Badge for Admin Portal and PHP Source Explorer */}
        <div className="position-fixed bottom-0 end-0 m-3 m-md-4 z-3 d-flex flex-column align-items-end gap-2" style={{ bottom: '0px' }}>
          <button 
            onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className={`btn rounded-pill px-3 px-md-4 py-2 shadow-lg border border-2 d-flex align-items-center gap-2 font-sm fw-bold transition-all hover-scale ${activePage === 'admin' ? 'btn-success border-light text-white' : 'btn-dark border-warning text-white'}`}
            title="Open Non-programmer Admin Portal (CMS & Leads)"
            style={{ boxShadow: '0 8px 25px rgba(0, 0, 0, 0.4)' }}
          >
            <span className="badge bg-warning text-dark rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '22px', height: '22px' }}>
              <i className="fa-solid fa-user-shield font-xs"></i>
            </span>
            <span>🛡️ Admin Portal</span>
          </button>

          <button 
            onClick={() => setCodeViewerOpen(true)} 
            className="btn btn-dark-green rounded-pill px-3 px-md-4 py-2 shadow-lg border border-success border-2 d-flex align-items-center gap-2 font-sm fw-bold transition-all hover-scale"
            title="Inspect generated PHP 8 & MySQL XAMPP files"
            style={{ boxShadow: '0 8px 25px rgba(13, 61, 38, 0.4)' }}
          >
            <span className="badge bg-success text-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '22px', height: '22px' }}>16</span>
            <span>📄 PHP & MySQL Files</span>
          </button>
        </div>
      </div>
    </AppProvider>
  );
}
