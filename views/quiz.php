<!DOCTYPE html>
<html lang="pl">
<?php require "components/head.php" ?>

<body>
  <div class="wrapper">
    <header class="header">
      <h1>RCKU Quiz</h1>
      <div id="course__wrapper">Pytania ze specjalizacji: <span id="course__name"></span></div>
    </header>
    <main id="main" class="main">
      <div id="question__wrapper">
        <div id="question__title" class="question__title"></div>
      </div>
      <form id="form" class="form">
        <div id="form__inputs" class="form__inputs"></div>
        <div id="form__buttons" class="form__buttons">
          <input type="submit" class="button question__check" id="question__check" value="Sprawdź">
          <input type="button" class="button question__next--disabled" id="question__next" value="Następne pytanie">
        </div>
      </form>
      <div id="result"></div>
    </main>
  </div>
  <script src="../lib/index.js" defer></script>
</body>

</html>