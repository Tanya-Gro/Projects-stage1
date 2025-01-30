import {InitialElement} from "./initial-class.js";
import {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm} from "./generate-nonograms.js";
// console.log(new SetNonogramm().returnResult());

// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
const bodyElement = document.querySelector("body");

const headerBlockElement = new InitialElement(bodyElement, "header", "header-container wrapper").returnChild();
const headerLogoElement = new InitialElement(headerBlockElement, "img", "header--logoImage").returnChild();
headerLogoElement.setAttribute('src', './assets/favicon.ico');
const headerTextElement = new InitialElement(headerBlockElement, "h1", "header--logoText").returnChild();
headerTextElement.textContent = "Nonograms"
// navigation ------------------------------------------------------------------------------------------------
const navigationBlockElement = new InitialElement(bodyElement, "nav", "navigation-container wrapper").returnChild();
const navigationElement = new InitialElement(navigationBlockElement, "ul", "navigation--list").returnChild();

const navigationItemSmallElement = new InitialElement(navigationElement, "li", "navigation--item").returnChild();
navigationItemSmallElement.textContent = 'SMALL';
// todo : view context menu
navigationItemSmallElement.addEventListener('click', () => getNanogram('small', 0));

const navigationItemMediumElement = new InitialElement(navigationElement, "li", "navigation--item").returnChild();
navigationItemMediumElement.textContent = 'MEDIUM';
// todo : view context menu
navigationItemMediumElement.addEventListener('click', () => getNanogram('medium', 0));

const navigationItemLargeElement = new InitialElement(navigationElement, "li", "navigation--item").returnChild();
navigationItemLargeElement.textContent = 'LARGE';
// todo : view context menu
navigationItemLargeElement.addEventListener('click', () => getNanogram('large', 0));

// NONOGRAM ----------------------------------------------------------------------------------------------------
const nanogramElement = new InitialElement(bodyElement, "main", "nanogram wrapper").returnChild();
//todo: timer---------------------------------------------------------------------------------------------------
const timerBlockElement = new InitialElement(nanogramElement, "div", "timer-container wrapper").returnChild();
const timerElement = new InitialElement(timerBlockElement, "span", "timer").returnChild();
timerElement.textContent = '00:00';
// nonogram-----------------------------------------------------------------------------------------------------
// console.log(nanogramElement);
//body nonogram ------------------------------------------------------------------------------------------------
const nonogramContainerElement = new InitialElement(nanogramElement, "div", "nanogram--wrapper").returnChild();
const nonogramCollumsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--colums-container").returnChild();
const nonogramRowsElement = new InitialElement(nonogramContainerElement, "div", "nanogram--rows-container").returnChild();
const nonogramBodyElement = new InitialElement(nonogramContainerElement, "div", "nanogram--body-container").returnChild();
// const wrapperElement = new InitialElement(bodyElement, "div", "wrapper light");

function getNanogram (nonogram_levet = 'small', value = 0) {
  const nanogramElement = new InitialElement(nanogramElement, "main", "nanogram wrapper").returnChild();
}

let objectNonogram = new SetNonogramm('large', 2).returnResult();

// console.log(new SetNonogramm('small', 0).returnResult());