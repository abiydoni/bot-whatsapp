<?php
$nomor = $_GET['nomor'] ?? '';
$pesan = $_GET['pesan'] ?? '';

if (!$nomor || !$pesan) {
    http_response_code(400);
    echo json_encode(['error' => 'Nomor dan pesan wajib diisi']);
    exit;
}

$url = "https://wapi.appsbee.my.id/send-message";
$data = [
    'phoneNumber' => $nomor,
    'message' => $pesan
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-session-id: 91e37fbd895dedf2587d3f506ce1718e' // ganti jika perlu
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Optional output
echo json_encode([
    'status' => $httpCode,
    'response' => $response
]);
