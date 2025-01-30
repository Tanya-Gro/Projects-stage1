import {InitialElement} from "./initial-class.js";
import {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm} from "./generate-nonograms.js";

// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
const bodyElement = document.querySelector("body");

const headerBlockElement = new InitialElement(bodyElement, "header", "header-container wrapper").returnChild();
const headerLogoElement = new InitialElement(headerBlockElement, "img", "header-container wrapper").returnChild();
headerLogoElement.setAttribute('src', './assets/favicon.ico');
const headerTextElement = new InitialElement(headerBlockElement, "h1", "header-container wrapper").returnChild();
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
//todo: timer---------------------------------------------------------------------------------------------------
// nonogram-----------------------------------------------------------------------------------------------------
const nanogramElement = new InitialElement(bodyElement, "main", "nanogram wrapper").returnChild();
// console.log(nanogramElement);
//options ------------------------------------------------------------------------------------------------------
const optionsElement = new InitialElement(nanogramElement, "div", "options wrapper");
// const wrapperElement = new InitialElement(bodyElement, "div", "wrapper light");

function getNanogram (nonogram_levet = 'small', value = 0) {
  const nanogramElement = new InitialElement(nanogramElement, "main", "nanogram wrapper").returnChild();
}

console.log(new SetNonogramm().returnResult());
// console.log(new SetNonogramm('small', 0).returnResult());