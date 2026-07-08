-- WEEE Centre MySQL Database Schema for XAMPP / phpMyAdmin
-- File: database.sql

CREATE DATABASE IF NOT EXISTS `weeecentre_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `weeecentre_db`;

-- 1. Table structure for table `admins`
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) DEFAULT 'non_programmer_admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default demo admin (password: admin123)
INSERT INTO `admins` (`username`, `password_hash`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- 2. Table structure for table `services`
CREATE TABLE IF NOT EXISTS `services` (
  `id` VARCHAR(50) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(100) NOT NULL,
  `badge` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `status` ENUM('active', 'inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert 4 initial WEEE Centre services
INSERT IGNORE INTO `services` (`id`, `title`, `icon`, `badge`, `description`, `image_url`) VALUES
('svc_1', 'E-Waste Collection & Logistics', 'fa-solid fa-truck-ramp-box', 'Logistics', 'Nationwide secure dispatch and collection of e-waste from corporate offices, banks, learning institutions, and government ministries.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80'),
('svc_2', 'Secure Data Destruction', 'fa-solid fa-shield-halved', 'Data Security', 'Certified degaussing, physical hard drive shredding, and military-grade data wiping compliant with NIST SP 800-88 guidelines.', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
('svc_3', 'IT Asset Disposal (ITAD)', 'fa-solid fa-computer', 'Circular Economy', 'Refurbishment and remarketing of decommissioned corporate laptops, servers, and desktops to extend hardware lifecycles.', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80'),
('svc_4', 'EPR Compliance & Reporting', 'fa-solid fa-file-shield', 'NEMA Licensed', 'Assisting manufacturers and brand owners in meeting Extended Producer Responsibility (EPR) legal quotas and environmental auditing.', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80');

-- 3. Table structure for table `email_conversations`
CREATE TABLE IF NOT EXISTS `email_conversations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `thread_id` VARCHAR(100) NOT NULL,
  `sender` ENUM('client', 'admin') NOT NULL,
  `sender_name` VARCHAR(255) NOT NULL,
  `message_body` TEXT NOT NULL,
  `sent_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Table structure for table `projects`
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

INSERT IGNORE INTO `projects` (`id`, `category`, `badge`, `title`, `date_str`, `description`, `metrics`, `image_url`) VALUES
('proj_1', 'Collection Drives', 'Collection Drive', 'Nationwide Schools E-Waste Drive', 'Ongoing Initiative • 2026', 'Partnering with over 120 institutions across Nairobi and Mombasa to collect obsolete computers, monitors, and laboratory IT equipment safely.', '3,400+ Tonnes Collected | 45,000+ Students Impacted', 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=600&q=80'),
('proj_2', 'Corporate ITAD', 'Data Security', 'Banking Sector Secure Sanitization', 'Completed Q1 2026', 'On-site hard drive shredding and degaussing for major commercial banks in East Africa, ensuring 100% data protection compliance.', '15,000+ HDDs Shredded | Zero Breach Risk Guarantee', 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80'),
('proj_3', 'Community & Training', 'Capacity Building', 'Grassroots E-Waste Youth Sensitization', 'Annual Program', 'Training informal sector technicians in safe dismantling, protecting youth from heavy metals and creating green circular economy jobs.', '650+ Technicians Trained | Supported by UNEP', 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80');

-- 5. Table structure for table `partners`
CREATE TABLE IF NOT EXISTS `partners` (
  `id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(100) NOT NULL,
  `label` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT IGNORE INTO `partners` (`id`, `name`, `icon`, `label`) VALUES
('part_1', 'UNEP - UN Environment Programme', 'fa-solid fa-globe', 'Global Environmental Partner'),
('part_2', 'NEMA Kenya', 'fa-solid fa-file-shield', 'Licensing & Regulatory Authority'),
('part_3', 'Safaricom Foundation', 'fa-solid fa-tower-cell', 'Corporate E-Waste Sponsor'),
('part_4', 'Ministry of Environment Kenya', 'fa-solid fa-building-flag', 'Government Policy Support');

-- 6. Table structure for table `download_resources`
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

INSERT IGNORE INTO `download_resources` (`id`, `title`, `description`, `type`, `file_name`, `file_path`) VALUES
('epr_2024', 'Kenya E-Waste EPR Guidelines 2024', 'Official producer responsibility and EPR compliance framework for electronics manufacturers operating in Kenya.', 'Compliance PDF', 'Kenya_E-Waste_EPR_Guidelines_2024.pdf', ''),
('data_standard', 'Corporate Data Destruction Standard', 'Technical standard for secure data destruction aligned with NIST and Kenyan data protection requirements.', 'Technical PDF', 'Corporate_Data_Destruction_Standard.pdf', ''),
('impact_report', 'Annual Environmental Impact Report', 'Verified impact report documenting WEEE Centre’s environmental achievements and material recovery metrics for 2025.', 'Impact PDF', 'WEEE_Centre_Annual_Impact_Report_2025.pdf', ''),
('household_toolkit', 'Household E-Waste Recycling Toolkit', 'Practical guide for households and communities on safe e-waste handling, storage, and drop-off procedures.', 'Educational PDF', 'Household_E-Waste_Recycling_Toolkit.pdf', '');

-- 7. Table structure for table `inquiries`
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

INSERT IGNORE INTO `inquiries` (`id`, `ticket_no`, `type`, `name`, `email`, `phone`, `subject`, `message`, `status`, `created_date`) VALUES
('inq_1', 'WEEE-7841', 'Corporate ITAD', 'Jane Mwangi', 'jane.m@abcbanks.co.ke', '+254 711 234 567', 'Disposal of 50 Decommissioned Bank ATMs', 'We have upgraded our branch ATM machines across 12 counties and require certified physical shredding and NEMA disposal certificates.', 'New', '2026-07-02'),
('inq_2', 'WEEE-9023', 'School Pickup', 'David Ochieng', 'principal@nairobihigh.ac.ke', '+254 722 876 543', 'Collection of old computer lab CRT monitors', 'Our high school computer lab is clearing out 40 CRT monitors and non-working UPS batteries. We would like to schedule a pickup.', 'In Progress', '2026-07-01');

-- 7. Table structure for table `staff_members`
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

INSERT IGNORE INTO `staff_members` (`id`, `name`, `role`, `department`, `email`, `phone`, `photo`, `status`) VALUES
('staff_1', 'Dr. Boniface Mbithi', 'Executive Director & Founder', 'Executive Leadership', 'b.mbithi@weeecentre.com', '+254768449499', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', 'Active'),
('staff_2', 'Jane Wanjiru', 'Head of Operations & Logistics', 'Operations', 'j.wanjiru@weeecentre.com', '+254 722 333 444', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', 'Active'),
('staff_3', 'David Ochieng', 'Lead ITAD & Data Security Engineer', 'Technical & Engineering', 'd.ochieng@weeecentre.com', '+254 733 555 666', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80', 'Field Deployment');