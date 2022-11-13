<?php
$path = parse_url($_SERVER["REQUEST_URI"])["path"];
switch ($path) {
  case "/biologia":
  case "/gry":
  case "/matematyka":
    require __DIR__ . "/views/quiz.php";
    break;
  default:
    require __DIR__ . "/views/rules.php";
    break;
}
