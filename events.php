<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';
require_once 'includes/security.php';
require_once 'includes/mail.php';

$pageTitle = 'Events & Workshops | WEEE Centre Kenya';
$currentPage = 'events';

$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verify_csrf()) {
        $errorMsg = 'Your session expired. Please try again.';
    } elseif (is_honeypot_filled()) {
        $errorMsg = 'Submission rejected.';
    } else {
        $eventId = sanitize_text($_POST['event_id'] ?? 'epr-workshop');
        $eventTitle = sanitize_text($_POST['event_title'] ?? 'Annual EPR Corporate Compliance Workshop');
        $name = sanitize_text($_POST['name'] ?? '');
        $email = filter_var(sanitize_text($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $phone = sanitize_text($_POST['phone'] ?? '');
        $organization = sanitize_text($_POST['organization'] ?? '');
        $notes = sanitize_text($_POST['notes'] ?? '');

        if ($name === '' || $email === false) {
            $errorMsg = 'Please provide your name and a valid email address.';
        } else {
            try {
                $stmt = $pdo->prepare("INSERT INTO event_registrations (event_id, event_title, name, email, phone, organization, notes) VALUES (?, ?, ?, ?, ?, ?, ?)");
                $stmt->execute([$eventId, $eventTitle, $name, $email, $phone, $organization, $notes]);

                $message = '<p>Hi ' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . ',</p>'
                    . '<p>Thanks for registering for <strong>' . htmlspecialchars($eventTitle, ENT_QUOTES, 'UTF-8') . '</strong>.</p>'
                    . '<p>We will send you the agenda and access details shortly.</p>'
                    . '<p>Regards,<br>WEEE Centre Team</p>';
                send_smtp_email($email, 'Your event registration is confirmed', $message, $name);
                $successMsg = 'Registration received. A confirmation email has been sent.';
            } catch (Exception $e) {
                log_error('Event registration failed', ['event_id' => $eventId, 'email' => $email, 'error' => $e->getMessage()]);
                $errorMsg = 'We could not complete your registration right now. Please try again later.';
            }
        }
    }
}

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
                    </div>
                    <?php if ($successMsg): ?>
                        <div class="alert alert-success rounded-3 mt-3 mb-0"><?= h($successMsg); ?></div>
                    <?php endif; ?>
                    <?php if ($errorMsg): ?>
                        <div class="alert alert-danger rounded-3 mt-3 mb-0"><?= h($errorMsg); ?></div>
                    <?php endif; ?>
                    <form method="POST" action="events.php" class="mt-4">
                        <?= csrf_field(); ?>
                        <input type="text" name="website" class="visually-hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
                        <input type="hidden" name="event_id" value="epr-workshop">
                        <input type="hidden" name="event_title" value="Annual EPR Corporate Compliance Workshop">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm" for="event-name">Full Name *</label>
                                <input type="text" id="event-name" name="name" class="form-control rounded-pill px-3 py-2" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm" for="event-email">Email Address *</label>
                                <input type="email" id="event-email" name="email" class="form-control rounded-pill px-3 py-2" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm" for="event-phone">Phone Number</label>
                                <input type="tel" id="event-phone" name="phone" class="form-control rounded-pill px-3 py-2">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold font-sm" for="event-org">Organization</label>
                                <input type="text" id="event-org" name="organization" class="form-control rounded-pill px-3 py-2">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold font-sm" for="event-notes">Notes</label>
                                <textarea id="event-notes" name="notes" class="form-control rounded-3 p-3" rows="3"></textarea>
                            </div>
                            <div class="col-12 mt-2">
                                <button type="submit" class="btn btn-success rounded-pill px-4 py-2">Register Free</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>