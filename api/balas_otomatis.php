<?php
// Terima webhook dari WA Gateway baru dan balas otomatis lewat endpoint /message/send-text

// Cek metode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Gunakan metode POST']);
    exit;
}

// Ambil input dari webhook gateway
// Format baru dari gateway (lihat src/webhooks/message.ts):
// {
//   "session": "appsbee",
//   "from": "628xxxx@s.whatsapp.net" | "1203...@g.us",
//   "message": "teks masuk atau null",
//   "media": { image, video, document, audio }
// }
$payload = json_decode(file_get_contents("php://input"), true);
$fromJid = $payload['from'] ?? '';
$pesanMasuk = strtolower(trim($payload['message'] ?? ''));

// Validasi
if (!$fromJid || $pesanMasuk === '') {
    echo json_encode(['error' => 'from/message kosong']);
    exit;
}

// Koneksi database & konfigurasi
require 'db.php';
require 'get_konfigurasi.php';
$sessionId = get_konfigurasi('session_id');
$gatewayBase = get_konfigurasi('url_group'); // boleh base URL saja
$gatewayKey = get_konfigurasi('gateway_key'); // opsional

// Normalisasi endpoint
$apiUrl = rtrim($gatewayBase, '/');
if (stripos($apiUrl, '/message/send-text') === false) {
    $apiUrl .= '/message/send-text';
}

// ===== Logika Bot Berbasis tb_botmenu =====
// Aturan:
// - Ketik "menu" → tampilkan menu level-atas (parent_id IS NULL)
// - Ketik angka keyword (mis. 3 atau 31) → jika punya URL, ambil konten URL tsb dan kirim; jika tidak, tampilkan submenu berdasarkan parent_id

function get_menu(PDO $pdo, $parentId = null) {
    if ($parentId === null) {
        $stmt = $pdo->prepare("SELECT keyword, description FROM tb_botmenu WHERE parent_id IS NULL ORDER BY keyword ASC");
        $stmt->execute();
    } else {
        $stmt = $pdo->prepare("SELECT keyword, description FROM tb_botmenu WHERE parent_id = :pid ORDER BY keyword ASC");
        $stmt->execute([':pid' => $parentId]);
    }
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!$rows) return null;
    $text = "📋 *Menu*\n";
    foreach ($rows as $row) {
        $text .= $row['keyword'] . ". " . $row['description'] . "\n";
    }
    $text .= "\nBalas dengan nomor yang diinginkan (contoh: 2 atau 31).";
    return $text;
}

function fetch_url_text($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($http >= 200 && $http < 300 && $resp) return trim($resp);
    return null;
}

$pesanBalasan = "Maaf, perintah tidak dikenali. Ketik *menu* untuk melihat daftar.";

// Tampilkan menu utama
if ($pesanMasuk === 'menu' || $pesanMasuk === 'help') {
    $menu = get_menu($pdo, null);
    if ($menu) $pesanBalasan = $menu;
} else if (preg_match('/^\d{1,3}$/', $pesanMasuk)) {
    // Cari item berdasarkan keyword angka
    $stmt = $pdo->prepare("SELECT id, url FROM tb_botmenu WHERE keyword = :kw LIMIT 1");
    $stmt->execute([':kw' => (int)$pesanMasuk]);
    $item = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($item) {
        if (!empty($item['url']) && stripos($item['url'], 'Masih dalam pengembangan') === false) {
            $content = fetch_url_text($item['url']);
            if ($content !== null && $content !== '') {
                $pesanBalasan = $content;
            } else {
                $pesanBalasan = "Maaf, data tidak tersedia untuk saat ini.";
            }
        } else {
            // Tampilkan submenu untuk parent ini
            $submenu = get_menu($pdo, (int)$item['id']);
            if ($submenu) {
                $pesanBalasan = $submenu;
            } else {
                $pesanBalasan = "Belum ada data/menu untuk pilihan tersebut.";
            }
        }
    }
}

// Tentukan tujuan balasan berdasarkan JID asal
$isGroup = false;
$to = '';
if (substr($fromJid, -5) === '@g.us') {
    // Balas ke grup yang sama
    $isGroup = true;
    $to = $fromJid;
} else {
    // Balas ke private chat: ambil hanya digit (format 62...)
    $digits = preg_replace('/\D+/', '', $fromJid);
    // Jika masih kosong, gagal
    if (!$digits) {
        echo json_encode(['error' => 'Nomor tujuan tidak valid']);
        exit;
    }
    $to = $digits;
}

// Siapkan payload untuk gateway baru
$body = [
    'session' => $sessionId,
    'to' => $to,
    'text' => $pesanBalasan,
    'is_group' => $isGroup,
];

$headers = [
    'Content-Type: application/json'
];
if (!empty($gatewayKey)) {
    $headers[] = 'key: ' . $gatewayKey;
}

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log
$logFrom = $fromJid;
$log = "[" . date("Y-m-d H:i:s") . "] From: $logFrom | In: $pesanMasuk | Reply: $pesanBalasan | Status: " . ($httpCode == 200 ? "SUKSES" : "GAGAL ($httpCode)") . "\n";
file_put_contents("log-balas-wa.txt", $log, FILE_APPEND);

echo json_encode(['status' => ($httpCode == 200 ? 'success' : 'fail'), 'message' => $pesanBalasan]);
exit;
