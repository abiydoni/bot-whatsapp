<?php
// Endpoint yang dipanggil oleh WA Gateway: BASE_URL + /message
// Base URL diset lewat env WEBHOOK_BASE_URL di gateway, contoh:
// WEBHOOK_BASE_URL = https://botwa.appsbee.my.id/api
// Maka gateway POST ke: https://botwa.appsbee.my.id/api/message

require __DIR__ . '/balas_otomatis.php';


