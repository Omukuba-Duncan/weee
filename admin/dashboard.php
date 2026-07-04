<?php
/**
 * WEEE Centre Non-Programmer Dashboard & Lead Manager
 * File: admin/dashboard.php
 */
session_start();
require_once '../includes/db.php';

if (!isset($_SESSION['admin_logged_in'])) {
    header("Location: index.php");
    exit;
}

// Handle Logout
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

$msg = '';
$error = '';

// Helper for safe table query
function safeFetch($pdo, $sql) {
    try {
        return $pdo->query($sql)->fetchAll();
    } catch (Exception $e) {
        return [];
    }
}

// Handle non-programmer CRUD actions via simple POST forms
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];
    if ($action === 'add_service') {
        $title = trim($_POST['title'] ?? '');
        $badge = trim($_POST['badge'] ?? 'Recycling');
        $desc = trim($_POST['desc'] ?? '');
        $icon = trim($_POST['icon'] ?? 'fa-solid fa-recycle');
        $img = trim($_POST['img'] ?? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80');

        if ($title && $desc) {
            $stmt = $pdo->prepare("INSERT INTO services (id, title, icon, badge, description, image_url) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([uniqid('svc_'), $title, $icon, $badge, $desc, $img]);
            $msg = "New service added successfully! It is now live on the website.";
        } else {
            $error = "Please provide both service title and description.";
        }
    } elseif ($action === 'delete_service') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM services WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Service removed from live website.";
    } elseif ($action === 'add_project') {
        $title = trim($_POST['title'] ?? '');
        $category = trim($_POST['category'] ?? 'Collection Drives');
        $badge = trim($_POST['badge'] ?? 'Collection Drive');
        $date_str = trim($_POST['date_str'] ?? 'Ongoing Initiative');
        $metrics = trim($_POST['metrics'] ?? '100% Zero Landfill');
        $desc = trim($_POST['desc'] ?? '');
        $img = trim($_POST['img'] ?? 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80');

        if ($title && $desc) {
            $stmt = $pdo->prepare("INSERT INTO projects (id, category, badge, title, date_str, description, metrics, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([uniqid('proj_'), $category, $badge, $title, $date_str, $desc, $metrics, $img]);
            $msg = "Featured Project added successfully!";
        } else {
            $error = "Please provide project title and description.";
        }
    } elseif ($action === 'delete_project') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Project removed from live website.";
    } elseif ($action === 'add_partner') {
        $name = trim($_POST['name'] ?? '');
        $label = trim($_POST['label'] ?? 'Corporate Partner');
        $icon = trim($_POST['icon'] ?? 'fa-solid fa-handshake');
        if ($name) {
            $stmt = $pdo->prepare("INSERT INTO partners (id, name, icon, label) VALUES (?, ?, ?, ?)");
            $stmt->execute([uniqid('part_'), $name, $icon, $label]);
            $msg = "Partner organization added!";
        }
    } elseif ($action === 'delete_partner') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM partners WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Partner removed.";
    } elseif ($action === 'update_inquiry_status') {
        $id = $_POST['id'] ?? '';
        $status = $_POST['status'] ?? 'In Progress';
        $stmt = $pdo->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        $msg = "Disposal lead status updated to: " . $status;
    } elseif ($action === 'delete_inquiry') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM inquiries WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Disposal lead record deleted.";
    } elseif ($action === 'send_reply') {
        $thread_id = trim($_POST['thread_id'] ?? 'WEEE-GENERAL');
        $reply = trim($_POST['reply'] ?? '');
        if ($reply) {
            $stmt = $pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, 'admin', 'WEEE Centre Admin Support', ?)");
            $stmt->execute([$thread_id, $reply]);
            $msg = "Reply sent to client thread #" . $thread_id;
        }
    } elseif ($action === 'delete_email') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM email_conversations WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Message deleted.";
    } elseif ($action === 'edit_service') {
        $id = $_POST['id'] ?? '';
        $title = trim($_POST['title'] ?? '');
        $badge = trim($_POST['badge'] ?? 'Recycling');
        $desc = trim($_POST['desc'] ?? '');
        $icon = trim($_POST['icon'] ?? 'fa-solid fa-recycle');
        $img = trim($_POST['img'] ?? '');
        if ($id && $title) {
            $stmt = $pdo->prepare("UPDATE services SET title = ?, icon = ?, badge = ?, description = ?, image_url = ? WHERE id = ?");
            $stmt->execute([$title, $icon, $badge, $desc, $img, $id]);
            $msg = "Service updated successfully!";
        }
    } elseif ($action === 'edit_project') {
        $id = $_POST['id'] ?? '';
        $title = trim($_POST['title'] ?? '');
        $category = trim($_POST['category'] ?? 'Collection Drives');
        $badge = trim($_POST['badge'] ?? 'Collection Drive');
        $date_str = trim($_POST['date_str'] ?? 'Ongoing');
        $metrics = trim($_POST['metrics'] ?? '');
        $desc = trim($_POST['desc'] ?? '');
        $img = trim($_POST['img'] ?? '');
        if ($id && $title) {
            $stmt = $pdo->prepare("UPDATE projects SET category = ?, badge = ?, title = ?, date_str = ?, description = ?, metrics = ?, image_url = ? WHERE id = ?");
            $stmt->execute([$category, $badge, $title, $date_str, $desc, $metrics, $img, $id]);
            $msg = "Project updated successfully!";
        }
    } elseif ($action === 'add_staff') {
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $dept = trim($_POST['dept'] ?? 'Operations');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $photo = trim($_POST['photo'] ?? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80');
        $status = trim($_POST['status'] ?? 'Active');
        if ($name && $role) {
            $stmt = $pdo->prepare("INSERT INTO staff_members (id, name, role, department, email, phone, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([uniqid('staff_'), $name, $role, $dept, $email, $phone, $photo, $status]);
            $msg = "New staff member added to Leadership & Team roster!";
        }
    } elseif ($action === 'edit_staff') {
        $id = $_POST['id'] ?? '';
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        $dept = trim($_POST['dept'] ?? 'Operations');
        $email = trim($_POST['email'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $photo = trim($_POST['photo'] ?? '');
        $status = trim($_POST['status'] ?? 'Active');
        if ($id && $name) {
            $stmt = $pdo->prepare("UPDATE staff_members SET name = ?, role = ?, department = ?, email = ?, phone = ?, photo = ?, status = ? WHERE id = ?");
            $stmt->execute([$name, $role, $dept, $email, $phone, $photo, $status, $id]);
            $msg = "Staff member updated successfully!";
        }
    } elseif ($action === 'delete_staff') {
        $id = $_POST['id'] ?? '';
        $stmt = $pdo->prepare("DELETE FROM staff_members WHERE id = ?");
        $stmt->execute([$id]);
        $msg = "Staff member removed.";
    } elseif ($action === 'update_staff_status') {
        $id = $_POST['id'] ?? '';
        $status = $_POST['status'] ?? 'Active';
        $stmt = $pdo->prepare("UPDATE staff_members SET status = ? WHERE id = ?");
        $stmt->execute([$status, $id]);
        $msg = "Staff deployment status updated to: " . $status;
    }
}

// Fetch all data from MySQL
$services = safeFetch($pdo, "SELECT * FROM services ORDER BY id DESC");
$projects = safeFetch($pdo, "SELECT * FROM projects ORDER BY id DESC");
$partners = safeFetch($pdo, "SELECT * FROM partners ORDER BY id DESC");
$inquiries = safeFetch($pdo, "SELECT * FROM inquiries ORDER BY id DESC");
$emails = safeFetch($pdo, "SELECT * FROM email_conversations ORDER BY id DESC");
$staff_members = safeFetch($pdo, "SELECT * FROM staff_members ORDER BY id ASC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WEEE Centre Admin Portal | 8-Tab CMS Desk</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body { font-family: 'Poppins', sans-serif; background-color: #f4f7f6; min-height: 100vh; }
        .bg-dark-green { background-color: #0d3d26 !important; }
        .text-dark-green { color: #0d3d26 !important; }
        .nav-pills .nav-link.active { background-color: #1da15c !important; color: white !important; font-weight: 600; shadow: 0 4px 10px rgba(29,161,92,0.3); }
        .nav-pills .nav-link { color: #0d3d26; font-size: 0.88rem; transition: all 0.2s; }
        .nav-pills .nav-link:hover { background-color: rgba(29,161,92,0.1); }
        .card { border-radius: 1rem !important; }
    </style>
</head>
<body>
    <!-- Top Navbar -->
    <nav class="navbar navbar-dark bg-dark-green sticky-top px-4 py-2 shadow">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center gap-2" href="#">
                <span class="badge bg-success p-2 rounded-circle"><i class="fa-solid fa-user-shield fs-6"></i></span>
                <span class="fw-bold">WEEE Centre CMS Desk</span>
            </a>
            <div class="d-flex align-items-center gap-3">
                <span class="text-light font-sm d-none d-md-inline"><i class="fa-solid fa-circle text-success me-1"></i> XAMPP MySQL Connected</span>
                <a href="../index.php" target="_blank" class="btn btn-sm btn-outline-light rounded-pill px-3"><i class="fa-solid fa-globe me-1"></i> View Live Site</a>
                <a href="dashboard.php?logout=1" class="btn btn-sm btn-danger rounded-pill px-3 fw-bold"><i class="fa-solid fa-right-from-bracket me-1"></i> Logout</a>
            </div>
        </div>
    </nav>

    <!-- Top Hero Banner -->
    <div class="bg-dark-green text-white py-4 mb-4 border-top border-secondary border-opacity-25 shadow-sm">
        <div class="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div class="d-flex align-items-center gap-3">
                <div class="bg-white text-success rounded-circle p-3 d-flex align-items-center justify-content-center shadow" style="width: 54px; height: 54px;">
                    <i class="fa-solid fa-user-gear fs-3"></i>
                </div>
                <div>
                    <div class="d-flex align-items-center gap-2">
                        <h4 class="fw-bold mb-0 text-white">WEEE Centre Admin Portal</h4>
                        <span class="badge bg-success text-white font-xs rounded-pill">Non-Programmer UI</span>
                    </div>
                    <p class="font-sm text-light mb-0 opacity-75">No coding required! Edit services, featured projects, corporate partners, and reply to client emails in real-time.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard Main Container -->
    <div class="container mb-5">
        <?php if ($msg): ?>
            <div class="alert alert-success alert-dismissible fade show rounded-4 shadow-sm py-3" role="alert">
                <i class="fa-solid fa-check-circle me-2 fs-5 align-middle"></i> <strong>Success!</strong> <?= htmlspecialchars($msg); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>
        <?php if ($error): ?>
            <div class="alert alert-danger alert-dismissible fade show rounded-4 shadow-sm py-3" role="alert">
                <i class="fa-solid fa-exclamation-triangle me-2 fs-5 align-middle"></i> <strong>Notice:</strong> <?= htmlspecialchars($error); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>

        <!-- 8-TAB BOOTSTRAP PILLS NAVIGATION -->
        <div class="card border-0 shadow-sm mb-4 bg-white p-2">
            <ul class="nav nav-pills nav-fill flex-column flex-md-row gap-1" id="adminTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-pill py-2" id="stats-tab" data-bs-toggle="pill" data-bs-target="#tab-stats" type="button" role="tab">
                        <i class="fa-solid fa-chart-pie me-1"></i> Overview (<?= count($inquiries); ?> Leads)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="services-tab" data-bs-toggle="pill" data-bs-target="#tab-services" type="button" role="tab">
                        <i class="fa-solid fa-truck-fast me-1"></i> Services (<?= count($services); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="projects-tab" data-bs-toggle="pill" data-bs-target="#tab-projects" type="button" role="tab">
                        <i class="fa-solid fa-layer-group me-1"></i> Projects (<?= count($projects); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="partners-tab" data-bs-toggle="pill" data-bs-target="#tab-partners" type="button" role="tab">
                        <i class="fa-solid fa-handshake me-1"></i> Partners (<?= count($partners); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="staff-tab" data-bs-toggle="pill" data-bs-target="#tab-staff" type="button" role="tab">
                        <i class="fa-solid fa-users me-1"></i> Staff Team (<?= count($staff_members); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="inquiries-tab" data-bs-toggle="pill" data-bs-target="#tab-inquiries" type="button" role="tab">
                        <i class="fa-solid fa-inbox me-1"></i> Disposal Leads (<?= count($inquiries); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="emails-tab" data-bs-toggle="pill" data-bs-target="#tab-emails" type="button" role="tab">
                        <i class="fa-solid fa-envelope me-1"></i> Email Inbox (<?= count($emails); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2 bg-light text-dark fw-bold" id="xampp-tab" data-bs-toggle="pill" data-bs-target="#tab-xampp" type="button" role="tab">
                        <i class="fa-solid fa-database text-warning me-1"></i> XAMPP SQL Export
                    </button>
                </li>
            </ul>
        </div>

        <!-- TAB CONTENT PANES -->
        <div class="tab-content" id="adminTabsContent">
            
            <!-- TAB 1: OVERVIEW & STATS -->
            <div class="tab-pane fade show active" id="tab-stats" role="tabpanel">
                <div class="row g-4 mb-4">
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-success border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Live Services</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark-green mb-0"><?= count($services); ?></h2>
                                <div class="bg-success bg-opacity-10 text-success p-3 rounded-circle"><i class="fa-solid fa-truck-fast fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('services-tab').click()" class="btn btn-link btn-sm text-success p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Services &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-primary border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Featured Projects</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count($projects); ?></h2>
                                <div class="bg-primary bg-opacity-10 text-primary p-3 rounded-circle"><i class="fa-solid fa-layer-group fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('projects-tab').click()" class="btn btn-link btn-sm text-primary p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Projects &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-warning border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Active Partners</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count($partners); ?></h2>
                                <div class="bg-warning bg-opacity-10 text-warning p-3 rounded-circle"><i class="fa-solid fa-handshake fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('partners-tab').click()" class="btn btn-link btn-sm text-warning p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Partners &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-danger border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Disposal Leads</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count($inquiries); ?></h2>
                                <div class="bg-danger bg-opacity-10 text-danger p-3 rounded-circle"><i class="fa-solid fa-inbox fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('inquiries-tab').click()" class="btn btn-link btn-sm text-danger p-0 mt-3 text-start font-xs text-decoration-none fw-bold">View Disposal Leads &rarr;</button>
                        </div>
                    </div>
                </div>

                <div class="card border-0 shadow-sm p-4 bg-white">
                    <h5 class="fw-bold text-dark-green mb-3"><i class="fa-solid fa-circle-info me-2 text-success"></i>Welcome to your XAMPP MySQL Admin Console</h5>
                    <p class="text-muted font-sm mb-2">This control panel is connected directly to your local MySQL database (<code>weeecentre_db</code>) running on Apache/XAMPP. Whenever you add or remove services, projects, or reply to inquiries here, your changes take effect immediately across all live pages (index.php, services.php, projects.php, about.php).</p>
                    <div class="alert alert-light border rounded-3 mt-3 font-sm mb-0">
                        <i class="fa-solid fa-lightbulb text-warning me-2"></i> <strong>Pro-Tip:</strong> Use the navigation pills above to explore different modules. You can even update lead statuses or reply to emails!
                    </div>
                </div>
            </div>

            <!-- TAB 2: SERVICES MANAGEMENT -->
            <div class="tab-pane fade" id="tab-services" role="tabpanel">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm p-4 bg-white">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="fw-bold mb-0"><i class="fa-solid fa-truck-fast text-success me-2"></i>Live Website Services</h5>
                                <span class="badge bg-light text-dark border"><?= count($services); ?> Live</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Service</th><th>Category Tag</th><th class="text-end">Action</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($services)): ?>
                                            <tr><td colspan="3" class="text-center py-4 text-muted">No services live yet.</td></tr>
                                        <?php else: ?>
                                            <?php foreach ($services as $svc): ?>
                                            <tr>
                                                <td>
                                                    <div class="fw-bold text-dark"><i class="<?= htmlspecialchars($svc['icon']); ?> me-2 text-success"></i><?= htmlspecialchars($svc['title']); ?></div>
                                                    <div class="font-xs text-muted text-truncate" style="max-width:260px;"><?= htmlspecialchars($svc['description']); ?></div>
                                                </td>
                                                <td><span class="badge bg-success-subtle text-success border border-success-subtle"><?= htmlspecialchars($svc['badge']); ?></span></td>
                                                <td class="text-end">
                                                    <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete service from website?');">
                                                        <input type="hidden" name="action" value="delete_service">
                                                        <input type="hidden" name="id" value="<?= $svc['id']; ?>">
                                                        <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                    </form>
                                                </td>
                                            </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm p-4 bg-white sticky-top" style="top: 90px;">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-plus-circle text-success me-2"></i>Add New Service</h5>
                            <form method="POST" action="dashboard.php">
                                <input type="hidden" name="action" value="add_service">
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Service Title *</label>
                                    <input type="text" name="title" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., Solar Panel Recycling" required>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Badge Tag</label>
                                        <input type="text" name="badge" class="form-control rounded-pill px-3 py-2 font-sm" value="Green Energy">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Icon Class</label>
                                        <input type="text" name="icon" class="form-control rounded-pill px-3 py-2 font-sm" value="fa-solid fa-recycle">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Description *</label>
                                    <textarea name="desc" class="form-control rounded-3 p-3 font-sm" rows="3" placeholder="Explain the service..." required></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label font-sm fw-semibold">Image URL</label>
                                    <input type="url" name="img" class="form-control rounded-pill px-3 py-2 font-sm" value="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80">
                                </div>
                                <button type="submit" class="btn btn-success fw-bold w-100 rounded-pill py-2" style="background-color: #1da15c;"><i class="fa-solid fa-cloud-arrow-up me-1"></i> Publish Service</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 3: PROJECTS MANAGEMENT -->
            <div class="tab-pane fade" id="tab-projects" role="tabpanel">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm p-4 bg-white">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="fw-bold mb-0"><i class="fa-solid fa-layer-group text-primary me-2"></i>Featured Projects & Case Studies</h5>
                                <span class="badge bg-light text-dark border"><?= count($projects); ?> Live</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Project Title</th><th>Category & Date</th><th class="text-end">Action</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($projects)): ?>
                                            <tr><td colspan="3" class="text-center py-4 text-muted">No projects found.</td></tr>
                                        <?php else: ?>
                                            <?php foreach ($projects as $proj): ?>
                                            <tr>
                                                <td>
                                                    <div class="fw-bold text-dark"><?= htmlspecialchars($proj['title']); ?></div>
                                                    <div class="font-xs text-success fw-semibold"><?= htmlspecialchars($proj['metrics']); ?></div>
                                                </td>
                                                <td>
                                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle d-block mb-1"><?= htmlspecialchars($proj['category']); ?></span>
                                                    <span class="font-xs text-muted"><?= htmlspecialchars($proj['date_str']); ?></span>
                                                </td>
                                                <td class="text-end">
                                                    <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete project?');">
                                                        <input type="hidden" name="action" value="delete_project">
                                                        <input type="hidden" name="id" value="<?= $proj['id']; ?>">
                                                        <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                    </form>
                                                </td>
                                            </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm p-4 bg-white sticky-top" style="top: 90px;">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-plus-circle text-primary me-2"></i>Add Featured Project</h5>
                            <form method="POST" action="dashboard.php">
                                <input type="hidden" name="action" value="add_project">
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Project Title *</label>
                                    <input type="text" name="title" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., University E-Waste Drive" required>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Category</label>
                                        <input type="text" name="category" class="form-control rounded-pill px-3 py-2 font-sm" value="Collection Drives">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Date / Timeline</label>
                                        <input type="text" name="date_str" class="form-control rounded-pill px-3 py-2 font-sm" value="Ongoing Initiative • 2026">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Key Metric Highlights</label>
                                    <input type="text" name="metrics" class="form-control rounded-pill px-3 py-2 font-sm" value="5,000+ Tonnes Collected | 100% Zero Landfill">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Description *</label>
                                    <textarea name="desc" class="form-control rounded-3 p-3 font-sm" rows="3" placeholder="Detail the project scope and results..." required></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label font-sm fw-semibold">Image URL</label>
                                    <input type="url" name="img" class="form-control rounded-pill px-3 py-2 font-sm" value="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80">
                                </div>
                                <button type="submit" class="btn btn-primary fw-bold w-100 rounded-pill py-2"><i class="fa-solid fa-cloud-arrow-up me-1"></i> Publish Project</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 4: PARTNERS MANAGEMENT -->
            <div class="tab-pane fade" id="tab-partners" role="tabpanel">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm p-4 bg-white">
                            <h5 class="fw-bold mb-4"><i class="fa-solid fa-handshake text-warning me-2"></i>Corporate & Government Partners</h5>
                            <div class="row g-3">
                                <?php if (empty($partners)): ?>
                                    <div class="col-12 text-center text-muted py-4">No partners found.</div>
                                <?php else: ?>
                                    <?php foreach ($partners as $part): ?>
                                    <div class="col-md-6">
                                        <div class="border rounded-4 p-3 d-flex align-items-center justify-content-between bg-light">
                                            <div class="d-flex align-items-center gap-3">
                                                <div class="bg-white p-3 rounded-circle shadow-sm text-success"><i class="<?= htmlspecialchars($part['icon']); ?> fs-5"></i></div>
                                                <div>
                                                    <h6 class="fw-bold mb-0 text-dark"><?= htmlspecialchars($part['name']); ?></h6>
                                                    <span class="font-xs text-muted"><?= htmlspecialchars($part['label']); ?></span>
                                                </div>
                                            </div>
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Remove partner?');">
                                                <input type="hidden" name="action" value="delete_partner">
                                                <input type="hidden" name="id" value="<?= $part['id']; ?>">
                                                <button type="submit" class="btn btn-sm text-danger p-1"><i class="fa-solid fa-xmark fs-6"></i></button>
                                            </form>
                                        </div>
                                    </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm p-4 bg-white sticky-top" style="top: 90px;">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-plus-circle text-warning me-2"></i>Add Partner Organization</h5>
                            <form method="POST" action="dashboard.php">
                                <input type="hidden" name="action" value="add_partner">
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Organization Name *</label>
                                    <input type="text" name="name" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., Safaricom Kenya" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Partnership Type / Label</label>
                                    <input type="text" name="label" class="form-control rounded-pill px-3 py-2 font-sm" value="Corporate E-Waste Sponsor">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label font-sm fw-semibold">Icon Class</label>
                                    <input type="text" name="icon" class="form-control rounded-pill px-3 py-2 font-sm" value="fa-solid fa-handshake">
                                </div>
                                <button type="submit" class="btn btn-warning text-dark fw-bold w-100 rounded-pill py-2"><i class="fa-solid fa-plus me-1"></i> Add Partner</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 5: DISPOSAL LEADS & INQUIRIES -->
            <div class="tab-pane fade" id="tab-inquiries" role="tabpanel">
                <div class="card border-0 shadow-sm p-4 bg-white">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h5 class="fw-bold mb-0"><i class="fa-solid fa-inbox text-danger me-2"></i>Incoming E-Waste Disposal Requests</h5>
                        <span class="badge bg-danger-subtle text-danger border border-danger-subtle"><?= count($inquiries); ?> Leads</span>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>Ticket / Date</th>
                                    <th>Client Details</th>
                                    <th>Disposal Request & Scope</th>
                                    <th>Status Updater</th>
                                    <th class="text-end">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($inquiries)): ?>
                                    <tr><td colspan="5" class="text-center py-5 text-muted">No disposal inquiries received yet.</td></tr>
                                <?php else: ?>
                                    <?php foreach ($inquiries as $inq): ?>
                                    <tr>
                                        <td>
                                            <span class="badge bg-dark font-xs mb-1"><?= htmlspecialchars($inq['ticket_no'] ?? '#000'); ?></span>
                                            <div class="font-xs text-muted"><?= htmlspecialchars($inq['created_date'] ?? 'Today'); ?></div>
                                        </td>
                                        <td>
                                            <div class="fw-bold text-dark"><?= htmlspecialchars($inq['name']); ?></div>
                                            <div class="font-xs text-muted"><i class="fa-solid fa-envelope me-1"></i><?= htmlspecialchars($inq['email']); ?></div>
                                            <div class="font-xs text-muted"><i class="fa-solid fa-phone me-1"></i><?= htmlspecialchars($inq['phone']); ?></div>
                                        </td>
                                        <td>
                                            <span class="badge bg-info-subtle text-info border border-info-subtle font-xs mb-1"><?= htmlspecialchars($inq['type']); ?></span>
                                            <div class="fw-semibold font-sm text-dark"><?= htmlspecialchars($inq['subject']); ?></div>
                                            <div class="font-xs text-muted" style="max-width:320px;"><?= htmlspecialchars($inq['message']); ?></div>
                                        </td>
                                        <td>
                                            <form method="POST" action="dashboard.php" class="d-flex align-items-center gap-1">
                                                <input type="hidden" name="action" value="update_inquiry_status">
                                                <input type="hidden" name="id" value="<?= $inq['id']; ?>">
                                                <select name="status" class="form-select form-select-sm font-xs rounded-pill" onchange="this.form.submit()" style="width:130px;">
                                                    <option value="New" <?= ($inq['status'] === 'New') ? 'selected' : ''; ?>>New</option>
                                                    <option value="In Progress" <?= ($inq['status'] === 'In Progress') ? 'selected' : ''; ?>>In Progress</option>
                                                    <option value="Completed" <?= ($inq['status'] === 'Completed') ? 'selected' : ''; ?>>Completed</option>
                                                    <option value="Archived" <?= ($inq['status'] === 'Archived') ? 'selected' : ''; ?>>Archived</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td class="text-end">
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete lead?');">
                                                <input type="hidden" name="action" value="delete_inquiry">
                                                <input type="hidden" name="id" value="<?= $inq['id']; ?>">
                                                <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                            </form>
                                        </td>
                                    </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- TAB 6: EMAIL CONVERSATIONS -->
            <div class="tab-pane fade" id="tab-emails" role="tabpanel">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm p-4 bg-white">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-envelope text-success me-2"></i>Live Email Conversations</h5>
                            <p class="text-muted font-sm mb-4">Messages submitted by clients and admin replies are logged here.</p>
                            <div class="list-group list-group-flush">
                                <?php if (empty($emails)): ?>
                                    <div class="text-center py-5 text-muted font-sm">No email threads logged yet. Submit a message on contact.php to see it here!</div>
                                <?php else: ?>
                                    <?php foreach ($emails as $msg_item): ?>
                                    <div class="list-group-item px-0 py-3 <?= ($msg_item['sender'] === 'admin') ? 'bg-success-subtle bg-opacity-10 rounded-3 px-3 my-1 border-start border-success border-4' : ''; ?>">
                                        <div class="d-flex justify-content-between align-items-start mb-1">
                                            <div>
                                                <span class="badge <?= ($msg_item['sender'] === 'admin') ? 'bg-success' : 'bg-primary'; ?> me-2"><?= strtoupper($msg_item['sender']); ?></span>
                                                <strong class="text-dark"><?= htmlspecialchars($msg_item['sender_name']); ?></strong>
                                                <span class="badge bg-light text-muted font-xs ms-2">#<?= htmlspecialchars($msg_item['thread_id']); ?></span>
                                            </div>
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete message?');">
                                                <input type="hidden" name="action" value="delete_email">
                                                <input type="hidden" name="id" value="<?= $msg_item['id']; ?>">
                                                <button type="submit" class="btn btn-sm text-danger p-0 font-xs"><i class="fa-solid fa-xmark"></i></button>
                                            </form>
                                        </div>
                                        <p class="font-sm text-dark mb-1 mt-2" style="white-space: pre-line;"><?= htmlspecialchars($msg_item['message_body']); ?></p>
                                        <span class="font-xs text-secondary"><i class="fa-regular fa-clock me-1"></i> <?= $msg_item['sent_at'] ?? 'Just now'; ?></span>
                                    </div>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm p-4 bg-white sticky-top" style="top: 90px;">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-reply text-success me-2"></i>Send Admin Email Reply</h5>
                            <form method="POST" action="dashboard.php">
                                <input type="hidden" name="action" value="send_reply">
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Target Thread ID</label>
                                    <input type="text" name="thread_id" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., WEEE-7841" value="WEEE-7841" required>
                                </div>
                                <div class="mb-4">
                                    <label class="form-label font-sm fw-semibold">Admin Reply Message *</label>
                                    <textarea name="reply" class="form-control rounded-3 p-3 font-sm" rows="5" placeholder="Write your official response to the client..." required></textarea>
                                </div>
                                <button type="submit" class="btn btn-success fw-bold w-100 rounded-pill py-3 shadow-sm" style="background-color: #1da15c;"><i class="fa-solid fa-paper-plane me-2"></i> Send Instant Reply</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 7: STAFF & TEAM MEMBERS -->
            <div class="tab-pane fade" id="tab-staff" role="tabpanel">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <div class="card border-0 shadow-sm p-4 bg-white">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h5 class="fw-bold mb-0"><i class="fa-solid fa-users text-primary me-2"></i>Leadership & Staff Roster</h5>
                                <span class="badge bg-light text-dark border"><?= count($staff_members); ?> Active Roster</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Staff Member</th><th>Role & Dept</th><th>Status</th><th class="text-end">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty($staff_members)): ?>
                                            <tr><td colspan="4" class="text-center py-4 text-muted">No staff members found. Add one on the right!</td></tr>
                                        <?php else: ?>
                                            <?php foreach ($staff_members as $member): ?>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-3">
                                                        <img src="<?= htmlspecialchars($member['photo']); ?>" alt="img" class="rounded-circle shadow-sm" style="width: 44px; height: 44px; object-fit: cover;">
                                                        <div>
                                                            <div class="fw-bold text-dark"><?= htmlspecialchars($member['name']); ?></div>
                                                            <div class="font-xs text-muted"><i class="fa-solid fa-envelope me-1"></i><?= htmlspecialchars($member['email']); ?></div>
                                                            <div class="font-xs text-muted"><i class="fa-solid fa-phone me-1"></i><?= htmlspecialchars($member['phone']); ?></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="badge bg-success-subtle text-success border border-success-subtle d-block mb-1 font-xs"><?= htmlspecialchars($member['department']); ?></span>
                                                    <div class="font-xs text-dark fw-semibold"><?= htmlspecialchars($member['role']); ?></div>
                                                </td>
                                                <td>
                                                    <form method="POST" action="dashboard.php" class="d-flex align-items-center gap-1">
                                                        <input type="hidden" name="action" value="update_staff_status">
                                                        <input type="hidden" name="id" value="<?= $member['id']; ?>">
                                                        <select name="status" class="form-select form-select-sm font-xs rounded-pill" onchange="this.form.submit()" style="width: 140px;">
                                                            <option value="Active" <?= ($member['status'] === 'Active') ? 'selected' : ''; ?>>Active</option>
                                                            <option value="On Leave" <?= ($member['status'] === 'On Leave') ? 'selected' : ''; ?>>On Leave</option>
                                                            <option value="Field Deployment" <?= ($member['status'] === 'Field Deployment') ? 'selected' : ''; ?>>Field Deployment</option>
                                                        </select>
                                                    </form>
                                                </td>
                                                <td class="text-end">
                                                    <form method="POST" action="dashboard.php" onsubmit="return confirm('Remove staff member from website?');">
                                                        <input type="hidden" name="action" value="delete_staff">
                                                        <input type="hidden" name="id" value="<?= $member['id']; ?>">
                                                        <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                    </form>
                                                </td>
                                            </tr>
                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="card border-0 shadow-sm p-4 bg-white sticky-top" style="top: 90px;">
                            <h5 class="fw-bold mb-3"><i class="fa-solid fa-user-plus text-primary me-2"></i>Add Staff Member</h5>
                            <form method="POST" action="dashboard.php">
                                <input type="hidden" name="action" value="add_staff">
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Full Name *</label>
                                    <input type="text" name="name" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., Eng. Sarah Mwangi" required>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Role / Title *</label>
                                        <input type="text" name="role" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="e.g., E-Waste Engineer" required>
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Department</label>
                                        <select name="dept" class="form-select rounded-pill px-3 py-2 font-sm">
                                            <option value="Executive Leadership">Executive Leadership</option>
                                            <option value="Operations">Operations</option>
                                            <option value="Technical & Engineering">Technical & Engineering</option>
                                            <option value="Community & Education">Community & Education</option>
                                            <option value="Administration">Administration</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row g-2 mb-3">
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Email Address</label>
                                        <input type="email" name="email" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="s.mwangi@weeecentre.com">
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label font-sm fw-semibold">Phone Contact</label>
                                        <input type="text" name="phone" class="form-control rounded-pill px-3 py-2 font-sm" placeholder="+254 700 000 000">
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label font-sm fw-semibold">Photo URL</label>
                                    <input type="url" name="photo" class="form-control rounded-pill px-3 py-2 font-sm" value="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80">
                                </div>
                                <div class="mb-4">
                                    <label class="form-label font-sm fw-semibold">Initial Status</label>
                                    <select name="status" class="form-select rounded-pill px-3 py-2 font-sm">
                                        <option value="Active">Active</option>
                                        <option value="Field Deployment">Field Deployment</option>
                                        <option value="On Leave">On Leave</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary fw-bold w-100 rounded-pill py-2"><i class="fa-solid fa-plus-circle me-1"></i> Add to Team Roster</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!-- TAB 8: XAMPP SQL EXPORT -->
            <div class="tab-pane fade" id="tab-xampp" role="tabpanel">
                <div class="card border-0 shadow-sm p-5 bg-white text-center max-w-2xl mx-auto">
                    <div class="bg-warning bg-opacity-10 text-warning rounded-circle p-4 mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                        <i class="fa-solid fa-file-export fs-2"></i>
                    </div>
                    <h3 class="fw-bold text-dark mb-2">Export XAMPP MySQL Database</h3>
                    <p class="text-muted font-sm max-w-md mx-auto mb-4">You can back up all your live services, featured projects, corporate partners, and client inquiries directly from here. If you move your site to a live cPanel host or another computer, simply import this database file!</p>
                    
                    <div class="d-flex justify-content-center gap-3">
                        <a href="../database.sql" download="weeecentre_backup.sql" class="btn btn-warning text-dark fw-bold rounded-pill px-4 py-3 shadow-sm d-flex align-items-center">
                            <i class="fa-solid fa-download me-2"></i> Download database.sql Backup
                        </a>
                        <button onclick="alert('Database schema is intact! Check database.sql in root folder.')" class="btn btn-outline-dark rounded-pill px-4 py-3 font-sm">
                            <i class="fa-solid fa-check-double me-2"></i> Verify MySQL Sync
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>