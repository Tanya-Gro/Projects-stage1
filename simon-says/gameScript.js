import {letters, numbers, levelsArray} from "./initialScript.js";

const levelInputElements = document.querySelectorAll('.level--input');
const keyElements = document.querySelectorAll('.key');
const numberElements = document.querySelectorAll('.keyboardContainer--numbers');
const letterElements = document.querySelectorAll('.keyboardContainer--letter');

for(let item of levelInputElements) {
  item.addEventListener('click', (e) => changeLevel(e))
}

function changeLevel (event) {
  // console.log(event)
  getOffVisibility(keyElements);
  switch(event.target.value) {
    case ('Easy'):
      getOnVisibility(numberElements);
      break;
    case ('Medium'):
      getOnVisibility(letterElements);
      break;
    case ('Hard'):
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
// console.log(letters);