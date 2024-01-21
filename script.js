let countdown = 10;
let highScore = 0;
let currentScore = 0;
let num1;
let num2;
let operator;
let setOperators = function () {
  let arr = [];
  $('.operator').each(function (index, operator) {
    if ($(operator).prop('checked')) {
      arr.push($(operator).parent().text());
    }
  })
  return arr;
}
let setRandomOperator = function () {
  let index = Math.floor(Math.random() * setOperators().length);
  
   operator = setOperators()[index];
  
}

let performOperation = function (num1, num2) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
  }

}

//generate new numbers
let generateNumbers = function () {
  
  num1 = Math.floor((Math.random() * 20));
  num2 = Math.floor((Math.random() * 20));
if (operator === '-' && num1 < num2) {
    generateNumbers();
  }
  else if (operator === '/' && num1 % num2 !== 0) {
    generateNumbers();
  }
}
let updateNumbers = function () {
  setRandomOperator();
  generateNumbers();
  let answer = performOperation(num1, num2);
  $('#problem').text(num1 + ' ' + operator + ' ' + num2);
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
  if (parseInt($('input').val()) === performOperation(first, second)) {
  countdown += 2;
  currentScore++;
  setScores();
  updateNumbers();
  $('input').val('');
  }
}
let startGame = function () {
  countdown = 10;
  currentScore = 0;
  setScores();
  startTimer();
  updateNumbers();
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