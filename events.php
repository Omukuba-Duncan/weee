<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Events & Workshops | WEEE Centre Kenya';
$currentPage = 'events';
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="text-center mb-5">
            <h1 class="fw-bold text-dark-green">Upcoming Events & Green Workshops</h1>
            <p class="text-muted">Join our e-waste awareness drives, corporate symposiums, and community clean-ups.</p>
        </div>
        <div class="row g-4 justify-content-center">
            <div class="col-lg-8">
                <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 border-start border-success border-4">
                    <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
                        <div>
                            <span class="badge bg-light-green text-success px-3 py-1 mb-2">Symposium • July 15, 2026</span>
                            <h4 class="fw-bold">Annual EPR Corporate Compliance Workshop</h4>
                            <p class="text-muted mb-2">Radisson Blu, Nairobi & Online Hybrid • 9:00 AM EAT</p>
                            <p class="font-sm text-secondary">A practical session for manufacturers and brand owners on fulfilling legal take-back quotas under NEMA regulations.</p>
                        </div>
                        <a href="contact.php?event=EPR_Workshop" class="btn btn-success rounded-pill px-4">Register Free</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>