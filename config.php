<?php
$conn = new mysqli("localhost", "root", "", "tfh");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
