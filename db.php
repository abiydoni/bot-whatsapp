<?php
$host = 'localhost';
$db = 'appsbeem_jimpitan';
$user = 'appsbeem_admin';
$pass = 'A7by777__';

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, $options);
} catch (PDOException $e) {
    error_log("DB Connection failed: " . $e->getMessage());
    // jangan echo pesan error di sini jika di produksi
    exit('Database connection error.');
}
