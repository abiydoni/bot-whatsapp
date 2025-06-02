<?php
// Koneksi PDO
$host = 'localhost';
$db = 'appsbeem_jimpitan';
$user = 'appsbeem_admin';
$pass = 'A7by777__';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
    exit;
}

// Atur header JSON
header('Content-Type: application/json');

// Ambil parent_kode dari query string
$parentKode = isset($_GET['parent_kode']) ? $_GET['parent_kode'] : '0';

// Query data menu
$sql = "SELECT kode, nama, aksi FROM botmenu WHERE parent_kode = :parent ORDER BY urutan ASC";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':parent', $parentKode, PDO::PARAM_STR);
$stmt->execute();

$menu = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Tampilkan hasil JSON
echo json_encode($menu);
?>
