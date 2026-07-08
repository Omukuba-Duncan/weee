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
    '🚚 How do I schedule an office or household e-waste pickup?',
    '🔒 What is your data destruction pricing & NEMA certificate?',
    '📋 How does Extended Producer Responsibility (EPR) work in Kenya?',
    '🔋 What e-waste items & solar lithium batteries do you accept?',
    '🌍 Where are your drop-off collection bins in Nairobi & Mombasa?',
    '⚖️ What is the penalty under Kenya Sustainable Waste Management Act?',
    '🖥️ Do you donate refurbished computers to rural schools?',
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
      let botReply = "Thank you for reaching out to WEEE Centre! We are East Africa's leading NEMA & ISO 9001:2015 certified e-waste facility. You can click 'Dispose Now' in our navigation bar to book a pickup or email us directly at ogadan254@gmail.com!";

      const lower = text.toLowerCase();
      if (lower.includes('charge') || lower.includes('price') || lower.includes('cost') || lower.includes('quotation') || lower.includes('how much') || lower.includes('develop') || lower.includes('website')) {
        botReply = "💰 **Kenya Web Development Pricing Advice (KES & USD):**\n\nFor a custom full-stack platform like WEEE Centre (PHP 8 + MySQL sync, NEMA EPR automated compliance, interactive pickup booking, real-time chatbot, & admin CMS):\n\n• **Freelance / Mid-Level:** KES 85,000 – 140,000\n• **Senior Developer / Agency:** KES 180,000 – 280,000 (~$1,400 – $2,150 USD)\n• **Enterprise Contract:** KES 350,000+\n\n**Recommended Itemized Quote:**\n1. UI/UX & Frontend (Tailwind/React): KES 50,000\n2. PHP/MySQL & EPR Compliance Module: KES 70,000\n3. Real-Time Chatbot & Automated Doc Generator: KES 45,000\n4. Admin Lead Management CMS: KES 45,000\n**Total Suggested Price:** **KES 210,000** (with 40% upfront deposit).";
      } else if (lower.includes('schedule') || lower.includes('pickup') || lower.includes('collect') || lower.includes('office') || lower.includes('household')) {
        botReply = "🚚 **How to Schedule a Pickup:**\n1. Click the green **'Dispose Now ♻️'** button at the top of the page.\n2. Select **'Corporate / Business Collection'** or **'Household Pickup'**.\n3. Enter your contact details and estimated waste volume (e.g., computers, servers, printers).\n4. Our logistics team will dispatch a NEMA-licensed GPS-tracked truck to your premises within 24-48 hours!";
      } else if (lower.includes('data') || lower.includes('shred') || lower.includes('destroy') || lower.includes('certificate') || lower.includes('security') || lower.includes('hard drive')) {
        botReply = "🔒 **Secure Data Destruction & NEMA Certificates:**\nWe provide military-grade physical hard drive shredding (down to 6mm particles) and magnetic degaussing compliant with **NIST SP 800-88** standards.\n\n• **Pricing:** Discounted for corporate bulk lots (approx. KES 500 - 1,500 per drive depending on volume & on-site vs off-site shredding).\n• **Proof:** Within 48 hours, we issue a serialized **NEMA Certificate of Data Destruction** with barcode logs for your ISO/GDPR compliance audit!";
      } else if (lower.includes('epr') || lower.includes('producer') || lower.includes('compliance') || lower.includes('responsibility')) {
        botReply = "📋 **Extended Producer Responsibility (EPR) in Kenya:**\nUnder Section 14 of the Kenya Sustainable Waste Management Act 2022, all brand owners, manufacturers, and importers of electrical and electronic equipment (EEE) must take physical and financial responsibility for end-of-life recovery.\n\n• **WEEE Centre Role:** We serve as your certified Producer Responsibility Organization (PRO), providing nationwide take-back bins, recycling quotas (30% in Year 1, 50% in Year 2), and filing annual NEMA compliance audit reports on your behalf!";
      } else if (lower.includes('accept') || lower.includes('items') || lower.includes('battery') || lower.includes('batteries') || lower.includes('solar') || lower.includes('what e-waste') || lower.includes('what can i')) {
        botReply = "🔋 **Accepted E-Waste & Solar Batteries:**\nWe accept all electrical and electronic equipment, including:\n• **IT & Telecom:** Laptops, desktop PCs, servers, routers, mobile phones, cables.\n• **Power & Solar:** Lithium-ion solar batteries, inverters, UPS units, lead-acid batteries (processed via East Africa's first neutralization pilot).\n• **Household & Office:** Televisions, printers, scanners, microwaves, air conditioners, and fluorescent tubes.";
      } else if (lower.includes('where') || lower.includes('drop-off') || lower.includes('dropoff') || lower.includes('nairobi') || lower.includes('mombasa') || lower.includes('bin') || lower.includes('location')) {
        botReply = "🌍 **WEEE Centre Drop-off Points & Collection Bins:**\n• **Nairobi HQ:** Utawala, off Eastern Bypass (Open Mon-Fri 8am-5pm, Sat 9am-1pm).\n• **Nairobi Malls:** Sarit Centre, Yaya Centre, Village Market, and participating Safaricom retail shops.\n• **Mombasa:** Nyali Centre & City Mall e-waste bins.\n• **Kisumu:** Mega City Mall recycling station.\n\nFor bulky loads over 50kg, we offer **free residential and corporate pickup** across Kenya!";
      } else if (lower.includes('penalty') || lower.includes('act') || lower.includes('law') || lower.includes('illegal') || lower.includes('dump')) {
        botReply = "⚖️ **Kenya Sustainable Waste Management Act 2022:**\nOpen dumping or burning of electronic waste is illegal in Kenya. Corporations failing to comply with EPR or disposing of hazardous e-waste in municipal landfills face severe penalties, including fines up to **KES 4,000,000**, imprisonment of up to 4 years, and suspension of import/operating licenses by NEMA.";
      } else if (lower.includes('donate') || lower.includes('school') || lower.includes('computer') || lower.includes('refurbish') || lower.includes('charity') || lower.includes('rural')) {
        botReply = "🖥️ **Refurbished Computer Donations & ITAD:**\nThrough our IT Asset Disposal (ITAD) refurbishment labs, we upgrade decommissioned corporate laptops and desktops. Viable machines are loaded with educational software and donated to rural public schools and digital literacy centers across Kenya. In 2025 alone, we donated over 800 upgraded computers!";
      } else if (lower.includes('human') || lower.includes('agent') || lower.includes('email') || lower.includes('connect') || lower.includes('talk')) {
        botReply = "👤 **Connecting you to our Live Support Team!**\nI have created a dedicated direct conversation channel. You can also click the Working Email Simulator at the bottom or email us at **ogadan254@gmail.com** or call **+254768449499**.";
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
      {/* Floating Chat Trigger Button & Pill (Moved to Bottom Left to prevent overlapping Admin/PHP badges on right) */}
      <div className="position-fixed bottom-0 start-0 m-3 m-md-4 z-3 d-flex align-items-center gap-2" style={{ bottom: '20px' }}>
        <button
          onClick={() => setChatbotOpen(!isChatbotOpen)}
          className="btn btn-success rounded-circle p-3 shadow-lg d-flex align-items-center justify-content-center transition-all hover-scale border border-white border-2 position-relative"
          style={{ width: '60px', height: '60px', backgroundColor: '#13803f', boxShadow: '0 8px 25px rgba(19, 128, 63, 0.5)' }}
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

        {!isChatbotOpen && (
          <div 
            onClick={() => setChatbotOpen(true)}
            className="bg-white text-dark-green px-3 py-2 rounded-pill shadow-lg border border-success border-2 font-xs fw-bold cursor-pointer d-none d-sm-flex align-items-center gap-2 transition-all hover-scale"
            style={{ cursor: 'pointer' }}
          >
            <span className="badge bg-success text-white rounded-pill font-xs">Online</span>
            <span>💬 AI Support & Kenya Project Pricing</span>
          </div>
        )}
      </div>

      {/* Chatbox Window (Bottom Left) */}
      {isChatbotOpen && (
        <div 
          className="position-fixed bottom-0 start-0 m-3 m-md-4 z-3 card border-0 rounded-4 shadow-lg overflow-hidden d-flex flex-column"
          style={{ width: '370px', maxWidth: 'calc(100vw - 32px)', height: '540px', bottom: '90px', left: '10px' }}
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
