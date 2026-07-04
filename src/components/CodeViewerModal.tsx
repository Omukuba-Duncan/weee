import React, { useState } from 'react';
import { phpFilesList, PhpFile } from '../data/phpFilesData';

interface CodeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<PhpFile>(phpFilesList[0]);
  const [category, setCategory] = useState<'all' | 'core' | 'includes' | 'assets' | 'admin' | 'database' | 'api'>('all');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredFiles = category === 'all' 
    ? phpFilesList 
    : phpFilesList.filter(f => f.category === category);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const downloadCurrentFile = () => {
    const blob = new Blob([selectedFile.codeSnippet], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllBundle = () => {
    let bundleText = `====================================================================
WEEE CENTRE - RESPONSIBLE E-WASTE MANAGEMENT
FULL PHP 8 + MYSQL (XAMPP) 16-FILE DEPLOYMENT BUNDLE
====================================================================
INSTRUCTIONS:
1. Copy the contents below each header into its corresponding file path.
2. In XAMPP phpMyAdmin, import the contents of database.sql into 'weeecentre_db'.
3. Place all folders (admin, includes, api, assets) inside C:\\xampp\\htdocs\\weeecentre.
====================================================================\n\n`;

    phpFilesList.forEach((file, index) => {
      bundleText += `====================================================================\n`;
      bundleText += `FILE ${index + 1} OF ${phpFilesList.length}: ${file.path}\n`;
      bundleText += `CATEGORY: ${file.category.toUpperCase()} | DESCRIPTION: ${file.description}\n`;
      bundleText += `====================================================================\n`;
      bundleText += `${file.codeSnippet}\n\n\n`;
    });

    const blob = new Blob([bundleText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WEEECentre_Full_16_PHP_MySQL_Bundle.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadInstructions = () => {
    const text = `====================================================================
WEEE CENTRE - RESPONSIBLE E-WASTE MANAGEMENT
PHP 8 + MySQL (XAMPP) Corporate Website & Admin Package
====================================================================

All 16 requested files have been generated for XAMPP / Apache / MySQL:
1. database.sql (MySQL schema ready for phpMyAdmin import)
2. includes/db.php (PDO connection script for XAMPP)
3. admin/index.php (Non-programmer Admin Login)
4. admin/dashboard.php (Non-programmer CMS Editor)
5. api/email_process.php (Working Email Conversation Endpoint)
6. index.php (Homepage with Admin Portal button)
7. about.php (About Us)
8. services.php (Services)
9. projects.php (Projects)
10. events.php (Events)
11. contact.php (Contact Us)
12. includes/header.php
13. includes/navbar.php (Navigation with Admin Portal button)
14. includes/footer.php (Footer with Admin CMS links)
15. assets/css/style.css
16. assets/js/script.js

XAMPP DEPLOYMENT INSTRUCTIONS:
1. Start XAMPP Control Panel (Apache and MySQL).
2. Open http://localhost/phpmyadmin and import database.sql into 'weeecentre_db'.
3. Copy these files to C:\\xampp\\htdocs\\weeecentre.
4. Visit http://localhost/weeecentre or access the admin portal at /admin/index.php!
====================================================================`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'WEEECentre_XAMPP_MySQL_Deployment_Guide.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1070 }} tabIndex={-1} role="dialog" aria-labelledby="codeModalTitle" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden" style={{ minHeight: '80vh' }}>
          {/* Modal Header */}
          <div className="modal-header bg-dark-green text-white p-3 p-md-4 border-0 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <i className="fa-solid fa-code fs-5"></i>
              </div>
              <div>
                <h3 className="modal-title fs-5 fw-bold mb-0 text-white" id="codeModalTitle">PHP 8 + XAMPP MySQL Template Architecture & Explorer</h3>
                <span className="font-xs text-light-green">16 Created Files • SQL Database • Admin Portal • Email Conversation API</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <button onClick={downloadAllBundle} className="btn btn-sm btn-warning text-dark fw-bold rounded-pill px-3 font-xs d-flex align-items-center shadow-sm" title="Download all 16 files bundled into one text package">
                <i className="fa-solid fa-file-bundle me-1"></i> Download All 16 Files
              </button>
              <button onClick={downloadInstructions} className="btn btn-sm btn-outline-light rounded-pill px-3 font-xs d-flex align-items-center">
                <i className="fa-solid fa-download me-1"></i> XAMPP Readme
              </button>
              <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-0 d-flex flex-column flex-lg-row" style={{ height: '70vh' }}>
            {/* Sidebar / File List */}
            <div className="border-end bg-light p-3 d-flex flex-column" style={{ width: '100%', maxWidth: '320px', overflowY: 'auto' }}>
              <div className="mb-3">
                <label className="form-label font-xs fw-bold text-muted text-uppercase mb-2">Filter Files</label>
                <div className="d-flex flex-wrap gap-1 mb-2">
                  <button type="button" className={`btn btn-sm ${category === 'all' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setCategory('all')}>All (16)</button>
                  <button type="button" className={`btn btn-sm ${category === 'database' ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary'}`} onClick={() => setCategory('database')}>SQL</button>
                  <button type="button" className={`btn btn-sm ${category === 'admin' ? 'btn-danger text-white' : 'btn-outline-secondary'}`} onClick={() => setCategory('admin')}>Admin</button>
                  <button type="button" className={`btn btn-sm ${category === 'api' ? 'btn-info text-white' : 'btn-outline-secondary'}`} onClick={() => setCategory('api')}>Email API</button>
                </div>
                <div className="d-flex flex-wrap gap-1">
                  <button type="button" className={`btn btn-sm ${category === 'core' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setCategory('core')}>Pages</button>
                  <button type="button" className={`btn btn-sm ${category === 'includes' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setCategory('includes')}>Includes</button>
                  <button type="button" className={`btn btn-sm ${category === 'assets' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setCategory('assets')}>Assets</button>
                </div>
              </div>

              <div className="list-group list-group-flush gap-1 flex-grow-1">
                {filteredFiles.map((file) => (
                  <button
                    key={file.path}
                    type="button"
                    className={`list-group-item list-group-item-action rounded-3 p-2 text-start transition-all d-flex align-items-center justify-content-between ${selectedFile.path === file.path ? 'bg-success text-white fw-bold shadow-sm' : 'bg-white'}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="d-flex align-items-center gap-2 overflow-hidden">
                      <i className={`fa-solid ${file.path.endsWith('.php') ? 'fa-file-code text-warning' : file.path.endsWith('.css') ? 'fa-file-code text-info' : 'fa-file-code text-success'}`}></i>
                      <span className="font-sm text-truncate">{file.name}</span>
                    </div>
                    <span className={`badge ${selectedFile.path === file.path ? 'bg-white text-success' : 'bg-light text-muted'} font-xs`}>
                      {file.lines}L
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-3 p-2 bg-white rounded border font-xs text-muted text-center">
                <i className="fa-solid fa-circle-info text-success me-1"></i>
                All files exist directly in project root folder.
              </div>
            </div>

            {/* Code Viewer Panel */}
            <div className="p-4 d-flex flex-column flex-grow-1 overflow-hidden bg-dark text-light">
              <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom border-secondary">
                <div>
                  <span className="badge bg-success text-white mb-1 font-xs">{selectedFile.path}</span>
                  <p className="font-sm text-light-green mb-0">{selectedFile.description}</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button 
                    onClick={downloadCurrentFile} 
                    className="btn btn-sm btn-outline-warning text-warning rounded-pill px-3 d-flex align-items-center transition-all shadow-sm"
                    title={`Download ${selectedFile.name} directly`}
                  >
                    <i className="fa-solid fa-file-arrow-down me-1"></i>
                    Download {selectedFile.name}
                  </button>
                  <button 
                    onClick={handleCopy} 
                    className={`btn btn-sm ${copied ? 'btn-success' : 'btn-outline-light'} rounded-pill px-3 d-flex align-items-center transition-all`}
                  >
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'} me-1`}></i>
                    {copied ? 'Copied to Clipboard!' : 'Copy Snippet'}
                  </button>
                </div>
              </div>

              {/* Syntax highlighted code box */}
              <div className="flex-grow-1 overflow-auto bg-black bg-opacity-50 p-3 rounded-3 border border-secondary border-opacity-50 font-monospace font-sm" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                <code>{selectedFile.codeSnippet}</code>
              </div>

              <div className="mt-3 pt-2 border-top border-secondary d-flex align-items-center justify-content-between font-xs text-muted">
                <span>PHP 8 Strict Types Enabled • Bootstrap 5.3 Responsive Grid • Professional Docblocks</span>
                <span>File {phpFilesList.findIndex(f => f.path === selectedFile.path) + 1} of {phpFilesList.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
