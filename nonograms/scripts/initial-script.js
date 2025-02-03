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
    objectNonogram = new SetNonogramm('small', i);
    objectNonogram.returnResult();
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
    objectNonogram = new SetNonogramm('medium', i)
    objectNonogram.returnResult()
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
    objectNonogram = new SetNonogramm('large', i)
    objectNonogram.returnResult();
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
  const countSmallNonograms = namesSmallNonograms.length;
  const countMediumNonograms = namesMediumNonograms.length;
  const countLargeNonograms = namesLargeNonograms.length;
  const randomNumber = Math.floor(Math.random()*(countSmallNonograms + countMediumNonograms + countLargeNonograms))+1;
  console.log(randomNumber)
  if (randomNumber <= countSmallNonograms) objectNonogram = new SetNonogramm('small', randomNumber - 1);
  else {
    if(randomNumber <= (countSmallNonograms + countMediumNonograms))
      objectNonogram = new SetNonogramm('medium', randomNumber - countSmallNonograms - 1);
      else objectNonogram = new SetNonogramm('large', randomNumber - countSmallNonograms - countMediumNonograms - 1)
  }
  objectNonogram.returnResult();
});

// NONOGRAM ----------------------------------------------------------------------------------------------------
const nanogramElement = new InitialElement(bodyElement, "main", "nanogram wrapper").returnChild();
//todo: timer---------------------------------------------------------------------------------------------------
const timerBlockElement = new InitialElement(nanogramElement, "div", "timer-container wrapper").returnChild();
const timerElement = new InitialElement(timerBlockElement, "span", "timer").returnChild();
timerElement.textContent = '00:00';

//body nonogram ------------------------------------------------------------------------------------------------
const nonogramContainerElement = new InitialElement(nanogramElement, "div", "nanogram--wrapper").returnChild();
const nonogramCollumsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--colums-container").returnChild();
const nonogramRowsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--rows-container").returnChild();
const nonogramBodyElement = new InitialElement(nonogramContainerElement, "div", "nanogram--body-container").returnChild();
// const wrapperElement = new InitialElement(bodyElement, "div", "wrapper light");

// options button group ----------------------------------------------------------------------------------------
const optionsGroupElement = new InitialElement(nanogramElement, "div", "options-group").returnChild();
const optionsResetButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item").returnChild();
optionsResetButtonElement.textContent = 'RESET';
optionsResetButtonElement.addEventListener('click', () => objectNonogram.resetNonogram());

const optionsSolutionButtonElement = new InitialElement(optionsGroupElement, "button", "options--button navigation--main-item").returnChild();
optionsSolutionButtonElement.textContent = 'SOLUTION';
optionsSolutionButtonElement.addEventListener('click',  () => {
  objectNonogram.showSolution();
  // optionsSolutionButtonElement.disable = true;
});

const optionsSoundButtonElement = new InitialElement(optionsGroupElement, "input", "options--button navigation--main-item options--button-sound").returnChild();
// .setAttribute('src', './assets/favicon.png');
optionsSoundButtonElement.setAttribute('type', 'image');
optionsSoundButtonElement.setAttribute('data-value', 'unmute');
optionsSoundButtonElement.setAttribute('src', './assets/unmute.svg');
// optionsSoundButtonElement.style.backgroundImage = './assets/unmute.png';
// optionsSoundButtonElement.style.backgroundImage = 'url("./assets/unmute.png")';
optionsSoundButtonElement.addEventListener('click',  () => {
  if (optionsSoundButtonElement.dataset.value === 'unmute') {
    optionsSoundButtonElement.dataset.value = 'mute';
    optionsSoundButtonElement.setAttribute('src', './assets/mute.svg');
    objectNonogram.switchSoundEffects('off');
  } else {
    optionsSoundButtonElement.dataset.value = 'unmute';
    optionsSoundButtonElement.setAttribute('src', './assets/unmute.svg');
    objectNonogram.switchSoundEffects('on');
  }
});

// modal window ------------------------------------------------------------------------------------------------
const modalOverlayElement = new InitialElement(bodyElement, "div", "modal-overlay").returnChild();
const modalElement = new InitialElement(modalOverlayElement, "div", "modal").returnChild();
const modalSpanElement = new InitialElement(modalElement, "span", "modal--span timer").returnChild();
modalSpanElement.textContent= 'Great! You have solved the nonogram!';
const modalButtonElement = new InitialElement(modalElement, "button", "modal--button navigation--main-item").returnChild();
modalButtonElement.textContent = 'Ok';
modalButtonElement.addEventListener('click', () => {
  modalOverlayElement.classList.remove('active');
})
objectNonogram = new SetNonogramm();
objectNonogram.returnResult();
// console.log(new SetNonogramm('small', 0).returnResult());