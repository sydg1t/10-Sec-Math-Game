let countdown = 10;
let highScore = 0;
let currentScore = 0;
let num1;
let num2;
//generate new numbers
let generateNumbers = function () {
  num1 = Math.floor((Math.random() * 20));
  num2 = Math.floor((Math.random() * 20));
  $('#problem').text(num1 + ' + ' + num2);
  let answer = num1 + num2;
  let nums = [num1, num2, answer];
  return nums;
}
let setScores = function () {
  $('#current-score').text(currentScore);
  if (currentScore > highScore) {
    highScore = currentScore;
    $('#high-score').text(highScore);
  }

}
let gameOver = function () {
  $('#problem').text('GAME OVER!');
}
//start timer
let startTimer = function () {
  var timer = setInterval(function () {
    --countdown;
    $('#timer').text(countdown);
    if (countdown <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 1000);

}
let onCorrectAnswer = function (first, second) {
  console.log(parseInt($('input').val()) === (num1 + num2));
  if (parseInt($('input').val()) === first + second) {
    countdown += 2;
    currentScore++;
    setScores();
    generateNumbers();
    $('input').val('');
  }
}
let startGame = function () {
  countdown = 10;
  currentScore = 0;
  setScores();
  startTimer();
  generateNumbers();
}



$(document).ready(function () {

  $('form').on('submit', function (e) {
    e.preventDefault();
    if (countdown === 10 || countdown <= 0) {
      startGame();
    }
    onCorrectAnswer(num1, num2);
  })

})