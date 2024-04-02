<?php
include 'dbconn.php';

try {
	$pdo = new PDO($dsn, $username, $password);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	die('Подключение не удалось: ' . $e->getMessage());
}

$query = $pdo->prepare('SELECT id, name, phone, message FROM applications');
$query->execute();
$data = $query->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($data);
?>