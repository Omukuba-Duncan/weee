<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: about.php
 * Description: About Us page detailing organization history, mission, vision, certifications,
 *              leadership team, and educational resources.
 */

declare(strict_types=1);

$pageTitle = 'About Us | WEEE Centre Kenya & East Africa';
$pageDescription = 'Learn about WEEE Centre, our mission for zero landfill e-waste disposal, NEMA and ISO certifications, and our commitment to environmental sustainability.';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- Page Header Banner -->
<header class="bg-soft-green py-5 border-bottom">
    <div class="container py-3 text-center text-md-start">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none text-success">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
        </nav>
        <h1 class="fw-bold text-dark-green mb-2">About WEEE Centre</h1>
        <p class="text-muted max-w-2xl font-sm mb-0">
            Leading East Africa’s transition towards a circular economy through certified e-waste recycling, corporate data security, and green jobs creation.
        </p>
    </div>
</header>

<!-- Main About Content -->
<section class="py-5 my-3">
    <div class="container">
        <div class="row g-5 align-items-center">
            <div class="col-12 col-lg-6 reveal-on-scroll">
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Who We Are</span>
                <h2 class="section-title mb-4">Pioneering E-Waste Recycling in East Africa</h2>
                <p class="text-muted mb-3">
                    Founded with a bold vision to safeguard our environment and public health from the hazards of electronic waste, <strong>WEEE Centre</strong> (Waste Electrical and Electronic Equipment Centre) stands as the premier NEMA-licensed and ISO 9001:2015 certified recycling facility in Kenya.
                </p>
                <p class="text-muted mb-4">
                    We provide end-to-end e-waste management services including safe collection, dismantling, material recovery, and certified military-grade data destruction for corporations, government bodies, educational institutions, and households.
                </p>
                
                <div class="row g-3 mb-4">
                    <div class="col-6">
                        <div class="p-3 bg-light-green rounded-3 border border-success border-opacity-25">
                            <h4 class="fw-bold text-primary-green mb-1">Our Mission</h4>
                            <p class="font-xs text-muted mb-0">To protect human health and the environment through safe collection and eco-friendly recycling of e-waste.</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="p-3 bg-light-green rounded-3 border border-success border-opacity-25">
                            <h4 class="fw-bold text-primary-green mb-1">Our Vision</h4>
                            <p class="font-xs text-muted mb-0">A sustainable East Africa with zero electronic waste in landfills and 100% circular resource recovery.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-lg-6 reveal-on-scroll delay-200">
                <div class="position-relative">
                    <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" alt="WEEE Centre Facility and Technicians" class="img-fluid rounded-4 shadow-lg border">
                    <div class="position-absolute bottom-0 start-0 m-3 bg-white p-3 rounded-3 shadow border d-flex align-items-center gap-3">
                        <div class="bg-success text-white rounded-circle p-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                            <i class="fa-solid fa-award fs-4"></i>
                        </div>
                        <div>
                            <span class="fw-bold d-block text-dark-green font-sm">Over 15 Years of Excellence</span>
                            <span class="font-xs text-muted">Trusted by 250+ Partner Organizations</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Certifications Section -->
<section class="py-5 bg-light border-top border-bottom" id="certifications">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Compliance & Standards</span>
            <h2 class="section-title section-title-center mb-3">Our Certifications & Accreditations</h2>
            <p class="text-muted max-w-2xl mx-auto font-sm">
                We adhere to the strictest domestic and international standards to guarantee environmental safety and corporate compliance.
            </p>
        </div>

        <div class="row g-4 justify-content-center">
            <?php
            $certifications = [
                ['title' => 'ISO 9001:2015 Certified', 'desc' => 'International Standard for Quality Management Systems, ensuring consistent, high-quality recycling processes.', 'icon' => 'fa-solid fa-certificate'],
                ['title' => 'NEMA Licensed Recycler', 'desc' => 'Fully licensed by the National Environment Management Authority of Kenya for hazardous and non-hazardous e-waste.', 'icon' => 'fa-solid fa-shield-halved'],
                ['title' => 'KEBS Approved Facility', 'desc' => 'Compliant with Kenya Bureau of Standards guidelines on electrical equipment handling and environmental safety.', 'icon' => 'fa-solid fa-stamp'],
                ['title' => 'UNEP Partner & Collaborator', 'desc' => 'Active collaborator with United Nations Environment Programme on regional e-waste policy and training.', 'icon' => 'fa-solid fa-globe']
            ];
            foreach ($certifications as $cert):
            ?>
            <div class="col-12 col-md-6 col-lg-3 reveal-on-scroll">
                <div class="bg-white p-4 rounded-3 shadow-sm border h-100 text-center">
                    <div class="service-icon-circle mb-3 mx-auto"><i class="<?= $cert['icon']; ?>"></i></div>
                    <h4 class="fs-5 fw-bold text-dark-green"><?= htmlspecialchars($cert['title']); ?></h4>
                    <p class="font-sm text-muted mb-0"><?= htmlspecialchars($cert['desc']); ?></p>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Resources & Education Hub -->
<section class="py-5 my-3" id="resources">
    <div class="container">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 reveal-on-scroll">
            <div>
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Knowledge Hub</span>
                <h2 class="section-title mb-0">E-Waste Resources & Guidelines</h2>
            </div>
            <a href="contact.php" class="btn btn-outline-success rounded-pill px-4 py-2 font-sm mt-3 mt-md-0">Request Custom Report</a>
        </div>

        <div class="row g-4">
            <?php
            $resources = [
                ['title' => 'Kenya E-Waste EPR Guidelines 2024', 'type' => 'PDF Document • 4.2 MB', 'icon' => 'fa-solid fa-file-pdf'],
                ['title' => 'Corporate Data Destruction Standard', 'type' => 'PDF Guide • 2.1 MB', 'icon' => 'fa-solid fa-file-shield'],
                ['title' => 'Annual Environmental Impact Report', 'type' => 'Publication • 6.8 MB', 'icon' => 'fa-solid fa-book-open'],
                ['title' => 'Household Recycling Toolkit', 'type' => 'Brochure • 1.5 MB', 'icon' => 'fa-solid fa-file-lines']
            ];
            foreach ($resources as $res):
            ?>
            <div class="col-12 col-md-6 reveal-on-scroll">
                <div class="d-flex align-items-center justify-content-between p-3 bg-soft-green rounded-3 border border-success border-opacity-25 shadow-sm">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-white text-success rounded p-3 shadow-sm fs-4"><i class="<?= $res['icon']; ?>"></i></div>
                        <div>
                            <h5 class="fw-bold fs-6 mb-1 text-dark-green"><?= htmlspecialchars($res['title']); ?></h5>
                            <span class="font-xs text-muted"><?= htmlspecialchars($res['type']); ?></span>
                        </div>
                    </div>
                    <a href="#" onclick="alert('Downloading <?= htmlspecialchars(addslashes($res['title'])); ?>...'); return false;" class="btn btn-success btn-sm rounded-pill px-3 py-1 font-xs d-flex align-items-center">
                        <i class="fa-solid fa-download me-1"></i> Download
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
