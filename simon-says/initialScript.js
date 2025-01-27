const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
const lettersKirilik = 'ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ'.split('');
const numbers = '0123456789'.split('');
//названия уровней д.б. уникальны
const levelsArray = ['Easy', 'Medium', 'Hard'];

// заполняем страницу
(function () {
  const bodyElement = document.querySelector('body');
  
  const navigationContainer = createDomNode(bodyElement, 'div', 'navigation');
  const levelsContainer = createDomNode(navigationContainer, 'div', 'levels');
  
  const roundsLabel = createDomNode(navigationContainer, 'p', 'roundsLabel roundsLabel--disable');
  roundsLabel.textContent = 'Round: 1/5';
  
  const buttomContainer = createDomNode(navigationContainer, 'div', 'buttomContainer');
  const buttonReStart = createDomNode(buttomContainer, 'button', 'button buttonReStart');
  buttonReStart.textContent = 'New game';
  
  const buttonRepeat = createDomNode(buttomContainer, 'button', 'button buttonRepeat');
  buttonRepeat.textContent = 'Repeat the sequence';

  const buttonNext = createDomNode(buttomContainer, 'button', 'button buttonNext');
  buttonNext.textContent = 'Next';

  const buttonStart = createDomNode(buttomContainer, 'button', 'button buttonStart active visible');
  buttonStart.textContent = 'Start';
  
  const outputContainer = createDomNode(bodyElement, 'div', 'output');
  const keyboardContainer = createDomNode(bodyElement, 'div', 'keyboard');
  
  bodyElement.append(navigationContainer);
  navigationContainer.append(levelsContainer);
  navigationContainer.append(roundsLabel);
  navigationContainer.append(buttomContainer);
  buttomContainer.append(buttonReStart);
  buttomContainer.append(buttonRepeat);
  buttomContainer.append(buttonNext);
  buttomContainer.append(buttonStart);
  bodyElement.append(outputContainer);
  bodyElement.append(keyboardContainer);

  // добавляем уровни сложности
  fillLavelsConteiner(levelsContainer);
  // добавляем поле вывода
  outputContainer.append(createDomNode(outputContainer, 'p', 'output--p'))
  // добавляем клавиатуру
  fillKeyboardConteiner(keyboardContainer);
  // appendModalElements();
})();
//создаем элементы
function createDomNode(node, element, classes) {
  node = document.createElement(element);
  node.className = classes;
  return node;
};
// добавляем уровни сложности
function fillLavelsConteiner(node) {
  const levetsLabel = createDomNode(node, 'legend', 'levels--label');
  levetsLabel.textContent = 'Levels of difficulty:';
  node.append(levetsLabel);
  // levelsContainer.append(createDomNode(levelsContainer, 'legend', 'levels--label').textContent('Levels of difficulty'));

  for(let i = 0; i < levelsArray.length; i+=1) {
    const levelInputElement = createDomNode(node, 'input', 'level--input');
    levelInputElement.value = levelsArray[i];
    levelInputElement.setAttribute('type', 'radio');
    levelInputElement.setAttribute('name', 'levelOfDifficulty');
    levelInputElement.setAttribute('id', levelsArray[i]);
    if(i === 0)levelInputElement.setAttribute('checked', true);

    const levelLabelElement = createDomNode(node, 'label', 'level--label');
    levelLabelElement.setAttribute('for', levelsArray[i]);
    levelLabelElement.textContent = levelsArray[i];

    node.append(levelInputElement);
    node.append(levelLabelElement);
  }
}
// добавляем клавиатуру
function fillKeyboardConteiner(node) {
  
  for(let i = 0; i < numbers.length; i+=1) {
    const key = createDomNode(node, 'button', 'key keyboardContainer--numbers visible key--' + numbers[i]);
    key.setAttribute('value', numbers[i]);
    key.textContent = numbers[i];
    node.append(key);
  }

  for(let i = 0; i < letters.length; i+=1) {
    const key = createDomNode(node, 'button', 'key keyboardContainer--letter key--' + letters[i]);
    key.setAttribute('value', letters[i]);
    key.textContent = letters[i];
    node.append(key);
  }
};
export {letters, lettersKirilik, numbers, levelsArray};
// console.log(numbers.length)