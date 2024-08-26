<?php
include "connection.php";
include "headers.php";

$sql = "SELECT * FROM hugotlines";
$stmt = $conn->prepare($sql);
$stmt->execute();
$hugotlines = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($hugotlines);
?>
