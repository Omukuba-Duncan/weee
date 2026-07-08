<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: includes/navbar.php
 * Description: Sticky top Bootstrap 5.3 responsive navigation bar with active link highlighting
 *              and 'Dispose Now' action button.
 */

// Strict typing for PHP 8
declare(strict_types=1);

// Ensure $current_page is defined
$current_page = $current_page ?? basename($_SERVER['PHP_SELF'], '.php');

/**
 * Helper function to determine active navigation link
 */
if (!function_exists('is_active_nav')) {
    function is_active_nav(string $pageName, string $currentPage): string {
        return ($pageName === $currentPage) ? 'active fw-bold text-success' : '';
    }
}
?>
<!-- Top Header Notice / Bar (Optional micro-bar for quick contact) -->
<div class="bg-dark-green text-white py-1 px-3 d-none d-lg-block top-bar-info">
    <div class="container d-flex justify-content-between align-items-center font-sm">
        <div>
            <span class="me-3"><i class="fa-solid fa-location-dot me-1 text-accent-green"></i> P.O Box 69633 – 00400 Nairobi, Kenya</span>
            <span><i class="fa-solid fa-phone me-1 text-accent-green"></i> +254768449499</span>
        </div>
        <div>
            <a href="mailto:ogadan254@gmail.com" class="text-white text-decoration-none me-3"><i class="fa-solid fa-envelope me-1 text-accent-green"></i> ogadan254@gmail.com</a>
            <span class="badge bg-success bg-opacity-75 text-white">ISO 9001:2015 Certified</span>
        </div>
    </div>
</div>

<!-- Main Sticky Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-2 py-lg-3 main-navbar transition-all" id="mainNavbar">
    <div class="container">
        <!-- Brand Logo & Tagline -->
        <a class="navbar-brand d-flex align-items-center py-0" href="index.php" aria-label="WEEE Centre Homepage">
            <div class="logo-icon-wrapper me-2 d-flex align-items-center justify-content-center">
                <span class="logo-recycle-icon"><i class="fa-solid fa-recycle text-success"></i></span>
            </div>
            <div class="d-flex flex-column lh-1">
                <span class="fw-bold fs-4 tracking-tight text-dark-green logo-title">WEEE CENTRE</span>
                <span class="text-muted font-xs tracking-wider logo-subtitle">Towards Sustainable Future</span>
            </div>
        </a>

        <!-- Mobile Toggler Button -->
        <button class="navbar-toggler border-0 shadow-none px-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation Links & Action Button -->
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('index', $current_page); ?>" href="index.php">Home</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('about', $current_page); ?>" href="about.php">About Us</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('services', $current_page); ?>" href="services.php">Services</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('certifications', $current_page); ?>" href="about.php#certifications">Certifications</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('projects', $current_page); ?>" href="projects.php">Projects</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('events', $current_page); ?>" href="events.php">Events</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('resources', $current_page); ?>" href="about.php#resources">Resources</a>
                </li>
                <li class="nav-item px-1">
                    <a class="nav-link <?= is_active_nav('contact', $current_page); ?>" href="contact.php">Contact Us</a>
                </li>
            </ul>

            <!-- Call to Action Button: Dispose Now -->
            <div class="d-flex align-items-center mt-3 mt-lg-0">
                <a href="contact.php?action=dispose" class="btn btn-dark-green btn-dispose rounded-pill px-4 py-2 d-flex align-items-center shadow-sm fw-semibold">
                    <i class="fa-solid fa-recycle me-2 rotate-hover"></i> Dispose Now
                </a>
            </div>
        </div>
    </div>
</nav>
