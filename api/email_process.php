<?php
/**
 * WEEE Centre Working Email Conversation & Lead API
 * File: api/email_process.php
 */
declare(strict_types=1);
require_once '../includes/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $thread_id = $_POST['thread_id'] ?? uniqid('thread_');
    $sender = $_POST['sender'] ?? 'client';
    $name = $_POST['name'] ?? 'Guest Client';
    $message = $_POST['message'] ?? '';

    // Insert message into XAMPP MySQL email_conversations table
    $stmt = $pdo->prepare("INSERT INTO email_conversations (thread_id, sender, sender_name, message_body) VALUES (?, ?, ?, ?)");
    $stmt->execute([$thread_id, $sender, $name, $message]);

    // Send real email notification if configured with PHPMailer or SMTP
    // mail($client_email, "WEEE Centre Support Reply", $message);

    echo json_encode(['status' => 'success', 'thread_id' => $thread_id, 'timestamp' => date('H:i')]);
}
?>