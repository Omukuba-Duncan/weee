<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * 
 * File: contact.php
 * Description: Contact Us and Dispose Now booking page with inquiry forms, location details,
 *              interactive FAQs, and PHP form processing handler simulation.
 */

declare(strict_types=1);

$pageTitle = 'Contact Us & Schedule Pickup | WEEE Centre Kenya';
$pageDescription = 'Contact WEEE Centre in Nairobi, Kenya. Schedule an e-waste collection pickup, request certified data destruction quotes, or inquire about EPR compliance.';

// Check if form submitted via POST
$form_submitted = false;
$success_message = '';
$error_message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $form_type = $_POST['form_type'] ?? 'general';
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    
    if ($email) {
        $form_submitted = true;
        if ($form_type === 'newsletter') {
            $success_message = 'Thank you for subscribing to our newsletter! You will receive our latest e-waste sustainability updates.';
        } else {
            $name = htmlspecialchars($_POST['name'] ?? 'Valued Partner');
            $service = htmlspecialchars($_POST['service'] ?? 'E-Waste Disposal');
            $success_message = "Thank you, {$name}! Your request regarding \"{$service}\" has been received. Our logistics and technical team will contact you within 24 business hours.";
        }
    } else {
        $error_message = 'Please provide a valid email address so we can reach you.';
    }
}

// Get URL params for pre-selecting services
$action_param = $_GET['action'] ?? '';
$service_param = $_GET['service'] ?? '';
$project_param = $_GET['project'] ?? '';
$event_param = $_GET['event'] ?? '';

require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>

<!-- Page Header Banner -->
<header class="bg-soft-green py-5 border-bottom">
    <div class="container py-3 text-center text-md-start">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb font-xs justify-content-center justify-content-md-start mb-2">
                <li class="breadcrumb-item"><a href="index.php" class="text-decoration-none text-success">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
            </ol>
        </nav>
        <h1 class="fw-bold text-dark-green mb-2">Get in Touch & Dispose Responsibly</h1>
        <p class="text-muted max-w-2xl font-sm mb-0">
            Whether you need a scheduled collection for corporate IT scrap or have a general sustainability inquiry, our team in Nairobi is here to assist.
        </p>
    </div>
</header>

<!-- Main Contact Section -->
<section class="py-5 my-3">
    <div class="container">
        <!-- Display Alert if form was submitted -->
        <?php if ($form_submitted && !empty($success_message)): ?>
        <div class="alert alert-success alert-dismissible fade show rounded-4 shadow-sm p-4 mb-5 border-success d-flex align-items-center" role="alert">
            <i class="fa-solid fa-circle-check fs-2 me-3 text-success"></i>
            <div>
                <h4 class="alert-heading fw-bold fs-5 mb-1">Request Successfully Submitted!</h4>
                <p class="mb-0 font-sm"><?= $success_message; ?></p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php elseif (!empty($error_message)): ?>
        <div class="alert alert-danger alert-dismissible fade show rounded-4 shadow-sm p-4 mb-5 border-danger d-flex align-items-center" role="alert">
            <i class="fa-solid fa-triangle-exclamation fs-2 me-3 text-danger"></i>
            <div>
                <h4 class="alert-heading fw-bold fs-5 mb-1">Submission Error</h4>
                <p class="mb-0 font-sm"><?= $error_message; ?></p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php endif; ?>

        <div class="row g-5">
            <!-- Left Column: Contact Info & Office Details -->
            <div class="col-12 col-lg-5 reveal-on-scroll">
                <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Contact Details</span>
                <h2 class="section-title mb-4">Reach Our Headquarters</h2>
                <p class="text-muted font-sm mb-4">
                    Our recycling facility and corporate offices are open Monday through Friday for deliveries, institutional consultations, and facility tours.
                </p>

                <div class="d-flex flex-column gap-4 mb-5">
                    <!-- Address -->
                    <div class="d-flex align-items-start gap-3">
                        <div class="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style="width: 54px; height: 54px;">
                            <i class="fa-solid fa-location-dot fs-5"></i>
                        </div>
                        <div>
                            <h4 class="fs-6 fw-bold text-dark-green mb-1">Physical Address & P.O Box</h4>
                            <p class="font-sm text-muted mb-0">P.O Box 69633 – 00400<br>Nairobi, Kenya (Embakasi Facility)</p>
                        </div>
                    </div>

                    <!-- Phone -->
                    <div class="d-flex align-items-start gap-3">
                        <div class="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style="width: 54px; height: 54px;">
                            <i class="fa-solid fa-phone fs-5"></i>
                        </div>
                        <div>
                            <h4 class="fs-6 fw-bold text-dark-green mb-1">Phone & Hotline</h4>
                            <p class="font-sm text-muted mb-0">
                                <a href="tel:+254700000000" class="text-decoration-none text-dark">+254 700 000 000</a><br>
                                <span class="font-xs text-success fw-semibold">Available Mon - Fri, 8:00 AM - 5:00 PM EAT</span>
                            </p>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="d-flex align-items-start gap-3">
                        <div class="bg-light-green text-primary-green rounded-circle p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-sm" style="width: 54px; height: 54px;">
                            <i class="fa-solid fa-envelope fs-5"></i>
                        </div>
                        <div>
                            <h4 class="fs-6 fw-bold text-dark-green mb-1">Email Addresses</h4>
                            <p class="font-sm text-muted mb-0">
                                <a href="mailto:info@weeecentre.com" class="text-decoration-none text-dark">info@weeecentre.com</a> (General)<br>
                                <a href="mailto:logistics@weeecentre.com" class="text-decoration-none text-dark">logistics@weeecentre.com</a> (Pickups)
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Emergency Banner -->
                <div class="p-4 bg-dark-green text-white rounded-4 shadow-sm">
                    <div class="d-flex align-items-center gap-3 mb-2">
                        <i class="fa-solid fa-shield-halved text-light-green fs-4"></i>
                        <h5 class="fs-6 fw-bold mb-0 text-white">Need Urgent Corporate Data Erasure?</h5>
                    </div>
                    <p class="font-xs text-light mb-3 opacity-90">
                        For immediate enterprise decommissioning and on-site hard drive destruction, request our rapid-response ITAD mobile unit.
                    </p>
                    <a href="#contactForm" class="btn btn-outline-light btn-sm rounded-pill px-3 font-xs">Request Mobile Unit</a>
                </div>
            </div>

            <!-- Right Column: Interactive Dispose Now / Inquiry Form -->
            <div class="col-12 col-lg-7 reveal-on-scroll delay-200">
                <div class="bg-white p-4 p-md-5 rounded-4 shadow-lg border border-secondary border-opacity-10" id="contactForm">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h3 class="fw-bold text-dark-green fs-4 mb-0">
                            <?= ($action_param === 'dispose') ? '<i class="fa-solid fa-recycle text-success me-2"></i>Schedule E-Waste Pickup' : 'Send Us an Inquiry'; ?>
                        </h3>
                        <span class="badge bg-light-green text-dark-green font-xs px-3 py-2 rounded-pill">Response within 24 Hrs</span>
                    </div>

                    <form action="contact.php" method="POST" class="row g-3" novalidate>
                        <input type="hidden" name="form_type" value="inquiry">
                        
                        <!-- Full Name -->
                        <div class="col-md-6">
                            <label for="name" class="form-label font-sm fw-semibold">Full Name *</label>
                            <input type="text" class="form-control rounded-3 py-2 font-sm" id="name" name="name" placeholder="John Doe" required>
                        </div>

                        <!-- Organization / Company -->
                        <div class="col-md-6">
                            <label for="company" class="form-label font-sm fw-semibold">Organization / Company</label>
                            <input type="text" class="form-control rounded-3 py-2 font-sm" id="company" name="company" placeholder="e.g. Safaricom / School / Home">
                        </div>

                        <!-- Email Address -->
                        <div class="col-md-6">
                            <label for="email" class="form-label font-sm fw-semibold">Email Address *</label>
                            <input type="email" class="form-control rounded-3 py-2 font-sm" id="email" name="email" placeholder="john@example.com" required>
                        </div>

                        <!-- Phone Number -->
                        <div class="col-md-6">
                            <label for="phone" class="form-label font-sm fw-semibold">Phone Number *</label>
                            <input type="tel" class="form-control rounded-3 py-2 font-sm" id="phone" name="phone" placeholder="+254 700 000 000" required>
                        </div>

                        <!-- Service Required -->
                        <div class="col-12">
                            <label for="service" class="form-label font-sm fw-semibold">Service Required *</label>
                            <select class="form-select rounded-3 py-2 font-sm" id="service" name="service" required>
                                <option value="" disabled <?= empty($service_param) && empty($action_param) && empty($project_param) && empty($event_param) ? 'selected' : ''; ?>>Select service or inquiry type...</option>
                                <option value="E-Waste Collection & Pickup" <?= ($action_param === 'dispose' || $service_param === 'E-Waste Collection') ? 'selected' : ''; ?>>🚚 E-Waste Collection & Pickup (Dispose Now)</option>
                                <option value="Secure Data Destruction" <?= ($service_param === 'Data Destruction') ? 'selected' : ''; ?>>🔒 Secure & Certified Data Destruction</option>
                                <option value="EPR Compliance Consultation" <?= ($service_param === 'EPR Compliance') ? 'selected' : ''; ?>>📋 EPR Compliance & NEMA Consultation</option>
                                <option value="Training & Awareness Workshop" <?= ($service_param === 'Training') ? 'selected' : ''; ?>>🎓 Training & Capacity Building Workshop</option>
                                <option value="Project Partnership: <?= htmlspecialchars($project_param); ?>" <?= !empty($project_param) ? 'selected' : ''; ?>>🤝 Project Partnership / Sponsorship</option>
                                <option value="Event Registration: <?= htmlspecialchars($event_param); ?>" <?= !empty($event_param) ? 'selected' : ''; ?>>📅 Event Registration / Attendance</option>
                                <option value="General Sustainability Inquiry">💡 General Sustainability Inquiry</option>
                            </select>
                        </div>

                        <!-- Estimated Quantity / Weight (shown if collection/disposal selected) -->
                        <div class="col-md-6">
                            <label for="quantity" class="form-label font-sm fw-semibold">Estimated E-Waste Quantity</label>
                            <select class="form-select rounded-3 py-2 font-sm" id="quantity" name="quantity">
                                <option value="Small Household (1-10 items)">Small Household (1-10 items / phones / laptops)</option>
                                <option value="Medium Office (10-50 items)">Medium Office (10-50 computers / printers)</option>
                                <option value="Large Enterprise (500 kg - 2 Tonnes)">Large Enterprise (500 kg - 2 Tonnes)</option>
                                <option value="Industrial / Warehouse (Over 2 Tonnes)">Industrial / Warehouse (Over 2 Tonnes)</option>
                                <option value="Not Applicable">Not Applicable</option>
                            </select>
                        </div>

                        <!-- Preferred Pickup / Contact Date -->
                        <div class="col-md-6">
                            <label for="date" class="form-label font-sm fw-semibold">Preferred Date</label>
                            <input type="date" class="form-control rounded-3 py-2 font-sm" id="date" name="date" value="<?= date('Y-m-d', strtotime('+2 days')); ?>">
                        </div>

                        <!-- Message / Specific Inventory Notes -->
                        <div class="col-12">
                            <label for="message" class="form-label font-sm fw-semibold">Specific Items or Notes *</label>
                            <textarea class="form-control rounded-3 py-2 font-sm" id="message" name="message" rows="4" placeholder="Please list specific electronic equipment (e.g., 15 Dell desktop monitors, 4 servers, obsolete cabling) or specify your inquiry details..." required></textarea>
                        </div>

                        <!-- Submit Button -->
                        <div class="col-12 mt-4">
                            <button type="submit" class="btn btn-dark-green w-100 rounded-pill py-3 fw-bold shadow-sm transition-all d-flex align-items-center justify-content-center fs-6">
                                <i class="fa-solid fa-paper-plane me-2"></i> Submit Request & Schedule Disposal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Frequently Asked Questions (FAQs) -->
<section class="py-5 bg-soft-green border-top border-bottom" id="faq">
    <div class="container max-w-4xl">
        <div class="text-center mb-5 reveal-on-scroll">
            <span class="text-uppercase font-xs fw-bold tracking-wider text-accent-green mb-2 d-block">Common Questions</span>
            <h2 class="section-title section-title-center mb-3">Frequently Asked Questions</h2>
            <p class="text-muted font-sm">Everything you need to know about e-waste disposal, data security, and NEMA compliance.</p>
        </div>

        <div class="accordion shadow-sm rounded-4 overflow-hidden" id="faqAccordion">
            <!-- FAQ 1 -->
            <div class="accordion-item border-0 border-bottom">
                <h3 class="accordion-header" id="faqOne">
                    <button class="accordion-button fw-bold text-dark-green py-3 px-4 font-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        What types of electronic waste does WEEE Centre collect and recycle?
                    </button>
                </h3>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
                    <div class="accordion-body font-sm text-muted px-4 py-3">
                        We accept virtually all electrical and electronic equipment (WEEE). This includes computers, laptops, servers, mobile phones, printers, telecommunication gear, network switches, CRT/LCD monitors, household appliances, battery packs, medical electronics, and solar power equipment.
                    </div>
                </div>
            </div>

            <!-- FAQ 2 -->
            <div class="accordion-item border-0 border-bottom">
                <h3 class="accordion-header" id="faqTwo">
                    <button class="accordion-button collapsed fw-bold text-dark-green py-3 px-4 font-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        How do you guarantee that our confidential corporate data is completely destroyed?
                    </button>
                </h3>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="faqTwo" data-bs-parent="#faqAccordion">
                    <div class="accordion-body font-sm text-muted px-4 py-3">
                        We adhere strictly to NIST SP 800-88 and DoD 5220.22-M data sanitization guidelines. We offer both high-voltage magnetic degaussing (which irreversibly destroys magnetic storage) and physical industrial hard drive shredding down to 10mm particles. Upon completion, we issue a legally binding Certificate of Data Destruction complete with drive serial numbers.
                    </div>
                </div>
            </div>

            <!-- FAQ 3 -->
            <div class="accordion-item border-0 border-bottom">
                <h3 class="accordion-header" id="faqThree">
                    <button class="accordion-button collapsed fw-bold text-dark-green py-3 px-4 font-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Is there a charge for e-waste collection and pickup?
                    </button>
                </h3>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="faqThree" data-bs-parent="#faqAccordion">
                    <div class="accordion-body font-sm text-muted px-4 py-3">
                        For large corporate batches and institutional cleanouts, collection logistics are typically subsidized or offset by material recovery values. For smaller household drop-offs at our designated community collection points, disposal is 100% free! Contact us with your estimated inventory for a customized logistics evaluation.
                    </div>
                </div>
            </div>

            <!-- FAQ 4 -->
            <div class="accordion-item border-0">
                <h3 class="accordion-header" id="faqFour">
                    <button class="accordion-button collapsed fw-bold text-dark-green py-3 px-4 font-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                        How does WEEE Centre support companies with EPR (Extended Producer Responsibility)?
                    </button>
                </h3>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="faqFour" data-bs-parent="#faqAccordion">
                    <div class="accordion-body font-sm text-muted px-4 py-3">
                        We serve as an accredited Producer Responsibility Organization (PRO) partner under Kenya's NEMA regulations. We help brand owners and importers register their EPR schemes, conduct nationwide take-back drives, manage recycling documentation, and provide statutory audit reports required by environmental authorities.
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>
