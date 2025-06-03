<?php
require 'db.php';
date_default_timezone_set('Asia/Jakarta');

// Terjemahan hari dan bulan ke Bahasa Indonesia
$hariIndo = [
    'Sunday' => 'Minggu',
    'Monday' => 'Senin',
    'Tuesday' => 'Selasa',
    'Wednesday' => 'Rabu',
    'Thursday' => 'Kamis',
    'Friday' => 'Jumat',
    'Saturday' => 'Sabtu',
];

$bulanIndo = [
    'January' => 'Januari',
    'February' => 'Februari',
    'March' => 'Maret',
    'April' => 'April',
    'May' => 'Mei',
    'June' => 'Juni',
    'July' => 'Juli',
    'August' => 'Agustus',
    'September' => 'September',
    'October' => 'Oktober',
    'November' => 'November',
    'December' => 'Desember',
];

// Ambil hari dan tanggal hari ini
$hariEng = date('l'); // Monday
$hariInd = $hariIndo[$hariEng]; // Senin
$tanggal = date('j');
$bulanEng = date('F');
$bulanInd = $bulanIndo[$bulanEng];
$tahun = date('Y');

// Ambil data dari tabel users
$stmt = $pdo->prepare("SELECT name FROM users ORDER BY shift ASC");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

$text = "⏰ *Jadwal Jaga Hari ini :* $hariInd, $tanggal $bulanInd $tahun\n\n";

if ($users) {
    $no = 1;
    foreach ($users as $user) {
        $text .= $no++ . "️⃣ " . $user['name'] . "\n";
    }
} else {
    $text .= "❌ Tidak ada petugas jaga hari ini.";
}

// Tambahkan penutup
$text .= "\n🌟 Selamat melaksanakan tugas 🏡RT.07\n";
$text .= "🕸️ *Link scan* : https://rt07.appsbee.my.id\n\n";
$text .= "_- Pesan Otomatis dari System -_";
echo $text;
?>
