<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Featured Projects | WEEE Centre Kenya';
$currentPage = 'projects';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between mb-5">
            <div>
                <h1 class="fw-bold text-dark-green">Our Impact & Featured Projects</h1>
                <p class="text-muted mb-0">Discover our nationwide sustainability campaigns across Kenya.</p>
            </div>
            <a href="admin/index.php" class="btn btn-warning text-dark fw-bold rounded-pill px-4 mt-3 mt-md-0"><i class="fa-solid fa-user-shield me-2"></i>Add Project in Admin</a>
        </div>
        <div class="row g-4">
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Schools Drive" style="height:220px;object-fit:cover;">
                    <div class="card-body p-4">
                        <span class="badge bg-success mb-2">Collection Drive</span>
                        <h5 class="fw-bold">Nationwide Schools E-Waste Drive</h5>
                        <p class="text-muted font-sm">Partnering with over 120 institutions across Nairobi and Mombasa to collect obsolete computers and lab equipment.</p>
                        <hr>
                        <div class="font-xs fw-bold text-success">3,400+ Tonnes Collected | 45,000+ Students</div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Data Security" style="height:220px;object-fit:cover;">
                    <div class="card-body p-4">
                        <span class="badge bg-primary mb-2">Data Security</span>
                        <h5 class="fw-bold">Banking Sector Secure Sanitization</h5>
                        <p class="text-muted font-sm">On-site hard drive shredding and degaussing for commercial banks, ensuring 100% data protection compliance.</p>
                        <hr>
                        <div class="font-xs fw-bold text-primary">15,000+ HDDs Shredded | Zero Breach Risk</div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" class="card-img-top" alt="Youth Green Jobs" style="height:220px;object-fit:cover;">
                    <div class="card-body p-4">
                        <span class="badge bg-warning text-dark mb-2">Community Training</span>
                        <h5 class="fw-bold">Grassroots E-Waste Youth Sensitization</h5>
                        <p class="text-muted font-sm">Training informal sector technicians in safe dismantling, protecting youth from heavy metals and creating green livelihoods.</p>
                        <hr>
                        <div class="font-xs fw-bold text-dark">650+ Technicians Trained | Supported by UNEP</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>