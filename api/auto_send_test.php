<?php
include 'get_konfigurasi.php';

// Ambil konfigurasi dari database
$filePesan   = get_konfigurasi('report3');
$groupId     = get_konfigurasi('group_id2');
$gatewayBase = get_konfigurasi('url_group');
$sessionId   = get_konfigurasi('session_id');
$gatewayKey  = get_konfigurasi('gateway_key'); // opsional

// Ambil isi pesan dari file konfigurasi
include $filePesan;
$message = $pesan;

// Jika pesan kosong atau berisi "kosong", hentikan proses
if (empty(trim($message)) || stripos($message, 'kosong') !== false) {
    exit;
}

// Tentukan endpoint WA Gateway baru
$apiUrl = rtrim((string)$gatewayBase, '/');
if (stripos($apiUrl, '/message') === false) {
    $apiUrl .= '/message/send-text';
}

// Normalisasi JID grup
$jid = trim((string)$groupId);
if ($jid === '') {
    exit;
}
if (stripos($jid, '@g.us') === false) {
    $jid .= '@g.us';
}

$payload = [
    'session'   => $sessionId,
    'to'        => $jid,
    'text'      => $message,
    'is_group'  => true,
];

$headers = [ 'Content-Type: application/json' ];
if (!empty($gatewayKey)) {
    $headers[] = 'key: ' . $gatewayKey;
}

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
?>
