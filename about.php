<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'About Us | WEEE Centre Kenya & East Africa';
$currentPage = 'about';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Fetch staff team members from MySQL database
$staffStmt = $pdo->query("SELECT * FROM staff_members ORDER BY id ASC");
$staffMembers = $staffStmt->fetchAll();
?>
<section class="py-5 bg-light">
    <div class="container py-5">
        <div class="row align-items-center g-5">
            <div class="col-lg-6">
                <span class="badge bg-success text-white px-3 py-1 rounded-pill mb-2">Our Story</span>
                <h1 class="fw-bold mb-4">Pioneering E-Waste Recycling in East Africa</h1>
                <p class="lead text-muted">Founded in Nairobi, WEEE Centre (Waste Electrical and Electronic Equipment Centre) operates Kenya's premier NEMA-licensed recycling facility.</p>
                <p>We provide end-to-end IT asset disposal (ITAD), certified data erasure, and circular economy material recovery for businesses, governments, and NGOs.</p>
                <div class="mt-4 d-flex gap-3">
                    <a href="contact.php" class="btn btn-success fw-bold rounded-pill px-4 py-2">Partner With Us</a>
                    <a href="admin/index.php" class="btn btn-outline-dark fw-bold rounded-pill px-4 py-2">🛡️ Admin CMS</a>
                </div>
            </div>
            <div class="col-lg-6">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" class="img-fluid rounded-4 shadow-lg" alt="WEEE Centre Team">
            </div>
        </div>
    </div>
</section>

<!-- NEMA & ISO Certifications Section -->
<section class="py-5 bg-white">
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

        <div class="row g-4 justify-content-center">
            <?php foreach ($staffMembers as $staff): ?>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 bg-white">
                    <div class="position-relative" style="height: 280px; overflow: hidden;">
                        <img src="<?= h($staff['photo']); ?>" alt="<?= h($staff['name']); ?>" class="w-100 h-100" style="object-fit: cover;">
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
        </div>
    </div>
</section>

<!-- Resources & Education Hub -->
<section class="py-5 bg-white" id="resources">
    <div class="container py-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
                <span class="text-uppercase font-xs fw-bold text-success mb-1 d-block">Knowledge Hub</span>
                <h2 class="fw-bold text-dark-green mb-0">E-Waste Resources & Guidelines</h2>
            </div>
            <a href="contact.php" class="btn btn-outline-success rounded-pill px-4 py-2 font-sm mt-3 mt-md-0">Request Custom Report</a>
        </div>

        <div class="row g-4">
            <?php
            $resourcesList = [
                [
                    'id' => 'epr_2024',
                    'title' => 'Kenya E-Waste EPR Guidelines 2024',
                    'type' => 'PDF Document • 4.2 MB',
                    'icon' => 'fa-solid fa-file-pdf',
                    'filename' => 'Kenya_E-Waste_EPR_Guidelines_2024.doc'
                ],
                [
                    'id' => 'data_standard',
                    'title' => 'Corporate Data Destruction Standard',
                    'type' => 'PDF Guide • 2.1 MB',
                    'icon' => 'fa-solid fa-file-shield',
                    'filename' => 'Corporate_Data_Destruction_Standard.doc'
                ],
                [
                    'id' => 'impact_report',
                    'title' => 'Annual Environmental Impact Report',
                    'type' => 'Publication • 6.8 MB',
                    'icon' => 'fa-solid fa-book-open',
                    'filename' => 'WEEE_Centre_Annual_Impact_Report_2025.doc'
                ],
                [
                    'id' => 'household_toolkit',
                    'title' => 'Household Recycling Toolkit',
                    'type' => 'Brochure • 1.5 MB',
                    'icon' => 'fa-solid fa-file-lines',
                    'filename' => 'Household_E-Waste_Recycling_Toolkit.doc'
                ]
            ];
            foreach ($resourcesList as $res):
            ?>
            <div class="col-12 col-md-6">
                <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 border border-success border-opacity-25 shadow-sm">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-white text-success rounded p-3 shadow-sm fs-4"><i class="<?= h($res['icon']); ?>"></i></div>
                        <div>
                            <h5 class="fw-bold fs-6 mb-1 text-dark-green"><?= h($res['title']); ?></h5>
                            <span class="font-xs text-muted"><?= h($res['type']); ?></span>
                        </div>
                    </div>
                    <a href="api/download_resource.php?file=<?= h($res['id']); ?>" download="<?= h($res['filename']); ?>" class="btn btn-success btn-sm rounded-pill px-3 py-1 font-xs d-flex align-items-center text-decoration-none shadow-sm">
                        <i class="fa-solid fa-download me-1"></i> Download
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>