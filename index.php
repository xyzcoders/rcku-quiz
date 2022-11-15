<?php
$path = rtrim(parse_url($_SERVER["REQUEST_URI"])["path"], "/");
switch ($path) {
  case "/final":
    require __DIR__ . "/views/final.php";
    break;
  case "":
  case "/":
    require __DIR__ . "/views/rules.php";
    break;
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
    http_response_code(404);
    require __DIR__ . "/views/404.php";
    break;
}
