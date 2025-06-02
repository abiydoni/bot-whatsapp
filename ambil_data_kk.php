<?php
require 'db.php'; // koneksi PDO
header('Content-Type: text/plain');

$stmt = $pdo->query("SELECT code_id, kk_name FROM master_kk ORDER BY kk_name ASC");
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

$text = "📋 Data Kepala Keluarga Randuares RT.07 RW.01:\n";
$no = 1;
foreach ($data as $row) {
    $text .= $no++ . ". " . $row['code_id'] . " - " . $row['kk_name'] . "\n";
}
echo $text;
?>
