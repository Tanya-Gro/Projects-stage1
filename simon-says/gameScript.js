import {letters, numbers, levelsArray} from "./initialScript.js";

const levelInputElements = document.querySelectorAll('.level--input');
const keyElements = document.querySelectorAll('.key');
const numberElements = document.querySelectorAll('.keyboardContainer--numbers');
const letterElements = document.querySelectorAll('.keyboardContainer--letter');

let round = 1;
let attempt = 1;
let level = 1;

for(let item of levelInputElements) {
  item.addEventListener('click', (e) => changeLevel(e))
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

function getOffVisibility (NodeList) {
  for(let item of NodeList) {
    if (item.classList.contains('visible'))
      item.classList.remove('visible');
  }
}

function getOnVisibility (NodeList) {
  for(let item of NodeList) {
    if (!item.classList.contains('visible'))
      item.classList.add('visible');
  }
}

function generateTask() {
  let result = '';
  let countSymbols = level === 1 ? numbers.length : level === 3 ? numbers.length + letters.length : letters.length;
  let randomNum;
  for(let i = 0; i < round * 2; i += 1) {
    randomNum = Math.floor(Math.random() * countSymbols);
    console.log(randomNum);
    if(level === 1){
      result += numbers[randomNum][0];
    } else if(level === 2){
      result += letters[randomNum][0];
    } else {
      if(randomNum < numbers.length) result += numbers[randomNum][0];
      else result += letters[randomNum - numbers.length][0];
    }
  }
  return result;
}
// console.log(generateTask());