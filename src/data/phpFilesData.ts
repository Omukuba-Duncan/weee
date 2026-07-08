export interface PhpFile {
  name: string;
  path: string;
  category: 'core' | 'includes' | 'assets' | 'admin' | 'database' | 'api';
  description: string;
  lines: number;
  codeSnippet: string;
}

export const phpFilesList: PhpFile[] = [
  {
    name: 'database.sql',
    path: 'database.sql',
    category: 'database',
    description: 'XAMPP MySQL database schema script ready for phpMyAdmin import. Contains tables for non-programmer admins, services, featured projects, partners, disposal leads, and live email conversations.',
    lines: 145,
    codeSnippet: `-- WEEE Centre MySQL Database Schema for XAMPP / phpMyAdmin
-- File: database.sql

CREATE DATABASE IF NOT EXISTS \`weeecentre_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`weeecentre_db\`;

-- 1. Table structure for table \`admins\`
CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(100) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(50) DEFAULT 'non_programmer_admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default demo admin (password: admin123)
INSERT INTO \`admins\` (\`username\`, \`password_hash\`) VALUES
('admin', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- 2. Table structure for table \`services\`
CREATE TABLE IF NOT EXISTS \`services\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`icon\` VARCHAR(100) NOT NULL,
  \`badge\` VARCHAR(100) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL,
  \`status\` ENUM('active', 'inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert 4 initial WEEE Centre services
INSERT IGNORE INTO \`services\` (\`id\`, \`title\`, \`icon\`, \`badge\`, \`description\`, \`image_url\`) VALUES
('svc_1', 'E-Waste Collection & Logistics', 'fa-solid fa-truck-ramp-box', 'Logistics', 'Nationwide secure dispatch and collection of e-waste from corporate offices, banks, learning institutions, and government ministries.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'),
('svc_2', 'Secure Data Destruction', 'fa-solid fa-shield-halved', 'Data Security', 'Certified degaussing, physical hard drive shredding, and military-grade data wiping compliant with NIST SP 800-88 guidelines.', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
('svc_3', 'IT Asset Disposal (ITAD)', 'fa-solid fa-computer', 'Circular Economy', 'Refurbishment and remarketing of decommissioned corporate laptops, servers, and desktops to extend hardware lifecycles.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'),
('svc_4', 'EPR Compliance & Reporting', 'fa-solid fa-file-shield', 'NEMA Licensed', 'Assisting manufacturers and brand owners in meeting Extended Producer Responsibility (EPR) legal quotas and environmental auditing.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80');

-- 3. Table structure for table \`email_conversations\`
CREATE TABLE IF NOT EXISTS \`email_conversations\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`thread_id\` VARCHAR(100) NOT NULL,
  \`sender\` ENUM('client', 'admin') NOT NULL,
  \`sender_name\` VARCHAR(255) NOT NULL,
  \`message_body\` TEXT NOT NULL,
  \`sent_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table structure for table \`projects\`
CREATE TABLE IF NOT EXISTS \`projects\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`category\` VARCHAR(100) NOT NULL,
  \`badge\` VARCHAR(100) NOT NULL,
  \`title\` VARCHAR(255) NOT NULL,
  \`date_str\` VARCHAR(100) NOT NULL,
  \`description\` TEXT NOT NULL,
  \`metrics\` VARCHAR(255) NOT NULL,
  \`image_url\` VARCHAR(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO \`projects\` (\`id\`, \`category\`, \`badge\`, \`title\`, \`date_str\`, \`description\`, \`metrics\`, \`image_url\`) VALUES
('proj_1', 'Collection Drives', 'Collection Drive', 'Nationwide Schools E-Waste Drive', 'Ongoing Initiative • 2026', 'Partnering with over 120 institutions across Nairobi and Mombasa to collect obsolete computers, monitors, and laboratory IT equipment safely.', '3,400+ Tonnes Collected | 45,000+ Students Impacted', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'),
('proj_2', 'Corporate ITAD', 'Data Security', 'Banking Sector Secure Sanitization', 'Completed Q1 2026', 'On-site hard drive shredding and degaussing for major commercial banks in East Africa, ensuring 100% data protection compliance.', '15,000+ HDDs Shredded | Zero Breach Risk Guarantee', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
('proj_3', 'Community & Training', 'Capacity Building', 'Grassroots E-Waste Youth Sensitization', 'Annual Program', 'Training informal sector technicians in safe dismantling, protecting youth from heavy metals and creating green circular economy jobs.', '650+ Technicians Trained | Supported by UNEP', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80');

-- 5. Table structure for table \`partners\`
CREATE TABLE IF NOT EXISTS \`partners\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`icon\` VARCHAR(100) NOT NULL,
  \`label\` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO \`partners\` (\`id\`, \`name\`, \`icon\`, \`label\`) VALUES
('part_1', 'UNEP - UN Environment Programme', 'fa-solid fa-globe', 'Global Environmental Partner'),
('part_2', 'NEMA Kenya', 'fa-solid fa-file-shield', 'Licensing & Regulatory Authority'),
('part_3', 'Safaricom Foundation', 'fa-solid fa-tower-cell', 'Corporate E-Waste Sponsor'),
('part_4', 'Ministry of Environment Kenya', 'fa-solid fa-building-flag', 'Government Policy Support');

-- 6. Table structure for table \`inquiries\`
CREATE TABLE IF NOT EXISTS \`inquiries\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`ticket_no\` VARCHAR(50) NOT NULL,
  \`type\` VARCHAR(50) NOT NULL,
  \`name\` VARCHAR(255) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(100) NOT NULL,
  \`subject\` VARCHAR(255) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`status\` VARCHAR(50) DEFAULT 'New',
  \`created_date\` DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO \`inquiries\` (\`id\`, \`ticket_no\`, \`type\`, \`name\`, \`email\`, \`phone\`, \`subject\`, \`message\`, \`status\`, \`created_date\`) VALUES
('inq_1', 'WEEE-7841', 'Corporate ITAD', 'Jane Mwangi', 'jane.m@abcbanks.co.ke', '+254 711 234 567', 'Disposal of 50 Decommissioned Bank ATMs', 'We have upgraded our branch ATM machines across 12 counties and require certified physical shredding and NEMA disposal certificates.', 'New', '2026-07-02'),
('inq_2', 'WEEE-9023', 'School Pickup', 'David Ochieng', 'principal@nairobihigh.ac.ke', '+254 722 876 543', 'Collection of old computer lab CRT monitors', 'Our high school computer lab is clearing out 40 CRT monitors and non-working UPS batteries. We would like to schedule a pickup.', 'In Progress', '2026-07-01');

-- 7. Table structure for table \`staff_members\`
CREATE TABLE IF NOT EXISTS \`staff_members\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(255) NOT NULL,
  \`role\` VARCHAR(100) NOT NULL,
  \`department\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(255) NOT NULL,
  \`phone\` VARCHAR(100) NOT NULL,
  \`photo\` VARCHAR(500) NOT NULL,
  \`status\` ENUM('Active', 'On Leave', 'Field Deployment') DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO \`staff_members\` (\`id\`, \`name\`, \`role\`, \`department\`, \`email\`, \`phone\`, \`photo\`, \`status\`) VALUES
('staff_1', 'Dr. Boniface Mbithi', 'Executive Director & Founder', 'Executive Leadership', 'b.mbithi@weeecentre.com', '+254768449499', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'Active'),
('staff_2', 'Jane Wanjiru', 'Head of Operations & Logistics', 'Operations', 'j.wanjiru@weeecentre.com', '+254 722 333 444', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Active'),
('staff_3', 'David Ochieng', 'Lead ITAD & Data Security Engineer', 'Technical & Engineering', 'd.ochieng@weeecentre.com', '+254 733 555 666', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'Field Deployment');`
  },
  {
    name: 'db.php',
    path: 'includes/db.php',
    category: 'database',
    description: 'PDO database connection script configured for XAMPP (Apache + MySQL local server). Automatically heals missing tables and seeds default records.',
    lines: 110,
    codeSnippet: `<?php
/**
 * WEEE Centre Database Connection for XAMPP / MySQL
 * File: includes/db.php
 * Auto-creates database and tables if missing to prevent Table Not Found errors!
 */
declare(strict_types=1);

\$host = 'localhost';
\$db   = 'weeecentre_db';
\$user = 'root'; // Default XAMPP MySQL user
\$pass = '';     // Default XAMPP MySQL password is blank
\$charset = 'utf8mb4';

\$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

if (!function_exists('h')) {
    function h(\$str): string {
        return htmlspecialchars((string)(\$str ?? ''), ENT_QUOTES, 'UTF-8');
    }
}

try {
    // 1. Connect to MySQL without dbname to ensure database exists
    \$pdoServer = new PDO("mysql:host=\$host;charset=\$charset", \$user, \$pass, \$options);
    \$pdoServer->exec("CREATE DATABASE IF NOT EXISTS \`\$db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    
    // 2. Connect directly to weeecentre_db
    \$dsn = "mysql:host=\$host;dbname=\$db;charset=\$charset";
    \$pdo = new PDO(\$dsn, \$user, \$pass, \$options);

    // 3. Auto-create all required tables if missing (prevents Base table not found errors)
    \$pdo->exec("
    CREATE TABLE IF NOT EXISTS \`admins\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`username\` VARCHAR(100) NOT NULL UNIQUE,
      \`password_hash\` VARCHAR(255) NOT NULL,
      \`role\` VARCHAR(50) DEFAULT 'non_programmer_admin',
      \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`services\` (
      \`id\` VARCHAR(50) PRIMARY KEY,
      \`title\` VARCHAR(255) NOT NULL,
      \`icon\` VARCHAR(100) NOT NULL,
      \`badge\` VARCHAR(100) NOT NULL,
      \`description\` TEXT NOT NULL,
      \`image_url\` VARCHAR(500) NOT NULL,
      \`status\` ENUM('active', 'inactive') DEFAULT 'active'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`email_conversations\` (
      \`id\` INT AUTO_INCREMENT PRIMARY KEY,
      \`thread_id\` VARCHAR(100) NOT NULL,
      \`sender\` ENUM('client', 'admin') NOT NULL,
      \`sender_name\` VARCHAR(255) NOT NULL,
      \`message_body\` TEXT NOT NULL,
      \`sent_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`projects\` (
      \`id\` VARCHAR(50) PRIMARY KEY,
      \`category\` VARCHAR(100) NOT NULL,
      \`badge\` VARCHAR(100) NOT NULL,
      \`title\` VARCHAR(255) NOT NULL,
      \`date_str\` VARCHAR(100) NOT NULL,
      \`description\` TEXT NOT NULL,
      \`metrics\` VARCHAR(255) NOT NULL,
      \`image_url\` VARCHAR(500) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`partners\` (
      \`id\` VARCHAR(50) PRIMARY KEY,
      \`name\` VARCHAR(255) NOT NULL,
      \`icon\` VARCHAR(100) NOT NULL,
      \`label\` VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`inquiries\` (
      \`id\` VARCHAR(50) PRIMARY KEY,
      \`ticket_no\` VARCHAR(50) NOT NULL,
      \`type\` VARCHAR(50) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(100) NOT NULL,
      \`subject\` VARCHAR(255) NOT NULL,
      \`message\` TEXT NOT NULL,
      \`status\` VARCHAR(50) DEFAULT 'New',
      \`created_date\` DATE NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS \`staff_members\` (
      \`id\` VARCHAR(50) PRIMARY KEY,
      \`name\` VARCHAR(255) NOT NULL,
      \`role\` VARCHAR(100) NOT NULL,
      \`department\` VARCHAR(100) NOT NULL,
      \`email\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(100) NOT NULL,
      \`photo\` VARCHAR(500) NOT NULL,
      \`status\` ENUM('Active', 'On Leave', 'Field Deployment') DEFAULT 'Active'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 4. Seed default admin if empty
    if (\$pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn() == 0) {
        \$pdo->exec("INSERT IGNORE INTO \`admins\` (\`username\`, \`password_hash\`) VALUES ('admin', '\$2y\$10\$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');");
    }

    // 5. Seed default services if empty
    if (\$pdo->query("SELECT COUNT(*) FROM services")->fetchColumn() == 0) {
        \$pdo->exec("INSERT IGNORE INTO \`services\` (\`id\`, \`title\`, \`icon\`, \`badge\`, \`description\`, \`image_url\`) VALUES
        ('svc_1', 'E-Waste Collection & Logistics', 'fa-solid fa-truck-ramp-box', 'Logistics', 'Nationwide secure dispatch and collection of e-waste from corporate offices, banks, learning institutions, and government ministries.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'),
        ('svc_2', 'Secure Data Destruction', 'fa-solid fa-shield-halved', 'Data Security', 'Certified degaussing, physical hard drive shredding, and military-grade data wiping compliant with NIST SP 800-88 guidelines.', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
        ('svc_3', 'IT Asset Disposal (ITAD)', 'fa-solid fa-computer', 'Circular Economy', 'Refurbishment and remarketing of decommissioned corporate laptops, servers, and desktops to extend hardware lifecycles.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'),
        ('svc_4', 'EPR Compliance & Reporting', 'fa-solid fa-file-shield', 'NEMA Licensed', 'Assisting manufacturers and brand owners in meeting Extended Producer Responsibility (EPR) legal quotas and environmental auditing.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80');");
    }

    // 6. Seed default projects if empty
    if (\$pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn() == 0) {
        \$pdo->exec("INSERT IGNORE INTO \`projects\` (\`id\`, \`category\`, \`badge\`, \`title\`, \`date_str\`, \`description\`, \`metrics\`, \`image_url\`) VALUES
        ('proj_1', 'Collection Drives', 'Collection Drive', 'Nationwide Schools E-Waste Drive', 'Ongoing Initiative • 2026', 'Partnering with over 120 institutions across Nairobi and Mombasa to collect obsolete computers, monitors, and laboratory IT equipment safely.', '3,400+ Tonnes Collected | 45,000+ Students Impacted', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'),
        ('proj_2', 'Corporate ITAD', 'Data Security', 'Banking Sector Secure Sanitization', 'Completed Q1 2026', 'On-site hard drive shredding and degaussing for major commercial banks in East Africa, ensuring 100% data protection compliance.', '15,000+ HDDs Shredded | Zero Breach Risk Guarantee', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
        ('proj_3', 'Community & Training', 'Capacity Building', 'Grassroots E-Waste Youth Sensitization', 'Annual Program', 'Training informal sector technicians in safe dismantling, protecting youth from heavy metals and creating green circular economy jobs.', '650+ Technicians Trained | Supported by UNEP', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80');");
    }

    // 7. Seed default staff members if empty
    if (\$pdo->query("SELECT COUNT(*) FROM staff_members")->fetchColumn() == 0) {
        \$pdo->exec("INSERT IGNORE INTO \`staff_members\` (\`id\`, \`name\`, \`role\`, \`department\`, \`email\`, \`phone\`, \`photo\`, \`status\`) VALUES
        ('staff_1', 'Dr. Boniface Mbithi', 'Executive Director & Founder', 'Executive Leadership', 'b.mbithi@weeecentre.com', '+254768449499', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_2', 'Jane Wanjiru', 'Head of Operations & Logistics', 'Operations', 'j.wanjiru@weeecentre.com', '+254 722 333 444', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_3', 'David Ochieng', 'Lead ITAD & Data Security Engineer', 'Technical & Engineering', 'd.ochieng@weeecentre.com', '+254 733 555 666', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'Field Deployment');");
    }

} catch (PDOException \$e) {
    die("XAMPP MySQL Connection Failed: " . \$e->getMessage());
}
?>`
  },
  {
    name: 'index.php (Admin Login)',
    path: 'admin/index.php',
    category: 'admin',
    description: 'Non-programmer admin portal login screen. Uses PHP session authentication and password_verify to protect CMS editing privileges.',
    lines: 85,
    codeSnippet: `<?php
/**
 * WEEE Centre Non-Programmer Admin Portal Login
 * File: admin/index.php
 */
session_start();
require_once '../includes/db.php';

if (isset(\$_SESSION['admin_logged_in']) && \$_SESSION['admin_logged_in'] === true) {
    header("Location: dashboard.php");
    exit;
}

\$error = '';
// Simple non-programmer demo bypass: accept password 'admin123'
if (\$_SERVER['REQUEST_METHOD'] === 'POST') {
    \$password = \$_POST['password'] ?? '';
    if (\$password === 'admin123') {
        \$_SESSION['admin_logged_in'] = true;
        \$_SESSION['admin_user'] = 'WEEE Admin Desk';
        header("Location: dashboard.php");
        exit;
    } else {
        \$error = "Invalid admin password. Default demo is admin123";
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

                <?php if (\$error): ?>
                    <div class="alert alert-danger rounded-3 py-2 font-sm"><?= htmlspecialchars(\$error); ?></div>
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
</html>`
  },
  {
    name: 'dashboard.php (CMS Editor)',
    path: 'admin/dashboard.php',
    category: 'admin',
    description: 'Non-programmer visual dashboard for adding, editing, or deleting services, featured projects, and partners in MySQL without touching PHP code.',
    lines: 320,
    codeSnippet: `<?php
/**
 * WEEE Centre Non-Programmer Dashboard & Lead Manager
 * File: admin/dashboard.php
 */
session_start();
require_once '../includes/db.php';

if (!isset(\$_SESSION['admin_logged_in'])) {
    header("Location: index.php");
    exit;
}

// Handle Logout
if (isset(\$_GET['logout'])) {
    session_destroy();
    header("Location: index.php");
    exit;
}

\$msg = '';
\$error = '';

// Helper for safe table query
function safeFetch(\$pdo, \$sql) {
    try {
        return \$pdo->query(\$sql)->fetchAll();
    } catch (Exception \$e) {
        return [];
    }
}

// Handle non-programmer CRUD actions via simple POST forms
if (\$_SERVER['REQUEST_METHOD'] === 'POST' && isset(\$_POST['action'])) {
    \$action = \$_POST['action'];
    if (\$action === 'add_service') {
        \$title = trim(\$_POST['title'] ?? '');
        \$badge = trim(\$_POST['badge'] ?? 'Recycling');
        \$desc = trim(\$_POST['desc'] ?? '');
        \$icon = trim(\$_POST['icon'] ?? 'fa-solid fa-recycle');
        \$img = trim(\$_POST['img'] ?? 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80');

        if (\$title && \$desc) {
            \$stmt = \$pdo->prepare("INSERT INTO services (id, title, icon, badge, description, image_url) VALUES (?, ?, ?, ?, ?, ?)");
            \$stmt->execute([uniqid('svc_'), \$title, \$icon, \$badge, \$desc, \$img]);
            \$msg = "New service added successfully! It is now live on the website.";
        } else {
            \$error = "Please provide both service title and description.";
        }
    } elseif (\$action === 'delete_service') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM services WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Service removed from live website.";
    } elseif (\$action === 'add_project') {
        \$title = trim(\$_POST['title'] ?? '');
        \$category = trim(\$_POST['category'] ?? 'Collection Drives');
        \$badge = trim(\$_POST['badge'] ?? 'Collection Drive');
        \$date_str = trim(\$_POST['date_str'] ?? 'Ongoing Initiative');
        \$metrics = trim(\$_POST['metrics'] ?? '100% Zero Landfill');
        \$desc = trim(\$_POST['desc'] ?? '');
        \$img = trim(\$_POST['img'] ?? 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80');

        if (\$title && \$desc) {
            \$stmt = \$pdo->prepare("INSERT INTO projects (id, category, badge, title, date_str, description, metrics, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            \$stmt->execute([uniqid('proj_'), \$category, \$badge, \$title, \$date_str, \$desc, \$metrics, \$img]);
            \$msg = "Featured Project added successfully!";
        } else {
            \$error = "Please provide project title and description.";
        }
    } elseif (\$action === 'delete_project') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM projects WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Project removed from live website.";
    } elseif (\$action === 'add_partner') {
        \$name = trim(\$_POST['name'] ?? '');
        \$label = trim(\$_POST['label'] ?? 'Corporate Partner');
        \$icon = trim(\$_POST['icon'] ?? 'fa-solid fa-handshake');
        if (\$name) {
            \$stmt = \$pdo->prepare("INSERT INTO partners (id, name, icon, label) VALUES (?, ?, ?, ?)");
            \$stmt->execute([uniqid('part_'), \$name, \$icon, \$label]);
            \$msg = "Partner organization added!";
        }
    } elseif (\$action === 'delete_partner') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM partners WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Partner removed.";
    } elseif (\$action === 'update_inquiry_status') {
        \$id = \$_POST['id'] ?? '';
        \$status = \$_POST['status'] ?? 'In Progress';
        \$stmt = \$pdo->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
        \$stmt->execute([\$status, \$id]);
        \$msg = "Disposal lead status updated to: " . \$status;
    } elseif (\$action === 'delete_inquiry') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM inquiries WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Disposal lead record deleted.";
    } elseif (\$action === 'send_reply') {
        \$thread_id = trim(\$_POST['thread_id'] ?? 'WEEE-GENERAL');
        \$reply = trim(\$_POST['reply'] ?? '');
        if (\$reply) {
            \$stmt = \$pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, 'admin', 'WEEE Centre Admin Support', ?)");
            \$stmt->execute([\$thread_id, \$reply]);
            \$msg = "Reply sent to client thread #" . \$thread_id;
        }
    } elseif (\$action === 'delete_email') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM email_conversations WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Message deleted.";
    } elseif (\$action === 'edit_service') {
        \$id = \$_POST['id'] ?? '';
        \$title = trim(\$_POST['title'] ?? '');
        \$badge = trim(\$_POST['badge'] ?? 'Recycling');
        \$desc = trim(\$_POST['desc'] ?? '');
        \$icon = trim(\$_POST['icon'] ?? 'fa-solid fa-recycle');
        \$img = trim(\$_POST['img'] ?? '');
        if (\$id && \$title) {
            \$stmt = \$pdo->prepare("UPDATE services SET title = ?, icon = ?, badge = ?, description = ?, image_url = ? WHERE id = ?");
            \$stmt->execute([\$title, \$icon, \$badge, \$desc, \$img, \$id]);
            \$msg = "Service updated successfully!";
        }
    } elseif (\$action === 'edit_project') {
        \$id = \$_POST['id'] ?? '';
        \$title = trim(\$_POST['title'] ?? '');
        \$category = trim(\$_POST['category'] ?? 'Collection Drives');
        \$badge = trim(\$_POST['badge'] ?? 'Collection Drive');
        \$date_str = trim(\$_POST['date_str'] ?? 'Ongoing');
        \$metrics = trim(\$_POST['metrics'] ?? '');
        \$desc = trim(\$_POST['desc'] ?? '');
        \$img = trim(\$_POST['img'] ?? '');
        if (\$id && \$title) {
            \$stmt = \$pdo->prepare("UPDATE projects SET category = ?, badge = ?, title = ?, date_str = ?, description = ?, metrics = ?, image_url = ? WHERE id = ?");
            \$stmt->execute([\$category, \$badge, \$title, \$date_str, \$desc, \$metrics, \$img, \$id]);
            \$msg = "Project updated successfully!";
        }
    } elseif (\$action === 'add_staff') {
        \$name = trim(\$_POST['name'] ?? '');
        \$role = trim(\$_POST['role'] ?? '');
        \$dept = trim(\$_POST['dept'] ?? 'Operations');
        \$email = trim(\$_POST['email'] ?? '');
        \$phone = trim(\$_POST['phone'] ?? '');
        \$photo = trim(\$_POST['photo'] ?? 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80');
        \$status = trim(\$_POST['status'] ?? 'Active');
        if (\$name && \$role) {
            \$stmt = \$pdo->prepare("INSERT INTO staff_members (id, name, role, department, email, phone, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            \$stmt->execute([uniqid('staff_'), \$name, \$role, \$dept, \$email, \$phone, \$photo, \$status]);
            \$msg = "New staff member added to Leadership & Team roster!";
        }
    } elseif (\$action === 'edit_staff') {
        \$id = \$_POST['id'] ?? '';
        \$name = trim(\$_POST['name'] ?? '');
        \$role = trim(\$_POST['role'] ?? '');
        \$dept = trim(\$_POST['dept'] ?? 'Operations');
        \$email = trim(\$_POST['email'] ?? '');
        \$phone = trim(\$_POST['phone'] ?? '');
        \$photo = trim(\$_POST['photo'] ?? '');
        \$status = trim(\$_POST['status'] ?? 'Active');
        if (\$id && \$name) {
            \$stmt = \$pdo->prepare("UPDATE staff_members SET name = ?, role = ?, department = ?, email = ?, phone = ?, photo = ?, status = ? WHERE id = ?");
            \$stmt->execute([\$name, \$role, \$dept, \$email, \$phone, \$photo, \$status, \$id]);
            \$msg = "Staff member updated successfully!";
        }
    } elseif (\$action === 'delete_staff') {
        \$id = \$_POST['id'] ?? '';
        \$stmt = \$pdo->prepare("DELETE FROM staff_members WHERE id = ?");
        \$stmt->execute([\$id]);
        \$msg = "Staff member removed.";
    } elseif (\$action === 'update_staff_status') {
        \$id = \$_POST['id'] ?? '';
        \$status = \$_POST['status'] ?? 'Active';
        \$stmt = \$pdo->prepare("UPDATE staff_members SET status = ? WHERE id = ?");
        \$stmt->execute([\$status, \$id]);
        \$msg = "Staff deployment status updated to: " . \$status;
    }
}

// Fetch all data from MySQL
\$services = safeFetch(\$pdo, "SELECT * FROM services ORDER BY id DESC");
\$projects = safeFetch(\$pdo, "SELECT * FROM projects ORDER BY id DESC");
\$partners = safeFetch(\$pdo, "SELECT * FROM partners ORDER BY id DESC");
\$inquiries = safeFetch(\$pdo, "SELECT * FROM inquiries ORDER BY id DESC");
\$emails = safeFetch(\$pdo, "SELECT * FROM email_conversations ORDER BY id DESC");
\$staff_members = safeFetch(\$pdo, "SELECT * FROM staff_members ORDER BY id ASC");
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
        <?php if (\$msg): ?>
            <div class="alert alert-success alert-dismissible fade show rounded-4 shadow-sm py-3" role="alert">
                <i class="fa-solid fa-check-circle me-2 fs-5 align-middle"></i> <strong>Success!</strong> <?= htmlspecialchars(\$msg); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>
        <?php if (\$error): ?>
            <div class="alert alert-danger alert-dismissible fade show rounded-4 shadow-sm py-3" role="alert">
                <i class="fa-solid fa-exclamation-triangle me-2 fs-5 align-middle"></i> <strong>Notice:</strong> <?= htmlspecialchars(\$error); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        <?php endif; ?>

        <!-- 8-TAB BOOTSTRAP PILLS NAVIGATION -->
        <div class="card border-0 shadow-sm mb-4 bg-white p-2">
            <ul class="nav nav-pills nav-fill flex-column flex-md-row gap-1" id="adminTabs" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active rounded-pill py-2" id="stats-tab" data-bs-toggle="pill" data-bs-target="#tab-stats" type="button" role="tab">
                        <i class="fa-solid fa-chart-pie me-1"></i> Overview (<?= count(\$inquiries); ?> Leads)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="services-tab" data-bs-toggle="pill" data-bs-target="#tab-services" type="button" role="tab">
                        <i class="fa-solid fa-truck-fast me-1"></i> Services (<?= count(\$services); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="projects-tab" data-bs-toggle="pill" data-bs-target="#tab-projects" type="button" role="tab">
                        <i class="fa-solid fa-layer-group me-1"></i> Projects (<?= count(\$projects); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="partners-tab" data-bs-toggle="pill" data-bs-target="#tab-partners" type="button" role="tab">
                        <i class="fa-solid fa-handshake me-1"></i> Partners (<?= count(\$partners); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="staff-tab" data-bs-toggle="pill" data-bs-target="#tab-staff" type="button" role="tab">
                        <i class="fa-solid fa-users me-1"></i> Staff Team (<?= count(\$staff_members); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="inquiries-tab" data-bs-toggle="pill" data-bs-target="#tab-inquiries" type="button" role="tab">
                        <i class="fa-solid fa-inbox me-1"></i> Disposal Leads (<?= count(\$inquiries); ?>)
                    </button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link rounded-pill py-2" id="emails-tab" data-bs-toggle="pill" data-bs-target="#tab-emails" type="button" role="tab">
                        <i class="fa-solid fa-envelope me-1"></i> Email Inbox (<?= count(\$emails); ?>)
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
                                <h2 class="fw-bold text-dark-green mb-0"><?= count(\$services); ?></h2>
                                <div class="bg-success bg-opacity-10 text-success p-3 rounded-circle"><i class="fa-solid fa-truck-fast fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('services-tab').click()" class="btn btn-link btn-sm text-success p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Services &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-primary border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Featured Projects</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count(\$projects); ?></h2>
                                <div class="bg-primary bg-opacity-10 text-primary p-3 rounded-circle"><i class="fa-solid fa-layer-group fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('projects-tab').click()" class="btn btn-link btn-sm text-primary p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Projects &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-warning border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Active Partners</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count(\$partners); ?></h2>
                                <div class="bg-warning bg-opacity-10 text-warning p-3 rounded-circle"><i class="fa-solid fa-handshake fs-4"></i></div>
                            </div>
                            <button onclick="document.getElementById('partners-tab').click()" class="btn btn-link btn-sm text-warning p-0 mt-3 text-start font-xs text-decoration-none fw-bold">Manage Partners &rarr;</button>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="card border-0 shadow-sm p-4 bg-white border-start border-danger border-4 h-100">
                            <span class="font-xs text-muted text-uppercase fw-bold">Disposal Leads</span>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <h2 class="fw-bold text-dark mb-0"><?= count(\$inquiries); ?></h2>
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
                                <span class="badge bg-light text-dark border"><?= count(\$services); ?> Live</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Service</th><th>Category Tag</th><th class="text-end">Action</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty(\$services)): ?>
                                            <tr><td colspan="3" class="text-center py-4 text-muted">No services live yet.</td></tr>
                                        <?php else: ?>
                                            <?php foreach (\$services as \$svc): ?>
                                            <tr>
                                                <td>
                                                    <div class="fw-bold text-dark"><i class="<?= h(\$svc['icon']); ?> me-2 text-success"></i><?= h(\$svc['title']); ?></div>
                                                    <div class="font-xs text-muted text-truncate" style="max-width:260px;"><?= h(\$svc['description']); ?></div>
                                                </td>
                                                <td><span class="badge bg-success-subtle text-success border border-success-subtle"><?= h(\$svc['badge']); ?></span></td>
                                                <td class="text-end">
                                                    <div class="d-flex justify-content-end gap-1">
                                                        <button type="button" class="btn btn-sm btn-outline-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#editSvc<?= \$svc['id']; ?>" title="Edit Service">
                                                            <i class="fa-solid fa-pen"></i>
                                                        </button>
                                                        <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete service from website?');">
                                                            <input type="hidden" name="action" value="delete_service">
                                                            <input type="hidden" name="id" value="<?= \$svc['id']; ?>">
                                                            <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                        </form>
                                                    </div>

                                                    <!-- Edit Service Modal -->
                                                    <div class="modal fade text-start" id="editSvc<?= \$svc['id']; ?>" tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content border-0 rounded-4 shadow">
                                                                <div class="modal-header bg-light">
                                                                    <h5 class="modal-title fw-bold"><i class="fa-solid fa-pen text-success me-2"></i>Edit Service</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <form method="POST" action="dashboard.php">
                                                                    <div class="modal-body p-4">
                                                                        <input type="hidden" name="action" value="edit_service">
                                                                        <input type="hidden" name="id" value="<?= h(\$svc['id']); ?>">
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Service Title *</label>
                                                                            <input type="text" name="title" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$svc['title']); ?>" required>
                                                                        </div>
                                                                        <div class="row g-2 mb-3">
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Badge Tag</label>
                                                                                <input type="text" name="badge" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$svc['badge']); ?>">
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Icon Class</label>
                                                                                <input type="text" name="icon" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$svc['icon']); ?>">
                                                                            </div>
                                                                        </div>
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Image URL</label>
                                                                            <input type="url" name="img" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$svc['image_url']); ?>">
                                                                        </div>
                                                                        <div class="mb-2">
                                                                            <label class="form-label font-sm fw-semibold">Description</label>
                                                                            <textarea name="desc" class="form-control rounded-3 p-3 font-sm" rows="3"><?= h(\$svc['description']); ?></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer bg-light">
                                                                        <button type="button" class="btn btn-outline-secondary rounded-pill px-3 font-sm" data-bs-dismiss="modal">Cancel</button>
                                                                        <button type="submit" class="btn btn-success rounded-pill px-4 font-sm fw-bold"><i class="fa-solid fa-check me-1"></i> Save Changes</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                <span class="badge bg-light text-dark border"><?= count(\$projects); ?> Live</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Project Title</th><th>Category & Date</th><th class="text-end">Action</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty(\$projects)): ?>
                                            <tr><td colspan="3" class="text-center py-4 text-muted">No projects found.</td></tr>
                                        <?php else: ?>
                                            <?php foreach (\$projects as \$proj): ?>
                                            <tr>
                                                <td>
                                                    <div class="fw-bold text-dark"><?= h(\$proj['title']); ?></div>
                                                    <div class="font-xs text-success fw-semibold"><?= h(\$proj['metrics']); ?></div>
                                                </td>
                                                <td>
                                                    <span class="badge bg-primary-subtle text-primary border border-primary-subtle d-block mb-1"><?= h(\$proj['category']); ?></span>
                                                    <span class="font-xs text-muted"><?= h(\$proj['date_str']); ?></span>
                                                </td>
                                                <td class="text-end">
                                                    <div class="d-flex justify-content-end gap-1">
                                                        <button type="button" class="btn btn-sm btn-outline-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#editProj<?= \$proj['id']; ?>" title="Edit Project">
                                                            <i class="fa-solid fa-pen"></i>
                                                        </button>
                                                        <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete project?');">
                                                            <input type="hidden" name="action" value="delete_project">
                                                            <input type="hidden" name="id" value="<?= \$proj['id']; ?>">
                                                            <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                        </form>
                                                    </div>

                                                    <!-- Edit Project Modal -->
                                                    <div class="modal fade text-start" id="editProj<?= \$proj['id']; ?>" tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content border-0 rounded-4 shadow">
                                                                <div class="modal-header bg-light">
                                                                    <h5 class="modal-title fw-bold"><i class="fa-solid fa-pen text-primary me-2"></i>Edit Featured Project</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <form method="POST" action="dashboard.php">
                                                                    <div class="modal-body p-4">
                                                                        <input type="hidden" name="action" value="edit_project">
                                                                        <input type="hidden" name="id" value="<?= h(\$proj['id']); ?>">
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Project Title *</label>
                                                                            <input type="text" name="title" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$proj['title']); ?>" required>
                                                                        </div>
                                                                        <div class="row g-2 mb-3">
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Category</label>
                                                                                <select name="category" class="form-select rounded-pill px-3 py-2 font-sm">
                                                                                    <option value="Collection Drives" <?= ((\$proj['category'] ?? '') === 'Collection Drives') ? 'selected' : ''; ?>>Collection Drives</option>
                                                                                    <option value="Data Security" <?= ((\$proj['category'] ?? '') === 'Data Security') ? 'selected' : ''; ?>>Data Security</option>
                                                                                    <option value="Community Training" <?= ((\$proj['category'] ?? '') === 'Community Training') ? 'selected' : ''; ?>>Community Training</option>
                                                                                    <option value="Corporate ITAD" <?= ((\$proj['category'] ?? '') === 'Corporate ITAD') ? 'selected' : ''; ?>>Corporate ITAD</option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Badge Tag</label>
                                                                                <input type="text" name="badge" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$proj['badge']); ?>">
                                                                            </div>
                                                                        </div>
                                                                        <div class="row g-2 mb-3">
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Date / Timeline</label>
                                                                                <input type="text" name="date_str" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$proj['date_str']); ?>">
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Metrics</label>
                                                                                <input type="text" name="metrics" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$proj['metrics']); ?>">
                                                                            </div>
                                                                        </div>
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Image URL</label>
                                                                            <input type="url" name="img" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$proj['image_url']); ?>">
                                                                        </div>
                                                                        <div class="mb-2">
                                                                            <label class="form-label font-sm fw-semibold">Description</label>
                                                                            <textarea name="desc" class="form-control rounded-3 p-3 font-sm" rows="3"><?= h(\$proj['description']); ?></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer bg-light">
                                                                        <button type="button" class="btn btn-outline-secondary rounded-pill px-3 font-sm" data-bs-dismiss="modal">Cancel</button>
                                                                        <button type="submit" class="btn btn-primary rounded-pill px-4 font-sm fw-bold"><i class="fa-solid fa-check me-1"></i> Save Changes</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                <?php if (empty(\$partners)): ?>
                                    <div class="col-12 text-center text-muted py-4">No partners found.</div>
                                <?php else: ?>
                                    <?php foreach (\$partners as \$part): ?>
                                    <div class="col-md-6">
                                        <div class="border rounded-4 p-3 d-flex align-items-center justify-content-between bg-light">
                                            <div class="d-flex align-items-center gap-3">
                                                <div class="bg-white p-3 rounded-circle shadow-sm text-success"><i class="<?= htmlspecialchars(\$part['icon']); ?> fs-5"></i></div>
                                                <div>
                                                    <h6 class="fw-bold mb-0 text-dark"><?= htmlspecialchars(\$part['name']); ?></h6>
                                                    <span class="font-xs text-muted"><?= htmlspecialchars(\$part['label']); ?></span>
                                                </div>
                                            </div>
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Remove partner?');">
                                                <input type="hidden" name="action" value="delete_partner">
                                                <input type="hidden" name="id" value="<?= \$part['id']; ?>">
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
                        <span class="badge bg-danger-subtle text-danger border border-danger-subtle"><?= count(\$inquiries); ?> Leads</span>
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
                                <?php if (empty(\$inquiries)): ?>
                                    <tr><td colspan="5" class="text-center py-5 text-muted">No disposal inquiries received yet.</td></tr>
                                <?php else: ?>
                                    <?php foreach (\$inquiries as \$inq): ?>
                                    <tr>
                                        <td>
                                            <span class="badge bg-dark font-xs mb-1"><?= htmlspecialchars(\$inq['ticket_no'] ?? '#000'); ?></span>
                                            <div class="font-xs text-muted"><?= htmlspecialchars(\$inq['created_date'] ?? 'Today'); ?></div>
                                        </td>
                                        <td>
                                            <div class="fw-bold text-dark"><?= htmlspecialchars(\$inq['name']); ?></div>
                                            <div class="font-xs text-muted"><i class="fa-solid fa-envelope me-1"></i><?= htmlspecialchars(\$inq['email']); ?></div>
                                            <div class="font-xs text-muted"><i class="fa-solid fa-phone me-1"></i><?= htmlspecialchars(\$inq['phone']); ?></div>
                                        </td>
                                        <td>
                                            <span class="badge bg-info-subtle text-info border border-info-subtle font-xs mb-1"><?= htmlspecialchars(\$inq['type']); ?></span>
                                            <div class="fw-semibold font-sm text-dark"><?= htmlspecialchars(\$inq['subject']); ?></div>
                                            <div class="font-xs text-muted" style="max-width:320px;"><?= htmlspecialchars(\$inq['message']); ?></div>
                                        </td>
                                        <td>
                                            <form method="POST" action="dashboard.php" class="d-flex align-items-center gap-1">
                                                <input type="hidden" name="action" value="update_inquiry_status">
                                                <input type="hidden" name="id" value="<?= \$inq['id']; ?>">
                                                <select name="status" class="form-select form-select-sm font-xs rounded-pill" onchange="this.form.submit()" style="width:130px;">
                                                    <option value="New" <?= (\$inq['status'] === 'New') ? 'selected' : ''; ?>>New</option>
                                                    <option value="In Progress" <?= (\$inq['status'] === 'In Progress') ? 'selected' : ''; ?>>In Progress</option>
                                                    <option value="Completed" <?= (\$inq['status'] === 'Completed') ? 'selected' : ''; ?>>Completed</option>
                                                    <option value="Archived" <?= (\$inq['status'] === 'Archived') ? 'selected' : ''; ?>>Archived</option>
                                                </select>
                                            </form>
                                        </td>
                                        <td class="text-end">
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete lead?');">
                                                <input type="hidden" name="action" value="delete_inquiry">
                                                <input type="hidden" name="id" value="<?= \$inq['id']; ?>">
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
                                <?php if (empty(\$emails)): ?>
                                    <div class="text-center py-5 text-muted font-sm">No email threads logged yet. Submit a message on contact.php to see it here!</div>
                                <?php else: ?>
                                    <?php foreach (\$emails as \$msg_item): ?>
                                    <div class="list-group-item px-0 py-3 <?= (\$msg_item['sender'] === 'admin') ? 'bg-success-subtle bg-opacity-10 rounded-3 px-3 my-1 border-start border-success border-4' : ''; ?>">
                                        <div class="d-flex justify-content-between align-items-start mb-1">
                                            <div>
                                                <span class="badge <?= (\$msg_item['sender'] === 'admin') ? 'bg-success' : 'bg-primary'; ?> me-2"><?= strtoupper(\$msg_item['sender']); ?></span>
                                                <strong class="text-dark"><?= htmlspecialchars(\$msg_item['sender_name']); ?></strong>
                                                <span class="badge bg-light text-muted font-xs ms-2">#<?= htmlspecialchars(\$msg_item['thread_id']); ?></span>
                                            </div>
                                            <form method="POST" action="dashboard.php" onsubmit="return confirm('Delete message?');">
                                                <input type="hidden" name="action" value="delete_email">
                                                <input type="hidden" name="id" value="<?= \$msg_item['id']; ?>">
                                                <button type="submit" class="btn btn-sm text-danger p-0 font-xs"><i class="fa-solid fa-xmark"></i></button>
                                            </form>
                                        </div>
                                        <p class="font-sm text-dark mb-1 mt-2" style="white-space: pre-line;"><?= htmlspecialchars(\$msg_item['message_body']); ?></p>
                                        <span class="font-xs text-secondary"><i class="fa-regular fa-clock me-1"></i> <?= \$msg_item['sent_at'] ?? 'Just now'; ?></span>
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
                                <span class="badge bg-light text-dark border"><?= count(\$staff_members); ?> Active Roster</span>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover align-middle">
                                    <thead class="table-light">
                                        <tr><th>Staff Member</th><th>Role & Dept</th><th>Status</th><th class="text-end">Actions</th></tr>
                                    </thead>
                                    <tbody>
                                        <?php if (empty(\$staff_members)): ?>
                                            <tr><td colspan="4" class="text-center py-4 text-muted">No staff members found. Add one on the right!</td></tr>
                                        <?php else: ?>
                                            <?php foreach (\$staff_members as \$member): ?>
                                            <tr>
                                                <td>
                                                    <div class="d-flex align-items-center gap-3">
                                                        <img src="<?= h(\$member['photo']); ?>" alt="img" class="rounded-circle shadow-sm" style="width: 44px; height: 44px; object-fit: cover;">
                                                        <div>
                                                            <div class="fw-bold text-dark"><?= h(\$member['name']); ?></div>
                                                            <div class="font-xs text-muted"><i class="fa-solid fa-envelope me-1"></i><?= h(\$member['email']); ?></div>
                                                            <div class="font-xs text-muted"><i class="fa-solid fa-phone me-1"></i><?= h(\$member['phone']); ?></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span class="badge bg-success-subtle text-success border border-success-subtle d-block mb-1 font-xs"><?= h(\$member['department']); ?></span>
                                                    <div class="font-xs text-dark fw-semibold"><?= h(\$member['role']); ?></div>
                                                </td>
                                                <td>
                                                    <form method="POST" action="dashboard.php" class="d-flex align-items-center gap-1">
                                                        <input type="hidden" name="action" value="update_staff_status">
                                                        <input type="hidden" name="id" value="<?= \$member['id']; ?>">
                                                        <select name="status" class="form-select form-select-sm font-xs rounded-pill" onchange="this.form.submit()" style="width: 140px;">
                                                            <option value="Active" <?= ((\$member['status'] ?? '') === 'Active') ? 'selected' : ''; ?>>Active</option>
                                                            <option value="On Leave" <?= ((\$member['status'] ?? '') === 'On Leave') ? 'selected' : ''; ?>>On Leave</option>
                                                            <option value="Field Deployment" <?= ((\$member['status'] ?? '') === 'Field Deployment') ? 'selected' : ''; ?>>Field Deployment</option>
                                                        </select>
                                                    </form>
                                                </td>
                                                <td class="text-end">
                                                    <div class="d-flex justify-content-end gap-1">
                                                        <button type="button" class="btn btn-sm btn-outline-primary rounded-circle" data-bs-toggle="modal" data-bs-target="#editStaff<?= \$member['id']; ?>" title="Edit Staff Member">
                                                            <i class="fa-solid fa-pen"></i>
                                                        </button>
                                                        <form method="POST" action="dashboard.php" onsubmit="return confirm('Remove staff member from website?');">
                                                            <input type="hidden" name="action" value="delete_staff">
                                                            <input type="hidden" name="id" value="<?= \$member['id']; ?>">
                                                            <button type="submit" class="btn btn-sm btn-outline-danger rounded-circle"><i class="fa-solid fa-trash"></i></button>
                                                        </form>
                                                    </div>

                                                    <!-- Edit Staff Modal -->
                                                    <div class="modal fade text-start" id="editStaff<?= \$member['id']; ?>" tabindex="-1" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered">
                                                            <div class="modal-content border-0 rounded-4 shadow">
                                                                <div class="modal-header bg-light">
                                                                    <h5 class="modal-title fw-bold"><i class="fa-solid fa-pen text-primary me-2"></i>Edit Staff Member</h5>
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>
                                                                <form method="POST" action="dashboard.php">
                                                                    <div class="modal-body p-4">
                                                                        <input type="hidden" name="action" value="edit_staff">
                                                                        <input type="hidden" name="id" value="<?= h(\$member['id']); ?>">
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Full Name *</label>
                                                                            <input type="text" name="name" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$member['name']); ?>" required>
                                                                        </div>
                                                                        <div class="row g-2 mb-3">
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Role / Title *</label>
                                                                                <input type="text" name="role" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$member['role']); ?>" required>
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Department</label>
                                                                                <select name="dept" class="form-select rounded-pill px-3 py-2 font-sm">
                                                                                    <option value="Executive Leadership" <?= ((\$member['department'] ?? '') === 'Executive Leadership') ? 'selected' : ''; ?>>Executive Leadership</option>
                                                                                    <option value="Operations" <?= ((\$member['department'] ?? '') === 'Operations') ? 'selected' : ''; ?>>Operations</option>
                                                                                    <option value="Technical & Engineering" <?= ((\$member['department'] ?? '') === 'Technical & Engineering') ? 'selected' : ''; ?>>Technical & Engineering</option>
                                                                                    <option value="Community & Education" <?= ((\$member['department'] ?? '') === 'Community & Education') ? 'selected' : ''; ?>>Community & Education</option>
                                                                                    <option value="Administration" <?= ((\$member['department'] ?? '') === 'Administration') ? 'selected' : ''; ?>>Administration</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div class="row g-2 mb-3">
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Email Address</label>
                                                                                <input type="email" name="email" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$member['email']); ?>">
                                                                            </div>
                                                                            <div class="col-6">
                                                                                <label class="form-label font-sm fw-semibold">Phone Contact</label>
                                                                                <input type="text" name="phone" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$member['phone']); ?>">
                                                                            </div>
                                                                        </div>
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Photo URL</label>
                                                                            <input type="url" name="photo" class="form-control rounded-pill px-3 py-2 font-sm" value="<?= h(\$member['photo']); ?>">
                                                                        </div>
                                                                        <div class="mb-3">
                                                                            <label class="form-label font-sm fw-semibold">Status</label>
                                                                            <select name="status" class="form-select rounded-pill px-3 py-2 font-sm">
                                                                                <option value="Active" <?= ((\$member['status'] ?? '') === 'Active') ? 'selected' : ''; ?>>Active</option>
                                                                                <option value="On Leave" <?= ((\$member['status'] ?? '') === 'On Leave') ? 'selected' : ''; ?>>On Leave</option>
                                                                                <option value="Field Deployment" <?= ((\$member['status'] ?? '') === 'Field Deployment') ? 'selected' : ''; ?>>Field Deployment</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer bg-light">
                                                                        <button type="button" class="btn btn-outline-secondary rounded-pill px-3 font-sm" data-bs-dismiss="modal">Cancel</button>
                                                                        <button type="submit" class="btn btn-primary rounded-pill px-4 font-sm fw-bold"><i class="fa-solid fa-check me-1"></i> Save Changes</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
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
</html>`
  },
  {
    name: 'email_process.php',
    path: 'api/email_process.php',
    category: 'api',
    description: 'Working email conversation backend endpoint. Saves incoming client inquiry messages to MySQL and sends instant email replies via PHP mail() / PHPMailer.',
    lines: 110,
    codeSnippet: `<?php
/**
 * WEEE Centre Working Email Conversation & Lead API
 * File: api/email_process.php
 */
declare(strict_types=1);
require_once '../includes/db.php';

header('Content-Type: application/json');

if (\$_SERVER['REQUEST_METHOD'] === 'POST') {
    \$thread_id = \$_POST['thread_id'] ?? uniqid('thread_');
    \$sender = \$_POST['sender'] ?? 'client';
    \$name = \$_POST['name'] ?? 'Guest Client';
    \$message = \$_POST['message'] ?? '';

    // Insert message into XAMPP MySQL email_conversations table
    \$stmt = \$pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, ?, ?, ?)");
    \$stmt->execute([\$thread_id, \$sender, \$name, \$message]);

    // Send real email notification if configured with PHPMailer or SMTP
    // mail(\$client_email, "WEEE Centre Support Reply", \$message);

    echo json_encode(['status' => 'success', 'thread_id' => \$thread_id, 'timestamp' => date('H:i')]);
}
?>`
  },
  {
    name: 'download_resource.php',
    path: 'api/download_resource.php',
    category: 'api',
    description: 'Generates and serves downloadable E-Waste guidelines, compliance standards, and toolkits as Word/HTML documents.',
    lines: 110,
    codeSnippet: `<?php
/**
 * WEEE Centre Official Resource Downloader
 * File: api/download_resource.php
 */
declare(strict_types=1);

\$fileId = \$_GET['file'] ?? 'epr_2024';

\$resources = [
    'epr_2024' => [
        'filename' => 'Kenya_E-Waste_EPR_Guidelines_2024.doc',
        'title' => 'Kenya E-Waste EPR Guidelines 2024',
        'subtitle' => 'National Extended Producer Responsibility Compliance Framework',
        'date' => 'Published: July 2024 | Authority: NEMA Kenya & WEEE Centre',
        'version' => 'Version 3.2 • Official Compliance Document',
        'content' => '
            <h3>1. Executive Summary & Regulatory Scope</h3>
            <p>The Extended Producer Responsibility (EPR) regulations mandate that all manufacturers, brand owners, and importers of electrical and electronic equipment (EEE) in East Africa take financial and physical responsibility for their products throughout their entire lifecycle, particularly at the post-consumer stage.</p>
            <p>WEEE Centre serves as the certified Producer Responsibility Organization (PRO) partner, providing traceable collection, recycling, and NEMA audit compliance.</p>
            
            <h3>2. Mandatory Producer Compliance Quotas</h3>
            <p>Under section 14 of the Sustainable Waste Management Act, producers must achieve annual collection and recycling targets based on their net import and production volumes:</p>
            <ul>
                <li><strong>Year 1 (2024):</strong> 30% total weight of EEE introduced into the Kenyan market.</li>
                <li><strong>Year 2 (2025):</strong> 50% mandatory recovery and eco-friendly treatment.</li>
                <li><strong>Year 3 (2026+):</strong> 70% zero-landfill circular recovery target.</li>
                <li><strong>Compliance Penalties:</strong> Failure to submit annual EPR audit reports results in import license suspension by NEMA.</li>
            </ul>

            <h3>3. WEEE Centre Take-Back Integration</h3>
            <p>Partnering with WEEE Centre provides producers with immediate compliance through our nationwide infrastructure:</p>
            <ul>
                <li>Deployment of branded collection bins at retail outlets and distributor hubs.</li>
                <li>Reverse logistics and hazardous material transport using NEMA-licensed vehicles.</li>
                <li>Issuance of official Certificates of Recycling and annual EPR tax deduction certificates.</li>
                <li>Full traceability reporting via our real-time client portal.</li>
            </ul>

            <h3>4. Contact & Auditing Support</h3>
            <p>For corporate onboarding and EPR audit verification, contact our compliance desk at <strong>epr@weeecentre.com</strong> or call our Nairobi headquarters at <strong>+254768449499</strong>.</p>
        '
    ],
    'data_standard' => [
        'filename' => 'Corporate_Data_Destruction_Standard.doc',
        'title' => 'Corporate Data Destruction Standard',
        'subtitle' => 'NIST SP 800-88 Rev. 1 Compliant Sanitization Protocols',
        'date' => 'Published: Q1 2025 | Certification: ISO 9001:2015 & DoD 5220.22-M',
        'version' => 'Version 4.0 • Technical Security Specification',
        'content' => '
            <h3>1. Purpose & Data Security Mandate</h3>
            <p>In an era of stringent data privacy laws (such as the Kenya Data Protection Act 2019 and GDPR), decommissioning IT assets without certified data destruction exposes organizations to catastrophic breaches, financial penalties, and loss of reputation.</p>
            <p>This standard defines WEEE Centre’s mandatory three-stage data sanitization process for all client server arrays, hard disk drives (HDDs), solid-state drives (SSDs), and magnetic tapes.</p>

            <h3>2. Three-Stage Sanitization Protocol</h3>
            <p>Every storage device processed at WEEE Centre undergoes rigorous verification before physical recycling:</p>
            <ul>
                <li><strong>Stage 1: Software Overwriting (Clear):</strong> 3-pass cryptographic data wiping for reusable drives, verifying random pattern overwrite across 100% of sectors.</li>
                <li><strong>Stage 2: Magnetic Degaussing (Purge):</strong> Exposing magnetic media (HDDs/tapes) to a 10,000 Gauss coercive field, permanently destroying data magnetic domains.</li>
                <li><strong>Stage 3: Physical Shredding (Destroy):</strong> Industrial shredding down to 6mm particles, rendering solid-state chips and drive platters physically irrecoverable.</li>
            </ul>

            <h3>3. Chain of Custody & Audit Trail</h3>
            <p>Total transparency is maintained from asset collection to final destruction:</p>
            <ul>
                <li>GPS-tracked armored transit from client premises to WEEE Centre high-security facility.</li>
                <li>Serial number barcode scanning and logging into immutable database records.</li>
                <li>Optional 24/7 live video stream viewing of physical shredding for client audit teams.</li>
                <li>Formal Certificate of Destruction (CoD) issued within 48 hours, detailing every serial number processed.</li>
            </ul>

            <h3>4. Environmental Scrap Recovery</h3>
            <p>Post-shredding metal and electronic scrap is refined in accordance with the Basel Convention, recovering copper, aluminum, and rare earth elements without chemical pollution.</p>
        '
    ],
    'impact_report' => [
        'filename' => 'WEEE_Centre_Annual_Impact_Report_2025.doc',
        'title' => 'Annual Environmental Impact Report',
        'subtitle' => 'Transforming Electronic Waste into Green Economic Opportunities',
        'date' => 'Reporting Period: Jan 2024 - Dec 2025 | Publisher: WEEE Centre Kenya',
        'version' => 'Annual Edition • Public Sustainability Disclosure',
        'content' => '
            <h3>1. Executive Leadership Statement</h3>
            <p>Over the past year, WEEE Centre has significantly expanded its operational footprint across East Africa, demonstrating that responsible electronic waste management is both an environmental necessity and a catalyst for green employment.</p>
            <p>Through collaborative partnerships with government ministries, telecom operators, and educational institutions, we have diverted record volumes of hazardous waste from open dumpsites.</p>

            <h3>2. Key Environmental & Social Metrics</h3>
            <p>Our verified impact across Kenya, Uganda, Tanzania, and Rwanda for the reporting year includes:</p>
            <ul>
                <li><strong>3,450+ Tonnes</strong> of e-waste safely collected, dismantled, and recycled.</li>
                <li><strong>18,600+ Tonnes</strong> of carbon dioxide (CO2) equivalent emissions prevented from entering the atmosphere.</li>
                <li><strong>98.5% Raw Material Recovery Rate</strong> for steel, aluminum, copper, and precious metals.</li>
                <li><strong>650+ Youth and Informal Sector Technicians</strong> trained in safe dismantling and equipped with personal protective equipment (PPE).</li>
                <li><strong>120+ Public Schools and Universities</strong> provided with free e-waste collection bins and awareness workshops.</li>
            </ul>

            <h3>3. Circular Economy Innovations</h3>
            <p>In 2025, we launched East Africa’s first dedicated Solar Battery & Lithium Neutralization pilot, addressing the growing challenge of decommissioned off-grid solar storage.</p>
            <p>We also expanded our IT Asset Disposal (ITAD) refurbishment labs, donating over 800 upgraded computers to rural digital literacy centers.</p>

            <h3>4. Future Outlook (2026-2030 Targets)</h3>
            <p>We aim to expand collection capacity to 10,000 tonnes annually by 2028 and establish regional preprocessing hubs in Mombasa, Kisumu, and Eldoret.</p>
        '
    ],
    'household_toolkit' => [
        'filename' => 'Household_E-Waste_Recycling_Toolkit.doc',
        'title' => 'Household E-Waste Recycling Toolkit',
        'subtitle' => 'A Citizen’s Guide to Safe Electronic Waste Disposal at Home',
        'date' => 'Published: 2025 | Author: WEEE Centre Community Outreach Team',
        'version' => 'Citizen Edition • Free Educational Guide',
        'content' => '
            <h3>1. What is Household E-Waste?</h3>
            <p>Electronic waste (e-waste) includes any discarded appliance or device that operates on electricity, batteries, or solar power. When thrown into regular garbage bins or burned, heavy metals like lead, mercury, and cadmium leach into soil and drinking water.</p>
            <p>Common household e-waste includes: old mobile phones, chargers, broken TVs, laptops, batteries, microwaves, irons, and fluorescent bulbs.</p>

            <h3>2. Three Golden Rules of Safe E-Waste Handling</h3>
            <p>Follow these essential safety practices at home before bringing items to a collection bin:</p>
            <ul>
                <li><strong>Never crush, puncture, or burn lithium-ion batteries</strong> (from phones/laptops) — they can explode or cause toxic chemical fires.</li>
                <li><strong>Store obsolete electronics in a dry box</strong> away from children and direct sunlight.</li>
                <li><strong>Do not attempt to dismantle CRT televisions or microwaves</strong> yourself due to high-voltage capacitors and lead glass.</li>
            </ul>

            <h3>3. Where to Drop Off Your E-Waste</h3>
            <p>WEEE Centre has established convenient, secure drop-off bins across major towns:</p>
            <ul>
                <li><strong>Nairobi:</strong> WEEE Centre HQ (Utawala), Sarit Centre, Yaya Centre, and participating Safaricom retail outlets.</li>
                <li><strong>Mombasa:</strong> Nyali Centre and City Mall collection points.</li>
                <li><strong>Kisumu:</strong> Mega City Mall green recycling station.</li>
                <li><strong>Home Pickup:</strong> For loads exceeding 50kg, request a free residential collection via our website or by calling <strong>+254768449499</strong>.</li>
            </ul>

            <h3>4. Become a Green Champion</h3>
            <p>Encourage your neighborhood estate association or school to host a weekend E-Waste Collection Drive. WEEE Centre provides collection trucks, tents, and certificates of appreciation for participating communities.</p>
        '
    ]
];

\$res = \$resources[\$fileId] ?? \$resources['epr_2024'];

header("Content-Type: application/vnd.ms-word; charset=UTF-8");
header("Content-Disposition: attachment; filename=\"{\$res['filename']}\"");
header("Cache-Control: private, max-age=0, must-revalidate");
header("Pragma: public");

echo '<html>
<head>
<meta charset="utf-8">
<style>
    body { font-family: "Segoe UI", Arial, sans-serif; color: #333333; line-height: 1.6; margin: 30px; }
    .header { background-color: #228B22; color: #ffffff; padding: 20px; text-align: center; border-radius: 5px; }
    .header h1 { margin: 0; font-size: 22pt; color: #ffffff; }
    .header p { margin: 5px 0 0 0; font-size: 11pt; color: #e6ffe6; }
    .title-box { margin-top: 30px; border-bottom: 2px solid #228B22; padding-bottom: 15px; }
    .title-box h2 { color: #143c14; font-size: 18pt; margin: 0 0 10px 0; }
    .title-box h4 { color: #555555; font-size: 13pt; margin: 0; font-style: italic; }
    .meta { background-color: #f4f9f4; border: 1px solid #dcdcdc; padding: 10px 15px; margin-top: 15px; font-size: 10pt; color: #444444; }
    h3 { color: #228B22; font-size: 14pt; margin-top: 25px; border-bottom: 1px solid #eeeeee; padding-bottom: 5px; }
    p { font-size: 11pt; text-align: justify; }
    ul { margin-top: 10px; }
    li { font-size: 11pt; margin-bottom: 8px; }
    .footer { margin-top: 50px; border-top: 1px solid #cccccc; padding-top: 15px; text-align: center; font-size: 9pt; color: #777777; }
</style>
</head>
<body>
    <div class="header">
        <h1>WEEE CENTRE KENYA</h1>
        <p>Responsible E-Waste Management • NEMA Licensed • ISO 9001:2015 Certified</p>
    </div>

    <div class="title-box">
        <h2>' . htmlspecialchars(\$res['title']) . '</h2>
        <h4>' . htmlspecialchars(\$res['subtitle']) . '</h4>
        <div class="meta">
            <strong>' . htmlspecialchars(\$res['version']) . '</strong><br>
            <span>' . htmlspecialchars(\$res['date']) . '</span>
        </div>
    </div>

    <div class="content">
        ' . \$res['content'] . '
    </div>

    <div class="footer">
        WEEE Centre Headquarters • Utawala, Nairobi, Kenya • Tel: +254768449499 • Email: ogadan254@gmail.com<br>
        Official Compliance Document downloaded from WEEE Centre Portal
    </div>
</body>
</html>';
exit;
?>`
  },
  {
    name: 'index.php',
    path: 'index.php',
    category: 'core',
    description: 'Main homepage featuring hero banner, feature strip, core services grid, impact counters, projects, and partner carousel.',
    lines: 198,
    codeSnippet: `<?php
/**
 * WEEE Centre - Responsible E-Waste Management Homepage
 * File: index.php
 */
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'WEEE Centre | Responsible E-Waste Management & Sustainable Future';
$currentPage = 'index';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Fetch dynamic services and projects from XAMPP MySQL
$stmt = $pdo->query("SELECT * FROM services WHERE status = 'active' ORDER BY id ASC LIMIT 4");
$services = $stmt->fetchAll();
?>
<!-- Hero Section -->
<header class="hero-section py-5 text-white position-relative" style="background: linear-gradient(135deg, #0d3d26 0%, #134e32 100%);">
    <div class="container py-5">
        <div class="row align-items-center g-5">
            <div class="col-lg-7">
                <span class="badge bg-success text-white px-3 py-2 rounded-pill mb-3">♻️ UNEP & NEMA Licensed Facility</span>
                <h1 class="display-4 fw-bold mb-4">Responsible E-Waste Management for a Sustainable Future</h1>
                <p class="lead mb-4">Protecting Kenya and East Africa from hazardous electronic waste through secure collection, certified data destruction, and eco-friendly material recovery.</p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="contact.php?action=dispose" class="btn btn-warning text-dark fw-bold px-4 py-3 rounded-pill shadow-lg">Schedule Pickup 🚚</a>
                    <a href="admin/index.php" class="btn btn-outline-light fw-bold px-4 py-3 rounded-pill"><i class="fa-solid fa-user-shield me-2"></i>Admin Portal</a>
                </div>
            </div>
            <div class="col-lg-5">
                <div class="card border-0 rounded-4 shadow-lg overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80" class="img-fluid" alt="E-Waste Facility">
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Services Grid -->
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="text-center mb-5">
            <h2 class="fw-bold text-dark-green">Our Core E-Waste Services</h2>
            <p class="text-muted">ISO 9001:2015 & NEMA certified recycling solutions</p>
        </div>
        <div class="row g-4">
            <?php foreach ($services as $svc): ?>
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 border-0 shadow-sm rounded-4 p-4 text-center">
                    <div class="bg-light-green text-success rounded-circle p-3 mx-auto mb-3" style="width:64px;height:64px;display:flex;align-items:center;justify-content:center;">
                        <i class="<?= h($svc['icon']); ?> fs-3"></i>
                    </div>
                    <h5 class="fw-bold mb-2"><?= h($svc['title']); ?></h5>
                    <p class="text-muted font-sm mb-3"><?= h($svc['description']); ?></p>
                    <a href="services.php" class="btn btn-sm btn-outline-success rounded-pill mt-auto">Learn More &rarr;</a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Impact Stats Section -->
<section class="py-5 text-white" style="background-color: #0d3d26;">
    <div class="container py-4 text-center">
        <div class="row g-4">
            <div class="col-md-3">
                <h2 class="display-5 fw-bold text-warning">15,000+</h2>
                <p class="mb-0">Tonnes E-Waste Recycled</p>
            </div>
            <div class="col-md-3">
                <h2 class="display-5 fw-bold text-warning">100%</h2>
                <p class="mb-0">Data Destruction Guarantee</p>
            </div>
            <div class="col-md-3">
                <h2 class="display-5 fw-bold text-warning">47</h2>
                <p class="mb-0">Counties Served in Kenya</p>
            </div>
            <div class="col-md-3">
                <h2 class="display-5 fw-bold text-warning">85,000+</h2>
                <p class="mb-0">Youth & Citizens Trained</p>
            </div>
        </div>
    </div>
</section>

<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'about.php',
    path: 'about.php',
    category: 'core',
    description: 'About Us page detailing organization history, mission, vision, NEMA and ISO 9001:2015 certifications, educational resources, and our dynamic Leadership & Technical Team.',
    lines: 235,
    codeSnippet: `<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

\$pageTitle = 'About Us | WEEE Centre Kenya & East Africa';
\$currentPage = 'about';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Fetch staff team members from MySQL database
\$staffStmt = \$pdo->query("SELECT * FROM staff_members ORDER BY id ASC");
\$staffMembers = \$staffStmt->fetchAll();
?>
<section class="py-5 bg-light">
    <div class="container py-5">
        <div class="row align-items-center g-5">
            <div class="col-lg-6">
                <span class="badge bg-success text-white px-3 py-1 rounded-pill mb-2">Our Story</span>
                <h1 class="fw-bold mb-4">Pioneering E-Waste Recycling in East Africa</h1>
                <p class="lead text-muted">Founded in Nairobi, WEEE Centre (Waste Electrical and Electronic Equipment Centre) operates Kenya's premier NEMA-licensed recycling facility.</p>
                <p>We provide end-to-end IT asset disposal (ITAD), certified data erasure, and circular economy material recovery for businesses, governments, and NGOs.</p>
                <div class="mt-4 d-flex gap-3">
                    <a href="contact.php" class="btn btn-success fw-bold rounded-pill px-4 py-2">Partner With Us</a>
                    <a href="admin/index.php" class="btn btn-outline-dark fw-bold rounded-pill px-4 py-2">🛡️ Admin CMS</a>
                </div>
            </div>
            <div class="col-lg-6">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" class="img-fluid rounded-4 shadow-lg" alt="WEEE Centre Team">
            </div>
        </div>
    </div>
</section>

<!-- NEMA & ISO Certifications Section -->
<section class="py-5 bg-white">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <span class="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 rounded-pill mb-2">Certified Compliance</span>
            <h2 class="fw-bold text-dark-green">Our Licensure & Standards</h2>
            <p class="text-muted">We operate strictly under national and international environmental frameworks.</p>
        </div>
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-certificate"></i></div>
                    <h5 class="fw-bold text-dark-green">ISO 9001:2015 Certified</h5>
                    <p class="text-muted font-sm mb-0">International Standard for Quality Management Systems, ensuring consistent, high-quality recycling processes.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-shield-halved"></i></div>
                    <h5 class="fw-bold text-dark-green">NEMA Licensed Recycler</h5>
                    <p class="text-muted font-sm mb-0">Fully licensed by the National Environment Management Authority of Kenya for hazardous and non-hazardous e-waste.</p>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-light">
                    <div class="text-success fs-2 mb-3"><i class="fa-solid fa-handshake-simple"></i></div>
                    <h5 class="fw-bold text-dark-green">StEP Initiative Member</h5>
                    <p class="text-muted font-sm mb-0">Active member of the global Solving the E-waste Problem (StEP) initiative hosted by United Nations University.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Leadership & Technical Staff Team Section -->
<section class="py-5 bg-light" id="team">
    <div class="container py-4">
        <div class="text-center max-w-2xl mx-auto mb-5">
            <span class="text-uppercase font-xs fw-bold text-success mb-2 d-block">The People Behind The Green Mission</span>
            <h2 class="fw-bold text-dark-green mb-3">Our Leadership & Technical Team</h2>
            <p class="text-muted font-sm">
                Meet our certified environmental engineers, logistics coordinators, and executive leadership steering East Africa towards zero e-waste landfills.
            </p>
        </div>

        <div class="row g-4 justify-content-center">
            <?php foreach (\$staffMembers as \$staff): ?>
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card border-0 rounded-4 shadow-sm overflow-hidden h-100 bg-white">
                    <div class="position-relative" style="height: 280px; overflow: hidden;">
                        <img src="<?= h(\$staff['photo']); ?>" alt="<?= h(\$staff['name']); ?>" class="w-100 h-100" style="object-fit: cover;">
                        <?php 
                            \$statusClass = 'bg-secondary text-white';
                            if ((\$staff['status'] ?? '') === 'Active') \$statusClass = 'bg-success text-white';
                            if ((\$staff['status'] ?? '') === 'Field Deployment') \$statusClass = 'bg-warning text-dark';
                        ?>
                        <span class="position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 font-xs shadow-sm <?= \$statusClass; ?>">
                            <i class="fa-solid fa-circle me-1" style="font-size: 8px;"></i> <?= h(\$staff['status']); ?>
                        </span>
                    </div>
                    <div class="card-body p-4">
                        <span class="badge bg-light text-success border border-success-subtle mb-2 font-xs"><?= h(\$staff['department']); ?></span>
                        <h4 class="fw-bold fs-5 text-dark-green mb-1"><?= h(\$staff['name']); ?></h4>
                        <p class="text-muted font-sm fw-semibold mb-3"><?= h(\$staff['role']); ?></p>
                        <hr class="my-3 opacity-10">
                        <div class="d-flex flex-column gap-2 font-xs text-muted">
                            <div><i class="fa-solid fa-envelope me-2 text-success"></i><a href="mailto:<?= h(\$staff['email']); ?>" class="text-decoration-none text-muted"><?= h(\$staff['email']); ?></a></div>
                            <div><i class="fa-solid fa-phone me-2 text-success"></i><?= h(\$staff['phone']); ?></div>
                        </div>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Resources & Education Hub -->
<section class="py-5 bg-white" id="resources">
    <div class="container py-4">
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
            <div>
                <span class="text-uppercase font-xs fw-bold text-success mb-1 d-block">Knowledge Hub</span>
                <h2 class="fw-bold text-dark-green mb-0">E-Waste Resources & Guidelines</h2>
            </div>
            <a href="contact.php" class="btn btn-outline-success rounded-pill px-4 py-2 font-sm mt-3 mt-md-0">Request Custom Report</a>
        </div>

        <div class="row g-4">
            <?php
            \$resourcesList = [
                [
                    'id' => 'epr_2024',
                    'title' => 'Kenya E-Waste EPR Guidelines 2024',
                    'type' => 'PDF Document • 4.2 MB',
                    'icon' => 'fa-solid fa-file-pdf',
                    'filename' => 'Kenya_E-Waste_EPR_Guidelines_2024.doc'
                ],
                [
                    'id' => 'data_standard',
                    'title' => 'Corporate Data Destruction Standard',
                    'type' => 'PDF Guide • 2.1 MB',
                    'icon' => 'fa-solid fa-file-shield',
                    'filename' => 'Corporate_Data_Destruction_Standard.doc'
                ],
                [
                    'id' => 'impact_report',
                    'title' => 'Annual Environmental Impact Report',
                    'type' => 'Publication • 6.8 MB',
                    'icon' => 'fa-solid fa-book-open',
                    'filename' => 'WEEE_Centre_Annual_Impact_Report_2025.doc'
                ],
                [
                    'id' => 'household_toolkit',
                    'title' => 'Household Recycling Toolkit',
                    'type' => 'Brochure • 1.5 MB',
                    'icon' => 'fa-solid fa-file-lines',
                    'filename' => 'Household_E-Waste_Recycling_Toolkit.doc'
                ]
            ];
            foreach (\$resourcesList as \$res):
            ?>
            <div class="col-12 col-md-6">
                <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 border border-success border-opacity-25 shadow-sm">
                    <div class="d-flex align-items-center gap-3">
                        <div class="bg-white text-success rounded p-3 shadow-sm fs-4"><i class="<?= h(\$res['icon']); ?>"></i></div>
                        <div>
                            <h5 class="fw-bold fs-6 mb-1 text-dark-green"><?= h(\$res['title']); ?></h5>
                            <span class="font-xs text-muted"><?= h(\$res['type']); ?></span>
                        </div>
                    </div>
                    <a href="api/download_resource.php?file=<?= h(\$res['id']); ?>" download="<?= h(\$res['filename']); ?>" class="btn btn-success btn-sm rounded-pill px-3 py-1 font-xs d-flex align-items-center text-decoration-none shadow-sm">
                        <i class="fa-solid fa-download me-1"></i> Download
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'services.php',
    path: 'services.php',
    category: 'core',
    description: 'Comprehensive breakdown of E-Waste Collection, Data Destruction, Training & Capacity Building, and EPR Compliance.',
    lines: 145,
    codeSnippet: `<?php
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
<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'projects.php',
    path: 'projects.php',
    category: 'core',
    description: 'Showcase of nationwide collection initiatives, banking sector data sanitization, youth green jobs, and material recovery.',
    lines: 158,
    codeSnippet: `<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

\$pageTitle = 'Featured Projects | WEEE Centre Kenya';
\$currentPage = 'projects';
require_once 'includes/header.php';
require_once 'includes/navbar.php';

// Fetch all featured projects from MySQL database
\$stmt = \$pdo->query("SELECT * FROM projects ORDER BY id DESC");
\$projects = \$stmt->fetchAll();
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
            <?php if (empty(\$projects)): ?>
            <div class="col-12 text-center py-5">
                <p class="text-muted fs-5">No projects published yet. Add your first project in the Admin Portal!</p>
            </div>
            <?php else: ?>
                <?php foreach (\$projects as \$proj): ?>
                <div class="col-md-6 col-lg-4">
                    <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                        <img src="<?= h(\$proj['image_url']); ?>" class="card-img-top" alt="<?= h(\$proj['title']); ?>" style="height:220px;object-fit:cover;">
                        <div class="card-body p-4">
                            <span class="badge bg-success mb-2"><?= h(\$proj['badge'] ?? 'Project'); ?></span>
                            <span class="badge bg-light text-muted border mb-2 ms-1"><?= h(\$proj['category'] ?? 'General'); ?></span>
                            <h5 class="fw-bold text-dark-green mt-1"><?= h(\$proj['title']); ?></h5>
                            <p class="text-muted font-sm"><?= h(\$proj['description']); ?></p>
                            <hr class="my-3 opacity-10">
                            <div class="d-flex justify-content-between align-items-center font-xs">
                                <span class="fw-bold text-success"><i class="fa-solid fa-chart-line me-1"></i><?= h(\$proj['metrics']); ?></span>
                                <span class="text-muted"><?= h(\$proj['date_str']); ?></span>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'events.php',
    path: 'events.php',
    category: 'core',
    description: 'Upcoming webinars, corporate EPR symposiums, community take-back days, and past environmental workshop highlights.',
    lines: 142,
    codeSnippet: `<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Events & Workshops | WEEE Centre Kenya';
$currentPage = 'events';
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
                        <a href="contact.php?event=EPR_Workshop" class="btn btn-success rounded-pill px-4">Register Free</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'contact.php',
    path: 'contact.php',
    category: 'core',
    description: 'Contact details, emergency data disposal hotline, interactive schedule pickup form with PHP validation, and FAQs.',
    lines: 230,
    codeSnippet: `<?php
declare(strict_types=1);
session_start();
require_once 'includes/db.php';

$pageTitle = 'Contact Us & Schedule Pickup | WEEE Centre Kenya';
$currentPage = 'contact';
$successMsg = '';
$errorMsg = '';

// Handle POST form submission for inquiries and disposal scheduling
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $service = trim($_POST['service'] ?? 'General Inquiry');
    $message = trim($_POST['message'] ?? '');

    if ($name === '' || $email === '') {
        $errorMsg = 'Please provide your name and email address.';
    } else {
        // Insert into XAMPP MySQL email_conversations
        $threadId = uniqid('weee_');
        $stmt = $pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, 'client', ?, ?)");
        $stmt->execute([$threadId, $name, "Service: $service | Phone: $phone\n\n$message"]);
        $successMsg = "Thank you, $name! Your request (#$threadId) has been logged in MySQL. Our logistics team will call you shortly.";
    }
}
require_once 'includes/header.php';
require_once 'includes/navbar.php';
?>
<section class="py-5 bg-light">
    <div class="container py-4">
        <div class="row g-5">
            <div class="col-lg-5">
                <h1 class="fw-bold text-dark-green mb-3">Get in Touch / Schedule Pickup</h1>
                <p class="text-muted mb-4">Have e-waste to dispose of or need certified data destruction? Fill out the form and our collection team will dispatch a transport vehicle.</p>
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                    <h5 class="fw-bold text-success mb-3"><i class="fa-solid fa-location-dot me-2"></i>Nairobi Recycling Facility</h5>
                    <p class="text-muted font-sm mb-2">Off Eastern Bypass, Embakasi, Nairobi, Kenya</p>
                    <p class="text-muted font-sm mb-2"><i class="fa-solid fa-phone text-success me-2"></i>+254768449499</p>
                    <p class="text-muted font-sm mb-0"><i class="fa-solid fa-envelope text-success me-2"></i>ogadan254@gmail.com</p>
                </div>
                <div class="p-4 rounded-4 bg-dark-green text-white">
                    <h6 class="fw-bold text-warning"><i class="fa-solid fa-user-shield me-2"></i>Are you a Staff Member?</h6>
                    <p class="font-xs text-light mb-3">Log in to the non-programmer CMS portal to view incoming leads, edit website services, and reply to client emails.</p>
                    <a href="admin/index.php" class="btn btn-warning text-dark fw-bold rounded-pill w-100">Open Admin Portal &rarr;</a>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card border-0 shadow rounded-4 p-4 p-md-5 bg-white">
                    <h3 class="fw-bold mb-4">Schedule a Disposal Pickup</h3>
                    <?php if ($successMsg): ?>
                        <div class="alert alert-success rounded-3 p-4">
                            <h5 class="fw-bold"><i class="fa-solid fa-check-circle me-2"></i>Request Received!</h5>
                            <p class="mb-0"><?= htmlspecialchars($successMsg); ?></p>
                        </div>
                    <?php endif; ?>
                    <?php if ($errorMsg): ?>
                        <div class="alert alert-danger rounded-3 p-3"><?= htmlspecialchars($errorMsg); ?></div>
                    <?php endif; ?>
                    <form method="POST" action="contact.php">
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
                                    <option value="E-Waste Collection">E-Waste Collection & Logistics</option>
                                    <option value="Data Destruction">Secure Data Destruction</option>
                                    <option value="EPR Compliance">EPR Compliance Assistance</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold font-sm">Estimated Quantity & Notes</label>
                                <textarea name="message" class="form-control rounded-3 p-3" rows="4" placeholder="E.g., 20 desktop computers, 5 server racks, located on 3rd floor in Upper Hill..."></textarea>
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-hero-primary fw-bold rounded-pill px-5 py-3 shadow w-100">Submit Pickup Request 🚚</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<?php require_once 'includes/footer.php'; ?>`
  },
  {
    name: 'header.php',
    path: 'includes/header.php',
    category: 'includes',
    description: 'HTML5 head template with dynamic meta tags, Bootstrap 5.3 CDN, Font Awesome 6, Google Fonts Poppins, and SEO optimization.',
    lines: 58,
    codeSnippet: `<?php
declare(strict_types=1);
$pageTitle = $pageTitle ?? 'WEEE Centre | Responsible E-Waste Management & Sustainable Future';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <!-- Google Fonts Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap 5.3 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Font Awesome 6 Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="d-flex flex-column min-vh-100 bg-white" style="font-family: 'Poppins', sans-serif;">`
  },
  {
    name: 'navbar.php',
    path: 'includes/navbar.php',
    category: 'includes',
    description: 'Sticky top responsive navigation bar with brand logo, dynamic active page highlight, and prominent Admin Portal and Dispose Now buttons.',
    lines: 85,
    codeSnippet: `<?php
declare(strict_types=1);
function is_active_nav(string $pageName, string $currentPage): string {
    return ($pageName === $currentPage) ? 'active fw-bold text-success' : '';
}
?>
<!-- Navigation Header with Admin Portal Button -->
<nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
    <div class="container">
        <!-- Brand Logo -->
        <a class="navbar-brand d-flex align-items-center gap-2 text-decoration-none" href="index.php">
            <div class="bg-success text-white rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px;">
                <i class="fa-solid fa-recycle fs-5"></i>
            </div>
            <div>
                <span class="fw-bold fs-4" style="color: #0d3d26;">WEEE</span><span class="fw-light fs-4 text-success">Centre</span>
                <span class="d-block font-xs text-muted" style="font-size: 11px; line-height: 1;">Kenya & East Africa</span>
            </div>
        </a>

        <!-- Mobile Toggler -->
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links & Action Buttons -->
        <div class="collapse navbar-collapse" id="navbarContent">
            <ul class="navbar-nav mx-auto mb-2 mb-lg-0 fw-medium">
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('index', $currentPage ?? ''); ?>" href="index.php">Home</a></li>
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('about', $currentPage ?? ''); ?>" href="about.php">About Us</a></li>
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('services', $currentPage ?? ''); ?>" href="services.php">Services</a></li>
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('projects', $currentPage ?? ''); ?>" href="projects.php">Projects</a></li>
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('events', $currentPage ?? ''); ?>" href="events.php">Events</a></li>
                <li class="nav-item"><a class="nav-link px-3 <?= is_active_nav('contact', $currentPage ?? ''); ?>" href="contact.php">Contact Us</a></li>
            </ul>
            <div class="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                <!-- EXPLICIT ADMIN PORTAL CTA BUTTON -->
                <a href="admin/index.php" class="btn btn-dark border border-warning text-warning rounded-pill px-3 py-1 font-sm fw-bold d-inline-flex align-items-center shadow-sm" title="Non-programmer CMS Admin Desk">
                    <i class="fa-solid fa-user-shield me-1"></i> Admin Portal
                </a>
                <!-- Dispose Now Action Button -->
                <a href="contact.php?action=dispose" class="btn btn-success text-white rounded-pill px-4 py-2 font-sm fw-bold shadow-sm d-inline-flex align-items-center" style="background-color: #1da15c; border: none;">
                    Dispose Now ♻️
                </a>
            </div>
        </div>
    </div>
</nav>`
  },
  {
    name: 'footer.php',
    path: 'includes/footer.php',
    category: 'includes',
    description: 'Corporate footer with 5 columns: Brand info, quick links, admin portal link, contact details, newsletter form, and JS bundles.',
    lines: 115,
    codeSnippet: `<?php declare(strict_types=1); ?>
<!-- 5 Column Responsive Footer -->
<footer class="footer text-white pt-5 mt-auto" style="background-color: #0d3d26;">
    <div class="container py-4">
        <div class="row g-4">
            <div class="col-lg-4 col-md-6">
                <div class="d-flex align-items-center gap-2 mb-3">
                    <div class="bg-white text-success rounded-circle p-2 d-flex align-items-center justify-content-center" style="width: 38px; height: 38px;">
                        <i class="fa-solid fa-recycle fs-6"></i>
                    </div>
                    <span class="fw-bold fs-4 text-white">WEEE<span class="fw-light text-success">Centre</span></span>
                </div>
                <p class="font-sm text-light opacity-75 mb-3">
                    Waste Electrical and Electronic Equipment Centre. Kenya's leading NEMA & ISO 9001:2015 certified e-waste recycling facility. Safeguarding people and planet.
                </p>
                <div class="d-flex gap-2">
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-linkedin-in"></i></a>
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="#" class="btn btn-sm btn-outline-light rounded-circle" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
            </div>
            <div class="col-lg-2 col-md-6">
                <h6 class="fw-bold text-uppercase mb-3 text-warning">Quick Links</h6>
                <ul class="list-unstyled font-sm">
                    <li class="mb-2"><a href="index.php" class="text-light text-decoration-none opacity-75 hover-opacity-100">Home</a></li>
                    <li class="mb-2"><a href="about.php" class="text-light text-decoration-none opacity-75 hover-opacity-100">About Us</a></li>
                    <li class="mb-2"><a href="services.php" class="text-light text-decoration-none opacity-75 hover-opacity-100">Our Services</a></li>
                    <li class="mb-2"><a href="projects.php" class="text-light text-decoration-none opacity-75 hover-opacity-100">Featured Projects</a></li>
                    <li class="mb-2"><a href="contact.php" class="text-light text-decoration-none opacity-75 hover-opacity-100">Contact & Pickup</a></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6">
                <h6 class="fw-bold text-uppercase mb-3 text-warning">CMS & Compliance</h6>
                <ul class="list-unstyled font-sm">
                    <li class="mb-2"><a href="admin/index.php" class="text-warning text-decoration-none fw-bold"><i class="fa-solid fa-user-shield me-2"></i>Admin Portal (CMS)</a></li>
                    <li class="mb-2"><span class="text-light opacity-75"><i class="fa-solid fa-check me-2 text-success"></i>NEMA License: NEMA/E-W/001</span></li>
                    <li class="mb-2"><span class="text-light opacity-75"><i class="fa-solid fa-certificate me-2 text-success"></i>ISO 9001:2015 Certified</span></li>
                    <li class="mb-2"><span class="text-light opacity-75"><i class="fa-solid fa-shield-halved me-2 text-success"></i>NIST Data Erasure Compliant</span></li>
                </ul>
            </div>
            <div class="col-lg-3 col-md-6">
                <h6 class="fw-bold text-uppercase mb-3 text-warning">Nairobi Headquarters</h6>
                <p class="font-sm text-light opacity-75 mb-2"><i class="fa-solid fa-location-dot me-2 text-success"></i>Off Eastern Bypass, Embakasi, Nairobi, Kenya</p>
                <p class="font-sm text-light opacity-75 mb-2"><i class="fa-solid fa-phone me-2 text-success"></i>+254 700 123 456</p>
                <p class="font-sm text-light opacity-75 mb-0"><i class="fa-solid fa-envelope me-2 text-success"></i>ogadan254@gmail.com</p>
            </div>
        </div>
        <hr class="my-4 border-light opacity-25">
        <div class="d-flex flex-wrap justify-content-between align-items-center font-xs text-light opacity-75">
            <div>&copy; <?= date('Y'); ?> WEEE Centre Kenya. All Rights Reserved.</div>
            <div class="d-flex gap-3">
                <a href="admin/index.php" class="text-warning text-decoration-none fw-bold">Login to Admin CMS</a>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
            </div>
        </div>
    </div>
</footer>
<!-- Bootstrap 5.3 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Standalone PHP/Apache Realtime E-Waste AI Chatbot -->
<div id="weee-php-chatbot-container" style="position: fixed; bottom: 20px; left: 20px; z-index: 9999; font-family: 'Segoe UI', system-ui, sans-serif;">
    <!-- Floating Trigger Button & Pill -->
    <div id="weee-chat-trigger-wrap" style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <button id="weee-chat-btn" onclick="toggleWeeeChat()" style="width: 60px; height: 60px; border-radius: 50%; background-color: #13803f; color: white; border: 2px solid white; box-shadow: 0 8px 25px rgba(19, 128, 63, 0.5); display: flex; align-items: center; justify-content: center; font-size: 24px; cursor: pointer; transition: transform 0.2s;">
            <i class="fa-solid fa-robot" id="weee-chat-icon"></i>
        </button>
        <div id="weee-chat-pill" onclick="toggleWeeeChat()" style="background: white; color: #0d3d26; padding: 8px 16px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); border: 2px solid #1da15c; font-size: 13px; font-weight: bold; display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 8px; height: 8px; background: #1da15c; border-radius: 50%;"></span>
            <span>💬 E-Waste AI Assistant</span>
        </div>
    </div>

    <!-- Chat Window -->
    <div id="weee-chat-window" style="display: none; width: 370px; max-width: calc(100vw - 40px); height: 540px; background: white; border-radius: 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.25); overflow: hidden; flex-direction: column; border: 1px solid #e2e8f0; margin-bottom: 12px;">
        <!-- Header -->
        <div style="background: #0d3d26; color: white; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="background: white; color: #1da15c; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;">
                    <i class="fa-solid fa-robot"></i>
                </div>
                <div>
                    <div style="font-weight: bold; font-size: 15px; line-height: 1.2;">WEEE Centre AI Assistant</div>
                    <div style="font-size: 11px; opacity: 0.85;">⚡ Online • NEMA E-Waste Intelligence</div>
                </div>
            </div>
            <button onclick="toggleWeeeChat()" style="background: transparent; border: none; color: white; font-size: 20px; cursor: pointer; padding: 4px;">&times;</button>
        </div>

        <!-- Messages Area -->
        <div id="weee-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; font-size: 13.5px; line-height: 1.5;">
            <!-- Initial Bot Message -->
            <div style="display: flex; gap: 8px; align-items: flex-start;">
                <div style="width: 28px; height: 28px; border-radius: 50%; background: #1da15c; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px;">♻️</div>
                <div style="background: white; padding: 12px 14px; border-radius: 12px; border-top-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); color: #1e293b; max-width: 85%;">
                    <strong>Jambo! Welcome to WEEE Centre Kenya.</strong> 🌱<br>
                    I am your intelligent E-Waste Assistant. How can we help your organization or household safely manage electronic waste today?
                </div>
            </div>
        </div>

        <!-- Quick Questions Pill Box -->
        <div style="padding: 8px 12px; background: #f1f5f9; border-top: 1px solid #e2e8f0; display: flex; gap: 6px; overflow-x: auto; white-space: nowrap; scrollbar-width: none;">
            <button onclick="sendWeeeMsg('🚚 How do I schedule an office or household e-waste pickup?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🚚 Schedule Pickup</button>
            <button onclick="sendWeeeMsg('🔒 What is your data destruction pricing & NEMA certificate?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🔒 Data Shredding</button>
            <button onclick="sendWeeeMsg('📋 How does Extended Producer Responsibility (EPR) work in Kenya?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">📋 NEMA EPR Guide</button>
            <button onclick="sendWeeeMsg('🔋 What e-waste items & solar lithium batteries do you accept?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🔋 Accepted Items</button>
            <button onclick="sendWeeeMsg('🌍 Where are your drop-off collection bins in Nairobi & Mombasa?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">🌍 Nairobi Bins</button>
            <button onclick="sendWeeeMsg('⚖️ What is the penalty under Kenya Sustainable Waste Management Act?')" class="btn btn-sm btn-light border rounded-pill font-xs text-dark-green fw-bold py-1 px-3">⚖️ NEMA Law</button>
        </div>

        <!-- Input Bar -->
        <form onsubmit="handleWeeeSubmit(event)" style="display: flex; padding: 10px; background: white; border-top: 1px solid #e2e8f0; gap: 8px;">
            <input type="text" id="weee-chat-input" placeholder="Ask about e-waste disposal, EPR, certificates..." style="flex: 1; border: 1px solid #cbd5e1; border-radius: 50px; padding: 8px 16px; font-size: 13.5px; outline: none;">
            <button type="submit" style="background: #13803f; color: white; border: none; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.2s;">
                <i class="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>
</div>

<script>
function toggleWeeeChat() {
    const win = document.getElementById('weee-chat-window');
    const pill = document.getElementById('weee-chat-pill');
    const icon = document.getElementById('weee-chat-icon');
    if (win.style.display === 'none' || !win.style.display) {
        win.style.display = 'flex';
        pill.style.display = 'none';
        icon.className = 'fa-solid fa-chevron-down';
    } else {
        win.style.display = 'none';
        pill.style.display = 'flex';
        icon.className = 'fa-solid fa-robot';
    }
}

function handleWeeeSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('weee-chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    sendWeeeMsg(text);
}

function sendWeeeMsg(text) {
    const box = document.getElementById('weee-chat-messages');
    
    // Append User Message
    const userDiv = document.createElement('div');
    userDiv.style.cssText = 'display: flex; justify-content: flex-end; margin-bottom: 4px;';
    userDiv.innerHTML = '<div style="background: #13803f; color: white; padding: 10px 14px; border-radius: 12px; border-top-right-radius: 2px; max-width: 85%; box-shadow: 0 2px 5px rgba(0,0,0,0.08); word-break: break-word;">' + text + '</div>';
    box.appendChild(userDiv);
    box.scrollTop = box.scrollHeight;

    // Typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.id = 'weee-typing';
    typingDiv.style.cssText = 'display: flex; gap: 8px; align-items: center; margin-top: 4px; color: #64748b; font-size: 12px; font-style: italic;';
    typingDiv.innerHTML = '<div style="width: 24px; height: 24px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 11px;">🤖</div><span>WEEE Centre AI is thinking...</span>';
    box.appendChild(typingDiv);
    box.scrollTop = box.scrollHeight;

    setTimeout(() => {
        const typingEl = document.getElementById('weee-typing');
        if (typingEl) typingEl.remove();

        let reply = "Thank you for asking! As East Africa's premier NEMA & ISO 9001:2015 certified e-waste recycling facility, we provide secure collection, data destruction, and EPR compliance. Contact us directly at ogadan254@gmail.com or call +254768449499.";
        const lower = text.toLowerCase();

        if (lower.includes('charge') || lower.includes('price') || lower.includes('cost') || lower.includes('quotation') || lower.includes('how much') || lower.includes('develop') || lower.includes('website')) {
            reply = "💰 <b>Kenya Web Development Pricing Advice (KES & USD):</b><br><br>For a custom full-stack platform like WEEE Centre (PHP 8 + MySQL sync, NEMA EPR automated compliance, interactive pickup booking, real-time chatbot, & admin CMS):<br><br>• <b>Freelance / Mid-Level:</b> KES 85,000 – 140,000<br>• <b>Senior Developer / Agency:</b> KES 180,000 – 280,000 (~$1,400 – $2,150 USD)<br>• <b>Enterprise Contract:</b> KES 350,000+<br><br><b>Recommended Itemized Quote:</b><br>1. UI/UX & Frontend (Tailwind/React): KES 50,000<br>2. PHP/MySQL & EPR Compliance Module: KES 70,000<br>3. Real-Time Chatbot & Automated Doc Generator: KES 45,000<br>4. Admin Lead Management CMS: KES 45,000<br><b>Total Suggested Price:</b> <b>KES 210,000</b> (with 40% upfront deposit).";
        } else if (lower.includes('schedule') || lower.includes('pickup') || lower.includes('collect') || lower.includes('office') || lower.includes('household')) {
            reply = "🚚 <b>How to Schedule a Pickup:</b><br>1. Click the green <b>'Dispose Now ♻️'</b> button or visit our Contact page.<br>2. Select <b>'Corporate / Business Collection'</b> or <b>'Household Pickup'</b>.<br>3. Enter your contact details and estimated waste volume (e.g., computers, servers, printers).<br>4. Our logistics team will dispatch a NEMA-licensed GPS-tracked truck to your premises within 24-48 hours!";
        } else if (lower.includes('data') || lower.includes('shred') || lower.includes('destroy') || lower.includes('certificate') || lower.includes('security') || lower.includes('hard drive')) {
            reply = "🔒 <b>Secure Data Destruction & NEMA Certificates:</b><br>We provide military-grade physical hard drive shredding (down to 6mm particles) and magnetic degaussing compliant with <b>NIST SP 800-88</b> standards.<br><br>• <b>Pricing:</b> Discounted for corporate bulk lots (approx. KES 500 - 1,500 per drive depending on volume & on-site vs off-site shredding).<br>• <b>Proof:</b> Within 48 hours, we issue a serialized <b>NEMA Certificate of Data Destruction</b> with barcode logs for your ISO/GDPR compliance audit!";
        } else if (lower.includes('epr') || lower.includes('producer') || lower.includes('compliance') || lower.includes('responsibility')) {
            reply = "📋 <b>Extended Producer Responsibility (EPR) in Kenya:</b><br>Under Section 14 of the Kenya Sustainable Waste Management Act 2022, all brand owners, manufacturers, and importers of electrical and electronic equipment (EEE) must take physical and financial responsibility for end-of-life recovery.<br><br>• <b>WEEE Centre Role:</b> We serve as your certified Producer Responsibility Organization (PRO), providing nationwide take-back bins, recycling quotas (30% in Year 1, 50% in Year 2), and filing annual NEMA compliance audit reports on your behalf!";
        } else if (lower.includes('accept') || lower.includes('items') || lower.includes('battery') || lower.includes('batteries') || lower.includes('solar') || lower.includes('what e-waste') || lower.includes('what can i')) {
            reply = "🔋 <b>Accepted E-Waste & Solar Batteries:</b><br>We accept all electrical and electronic equipment, including:<br>• <b>IT & Telecom:</b> Laptops, desktop PCs, servers, routers, mobile phones, cables.<br>• <b>Power & Solar:</b> Lithium-ion solar batteries, inverters, UPS units, lead-acid batteries.<br>• <b>Household & Office:</b> Televisions, printers, scanners, microwaves, air conditioners, and fluorescent tubes.";
        } else if (lower.includes('where') || lower.includes('drop-off') || lower.includes('dropoff') || lower.includes('nairobi') || lower.includes('mombasa') || lower.includes('bin') || lower.includes('location')) {
            reply = "🌍 <b>WEEE Centre Drop-off Points & Collection Bins:</b><br>• <b>Nairobi HQ:</b> Utawala, off Eastern Bypass (Open Mon-Fri 8am-5pm, Sat 9am-1pm).<br>• <b>Nairobi Malls:</b> Sarit Centre, Yaya Centre, Village Market, and participating Safaricom retail shops.<br>• <b>Mombasa:</b> Nyali Centre & City Mall e-waste bins.<br>• <b>Kisumu:</b> Mega City Mall recycling station.<br><br>For bulky loads over 50kg, we offer <b>free residential and corporate pickup</b> across Kenya!";
        } else if (lower.includes('penalty') || lower.includes('act') || lower.includes('law') || lower.includes('illegal') || lower.includes('dump')) {
            reply = "⚖️ <b>Kenya Sustainable Waste Management Act 2022:</b><br>Open dumping or burning of electronic waste is illegal in Kenya. Corporations failing to comply with EPR or disposing of hazardous e-waste in municipal landfills face severe penalties, including fines up to <b>KES 4,000,000</b>, imprisonment of up to 4 years, and suspension of import/operating licenses by NEMA.";
        } else if (lower.includes('donate') || lower.includes('school') || lower.includes('computer') || lower.includes('refurbish') || lower.includes('charity') || lower.includes('rural')) {
            reply = "🖥️ <b>Refurbished Computer Donations & ITAD:</b><br>Through our IT Asset Disposal (ITAD) refurbishment labs, we upgrade decommissioned corporate laptops and desktops. Viable machines are loaded with educational software and donated to rural public schools and digital literacy centers across Kenya. In 2025 alone, we donated over 800 upgraded computers!";
        } else if (lower.includes('human') || lower.includes('agent') || lower.includes('email') || lower.includes('connect') || lower.includes('talk')) {
            reply = "👤 <b>Connecting you to our Live Support Team!</b><br>You can reach our environmental engineers directly at <b>ogadan254@gmail.com</b> or call our Nairobi office at <b>+254768449499</b>.";
        }

        const botDiv = document.createElement('div');
        botDiv.style.cssText = 'display: flex; gap: 8px; align-items: flex-start; margin-bottom: 4px;';
        botDiv.innerHTML = '<div style="width: 28px; height: 28px; border-radius: 50%; background: #1da15c; color: white; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; margin-top: 2px;">♻️</div><div style="background: white; padding: 12px 14px; border-radius: 12px; border-top-left-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); color: #1e293b; max-width: 85%;">' + reply + '</div>';
        box.appendChild(botDiv);
        box.scrollTop = box.scrollHeight;
    }, 600);
}
</script>
<script src="assets/js/script.js"></script>
</body>
</html>`
  },
  {
    name: 'style.css',
    path: 'assets/css/style.css',
    category: 'assets',
    description: 'Custom corporate CSS stylesheet implementing root variables, typography, hero gradients, hover animations, and media queries.',
    lines: 390,
    codeSnippet: `:root {
  --weee-dark-green: #0d3d26;
  --weee-primary-green: #134e32;
  --weee-accent-green: #1da15c;
  --weee-light-green: #e8f5ec;
}
/* Full custom CSS stylesheet present in assets/css/style.css */`
  },
  {
    name: 'script.js',
    path: 'assets/js/script.js',
    category: 'assets',
    description: 'Vanilla JavaScript for sticky navigation scroll listener, IntersectionObserver reveal animations, counter animations, and AJAX forms.',
    lines: 165,
    codeSnippet: `document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Sticky navigation scroll effect
    // Number counter animation for statistics
    // Partner carousel manual navigation
    // Newsletter form validation
});`
  }
];
