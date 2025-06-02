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
$stmt = $pdo->prepare("SELECT name FROM users WHERE shift = :shift");
$stmt->execute(['shift' => $hariEng]);
$users = $stmt->fetchAll();

$pesan = "⏰ *Jadwal Jaga Hari ini :* $hariInd, $tanggal $bulanInd $tahun\n\n";

if ($users) {
    $no = 1;
    foreach ($users as $user) {
        $pesan .= $no++ . "️⃣ " . $user['name'] . "\n";
    }
} else {
    $pesan .= "❌ Tidak ada petugas jaga hari ini.";
}

// Tambahkan penutup
$pesan .= "\n🌟 Selamat melaksanakan tugas 🏡RT.07\n";
$pesan .= "🕸️ *Link scan* : https://rt07.appsbee.my.id\n\n";
$pesan .= "_- Pesan Otomatis dari System -_";
echo $pesan;
?>
