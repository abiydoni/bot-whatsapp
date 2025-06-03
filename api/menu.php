<?php
require_once 'db.php';

// Tangkap keyword dari query string (?key=)
$key = strtolower($_GET['key'] ?? 'menu');

// Ambil semua menu
$stmt = $pdo->prepare("SELECT * FROM tb_botmenu ORDER BY parent_id, id");
$stmt->execute();
$menus = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Fungsi untuk menampilkan menu
function getMenuText($menus, $parentId = null) {
    $filtered = array_filter($menus, fn($m) => $m['parent_id'] == $parentId);
    $text = "";
    foreach ($filtered as $m) {
        $text .= "{$m['keyword']}. {$m['description']}\n";
    }
    return trim($text);
}

// Jika permintaan adalah "menu", kirim daftar menu utama
if ($key === 'menu') {
    echo "📋 Pilih menu utama:\n" . getMenuText($menus, null);
    exit;
}

// Cek apakah input cocok dengan menu utama
$parentMenu = null;
foreach ($menus as $m) {
    if ($m['parent_id'] == null && strtolower($m['keyword']) == $key) {
        $parentMenu = $m;
        break;
    }
}

if ($parentMenu) {
    // Tampilkan submenu dari menu utama tersebut
    echo "📂 *{$parentMenu['description']}*\nPilih sub-menu:\n" . getMenuText($menus, $parentMenu['id']);
    exit;
}

// Jika cocok dengan submenu
$sub = null;
foreach ($menus as $m) {
    if ($m['parent_id'] != null && strtolower($m['keyword']) == $key) {
        $sub = $m;
        break;
    }
}

if ($sub && $sub['url']) {
    // Redirect ke URL submenu (ambil isi dari URL)
    $data = @file_get_contents($sub['url']);
    if ($data !== false) {
        echo $data;
    } else {
        echo "⚠️ Gagal mengambil data dari sumber.";
    }
    exit;
}

// Jika tidak cocok apapun
echo "ℹ️ Masukkan tidak dikenali. Ketik *menu* untuk pilihan.";
