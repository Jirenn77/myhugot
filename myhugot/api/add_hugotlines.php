<?php
include "connection.php";
include "headers.php";

$json = isset($_POST['json']) ? $_POST['json'] : "";

$data = json_decode($json, true);

if (isset($data['hugotline'])) {
    $hugotline = $data['hugotline'];

    $sql = "INSERT INTO hugotlines (hugotline) VALUES (:hugotline)";
    $stmt = $conn->prepare($sql);

    $stmt->bindParam(":hugotline", $hugotline);

    if ($stmt->execute()) {
        echo 1; // Success response
    } else {
        echo 0; // Failure response
    }
} else {
    echo 0;
}
?>
