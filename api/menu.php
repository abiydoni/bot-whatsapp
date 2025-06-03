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

// Cari menu (utama atau sub) berdasarkan keyword
$currentMenu = null;
foreach ($menus as $m) {
    if (strtolower($m['keyword']) == $key) {
        $currentMenu = $m;
        break;
    }
}

if ($currentMenu) {
    // ✅ Jika ada URL, tampilkan isi URL
    if (!empty($currentMenu['url'])) {
        $data = @file_get_contents($currentMenu['url']);
        if ($data !== false) {
            echo $data;
        } else {
            echo "⚠️ Gagal mengambil data dari sumber.";
        }
        exit;
    }

    // ✅ Jika tidak ada URL, berarti tampilkan submenu-nya
    echo "📂 *{$currentMenu['description']}*\nPilih sub-menu:\n" . getMenuText($menus, $currentMenu['id']);
    exit;
}

// Jika tidak cocok apapun
echo "ℹ️ Pesan anda sudah kami terima. Ketik *menu* untuk pilihan informasi.";
