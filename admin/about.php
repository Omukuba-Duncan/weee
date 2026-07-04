<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'About Us | WEEE Centre Kenya & East Africa';
$currentPage = 'about';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
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
<?php require_once 'includes/footer.php'; ?>