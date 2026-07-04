import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  badge: string;
  desc: string;
  bullets: string[];
  img: string;
}

export interface ProjectItem {
  id: string;
  category: string;
  badge: string;
  title: string;
  date: string;
  desc: string;
  metrics: string;
  img: string;
}

export interface StaffItem {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  photo: string;
  status: 'Active' | 'On Leave' | 'Field Deployment';
}

export interface PartnerItem {
  id: string;
  name: string;
  icon: string;
  label: string;
}

export interface InquiryItem {
  id: string;
  ticketNo: string;
  type: 'disposal' | 'contact' | 'email_thread';
  name: string;
  email: string;
  phone: string;
  subject: string;
  location: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Archived';
  date: string;
}

export interface EmailMessage {
  id: string;
  threadId: string;
  sender: 'client' | 'admin';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface EmailThread {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  lastUpdated: string;
  unreadCount: number;
}

interface AppContextType {
  // Auth state for Admin
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;

  // Services CRUD
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // Projects CRUD
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updated: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  // Partners CRUD
  partners: PartnerItem[];
  addPartner: (partner: Omit<PartnerItem, 'id'>) => void;
  deletePartner: (id: string) => void;

  // Staff & Team CRUD
  staffMembers: StaffItem[];
  addStaff: (staff: Omit<StaffItem, 'id'>) => void;
  updateStaff: (id: string, updated: Partial<StaffItem>) => void;
  deleteStaff: (id: string) => void;

  // Inquiries / Leads
  inquiries: InquiryItem[];
  addInquiry: (inquiry: Omit<InquiryItem, 'id' | 'ticketNo' | 'date' | 'status'>) => InquiryItem;
  updateInquiryStatus: (id: string, status: InquiryItem['status']) => void;
  deleteInquiry: (id: string) => void;

  // Email Conversations
  emailThreads: EmailThread[];
  emailMessages: EmailMessage[];
  sendEmailMessage: (threadId: string, sender: 'client' | 'admin', senderName: string, text: string) => void;
  startNewEmailThread: (clientName: string, clientEmail: string, subject: string, initialMessage: string) => string;

  // Real-time Chatbot state
  isChatbotOpen: boolean;
  setChatbotOpen: (open: boolean) => void;
  isEmailSimulatorOpen: boolean;
  setEmailSimulatorOpen: (open: boolean) => void;
  activeEmailThreadId: string | null;
  setActiveEmailThreadId: (id: string | null) => void;
}

const initialServices: ServiceItem[] = [
  {
    id: 'collection',
    title: 'E-Waste Collection & Logistics',
    icon: 'fa-solid fa-truck-fast',
    badge: 'Logistics & Pickups',
    desc: 'Scheduled and one-off collection services tailored to meet the needs of households, corporate offices, government agencies, and industrial institutions across Kenya and East Africa.',
    bullets: [
      'Nationwide coverage across Kenya and regional borders',
      'GPS-tracked security vehicles for high-value IT equipment',
      'Customized collection bins and on-site storage cages provided',
      'Certified weighing and receiving reports issued upon arrival'
    ],
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'destruction',
    title: 'Secure & Certified Data Destruction',
    icon: 'fa-solid fa-lock',
    badge: 'Military-Grade Security',
    desc: 'In an era of stringent data privacy regulations (such as the Kenya Data Protection Act and GDPR), safeguarding sensitive corporate information stored on decommissioned hardware is paramount.',
    bullets: [
      'On-site mobile destruction or secure facility processing',
      'Compliant with NIST SP 800-88 and DoD 5220.22-M standards',
      'Physical shredding of HDDs, SSDs, backup tapes, and USB drives',
      'Formal Certificate of Data Destruction issued with serial number logs'
    ],
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'training',
    title: 'Training & Capacity Building',
    icon: 'fa-solid fa-graduation-cap',
    badge: 'Education & Awareness',
    desc: 'Empowering organizations and communities through education is key to solving the e-waste challenge. Our expert trainers conduct tailored awareness workshops and sustainability seminars.',
    bullets: [
      'Corporate ESG training for IT and Procurement managers',
      'Grassroots youth employment and dismantling skill workshops',
      'Institutional policy drafting for green procurement',
      'Collaborative academic research and internship programs'
    ],
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'epr',
    title: 'EPR (Extended Producer Responsibility) Compliance',
    icon: 'fa-solid fa-file-shield',
    badge: 'Regulatory Compliance',
    desc: 'Under Kenya’s Sustainable Waste Management Act, brand owners, importers, and manufacturers of electronic goods must comply with Extended Producer Responsibility regulations.',
    bullets: [
      'Assistance with NEMA registration and EPR scheme setup',
      'Verifiable collection credits and recycling tonnage certificates',
      'Annual environmental audit and statutory reporting support',
      'Custom brand-sponsored collection take-back campaigns'
    ],
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
  }
];

const initialProjects: ProjectItem[] = [
  {
    id: 'drive',
    category: 'Collection Drives',
    badge: 'Collection Drive',
    title: 'Nationwide Schools & Institutional E-Waste Drive',
    date: 'Ongoing Initiative • 2023 - 2024',
    desc: 'Partnering with over 120 learning institutions and government agencies across Nairobi, Kisumu, and Mombasa to collect obsolete computers, printers, and lab electronics.',
    metrics: '3,400+ Tonnes Collected | 45,000+ Students Sensitized',
    img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'data',
    category: 'Data Security',
    badge: 'Data Erasure',
    title: 'Banking Sector Secure Data Sanitization Project',
    date: 'Completed • Q1 2024',
    desc: 'Conducted on-site hard drive shredding and magnetic degaussing for top tier commercial banks in Kenya, ensuring 100% data protection while recycling metal server racks.',
    metrics: '15,000+ HDDs Shredded | Zero Data Breach Risk',
    img: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'awareness',
    category: 'Community Training',
    badge: 'Community Training',
    title: 'Grassroots E-Waste Youth Sensitization & Green Jobs',
    date: 'Ongoing • Supported by UNEP',
    desc: 'Training informal sector waste collectors and youth groups in safe dismantling techniques, protecting them from toxic heavy metals and creating sustainable green livelihoods.',
    metrics: '650+ Technicians Trained | 30+ Community Hubs',
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'recovery',
    category: 'Material Recovery',
    badge: 'Material Recovery',
    title: 'Circular Economy Raw Material Recovery Initiative',
    date: 'Ongoing Initiative',
    desc: 'Extracting copper, aluminum, gold, and palladium from printed circuit boards (PCBs) in compliance with international Basel Convention standards.',
    metrics: '98.5% Recovery Rate | 18,600+ Tonnes CO₂ Avoided',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
  }
];

const initialPartners: PartnerItem[] = [
  { id: '1', name: 'UNEP (United Nations Environment Programme)', icon: 'fa-solid fa-globe', label: 'UNEP Environment' },
  { id: '2', name: 'KEBS (Kenya Bureau of Standards)', icon: 'fa-solid fa-stamp', label: 'KEBS Certified' },
  { id: '3', name: 'NEMA Kenya', icon: 'fa-solid fa-shield-halved', label: 'NEMA Approved' },
  { id: '4', name: 'Safaricom Twaweza', icon: 'fa-solid fa-signal', label: 'Safaricom Twaweza' },
  { id: '5', name: 'ISOCERT ISO 9001:2015', icon: 'fa-solid fa-certificate', label: 'ISOCERT 9001:2015' },
  { id: '6', name: 'PCS Powering Industry', icon: 'fa-solid fa-bolt', label: 'PCS Industry' }
];

const initialStaffMembers: StaffItem[] = [
  {
    id: 'staff-1',
    name: 'Dr. Boniface Mbithi',
    role: 'Executive Director & Founder',
    department: 'Executive Leadership',
    email: 'b.mbithi@weeecentre.com',
    phone: '+254 700 111 222',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    status: 'Active'
  },
  {
    id: 'staff-2',
    name: 'Jane Wanjiru',
    role: 'Head of Operations & Logistics',
    department: 'Operations',
    email: 'j.wanjiru@weeecentre.com',
    phone: '+254 722 333 444',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    status: 'Active'
  },
  {
    id: 'staff-3',
    name: 'David Ochieng',
    role: 'Lead ITAD & Data Security Engineer',
    department: 'Technical & Engineering',
    email: 'd.ochieng@weeecentre.com',
    phone: '+254 733 555 666',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    status: 'Field Deployment'
  }
];

const initialInquiries: InquiryItem[] = [
  {
    id: 'inq-1',
    ticketNo: '#WEEE-8421',
    type: 'disposal',
    name: 'Sarah Odhiambo',
    email: 'sarah.o@safari-tech.co.ke',
    phone: '+254 711 234 567',
    subject: 'Corporate IT Assets (Laptops, Servers, Monitors)',
    location: 'Nairobi Metropolitan Area',
    message: 'We have 25 decommissioned Dell laptops and 4 tower servers from our Westlands office for pickup next week.',
    status: 'In Progress',
    date: '2026-07-03'
  },
  {
    id: 'inq-2',
    ticketNo: '#WEEE-9012',
    type: 'contact',
    name: 'Dr. James Kiarie',
    email: 'j.kiarie@uonbi.ac.ke',
    phone: '+254 722 890 123',
    subject: 'Training & Capacity Building Workshop',
    location: 'Nairobi',
    message: 'We would like to schedule an e-waste sensitization seminar for our engineering faculty students next month.',
    status: 'New',
    date: '2026-07-02'
  }
];

const initialEmailThreads: EmailThread[] = [
  {
    id: 'thread-1',
    clientName: 'Sarah Odhiambo (Safari Tech)',
    clientEmail: 'sarah.o@safari-tech.co.ke',
    subject: 'Inquiry: Pickup schedule for 25 Laptops (#WEEE-8421)',
    lastUpdated: '10:45 AM today',
    unreadCount: 0
  },
  {
    id: 'thread-2',
    clientName: 'Dr. James Kiarie (UoN)',
    clientEmail: 'j.kiarie@uonbi.ac.ke',
    subject: 'E-Waste Sensitization Seminar Partnership',
    lastUpdated: 'Yesterday',
    unreadCount: 1
  }
];

const initialEmailMessages: EmailMessage[] = [
  {
    id: 'msg-1',
    threadId: 'thread-1',
    sender: 'client',
    senderName: 'Sarah Odhiambo',
    text: 'Hello WEEE Centre team, we have submitted our disposal request for 25 laptops and 4 servers. Could you confirm what documents you issue after destruction?',
    timestamp: 'Yesterday at 3:15 PM'
  },
  {
    id: 'msg-2',
    threadId: 'thread-1',
    sender: 'admin',
    senderName: 'WEEE Centre Logistics Officer',
    text: 'Hello Sarah! Thank you for choosing WEEE Centre. Upon collection and processing at our Embakasi facility, we issue an official NEMA Certificate of Recycling along with a serialized Certificate of Data Destruction (NIST SP 800-88 compliant). Our vehicle can be at your Westlands office on Tuesday at 10:00 AM. Does that work for you?',
    timestamp: 'Today at 9:30 AM'
  },
  {
    id: 'msg-3',
    threadId: 'thread-1',
    sender: 'client',
    senderName: 'Sarah Odhiambo',
    text: 'That sounds perfect! Tuesday at 10:00 AM works. We will have the inventory staged at the basement loading bay.',
    timestamp: 'Today at 10:45 AM'
  },
  {
    id: 'msg-4',
    threadId: 'thread-2',
    sender: 'client',
    senderName: 'Dr. James Kiarie',
    text: 'Dear Team, I am looking to invite an e-waste expert from WEEE Centre as a guest lecturer for our environmental engineering symposium on August 14th. Please let us know if this is possible!',
    timestamp: 'Yesterday at 4:20 PM'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [staffMembers, setStaffMembers] = useState<StaffItem[]>(initialStaffMembers);
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [emailThreads, setEmailThreads] = useState<EmailThread[]>(initialEmailThreads);
  const [emailMessages, setEmailMessages] = useState<EmailMessage[]>(initialEmailMessages);

  // Modal & Chat states
  const [isChatbotOpen, setChatbotOpen] = useState<boolean>(false);
  const [isEmailSimulatorOpen, setEmailSimulatorOpen] = useState<boolean>(false);
  const [activeEmailThreadId, setActiveEmailThreadId] = useState<string | null>('thread-1');

  // Load from localStorage if available
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem('weee_admin_auth');
      if (savedAdmin === 'true') setIsAdminLoggedIn(true);

      const savedServices = localStorage.getItem('weee_services');
      if (savedServices) setServices(JSON.parse(savedServices));

      const savedProjects = localStorage.getItem('weee_projects');
      if (savedProjects) setProjects(JSON.parse(savedProjects));

      const savedPartners = localStorage.getItem('weee_partners');
      if (savedPartners) setPartners(JSON.parse(savedPartners));

      const savedStaff = localStorage.getItem('weee_staff');
      if (savedStaff) setStaffMembers(JSON.parse(savedStaff));
    } catch (e) {
      console.error('Error loading from localStorage', e);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    try {
      localStorage.setItem('weee_services', JSON.stringify(services));
      localStorage.setItem('weee_projects', JSON.stringify(projects));
      localStorage.setItem('weee_partners', JSON.stringify(partners));
      localStorage.setItem('weee_staff', JSON.stringify(staffMembers));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }, [services, projects, partners, staffMembers]);

  const loginAdmin = (pass: string): boolean => {
    // Default demo password is 'admin123' or 'weee2026' or anything non-empty for non-programmer ease!
    if (pass.trim().length > 0) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('weee_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('weee_admin_auth');
  };

  // Service CRUD
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newId = 'svc-' + Date.now();
    setServices(prev => [...prev, { ...service, id: newId }]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Projects CRUD
  const addProject = (project: Omit<ProjectItem, 'id'>) => {
    const newId = 'proj-' + Date.now();
    setProjects(prev => [ { ...project, id: newId }, ...prev ]);
  };

  const updateProject = (id: string, updated: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Partners CRUD
  const addPartner = (partner: Omit<PartnerItem, 'id'>) => {
    const newId = 'ptr-' + Date.now();
    setPartners(prev => [...prev, { ...partner, id: newId }]);
  };

  const deletePartner = (id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
  };

  // Staff & Team CRUD
  const addStaff = (staff: Omit<StaffItem, 'id'>) => {
    const newId = 'staff-' + Date.now();
    setStaffMembers(prev => [...prev, { ...staff, id: newId }]);
  };

  const updateStaff = (id: string, updated: Partial<StaffItem>) => {
    setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStaff = (id: string) => {
    setStaffMembers(prev => prev.filter(s => s.id !== id));
  };

  // Inquiries CRUD
  const addInquiry = (inquiry: Omit<InquiryItem, 'id' | 'ticketNo' | 'date' | 'status'>): InquiryItem => {
    const ticketNo = '#WEEE-' + Math.floor(1000 + Math.random() * 9000);
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: 'inq-' + Date.now(),
      ticketNo,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };
    setInquiries(prev => [newInquiry, ...prev]);

    // Automatically create an email thread for working email conversation!
    startNewEmailThread(inquiry.name, inquiry.email, `Inquiry: ${inquiry.subject} (${ticketNo})`, inquiry.message);

    return newInquiry;
  };

  const updateInquiryStatus = (id: string, status: InquiryItem['status']) => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  // Email Conversations
  const startNewEmailThread = (clientName: string, clientEmail: string, subject: string, initialMessage: string): string => {
    const threadId = 'thread-' + Date.now();
    const newThread: EmailThread = {
      id: threadId,
      clientName,
      clientEmail,
      subject,
      lastUpdated: 'Just now',
      unreadCount: 1
    };
    setEmailThreads(prev => [newThread, ...prev]);

    const newMsg: EmailMessage = {
      id: 'msg-' + Date.now(),
      threadId,
      sender: 'client',
      senderName: clientName,
      text: initialMessage,
      timestamp: 'Just now'
    };
    setEmailMessages(prev => [...prev, newMsg]);

    // Simulate automated automated welcome reply from WEEE Centre after 2 seconds
    setTimeout(() => {
      sendEmailMessage(
        threadId,
        'admin',
        'WEEE Centre Automated Desk',
        `Hello ${clientName}! We have received your inquiry regarding "${subject}". An environmental logistics officer is reviewing your submission and will get back to you shortly. Feel free to reply to this conversation directly!`,
      );
    }, 1500);

    setActiveEmailThreadId(threadId);
    return threadId;
  };

  const sendEmailMessage = (threadId: string, sender: 'client' | 'admin', senderName: string, text: string) => {
    const newMsg: EmailMessage = {
      id: 'msg-' + Date.now(),
      threadId,
      sender,
      senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setEmailMessages(prev => [...prev, newMsg]);

    // Update thread lastUpdated and unreadCount
    setEmailThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastUpdated: 'Just now',
          unreadCount: sender === 'client' ? t.unreadCount + 1 : 0
        };
      }
      return t;
    }));
  };

  return (
    <AppContext.Provider value={{
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
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,
      emailThreads,
      emailMessages,
      sendEmailMessage,
      startNewEmailThread,
      isChatbotOpen,
      setChatbotOpen,
      isEmailSimulatorOpen,
      setEmailSimulatorOpen,
      activeEmailThreadId,
      setActiveEmailThreadId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
