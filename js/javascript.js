  
/*--Арифметический тренажер--*/
(function(){

    //формируем переменные с элементами интерфейса
  var divOperand_1 = document.querySelector('.operand_1');
  var divOperand_2 = document.querySelector('.operand_2');
  var divOperator_1_2 = document.querySelector('.operator_1_2');
  var divEqual = document.querySelector('.equal');
  var inpUserAnswer = document.querySelector('[name=user-answer]');
  var btnProceed = document.querySelector('.proceed');
  var divRightAnswersCount = document.querySelector('.answers-count_right');
  var divWrongAnswersCount = document.querySelector('.answers-count_wrong');
  var btnStart = document.querySelector('.start-training');
  var btnEnd = document.querySelector('.end-training');
  var divMessageBox = document.querySelector('.message-container');
  var divListWrongAnswers = document.querySelector('.list-wrong-answers');
  var rangeRail = document.querySelector('.range-rail');
  var rangeDot = document.querySelector('.range-dot');
  var rangeOutput = document.querySelector('.range-output');
    //задаем счетчики правильных и ошибочных ответов, создаем массив для хранения ошибочных ответов, задаем счетчик для вывода ошибочных ответов из массива на экран
  var countRight = 0;
  var countWrong = 0;
  var listWrongAnswers = [];
  var IndexlistWrong = 0;
  var left = 1;

    //по клику на бегунок запускаем обработчик работы бегунка
  rangeDot.onmousedown = activeRailRange;
    //по тапу на бегунок запускаем обработчик работы бегунка
    //по клику на кнопку запускаем тренажер
  btnStart.addEventListener('click', startArithmTrainer);
    //по клику на кнопку отключаем тренажер
  btnEnd.addEventListener('click', stopArithmTrainer);


  function activeRailRange(event) {

    var coordRail = getCoord(rangeRail);
    var coordDot = getCoord(rangeDot);
    var shiftXleft = event.pageX - coordDot.left;

    window.onmousemove = function(event) {

      left = event.pageX - shiftXleft - coordRail.left;

      if (left < 30) {
        rangeRail.style.backgroundColor = "#000000";
      } else if (left >= 30 && left < 75) {
        rangeRail.style.backgroundColor = "#720c0c";
      } else if (left >= 75 && left < 105) {
        rangeRail.style.backgroundColor = "#ba1414";
      } else if (left >= 105 && left <= 134) {
        rangeRail.style.backgroundColor = "#ff0000";
      }

      if (left < 0) {
        left = 1;
      }

      if (left > (coordRail.right - coordRail.left - rangeDot.offsetWidth)) {
        left = (coordRail.right - coordRail.left - rangeDot.offsetWidth);
      }

      rangeDot.style.left = left + 'px';
      rangeOutput.innerHTML = left;

    };

    window.onmouseup = function() {
      window.onmouseup = window.onmousemove = null;
    }

    function getCoord(elem) {

      var box = elem.getBoundingClientRect();

      return {
        left: box.left + pageXOffset,
        right: box.right + pageXOffset,
        top: box.top + pageYOffset,
        bottom: box.bottom + pageYOffset
      }

    };
  };

  function startArithmTrainer() {

      //задаем установки стилей некоторым элементам интерфейса после запуска тренажера
    btnProceed.classList.remove("disabled");
    btnEnd.classList.remove("disabled");
    btnStart.classList.add("disabled");
      //замораживаем бегунок выбора диапазона чисел
    rangeDot.onmousedown = null;
    rangeDot.classList.add('range-dot_disable');
      //формируем числа и операторы для выражения
    var operand_1 = randomInteger(1, left);
    var operand_2 = randomInteger(1, left);
    var operator_1_2 = randomOperator();

    console.log('операнд 1: ' + operand_1);
    console.log('операнд 2: ' + operand_2);
    console.log('оператор 1-2: ' + operator_1_2);

      //выводим сформированные числа и операнды с помощью элементов интерфейса
    divOperand_1.innerHTML = operand_1;
    divOperand_2.innerHTML = operand_2;
    divOperator_1_2.innerHTML = operator_1_2;
    divEqual.innerHTML = '=';
    inpUserAnswer.value = '';
    divMessageBox.innerHTML = '';
    inpUserAnswer.focus();
      //формируем правильный результат на сформированное и выведенное на экран выражение
    var res = +( arithmOperations(operand_1, operand_2, operator_1_2) ).toFixed(1);

    console.log('верный ответ: ' + res);
      //по нажатию на кнопку запускаем обработку введеного пользователем ответа и вывод следующего выраженияю
    btnProceed.onclick = function() {
      arithmTrainerProceed()
    };

      //данный обработчик не работает, т.к. addEventListener не перезатирает себя самого на предыдущем витке, и с каждым вызовом addEventListener'а становиться на один обработчик больше и arithmTrainerProceed вызывается по несколько раз.
      //btnProceed.addEventListener('click',  arithmTrainerProceed);

      //по нажатию на enter запускаем обработку введеного пользователем ответа и вывод следующего выраженияю
    window.onkeydown = function(event) {
      if (event.keyCode == 13) {
        arithmTrainerProceed();
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
        divMessageBox.innerHTML = 'ответом должно быть число';

        if (divMessageBox.innerHTML != ' ') {
          divMessageBox.style.display = 'block'
        }

        inpUserAnswer.value = '';
        inpUserAnswer.focus();
        return
      };

      divMessageBox.style.display = 'none';

      if (res.toFixed(1) == userRes.toFixed(1)) {
        countRight++;
        divRightAnswersCount.innerHTML = countRight;
      } else {
        countWrong++;
        divWrongAnswersCount.innerHTML = countWrong;
        listWrongAnswers.push('<li>в выражении ' + operand_1 + ' ' + operator_1_2 + ' ' + operand_2 + ' верным ответом будет ' + res.toFixed(1) + ', а Вы ответили ' + userRes.toFixed(1) + '</li>');
        divListWrongAnswers.innerHTML += listWrongAnswers[IndexlistWrong];
        IndexlistWrong++;
      }

      startArithmTrainer();

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

  };

  function stopArithmTrainer() {

    countRight = 0;
    countWrong = 0;
    listWrongAnswers = [];
    i = 0;
    operand_1 = null;
    operand_2 = null;
    operator_1_2 = null;
    left = 0;

    divOperand_1.innerHTML = '';
    divOperand_2.innerHTML = '';
    divOperator_1_2.innerHTML = '';
    divEqual.innerHTML = '';
    inpUserAnswer.innerHTML = '';
    divRightAnswersCount.innerHTML = '';
    divWrongAnswersCount.innerHTML = '';
    divListWrongAnswers.innerHTML = '';
    rangeOutput.innerHTML = '';

    btnProceed.classList.add("disabled");
    btnEnd.classList.add("disabled");
    btnStart.classList.remove("disabled");

    rangeDot.onmousedown = activeRailRange;;
    rangeDot.classList.remove('range-dot_disable');

  };

})();
