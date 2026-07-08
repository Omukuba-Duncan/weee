<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'About Us | WEEE Centre Kenya & East Africa';
$currentPage = 'about';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Page-specific styles for about page interactivity and staff filters
?>
<style>
    .staff-photo { object-fit: cover; object-position: center; }
    .staff-card-small .card-body { padding: 1.35rem; }
    .staff-card-small .position-relative { height: 220px; }
    .staff-filter-btn.active { background-color: #1d7d44; color: #fff; border-color: #1d7d44; }
    .vision-mission-overlay { display: none; position: fixed; inset: 0; z-index: 1055; background: rgba(0,0,0,.55); justify-content: center; align-items: center; padding: 1rem; }
    .vision-mission-overlay.open { display: flex; }
    .vision-mission-card { max-width: 560px; width: 100%; background: #fff; border-radius: 1rem; box-shadow: 0 18px 50px rgba(0,0,0,.18); overflow: hidden; }
    .vision-mission-header { padding: 1.5rem 1.75rem; background: #0f462b; color: #fff; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
    .vision-mission-body { padding: 1.5rem 1.75rem; color: #212529; line-height: 1.75; }
    .vision-mission-close { border: none; background: transparent; color: #fff; font-size: 1.1rem; line-height: 1; cursor: pointer; }
    .vision-mission-btn { min-width: 130px; }
    .timeline {
        border-left: 2px solid #d6e8d2;
        padding-left: 1.5rem;
    }
    .timeline .badge {
        box-shadow: 0 16px 30px rgba(0,0,0,.08);
    }
    .timeline h5 { margin-bottom: .35rem; }
    .timeline p { margin-bottom: 0; }
    .brochure-card {
        transition: transform .25s ease, box-shadow .25s ease;
    }
    .brochure-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 22px 45px rgba(0,0,0,.1);
    }
</style>
<?php

// Fetch staff team members from MySQL database
$staffStmt = $pdo->query("SELECT * FROM staff_members ORDER BY department ASC, name ASC");
$staffMembers = $staffStmt->fetchAll();

// Build department filter buttons from admin-managed staff departments
$departmentStmt = $pdo->query("SELECT DISTINCT department FROM staff_members ORDER BY department ASC");
$departments = $departmentStmt->fetchAll(PDO::FETCH_COLUMN);

try {
    $resStmt = $pdo->query("SELECT * FROM download_resources WHERE status = 'active' ORDER BY created_at DESC");
    $resourcesList = $resStmt->fetchAll();
} catch (Exception $e) {
    $resourcesList = [];
}
$brochure = $resourcesList[0] ?? [
    'id' => 'epr_2024',
    'title' => 'WEEE Centre Corporate Brochure',
    'description' => 'A concise overview of WEEE Centre operations, compliance, and sustainability services.',
    'type' => 'Company Overview',
    'file_name' => 'WEEE_Centre_Brochure.pdf'
];
?>
<section class="py-5 bg-light">
    <div class="container py-5">
        <div class="row align-items-center g-5">
            <div class="col-lg-6">
                <span class="badge bg-success text-white px-3 py-1 rounded-pill mb-2">Our Story</span>
                <h1 class="fw-bold mb-4">Pioneering E-Waste Recycling in East Africa</h1>
                <p class="lead text-muted">Founded in Nairobi, WEEE Centre (Waste Electrical and Electronic Equipment Centre) operates Kenya's premier NEMA-licensed recycling facility.</p>
                <p>We provide end-to-end IT asset disposal (ITAD), certified data erasure, and circular economy material recovery for businesses, governments, and NGOs.</p>
                <div class="mt-4 d-flex gap-3 flex-wrap">
                    <button type="button" class="btn btn-success fw-bold rounded-pill px-4 py-2 vision-mission-btn" data-role="vision">Our Vision</button>
                    <button type="button" class="btn btn-outline-success fw-bold rounded-pill px-4 py-2 vision-mission-btn" data-role="mission">Our Mission</button>
                </div>
            </div>
            <div class="col-lg-6">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" class="img-fluid rounded-4 shadow-lg" alt="WEEE Centre Team">
            </div>
        </div>
    </div>
</section>

<!-- Impact, Video & Timeline Section -->
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <span class="text-uppercase font-xs fw-bold text-success mb-2 d-block">Operational Impact</span>
            <h2 class="fw-bold text-dark-green">How WEEE Centre Delivers Value</h2>
            <p class="text-muted">A trusted partner for safe e-waste reclamation, corporate compliance and measurable environmental outcomes.</p>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                    <div class="mb-3 text-success fs-2"><i class="fa-solid fa-recycle"></i></div>
                    <h5 class="fw-bold text-dark-green">Circular Operations</h5>
                    <p class="text-muted mb-0">Collecting, sorting and recycling electronics into reusable materials and secure asset recovery.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                    <div class="mb-3 text-success fs-2"><i class="fa-solid fa-shield-check"></i></div>
                    <h5 class="fw-bold text-dark-green">Certified Security</h5>
                    <p class="text-muted mb-0">Secure data destruction, chain-of-custody documentation and NEMA/ISO compliant processing.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                    <div class="mb-3 text-success fs-2"><i class="fa-solid fa-users"></i></div>
                    <h5 class="fw-bold text-dark-green">Community Impact</h5>
                    <p class="text-muted mb-0">Supporting training, local jobs and safe disposal practices across Kenya and East Africa.</p>
                </div>
            </div>
        </div>

        <div class="row g-4 align-items-center">
            <div class="col-lg-7">
                <div class="row g-3">
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white text-center">
                            <div class="fw-bold fs-2 text-success">3,450+</div>
                            <p class="mb-0 text-muted">Tonnes of e-waste recycled</p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white text-center">
                            <div class="fw-bold fs-2 text-success">250+</div>
                            <p class="mb-0 text-muted">Corporate and institutional clients</p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white text-center">
                            <div class="fw-bold fs-2 text-success">18,600+</div>
                            <p class="mb-0 text-muted">Tonnes CO₂ emissions avoided</p>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white text-center">
                            <div class="fw-bold fs-2 text-success">8+</div>
                            <p class="mb-0 text-muted">Years of specialized recycling operations</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="ratio ratio-16x9 rounded-4 overflow-hidden shadow-sm">
                    <video controls poster="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=900&q=80" style="width:100%; height:100%; object-fit:cover;">
                        <source src="assets/video/company-operations.mp4" type="video/mp4">
                        Your browser does not support the video tag. Visit our office for a live tour.
                    </video>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <h3 class="fw-bold text-dark-green mb-3">Our Journey</h3>
            <div class="timeline">
                <div class="d-flex gap-3 mb-4 align-items-start">
                    <span class="badge bg-success text-white rounded-circle p-3" style="min-width:54px; min-height:54px;">2018</span>
                    <div>
                        <h5 class="mb-1">Founded in Nairobi</h5>
                        <p class="text-muted mb-0">Begun with a mission to provide secure, compliant e-waste collection and recycling for Kenyan businesses.</p>
                    </div>
                </div>
                <div class="d-flex gap-3 mb-4 align-items-start">
                    <span class="badge bg-success text-white rounded-circle p-3" style="min-width:54px; min-height:54px;">2020</span>
                    <div>
                        <h5 class="mb-1">Expanded regional operations</h5>
                        <p class="text-muted mb-0">Opened logistics and recycling coverage for Mombasa, Kisumu and major East African hubs.</p>
                    </div>
                </div>
                <div class="d-flex gap-3 mb-4 align-items-start">
                    <span class="badge bg-success text-white rounded-circle p-3" style="min-width:54px; min-height:54px;">2023</span>
                    <div>
                        <h5 class="mb-1">Certified data destruction services</h5>
                        <p class="text-muted mb-0">Introduced secure data sanitization, degaussing and destruction for banking and government clients.</p>
                    </div>
                </div>
                <div class="d-flex gap-3 align-items-start">
                    <span class="badge bg-success text-white rounded-circle p-3" style="min-width:54px; min-height:54px;">2026</span>
                    <div>
                        <h5 class="mb-1">Partnered with major institutions</h5>
                        <p class="text-muted mb-0">Supporting sustainable projects, compliance programs and circular economy partnerships across the region.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Vision & Mission Popup Overlay -->
<div class="vision-mission-overlay" id="visionMissionOverlay">
    <div class="vision-mission-card">
        <div class="vision-mission-header">
            <div>
                <h4 class="mb-1" id="visionMissionTitle">Our Vision</h4>
                <p class="mb-0 text-white-75" id="visionMissionSubtitle">A cleaner, safer East Africa through responsible e-waste leadership.</p>
            </div>
            <button type="button" class="vision-mission-close" id="visionMissionClose" aria-label="Close popup">✕</button>
        </div>
        <div class="vision-mission-body" id="visionMissionBody">
            <p><strong>Vision:</strong> To transform electronic waste into valuable resources while protecting communities and natural ecosystems across Kenya and East Africa.</p>
            <p><strong>Mission:</strong> Deliver safe, certified, and transparent e-waste collection, recycling, refurbishment and data destruction services that support circular economy goals and compliance with environmental regulations.</p>
        </div>
    </div>
</div>

<!-- NEMA & ISO Certifications Section -->
<section class="py-5 bg-white" id="licenses-standards">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill mb-2">Certified Compliance</span>
            <h2 class="fw-bold text-dark-green">Our Licensure & Standards</h2>
            <p class="text-muted">We operate strictly under national and international environmental frameworks.</p>
        </div>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-certificate"></i></div>
                    <h5 class="fw-bold text-dark-green">ISO 9001:2015 Certified</h5>
                    <p class="text-muted font-sm mb-0">International Standard for Quality Management Systems, ensuring consistent, high-quality recycling processes.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-shield-halved"></i></div>
                    <h5 class="fw-bold text-dark-green">NEMA Licensed Recycler</h5>
                    <p class="text-muted font-sm mb-0">Fully licensed by the National Environment Management Authority of Kenya for hazardous and non-hazardous e-waste.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-handshake-simple"></i></div>
                    <h5 class="fw-bold text-dark-green">StEP Initiative Member</h5>
                    <p class="text-muted font-sm mb-0">Active member of the global Solving the E-waste Problem (StEP) initiative hosted by United Nations University.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Leadership & Technical Staff Team Section -->
<section class="py-5 bg-light" id="team">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <span class="text-uppercase font-xs fw-bold text-success mb-2 d-block">The People Behind The Green Mission</span>
            <h2 class="fw-bold text-dark-green mb-3">Our Leadership & Technical Team</h2>
            <p class="text-muted font-sm">
                Meet our certified environmental engineers, logistics coordinators, and executive leadership steering East Africa towards zero e-waste landfills.
            </p>
        </div>

        <div class="row g-4 justify-content-center mb-4">
            <div class="col-12">
                <div class="d-flex flex-wrap gap-2 justify-content-center">
                    <button type="button" class="btn btn-outline-success btn-sm rounded-pill staff-filter-btn active" data-filter="all">All Departments</button>
                    <?php foreach ($departments as $department): ?>
                        <button type="button" class="btn btn-outline-success btn-sm rounded-pill staff-filter-btn" data-filter="<?= h($department); ?>"><?= h($department); ?></button>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
        <div class="row g-4 justify-content-center" id="staffGrid">
            <?php if (empty($staffMembers)): ?>
            <div class="col-12">
                <div class="card border-0 rounded-4 shadow-sm p-4 p-md-5 text-center bg-white">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-users-slash"></i></div>
                    <h4 class="fw-bold text-dark-green mb-2">Our team roster is being updated</h4>
                    <p class="text-muted mb-0">Please check back soon for the latest leadership and technical team profiles.</p>
                </div>
            </div>
            <?php else: ?>
            <?php foreach ($staffMembers as $staff): ?>
            <div class="col-12 col-sm-6 col-lg-4 staff-card-small" data-department="<?= h($staff['department']); ?>">
                <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 bg-white">
                    <div class="position-relative" style="height: 220px; overflow: hidden;">
                        <img src="<?= h($staff['photo']); ?>" alt="<?= h($staff['name']); ?>" class="w-100 h-100 staff-photo" style="min-height: 220px;">
                        <?php 
                            $statusClass = 'bg-secondary text-white';
                            if (($staff['status'] ?? '') === 'Active') $statusClass = 'bg-success text-white';
                            if (($staff['status'] ?? '') === 'Field Deployment') $statusClass = 'bg-warning text-dark';
                        ?>
                        <span class="position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 font-xs shadow-sm <?= $statusClass; ?>">
                            <i class="fa-solid fa-circle me-1" style="font-size: 8px;"></i> <?= h($staff['status']); ?>
                        </span>
                    </div>
                    <div class="card-body p-4">
                        <span class="badge bg-light text-success border border-success-subtle mb-2 font-xs"><?= h($staff['department']); ?></span>
                        <h4 class="fw-bold fs-5 text-dark-green mb-1"><?= h($staff['name']); ?></h4>
                        <p class="text-muted font-sm fw-semibold mb-3"><?= h($staff['role']); ?></p>
                        <hr class="my-3 opacity-10">
                        <div class="d-flex flex-column gap-2 font-xs text-muted">
                            <div><i class="fa-solid fa-envelope me-2 text-success"></i><a href="mailto:<?= h($staff['email']); ?>" class="text-decoration-none text-muted"><?= h($staff['email']); ?></a></div>
                            <div><i class="fa-solid fa-phone me-2 text-success"></i><?= h($staff['phone']); ?></div>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <div class="text-center mt-4" id="staffEmptyState" style="display: none;">
            <div class="card border-0 rounded-4 shadow-sm p-4 bg-white d-inline-block">
                <div class="text-success fs-2 mb-2"><i class="fa-solid fa-magnifying-glass"></i></div>
                <h5 class="fw-bold text-dark-green mb-1">No team members match this filter</h5>
                <p class="text-muted mb-0">Try another department to view more team profiles.</p>
            </div>
        </div>
    </div>
</section>

<!-- Resources & Education Hub -->
<section class="py-5 bg-white" id="resources">
    <div class="container py-4">
        <div class="row g-4 align-items-center">
            <div class="col-lg-7">
                <span class="text-uppercase font-xs fw-bold text-success mb-2 d-block">Company Brochure</span>
                <h2 class="fw-bold text-dark-green mb-3">Download Our Corporate Brochure</h2>
                <p class="text-muted mb-4">Get a polished overview of WEEE Centre’s services, certifications, environmental impact and partner commitment in one downloadable document.</p>
                <ul class="list-unstyled text-muted mb-4">
                    <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i>Overview of e-waste collection & recycling solutions</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i>Compliance, certifications and secure disposal practices</li>
                    <li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i>Case highlights, client benefits and service capabilities</li>
                </ul>
                <div class="d-flex flex-column flex-sm-row gap-3">
                    <a href="api/download_resource.php?file=<?= h($brochure['id']); ?>" download="<?= h($brochure['file_name']); ?>" class="btn btn-success rounded-pill px-4 py-2 shadow-sm">
                        <i class="fa-solid fa-file-pdf me-2"></i>Download Brochure
                    </a>
                </div>
                <div class="d-flex flex-column flex-sm-row gap-2 mt-3">
                    <a href="tel:0768449499" class="btn btn-outline-success rounded-pill px-3 py-2 shadow-sm">
                        <i class="fa-solid fa-phone me-2"></i>Call
                    </a>
                    <a href="https://wa.me/254101016136" target="_blank" rel="noopener noreferrer" class="btn btn-outline-success rounded-pill px-3 py-2 shadow-sm">
                        <i class="fa-brands fa-whatsapp me-2"></i>WhatsApp
                    </a>
                    <a href="mailto:malaladuncan1@gmail.com" class="btn btn-outline-success rounded-pill px-3 py-2 shadow-sm">
                        <i class="fa-solid fa-envelope me-2"></i>Email
                    </a>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card brochure-card border-0 rounded-4 shadow-sm h-100 p-4 bg-light">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h5 class="fw-bold text-dark-green mb-1">WEEE Centre Brochure</h5>
                            <p class="text-muted mb-0">Instant access to our mission-driven services and compliance story.</p>
                        </div>
                        <div class="text-success fs-3"><i class="fa-solid fa-book-open-reader"></i></div>
                    </div>
                    <div class="bg-white rounded-4 p-4 shadow-sm">
                        <div class="mb-3">
                            <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill">PDF • Company Overview</span>
                        </div>
                        <div class="mb-3">
                            <strong class="d-block text-dark-green mb-1"><?= h($brochure['title']); ?></strong>
                            <p class="text-muted mb-0"><?= h($brochure['description'] ?? 'A comprehensive corporate brochure for partners and stakeholders.'); ?></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center pt-3 border-top border-success border-opacity-10">
                            <span class="text-muted font-xs"><i class="fa-solid fa-calendar-days me-2 text-success"></i>Updated recently</span>
                            <a href="api/download_resource.php?file=<?= h($brochure['id']); ?>" download="<?= h($brochure['file_name']); ?>" class="btn btn-outline-success btn-sm rounded-pill px-3 py-2">
                                Download Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>
<script>
    const overlay = document.getElementById('visionMissionOverlay');
    const closeBtn = document.getElementById('visionMissionClose');
    const buttons = document.querySelectorAll('.vision-mission-btn');
    const titleEl = document.getElementById('visionMissionTitle');
    const subtitleEl = document.getElementById('visionMissionSubtitle');
    const bodyEl = document.getElementById('visionMissionBody');

    const content = {
        vision: {
            title: 'Our Vision',
            subtitle: 'A cleaner, safer East Africa through responsible e-waste leadership.',
            body: '<p>To transform electronic waste into valuable resources while protecting communities and natural ecosystems across Kenya and East Africa.</p>'
        },
        mission: {
            title: 'Our Mission',
            subtitle: 'Delivering safe recycling for people, business, and the planet.',
            body: '<p>Provide safe, certified, and transparent e-waste collection, recycling, refurbishment and data destruction services that support circular economy goals and meet environmental compliance requirements.</p>'
        }
    };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.getAttribute('data-role');
            const data = content[role] || content.vision;
            titleEl.innerText = data.title;
            subtitleEl.innerText = data.subtitle;
            bodyEl.innerHTML = data.body;
            overlay.classList.add('open');
        });
    });

    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.classList.remove('open');
        }
    });

    const filterButtons = document.querySelectorAll('.staff-filter-btn');
    const staffCards = document.querySelectorAll('.staff-card-small');
    const staffEmptyState = document.getElementById('staffEmptyState');

    const updateStaffVisibility = (filter) => {
        let visibleCount = 0;

        staffCards.forEach(card => {
            const department = card.getAttribute('data-department');
            const shouldShow = filter === 'all' || department === filter;
            card.style.display = shouldShow ? '' : 'none';
            if (shouldShow) visibleCount += 1;
        });

        if (staffEmptyState) {
            staffEmptyState.style.display = visibleCount === 0 ? '' : 'none';
        }
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            updateStaffVisibility(filter);
        });
    });

    updateStaffVisibility('all');
</script>