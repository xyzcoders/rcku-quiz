<?php
require "./db.php";
$path = isset($_GET["path"]) ? $_GET["path"] : "oze";
$stmt = $db->prepare("SELECT full_name FROM fields WHERE path = :path");
$stmt->bindValue(":path", $path);
$stmt_result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);
echo json_encode($stmt_result);
