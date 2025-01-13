import {letters, lettersKirilik, numbers, levelsArray} from "./initialScript.js";

const levelInputElements = document.querySelectorAll('.level--input');
const keyElements = document.querySelectorAll('.key');
const numberElements = document.querySelectorAll('.keyboardContainer--numbers');
const letterElements = document.querySelectorAll('.keyboardContainer--letter');
const output = document.querySelector('.outputContainer--p');
const buttonStart = document.querySelector('.buttonStart');

let round;
let attempt;
let level;
let task;
let taskNoneChecked;
let taskInputValue = '';

startInitial();

function startInitial() {
  round = 1;
  attempt = 1;
  level = 1;
  taskNoneChecked = '';
  taskInputValue = '';

  for(let item of levelInputElements) {
    item.addEventListener('click', (e) => changeLevel(e))
  }
  buttonStart.addEventListener('click', () => {
    makeRadioDisabled();
    startGame();
  });
}

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
function makeRadioDisabled() {
  // блокируем radio button
  for (let item of levelInputElements){
    item.disabled = true;
  }
}
//добавляем обработчик нажатия на клавишу
function addKeyEvents(){
  //добавляем события на кнопки
  for (let item of keyElements) {
    item.addEventListener('click', (e) => clickKeyElement(e.target.value));
  }
}
//начинаем играть
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

function showTask (task) {
  // console.log('show symbol:', task[0]);
  clickKey('.key--' + task[0], task);
}

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

function clickKeyElement (value) {
  console.log('clicked: ', value);
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

function checkInput (value) {
  if(!task) console.log('something goes wrong, I can`t find task');
  
  console.log('проверяем ', value);
  if (task[0] === value) {userMakeCorrectInput (value);}
  else {userMakeMistake ();}
}

function userMakeMistake () {

  if (attempt === 2) {
    output.classList.add('red');
    output.textContent = 'Game over!';
    setTimeout(() => {
      output.classList.remove('red');
      // togo:удаляем события с кнопок
      // togo:перезапускаем интерфейс

    }, 2000);
  } else {
    attempt += 1;
    output.textContent = 'Be mindful! You have the last attempt.';
    output.classList.add('green');
    setTimeout(() => {
      output.classList.remove('green');
      showTask(task);
    },2000);
  }
}

function userMakeCorrectInput (value) {
  taskInputValue += value;
  output.textContent = taskInputValue;
  // togo: проверка на конец задания
  // togo: проверка на следуюзую итерацию
  
}
// console.log(generateTask());