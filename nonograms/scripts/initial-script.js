import {InitialElement} from "./initial-class.js";
import {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm} from "./generate-nonograms.js";
// console.log(new SetNonogramm().returnResult());
// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
const bodyElement = document.querySelector("body");
let objectNonogram;

const headerBlockElement = new InitialElement(bodyElement, "header", "header-container wrapper").returnChild();
const headerLogoElement = new InitialElement(headerBlockElement, "img", "header--logoImage").returnChild();
headerLogoElement.setAttribute('src', './assets/favicon.ico');
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
  navigationSmallItem.addEventListener('click',  () => objectNonogram = new SetNonogramm('small', i).returnResult());
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
  navigationMediumElement.addEventListener('click',  () => objectNonogram = new SetNonogramm('medium', i).returnResult());
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
  navigationLargeItem.addEventListener('click',  () => objectNonogram = new SetNonogramm('large', i).returnResult());
}

navigationItemLargeElement.addEventListener('click', () => {
  navigationLargeSubmenu.classList.toggle('visible');
  if (navigationSmallSubmenu.classList.contains('visible') && navigationLargeSubmenu.classList.contains('visible'))
    navigationSmallSubmenu.classList.toggle('visible');

  if (navigationMediumSubmenu.classList.contains('visible') && navigationLargeSubmenu.classList.contains('visible'))
    navigationMediumSubmenu.classList.toggle('visible');
  }
);

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

// function getNanogram (nonogram_levet = 'small', value = 0) {
//   const nanogramElement = new InitialElement(nanogramElement, "main", "nanogram wrapper").returnChild();
// }

objectNonogram = new SetNonogramm().returnResult();
// console.log(new SetNonogramm('small', 0).returnResult());