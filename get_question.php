<?php
require "./db.php";
$category = isset($_GET["question"]) ? $_GET["question"] : "matematyka";
$stmt = $db->prepare("SELECT questions.name AS question, answers.name AS answer, answers.is_correct FROM questions JOIN answers ON questions.id = answers.question_id WHERE questions.category LIKE :category");
$stmt->bindValue(":category", $category);
$stmt_result = $stmt->execute();
$result_obj = [];
while ($row = $stmt_result->fetchArray(SQLITE3_ASSOC)) {
  $result_obj[$row["question"]][$row["answer"]] = boolval($row["is_correct"]);
}
echo json_encode($result_obj);
