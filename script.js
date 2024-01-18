let gameStart = false;
let countdown;
//generate new numbers
let generateNumbers = function () {
  let num1 = Math.floor((Math.random() * 20));
  let num2 = Math.floor((Math.random() * 20));
  let answer = num1 + num2;
  let nums = [num1, num2, answer];
  return nums;
}
//start timer
let startTimer = function () {
  countdown = 10;
  var timer = setInterval(function () {
    --countdown;
    $('#timer').text(countdown);
    if (countdown <= 0) {
    clearInterval(timer);
  }
  }, 1000);
  
}
$(document).ready(function () {
  $('#problem').text(generateNumbers()[0] + ' + ' + generateNumbers()[1]);
  

  $('form').on('submit', function (e) {
    e.preventDefault();
    if (countdown === 10) {
    startTimer()
    }
  })

})