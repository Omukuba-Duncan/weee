<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: services.php
 * Description: Services overview page detailing E-Waste Collection, Secure Data Destruction,
 *              Training & Capacity Building, EPR Compliance, and IT Asset Disposition.
 */

declare(strict_types=1);

$pageTitle = 'Our Services | WEEE Centre Kenya & East Africa';
$pageDescription = 'Comprehensive e-waste recycling services: scheduled collection, certified military-grade data destruction, EPR compliance consulting, and capacity building.';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- Page Header Banner -->
<header class="bg-soft-green py-5 border-bottom">
    <div class="container py-3 text-center text-md-start">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none text-success">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Services</li>
            </ol>
        </nav>
        <h1 class="fw-bold text-dark-green mb-2">Our Specialized Services</h1>
        <p class="text-muted max-w-2xl font-sm mb-0">
            End-to-end electronic waste management solutions engineered for environmental safety, regulatory compliance, and total data security.
        </p>
    </div>
</header>

<!-- Main Services Section -->
<section class="py-5 my-3">
    <div class="container">
        <?php
        $detailed_services = [
            [
                'id' => 'collection',
                'title' => 'E-Waste Collection & Logistics',
                'icon' => 'fa-solid fa-truck-fast',
                'badge' => 'Logistics & Pickups',
                'desc' => 'We offer scheduled and one-off collection services tailored to meet the needs of households, corporate offices, government agencies, and industrial institutions across Kenya and East Africa. Our dedicated fleet ensures secure transportation with complete chain-of-custody documentation from your doorstep to our NEMA-licensed recycling facility.',
                'bullets' => ['Nationwide coverage across Kenya and regional borders', 'GPS-tracked security vehicles for high-value IT equipment', 'Customized collection bins and on-site storage cages provided', 'Certified weighing and receiving reports issued upon arrival'],
                'img' => 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'id' => 'destruction',
                'title' => 'Secure & Certified Data Destruction',
                'icon' => 'fa-solid fa-lock',
                'badge' => 'Military-Grade Security',
                'desc' => 'In an era of stringent data privacy regulations (such as the Kenya Data Protection Act and GDPR), safeguarding sensitive corporate information stored on decommissioned hardware is paramount. We provide certified data sanitization, magnetic degaussing, and physical hard drive shredding.',
                'bullets' => ['On-site mobile destruction or secure facility processing', 'Compliant with NIST SP 800-88 and DoD 5220.22-M standards', 'Physical shredding of HDDs, SSDs, backup tapes, and USB drives', 'Formal Certificate of Data Destruction issued with serial number logs'],
                'img' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'id' => 'training',
                'title' => 'Training & Capacity Building',
                'icon' => 'fa-solid fa-graduation-cap',
                'badge' => 'Education & Awareness',
                'desc' => 'Empowering organizations and communities through education is key to solving the e-waste challenge. Our expert trainers conduct tailored awareness workshops, sustainability seminars, and technical training on e-waste handling and ESG (Environmental, Social, and Governance) compliance.',
                'bullets' => ['Corporate ESG training for IT and Procurement managers', 'Grassroots youth employment and dismantling skill workshops', 'Institutional policy drafting for green procurement', 'Collaborative academic research and internship programs'],
                'img' => 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80'
            ],
            [
                'id' => 'epr',
                'title' => 'EPR (Extended Producer Responsibility) Compliance',
                'icon' => 'fa-solid fa-file-shield',
                'badge' => 'Regulatory Compliance',
                'desc' => 'Under Kenya’s Sustainable Waste Management Act, brand owners, importers, and manufacturers of electronic goods must comply with Extended Producer Responsibility regulations. We act as your certified PRO (Producer Responsibility Organization) partner to fulfill collection and recycling targets.',
                'bullets' => ['Assistance with NEMA registration and EPR scheme setup', 'Verifiable collection credits and recycling tonnage certificates', 'Annual environmental audit and statutory reporting support', 'Custom brand-sponsored collection take-back campaigns'],
                'img' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'
            ]
        ];

        foreach ($detailed_services as $idx => $s):
            $isEven = ($idx % 2 !== 0);
        ?>
        <div class="row g-5 align-items-center mb-5 pb-4 border-bottom reveal-on-scroll <?= $isEven ? 'flex-md-row-reverse' : ''; ?>" id="<?= $s['id']; ?>">
            <div class="col-12 col-lg-6">
                <span class="badge bg-soft-green text-dark-green border border-success border-opacity-25 px-3 py-2 rounded-pill font-xs mb-3">
                    <i class="<?= $s['icon']; ?> text-success me-1"></i> <?= htmlspecialchars($s['badge']); ?>
                </span>
                <h2 class="fw-bold text-dark-green fs-3 mb-3"><?= htmlspecialchars($s['title']); ?></h2>
                <p class="text-muted font-sm lh-relaxed mb-4"><?= htmlspecialchars($s['desc']); ?></p>
                
                <h5 class="fs-6 fw-bold text-primary-green mb-3"><i class="fa-solid fa-circle-check me-2"></i>Key Service Highlights:</h5>
                <ul class="list-unstyled font-sm text-dark mb-4">
                    <?php foreach ($s['bullets'] as $bullet): ?>
                    <li class="mb-2 d-flex align-items-start">
                        <i class="fa-solid fa-check text-success mt-1 me-2 font-xs"></i>
                        <span><?= htmlspecialchars($bullet); ?></span>
                    </li>
                    <?php endforeach; ?>
                </ul>
                <a href="contact.php?service=<?= urlencode($s['title']); ?>" class="btn btn-dark-green rounded-pill px-4 py-2 font-sm shadow-sm">
                    Book This Service <i class="fa-solid fa-arrow-right ms-2"></i>
                </a>
            </div>
            <div class="col-12 col-lg-6">
                <div class="position-relative p-2 bg-white rounded-4 shadow-sm border">
                    <img src="<?= $s['img']; ?>" alt="<?= htmlspecialchars($s['title']); ?>" class="img-fluid rounded-3 w-100" style="max-height: 360px; object-fit: cover;">
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- Call to Action Section -->
<section class="py-5 bg-soft-green border-top">
    <div class="container text-center py-4">
        <h3 class="fw-bold text-dark-green mb-3">Need a Custom Waste Management Solution?</h3>
        <p class="text-muted max-w-2xl mx-auto font-sm mb-4">
            Our environmental engineers and logistics specialists are ready to design a tailored recycling and data destruction plan for your organization.
        </p>
        <a href="contact.php" class="btn btn-success rounded-pill px-5 py-3 fw-bold shadow">
            Contact Our Technical Team <i class="fa-solid fa-headset ms-2"></i>
        </a>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
