let duration;
let highScore = 0;
let currentScore = 0;
let num1;
let num2;
let operator;
let gameEnded = true;
let setMaxVal = function () {
  let maxVal = $('#digit-select').val()
  if (maxVal) {
    return maxVal;
  }
  return 10;
}
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


let generateNumbers = function () {

  num1 = Math.round((Math.random() * setMaxVal()));
  num2 = Math.round((Math.random() * setMaxVal()));
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
   gameEnded = true;
  return gameEnded;
}

let startTimer = function () {
  let startTime = Date.now();
   duration = 10000;
  var timer = setInterval(function () {
    let elapsedTime = Date.now() - startTime;
     remainingTime = duration - elapsedTime;
    
    $('#timer').text(Math.ceil(remainingTime/1000));
    if (remainingTime <= 0) {
      clearInterval(timer);
      gameOver();
    }
  }, 200);

}
let addTime = function () {
      duration += 1000;
    }
let onCorrectAnswer = function (first, second) {
  if (parseInt($('input').val()) === performOperation(first, second)) {
    addTime();
    currentScore++;
    setScores();
    updateNumbers();
    $('form input').val('');
  }
}
let startGame = function () {
  gameEnded = false;
  currentScore = 0;
  setScores();
  startTimer();
  updateNumbers();
}

$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    if (gameEnded) {
      startGame();
    }
    onCorrectAnswer(num1, num2);
  })

})