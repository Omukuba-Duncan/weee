<?php
/**
 * WEEE Centre Official Resource Downloader
 * File: api/download_resource.php
 */
declare(strict_types=1);

$fileId = $_GET['file'] ?? 'epr_2024';

$resources = [
    'epr_2024' => [
        'filename' => 'Kenya_E-Waste_EPR_Guidelines_2024.doc',
        'title' => 'Kenya E-Waste EPR Guidelines 2024',
        'subtitle' => 'National Extended Producer Responsibility Compliance Framework',
        'date' => 'Published: July 2024 | Authority: NEMA Kenya & WEEE Centre',
        'version' => 'Version 3.2 • Official Compliance Document',
        'content' => '
            <h3>1. Executive Summary & Regulatory Scope</h3>
            <p>The Extended Producer Responsibility (EPR) regulations mandate that all manufacturers, brand owners, and importers of electrical and electronic equipment (EEE) in East Africa take financial and physical responsibility for their products throughout their entire lifecycle, particularly at the post-consumer stage.</p>
            <p>WEEE Centre serves as the certified Producer Responsibility Organization (PRO) partner, providing traceable collection, recycling, and NEMA audit compliance.</p>
            
            <h3>2. Mandatory Producer Compliance Quotas</h3>
            <p>Under section 14 of the Sustainable Waste Management Act, producers must achieve annual collection and recycling targets based on their net import and production volumes:</p>
            <ul>
                <li><strong>Year 1 (2024):</strong> 30% total weight of EEE introduced into the Kenyan market.</li>
                <li><strong>Year 2 (2025):</strong> 50% mandatory recovery and eco-friendly treatment.</li>
                <li><strong>Year 3 (2026+):</strong> 70% zero-landfill circular recovery target.</li>
                <li><strong>Compliance Penalties:</strong> Failure to submit annual EPR audit reports results in import license suspension by NEMA.</li>
            </ul>

            <h3>3. WEEE Centre Take-Back Integration</h3>
            <p>Partnering with WEEE Centre provides producers with immediate compliance through our nationwide infrastructure:</p>
            <ul>
                <li>Deployment of branded collection bins at retail outlets and distributor hubs.</li>
                <li>Reverse logistics and hazardous material transport using NEMA-licensed vehicles.</li>
                <li>Issuance of official Certificates of Recycling and annual EPR tax deduction certificates.</li>
                <li>Full traceability reporting via our real-time client portal.</li>
            </ul>

            <h3>4. Contact & Auditing Support</h3>
            <p>For corporate onboarding and EPR audit verification, contact our compliance desk at <strong>epr@weeecentre.com</strong> or call our Nairobi headquarters at <strong>+254 700 111 222</strong>.</p>
        '
    ],
    'data_standard' => [
        'filename' => 'Corporate_Data_Destruction_Standard.doc',
        'title' => 'Corporate Data Destruction Standard',
        'subtitle' => 'NIST SP 800-88 Rev. 1 Compliant Sanitization Protocols',
        'date' => 'Published: Q1 2025 | Certification: ISO 9001:2015 & DoD 5220.22-M',
        'version' => 'Version 4.0 • Technical Security Specification',
        'content' => '
            <h3>1. Purpose & Data Security Mandate</h3>
            <p>In an era of stringent data privacy laws (such as the Kenya Data Protection Act 2019 and GDPR), decommissioning IT assets without certified data destruction exposes organizations to catastrophic breaches, financial penalties, and loss of reputation.</p>
            <p>This standard defines WEEE Centre’s mandatory three-stage data sanitization process for all client server arrays, hard disk drives (HDDs), solid-state drives (SSDs), and magnetic tapes.</p>

            <h3>2. Three-Stage Sanitization Protocol</h3>
            <p>Every storage device processed at WEEE Centre undergoes rigorous verification before physical recycling:</p>
            <ul>
                <li><strong>Stage 1: Software Overwriting (Clear):</strong> 3-pass cryptographic data wiping for reusable drives, verifying random pattern overwrite across 100% of sectors.</li>
                <li><strong>Stage 2: Magnetic Degaussing (Purge):</strong> Exposing magnetic media (HDDs/tapes) to a 10,000 Gauss coercive field, permanently destroying data magnetic domains.</li>
                <li><strong>Stage 3: Physical Shredding (Destroy):</strong> Industrial shredding down to 6mm particles, rendering solid-state chips and drive platters physically irrecoverable.</li>
            </ul>

            <h3>3. Chain of Custody & Audit Trail</h3>
            <p>Total transparency is maintained from asset collection to final destruction:</p>
            <ul>
                <li>GPS-tracked armored transit from client premises to WEEE Centre high-security facility.</li>
                <li>Serial number barcode scanning and logging into immutable database records.</li>
                <li>Optional 24/7 live video stream viewing of physical shredding for client audit teams.</li>
                <li>Formal Certificate of Destruction (CoD) issued within 48 hours, detailing every serial number processed.</li>
            </ul>

            <h3>4. Environmental Scrap Recovery</h3>
            <p>Post-shredding metal and electronic scrap is refined in accordance with the Basel Convention, recovering copper, aluminum, and rare earth elements without chemical pollution.</p>
        '
    ],
    'impact_report' => [
        'filename' => 'WEEE_Centre_Annual_Impact_Report_2025.doc',
        'title' => 'Annual Environmental Impact Report',
        'subtitle' => 'Transforming Electronic Waste into Green Economic Opportunities',
        'date' => 'Reporting Period: Jan 2024 - Dec 2025 | Publisher: WEEE Centre Kenya',
        'version' => 'Annual Edition • Public Sustainability Disclosure',
        'content' => '
            <h3>1. Executive Leadership Statement</h3>
            <p>Over the past year, WEEE Centre has significantly expanded its operational footprint across East Africa, demonstrating that responsible electronic waste management is both an environmental necessity and a catalyst for green employment.</p>
            <p>Through collaborative partnerships with government ministries, telecom operators, and educational institutions, we have diverted record volumes of hazardous waste from open dumpsites.</p>

            <h3>2. Key Environmental & Social Metrics</h3>
            <p>Our verified impact across Kenya, Uganda, Tanzania, and Rwanda for the reporting year includes:</p>
            <ul>
                <li><strong>3,450+ Tonnes</strong> of e-waste safely collected, dismantled, and recycled.</li>
                <li><strong>18,600+ Tonnes</strong> of carbon dioxide (CO2) equivalent emissions prevented from entering the atmosphere.</li>
                <li><strong>98.5% Raw Material Recovery Rate</strong> for steel, aluminum, copper, and precious metals.</li>
                <li><strong>650+ Youth and Informal Sector Technicians</strong> trained in safe dismantling and equipped with personal protective equipment (PPE).</li>
                <li><strong>120+ Public Schools and Universities</strong> provided with free e-waste collection bins and awareness workshops.</li>
            </ul>

            <h3>3. Circular Economy Innovations</h3>
            <p>In 2025, we launched East Africa’s first dedicated Solar Battery & Lithium Neutralization pilot, addressing the growing challenge of decommissioned off-grid solar storage.</p>
            <p>We also expanded our IT Asset Disposal (ITAD) refurbishment labs, donating over 800 upgraded computers to rural digital literacy centers.</p>

            <h3>4. Future Outlook (2026-2030 Targets)</h3>
            <p>We aim to expand collection capacity to 10,000 tonnes annually by 2028 and establish regional preprocessing hubs in Mombasa, Kisumu, and Eldoret.</p>
        '
    ],
    'household_toolkit' => [
        'filename' => 'Household_E-Waste_Recycling_Toolkit.doc',
        'title' => 'Household E-Waste Recycling Toolkit',
        'subtitle' => 'A Citizen’s Guide to Safe Electronic Waste Disposal at Home',
        'date' => 'Published: 2025 | Author: WEEE Centre Community Outreach Team',
        'version' => 'Citizen Edition • Free Educational Guide',
        'content' => '
            <h3>1. What is Household E-Waste?</h3>
            <p>Electronic waste (e-waste) includes any discarded appliance or device that operates on electricity, batteries, or solar power. When thrown into regular garbage bins or burned, heavy metals like lead, mercury, and cadmium leach into soil and drinking water.</p>
            <p>Common household e-waste includes: old mobile phones, chargers, broken TVs, laptops, batteries, microwaves, irons, and fluorescent bulbs.</p>

            <h3>2. Three Golden Rules of Safe E-Waste Handling</h3>
            <p>Follow these essential safety practices at home before bringing items to a collection bin:</p>
            <ul>
                <li><strong>Never crush, puncture, or burn lithium-ion batteries</strong> (from phones/laptops) — they can explode or cause toxic chemical fires.</li>
                <li><strong>Store obsolete electronics in a dry box</strong> away from children and direct sunlight.</li>
                <li><strong>Do not attempt to dismantle CRT televisions or microwaves</strong> yourself due to high-voltage capacitors and lead glass.</li>
            </ul>

            <h3>3. Where to Drop Off Your E-Waste</h3>
            <p>WEEE Centre has established convenient, secure drop-off bins across major towns:</p>
            <ul>
                <li><strong>Nairobi:</strong> WEEE Centre HQ (Utawala), Sarit Centre, Yaya Centre, and participating Safaricom retail outlets.</li>
                <li><strong>Mombasa:</strong> Nyali Centre and City Mall collection points.</li>
                <li><strong>Kisumu:</strong> Mega City Mall green recycling station.</li>
                <li><strong>Home Pickup:</strong> For loads exceeding 50kg, request a free residential collection via our website or by calling <strong>+254 700 111 222</strong>.</li>
            </ul>

            <h3>4. Become a Green Champion</h3>
            <p>Encourage your neighborhood estate association or school to host a weekend E-Waste Collection Drive. WEEE Centre provides collection trucks, tents, and certificates of appreciation for participating communities.</p>
        '
    ]
];

$res = $resources[$fileId] ?? $resources['epr_2024'];

header("Content-Type: application/vnd.ms-word; charset=UTF-8");
header("Content-Disposition: attachment; filename="{$res['filename']}"");
header("Cache-Control: private, max-age=0, must-revalidate");
header("Pragma: public");

echo '<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: "Segoe UI", Arial, sans-serif; color: #333333; line-height: 1.6; margin: 30px; }
    .header { background-color: #228B22; color: #ffffff; padding: 20px; text-align: center; border-radius: 5px; }
    .header h1 { margin: 0; font-size: 22pt; color: #ffffff; }
    .header p { margin: 5px 0 0 0; font-size: 11pt; color: #e6ffe6; }
    .title-box { margin-top: 30px; border-bottom: 2px solid #228B22; padding-bottom: 15px; }
    .title-box h2 { color: #143c14; font-size: 18pt; margin: 0 0 10px 0; }
    .title-box h4 { color: #555555; font-size: 13pt; margin: 0; font-style: italic; }
    .meta { background-color: #f4f9f4; border: 1px solid #dcdcdc; padding: 10px 15px; margin-top: 15px; font-size: 10pt; color: #444444; }
    h3 { color: #228B22; font-size: 14pt; margin-top: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; }
    p { font-size: 11pt; text-align: justify; }
    ul { margin-top: 10px; }
    li { font-size: 11pt; margin-bottom: 8px; }
    .footer { margin-top: 50px; border-top: 1px solid #cccccc; padding-top: 15px; text-align: center; font-size: 9pt; color: #777777; }
</style>
</head>
<body>
    <div class="header">
        <h1>WEEE CENTRE KENYA</h1>
        <p>Responsible E-Waste Management • NEMA Licensed • ISO 9001:2015 Certified</p>
    </div>

    <div class="title-box">
        <h2>' . htmlspecialchars($res['title']) . '</h2>
        <h4>' . htmlspecialchars($res['subtitle']) . '</h4>
        <div class="meta">
            <strong>' . htmlspecialchars($res['version']) . '</strong><br>
            <span>' . htmlspecialchars($res['date']) . '</span>
        </div>
    </div>

    <div class="content">
        ' . $res['content'] . '
    </div>

    <div class="footer">
        WEEE Centre Headquarters • Utawala, Nairobi, Kenya • Tel: +254 700 111 222 • Email: info@weeecentre.com<br>
        Official Compliance Document downloaded from WEEE Centre Portal
    </div>
</body>
</html>';
exit;
?>