<?php
// sender.php - dipanggil oleh Node.js bot untuk kirim pesan

$input = json_decode(file_get_contents("php://input"), true);

$to = $input['to'] ?? '';
$message = $input['message'] ?? '';

$apiUrl = "https://wapi.appsbee.my.id/send-message";

$data = [
    "to" => $to,
    "message" => $message
];

$options = [
    "http" => [
        "header"  => "Content-Type: application/json\r\n",
        "method"  => "POST",
        "content" => json_encode($data)
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($apiUrl, false, $context);

echo $response;
?>
