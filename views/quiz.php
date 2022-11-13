<!DOCTYPE html>
<html lang="pl">
<?php require "components/head.php" ?>

<body>
  <div class="wrapper">
    <?php require "components/header.php" ?>
    <main id="main" class="main">
      <div>
        <div id="question__title" class="question__title"></div>
      </div>
      <form id="form" class="form">
        <div id="form__inputs" class="form__inputs"></div>
        <div id="form__buttons" class="form__buttons">
          <input type="submit" class="button" id="question__check" value="Sprawdź">
          <input type="button" class="button question__next--disabled" id="question__next" value="Następne pytanie">
        </div>
      </form>
      <div id="result"></div>
    </main>
  </div>
  <script src="./index.js" defer></script>
</body>

</html>