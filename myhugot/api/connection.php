<?php 

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hugot_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

try{
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

}catch(PDOException $e){
  echo "Connection failed: " . $e->getMessage();
  exit;
}

?>