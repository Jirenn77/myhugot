<?php
header('Content-Type: application/json');
require 'connection.php'; // Include your database connection script

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $hugotlineId = $input['id'] ?? null;

    if ($hugotlineId) {
        // Check if the hugotline exists
        $stmt = $conn->prepare("SELECT id FROM hugotlines WHERE id = ?");
        $stmt->bind_param("i", $hugotlineId);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // Increment the like count
            $stmt = $conn->prepare("UPDATE hugotlines SET likes = likes + 1 WHERE id = ?");
            $stmt->bind_param("i", $hugotlineId);

            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Hugotline liked successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to like hugotline']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Hugotline not found']);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>
