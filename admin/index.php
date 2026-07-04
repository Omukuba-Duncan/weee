<?php
/**
 * WEEE Centre Non-Programmer Admin Portal Login
 * File: admin/index.php
 */
session_start();
require_once '../includes/db.php';

if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit;
}

$error = '';
// Simple non-programmer demo bypass: accept password 'admin123'
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    if ($password === 'admin123') {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_user'] = 'WEEE Admin Desk';
        header("Location: dashboard.php");
        exit;
    } else {
        $error = "Invalid admin password. Default demo is admin123";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal Login | WEEE Centre</title>
    <!-- Google Fonts & Bootstrap 5 -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        body { font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #0d3d26 0%, #1da15c 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
        .login-card { max-width: 440px; width: 100%; border-radius: 1.5rem; box-shadow: 0 15px 35px rgba(0,0,0,0.2); }
    </style>
</head>
<body>
    <div class="container p-3">
        <div class="card login-card bg-white mx-auto border-0 overflow-hidden">
            <div class="card-body p-4 p-md-5 text-center">
                <div class="bg-success text-white rounded-circle p-3 mx-auto mb-3 d-flex align-items-center justify-content-center shadow" style="width: 64px; height: 64px;">
                    <i class="fa-solid fa-user-shield fs-3"></i>
                </div>
                <h3 class="fw-bold text-dark mb-1">Admin CMS Desk</h3>
                <p class="text-muted font-sm mb-4">WEEE Centre Non-Programmer Portal</p>

                <?php if ($error): ?>
                    <div class="alert alert-danger rounded-3 py-2 font-sm"><?= htmlspecialchars($error); ?></div>
                <?php endif; ?>

                <div class="alert alert-warning rounded-3 py-2 text-start font-sm mb-4">
                    <i class="fa-solid fa-circle-info me-1"></i> <strong>Demo Access:</strong> Enter password <code>admin123</code> to login.
                </div>

                <form method="POST" action="index.php">
                    <div class="mb-3 text-start">
                        <label class="form-label fw-semibold font-sm">Admin Password</label>
                        <div class="input-group">
                            <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-lock text-muted"></i></span>
                            <input type="password" name="password" class="form-control bg-light border-start-0 py-2" placeholder="Enter admin123" required autofocus>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-success fw-bold w-100 rounded-pill py-2 shadow-sm mt-2" style="background-color: #1da15c; border: none;">
                        Login to Admin Desk &rarr;
                    </button>
                </form>

                <hr class="my-4">
                <a href="../index.php" class="text-decoration-none text-muted font-sm hover-success">
                    <i class="fa-solid fa-arrow-left me-1"></i> Return to Main Homepage
                </a>
            </div>
        </div>
    </div>
</body>
</html>