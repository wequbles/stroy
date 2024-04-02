<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_POST)) {
	http_response_code(400);
	echo json_encode(['error' => 'Invalid request']);
	exit;
}

$required_fields = ['nameReq', 'countryCodeReq', 'telReq'];

foreach ($required_fields as $field) {
	if (!isset($_POST[$field]) || empty($_POST[$field])) {
		http_response_code(400);
		echo json_encode(['error' => 'Missing required field: ' . $field]);
		exit;
	}
}

$nameReq = $_POST['nameReq'];

if (mb_strlen($nameReq) > 20 || preg_match('/\d/', $nameReq)) {
	http_response_code(400);
	echo json_encode(['error' => 'Missing required field: nameReq']);
	exit;
}

$countryCodeReq = $_POST['countryCodeReq'];
$telReq = $_POST['telReq'];

if ((mb_strlen($countryCodeReq) + mb_strlen($telReq)) !== (mb_strlen($countryCodeReq) + 15) || preg_match('/[a-zA-Z]/', $countryCodeReq)) {
	http_response_code(400);
	echo json_encode(['error' => 'Missing required field: countryCodeReq']);
	exit;
}

$messReq = $_POST['messReq'];

if (mb_strlen($messReq) > 150) {
	http_response_code(400);
	echo json_encode(['error' => 'Missing required field: messReq']);
	exit;
}

include 'dbconn.php';

try {
	$pdo = new PDO($dsn, $username, $password);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$stmt = $pdo->prepare('INSERT INTO applications (name, phone, message) VALUES (?, ?, ?)');
	$stmt->execute([$nameReq, $countryCodeReq . ' ' . $telReq, $messReq]);

	echo json_encode(['success' => true]);
} catch (PDOException $e) {
	http_response_code(500);
	echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
} finally {
	unset($pdo);
}
?>