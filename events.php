<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: events.php
 * Description: Events and community outreach page showcasing upcoming webinars, environmental symposiums,
 *              school collection drives, and training schedules.
 */

declare(strict_types=1);

$pageTitle = 'Events & Workshops | WEEE Centre Kenya & East Africa';
$pageDescription = 'Join WEEE Centre’s upcoming e-waste webinars, corporate EPR symposiums, community collection drives, and environmental training workshops.';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- Page Header Banner -->
<header class="bg-soft-green py-5 border-bottom">
    <div class="container py-3 text-center text-md-start">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none text-success">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Events</li>
            </ol>
        </nav>
        <h1 class="fw-bold text-dark-green mb-2">Events & Community Outreach</h1>
        <p class="text-muted max-w-2xl font-sm mb-0">
            Connect with environmental experts, participate in collection drives, and learn about sustainable IT asset disposal at our upcoming sessions.
        </p>
    </div>
</header>

<!-- Upcoming Events Section -->
<section class="py-5 my-3">
    <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-5 reveal-on-scroll">
            <div>
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-1 d-block">Mark Your Calendar</span>
                <h2 class="section-title mb-0">Upcoming Events & Webinars</h2>
            </div>
            <a href="contact.php" class="btn btn-outline-success rounded-pill px-4 py-2 font-sm d-none d-md-inline-block">Suggest an Event</a>
        </div>

        <div class="row g-4">
            <?php
            $upcoming_events = [
                [
                    'day' => '15',
                    'month' => 'AUG',
                    'title' => 'East Africa EPR Corporate Compliance Forum 2024',
                    'time' => '09:00 AM - 01:00 PM EAT',
                    'location' => 'Radisson Blu Hotel, Nairobi & Online Hybrid',
                    'desc' => 'A high-level roundtable for brand owners, importers, and sustainability managers on meeting NEMA’s Extended Producer Responsibility statutory targets.',
                    'badge' => 'Corporate Forum',
                    'img' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'day' => '28',
                    'month' => 'AUG',
                    'title' => 'Nairobi Metropolitan Community E-Waste Take-Back Day',
                    'time' => '08:00 AM - 04:00 PM EAT',
                    'location' => 'Sarit Centre & Capital Centre Parking Bays',
                    'desc' => 'Bring your broken laptops, old chargers, TVs, and phones! Free drop-off points with instant certificates of eco-responsibility and electronic vouchers.',
                    'badge' => 'Public Drive',
                    'img' => 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80'
                ],
                [
                    'day' => '12',
                    'month' => 'SEP',
                    'title' => 'Military-Grade Data Sanitization Masterclass',
                    'time' => '10:00 AM - 12:30 PM EAT',
                    'location' => 'Live Interactive Webinar (Zoom)',
                    'desc' => 'Technical demonstration for IT directors and Chief Information Security Officers (CISOs) on degaussing vs physical shredding and Kenya Data Protection Act compliance.',
                    'badge' => 'Webinar',
                    'img' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80'
                ]
            ];

            foreach ($upcoming_events as $idx => $ev):
            ?>
            <div class="col-12 reveal-on-scroll delay-<?= ($idx + 1) * 100; ?>">
                <div class="bg-white rounded-3 shadow-sm border p-4 d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4 transition-all hover-translate">
                    <!-- Date Box -->
                    <div class="d-flex align-items-center gap-4">
                        <div class="bg-dark-green text-white rounded-3 p-3 text-center flex-shrink-0 shadow-sm" style="width: 80px;">
                            <span class="d-block fs-3 fw-bold lh-1 text-light-green"><?= $ev['day']; ?></span>
                            <span class="d-block font-xs fw-semibold tracking-wider"><?= $ev['month']; ?></span>
                        </div>
                        <div>
                            <span class="badge bg-soft-green text-dark-green border border-success border-opacity-25 font-xs px-3 py-1 rounded-pill mb-2"><?= htmlspecialchars($ev['badge']); ?></span>
                            <h3 class="fs-5 fw-bold text-dark-green mb-2"><?= htmlspecialchars($ev['title']); ?></h3>
                            <div class="d-flex flex-wrap gap-3 font-xs text-muted mb-2">
                                <span><i class="fa-solid fa-clock text-accent-green me-1"></i> <?= $ev['time']; ?></span>
                                <span><i class="fa-solid fa-location-dot text-accent-green me-1"></i> <?= htmlspecialchars($ev['location']); ?></span>
                            </div>
                            <p class="font-sm text-muted mb-0 max-w-2xl"><?= htmlspecialchars($ev['desc']); ?></p>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="flex-shrink-0">
                        <a href="contact.php?event=<?= urlencode($ev['title']); ?>" class="btn btn-success rounded-pill px-4 py-2 font-sm fw-semibold shadow-sm w-100">
                            Register Now <i class="fa-solid fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Past Events Summary -->
<section class="py-5 bg-light border-top">
    <div class="container">
        <div class="text-center mb-5 reveal-on-scroll">
            <h2 class="section-title section-title-center mb-3">Past Highlights</h2>
            <p class="text-muted max-w-2xl mx-auto font-sm">
                A glimpse into our successful community symposiums, school environmental clubs, and institutional training programs.
            </p>
        </div>

        <div class="row g-4">
            <?php
            $past_events = [
                ['title' => 'World Environment Day Clean-Up Drive 2024', 'loc' => 'Uhuru Park & CBD, Nairobi', 'attendees' => '1,200+ Participants', 'img' => 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80'],
                ['title' => 'UNEP Regional E-Waste Policy Workshop', 'loc' => 'UN Office at Nairobi (UNON)', 'attendees' => '45 Country Delegates', 'img' => 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80'],
                ['title' => 'Universities Green Tech & Recycling Hackathon', 'loc' => 'University of Nairobi', 'attendees' => '300+ Engineering Students', 'img' => 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80']
            ];
            foreach ($past_events as $pe):
            ?>
            <div class="col-12 col-md-4 reveal-on-scroll">
                <div class="project-card shadow-sm h-100">
                    <div class="project-img-wrapper" style="height: 180px;">
                        <img src="<?= $pe['img']; ?>" alt="<?= htmlspecialchars($pe['title']); ?>" loading="lazy">
                    </div>
                    <div class="project-body p-3">
                        <span class="font-xs text-muted d-block mb-1"><i class="fa-solid fa-map-pin text-success me-1"></i> <?= htmlspecialchars($pe['loc']); ?></span>
                        <h4 class="fs-6 fw-bold text-dark-green mb-2"><?= htmlspecialchars($pe['title']); ?></h4>
                        <span class="badge bg-light text-dark font-xs"><i class="fa-solid fa-users me-1 text-success"></i> <?= htmlspecialchars($pe['attendees']); ?></span>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
