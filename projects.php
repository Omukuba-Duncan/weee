<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Featured Projects | WEEE Centre Kenya';
$currentPage = 'projects';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

function parse_project_images($value): array {
    $raw = trim((string)($value ?? ''));
    if ($raw === '') {
        return [];
    }

    $parts = preg_split('/\s*(?:,|\||\n)\s*/', $raw) ?: [];
    $parts = array_filter(array_map('trim', $parts), static function ($item): bool {
        return $item !== '';
    });

    return array_values($parts);
}

function project_sub_programs(array $project): array {
    $items = [];
    $badge = trim((string)($project['badge'] ?? ''));
    $category = trim((string)($project['category'] ?? ''));

    if ($badge !== '') {
        $items[] = $badge;
    }
    if ($category !== '' && (!in_array($category, $items, true))) {
        $items[] = $category;
    }

    return array_values(array_unique($items));
}

$stmt = $pdo->query("SELECT * FROM projects ORDER BY id DESC");
$projects = $stmt->fetchAll();
?>
<style>
    .project-modal-gallery img {
        display: block;
        width: 100%;
        height: 220px;
        object-fit: cover;
        border-radius: 1rem;
    }
    .project-modal-thumbs {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: .5rem;
    }
    @media (max-width: 767px) {
        .project-modal-thumbs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
</style>
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
                <?php $images = parse_project_images($proj['image_url'] ?? ''); ?>
                <?php $mainImage = $images[0] ?? $proj['image_url'] ?? ''; ?>
                <?php $subPrograms = project_sub_programs($proj); ?>
                <div class="col-12 col-md-6 col-lg-4">
                    <button type="button" class="btn border-0 p-0 text-start w-100" data-bs-toggle="modal" data-bs-target="#projectModal<?= h($proj['id']); ?>" aria-label="View details for <?= h($proj['title']); ?>">
                        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                            <img src="<?= h($mainImage); ?>" class="card-img-top" alt="<?= h($proj['title']); ?>" style="height:220px;object-fit:cover;">
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
                    </button>
                </div>
                <div class="modal fade" id="projectModal<?= h($proj['id']); ?>" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
                        <div class="modal-content border-0 rounded-4 shadow">
                            <div class="modal-header bg-light border-0">
                                <div>
                                    <h5 class="modal-title fw-bold text-dark-green"><?= h($proj['title']); ?></h5>
                                    <p class="mb-0 text-muted font-sm"><?= h($proj['date_str']); ?></p>
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 p-md-5">
                                <div class="row g-4 align-items-start">
                                    <div class="col-12 col-lg-7">
                                        <?php if (!empty($images)): ?>
                                        <div class="project-modal-gallery">
                                            <img src="<?= h($images[0]); ?>" alt="<?= h($proj['title']); ?>" class="mb-3">
                                            <?php if (count($images) > 1): ?>
                                            <div class="project-modal-thumbs">
                                                <?php foreach ($images as $img): ?>
                                                <img src="<?= h($img); ?>" alt="Additional view for <?= h($proj['title']); ?>">
                                                <?php endforeach; ?>
                                            </div>
                                            <?php endif; ?>
                                        </div>
                                        <?php else: ?>
                                        <div class="text-center p-4 rounded-4 bg-light text-muted">No gallery images are available for this project yet.</div>
                                        <?php endif; ?>
                                    </div>
                                    <div class="col-12 col-lg-5">
                                        <span class="badge bg-success mb-3"><?= h($proj['badge'] ?? 'Project'); ?></span>
                                        <span class="badge bg-light text-muted border mb-3 ms-1"><?= h($proj['category'] ?? 'General'); ?></span>
                                        <p class="text-muted mb-4"><?= h($proj['description']); ?></p>
                                        <div class="d-flex flex-wrap gap-2 mb-4">
                                            <span class="badge bg-light text-success border px-3 py-2"><i class="fa-solid fa-chart-line me-2"></i><?= h($proj['metrics']); ?></span>
                                        </div>
                                        <?php if (count($subPrograms) > 1): ?>
                                        <div class="mb-4">
                                            <h6 class="fw-bold text-dark-green mb-3">Explore related sub-programs</h6>
                                            <div class="d-flex flex-wrap gap-2">
                                                <?php foreach ($subPrograms as $index => $subProgram): ?>
                                                <?php $anchorId = 'project-' . h($proj['id']) . '-' . $index; ?>
                                                <a href="#<?= $anchorId; ?>" class="btn btn-outline-success btn-sm rounded-pill"><?= h($subProgram); ?></a>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                        <?php endif; ?>
                                        <div class="card border-0 rounded-4 bg-light p-3">
                                            <h6 class="fw-bold text-dark-green mb-2">Why this matters</h6>
                                            <p class="text-muted mb-0 font-sm">This program highlights how WEEE Centre combines logistics, training and compliance to create measurable environmental impact.</p>
                                        </div>
                                    </div>
                                </div>
                                <?php if (count($subPrograms) > 1): ?>
                                <div class="mt-4">
                                    <?php foreach ($subPrograms as $index => $subProgram): ?>
                                    <?php $anchorId = 'project-' . h($proj['id']) . '-' . $index; ?>
                                    <div id="<?= $anchorId; ?>" class="card border-0 rounded-4 bg-white shadow-sm p-4 mt-3">
                                        <h6 class="fw-bold text-dark-green mb-2"><?= h($subProgram); ?></h6>
                                        <p class="text-muted mb-0"><?= h($proj['description']); ?></p>
                                    </div>
                                    <?php endforeach; ?>
                                </div>
                                <?php endif; ?>
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