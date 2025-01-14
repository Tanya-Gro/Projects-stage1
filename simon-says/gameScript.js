import {letters, lettersKirilik, numbers, levelsArray} from "./initialScript.js";

const levelInputElements = document.querySelectorAll('.level--input');
const keyElements = document.querySelectorAll('.key');
const numberElements = document.querySelectorAll('.keyboardContainer--numbers');
const letterElements = document.querySelectorAll('.keyboardContainer--letter');
const output = document.querySelector('.output--p');
const buttonStart = document.querySelector('.buttonStart');
const buttonReStart = document.querySelector('.buttonReStart');
const buttonRepeat = document.querySelector('.buttonRepeat');
const buttonNext = document.querySelector('.buttonNext');
const roundsLabel = document.querySelector('.roundsLabel');

const settings = {
  'round' : 1,
  'attempt' : 1,
  'level' : 1,
  'task' : '',
  'taskNoneChecked' : '',
  'taskInputValue' : '',
  'countRepeat' : 1,
  'reset' : function (repeat = false) {
    if (repeat === false) {
      this.round = 1;
      this.attempt = 1;
      this.task = '';
      this.countRepeat = 1;
    }
    this.taskNoneChecked = this.task;
    this.taskInputValue ='';
    output.textContent = '';
    roundsLabel.textContent = `Round: ${this.round}/5`;
  },
  'virtualClickHandler' : function (e) {
    clickKeyElement(e.target.value)
  },
  'clickHandler' : function (e) {
      clickKeyElement(e.key.toUpperCase(),true);
  },
};

(function() {
  for(let item of levelInputElements) {
    item.addEventListener('click', (e) => changeLevel(e))
  }

  buttonStart.addEventListener('click', () => {
    addRadioDisabled();
    startGame();
  });

  buttonReStart.addEventListener('click', () => {
    if (output.classList.contains('green')) output.classList.remove('green');

    if (buttonNext.classList.contains('visible')) buttonNext.classList.remove('visible');

    removeRadioDisabled();
    startInitial();
  });

  buttonRepeat.addEventListener('click', () => {
    if(settings.countRepeat <= 2) buttonRepeat.disabled = true;
    if (output.classList.contains('green')) output.classList.remove('green');
    // console.log(settings.countRepeat);
    settings.countRepeat += 1;
    settings.reset(true);
    showTask(settings.task);
  });
  
  buttonNext.addEventListener('click', () => {
    if (output.classList.contains('green')) output.classList.remove('green');
    buttonNext.classList.remove('visible');
    buttonRepeat.classList.add('visible');
    settings.round += 1;

    settings.attempt = 1;
    settings.task = generateTask();
    settings.reset(true);
    buttonRepeat.disabled = true;
    buttonReStart.disabled = true;
    showTask(settings.task);
  });

  startInitial();
})();
//начальные настройки
function startInitial() {
  settings.reset();
  if(!buttonStart.classList.contains('visible')) {
    buttonStart.classList.add('visible');
    buttonReStart.classList.remove('visible');
  }
  if (buttonRepeat.classList.contains('visible')) buttonRepeat.classList.remove('visible');
  roundsLabel.textContent = `Round: ${settings.round}/5`;
}
//пользователь изменяет уровень сложности
function changeLevel (event) {
  // console.log(event)
  getOffVisibility(keyElements);
  switch(event.target.value) {
    case (levelsArray[0]):
      settings.level = 1;
      getOnVisibility(numberElements);
      break;
    case (levelsArray[1]):
      settings.level = 2;
      getOnVisibility(letterElements);
      break;
    case (levelsArray[2]):
      settings.level = 3;
      getOnVisibility(numberElements);
      getOnVisibility(letterElements);
      break;
  }
  // console.log(settings.level)
}
//невидимость клавиш
function getOffVisibility (NodeList) {
  for(let item of NodeList) {
    if (item.classList.contains('visible'))
      item.classList.remove('visible');
  }
}
//видимость клавиш
function getOnVisibility (NodeList) {
  for(let item of NodeList) {
    if (!item.classList.contains('visible'))
      item.classList.add('visible');
  }
}
//генерируем задание
function generateTask() {
  settings.countRepeat = 1;
  let result = '';
  let countSymbols = settings.level === 1 ? numbers.length : settings.level === 3 ? numbers.length + letters.length : letters.length;
  // console.log(settings.level, countSymbols)

  for(let i = 0; i < settings.round * 2; i += 1) {
    let randomNum = Math.floor(Math.random() * countSymbols);
    // console.log(randomNum);
    if(settings.level === 1){
      result += numbers[randomNum];
    } else if(settings.level === 2){
      result += letters[randomNum];
    } else {
      if(randomNum < numbers.length) result += numbers[randomNum];
      else result += letters[randomNum - numbers.length];
    }
  }
  console.log('Task: ', result);
  return result;
}
//реализуем невозможность изменять уровень сложности
function addRadioDisabled() {
  // блокируем radio button
  for (let item of levelInputElements){
    item.disabled = true;
  }
}
//возвращаем возможность изменять уровень сложности
function removeRadioDisabled() {
  // блокируем radio button
  for (let item of levelInputElements){
    item.disabled = false;
  }
}
//добавляем обработчик нажатия на клавишу
function addKeyEvents() {
  //добавляем события для ввода
  for (let item of keyElements) {
    item.addEventListener('click', settings.virtualClickHandler);
  }

  document.addEventListener('keyup', settings.clickHandler);
}
//удаляем обработчик нажатия на клавищ
function removeKeyEvents() {
  //удаляем события ввода
  for (let item of keyElements) {
    item.removeEventListener('click',  settings.virtualClickHandler);
  }
  document.removeEventListener('keyup', settings.clickHandler);
}
//начинаем играть /нажали СТАРТ/
function startGame() {
  settings.reset();
  buttonStart.classList.remove('visible');
  buttonReStart.classList.add('visible');
  buttonRepeat.classList.add('visible');
  buttonRepeat.disabled = true;
  buttonReStart.disabled = true;
  // демонстрация задания
  settings.task = generateTask();
  settings.taskNoneChecked = settings.task;

  showTask(settings.task);
}
//демонстрация задания
function showTask (task) {
  // console.log('show symbol:', task[0]);
  clickKey('.key--' + task[0], task);
}
//имитируем нажание клавиш для демонстрации задания
function clickKey(className, task) {
  const element = document.querySelector(className);
  // console.log(element);
  element.classList.add('active');
  setTimeout(() => {
    element.classList.remove('active');
    if(task.substring(1)) setTimeout(() => {
      showTask(task.substring(1));
    }, 500);
    else setTimeout(() => {
      addKeyEvents();
      if(settings.countRepeat < 2) buttonRepeat.disabled = false;
      buttonReStart.disabled = false;
    }, 700);
  }, 500);
}
//обрабатываем событие ввода с клавиатур, валидный/невалидный ввод
function clickKeyElement (value, byKeyboard = false) {
  // console.log('clicked: ', value);
  switch (settings.level) {
    case 1:
      if(numbers.includes(value)) {
        if (byKeyboard) showPressedKeyOnVirtualKeyboard('.key--' + value);
        checkInput (value);
      }
      break;
    case 2:
      if(letters.includes(value) || lettersKirilik.includes(value)) {
        if (lettersKirilik.includes(value)) value = letters[lettersKirilik.indexOf(value)];
        if (byKeyboard) showPressedKeyOnVirtualKeyboard('.key--' + value);
        checkInput (value);
      }
      break;
    default:
      if(letters.includes(value) || lettersKirilik.includes(value) || numbers.includes(value)) {
        if (lettersKirilik.includes(value)) value = letters[lettersKirilik.indexOf(value)];
        if (byKeyboard) showPressedKeyOnVirtualKeyboard('.key--' + value);
        checkInput (value);
      }
      break;
  }
  // console.log('input isn`t valid');
}
//отображаем воод с клавиатуры на виртуальной
function showPressedKeyOnVirtualKeyboard(className) {
  // console.log(className)
  const element = document.querySelector(className);
  // console.log(element)
  element.classList.add('active');
  setTimeout(() => {
    element.classList.remove('active');
  }, 500);
}
//ввод валидный -> теперь проверяем на соответствие заданию
function checkInput (value) {
  if(!settings.task) console.log('something goes wrong, I can`t find task');

  if (settings.taskNoneChecked[0] === value) {
    userMakeCorrectInput (value);
  } else {
    userMakeMistake ();
  }
}
//обрабатываем ошибку валидного ввода
function userMakeMistake () {
  removeKeyEvents();

  if (settings.attempt === 2) {
    //истрачены все попытки
    output.classList.add('red');
    output.textContent = 'Game over!';
    setTimeout(() => {
      output.classList.remove('red');
      output.textContent = '';
      removeRadioDisabled();
      //перезапускаем интерфейс
      startInitial();
    }, 1500);
  } else {
    //вторая попытка
    settings.attempt += 1;
    output.textContent = 'Be mindful! You have the last attempt.';
    output.classList.add('green');
  }
}
//обрабатываем успешный ввод
function userMakeCorrectInput (value) {
  //отображаем пользовательский ввод
  settings.taskInputValue += value;
  output.textContent = settings.taskInputValue;
  settings.taskNoneChecked = settings.taskNoneChecked.substring(1);
  // если введено задание не до конца
  if(settings.task !==settings.taskInputValue) return;  
  
  // если введено не все задание
  removeKeyEvents();
  if(settings.round === 5) {
    //конец игры
    output.textContent = 'Congratulations! You win!';
    output.classList.add('green');
    buttonRepeat.disabled = true;
  }
  else {
    //следующий райнд
    output.textContent = 'Great job! Next round?';
    output.classList.add('green');
    buttonNext.classList.add('visible');
    buttonRepeat.classList.remove('visible');
  }
}