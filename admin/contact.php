<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Contact Us & Schedule Pickup | WEEE Centre Kenya';
$currentPage = 'contact';
$successMsg = '';
$errorMsg = '';

// Handle POST form submission for inquiries and disposal scheduling
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? 'General Inquiry');
    $message = trim($_POST['message'] ?? '');

    if ($name === '' || $email === '') {
        $errorMsg = 'Please provide your name and email address.';
    } else {
        // Insert into XAMPP MySQL email_conversations
        $threadId = uniqid('weee_');
        $stmt = $pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, 'client', ?, ?)");
        $stmt->execute([$threadId, $name, "Service: $service | Phone: $phone

$message"]);
        $successMsg = "Thank you, $name! Your request (#$threadId) has been logged in MySQL. Our logistics team will call you shortly.";
    }
}
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="row g-5">
            <div class="col-lg-5">
                <h1 class="fw-bold text-dark-green mb-3">Get in Touch / Schedule Pickup</h1>
                <p class="text-muted mb-4">Have e-waste to dispose of or need certified data destruction? Fill out the form and our collection team will dispatch a transport vehicle.</p>
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 class="fw-bold text-success mb-3"><i class="fa-solid fa-location-dot me-2"></i>Nairobi Recycling Facility</h5>
                    <p class="text-muted font-sm mb-2">Off Eastern Bypass, Embakasi, Nairobi, Kenya</p>
                    <p class="text-muted font-sm mb-2"><i class="fa-solid fa-phone text-success me-2"></i>+254 700 123 456 / +254 733 987 654</p>
                    <p class="text-muted font-sm mb-0"><i class="fa-solid fa-envelope text-success me-2"></i>info@weeecentre.com</p>
                </div>
                <div class="p-4 rounded-4 bg-dark-green text-white">
                    <h6 class="fw-bold text-warning"><i class="fa-solid fa-user-shield me-2"></i>Are you a Staff Member?</h6>
                    <p class="font-xs text-light mb-3">Log in to the non-programmer CMS portal to view incoming leads, edit website services, and reply to client emails.</p>
                    <a href="admin/index.php" class="btn btn-warning text-dark fw-bold rounded-pill w-100">Open Admin Portal &rarr;</a>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card border-0 shadow rounded-4 p-4 p-md-5 bg-white">
                    <h3 class="fw-bold mb-4">Schedule a Disposal Pickup</h3>
                    <?php if ($successMsg): ?>
                        <div class="alert alert-success rounded-3 p-4">
                            <h5 class="fw-bold"><i class="fa-solid fa-check-circle me-2"></i>Request Received!</h5>
                            <p class="mb-0"><?= htmlspecialchars($successMsg); ?></p>
                        </div>
                    <?php endif; ?>
                    <?php if ($errorMsg): ?>
                        <div class="alert alert-danger rounded-3 p-3"><?= htmlspecialchars($errorMsg); ?></div>
                    <?php endif; ?>
                    <form method="POST" action="contact.php">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm">Your Name *</label>
                                <input type="text" name="name" class="form-control rounded-pill px-3 py-2" required placeholder="John Doe / Corporate IT">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm">Email Address *</label>
                                <input type="email" name="email" class="form-control rounded-pill px-3 py-2" required placeholder="john@company.com">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm">Phone Number</label>
                                <input type="tel" name="phone" class="form-control rounded-pill px-3 py-2" placeholder="+254 700 000 000">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm">Service Needed</label>
                                <select name="service" class="form-select rounded-pill px-3 py-2">
                                    <option value="E-Waste Collection">E-Waste Collection & Logistics</option>
                                    <option value="Data Destruction">Secure Data Destruction</option>
                                    <option value="EPR Compliance">EPR Compliance Assistance</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold font-sm">Estimated Quantity & Notes</label>
                                <textarea name="message" class="form-control rounded-3 p-3" rows="4" placeholder="E.g., 20 desktop computers, 5 server racks, located on 3rd floor in Upper Hill..."></textarea>
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-hero-primary fw-bold rounded-pill px-5 py-3 shadow w-100">Submit Pickup Request 🚚</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>