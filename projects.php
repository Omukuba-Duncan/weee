<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: projects.php
 * Description: Showcase of ongoing and completed e-waste recycling initiatives, collection drives,
 *              corporate data destruction projects, and material recovery initiatives across East Africa.
 */

declare(strict_types=1);

$pageTitle = 'Our Projects | WEEE Centre Kenya & East Africa';
$pageDescription = 'Explore our nationwide e-waste collection drives, corporate data security initiatives, and community environmental training programs across Kenya.';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- Page Header Banner -->
<header class="bg-soft-green py-5 border-bottom">
    <div class="container py-3 text-center text-md-start">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none text-success">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Projects</li>
            </ol>
        </nav>
        <h1 class="fw-bold text-dark-green mb-2">Our Impactful Projects</h1>
        <p class="text-muted max-w-2xl font-sm mb-0">
            Discover how our nationwide initiatives are transforming environmental waste into green opportunities across Kenya and East Africa.
        </p>
    </div>
</header>

<!-- Projects Grid Section -->
<section class="py-5 my-3">
    <div class="container">
        <!-- Project Filter Buttons (Visual simulation) -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-5 reveal-on-scroll">
            <button class="btn btn-dark-green btn-sm rounded-pill px-4 py-2">All Projects</button>
            <button class="btn btn-outline-secondary btn-sm rounded-pill px-4 py-2">Collection Drives</button>
            <button class="btn btn-outline-secondary btn-sm rounded-pill px-4 py-2">Data Security</button>
            <button class="btn btn-outline-secondary btn-sm rounded-pill px-4 py-2">Community Training</button>
            <button class="btn btn-outline-secondary btn-sm rounded-pill px-4 py-2">Material Recovery</button>
        </div>

        <div class="row g-4">
            <?php
            $all_projects = [
                [
                    'id' => 'drive',
                    'badge' => 'Collection Drive',
                    'title' => 'Nationwide Schools & Institutional E-Waste Drive',
                    'date' => 'Ongoing Initiative • 2023 - 2024',
                    'desc' => 'Partnering with over 120 learning institutions and government agencies across Nairobi, Kisumu, and Mombasa to collect obsolete computers, printers, and lab electronics.',
                    'metrics' => '3,400+ Tonnes Collected | 45,000+ Students Sensitized',
                    'img' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'id' => 'data',
                    'badge' => 'Data Erasure',
                    'title' => 'Banking Sector Secure Data Sanitization Project',
                    'date' => 'Completed • Q1 2024',
                    'desc' => 'Conducted on-site hard drive shredding and magnetic degaussing for top tier commercial banks in Kenya, ensuring 100% data protection while recycling metal server racks.',
                    'metrics' => '15,000+ HDDs Shredded | Zero Data Breach Risk',
                    'img' => 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'id' => 'awareness',
                    'badge' => 'Community Training',
                    'title' => 'Grassroots E-Waste Youth Sensitization & Green Jobs',
                    'date' => 'Ongoing • Supported by UNEP',
                    'desc' => 'Training informal sector waste collectors and youth groups in safe dismantling techniques, protecting them from toxic heavy metals and creating sustainable green livelihoods.',
                    'metrics' => '650+ Technicians Trained | 30+ Community Hubs',
                    'img' => 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'id' => 'recovery',
                    'badge' => 'Material Recovery',
                    'title' => 'Circular Economy Raw Material Recovery Initiative',
                    'date' => 'Ongoing Initiative',
                    'desc' => 'Extracting copper, aluminum, gold, and palladium from printed circuit boards (PCBs) in compliance with international Basel Convention standards.',
                    'metrics' => '98.5% Recovery Rate | 18,600+ Tonnes CO₂ Avoided',
                    'img' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'id' => 'solar',
                    'badge' => 'Renewable Waste',
                    'title' => 'Solar Battery & Off-Grid Lithium Recycling Pilot',
                    'date' => 'Pilot Project • 2024',
                    'desc' => 'Addressing the growing wave of decommissioned solar panels and lithium-ion batteries across rural electrification projects in East Africa.',
                    'metrics' => '450+ Tonnes Solar Scrap | Safe Electrolyte Neutralization',
                    'img' => 'https://images.unsplash.com/photo-1509391365360-fa0ba1f57e00?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'id' => 'corporate',
                    'badge' => 'EPR Take-Back',
                    'title' => 'Telecom Manufacturer Take-Back Partnership',
                    'date' => 'Annual Campaign',
                    'desc' => 'Collaborating with mobile network operators and smartphone brand owners to deploy consumer collection bins in retail outlets across major towns.',
                    'metrics' => '120,000+ Phones Recycled | Consumer Reward Scheme',
                    'img' => 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80'
                ]
            ];

            foreach ($all_projects as $idx => $p):
            ?>
            <div class="col-12 col-md-6 col-lg-4 reveal-on-scroll delay-<?= (($idx % 3) + 1) * 100; ?>" id="<?= $p['id']; ?>">
                <div class="project-card shadow-sm h-100 d-flex flex-column">
                    <div class="project-img-wrapper">
                        <span class="project-badge shadow-sm"><?= htmlspecialchars($p['badge']); ?></span>
                        <img src="<?= $p['img']; ?>" alt="<?= htmlspecialchars($p['title']); ?>" loading="lazy">
                    </div>
                    <div class="project-body d-flex flex-column justify-content-between flex-grow-1">
                        <div>
                            <span class="font-xs text-accent-green fw-semibold d-block mb-1"><i class="fa-solid fa-calendar-days me-1"></i> <?= htmlspecialchars($p['date']); ?></span>
                            <h3 class="project-title fs-5"><?= htmlspecialchars($p['title']); ?></h3>
                            <p class="project-desc font-sm mb-3"><?= htmlspecialchars($p['desc']); ?></p>
                        </div>
                        <div class="pt-3 border-top border-light mt-2">
                            <span class="font-xs fw-bold text-dark-green d-block mb-2">
                                <i class="fa-solid fa-chart-line text-success me-1"></i> <?= htmlspecialchars($p['metrics']); ?>
                            </span>
                            <a href="contact.php?project=<?= urlencode($p['title']); ?>" class="btn btn-outline-success btn-sm w-100 rounded-pill font-xs fw-bold">
                                Partner in This Initiative <i class="fa-solid fa-arrow-right ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Call to Action Banner -->
<section class="py-5 bg-dark-green text-white text-center my-4">
    <div class="container py-3">
        <h3 class="text-white fw-bold mb-3">Want to Sponsor a Collection Drive in Your Community?</h3>
        <p class="text-light max-w-2xl mx-auto font-sm mb-4">
            We partner with corporate CSR teams, NGOs, and municipal councils to launch high-impact environmental cleanup drives.
        </p>
        <a href="contact.php" class="btn btn-success rounded-pill px-5 py-3 fw-bold shadow">
            Propose a Project <i class="fa-solid fa-handshake ms-2"></i>
        </a>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
