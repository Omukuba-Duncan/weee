<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Dispose Now | WEEE Centre Kenya';
$currentPage = 'contact';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

$selectedServiceId = trim((string)($_GET['service'] ?? ''));
$selectedService = null;
$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim((string)($_POST['name'] ?? ''));
    $email = trim((string)($_POST['email'] ?? ''));
    $phone = trim((string)($_POST['phone'] ?? ''));
    $service = trim((string)($_POST['service'] ?? ''));
    $message = trim((string)($_POST['message'] ?? ''));

    if ($name === '' || $email === '') {
        $errorMsg = 'Please provide your name and email address so our team can reach you.';
    } else {
        $threadId = uniqid('weee_');
        $stmt = $pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, 'client', ?, ?)");
        $stmt->execute([$threadId, $name, "Service: $service | Phone: $phone\n\n$message"]);
        $successMsg = "Thank you, $name! Your disposal request (#$threadId) has been logged. Our logistics team will contact you shortly.";
    }
}

if ($selectedServiceId !== '') {
    $stmt = $pdo->prepare('SELECT * FROM services WHERE id = ? LIMIT 1');
    $stmt->execute([$selectedServiceId]);
    $selectedService = $stmt->fetch();
}

$servicesStmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY title ASC");
$services = $servicesStmt->fetchAll();
?>
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="row g-5">
            <div class="col-lg-5">
                <h1 class="fw-bold text-dark-green mb-3">Dispose Responsibly</h1>
                <p class="text-muted mb-4">Choose the service that matches your e-waste needs and share a few details so our logistics team can assist quickly.</p>
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 class="fw-bold text-success mb-3"><i class="fa-solid fa-recycle me-2"></i>Available services</h5>
                    <div class="d-flex flex-column gap-2">
                        <?php foreach ($services as $svc): ?>
                        <a href="dispose.php?service=<?= urlencode((string)($svc['id'] ?? '')); ?>" class="btn btn-outline-success rounded-pill text-start <?= (($selectedService['id'] ?? '') === ($svc['id'] ?? '')) ? 'active' : ''; ?>">
                            <i class="fa-solid fa-arrow-right me-2"></i><?= h($svc['title']); ?>
                        </a>
                        <?php endforeach; ?>
                    </div>
                </div>
                <?php if ($selectedService): ?>
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white">
                    <h6 class="fw-bold text-dark-green mb-2">Selected service</h6>
                    <p class="text-muted mb-0"><?= h($selectedService['description'] ?? ''); ?></p>
                </div>
                <?php endif; ?>
            </div>
            <div class="col-lg-7">
                <div class="card border-0 shadow rounded-4 p-4 p-md-5 bg-white">
                    <h3 class="fw-bold mb-4">Book a Disposal Pickup</h3>
                    <?php if ($successMsg): ?>
                        <div class="alert alert-success rounded-3 p-3 mb-4">
                            <i class="fa-solid fa-circle-check me-2"></i><?= h($successMsg); ?>
                        </div>
                    <?php endif; ?>
                    <?php if ($errorMsg): ?>
                        <div class="alert alert-danger rounded-3 p-3 mb-4"><?= h($errorMsg); ?></div>
                    <?php endif; ?>
                    <form method="POST" action="dispose.php" id="disposeForm">
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
                                    <?php foreach ($services as $svc): ?>
                                    <option value="<?= h($svc['title']); ?>" <?= (($selectedService['id'] ?? '') === ($svc['id'] ?? '')) ? 'selected' : ''; ?>><?= h($svc['title']); ?></option>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold font-sm">Estimated Quantity & Notes</label>
                                <textarea name="message" class="form-control rounded-3 p-3" rows="4" placeholder="E.g., 20 desktop computers, 5 server racks, located on 3rd floor in Upper Hill..."></textarea>
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-hero-primary fw-bold rounded-pill px-5 py-3 shadow w-100" id="disposeSubmitBtn">Submit Pickup Request 🚚</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<script>
    const disposeForm = document.getElementById('disposeForm');
    const disposeSubmitBtn = document.getElementById('disposeSubmitBtn');

    if (disposeForm && disposeSubmitBtn) {
        disposeForm.addEventListener('submit', () => {
            disposeSubmitBtn.disabled = true;
            disposeSubmitBtn.innerHTML = '<span class="me-2"><i class="fa-solid fa-spinner fa-spin"></i></span>Submitting...';
        });
    }
</script>
<?php require_once 'includes/footer.php'; ?>