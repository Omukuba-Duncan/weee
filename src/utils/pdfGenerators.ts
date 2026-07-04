import jsPDF from 'jspdf';

interface ResourceContent {
  filename: string;
  title: string;
  subtitle: string;
  date: string;
  version: string;
  sections: {
    heading: string;
    body?: string[];
    bullets?: string[];
  }[];
}

const RESOURCE_DATA: Record<string, ResourceContent> = {
  'epr_2024': {
    filename: 'Kenya_E-Waste_EPR_Guidelines_2024.pdf',
    title: 'Kenya E-Waste EPR Guidelines 2024',
    subtitle: 'National Extended Producer Responsibility Compliance Framework',
    date: 'Published: July 2024 | Authority: NEMA Kenya & WEEE Centre',
    version: 'Version 3.2 • Official Compliance Document',
    sections: [
      {
        heading: '1. Executive Summary & Regulatory Scope',
        body: [
          'The Extended Producer Responsibility (EPR) regulations mandate that all manufacturers, brand owners, and importers of electrical and electronic equipment (EEE) in East Africa take financial and physical responsibility for their products throughout their entire lifecycle, particularly at the post-consumer stage.',
          'WEEE Centre serves as the certified Producer Responsibility Organization (PRO) partner, providing traceable collection, recycling, and NEMA audit compliance.'
        ]
      },
      {
        heading: '2. Mandatory Producer Compliance Quotas',
        body: [
          'Under section 14 of the Sustainable Waste Management Act, producers must achieve annual collection and recycling targets based on their net import and production volumes:'
        ],
        bullets: [
          'Year 1 (2024): 30% total weight of EEE introduced into the Kenyan market.',
          'Year 2 (2025): 50% mandatory recovery and eco-friendly treatment.',
          'Year 3 (2026+): 70% zero-landfill circular recovery target.',
          'Failure to submit annual EPR audit reports results in import license suspension by NEMA.'
        ]
      },
      {
        heading: '3. WEEE Centre Take-Back Integration',
        body: [
          'Partnering with WEEE Centre provides producers with immediate compliance through our nationwide infrastructure:'
        ],
        bullets: [
          'Deployment of branded collection bins at retail outlets and distributor hubs.',
          'Reverse logistics and hazardous material transport using NEMA-licensed vehicles.',
          'Issuance of official Certificates of Recycling and annual EPR tax deduction certificates.',
          'Full traceability reporting via our real-time client portal.'
        ]
      },
      {
        heading: '4. Contact & Auditing Support',
        body: [
          'For corporate onboarding and EPR audit verification, contact our compliance desk at epr@weeecentre.com or call our Nairobi headquarters at +254 700 111 222.'
        ]
      }
    ]
  },
  'data_standard': {
    filename: 'Corporate_Data_Destruction_Standard.pdf',
    title: 'Corporate Data Destruction Standard',
    subtitle: 'NIST SP 800-88 Rev. 1 Compliant Sanitization Protocols',
    date: 'Published: Q1 2025 | Certification: ISO 9001:2015 & DoD 5220.22-M',
    version: 'Version 4.0 • Technical Security Specification',
    sections: [
      {
        heading: '1. Purpose & Data Security Mandate',
        body: [
          'In an era of stringent data privacy laws (such as the Kenya Data Protection Act 2019 and GDPR), decommissioning IT assets without certified data destruction exposes organizations to catastrophic breaches, financial penalties, and loss of reputation.',
          'This standard defines WEEE Centre’s mandatory three-stage data sanitization process for all client server arrays, hard disk drives (HDDs), solid-state drives (SSDs), and magnetic tapes.'
        ]
      },
      {
        heading: '2. Three-Stage Sanitization Protocol',
        body: [
          'Every storage device processed at WEEE Centre undergoes rigorous verification before physical recycling:'
        ],
        bullets: [
          'Stage 1: Software Overwriting (Clear) - 3-pass cryptographic data wiping for reusable drives, verifying random pattern overwrite across 100% of sectors.',
          'Stage 2: Magnetic Degaussing (Purge) - Exposing magnetic media (HDDs/tapes) to a 10,000 Gauss coercive field, permanently destroying data magnetic domains.',
          'Stage 3: Physical Shredding (Destroy) - Industrial shredding down to 6mm particles, rendering solid-state chips and drive platters physically irrecoverable.'
        ]
      },
      {
        heading: '3. Chain of Custody & Audit Trail',
        body: [
          'Total transparency is maintained from asset collection to final destruction:'
        ],
        bullets: [
          'GPS-tracked armored transit from client premises to WEEE Centre high-security facility.',
          'Serial number barcode scanning and logging into immutable database records.',
          'Optional 24/7 live video stream viewing of physical shredding for client audit teams.',
          'Formal Certificate of Destruction (CoD) issued within 48 hours, detailing every serial number processed.'
        ]
      },
      {
        heading: '4. Environmental Scrap Recovery',
        body: [
          'Post-shredding metal and electronic scrap is refined in accordance with the Basel Convention, recovering copper, aluminum, and rare earth elements without chemical pollution.'
        ]
      }
    ]
  },
  'impact_report': {
    filename: 'WEEE_Centre_Annual_Impact_Report_2025.pdf',
    title: 'Annual Environmental Impact Report',
    subtitle: 'Transforming Electronic Waste into Green Economic Opportunities',
    date: 'Reporting Period: Jan 2024 - Dec 2025 | Publisher: WEEE Centre Kenya',
    version: 'Annual Edition • Public Sustainability Disclosure',
    sections: [
      {
        heading: '1. Executive Leadership Statement',
        body: [
          'Over the past year, WEEE Centre has significantly expanded its operational footprint across East Africa, demonstrating that responsible electronic waste management is both an environmental necessity and a catalyst for green employment.',
          'Through collaborative partnerships with government ministries, telecom operators, and educational institutions, we have diverted record volumes of hazardous waste from open dumpsites.'
        ]
      },
      {
        heading: '2. Key Environmental & Social Metrics',
        body: [
          'Our verified impact across Kenya, Uganda, Tanzania, and Rwanda for the reporting year includes:'
        ],
        bullets: [
          '3,450+ Tonnes of e-waste safely collected, dismantled, and recycled.',
          '18,600+ Tonnes of carbon dioxide (CO2) equivalent emissions prevented from entering the atmosphere.',
          '98.5% Raw material recovery rate for steel, aluminum, copper, and precious metals.',
          '650+ Youth and informal sector waste collectors trained in safe dismantling and equipped with PPE.',
          '120+ Public schools and universities provided with free e-waste collection bins and awareness workshops.'
        ]
      },
      {
        heading: '3. Circular Economy Innovations',
        body: [
          'In 2025, we launched East Africa’s first dedicated Solar Battery & Lithium Neutralization pilot, addressing the growing challenge of decommissioned off-grid solar storage.',
          'We also expanded our IT Asset Disposal (ITAD) refurbishment labs, donating over 800 upgraded computers to rural digital literacy centers.'
        ]
      },
      {
        heading: '4. Future Outlook (2026-2030 Targets)',
        body: [
          'We aim to expand collection capacity to 10,000 tonnes annually by 2028 and establish regional preprocessing hubs in Mombasa, Kisumu, and Eldoret.'
        ]
      }
    ]
  },
  'household_toolkit': {
    filename: 'Household_E-Waste_Recycling_Toolkit.pdf',
    title: 'Household E-Waste Recycling Toolkit',
    subtitle: 'A Citizen’s Guide to Safe Electronic Waste Disposal at Home',
    date: 'Published: 2025 | Author: WEEE Centre Community Outreach Team',
    version: 'Citizen Edition • Free Educational Guide',
    sections: [
      {
        heading: '1. What is Household E-Waste?',
        body: [
          'Electronic waste (e-waste) includes any discarded appliance or device that operates on electricity, batteries, or solar power. When thrown into regular garbage bins or burned, heavy metals like lead, mercury, and cadmium leach into soil and drinking water.',
          'Common household e-waste includes: old mobile phones, chargers, broken TVs, laptops, batteries, microwaves, irons, and fluorescent bulbs.'
        ]
      },
      {
        heading: '2. Three Golden Rules of Safe E-Waste Handling',
        body: [
          'Follow these essential safety practices at home before bringing items to a collection bin:'
        ],
        bullets: [
          'Never crush, puncture, or burn lithium-ion batteries (from phones/laptops) — they can explode or cause toxic chemical fires.',
          'Store obsolete electronics in a dry, cardboard box away from children and direct sunlight.',
          'Do not attempt to dismantle CRT televisions or microwaves yourself due to high-voltage capacitors and lead glass.'
        ]
      },
      {
        heading: '3. Where to Drop Off Your E-Waste',
        body: [
          'WEEE Centre has established convenient, secure drop-off bins across major towns:'
        ],
        bullets: [
          'Nairobi: WEEE Centre HQ (Utawala), Sarit Centre, Yaya Centre, and participating Safaricom retail outlets.',
          'Mombasa: Nyali Centre and City Mall collection points.',
          'Kisumu: Mega City Mall green recycling station.',
          'Home Pickup: For loads exceeding 50kg, request a free residential collection via our website or by calling +254 700 111 222.'
        ]
      },
      {
        heading: '4. Become a Green Champion',
        body: [
          'Encourage your neighborhood estate association or school to host a weekend E-Waste Collection Drive. WEEE Centre provides collection trucks, tents, and certificates of appreciation for participating communities.'
        ]
      }
    ]
  }
};

/**
 * Generates and downloads a beautifully formatted PDF document for the requested resource.
 */
export function downloadResourcePdf(resourceId: string, fallbackTitle: string): void {
  const data = RESOURCE_DATA[resourceId] || {
    filename: `${fallbackTitle.replace(/\s+/g, '_')}.pdf`,
    title: fallbackTitle,
    subtitle: 'WEEE Centre Official Guidance Document',
    date: `Downloaded: ${new Date().toLocaleDateString()}`,
    version: 'Official Document',
    sections: [
      {
        heading: '1. Overview & Objectives',
        body: [
          `This official guidance document outlines the standard operational protocols and environmental compliance frameworks for ${fallbackTitle}.`,
          'WEEE Centre is committed to zero-landfill electronic waste recycling, certified data security, and sustainable circular economy practices across Kenya and East Africa.'
        ],
        bullets: [
          'NEMA Licensed Recycler & ISO 9001:2015 Certified Facility.',
          'Full compliance with the Sustainable Waste Management Act.',
          'Complete chain of custody and environmental reporting.'
        ]
      }
    ]
  };

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const maxLineWidth = pageWidth - margin * 2;
  let cursorY = 0;

  // Header Banner (Green)
  doc.setFillColor(34, 139, 34); // #228B22 Forest Green
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Header Text
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('WEEE CENTRE - RESPONSIBLE E-WASTE MANAGEMENT', margin, 14);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('NEMA Licensed Facility • ISO 9001:2015 Certified • Nairobi, Kenya', margin, 22);
  doc.text('www.weeecentre.com | info@weeecentre.com | +254 700 111 222', margin, 27);

  cursorY = 46;

  // Document Title
  doc.setTextColor(20, 60, 20); // Dark Green
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  const titleLines = doc.splitTextToSize(data.title.toUpperCase(), maxLineWidth);
  doc.text(titleLines, margin, cursorY);
  cursorY += titleLines.length * 8 + 2;

  // Subtitle
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  const subLines = doc.splitTextToSize(data.subtitle, maxLineWidth);
  doc.text(subLines, margin, cursorY);
  cursorY += subLines.length * 6 + 4;

  // Metadata Box
  doc.setFillColor(243, 248, 243);
  doc.setDrawColor(200, 220, 200);
  doc.rect(margin, cursorY, maxLineWidth, 14, 'FD');
  
  doc.setTextColor(60, 60, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(data.version, margin + 4, cursorY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(data.date, margin + 4, cursorY + 11);

  cursorY += 24;

  // Sections
  data.sections.forEach((sec) => {
    // Check page overflow for heading
    if (cursorY > pageHeight - 40) {
      addFooter(doc, pageWidth, pageHeight, margin);
      doc.addPage();
      cursorY = 25;
    }

    // Section Heading
    doc.setTextColor(34, 139, 34); // Green
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text(sec.heading, margin, cursorY);
    cursorY += 7;

    // Section Body Paragraphs
    if (sec.body) {
      doc.setTextColor(40, 40, 40);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      
      sec.body.forEach((para) => {
        const lines = doc.splitTextToSize(para, maxLineWidth);
        if (cursorY + lines.length * 5 > pageHeight - 30) {
          addFooter(doc, pageWidth, pageHeight, margin);
          doc.addPage();
          cursorY = 25;
        }
        doc.text(lines, margin, cursorY);
        cursorY += lines.length * 5 + 4;
      });
    }

    // Bullet Points
    if (sec.bullets) {
      doc.setTextColor(50, 50, 50);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      sec.bullets.forEach((bullet) => {
        const bulletText = `•  ${bullet}`;
        const lines = doc.splitTextToSize(bulletText, maxLineWidth - 6);
        if (cursorY + lines.length * 5 > pageHeight - 30) {
          addFooter(doc, pageWidth, pageHeight, margin);
          doc.addPage();
          cursorY = 25;
        }
        doc.text(lines, margin + 4, cursorY);
        cursorY += lines.length * 5 + 3;
      });
      cursorY += 2;
    }

    cursorY += 4;
  });

  // Add final page footer
  addFooter(doc, pageWidth, pageHeight, margin);

  // Trigger browser download
  doc.save(data.filename);
}

function addFooter(doc: jsPDF, pageWidth: number, pageHeight: number, margin: number): void {
  const pageCount = doc.internal.getNumberOfPages();
  doc.setDrawColor(220, 220, 220);
  doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);

  doc.setTextColor(130, 130, 130);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    `Page ${pageCount} • WEEE Centre Kenya • Official Environmental Guidance & Compliance Document`,
    margin,
    pageHeight - 10
  );
  doc.text(
    `Downloaded from WEEE Centre Portal • www.weeecentre.com`,
    pageWidth - margin - 55,
    pageHeight - 10
  );
}
