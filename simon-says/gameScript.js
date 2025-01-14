import {letters, lettersKirilik, numbers, levelsArray} from "./initialScript.js";

const levelInputElements = document.querySelectorAll('.level--input');
const keyElements = document.querySelectorAll('.key');
const numberElements = document.querySelectorAll('.keyboardContainer--numbers');
const letterElements = document.querySelectorAll('.keyboardContainer--letter');
const output = document.querySelector('.output--p');
const buttonStart = document.querySelector('.buttonStart');
const roundsLabel = document.querySelector('.roundsLabel');

let round;
let attempt;
let level;
let task;
let taskNoneChecked;
let taskInputValue = '';

(function() {
  for(let item of levelInputElements) {
    item.addEventListener('click', (e) => changeLevel(e))
  }
  buttonStart.addEventListener('click', () => {
    addRadioDisabled();
    startGame();
  });

  startInitial();
})();
//начальные настройки
function startInitial() {
  round = 1;
  attempt = 1;
  level = 1;
  taskNoneChecked = '';
  taskInputValue = '';

  roundsLabel.textContent = `Round: ${round}/5\n Try: ${attempt}/2`;
}
//пользователь изменяет уровень сложности
function changeLevel (event) {
  // console.log(event)
  getOffVisibility(keyElements);
  switch(event.target.value) {
    case (levelsArray[0]):
      level = 1;
      getOnVisibility(numberElements);
      break;
    case (levelsArray[1]):
      level = 2;
      getOnVisibility(letterElements);
      break;
    case (levelsArray[2]):
      level = 3;
      getOnVisibility(numberElements);
      getOnVisibility(letterElements);
      break;
  }
  // console.log(event.target.value)
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
  let result = '';
  let countSymbols = level === 1 ? numbers.length : level === 3 ? numbers.length + letters.length : letters.length;
  let randomNum;
  for(let i = 0; i < round * 2; i += 1) {
    randomNum = Math.floor(Math.random() * countSymbols);
    // console.log(randomNum);
    if(level === 1){
      result += numbers[randomNum];
    } else if(level === 2){
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
const virtualClickHandler = function (e) {
  clickKeyElement(e.target.value);
};
const clickHandler = function (e) {
  clickKeyElement(e.key.toUpperCase());
};
function addKeyEvents() {

  //добавляем события для ввода
  for (let item of keyElements) {
    item.addEventListener('click', virtualClickHandler);
  }

  document.addEventListener('keyup', clickHandler);
}
//удаляем обработчик нажатия на клавищ
function removeKeyEvents() {
  //удаляем события ввода
  for (let item of keyElements) {
    item.removeEventListener('click',  virtualClickHandler);
  }
  document.removeEventListener('keyup', clickHandler);
}

//начинаем играть /нажали СТАРТ/
function startGame() {
  round = 1;
  attempt = 1;
  task = '';
  // console.log('start game');

  // демонстрация задания
  task = generateTask();
  taskNoneChecked = task;
  // добавляем блокировщик любого события

  showTask(task);

  //добавлием события на ввод с клавы

  //одижаем пользовательского ввода
  
  //ввод произведен
  // console.log(levelInputElements)
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
    else setTimeout(() => {addKeyEvents()}, 1000);
  }, 1000);
}
//обрабатываем событие ввода с клавиатур, валидный/невалидный ввод
function clickKeyElement (value) {
  // console.log('clicked: ', value);
  switch (level) {
    case 1:
      if(numbers.includes(value)) checkInput (value);
      break;
    case 2:
      if(letters.includes(value) || lettersKirilik.includes(value)) {
        if (lettersKirilik.includes(value)) checkInput (letters[lettersKirilik.indexOf(value)]);
        else checkInput (value);
      }
      break;
    default:
      if(letters.includes(value) || lettersKirilik.includes(value) || numbers.includes(value)) {
        if (lettersKirilik.includes(value)) checkInput(letters[lettersKirilik.indexOf(value)]);
        else checkInput (value);
      }
      break;
  }
  // console.log('input isn`t valid');
}
//ввод валидный -> теперь проверяем на соответствие заданию
function checkInput (value) {
  if(!task) console.log('something goes wrong, I can`t find task');
  
  // console.log('проверяем ', value);
  // if (task[taskInputValue.length] === value) {
  // console.log('value:', value, 'task:', task, taskNoneChecked, taskNoneChecked[0] === value)
  if (taskNoneChecked[0] === value) {
    userMakeCorrectInput (value);
  } else {
    userMakeMistake ();
  }
}
//обрабатываем ошибку валидного ввода
function userMakeMistake () {
  removeKeyEvents();

  if (attempt === 2) {
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
    attempt += 1;
    output.textContent = 'Be mindful! You have the last attempt.';
    output.classList.add('green');
    setTimeout(() => {
      output.classList.remove('green');
      roundsLabel.textContent = `Round: ${round}/5\n Try: ${attempt}/2`;
      taskNoneChecked = task;
      taskInputValue = '';
      output.textContent = '';
      showTask(task);
    },2000);
  }
}
//обрабатываем успешный ввод
function userMakeCorrectInput (value) {
  //отображаем пользовательский ввод
  taskInputValue += value;
  output.textContent = taskInputValue;
  taskNoneChecked = taskNoneChecked.substring(1);
  // если введено не все задание
  if(task !==taskInputValue) return;
  // если введено все задание
  removeKeyEvents();
  // togo: проверка на конец задания
  if(round === 5) {
    output.textContent = 'Congratulations! You win!';
    output.classList.add('green');
    setTimeout(() => {
      output.classList.remove('green');
      output.textContent = '';
      removeRadioDisabled();
      startInitial();
    },2000);
  }
  else {
    round += 1;
    output.textContent = 'Next round...';
    output.classList.add('green');
    setTimeout(() => {
      output.classList.remove('green');
      output.textContent = '';
      roundsLabel.textContent = `Round: ${round}/5\n Try: ${attempt}/2`;
      taskInputValue = '';
      task = generateTask();
      taskNoneChecked = task;
      showTask(task);
    },2000);
  }
    
  // togo: проверка на следуюзую итерацию
  
}
// console.log(generateTask());