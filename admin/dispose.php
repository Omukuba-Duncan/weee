<?php
declare(strict_types=1);
session_start();
require_once '../includes/db.php';
require_once '../includes/security.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header('Location: index.php');
    exit;
}

$pageTitle = 'Disposal Requests | WEEE Centre Kenya';
$currentPage = 'contact';

$requests = [];
try {
    $stmt = $pdo->query("SELECT * FROM email_conversations WHERE sender = 'client' ORDER BY id DESC");
    $requests = $stmt->fetchAll();
} catch (Exception $e) {
    log_error('Unable to fetch disposal requests', ['error' => $e->getMessage()]);
}

require_once '../includes/header.php';
require_once '../includes/navbar.php';
?>
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
            <div>
                <h1 class="fw-bold text-dark-green">Disposal Requests</h1>
                <p class="text-muted mb-0">Manage incoming disposal requests and follow-up status.</p>
            </div>
            <a href="index.php" class="btn btn-outline-success rounded-pill px-4">Back to Admin</a>
        </div>
        <div class="card border-0 shadow-sm rounded-4 p-4">
            <?php if (empty($requests)): ?>
            <div class="text-center py-4 text-muted">No disposal requests found yet.</div>
            <?php else: ?>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>Reference</th>
                            <th>Name</th>
                            <th>Message</th>
                            <th>Sent At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($requests as $request): ?>
                        <tr>
                            <td><?= h($request['thread_id'] ?? ''); ?></td>
                            <td><?= h($request['sender_name'] ?? ''); ?></td>
                            <td><?= h($request['message_body'] ?? ''); ?></td>
                            <td><?= h($request['sent_at'] ?? ''); ?></td>
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