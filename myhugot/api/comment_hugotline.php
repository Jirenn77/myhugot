<?php
header('Content-Type: application/json');
require 'connection.php'; // Make sure this file exists and the path is correct

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $hugotlineId = $input['id'] ?? null;
    $comment = $input['comment'] ?? null;

    if ($hugotlineId && $comment) {
        // Check if $conn is a valid PDO instance
        if (!$conn instanceof PDO) {
            echo json_encode(['success' => false, 'message' => 'Database connection error']);
            exit;
        }

        // Prepare and execute the SQL statement
        $stmt = $conn->prepare("INSERT INTO comments (hugotline_id, comment) VALUES (:hugotline_id, :comment)");
        $stmt->bindValue(':hugotline_id', $hugotlineId, PDO::PARAM_INT);
        $stmt->bindValue(':comment', $comment, PDO::PARAM_STR);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Comment added successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to add comment']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
