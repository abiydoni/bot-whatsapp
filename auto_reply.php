<?php
$nomor = $_GET['nomor'] ?? '';
$pesan = strtolower($_GET['pesan'] ?? '');

$balasan = "Terima kasih, pesan kamu sudah kami terima.";

// Kirim balasan via endpoint WAPI
$_GET['pesan'] = $balasan;
include 'send_wa_reply.php';
?>
