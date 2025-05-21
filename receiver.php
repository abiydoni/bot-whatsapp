<?php
// receiver.php - menerima dari wapi.appsbee.my.id lalu teruskan ke Node.js

// Ambil input JSON dari gateway
$input = json_decode(file_get_contents("php://input"), true);

// Optional: log untuk debug
file_put_contents("log.txt", print_r($input, true), FILE_APPEND);

// Kirim ke Node.js Bot
$botUrl = "http://localhost:3000/webhook"; // URL bot kamu

$data = [
    'from' => $input['from'] ?? '',
    'message' => $input['message'] ?? ''
];

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($botUrl, false, $context);

// Tampilkan respons untuk debug
echo $response;
?>
