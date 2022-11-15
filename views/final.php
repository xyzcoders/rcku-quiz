<!DOCTYPE html>
<html lang="en">

<?php require __DIR__ . "/components/head.php" ?>

<body>
  <div class="wrapper">
    <header class="header">
      <h1>RCKU Quiz</h1>
    </header>
    <main class="main">
      <p>W luki wpisz otrzymane hasła w odpowiedniej kolejności</p>
      <p class="finalQuiz">
        <span class="input__wrapper"></span>
        <span class="input__wrapper"></span>
        <span class="input__wrapper"></span>
        <span class="input__wrapper"></span>
        <span class="input__wrapper"></span>
        !
        <span class="input__wrapper"></span>,
        <span class="input__wrapper"></span>
        i
        <span class="input__wrapper"></span>!
      </p>
      <input type="button" value="Sprawdź" id="check" class="button question__check">
    </main>
  </div>
  <script src="../lib/final.js" defer></script>
</body>

</html>