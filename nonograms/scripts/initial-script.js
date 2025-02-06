import {InitialElement} from "./initial-class.js";
import {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm} from "./generate-nonograms.js";
// console.log(new SetNonogramm().returnResult());
// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
const bodyElement = document.querySelector("body");
let objectNonogram;

const headerBlockElement = new InitialElement(bodyElement, "header", "header-container wrapper").returnChild();
const headerLogoElement = new InitialElement(headerBlockElement, "img", "header--logoImage").returnChild();
headerLogoElement.setAttribute('src', './assets/favicon.png');
headerLogoElement.setAttribute('alt', 'logo');
const headerTextElement = new InitialElement(headerBlockElement, "h1", "header--logoText").returnChild();
headerTextElement.textContent = "Nonograms"
// navigation ------------------------------------------------------------------------------------------------
const navigationBlockElement = new InitialElement(bodyElement, "nav", "navigation-container wrapper").returnChild();
const navigationElement = new InitialElement(navigationBlockElement, "ul", "navigation--main").returnChild();

const navigationItemSmallElement = new InitialElement(navigationElement, "li", "navigation--main-item").returnChild();
navigationItemSmallElement.textContent = 'SMALL ∨';
// small submenu
const navigationSmallSubmenu = new InitialElement(navigationItemSmallElement, "ul", "navigation--small-list submenu").returnChild();
for (let i = 0; i < namesSmallNonograms.length; i+= 1) {
  let navigationSmallItem = new InitialElement(navigationSmallSubmenu, "li", "smallItem").returnChild();
  navigationSmallItem.textContent = namesSmallNonograms[i];
  navigationSmallItem.addEventListener('click',  () => {
    if (timerElement.classList.contains('enable')){
      objectNonogram.resetTimer();
    }
    objectNonogram = new SetNonogramm('small', i, optionsSoundButtonElement.dataset.value === 'unmute');
  });
}

navigationItemSmallElement.addEventListener('click', () => {
  navigationSmallSubmenu.classList.toggle('visible');
  if (navigationSmallSubmenu.classList.contains('visible') && navigationMediumSubmenu.classList.contains('visible'))
    navigationMediumSubmenu.classList.toggle('visible');
  
  if (navigationSmallSubmenu.classList.contains('visible') && navigationLargeSubmenu.classList.contains('visible'))
    navigationLargeSubmenu.classList.toggle('visible');
  }
);

const navigationItemMediumElement = new InitialElement(navigationElement, "li", "navigation--main-item").returnChild();
navigationItemMediumElement.textContent = 'MEDIUM ∨';
// medium submenu
const navigationMediumSubmenu = new InitialElement(navigationItemMediumElement, "ul", "navigation--medium-list submenu").returnChild();
for (let i = 0; i < namesMediumNonograms.length; i+= 1) {
  let navigationMediumElement = new InitialElement(navigationMediumSubmenu, "li", "mediumItem").returnChild();
  navigationMediumElement.textContent = namesMediumNonograms[i];
  navigationMediumElement.addEventListener('click',  () => {
    if (timerElement.classList.contains('enable')){
      objectNonogram.resetTimer();
    }
    objectNonogram = new SetNonogramm('medium', i, optionsSoundButtonElement.dataset.value === 'unmute')
  });
}

navigationItemMediumElement.addEventListener('click', () => {
  navigationMediumSubmenu.classList.toggle('visible');
  if (navigationSmallSubmenu.classList.contains('visible') && navigationMediumSubmenu.classList.contains('visible'))
    navigationSmallSubmenu.classList.toggle('visible');
  if (navigationLargeSubmenu.classList.contains('visible') && navigationMediumSubmenu.classList.contains('visible'))
    navigationLargeSubmenu.classList.toggle('visible');
  }
);

const navigationItemLargeElement = new InitialElement(navigationElement, "li", "navigation--main-item").returnChild();
navigationItemLargeElement.textContent = 'LARGE ∨';
// large submenu
const navigationLargeSubmenu = new InitialElement(navigationItemLargeElement, "ul", "navigation--large-list submenu").returnChild();
for (let i = 0; i < namesLargeNonograms.length; i+= 1) {
  let navigationLargeItem = new InitialElement(navigationLargeSubmenu, "li", "largeItem").returnChild();
  navigationLargeItem.textContent = namesLargeNonograms[i];

  navigationLargeItem.addEventListener('click',  () => {
    if (timerElement.classList.contains('enable')){
      objectNonogram.resetTimer();
    }
    objectNonogram = new SetNonogramm('large', i, optionsSoundButtonElement.dataset.value === 'unmute')
  });
}
navigationItemLargeElement.addEventListener('click', () => {
  navigationLargeSubmenu.classList.toggle('visible');
  if (navigationSmallSubmenu.classList.contains('visible') && navigationLargeSubmenu.classList.contains('visible'))
    navigationSmallSubmenu.classList.toggle('visible');

  if (navigationMediumSubmenu.classList.contains('visible') && navigationLargeSubmenu.classList.contains('visible'))
    navigationMediumSubmenu.classList.toggle('visible');
  }
);

const navigationItemRandomElement = new InitialElement(navigationElement, "li", "navigation--main-item").returnChild();
navigationItemRandomElement.textContent = 'RANDOM';

navigationItemRandomElement.addEventListener('click',  () => {
  if (timerElement.classList.contains('enable')){
    objectNonogram.resetTimer();
  }

  if (navigationSmallSubmenu.classList.contains('visible'))
    navigationSmallSubmenu.classList.toggle('visible');
  if (navigationMediumSubmenu.classList.contains('visible'))
    navigationMediumSubmenu.classList.toggle('visible');
  if (navigationLargeSubmenu.classList.contains('visible'))
    navigationLargeSubmenu.classList.toggle('visible');

  const countSmallNonograms = namesSmallNonograms.length;
  const countMediumNonograms = namesMediumNonograms.length;
  const countLargeNonograms = namesLargeNonograms.length;
  const randomNumber = Math.floor(Math.random()*(countSmallNonograms + countMediumNonograms + countLargeNonograms))+1;
  // console.log(randomNumber)
  if (randomNumber <= countSmallNonograms) objectNonogram = new SetNonogramm('small', randomNumber - 1, optionsSoundButtonElement.dataset.value === 'unmute');
  else {
    if(randomNumber <= (countSmallNonograms + countMediumNonograms))
      objectNonogram = new SetNonogramm('medium', randomNumber - countSmallNonograms - 1, optionsSoundButtonElement.dataset.value === 'unmute');
      else objectNonogram = new SetNonogramm('large', randomNumber - countSmallNonograms - countMediumNonograms - 1, optionsSoundButtonElement.dataset.value === 'unmute')
  }
  // objectNonogram.returnResult();
});

// NONOGRAM ----------------------------------------------------------------------------------------------------
const nanogramElement = new InitialElement(bodyElement, "main", "nanogram wrapper").returnChild();
//todo: timer---------------------------------------------------------------------------------------------------
const informationBlockElement = new InitialElement(nanogramElement, "div", "information wrapper").returnChild();
const nonogramNameLabelElement = new InitialElement(informationBlockElement, "span", "timer nonogram-name-label").returnChild();
nonogramNameLabelElement.textContent = 'Nonogram`s name: ';
const nonogramNameElement = new InitialElement(informationBlockElement, "span", "timer nonogramName").returnChild();
const timerLabelElement = new InitialElement(informationBlockElement, "span", "timer timer-label").returnChild();
timerLabelElement.textContent = "Timer: "
const timerElement = new InitialElement(informationBlockElement, "span", "timer nonogramTimer").returnChild();
timerElement.textContent = '00:00';

//body nonogram ------------------------------------------------------------------------------------------------
const nonogramContainerElement = new InitialElement(nanogramElement, "div", "nanogram--wrapper").returnChild();
const nonogramCollumsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--colums-container").returnChild();
const nonogramRowsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--rows-container").returnChild();
const nonogramBodyElement = new InitialElement(nonogramContainerElement, "div", "nanogram--body-container").returnChild();

// options button group ----------------------------------------------------------------------------------------
const optionsGroupElement = new InitialElement(nanogramElement, "div", "options-group").returnChild();
const optionsResetButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item options--button-reset").returnChild();
optionsResetButtonElement.setAttribute('title','Press to restart');
optionsResetButtonElement.textContent = 'RESET';
optionsResetButtonElement.addEventListener('click', () => {
  objectNonogram.isPauseByClicking = false;
  optionsResetButtonElement.disabled = true;
  optionsSolutionButtonElement.disabled = false;
  if (objectNonogram.soundStatus) new Audio('./assets/mp3/reset.mp3').play();
  objectNonogram.resetNonogram();
  optionsSaveButtonElement.disabled = true;
});

const optionsSolutionButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item").returnChild();
optionsSolutionButtonElement.textContent = 'SOLUTION';
optionsSolutionButtonElement.setAttribute('title','Press to show the SOLUTION');
optionsSolutionButtonElement.addEventListener('click',  () => {
  optionsSaveButtonElement.disabled = true;
  optionsSolutionButtonElement.disabled = true;
  optionsResetButtonElement.disabled = false;
  objectNonogram.showSolution();
  objectNonogram.isPauseByClicking = true;
});

const optionsSaveButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item option--button-save").returnChild();
optionsSaveButtonElement.textContent = 'SAVE';
optionsSaveButtonElement.setAttribute('title','Press to save your progress');
optionsSaveButtonElement.addEventListener('click',  () => {
  if (objectNonogram.soundStatus) new Audio('./assets/mp3/off.mp3').play();
  objectNonogram.pauseTimer();
  let curentResult = objectNonogram.returnResult();
  curentResult.timer = timerElement.textContent;
  // console.log(curentResult)
  localStorage.setItem('lastgame', JSON.stringify(curentResult)); 
});

const optionsContinueButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item").returnChild();
optionsContinueButtonElement.textContent = 'CONTINUE';
optionsContinueButtonElement.setAttribute('title','Continue last game');
optionsContinueButtonElement.addEventListener('click',  () => {
  if (localStorage.getItem('lastgame')) {
    if (objectNonogram.soundStatus) new Audio('./assets/mp3/off.mp3').play();
    objectNonogram.isPauseByClicking = false;
    let curentResult = objectNonogram.returnResult();
    let savedResult = JSON.parse(localStorage.getItem('lastgame'));
    if (timerElement.classList.contains('enable')){
      objectNonogram.resetTimer();
    }
    if(curentResult.level !== savedResult.level || curentResult.nonogrammName !== savedResult.nonogrammName) 
      objectNonogram = new SetNonogramm(savedResult.level, savedResult.numberNonogramm, optionsSoundButtonElement.dataset.value === 'unmute');
    
    timerElement.textContent = savedResult.timer;
    objectNonogram.showSavigData(savedResult.input);
  }
  else {
    modalOverlayElement.classList.add('active');
    modalSpanElement.textContent= 'Enable to show last save data... Sorry!';
  }
});

const optionsScoreButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item").returnChild();
optionsScoreButtonElement.textContent = 'SCORE';
optionsScoreButtonElement.setAttribute('title','Click to see the score');
optionsScoreButtonElement.addEventListener('click',  () => {
  if (localStorage.getItem('score')) {
    if (objectNonogram.soundStatus) new Audio('./assets/mp3/off.mp3').play();
    // приостанавливаем
    if (timerElement.classList.contains('enable')){
      objectNonogram.pauseTimer();
    }
    
    // модалочка
    document.querySelector(".modal-overlay").classList.add('active');
    modalSpanElement.textContent = "HIGH SCORE";
    let scoreResult = JSON.parse(localStorage.getItem('score')).sort((a, b) =>a[2]-b[2]);
    // console.log(scoreResult);
    //проверяем есть ли нужное кол-во строк в modalScoreContainerElement
    const listItemsScoreElemtnts = document.querySelectorAll('.modal--score-row');
    modalScoreContainerElement.classList.remove('disable');
      
    // console.log(scoreResult, scoreResult.length, listItemsScoreElemtnts, listItemsScoreElemtnts.length);
    if (listItemsScoreElemtnts.length < scoreResult.length){
      for (let i = 0; i < scoreResult.length - listItemsScoreElemtnts.length; i += 1) {
        const modalScoreItemElement = new InitialElement(modalScoreContainerElement, "div", "modal--score-row").returnChild();
        const modalScoreItemNPPElement = new InitialElement(modalScoreItemElement, "span", "modal--score-item-npp modal--score-item").returnChild();
        modalScoreItemNPPElement.textContent = listItemsScoreElemtnts.length + 1 + i;
        new InitialElement(modalScoreItemElement, "span", "modal--score-item-nameNono modal--score-item");
        new InitialElement(modalScoreItemElement, "span", "modal--score-item-level modal--score-item");
        new InitialElement(modalScoreItemElement, "span", "modal--score-item-time modal--score-item");
      }
    }
    // обновляем данные
    const nameNonoElements = document.querySelectorAll('.modal--score-item-nameNono');
    nameNonoElements.forEach((nameNono, index) => nameNono.textContent = scoreResult[index][0]);
    const levelElements = document.querySelectorAll('.modal--score-item-level');
    levelElements.forEach((levelNono, index) => levelNono.textContent = scoreResult[index][1]);
    const nameTimesElements = document.querySelectorAll('.modal--score-item-time');
    nameTimesElements.forEach((timeNono, index) => timeNono.textContent = `${Math.floor(scoreResult[index][2]/60).toString().padStart(2,'0')}:${(scoreResult[index][2] % 60).toString().padStart(2,'0')}`);
  }
  else {
    modalOverlayElement.classList.add('active');
    modalSpanElement.textContent = 'You have to win at least once! Do it and come back.';
  }
});

const optionsGroupEffectsElement = new InitialElement(optionsGroupElement, "div", "options-group-effects").returnChild();
const optionsSoundButtonElement = new InitialElement(optionsGroupEffectsElement, "input", "options--button navigation--main-item options--button-sound").returnChild();
optionsSoundButtonElement.setAttribute('type', 'image');
optionsSoundButtonElement.setAttribute('data-value', 'unmute');
optionsSoundButtonElement.setAttribute('src', './assets/unmute.svg');
optionsSoundButtonElement.setAttribute('title', 'Audio: on');
optionsSoundButtonElement.addEventListener('click',  () => {
  if (optionsSoundButtonElement.dataset.value === 'unmute') {
    optionsSoundButtonElement.dataset.value = 'mute';
    optionsSoundButtonElement.setAttribute('src', './assets/mute.svg');
    optionsSoundButtonElement.setAttribute('title', 'Audio: off');
    objectNonogram.switchSoundEffects('off');
  } else {
    optionsSoundButtonElement.dataset.value = 'unmute';
    optionsSoundButtonElement.setAttribute('src', './assets/unmute.svg');
    optionsSoundButtonElement.setAttribute('title', 'Audio: on');
    objectNonogram.switchSoundEffects('on');
  }
});

const optionsThemeButtonElement = new InitialElement(optionsGroupEffectsElement, "input", "options--button navigation--main-item options--button-sound").returnChild();
optionsThemeButtonElement.setAttribute('type', 'image');
optionsThemeButtonElement.setAttribute('data-value', 'light');
optionsThemeButtonElement.setAttribute('title', 'Light theme');
optionsThemeButtonElement.setAttribute('src', './assets/light.svg');
optionsThemeButtonElement.addEventListener('click',  () => {
  if (optionsThemeButtonElement.dataset.value === 'light') {
    if (objectNonogram.soundStatus) new Audio('./assets/mp3/off.mp3').play();
    optionsThemeButtonElement.dataset.value = 'night';
    optionsThemeButtonElement.setAttribute('src', './assets/night.svg');
    optionsThemeButtonElement.setAttribute('title', 'Night theme');
    document.documentElement.style.setProperty('--primary-color', 'rgba(27, 44, 27, 1)');
    document.documentElement.style.setProperty('--text-color', 'rgba(210, 226, 210, 1)');
    document.documentElement.style.setProperty('--colored-cell', 'rgba(239, 242, 239, 1)');
    document.documentElement.style.setProperty('--bg-submenu', 'rgba(111, 140, 111, 1)');
  } else {
    if (objectNonogram.soundStatus) new Audio('./assets/mp3/on.mp3').play();
    optionsThemeButtonElement.dataset.value = 'light';
    optionsThemeButtonElement.setAttribute('title', 'Light theme');
    optionsThemeButtonElement.setAttribute('src', './assets/light.svg');
    document.documentElement.style.setProperty('--primary-color', 'rgba(239, 242, 239, 1)');
    document.documentElement.style.setProperty('--text-color', '#386C38');
    document.documentElement.style.setProperty('--font-color-dark', 'rgba(167.19, 203.45, 167.19, 0.4)');
    document.documentElement.style.setProperty('--font-color-light', 'rgba(113, 157, 113, 0.1)');
    document.documentElement.style.setProperty('--colored-cell', 'black');
    document.documentElement.style.setProperty('--bg-submenu', 'rgba(210, 226, 210, 1)');
  }
});

// modal window ------------------------------------------------------------------------------------------------
const modalOverlayElement = new InitialElement(bodyElement, "div", "modal-overlay").returnChild();
const modalElement = new InitialElement(modalOverlayElement, "div", "modal").returnChild();
const modalSpanElement = new InitialElement(modalElement, "span", "modal--span timer").returnChild();
modalSpanElement.textContent= 'Great! You have solved the nonogram!';
const modalScoreContainerElement = new InitialElement(modalElement, "div", "modal--score-container disable").returnChild();
const modalButtonElement = new InitialElement(modalElement, "button", "modal--button navigation--main-item").returnChild();
modalButtonElement.textContent = 'Ok';
modalButtonElement.addEventListener('click', () => {
  if (!modalScoreContainerElement.classList.contains('disable')) {
    modalScoreContainerElement.classList.add('disable');
    if (timerElement.classList.contains('enable')) {
      objectNonogram.startTimer();
    }
  } else optionsResetButtonElement.disabled = true;
  modalOverlayElement.classList.remove('active');
})
objectNonogram = new SetNonogramm();