<?php
declare(strict_types=1);

require_once __DIR__ . '/../vendor/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/SMTP.php';
require_once __DIR__ . '/../vendor/PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function send_smtp_email(string $to, string $subject, string $message, string $toName = ''): bool {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
        $mail->Port = (int)(getenv('SMTP_PORT') ?: '587');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USERNAME') ?: '';
        $mail->Password = getenv('SMTP_PASSWORD') ?: '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->setFrom(getenv('SMTP_FROM') ?: 'noreply@weeecentre.com', 'WEEE Centre');
        $mail->addAddress($to, $toName ?: $to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AltBody = strip_tags($message);
        return $mail->send();
    } catch (Exception $e) {
        log_error('SMTP email failed', ['to' => $to, 'subject' => $subject, 'error' => $e->getMessage()]);
        return false;
    }
}
