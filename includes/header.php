<?php
/**
 * WEEE Centre - Responsible E-Waste Management
 * Professional Corporate Website Template
 * 
 * @package WEEECentre
 * @version 2.0.0
 * @author WEEE Centre Dev Team
 * @license MIT
 * 
 * File: includes/header.php
 * Description: Main HTML header with meta tags, Bootstrap 5.3, Font Awesome 6, and Poppins typography.
 */

// Strict typing for PHP 8
declare(strict_types=1);

// Set default page title and meta description if not defined by calling page
$pageTitle = $pageTitle ?? 'WEEE Centre | Responsible E-Waste Management & Recycling';
$pageDescription = $pageDescription ?? 'Leading e-waste collection, data destruction, and eco-friendly recycling solutions across Kenya and East Africa. Towards a Sustainable Future.';
$current_page = basename($_SERVER['PHP_SELF'], '.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character Encoding & Responsive Viewport -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <!-- Primary SEO Meta Tags -->
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="keywords" content="e-waste recycling, electronic waste management, WEEE Centre Kenya, data destruction, EPR compliance, sustainable e-waste disposal, Nairobi recycling">
    <meta name="author" content="WEEE Centre">
    <meta name="robots" content="index, follow">

    <!-- Open Graph / Facebook / LinkedIn Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.weeecentre.com/">
    <meta property="og:title" content="<?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:image" content="assets/img/og-preview.jpg">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23134e32'/><text x='50%' y='65%' font-size='50' text-anchor='middle' fill='white'>♻</text></svg>">

    <!-- Google Fonts: Poppins (300, 400, 500, 600, 700) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">

    <!-- Bootstrap 5.3 CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <!-- Font Awesome 6.5 CSS CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Custom Corporate Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css?v=2.0.0">
</head>
<body class="d-flex flex-column min-vh-100">
    <!-- Skip to Main Content for Accessibility -->
    <a class="visually-hidden-focusable bg-success text-white p-3 position-absolute top-0 start-0 z-3" href="#main-content">
        Skip to main content
    </a>
