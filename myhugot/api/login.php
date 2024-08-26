<?php
header('Content-Type: application/json');

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hugot_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get the posted data
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is null or if required keys are missing
if (!$data) {
    echo json_encode(["success" => false, "message" => "No data provided. Please include both username and password."]);
    exit();
}

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["success" => false, "message" => "Both 'username' and 'password' keys are required."]);
    exit();
}

$user = $data['username'];
$pass = $data['password'];

// Validate input
if (empty($user) || empty($pass)) {
    echo json_encode(["success" => false, "message" => "Username or password cannot be empty"]);
    exit();
}

// Prepare SQL and bind parameters to prevent SQL injection
$stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $user);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $hashed_password);
$stmt->fetch();

if ($stmt->num_rows > 0) {
    // Verify password
    if (password_verify($pass, $hashed_password)) {
        echo json_encode(["success" => true, "message" => "Login successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid credentials"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
?>
