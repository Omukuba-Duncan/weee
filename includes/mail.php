<?php
declare(strict_types=1);

$phpMailerRoot = __DIR__ . '/../vendor/PHPMailer/src';
if (is_dir($phpMailerRoot)) {
    require_once $phpMailerRoot . '/Exception.php';
    require_once $phpMailerRoot . '/PHPMailer.php';
    require_once $phpMailerRoot . '/SMTP.php';
}

// Safe fallback logger — only defines log_error() if it doesn't already
// exist elsewhere in the app, so this file never causes a fatal error
// on its own if the app's real logger isn't loaded yet.
if (!function_exists('log_error')) {
    function log_error(string $message, array $context = []): void {
        $line = '[' . date('Y-m-d H:i:s') . '] ' . $message;
        if (!empty($context)) {
            $line .= ' | ' . json_encode($context, JSON_UNESCAPED_SLASHES);
        }
        error_log($line);
    }
}

/**
 * Send an email via SMTP using PHPMailer.
 *
 * Required environment variables (set these in Render → Environment):
 *   SMTP_HOST      e.g. smtp.gmail.com
 *   SMTP_PORT      e.g. 587
 *   SMTP_USERNAME  full email address used to authenticate
 *   SMTP_PASSWORD  app password (NOT your regular account password — see note below)
 *   SMTP_FROM      the "from" address shown to recipients (can match SMTP_USERNAME)
 *
 * NOTE ON GMAIL: Gmail no longer accepts your normal account password for
 * SMTP. You must enable 2-Step Verification on the Google account, then
 * generate an "App Password" at https://myaccount.google.com/apppasswords
 * and use that 16-character value as SMTP_PASSWORD.
 *
 * @param string $replyToEmail Optional — if set (e.g. the visitor's email from a
 *                             Contact Us form), hitting "Reply" on the received
 *                             email will go directly to this address instead of
 *                             your noreply/SMTP_FROM address.
 * @param string $replyToName Optional display name for the reply-to address.
 *
 * @return bool true on success, false on failure (check server logs for details)
 */
function send_smtp_email(string $to, string $subject, string $message, string $toName = '', string $replyToEmail = '', string $replyToName = ''): bool {
    if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        log_error('SMTP email skipped: PHPMailer library not found', [
            'to' => $to,
            'subject' => $subject,
        ]);
        return false;
    }

    if (!filter_var($to, FILTER_VALIDATE_EMAIL)) {
        log_error('SMTP email skipped: invalid recipient address', ['to' => $to]);
        return false;
    }

    if ($replyToEmail !== '' && !filter_var($replyToEmail, FILTER_VALIDATE_EMAIL)) {
        log_error('SMTP email skipped: invalid reply-to address', ['reply_to' => $replyToEmail]);
        return false;
    }

    $smtpHost = getenv('SMTP_HOST') ?: 'smtp.gmail.com';
    $smtpPort = (int)(getenv('SMTP_PORT') ?: '587');
    $smtpUser = getenv('SMTP_USERNAME') ?: '';
    $smtpPass = getenv('SMTP_PASSWORD') ?: '';
    $smtpFrom = getenv('SMTP_FROM') ?: 'noreply@weeecentre.com';

    if ($smtpUser === '' || $smtpPass === '') {
        log_error('SMTP email skipped: SMTP_USERNAME or SMTP_PASSWORD not set', [
            'to' => $to,
            'subject' => $subject,
        ]);
        return false;
    }

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = $smtpHost;
        $mail->Port       = $smtpPort;
        $mail->SMTPAuth   = true;
        $mail->Username   = $smtpUser;
        $mail->Password   = $smtpPass;
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->CharSet    = 'UTF-8';

        $mail->setFrom($smtpFrom, 'WEEE Centre');
        $mail->addAddress($to, $toName !== '' ? $toName : $to);

        if ($replyToEmail !== '') {
            $mail->addReplyTo($replyToEmail, $replyToName !== '' ? $replyToName : $replyToEmail);
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;
        $mail->AltBody = strip_tags($message);

        $sent = $mail->send();

        if (!$sent) {
            log_error('SMTP email failed silently (send() returned false)', [
                'to' => $to,
                'subject' => $subject,
                'error_info' => $mail->ErrorInfo,
            ]);
        }

        return $sent;

    } catch (\PHPMailer\PHPMailer\Exception $e) {
        log_error('SMTP email failed: PHPMailer exception', [
            'to' => $to,
            'subject' => $subject,
            'error' => $e->getMessage(),
        ]);
        return false;

    } catch (\Throwable $e) {
        // Catches anything unexpected (e.g. a misconfigured autoload path)
        // so a bad email never takes down the page that's sending it.
        log_error('SMTP email failed: unexpected error', [
            'to' => $to,
            'subject' => $subject,
            'error' => $e->getMessage(),
        ]);
        return false;
    }
}