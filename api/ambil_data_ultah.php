<?php
require 'db.php';
date_default_timezone_set('Asia/Jakarta');

// Array bulan Indonesia
$bulanIndo = [
    '01' => 'Januari',
    '02' => 'Februari',
    '03' => 'Maret',
    '04' => 'April',
    '05' => 'Mei',
    '06' => 'Juni',
    '07' => 'Juli',
    '08' => 'Agustus',
    '09' => 'September',
    '10' => 'Oktober',
    '11' => 'November',
    '12' => 'Desember',
];

// Ambil tanggal hari ini (tanpa tahun)
$today = date('m-d');

// Query warga yang ulang tahun hari ini
$stmt = $pdo->prepare("SELECT nama, tgl_lahir FROM tb_warga WHERE DATE_FORMAT(tgl_lahir, '%m-%d') = ?");
$stmt->execute([$today]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Bangun pesan ucapan ultah
$icon = "🎉🎂🥳";
$pesan = "$icon *Selamat Ulang Tahun!* $icon\n\n";

if ($data && count($data) > 0) {
    $pesan .= "Hari ini ada yang berulang tahun:\n";
    $no = 1;
    foreach ($data as $warga) {
        // Format tanggal lahir ke Indonesia (tanpa tahun)
        $tglObj = date_create($warga['tgl_lahir']);
        $tgl = date_format($tglObj, 'd');
        $bln = $bulanIndo[date_format($tglObj, 'm')];
        $pesan .= "$no. *{$warga['nama']}* (lahir: $tgl $bln) 🎂\n";
        $no++;
    }
    $pesan .= "\nSemoga panjang umur, sehat selalu, dan bahagia! 🎈✨";
} else {
    $pesan .= "kosong";
}

$pesan .= "\n\nSalam hangat dari RT 07! 💐\n";
$pesan .= "\n_- Pesan Otomatis dari System -_";

header('Content-Type: text/plain');
echo $pesan;