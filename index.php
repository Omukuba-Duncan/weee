<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * Professional Corporate Website Template
 * 
 * File: index.php
 * Description: Main homepage matching the uploaded WEEE Centre corporate design, including
 *              Hero section, feature strip, services grid, impact statistics, featured projects,
 *              and partner organizations carousel.
 * 
 * @package WEEECentre
 * @version 2.0.0
 * @author WEEE Centre Dev Team
 */

// Strict typing for PHP 8
declare(strict_types=1);

// Page metadata
$pageTitle = 'WEEE Centre | Responsible E-Waste Management & Sustainable Future';
$pageDescription = 'Leading e-waste collection, recycling and responsible disposal across Kenya and East Africa. Safe, certified data destruction and EPR compliance.';

// Include Header & Navbar
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- ==========================================================================
     1. HERO SECTION
     ========================================================================== -->
<header class="hero-section position-relative" id="main-content">
    <div class="container position-relative z-2">
        <div class="row align-items-center g-5">
            <!-- Left Column: Hero Copy & CTA Buttons -->
            <div class="col-12 col-lg-7 text-center text-lg-start reveal-on-scroll">
                <div class="d-inline-flex align-items-center bg-light-green text-primary-green px-3 py-1 rounded-pill font-xs fw-semibold mb-3 border border-success border-opacity-25 shadow-sm">
                    <span class="d-inline-block bg-success rounded-circle me-2" style="width: 8px; height: 8px;"></span>
                    ISO 9001:2015 Certified E-Waste Recycler
                </div>
                <h1 class="hero-title mb-3 tracking-tight">
                    Responsible E-Waste <br class="d-none d-md-inline">
                    Management for a <br class="d-none d-md-inline">
                    <span class="text-primary-green">Sustainable Future</span>
                </h1>
                <p class="hero-subtitle mb-4 text-muted pe-lg-5 lh-relaxed">
                    WEEE Centre is committed to the collection, recycling and responsible disposal of electrical and electronic waste across Kenya and East Africa.
                </p>
                <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start">
                    <a href="contact.php?action=dispose" class="btn btn-hero-primary d-inline-flex align-items-center shadow-sm">
                        Dispose Now <i class="fa-solid fa-recycle ms-2 rotate-hover"></i>
                    </a>
                    <a href="about.php" class="btn btn-hero-secondary d-inline-flex align-items-center">
                        Learn More <i class="fa-solid fa-arrow-right ms-2 font-xs"></i>
                    </a>
                </div>
                
                <!-- Quick Compliance Trust Badges -->
                <div class="mt-5 pt-3 border-top border-secondary border-opacity-10 d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center gap-4 text-muted font-xs">
                    <span class="d-flex align-items-center"><i class="fa-solid fa-shield-halved text-success me-2 fs-6"></i> NEMA Certified</span>
                    <span class="d-flex align-items-center"><i class="fa-solid fa-lock text-success me-2 fs-6"></i> Military-Grade Data Erasure</span>
                    <span class="d-flex align-items-center"><i class="fa-solid fa-check-double text-success me-2 fs-6"></i> 100% Zero Landfill Policy</span>
                </div>
            </div>

            <!-- Right Column: Hero Graphic Illustration -->
            <div class="col-12 col-lg-5 d-flex justify-content-center reveal-on-scroll delay-200">
                <div class="hero-image-wrapper p-3 bg-white bg-opacity-75 rounded-4 shadow-lg border border-white position-relative">
                    <div class="position-absolute top-0 start-0 translate-middle badge bg-success text-white rounded-pill p-3 shadow d-none d-md-block">
                        <i class="fa-solid fa-leaf fs-4"></i>
                    </div>
                    <!-- High quality e-waste recycling representation -->
                    <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80" alt="Responsible E-Waste Recycling Bin and Electronics" class="img-fluid rounded-3 shadow-sm">
                    <div class="mt-3 text-center">
                        <span class="badge bg-soft-green text-dark-green border border-success border-opacity-25 px-3 py-2 rounded-pill font-xs">
                            <i class="fa-solid fa-recycle text-success me-1"></i> Eco-Friendly IT Asset Disposition (ITAD)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- ==========================================================================
     2. FEATURE STRIP (Overlapping Cards)
     ========================================================================== -->
<section class="feature-strip container" aria-label="Key E-Waste Capabilities">
    <div class="row g-4 justify-content-center">
        <!-- Card 1: E-Waste Collection -->
        <div class="col-12 col-sm-6 col-xl-3 reveal-on-scroll delay-100">
            <div class="feature-card d-flex flex-column">
                <div class="feature-icon shadow-sm">
                    <i class="fa-solid fa-truck-fast"></i>
                </div>
                <h2 class="feature-title">E-Waste Collection</h2>
                <p class="feature-desc">Safe and efficient collection from homes, offices and institutions across the region.</p>
            </div>
        </div>

        <!-- Card 2: Responsible Recycling -->
        <div class="col-12 col-sm-6 col-xl-3 reveal-on-scroll delay-200">
            <div class="feature-card d-flex flex-column">
                <div class="feature-icon shadow-sm">
                    <i class="fa-solid fa-recycle"></i>
                </div>
                <h2 class="feature-title">Responsible Recycling</h2>
                <p class="feature-desc">Environmentally sound recycling through certified and NEMA-approved processes.</p>
            </div>
        </div>

        <!-- Card 3: Data Security -->
        <div class="col-12 col-sm-6 col-xl-3 reveal-on-scroll delay-300">
            <div class="feature-card d-flex flex-column">
                <div class="feature-icon shadow-sm">
                    <i class="fa-solid fa-shield-halved"></i>
                </div>
                <h2 class="feature-title">Data Security</h2>
                <p class="feature-desc">Secure data destruction for all data-bearing devices and enterprise IT equipment.</p>
            </div>
        </div>

        <!-- Card 4: Environmental Impact -->
        <div class="col-12 col-sm-6 col-xl-3 reveal-on-scroll delay-400">
            <div class="feature-card d-flex flex-column">
                <div class="feature-icon shadow-sm">
                    <i class="fa-solid fa-leaf"></i>
                </div>
                <h2 class="feature-title">Environmental Impact</h2>
                <p class="feature-desc">Reducing landfill, conserving scarce resources and protecting our delicate ecosystem.</p>
            </div>
        </div>
    </div>
</section>

<!-- ==========================================================================
     3. OUR SERVICES SECTION
     ========================================================================== -->
<section class="services-section py-5 my-3" id="services-overview">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">What We Offer</span>
            <h2 class="section-title section-title-center mb-3">Our Services</h2>
            <p class="text-muted max-w-2xl mx-auto font-sm">
                Comprehensive, secure, and environmentally compliant end-to-end e-waste management services tailored for enterprises, institutions, and communities.
            </p>
        </div>

        <div class="row g-4 justify-content-center">
            <?php
            // Array of core services matching the uploaded homepage layout
            $services = [
                [
                    'icon' => 'fa-solid fa-truck-ramp-box',
                    'title' => 'E-Waste Collection',
                    'desc' => 'Scheduled pickups and one-off collections for all types of electrical and electronic waste with full chain-of-custody tracking.',
                    'link' => 'services.php#collection'
                ],
                [
                    'icon' => 'fa-solid fa-lock',
                    'title' => 'Data Destruction',
                    'desc' => 'Secure and certified data erasure and physical shredding of sensitive hard drives, SSDs, and corporate storage media.',
                    'link' => 'services.php#destruction'
                ],
                [
                    'icon' => 'fa-solid fa-graduation-cap',
                    'title' => 'Training & Capacity Building',
                    'desc' => 'Professional training programs, institutional sensitization, and awareness sessions on e-waste management and ESG compliance.',
                    'link' => 'services.php#training'
                ],
                [
                    'icon' => 'fa-solid fa-file-shield',
                    'title' => 'EPR Compliance',
                    'desc' => 'Supporting businesses and electronics manufacturers in meeting their Extended Producer Responsibility (EPR) statutory obligations.',
                    'link' => 'services.php#epr'
                ]
            ];

            foreach ($services as $index => $svc):
            ?>
            <div class="col-12 col-md-6 col-lg-3 reveal-on-scroll delay-<?= ($index + 1) * 100; ?>">
                <div class="service-card shadow-sm h-100">
                    <div>
                        <div class="service-icon-circle shadow-sm">
                            <i class="<?= $svc['icon']; ?>"></i>
                        </div>
                        <h3 class="fw-bold text-dark-green"><?= htmlspecialchars($svc['title']); ?></h3>
                        <p><?= htmlspecialchars($svc['desc']); ?></p>
                    </div>
                    <a href="<?= $svc['link']; ?>" class="btn-link-green mt-3">
                        Learn More <i class="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ==========================================================================
     4. HOW IT WORKS
     ========================================================================== -->
<section class="process-section py-5">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">How it Works</span>
            <h2 class="section-title section-title-center mb-3">A Seamless E-Waste Journey</h2>
            <p class="text-muted max-w-2xl mx-auto font-sm">
                From collection to certified recycling, our process is designed for transparency, security and measurable environmental benefit.
            </p>
        </div>
        <div class="row g-4">
            <?php
            $steps = [
                ['icon' => 'fa-solid fa-calendar-check', 'title' => 'Book a Pickup', 'desc' => 'Schedule secure collection from your office, school or home with just a few details.' ],
                ['icon' => 'fa-solid fa-magnifying-glass', 'title' => 'Site Audit', 'desc' => 'We assess your e-waste volume and provide a compliant handling plan before we arrive.' ],
                ['icon' => 'fa-solid fa-shield-halved', 'title' => 'Secure Handling', 'desc' => 'All devices are collected, transported and processed under NEMA-regulated controls.' ],
                ['icon' => 'fa-solid fa-recycle', 'title' => 'Responsible Recovery', 'desc' => 'Hazardous components are neutralized and materials are recovered for circular reuse.' ],
            ];
            foreach ($steps as $index => $step):
            ?>
            <div class="col-12 col-md-6 col-lg-3 reveal-on-scroll delay-<?= ($index + 1) * 100; ?>">
                <div class="feature-card h-100 text-center">
                    <div class="feature-icon shadow-sm mb-3">
                        <i class="<?= $step['icon']; ?>"></i>
                    </div>
                    <h3 class="feature-title"><?= htmlspecialchars($step['title']); ?></h3>
                    <p class="feature-desc"><?= htmlspecialchars($step['desc']); ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ==========================================================================
     5. OUR IMPACT SECTION (Statistics)
     ========================================================================== -->
<section class="impact-section my-5" id="impact">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Measurable Change</span>
            <h2 class="section-title section-title-center mb-3">Our Impact</h2>
            <p class="text-muted max-w-2xl mx-auto font-sm">
                Driven by passion for environmental sustainability and circular economy across Kenya and East Africa.
            </p>
        </div>

        <div class="row g-4 justify-content-center align-items-center">
            <!-- Stat 1 -->
            <div class="col-6 col-md-4 col-lg reveal-on-scroll delay-100">
                <div class="stat-item">
                    <div class="stat-icon shadow-sm"><i class="fa-solid fa-leaf"></i></div>
                    <div class="stat-number" data-count="12500" data-suffix="+">0+</div>
                    <div class="stat-label">Tonnes of E-waste<br>Collected</div>
                </div>
            </div>

            <!-- Stat 2 -->
            <div class="col-6 col-md-4 col-lg reveal-on-scroll delay-200">
                <div class="stat-item">
                    <div class="stat-icon shadow-sm"><i class="fa-solid fa-recycle"></i></div>
                    <div class="stat-number" data-count="9800" data-suffix="+">0+</div>
                    <div class="stat-label">Tonnes Recycled<br>Responsibly</div>
                </div>
            </div>

            <!-- Stat 3 -->
            <div class="col-6 col-md-4 col-lg reveal-on-scroll delay-300">
                <div class="stat-item">
                    <div class="stat-icon shadow-sm"><i class="fa-solid fa-cloud"></i></div>
                    <div class="stat-number" data-count="18600" data-suffix="+">0+</div>
                    <div class="stat-label">Tonnes of CO₂<br>Emissions Avoided</div>
                </div>
            </div>

            <!-- Stat 4 -->
            <div class="col-6 col-md-4 col-lg reveal-on-scroll delay-400">
                <div class="stat-item">
                    <div class="stat-icon shadow-sm"><i class="fa-solid fa-users"></i></div>
                    <div class="stat-number" data-count="250" data-suffix="+">0+</div>
                    <div class="stat-label">Partner<br>Organizations</div>
                </div>
            </div>

            <!-- Stat 5 -->
            <div class="col-12 col-md-4 col-lg reveal-on-scroll delay-100">
                <div class="stat-item">
                    <div class="stat-icon shadow-sm"><i class="fa-solid fa-shield-check"></i></div>
                    <div class="stat-number" data-count="100" data-suffix="%">0%</div>
                    <div class="stat-label">Commitment to a<br>Greener Future</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ==========================================================================
     6. SUSTAINABILITY SNAPSHOT
     ========================================================================== -->
<section class="snapshot-section py-5 bg-light">
    <div class="container">
        <div class="row g-4 align-items-center">
            <div class="col-lg-7 reveal-on-scroll">
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Sustainability Snapshot</span>
                <h2 class="section-title mb-4">Driving Circular Impact Across East Africa</h2>
                <p class="text-muted max-w-2xl font-sm mb-4">
                    Our certified recycling process not only safely removes hazardous waste from the economy, but also returns valuable raw materials back into manufacturing streams.
                </p>
                <div class="row g-3">
                    <div class="col-sm-6">
                        <div class="feature-card h-100 p-4">
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <span class="badge bg-success text-white rounded-circle p-3"><i class="fa-solid fa-seedling"></i></span>
                                <div>
                                    <h3 class="h5 mb-1">3,450+</h3>
                                    <p class="font-sm text-muted mb-0">Tonnes of e-waste diverted from landfill</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="feature-card h-100 p-4">
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <span class="badge bg-success text-white rounded-circle p-3"><i class="fa-solid fa-users"></i></span>
                                <div>
                                    <h3 class="h5 mb-1">650+</h3>
                                    <p class="font-sm text-muted mb-0">Youth and informal technicians trained</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5 reveal-on-scroll delay-200">
                <div class="card border-0 shadow-sm overflow-hidden rounded-4">
                    <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80" alt="Recycling success story" class="img-fluid">
                    <div class="p-4 bg-white">
                        <h3 class="fw-bold text-dark-green mb-3">Success Story: Nairobi Corporate ITAD</h3>
                        <p class="text-muted font-sm mb-3">A leading Nairobi fintech partner trusted WEEE Centre to securely dispose of 1,200 legacy workstations, achieving full NEMA compliance and zero data exposure.</p>
                        <a href="contact.php" class="btn btn-outline-success rounded-pill px-4 py-2">Start Your Project</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ==========================================================================
     5. FEATURED PROJECTS SECTION
     ========================================================================== -->
<section class="projects-section py-5 my-4" id="projects">
    <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 reveal-on-scroll">
            <div>
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Recent Initiatives</span>
                <h2 class="section-title mb-0">Featured Projects</h2>
            </div>
            <div class="mt-3 mt-md-0">
                <a href="projects.php" class="btn-link-green fs-6">
                    View All Projects <i class="fa-solid fa-arrow-right ms-2"></i>
                </a>
            </div>
        </div>

        <div class="row g-4 justify-content-center">
            <?php
            // Array of featured projects matching the uploaded design
            $projects = [
                [
                    'img' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80',
                    'badge' => 'Collection Drive',
                    'title' => 'E-Waste Collection Drive',
                    'desc' => 'Nationwide collection initiative in schools, corporate offices and local communities across Nairobi and Mombasa.',
                    'link' => 'projects.php#drive'
                ],
                [
                    'img' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
                    'badge' => 'Data Erasure',
                    'title' => 'Secure Data Destruction Project',
                    'desc' => 'On-site mobile data destruction and hard drive shredding for financial institutions and corporate clients across Kenya.',
                    'link' => 'projects.php#data'
                ],
                [
                    'img' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
                    'badge' => 'Community Training',
                    'title' => 'E-Waste Awareness Program',
                    'desc' => 'Community sensitization, youth workshops, and grassroots training on responsible e-waste disposal and recycling benefits.',
                    'link' => 'projects.php#awareness'
                ],
                [
                    'img' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
                    'badge' => 'Material Recovery',
                    'title' => 'Recycling & Recovery Initiative',
                    'desc' => 'Recovering valuable metals and precious raw materials while safely neutralizing toxic components to reduce environmental impact.',
                    'link' => 'projects.php#recovery'
                ]
            ];

            foreach ($projects as $index => $proj):
            ?>
            <div class="col-12 col-md-6 col-lg-3 reveal-on-scroll delay-<?= ($index + 1) * 100; ?>">
                <div class="project-card shadow-sm">
                    <div class="project-img-wrapper">
                        <span class="project-badge shadow-sm"><?= htmlspecialchars($proj['badge']); ?></span>
                        <img src="<?= $proj['img']; ?>" alt="<?= htmlspecialchars($proj['title']); ?>" loading="lazy">
                    </div>
                    <div class="project-body">
                        <div>
                            <h3 class="project-title"><?= htmlspecialchars($proj['title']); ?></h3>
                            <p class="project-desc"><?= htmlspecialchars($proj['desc']); ?></p>
                        </div>
                        <a href="<?= $proj['link']; ?>" class="btn-link-green mt-2">
                            Read More <i class="fa-solid fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ==========================================================================
     6. OUR PARTNERS SECTION
     ========================================================================== -->
<?php
require_once 'includes/db.php';
$reviews = [];
try {
    $stmt = $pdo->query("SELECT * FROM client_reviews WHERE rating >= 4 ORDER BY created_at DESC LIMIT 6");
    $reviews = $stmt->fetchAll();
} catch (Exception $e) {
    $reviews = [];
}
?>

<!-- ==========================================================================
     CLIENT REVIEWS / TESTIMONIALS
     ========================================================================== -->
<?php if (!empty($reviews)): ?>
<section class="testimonials-section py-5" id="testimonials">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4 reveal-on-scroll">
            <div>
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Client Testimonials</span>
                <h2 class="section-title section-title-center mb-3">What Our Clients Say</h2>
                <p class="text-muted max-w-2xl mx-auto font-sm">Selected feedback from corporate partners, government bodies and community projects we've supported.</p>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" id="testiPrevBtn" aria-label="Previous testimonial" style="width: 38px; height: 38px;">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" id="testiNextBtn" aria-label="Next testimonial" style="width: 38px; height: 38px;">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="d-flex overflow-hidden py-3" id="testimonialCarouselTrack" style="scroll-behavior: smooth; gap: 1.25rem;">
            <?php foreach ($reviews as $rev): ?>
            <div class="testimonial-slide flex-shrink-0" style="min-width: 320px; max-width: 360px;">
                <div class="review-card p-4 h-100 shadow-sm bg-white rounded-4">
                    <div class="d-flex align-items-start gap-3 mb-3">
                        <img src="<?= htmlspecialchars($rev['photo']); ?>" alt="<?= htmlspecialchars($rev['client_name']); ?>" class="review-avatar">
                        <div>
                            <div class="fw-bold mb-1"><?= htmlspecialchars($rev['client_name']); ?></div>
                            <div class="font-xs text-muted mb-1"><?= htmlspecialchars($rev['company']); ?></div>
                            <div>
                                <?php for ($s=1;$s<=5;$s++): ?>
                                    <?php if ($s <= intval($rev['rating'])): ?>
                                        <i class="fa-solid fa-star text-warning"></i>
                                    <?php else: ?>
                                        <i class="fa-regular fa-star text-muted"></i>
                                    <?php endif; ?>
                                <?php endfor; ?>
                            </div>
                        </div>
                    </div>
                    <p class="text-muted mb-0"><?= htmlspecialchars($rev['review_text']); ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<section class="partners-section border-top border-bottom py-5 bg-light bg-opacity-50" id="partners">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4 reveal-on-scroll">
            <div>
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Collaborative Network</span>
                <h2 class="section-title mb-0">Our Partners</h2>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" id="partnerPrevBtn" aria-label="Previous partners" style="width: 38px; height: 38px;">
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" id="partnerNextBtn" aria-label="Next partners" style="width: 38px; height: 38px;">
                    <i class="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="d-flex overflow-hidden py-3" id="partnerCarouselTrack" style="scroll-behavior: smooth; gap: 1.5rem;">
            <?php
            // Partner organizations matching uploaded design: UNEP, KEBS, NEMA, Safaricom, ISOCERT, PCS
            $partners = [
                ['name' => 'UNEP (United Nations Environment Programme)', 'icon' => 'fa-solid fa-globe', 'label' => 'UNEP Environment'],
                ['name' => 'KEBS (Kenya Bureau of Standards)', 'icon' => 'fa-solid fa-stamp', 'label' => 'KEBS Certified'],
                ['name' => 'NEMA Kenya', 'icon' => 'fa-solid fa-shield-halved', 'label' => 'NEMA Approved'],
                ['name' => 'Safaricom Twaweza', 'icon' => 'fa-solid fa-signal', 'label' => 'Safaricom Twaweza'],
                ['name' => 'ISOCERT ISO 9001:2015', 'icon' => 'fa-solid fa-certificate', 'label' => 'ISOCERT 9001:2015'],
                ['name' => 'PCS Powering Industry', 'icon' => 'fa-solid fa-bolt', 'label' => 'PCS Industry']
            ];

            foreach ($partners as $ptr):
            ?>
            <div class="partner-logo-box bg-white rounded-3 shadow-sm border border-secondary border-opacity-10 flex-shrink-0 d-flex align-items-center justify-content-center px-4 py-3" style="min-width: 190px;">
                <div class="d-flex align-items-center gap-2 text-dark-green fw-bold font-sm">
                    <i class="<?= $ptr['icon']; ?> fs-4 text-success"></i>
                    <span><?= htmlspecialchars($ptr['label']); ?></span>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- ==========================================================================
     7. CALL TO ACTION BANNER
     ========================================================================== -->
<section class="cta-banner py-5 bg-primary-green text-white position-relative overflow-hidden">
    <div class="container py-4 text-center position-relative z-2">
        <h2 class="text-white fw-bold mb-3">Ready to Dispose of Your E-Waste Responsibly?</h2>
        <p class="text-light max-w-2xl mx-auto mb-4 font-sm opacity-90">
            Partner with East Africa’s leading certified e-waste manager. Whether you have corporate IT scrap, household electronics, or need certified data destruction, we are here to help.
        </p>
        <div class="d-flex justify-content-center gap-3">
            <a href="contact.php?action=dispose" class="btn btn-light text-dark-green fw-bold rounded-pill px-5 py-3 shadow">
                Schedule a Pickup <i class="fa-solid fa-calendar-check ms-2 text-success"></i>
            </a>
            <a href="contact.php" class="btn btn-outline-light fw-semibold rounded-pill px-4 py-3">
                Contact Our Team
            </a>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>