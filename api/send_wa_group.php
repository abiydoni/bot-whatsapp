<?php
include 'get_konfigurasi.php';

// Ambil konfigurasi dari database
$gatewayBase = get_konfigurasi('url_group'); // bisa berisi base URL gateway atau endpoint penuh
$sessionId   = get_konfigurasi('session_id');
$gatewayKey  = get_konfigurasi('gateway_key'); // opsional

// Cek metode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
	http_response_code(405);
	echo json_encode(['error' => 'Gunakan metode POST']);
	exit;
}

// Ambil dan sanitasi input
$groupList  = $_POST['groupId'] ?? [];
$pesangroup = isset($_POST['message']) ? trim((string)$_POST['message']) : '';

// Validasi
if (empty($groupList) || $pesangroup === '') {
	echo json_encode(['error' => 'Group dan pesan wajib diisi']);
	exit;
}

// Tentukan endpoint WA Gateway baru
$gatewayBase = rtrim((string)$gatewayBase, '/');
// Jika yang disimpan sudah mengandung "/message", anggap sudah endpoint akhir
$apiUrl = (stripos($gatewayBase, '/message') === false)
	? $gatewayBase . '/message/send-text'
	: $gatewayBase;

$logAll = "";
$successCount = 0;
$errorCount = 0;

foreach ($groupList as $group) {
	$group = trim((string)$group);
	if ($group === '') continue;

	// Pastikan format JID grup WhatsApp
	$jid = $group;
	if (stripos($jid, '@g.us') === false) {
		$jid .= '@g.us';
	}

	$payload = [
		'session'  => $sessionId,
		'to'       => $jid,
		'text'     => $pesangroup,
		'is_group' => true,
	];

	$headers = [
		'Content-Type: application/json',
	];
	if (!empty($gatewayKey)) {
		$headers[] = 'key: ' . $gatewayKey; // header otentikasi gateway (opsional)
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

	$status = ($httpCode === 200) ? 'SUKSES' : 'GAGAL';
	if ($status === 'SUKSES') {
		$successCount++;
	} else {
		$errorCount++;
	}

	$logAll .= '[' . date('Y-m-d H:i:s') . "] Group: $jid | Pesan: $pesangroup | Status: $status ($httpCode)\n";
}

// Simpan log semua
file_put_contents(__DIR__ . '/log-kirim-wa.txt', $logAll, FILE_APPEND);

// Redirect dengan status
if ($successCount > 0 && $errorCount === 0) {
	header('Location: pesan_group.php?status=success&jumlah=' . $successCount);
} elseif ($successCount > 0) {
	header('Location: pesan_group.php?status=partial&berhasil=' . $successCount . '&gagal=' . $errorCount);
} else {
	header('Location: pesan_group.php?status=error');
}
exit;
?>