<?php
declare(strict_types=1);
session_start();
require_once '../includes/db.php';
require_once '../includes/security.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

$pageTitle = 'Events & Workshops | WEEE Centre Kenya';
$currentPage = 'events';

$registrations = [];
try {
    $stmt = $pdo->query("SELECT * FROM event_registrations ORDER BY created_at DESC");
    $registrations = $stmt->fetchAll();
} catch (Exception $e) {
    log_error('Unable to fetch event registrations', ['error' => $e->getMessage()]);
}

$counts = [];
foreach ($registrations as $reg) {
    $eventId = $reg['event_id'] ?? 'unknown';
    $counts[$eventId] = ($counts[$eventId] ?? 0) + 1;
}

require_once '../includes/header.php';
require_once '../includes/navbar.php';
?>
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
            <div>
                <h1 class="fw-bold text-dark-green">Event Registrations</h1>
                <p class="text-muted mb-0">View attendee lists and the total registrations per event.</p>
            </div>
            <a href="index.php" class="btn btn-outline-success rounded-pill px-4">Back to Admin</a>
        </div>
        <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
            <h5 class="fw-bold mb-3">Registration Summary</h5>
            <div class="row g-3">
                <?php if (empty($counts)): ?>
                <div class="col-12">
                    <p class="text-muted mb-0">No registrations yet.</p>
                </div>
                <?php else: ?>
                <?php foreach ($counts as $eventId => $count): ?>
                <div class="col-12 col-md-6 col-lg-4">
                    <div class="border rounded-4 p-3 bg-light">
                        <div class="fw-bold text-dark-green"><?= h($eventId); ?></div>
                        <div class="fs-4 fw-bold text-success"><?= (int)$count; ?></div>
                        <div class="text-muted font-sm">registrations</div>
                    </div>
                </div>
                <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
        <div class="card border-0 shadow-sm rounded-4 p-4">
            <h5 class="fw-bold mb-3">Registrant List</h5>
            <?php if (empty($registrations)): ?>
            <div class="text-center py-4 text-muted">No registrations available yet.</div>
            <?php else: ?>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Event</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Organization</th>
                            <th>Registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($registrations as $reg): ?>
                        <tr>
                            <td><?= h($reg['name'] ?? ''); ?></td>
                            <td><?= h($reg['event_title'] ?? $reg['event_id'] ?? ''); ?></td>
                            <td><?= h($reg['email'] ?? ''); ?></td>
                            <td><?= h($reg['phone'] ?? ''); ?></td>
                            <td><?= h($reg['organization'] ?? ''); ?></td>
                            <td><?= h($reg['created_at'] ?? ''); ?></td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php require_once '../includes/footer.php'; ?>