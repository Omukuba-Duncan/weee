<?php
/**
 * WEEE Centre Database Connection for XAMPP / MySQL
 * File: includes/db.php
 * Auto-creates database and tables if missing to prevent Table Not Found errors!
 */
declare(strict_types=1);

$host = 'localhost';
$db   = 'weeecentre_db';
$user = 'root'; // Default XAMPP MySQL user
$pass = '';     // Default XAMPP MySQL password is blank
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    // 1. Connect to MySQL without dbname to ensure database exists
    $pdoServer = new PDO("mysql:host=$host;charset=$charset", $user, $pass, $options);
    $pdoServer->exec("CREATE DATABASE IF NOT EXISTS `$db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;");
    
    // 2. Connect directly to weeecentre_db
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $pdo = new PDO($dsn, $user, $pass, $options);

    // 3. Auto-create all required tables if missing (prevents Base table not found errors)
    $pdo->exec("
    CREATE TABLE IF NOT EXISTS `admins` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `username` VARCHAR(100) NOT NULL UNIQUE,
      `password_hash` VARCHAR(255) NOT NULL,
      `role` VARCHAR(50) DEFAULT 'non_programmer_admin',
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `services` (
      `id` VARCHAR(50) PRIMARY KEY,
      `title` VARCHAR(255) NOT NULL,
      `icon` VARCHAR(100) NOT NULL,
      `badge` VARCHAR(100) NOT NULL,
      `description` TEXT NOT NULL,
      `image_url` VARCHAR(500) NOT NULL,
      `status` ENUM('active', 'inactive') DEFAULT 'active'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `email_conversations` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `thread_id` VARCHAR(100) NOT NULL,
      `sender` ENUM('client', 'admin') NOT NULL,
      `sender_name` VARCHAR(255) NOT NULL,
      `message_body` TEXT NOT NULL,
      `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `projects` (
      `id` VARCHAR(50) PRIMARY KEY,
      `category` VARCHAR(100) NOT NULL,
      `badge` VARCHAR(100) NOT NULL,
      `title` VARCHAR(255) NOT NULL,
      `date_str` VARCHAR(100) NOT NULL,
      `description` TEXT NOT NULL,
      `metrics` VARCHAR(255) NOT NULL,
      `image_url` VARCHAR(500) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `partners` (
      `id` VARCHAR(50) PRIMARY KEY,
      `name` VARCHAR(255) NOT NULL,
      `icon` VARCHAR(100) NOT NULL,
      `label` VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `inquiries` (
      `id` VARCHAR(50) PRIMARY KEY,
      `ticket_no` VARCHAR(50) NOT NULL,
      `type` VARCHAR(50) NOT NULL,
      `name` VARCHAR(255) NOT NULL,
      `email` VARCHAR(255) NOT NULL,
      `phone` VARCHAR(100) NOT NULL,
      `subject` VARCHAR(255) NOT NULL,
      `message` TEXT NOT NULL,
      `status` VARCHAR(50) DEFAULT 'New',
      `created_date` DATE NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `staff_members` (
      `id` VARCHAR(50) PRIMARY KEY,
      `name` VARCHAR(255) NOT NULL,
      `role` VARCHAR(100) NOT NULL,
      `department` VARCHAR(100) NOT NULL,
      `email` VARCHAR(255) NOT NULL,
      `phone` VARCHAR(100) NOT NULL,
      `photo` VARCHAR(500) NOT NULL,
      `status` ENUM('Active', 'On Leave', 'Field Deployment') DEFAULT 'Active'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    // 4. Seed default admin if empty
    if ($pdo->query("SELECT COUNT(*) FROM admins")->fetchColumn() == 0) {
        $pdo->exec("INSERT IGNORE INTO `admins` (`username`, `password_hash`) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');");
    }

    // 5. Seed default services if empty
    if ($pdo->query("SELECT COUNT(*) FROM services")->fetchColumn() == 0) {
        $pdo->exec("INSERT IGNORE INTO `services` (`id`, `title`, `icon`, `badge`, `description`, `image_url`) VALUES
        ('svc_1', 'E-Waste Collection & Logistics', 'fa-solid fa-truck-ramp-box', 'Logistics', 'Nationwide secure dispatch and collection of e-waste from corporate offices, banks, learning institutions, and government ministries.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'),
        ('svc_2', 'Secure Data Destruction', 'fa-solid fa-shield-halved', 'Data Security', 'Certified degaussing, physical hard drive shredding, and military-grade data wiping compliant with NIST SP 800-88 guidelines.', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
        ('svc_3', 'IT Asset Disposal (ITAD)', 'fa-solid fa-computer', 'Circular Economy', 'Refurbishment and remarketing of decommissioned corporate laptops, servers, and desktops to extend hardware lifecycles.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'),
        ('svc_4', 'EPR Compliance & Reporting', 'fa-solid fa-file-shield', 'NEMA Licensed', 'Assisting manufacturers and brand owners in meeting Extended Producer Responsibility (EPR) legal quotas and environmental auditing.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80');");
    }

    // 6. Seed default projects if empty
    if ($pdo->query("SELECT COUNT(*) FROM projects")->fetchColumn() == 0) {
        $pdo->exec("INSERT IGNORE INTO `projects` (`id`, `category`, `badge`, `title`, `date_str`, `description`, `metrics`, `image_url`) VALUES
        ('proj_1', 'Collection Drives', 'Collection Drive', 'Nationwide Schools E-Waste Drive', 'Ongoing Initiative • 2026', 'Partnering with over 120 institutions across Nairobi and Mombasa to collect obsolete computers, monitors, and laboratory IT equipment safely.', '3,400+ Tonnes Collected | 45,000+ Students Impacted', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'),
        ('proj_2', 'Corporate ITAD', 'Data Security', 'Banking Sector Secure Sanitization', 'Completed Q1 2026', 'On-site hard drive shredding and degaussing for major commercial banks in East Africa, ensuring 100% data protection compliance.', '15,000+ HDDs Shredded | Zero Breach Risk Guarantee', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
        ('proj_3', 'Community & Training', 'Capacity Building', 'Grassroots E-Waste Youth Sensitization', 'Annual Program', 'Training informal sector technicians in safe dismantling, protecting youth from heavy metals and creating green circular economy jobs.', '650+ Technicians Trained | Supported by UNEP', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80');");
    }

    // 7. Seed default staff members if empty
    if ($pdo->query("SELECT COUNT(*) FROM staff_members")->fetchColumn() == 0) {
        $pdo->exec("INSERT IGNORE INTO `staff_members` (`id`, `name`, `role`, `department`, `email`, `phone`, `photo`, `status`) VALUES
        ('staff_1', 'Dr. Boniface Mbithi', 'Executive Director & Founder', 'Executive Leadership', 'b.mbithi@weeecentre.com', '+254 700 111 222', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_2', 'Jane Wanjiru', 'Head of Operations & Logistics', 'Operations', 'j.wanjiru@weeecentre.com', '+254 722 333 444', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_3', 'David Ochieng', 'Lead ITAD & Data Security Engineer', 'Technical & Engineering', 'd.ochieng@weeecentre.com', '+254 733 555 666', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'Field Deployment');");
    }

} catch (PDOException $e) {
    die("XAMPP MySQL Connection Failed: " . $e->getMessage());
}
?>