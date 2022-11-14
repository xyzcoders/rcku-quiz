<?php
$path = rtrim(parse_url($_SERVER["REQUEST_URI"])["path"], "/");
switch ($path) {
  case "/oze":
  case "/informatyk":
  case "/hotelarstwo":
  case "/turystyka":
  case "/ekonomista":
  case "/gastronomia":
  case "/obce":
  case "/matfiz":
    require __DIR__ . "/views/quiz.php";
    break;
  default:
    require __DIR__ . "/views/rules.php";
    break;
}
