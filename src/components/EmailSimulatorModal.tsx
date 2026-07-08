import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const EmailSimulatorModal: React.FC = () => {
  const {
    isEmailSimulatorOpen,
    setEmailSimulatorOpen,
    emailThreads,
    emailMessages,
    sendEmailMessage,
    startNewEmailThread,
    activeEmailThreadId,
    setActiveEmailThreadId
  } = useApp();

  const [newSubject, setNewSubject] = useState('');
  const [newClientName, setNewClientName] = useState('Guest Partner');
  const [newClientEmail, setNewClientEmail] = useState('client@organization.co.ke');
  const [newMessageText, setNewMessageText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  if (!isEmailSimulatorOpen) return null;

  const currentThread = emailThreads.find(t => t.id === activeEmailThreadId);
  const currentThreadMessages = emailMessages.filter(m => m.threadId === activeEmailThreadId);

  const handleCreateNewThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newMessageText.trim()) return;
    const threadId = startNewEmailThread(newClientName, newClientEmail, newSubject, newMessageText);
    setActiveEmailThreadId(threadId);
    setIsCreatingNew(false);
    setNewSubject('');
    setNewMessageText('');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEmailThreadId || !replyText.trim()) return;
    sendEmailMessage(activeEmailThreadId, 'client', currentThread?.clientName || 'Client', replyText);
    setReplyText('');

    // Simulate WEEE Centre Support reply after 2 seconds
    setTimeout(() => {
      sendEmailMessage(
        activeEmailThreadId,
        'admin',
        'WEEE Centre Logistics Desk',
        `Thank you for your update! We have noted your message in our NEMA dispatch system. If you need immediate assistance or would like to confirm vehicle arrival, feel free to call our toll-free line at +254 700 000 000.`
      );
    }, 2000);
  };

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }} tabIndex={-1}>
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header bg-dark-green text-white p-4">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '42px', height: '42px' }}>
                <i className="fa-solid fa-envelope-open-text fs-5"></i>
              </div>
              <div>
                <h3 className="modal-title fs-5 fw-bold mb-0">WEEE Centre Working Email Conversation Engine</h3>
                <span className="font-xs text-light-green">Simulated Client & Admin Email Exchange • Ready for XAMPP PHPMailer</span>
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setEmailSimulatorOpen(false)}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-0">
            <div className="row g-0" style={{ height: '600px' }}>
              {/* Left Column: Email Thread List */}
              <div className="col-12 col-md-4 border-end bg-light d-flex flex-column h-100">
                <div className="p-3 border-bottom bg-white d-flex justify-content-between align-items-center">
                  <span className="font-sm fw-bold text-dark-green"><i className="fa-solid fa-inbox me-2"></i>Inbox Threads</span>
                  <button
                    onClick={() => setIsCreatingNew(true)}
                    className="btn btn-sm btn-success rounded-pill px-3 font-xs fw-bold d-flex align-items-center gap-1"
                  >
                    <i className="fa-solid fa-plus"></i> New Email
                  </button>
                </div>
                <div className="list-group list-group-flush flex-grow-1 overflow-auto">
                  {emailThreads.map((thread) => (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => { setActiveEmailThreadId(thread.id); setIsCreatingNew(false); }}
                      className={`list-group-item list-group-item-action p-3 text-start border-bottom transition-all ${activeEmailThreadId === thread.id && !isCreatingNew ? 'bg-soft-green border-start border-success border-4' : 'bg-white'}`}
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

              {/* Right Column: Thread Messages or New Email Form */}
              <div className="col-12 col-md-8 bg-white d-flex flex-column h-100">
                {isCreatingNew ? (
                  <div className="p-4 flex-grow-1 overflow-auto">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                      <h4 className="fs-6 fw-bold text-dark-green mb-0">✍️ Start New Working Email Thread</h4>
                      <button onClick={() => setIsCreatingNew(false)} className="btn btn-sm btn-outline-secondary rounded-pill px-3 font-xs">Cancel</button>
                    </div>
                    <form onSubmit={handleCreateNewThread}>
                      <div className="row g-3 mb-3">
                        <div className="col-md-6">
                          <label className="form-label font-xs fw-bold text-muted">Your Name / Company *</label>
                          <input
                            type="text"
                            required
                            className="form-control rounded-3 font-sm"
                            value={newClientName}
                            onChange={(e) => setNewClientName(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label font-xs fw-bold text-muted">Your Email Address *</label>
                          <input
                            type="email"
                            required
                            className="form-control rounded-3 font-sm"
                            value={newClientEmail}
                            onChange={(e) => setNewClientEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label font-xs fw-bold text-muted">Email Subject *</label>
                        <input
                          type="text"
                          required
                          className="form-control rounded-3 font-sm"
                          placeholder="e.g. Inquiry regarding corporate server disposal & data shredding"
                          value={newSubject}
                          onChange={(e) => setNewSubject(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label font-xs fw-bold text-muted">Message Body *</label>
                        <textarea
                          required
                          rows={6}
                          className="form-control rounded-3 font-sm"
                          placeholder="Type your inquiry here. Our system will immediately create a working email thread and send an automated response!"
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                        ></textarea>
                      </div>
                      <button type="submit" className="btn btn-success rounded-pill px-5 py-2 font-sm fw-bold shadow-sm">
                        <i className="fa-solid fa-paper-plane me-2"></i> Send Email
                      </button>
                    </form>
                  </div>
                ) : currentThread ? (
                  <>
                    <div className="p-3 border-bottom bg-light bg-opacity-50 d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fs-6 fw-bold text-dark-green mb-0">{currentThread.subject}</h4>
                        <span className="font-xs text-muted">Between: <strong>{currentThread.clientName}</strong> & WEEE Centre Support</span>
                      </div>
                      <span className="badge bg-success font-xs">Encrypted Channel</span>
                    </div>

                    {/* Messages Area */}
                    <div className="p-4 flex-grow-1 overflow-auto d-flex flex-column gap-3" style={{ backgroundColor: '#f8f9fa' }}>
                      {currentThreadMessages.map((msg) => {
                        const isClient = msg.sender === 'client';
                        return (
                          <div key={msg.id} className={`d-flex flex-column ${isClient ? 'align-items-start' : 'align-items-end'}`}>
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <span className="font-xs fw-bold text-dark">{msg.senderName} ({isClient ? 'Client' : 'Admin / Staff'})</span>
                              <span className="font-xs text-muted">{msg.timestamp}</span>
                            </div>
                            <div className={`p-3 rounded-4 font-sm shadow-sm ${isClient ? 'bg-white text-dark border rounded-tl-0' : 'bg-dark-green text-white rounded-tr-0'}`} style={{ maxWidth: '80%', whiteSpace: 'pre-wrap' }}>
                              {msg.text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reply Bar */}
                    <form onSubmit={handleSendReply} className="p-3 border-top bg-white">
                      <div className="input-group">
                        <textarea
                          rows={2}
                          className="form-control rounded-3 font-sm border me-2"
                          placeholder="Type your email reply here..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          required
                        ></textarea>
                        <button type="submit" className="btn btn-success rounded-3 px-4 font-sm fw-bold shadow-sm d-flex align-items-center">
                          <i className="fa-solid fa-reply me-2"></i> Reply
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-grow-1 d-flex align-items-center justify-content-center text-muted font-sm p-5">
                    Select an email thread from the left to view the working conversation.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer bg-light p-3 d-flex justify-content-between align-items-center">
            <span className="font-xs text-muted">
              <i className="fa-solid fa-circle-info text-success me-1"></i> Tip: Any replies sent by WEEE Centre staff in the <strong>Admin Portal</strong> appear instantly here!
            </span>
            <button type="button" className="btn btn-outline-secondary rounded-pill px-4 font-sm" onClick={() => setEmailSimulatorOpen(false)}>
              Close Email Engine
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
