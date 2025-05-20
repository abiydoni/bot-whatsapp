<?php
// Cek metode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Gunakan metode POST']);
    exit;
}

// Ambil input dari webhook bot
$data = json_decode(file_get_contents("php://input"), true);
$pengirim = filter_var($data['pengirim'] ?? '', FILTER_SANITIZE_NUMBER_INT);
$pesanMasuk = strtolower(trim($data['pesan'] ?? ''));

// Validasi
if (!$pengirim || !$pesanMasuk) {
    echo json_encode(['error' => 'Pengirim dan pesan wajib diisi']);
    exit;
}

// Koneksi database
require 'db.php'; // pastikan di sini ada $pdo (objek PDO)

// Logika balasan
$pesanBalasan = "Maaf, perintah tidak dikenali. Ketik *cek data* untuk melihat informasi.";

if ($pesanMasuk === 'cek data') {
    $stmt = $pdo->query("SELECT code_id, kk_name FROM master_kk LIMIT 10");
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($data) {
        $pesanBalasan = "📊 *Data Terkini:*\n";
        foreach ($data as $i => $row) {
            $pesanBalasan .= ($i + 1) . ". {$row['code_id']} - {$row['kk_name']}\n";
        }
    } else {
        $pesanBalasan = "Tidak ada data yang tersedia.";
    }
}

// Kirim balasan ke nomor pengirim
$url = "https://wapi.appsbee.my.id/send-message";
$dataKirim = [
    'phoneNumber' => $pengirim,
    'message' => $pesanBalasan
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-session-id: 91e37fbd895dedf2587d3f506ce1718e'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($dataKirim));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log
$log = "[" . date("Y-m-d H:i:s") . "] Nomor: $pengirim | Masuk: $pesanMasuk | Balas: $pesanBalasan | Status: " . ($httpCode == 200 ? "SUKSES" : "GAGAL ($httpCode)") . "\n";
file_put_contents("log-balas-wa.txt", $log, FILE_APPEND);

// Respon JSON
echo json_encode(['status' => ($httpCode == 200 ? 'success' : 'fail'), 'message' => $pesanBalasan]);
exit;
