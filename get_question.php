<?php
require "./db.php";
$category = isset($_GET["question"]) ? $_GET["question"] : "informatyk";
$stmt = $db->prepare("SELECT questions.name AS question, answers.name AS answer, answers.is_correct, questions.has_image, questions.image_src FROM questions JOIN answers ON questions.id = answers.question_id WHERE questions.category LIKE :category");
$stmt->bindValue(":category", $category);
$stmt_result = $stmt->execute();
$result_obj = [];
while ($row = $stmt_result->fetchArray(SQLITE3_ASSOC)) {
  $result_obj[$row["question"]]["answers"][$row["answer"]] = boolval($row["is_correct"]);
  $result_obj[$row["question"]]["has_image"] = boolval($row["has_image"]);
  $result_obj[$row["question"]]["img"] = $row["image_src"];
}
echo json_encode($result_obj);
