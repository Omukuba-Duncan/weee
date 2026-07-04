<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: includes/footer.php
 * Description: Main corporate footer with quick links, newsletter sign-up, social icons,
 *              copyright information, Bootstrap 5.3 bundle, and custom JavaScript scripts.
 */

// Strict typing for PHP 8
declare(strict_types=1);
?>
    <!-- Main Footer Section -->
    <footer class="footer bg-dark-green text-white pt-5 mt-auto border-top border-success border-4">
        <div class="container py-4">
            <div class="row g-4 justify-content-between">
                <!-- Column 1: Brand & Tagline -->
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="d-flex align-items-center mb-3">
                        <div class="logo-icon-wrapper me-2 bg-white rounded-circle d-flex align-items-center justify-content-center p-2" style="width: 42px; height: 42px;">
                            <i class="fa-solid fa-recycle text-success fs-4"></i>
                        </div>
                        <div class="d-flex flex-column lh-1">
                            <span class="fw-bold fs-5 tracking-tight text-white">WEEE CENTRE</span>
                            <span class="text-light-green font-xs tracking-wider">Towards Sustainable Future</span>
                        </div>
                    </div>
                    <p class="text-light font-sm pe-lg-3 mb-4 opacity-85 lh-relaxed">
                        Leading the way in responsible e-waste management for a cleaner and greener tomorrow across Kenya and the East African region.
                    </p>
                    <div class="social-links d-flex gap-2">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Facebook">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="Twitter / X">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-social rounded-circle d-flex align-items-center justify-content-center" aria-label="YouTube">
                            <i class="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Quick Links</h5>
                    <ul class="list-unstyled footer-links mb-0 font-sm">
                        <li class="mb-2"><a href="about.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>About Us</a></li>
                        <li class="mb-2"><a href="services.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Services</a></li>
                        <li class="mb-2"><a href="about.php#certifications" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Certifications</a></li>
                        <li class="mb-2"><a href="projects.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Projects</a></li>
                        <li class="mb-2"><a href="events.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Events</a></li>
                        <li class="mb-0"><a href="contact.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Contact Us</a></li>
                    </ul>
                </div>

                <!-- Column 3: Resources -->
                <div class="col-6 col-md-3 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Resources</h5>
                    <ul class="list-unstyled footer-links mb-0 font-sm">
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>E-Waste Education Hub</a></li>
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Guidelines & Policies</a></li>
                        <li class="mb-2"><a href="about.php#resources" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>Reports & Publications</a></li>
                        <li class="mb-2"><a href="events.php" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>News & Updates</a></li>
                        <li class="mb-0"><a href="contact.php#faq" class="text-light text-decoration-none transition-hover"><i class="fa-solid fa-chevron-right font-xs me-2 text-accent-green"></i>FAQs</a></li>
                    </ul>
                </div>

                <!-- Column 4: Contact Us -->
                <div class="col-12 col-md-6 col-lg-2">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Contact Us</h5>
                    <ul class="list-unstyled mb-0 font-sm pe-lg-2">
                        <li class="d-flex mb-3 align-items-start">
                            <i class="fa-solid fa-location-dot mt-1 me-2 text-accent-green"></i>
                            <span class="text-light">P.O Box 69633 – 00400 Nairobi, Kenya</span>
                        </li>
                        <li class="d-flex mb-3 align-items-center">
                            <i class="fa-solid fa-phone me-2 text-accent-green"></i>
                            <a href="tel:+254700000000" class="text-light text-decoration-none">+254 700 000 000</a>
                        </li>
                        <li class="d-flex mb-3 align-items-center">
                            <i class="fa-solid fa-envelope me-2 text-accent-green"></i>
                            <a href="mailto:info@weeecentre.com" class="text-light text-decoration-none">info@weeecentre.com</a>
                        </li>
                        <li class="d-flex mb-0 align-items-center">
                            <i class="fa-solid fa-globe me-2 text-accent-green"></i>
                            <a href="https://www.weeecentre.com" class="text-light text-decoration-none">www.weeecentre.com</a>
                        </li>
                    </ul>
                </div>

                <!-- Column 5: Newsletter -->
                <div class="col-12 col-md-6 col-lg-3">
                    <h5 class="text-white fw-semibold mb-3 border-bottom border-success border-2 pb-2 d-inline-block">Newsletter</h5>
                    <p class="font-sm text-light mb-3 opacity-85">
                        Subscribe to our newsletter for latest e-waste regulations, sustainability updates and community drives.
                    </p>
                    <form class="newsletter-form" action="contact.php" method="POST" id="newsletterForm" novalidate>
                        <input type="hidden" name="form_type" value="newsletter">
                        <div class="mb-2">
                            <input type="email" name="email" class="form-control form-control-sm rounded-pill py-2 px-3 border-0 shadow-sm font-sm" placeholder="Enter your email" required aria-label="Enter your email for newsletter">
                        </div>
                        <button type="submit" class="btn btn-success btn-sm w-100 rounded-pill py-2 fw-semibold shadow-sm transition-all d-flex align-items-center justify-content-center">
                            <i class="fa-solid fa-paper-plane me-2"></i> Subscribe
                        </button>
                    </form>
                    <div id="newsletterMessage" class="mt-2 font-xs"></div>
                </div>
            </div>

            <!-- Horizontal Divider -->
            <hr class="my-4 border-light opacity-15">

            <!-- Bottom Copyright & Policies -->
            <div class="row align-items-center font-sm text-light opacity-75">
                <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
                    <span>&copy; <?= date('Y'); ?> WEEE Centre. All Rights Reserved.</span>
                </div>
                <div class="col-md-6 text-center text-md-end">
                    <a href="about.php#privacy" class="text-light text-decoration-none me-3 transition-hover">Privacy Policy</a>
                    <span class="me-3">|</span>
                    <a href="about.php#terms" class="text-light text-decoration-none transition-hover">Terms of Use</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- Bootstrap 5.3 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

    <!-- Custom JavaScript with Smooth Scroll & Animations -->
    <script src="assets/js/script.js?v=2.0.0"></script>
</body>
</html>
