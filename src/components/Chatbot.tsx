import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  isQuickAction?: boolean;
}

export const Chatbot: React.FC = () => {
  const { isChatbotOpen, setChatbotOpen, setEmailSimulatorOpen, startNewEmailThread } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: 'Hello! 👋 I am the WEEE Centre Realtime AI Assistant. How can I help you with sustainable e-waste recycling, corporate IT pickup, or EPR compliance today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    '🚚 How do I schedule an office e-waste pickup?',
    '🔒 What is your data destruction pricing & NEMA certificate?',
    '📋 How does Extended Producer Responsibility (EPR) work?',
    '📧 Connect me with a WEEE Centre Human Agent'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatbotOpen) {
      scrollToBottom();
    }
  }, [messages, isChatbotOpen]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate intelligent realtime response from WEEE Centre Support
    setTimeout(() => {
      let botReply = "Thank you for reaching out to WEEE Centre! We are East Africa's leading NEMA & ISO 9001:2015 certified e-waste facility. You can click 'Dispose Now' in our navigation bar to book a pickup or email us directly at info@weeecentre.com!";

      const lower = text.toLowerCase();
      if (lower.includes('schedule') || lower.includes('pickup') || lower.includes('collect')) {
        botReply = "🚚 To schedule an office e-waste pickup:\n1. Click the green 'Dispose Now ♻️' button at the top of the page.\n2. Select 'Corporate / Business Collection' or 'Household Pickup'.\n3. Our logistics team will dispatch a secure GPS-tracked truck to your premises within 24-48 hours!";
      } else if (lower.includes('data') || lower.includes('shred') || lower.includes('pricing') || lower.includes('destroy') || lower.includes('certificate')) {
        botReply = "🔒 Secure Data Destruction:\nWe provide military-grade physical hard drive shredding and degaussing compliant with NIST SP 800-88 standards. Pricing depends on volume (discounted for bulk corporate lots). Upon completion, we issue a serialized NEMA Certificate of Data Destruction for your compliance audit!";
      } else if (lower.includes('epr') || lower.includes('producer') || lower.includes('compliance') || lower.includes('nema') || lower.includes('act')) {
        botReply = "📋 Extended Producer Responsibility (EPR):\nUnder Kenya's Sustainable Waste Management Act, producers and importers must account for their post-consumer electronics. WEEE Centre assists with NEMA scheme registration, annual environmental auditing, and verifiable collection credit certificates!";
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('email') || lower.includes('connect') || lower.includes('talk')) {
        botReply = "👤 Connecting you to our Live Support Team!\nI have created a dedicated direct conversation channel. You can also open our Working Email Simulator to chat directly with our environmental engineers!";
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickClick = (q: string) => {
    handleSend(q);
  };

  const openEmailThreadWithHuman = () => {
    setChatbotOpen(false);
    startNewEmailThread('Guest Client', 'client@company.com', 'Live Chat Support Transfer', 'Hello WEEE Centre team, I was transferred from the realtime AI chatbot and would like to speak with a specialist.');
    setEmailSimulatorOpen(true);
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Placed above the PHP Badge) */}
      <div className="position-fixed bottom-0 end-0 m-3 m-md-4 z-3" style={{ marginBottom: '80px !important', bottom: '70px' }}>
        <button
          onClick={() => setChatbotOpen(!isChatbotOpen)}
          className="btn btn-success rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center transition-all hover-scale border border-white border-2 position-relative"
          style={{ width: '60px', height: '60px', backgroundColor: '#13803f' }}
          title="Chat with WEEE Centre Realtime Support"
        >
          {isChatbotOpen ? (
            <i className="fa-solid fa-xmark fs-4 text-white"></i>
          ) : (
            <>
              <i className="fa-solid fa-comments fs-3 text-white"></i>
              <span className="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-light rounded-circle">
                <span className="visually-hidden">New alert</span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chatbox Window */}
      {isChatbotOpen && (
        <div 
          className="position-fixed bottom-0 end-0 m-3 m-md-4 z-3 card border-0 rounded-4 shadow-lg overflow-hidden d-flex flex-column"
          style={{ width: '360px', maxWidth: 'calc(100vw - 32px)', height: '520px', bottom: '135px' }}
        >
          {/* Chat Header */}
          <div className="bg-dark-green text-white p-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative">
                <div className="bg-white text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                  <i className="fa-solid fa-robot fs-5"></i>
                </div>
                <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle" title="Online"></span>
              </div>
              <div>
                <h4 className="fs-6 fw-bold mb-0 text-white">WEEE Centre Realtime AI</h4>
                <span className="font-xs text-light-green d-block" style={{ fontSize: '11px' }}>🟢 Online • NEMA Certified Support</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-1">
              <button 
                onClick={() => { setChatbotOpen(false); setEmailSimulatorOpen(true); }}
                className="btn btn-sm btn-outline-light rounded-pill px-2 py-1 font-xs"
                style={{ fontSize: '11px' }}
                title="Switch to Email Inbox"
              >
                <i className="fa-solid fa-envelope me-1"></i> Email
              </button>
              <button onClick={() => setChatbotOpen(false)} className="btn btn-link text-white p-1 text-decoration-none">
                <i className="fa-solid fa-xmark fs-5"></i>
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="p-3 flex-grow-1 overflow-auto bg-light d-flex flex-column gap-3 font-sm">
            {messages.map((m) => {
              const isBot = m.sender === 'bot';
              return (
                <div key={m.id} className={`d-flex flex-column ${isBot ? 'align-items-start' : 'align-items-end'}`}>
                  <div className="d-flex align-items-center gap-1 mb-1" style={{ fontSize: '11px' }}>
                    <span className="fw-bold text-dark">{isBot ? 'WEEE AI Specialist' : 'You'}</span>
                    <span className="text-muted">{m.time}</span>
                  </div>
                  <div 
                    className={`p-3 rounded-4 shadow-sm ${isBot ? 'bg-white text-dark border rounded-tl-0' : 'bg-success text-white rounded-tr-0'}`}
                    style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="d-flex align-items-center gap-2 bg-white p-2 rounded-pill shadow-sm border align-self-start font-xs text-muted">
                <div className="spinner-grow spinner-grow-sm text-success" role="status"></div>
                <span>WEEE AI Assistant is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Questions Pill Box */}
          <div className="p-2 bg-white border-top d-flex flex-wrap gap-1 overflow-auto" style={{ maxHeight: '90px' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickClick(q)}
                className="btn btn-sm btn-outline-success rounded-pill font-xs text-start text-truncate"
                style={{ fontSize: '11px', maxWidth: '100%' }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-2 bg-white border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-sm rounded-pill px-3 font-sm border me-1"
                placeholder="Ask us about e-waste disposal..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="btn btn-success rounded-circle d-flex align-items-center justify-content-center p-0" style={{ width: '36px', height: '36px' }}>
                <i className="fa-solid fa-paper-plane font-xs"></i>
              </button>
            </div>
            <div className="text-center mt-1">
              <a href="#" onClick={(e) => { e.preventDefault(); openEmailThreadWithHuman(); }} className="font-xs text-muted text-decoration-underline" style={{ fontSize: '11px' }}>
                Need human assistance? Open Working Email Conversation →
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
