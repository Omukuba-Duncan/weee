<?php
/**
 * WEEE Centre Database Connection for XAMPP / MySQL
 * File: includes/db.php
 * Auto-creates database and tables if missing to prevent Table Not Found errors!
 */
declare(strict_types=1);

$host = getenv('DB_HOST') ?: 'reseau.proxy.rlwy.net';
$port = getenv('DB_PORT') ?: '54949';
$db   = getenv('DB_NAME') ?: 'railway';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: 'cFzyIMPPLwoWPVzkQBnfZZzwDvXPJsPs';
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

if (!function_exists('h')) {
    function h($str): string {
        return htmlspecialchars((string)($str ?? ''), ENT_QUOTES, 'UTF-8');
    }
}

try {
    //Connect directly to Railway MySQL
    $dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";
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

    CREATE TABLE IF NOT EXISTS `client_reviews` (
      `id` VARCHAR(50) PRIMARY KEY,
      `client_name` VARCHAR(255) NOT NULL,
      `company` VARCHAR(255) DEFAULT '',
      `photo` VARCHAR(500) DEFAULT '',
      `review_text` TEXT NOT NULL,
      `rating` TINYINT UNSIGNED DEFAULT 5,
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE IF NOT EXISTS `download_resources` (
      `id` VARCHAR(50) PRIMARY KEY,
      `title` VARCHAR(255) NOT NULL,
      `description` TEXT NOT NULL,
      `type` VARCHAR(100) NOT NULL,
      `file_name` VARCHAR(255) DEFAULT '',
      `file_path` VARCHAR(500) DEFAULT '',
      `status` ENUM('active','inactive') DEFAULT 'active',
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    CREATE TABLE IF NOT EXISTS `event_registrations` (
      `id` INT AUTO_INCREMENT PRIMARY KEY,
      `event_id` VARCHAR(100) NOT NULL,
      `event_title` VARCHAR(255) NOT NULL,
      `name` VARCHAR(255) NOT NULL,
      `email` VARCHAR(255) NOT NULL,
      `phone` VARCHAR(100) DEFAULT '',
      `organization` VARCHAR(255) DEFAULT '',
      `notes` TEXT NULL,
      `status` VARCHAR(50) DEFAULT 'Registered',
      `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    ");

    try {
        $pdo->exec("ALTER TABLE `event_registrations` MODIFY COLUMN `notes` TEXT NULL");
    } catch (PDOException $e) {
        // Ignore migration errors for environments where the table is not yet available.
    }

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
        ('staff_1', 'Dr. Boniface Mbithi', 'Executive Director & Founder', 'Executive Leadership', 'b.mbithi@weeecentre.com', '+254768449499', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_2', 'Jane Wanjiru', 'Head of Operations & Logistics', 'Operations', 'j.wanjiru@weeecentre.com', '+254 722 333 444', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Active'),
        ('staff_3', 'David Ochieng', 'Lead ITAD & Data Security Engineer', 'Technical & Engineering', 'd.ochieng@weeecentre.com', '+254 733 555 666', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'Field Deployment');");
    }

    // 8. Seed default resource downloads if empty
    if ($pdo->query("SELECT COUNT(*) FROM download_resources")->fetchColumn() == 0) {
        $pdo->exec("INSERT IGNORE INTO download_resources (id, title, description, type, file_name, file_path) VALUES
        ('epr_2024', 'Kenya E-Waste EPR Guidelines 2024', 'Official producer responsibility and EPR compliance framework for electronics manufacturers operating in Kenya.', 'Compliance PDF', 'Kenya_E-Waste_EPR_Guidelines_2024.pdf', ''),
        ('data_standard', 'Corporate Data Destruction Standard', 'Technical standard for secure data destruction aligned with NIST and Kenyan data protection requirements.', 'Technical PDF', 'Corporate_Data_Destruction_Standard.pdf', ''),
        ('impact_report', 'Annual Environmental Impact Report', 'Verified impact report documenting WEEE Centre’s environmental achievements and material recovery metrics for 2025.', 'Impact PDF', 'WEEE_Centre_Annual_Impact_Report_2025.pdf', ''),
        ('household_toolkit', 'Household E-Waste Recycling Toolkit', 'Practical guide for households and communities on safe e-waste handling, storage, and drop-off procedures.', 'Educational PDF', 'Household_E-Waste_Recycling_Toolkit.pdf', '');");
    }

    // 9. Seed default client reviews if empty
    if ($pdo->query("SELECT COUNT(*) FROM client_reviews")->fetchColumn() == 0) {
      $pdo->exec("INSERT IGNORE INTO client_reviews (id, client_name, company, photo, review_text, rating) VALUES
      ('rev_1', 'Amina Njeri', 'GreenBank Kenya', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', 'WEEE Centre handled our end-of-life IT refresh with precision and full compliance. Certificates provided promptly.', 5),
      ('rev_2', 'Michael Otieno', 'Nairobi County Council', 'https://images.unsplash.com/photo-1545996124-1b6f1f3cde3d?auto=format&fit=crop&w=400&q=80', 'Professional collection and excellent environmental stewardship. Highly recommended for corporate EPR obligations.', 5);");
    }

} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}
?>