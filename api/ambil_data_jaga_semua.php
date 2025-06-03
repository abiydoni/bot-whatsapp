<?php
require 'db.php';
date_default_timezone_set('Asia/Jakarta');

// Terjemahan hari dan bulan ke Bahasa Indonesia
$hariIndo = [
    'Sunday' => 'Minggu', 'Monday' => 'Senin', 'Tuesday' => 'Selasa',
    'Wednesday' => 'Rabu', 'Thursday' => 'Kamis', 'Friday' => 'Jumat', 'Saturday' => 'Sabtu',
];
$bulanIndo = [
    'January' => 'Januari', 'February' => 'Februari', 'March' => 'Maret',
    'April' => 'April', 'May' => 'Mei', 'June' => 'Juni',
    'July' => 'Juli', 'August' => 'Agustus', 'September' => 'September',
    'October' => 'Oktober', 'November' => 'November', 'December' => 'Desember'
];

// Ambil parameter hari dari URL
$hari = $_GET['hari'] ?? date('l'); // default: hari ini
$hariInd = $hariIndo[$hari] ?? $hari;
$tanggal = date('j');
$bulanInd = $bulanIndo[date('F')];
$tahun = date('Y');

// Ambil data jaga dari DB berdasarkan shift
$stmt = $pdo->prepare("SELECT name FROM users WHERE shift = :hari ORDER BY name ASC");
$stmt->execute(['hari' => $hari]);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Susun pesan
$text = "⏰ *Jadwal Jaga Hari $hariInd*\n\n";
if ($users) {
    $no = 1;
    foreach ($users as $user) {
        $text .= $no++ . "️⃣ " . $user['name'] . "\n";
    }
} else {
    $text .= "❌ Tidak ada petugas jaga.";
}
$text .= "\n🌟 Selamat bertugas 🏡RT.07\n";
$text .= "🕸️ *Link scan* : https://rt07.appsbee.my.id\n\n";
$text .= "_- Pesan Otomatis dari System -_";

echo $text;
