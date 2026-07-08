<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Featured Projects | WEEE Centre Kenya';
$currentPage = 'projects';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Fetch all featured projects from MySQL database
$stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC");
$projects = $stmt->fetchAll();
?>
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between mb-5">
            <div>
                <h1 class="fw-bold text-dark-green">Our Impact & Featured Projects</h1>
                <p class="text-muted mb-0">Discover our nationwide sustainability campaigns across Kenya.</p>
            </div>
            <a href="admin/index.php" class="btn btn-warning text-dark fw-bold rounded-pill px-4 mt-3 mt-md-0"><i class="fa-solid fa-user-shield me-2"></i>Add Project in Admin</a>
        </div>
        <div class="row g-4">
            <?php if (empty($projects)): ?>
            <div class="col-12 text-center py-5">
                <p class="text-muted fs-5">No projects published yet. Add your first project in the Admin Portal!</p>
            </div>
            <?php else: ?>
                <?php foreach ($projects as $proj): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <img src="<?= h($proj['image_url']); ?>" class="card-img-top" alt="<?= h($proj['title']); ?>" style="height:220px;object-fit:cover;">
                        <div class="card-body p-4">
                            <span class="badge bg-success mb-2"><?= h($proj['badge'] ?? 'Project'); ?></span>
                            <span class="badge bg-light text-muted border mb-2 ms-1"><?= h($proj['category'] ?? 'General'); ?></span>
                            <h5 class="fw-bold text-dark-green mt-1"><?= h($proj['title']); ?></h5>
                            <p class="text-muted font-sm"><?= h($proj['description']); ?></p>
                            <hr class="my-3 opacity-10">
                            <div class="d-flex justify-content-between align-items-center font-xs">
                                <span class="fw-bold text-success"><i class="fa-solid fa-chart-line me-1"></i><?= h($proj['metrics']); ?></span>
                                <span class="text-muted"><?= h($proj['date_str']); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>