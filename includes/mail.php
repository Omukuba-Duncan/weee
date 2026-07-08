<?php
declare(strict_types=1);

$phpMailerRoot = __DIR__ . '/../vendor/PHPMailer/src';
if (is_dir($phpMailerRoot)) {
    require_once $phpMailerRoot . '/PHPMailer.php';
    require_once $phpMailerRoot . '/SMTP.php';
    require_once $phpMailerRoot . '/Exception.php';
}

function send_smtp_email(string $to, string $subject, string $message, string $toName = ''): bool {
    if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        log_error('SMTP email skipped because PHPMailer is not available', ['to' => $to, 'subject' => $subject]);
        return false;
    }

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
        $mail->Port = (int)(getenv('SMTP_PORT') ?: '587');
        $mail->SMTPAuth = true;
        $mail->Username = getenv('SMTP_USERNAME') ?: '';
        $mail->Password = getenv('SMTP_PASSWORD') ?: '';
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->setFrom(getenv('SMTP_FROM') ?: 'noreply@weeecentre.com', 'WEEE Centre');
        $mail->addAddress($to, $toName ?: $to);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;
        $mail->AltBody = strip_tags($message);
        return $mail->send();
    } catch (\PHPMailer\PHPMailer\Exception $e) {
        log_error('SMTP email failed', ['to' => $to, 'subject' => $subject, 'error' => $e->getMessage()]);
        return false;
    }
}
