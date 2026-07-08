<?php
/**
 * WEEE Centre Resource Download Handler
 * Supports admin-managed uploaded documents and fallback generated downloads.
 */
declare(strict_types=1);

require_once __DIR__ . '/../includes/db.php';

$fileId = $_GET['file'] ?? '';
$stmt = $pdo->prepare('SELECT * FROM download_resources WHERE id = ? LIMIT 1');
$stmt->execute([$fileId]);
$resource = $stmt->fetch();

if (!$resource) {
    http_response_code(404);
    echo 'Resource not found.';
    exit;
}

function downloadFile(string $path, string $filename): void {
    if (!file_exists($path)) {
        http_response_code(404);
        echo 'File is missing on the server.';
        exit;
    }

    $mime = mime_content_type($path) ?: 'application/octet-stream';
    header('Content-Type: ' . $mime);
    header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
    header('Content-Length: ' . filesize($path));
    readfile($path);
    exit;
}

if (!empty($resource['file_path'])) {
    $localPath = realpath(__DIR__ . '/../' . $resource['file_path']);
    $uploadsDir = realpath(__DIR__ . '/../uploads/resources/');

    if ($localPath && $uploadsDir && str_starts_with($localPath, $uploadsDir)) {
        downloadFile($localPath, $resource['file_name'] ?: basename($localPath));
    }
}

// Fallback generated PDF output when no uploaded file exists.
$filename = $resource['file_name'] ?: preg_replace('/[^A-Za-z0-9_\-]+/', '_', $resource['title']) . '.pdf';
$textTitle = $resource['title'];
$textSubtitle = $resource['type'] . ' • ' . $resource['description'];
$textBody = strip_tags(preg_replace(['/\r/', '/<br\s*\/?>/i', '/<li>/', '/<\/li>/', '/<\/p>/', '/<\/h[1-6]>/i', '/<h[1-6][^>]*>/i', '/<ul>|<ol>/i'], ["", "\n", "- ", "\n", "\n", "\n", "", "\n"], $resource['description']));

function createSimplePdf(string $title, string $subtitle, string $body): string {
    $bodyLines = explode("\n", wordwrap($body, 90, "\n", true));
    $contentLines = [];
    $contentLines[] = 'BT';
    $contentLines[] = '/F1 18 Tf';
    $contentLines[] = '50 760 Td';
    $contentLines[] = '(' . pdfEscape($title) . ') Tj';
    $contentLines[] = '0 -28 Td';
    $contentLines[] = '/F1 12 Tf';
    $contentLines[] = '(' . pdfEscape($subtitle) . ') Tj';
    $contentLines[] = '0 -28 Td';
    foreach ($bodyLines as $line) {
        $contentLines[] = '(' . pdfEscape($line) . ') Tj';
        $contentLines[] = '0 -16 Td';
    }
    $contentLines[] = 'ET';
    return implode("\n", $contentLines);
}

function pdfEscape(string $text): string {
    return str_replace(['\\', '(', ')'], ['\\\\', '\\(', '\\)'], $text);
}

$rawContent = createSimplePdf($textTitle, $textSubtitle, $textBody);
$stream = "stream\n" . $rawContent . "\nendstream";
$len = strlen($stream);

$objects = [];
$objects[] = "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj";
$objects[] = "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj";
$objects[] = "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj";
$objects[] = "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj";
$objects[] = "5 0 obj\n<< /Length {$len} >>\n{$stream}\nendobj";

$pdf = "%PDF-1.4\n";
$xref = [];
$offset = strlen($pdf);
foreach ($objects as $object) {
    $xref[] = $offset;
    $pdf .= $object . "\n";
    $offset = strlen($pdf);
}

$xrefPosition = strlen($pdf);
$pdf .= "xref\n0 " . (count($objects) + 1) . "\n0000000000 65535 f \n";
foreach ($xref as $pos) {
    $pdf .= sprintf('%010d 00000 n \n', $pos);
}
$pdf .= "trailer\n<< /Size " . (count($objects) + 1) . " /Root 1 0 R >>\nstartxref\n{$xrefPosition}\n%%EOF";

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="' . basename($filename) . '"');
echo $pdf;
exit;
