<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Our Services | WEEE Centre Kenya';
$currentPage = 'services';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

$stmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY title ASC");
$services = $stmt->fetchAll();
$visibleCount = min(count($services), 6);
?>
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <h1 class="fw-bold text-dark-green">Professional E-Waste Services</h1>
            <p class="text-muted">Explore our certified recycling and data destruction capabilities. Need custom modifications? You can edit these live via our <a href="admin/index.php" class="fw-bold text-success text-decoration-none">🛡️ Admin Portal</a>.</p>
        </div>
        <?php if (empty($services)): ?>
        <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center bg-light">
            <div class="text-success fs-2 mb-3"><i class="fa-solid fa-recycle"></i></div>
            <h3 class="fw-bold text-dark-green mb-2">No services are available right now</h3>
            <p class="text-muted mb-0">Please check back soon as our team updates the service portfolio.</p>
        </div>
        <?php else: ?>
        <div class="row g-4" id="servicesGrid">
            <?php foreach ($services as $index => $svc): ?>
            <div class="col-12 col-md-6 col-xl-4 service-card<?= $index >= $visibleCount ? ' d-none' : ''; ?>">
                <a href="dispose.php?service=<?= urlencode((string)($svc['id'] ?? '')); ?>" class="text-decoration-none text-reset d-block h-100">
                    <div class="card border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                        <img src="<?= h($svc['image_url']); ?>" class="card-img-top" alt="<?= h($svc['title']); ?>" style="height:220px;object-fit:cover;">
                        <div class="card-body p-4 d-flex flex-column">
                            <span class="badge bg-light text-success border px-3 py-1 mb-3 align-self-start"><?= h($svc['badge']); ?></span>
                            <h2 class="fw-bold mb-3 fs-5"><?= h($svc['title']); ?></h2>
                            <p class="text-muted mb-4 flex-grow-1"><?= h($svc['description']); ?></p>
                            <div class="d-flex align-items-center justify-content-between">
                                <span class="fw-semibold text-success">Book this service</span>
                                <span class="btn btn-success rounded-pill px-3 py-2 btn-sm">Select &rarr;</span>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <?php endforeach; ?>
        </div>
        <?php if (count($services) > 6): ?>
        <div class="text-center mt-4">
            <button type="button" class="btn btn-outline-success rounded-pill px-4 py-2" id="showMoreServices">Show More Services</button>
        </div>
        <?php endif; ?>
        <?php endif; ?>
    </div>
</section>
<script>
    const showMoreBtn = document.getElementById('showMoreServices');
    const hiddenCards = Array.from(document.querySelectorAll('.service-card.d-none'));

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            hiddenCards.forEach(card => card.classList.remove('d-none'));
            showMoreBtn.style.display = 'none';
        });
    }
</script>
<?php require_once 'includes/footer.php'; ?>