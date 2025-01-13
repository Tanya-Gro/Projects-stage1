const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
const lettersKirilik = 'ЙЦУКЕНГШЩЗФЫВАПРОЛДЯЧСМИТЬ'.split('');
// const letters = [['A', 'Ф'],['B', 'И'],['C', 'С'],['D', 'В'],['E', 'У'],['F', 'А'],['G', 'П'],['H', 'Р'],['I', 'Ш'],['J', 'О'],['K', 'Л'],['L', 'Д'],['M', 'Ь'],['N', 'Т'],['O', 'Щ'],['P', 'З'],['Q', 'Й'],['R', 'К'],['S', 'Ы'],['T', 'Е'],['U', 'Г'],['V', 'М'],['W', 'Ц'],['Z', 'Я'],['Y', 'Н'],['Z', 'Я']];
const numbers = '0123456789'.split('');
// const numbers = [['0', ')'],['1', '!'],['2', '@'],['3', '#'],['4', '$'],['5', '%'],['6', '^'],['7', '&'],['8', '*'],['9', '(']];
//названия уровней д.б. уникальны
const levelsArray = ['Easy', 'Medium', 'Hard'];

// заполняем страницу
(function () {
  const bodyElement = document.querySelector('body');
  
  const navigationContainer = createDomNode(bodyElement, 'div', 'navigation');
  const levelsContainer = createDomNode(navigationContainer, 'div', 'levels');
  
  const roundsLabel = createDomNode(navigationContainer, 'p', 'roundsLabel');
  roundsLabel.textContent = 'Round: 0/5\n Try: 1/2';
  
  const buttonReStart = createDomNode(navigationContainer, 'button', 'button buttonReStart');
  buttonReStart.textContent = 'New game';
  
  const buttonRepeat = createDomNode(navigationContainer, 'button', 'button buttonRepeat');
  buttonRepeat.textContent = 'Repeat the sequence';

  const buttonStart = createDomNode(navigationContainer, 'button', 'button buttonStart active visible');
  buttonStart.textContent = 'Start';
  
  const outputContainer = createDomNode(bodyElement, 'div', 'output');
  const keyboardContainer = createDomNode(bodyElement, 'div', 'keyboard');
  
  bodyElement.append(navigationContainer);
  navigationContainer.append(levelsContainer);
  navigationContainer.append(roundsLabel);
  navigationContainer.append(buttonReStart);
  navigationContainer.append(buttonRepeat);
  navigationContainer.append(buttonStart);
  bodyElement.append(outputContainer);
  bodyElement.append(keyboardContainer);

  // добавляем уровни сложности
  fillLavelsConteiner(levelsContainer);
  // добавляем поле вывода
  outputContainer.append(createDomNode(outputContainer, 'p', 'outputContainer--p'))
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