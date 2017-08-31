(function(){

  var divOperand_1 = document.querySelector('.operand_1');
  var divOperand_2 = document.querySelector('.operand_2');
  var divOperator_1_2 = document.querySelector('.operator_1_2');
  var inpUserAnswer = document.querySelector('[name=user-answer]');
  var btnProceed = document.querySelector('.proceed');
  var divRightAnswersCount = document.querySelector('.answers-count_right');
  var divWrongAnswersCount = document.querySelector('.answers-count_wrong');
  var btnStart = document.querySelector('.start-training');
  var btnEnd = document.querySelector('.end-training');
  var messageBox = document.querySelector('.message-container');
  var divListWrongAnswers = document.querySelector('.list-wrong-answers');

  var countRight = 0;
  var countWrong = 0;
  var listWrongAnswers = [];
  var i = 0;

  btnStart.addEventListener('click', startArithmTrainer);

  btnEnd.addEventListener('click', stopArithmTrainer);


  function startArithmTrainer() {

    var operand_1 = randomInteger(1, 20);
    var operand_2 = randomInteger(1, 20);
    var operator_1_2 = randomOperator();

    console.log('операнд 1: ' + operand_1);
    console.log('операнд 2: ' + operand_2);
    console.log('оператор 1-2: ' + operator_1_2);

    divOperand_1.innerHTML = operand_1;
    divOperand_2.innerHTML = operand_2;
    divOperator_1_2.innerHTML = operator_1_2;
    inpUserAnswer.value = '';
    messageBox.innerHTML = '';
    inpUserAnswer.focus();

    var res = +( arithmOperations(operand_1, operand_2, operator_1_2) ).toFixed(1);

    console.log('верный ответ: ' + res);

    btnProceed.classList.remove("disabled");
    btnEnd.classList.remove("disabled");
    btnStart.classList.add("disabled");

    btnProceed.onclick = function() {
      arithmTrainerProceed();
    };

    window.onkeydown = function(event) {
      if (event.keyCode == 13) {
        arithmTrainerProceed();
      }
    };

    function randomInteger(min, max) {

      var float = min - 0.5 + Math.random() * (max + 0.5 - min);
      return Math.round(float);

    };

    function randomOperator() {

      var operatorIndex = Math.floor(Math.random() * 3.5);
      var operators = ['+', '-', '*', '/'];

      return operators[operatorIndex];

    }

    function arithmOperations(x, y, op) {

      switch(op) {
        case '+':
        return x + y;
        break

        case '-':
        return x - y;
        break

        case '*':
        return x * y;
        break

        case '/':
        return x / y;
        break
      }

    };

    function arithmTrainerProceed() {

      var userResStr = inpUserAnswer.value;
      if( userResStr.indexOf(',') != -1 ) {
        userResStr = userResStr.replace(',', '.');
      }
      var userRes = parseFloat(userResStr);

      console.log('строчный ответ: ' + userResStr);
      console.log('приведенные ответ: ' + userRes);

      while ( userResStr == '' || isNaN(userRes) ) {
        messageBox.innerHTML = 'ответом должно быть число';

        if (messageBox.innerHTML != ' ') {
          messageBox.style.display = 'block'
        }

        inpUserAnswer.value = '';
        inpUserAnswer.focus();
        return
      }

      messageBox.style.display = 'none';

      if (res.toFixed(1) == userRes.toFixed(1)) {
        countRight++;
        divRightAnswersCount.innerHTML = countRight;
      } else {
        countWrong++;
        divWrongAnswersCount.innerHTML = countWrong;
        listWrongAnswers.push('<li>в выражении ' + operand_1 + ' ' + operator_1_2 + ' ' + operand_2 + ' верным ответом будет ' + res.toFixed(1) + ', а Вы ответили ' + userRes.toFixed(1) + '</li>');
        divListWrongAnswers.innerHTML += listWrongAnswers[i];
        i++;
      }

      startArithmTrainer();

    };
  };

  function stopArithmTrainer() {

    countRight = 0;
    countWrong = 0;
    listWrongAnswers = [];
    i = 0;
    operand_1 = null;
    operand_2 = null;
    operator_1_2 = null;

    divOperand_1.innerHTML = '';
    divOperand_2.innerHTML = '';
    divOperator_1_2.innerHTML = '';
    inpUserAnswer.innerHTML = '';
    divRightAnswersCount.innerHTML = '';
    divWrongAnswersCount.innerHTML = '';
    divListWrongAnswers.innerHTML = '';

    btnProceed.classList.add("disabled");
    btnEnd.classList.add("disabled");
    btnStart.classList.remove("disabled");

  };



})();
