<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Our Services | WEEE Centre Kenya';
$currentPage = 'services';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

$stmt = $pdo->query("SELECT * FROM services WHERE status = 'active'");
$services = $stmt->fetchAll();
?>
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <h1 class="fw-bold text-dark-green">Professional E-Waste Services</h1>
            <p class="text-muted">Explore our certified recycling and data destruction capabilities. Need custom modifications? You can edit these live via our <a href="admin/index.php" class="fw-bold text-success text-decoration-none">🛡️ Admin Portal</a>.</p>
        </div>
        <div class="row g-5">
            <?php foreach ($services as $idx => $svc): ?>
            <div class="col-12 border-bottom pb-5 mb-4">
                <div class="row align-items-center g-4 <?= ($idx % 2 !== 0) ? 'flex-md-row-reverse' : ''; ?>">
                    <div class="col-md-6">
                        <span class="badge bg-light text-success border px-3 py-1 mb-2"><?= h($svc['badge']); ?></span>
                        <h2 class="fw-bold mb-3"><?= h($svc['title']); ?></h2>
                        <p class="text-muted mb-4"><?= h($svc['description']); ?></p>
                        <a href="contact.php?service=<?= urlencode($svc['title']); ?>" class="btn btn-success rounded-pill px-4 py-2">Book This Service &rarr;</a>
                    </div>
                    <div class="col-md-6">
                        <img src="<?= h($svc['image_url']); ?>" class="img-fluid rounded-4 shadow" alt="<?= h($svc['title']); ?>">
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>