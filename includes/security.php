<?php
declare(strict_types=1);

if (!function_exists('csrf_token')) {
    function csrf_token(string $name = 'csrf_token'): string {
        if (empty($_SESSION['csrf_tokens'][$name])) {
            $_SESSION['csrf_tokens'][$name] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_tokens'][$name];
    }
}

if (!function_exists('csrf_field')) {
    function csrf_field(string $name = 'csrf_token'): string {
        return '<input type="hidden" name="' . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . '" value="' . htmlspecialchars(csrf_token($name), ENT_QUOTES, 'UTF-8') . '">';
    }
}

if (!function_exists('verify_csrf')) {
    function verify_csrf(string $name = 'csrf_token'): bool {
        $token = $_POST[$name] ?? '';
        $session = $_SESSION['csrf_tokens'][$name] ?? '';
        return hash_equals($session, $token);
    }
}

if (!function_exists('sanitize_text')) {
    function sanitize_text($value): string {
        return trim((string)($value ?? ''));
    }
}

if (!function_exists('is_honeypot_filled')) {
    function is_honeypot_filled(): bool {
        return trim((string)($_POST['website'] ?? '')) !== '';
    }
}

if (!function_exists('log_error')) {
    function log_error(string $message, mixed $context = null): void {
        $details = $context === null ? '' : ' | ' . json_encode($context, JSON_UNESCAPED_SLASHES);
        error_log('[WEEE Centre] ' . $message . $details);
    }
}
