import nonograms_data from './data.json' with { type: 'json' }
import {InitialElement} from "./initial-class.js";

// console.log(nonograms_data);
const namesSmallNonograms = nonograms_data.small;
const namesMediumNonograms = nonograms_data.medium;
const namesLargeNonograms = nonograms_data.large;

// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
class SetNonogramm {
  constructor (level = 'small', numberNonogramm = 0) {
    this.level = level;
    this.numberNonogramm = +numberNonogramm;
    this.nonogrammName = nonograms_data[this.level][this.numberNonogramm];
    this.nanoramData = nonograms_data[this.nonogrammName];
    this.rows = this.generateRows();
    this.colums = this.generateCollums();
    this.fillCollums();
    this.fillRows();
    this.fillBody();
  }
  generateRows() {
    const rows = new Array(this.nanoramData.length).fill(new Array());
    let count;
    for(let i = 0; i < this.nanoramData.length; i += 1) {
      rows[i] = new Array();
      count = 0;
      for(let j = 0; j < this.nanoramData[i].length; j += 1) {
        if(this.nanoramData[i][j] === 1) count += 1;
        if(this.nanoramData[i][j] === 0 && count !== 0) {
          // console.log(this.nanoramData[i][j], count !== 0, this.nanoramData[i][j] === 0 && count !== 0, i, j), 
          rows[i].push(count);
          count = 0;
        }
      }
      if(count !== 0) rows[i].push(count);
    }
    // console.log('rows: ', rows)
    return rows;
  }
  generateCollums() {
    const colums = new Array(this.nanoramData[0].length);
    let count = 0;
    for(let j = 0; j < this.nanoramData[0].length; j += 1) {
      colums[j] = new Array();
      count = 0;
      for(let i = 0; i< this.nanoramData.length; i += 1) {
        if(this.nanoramData[i][j] === 1) count += 1;
        if(this.nanoramData[i][j] === 0 && count !== 0) {
          colums[j].push(count);
          count = 0;
        }
      }
      if(count !== 0) colums[j].push(count);
    }
    // console.log("colums", colums);
    return colums;
  }
  returnResult() {
    return {"data": this.nanoramData,
      "rows":this.rows,
      "collums":this.colums,
    };
  }
  fillCollums(){
    console.log(this.colums);
    const columsContainerElement = document.querySelector('.nanogram--colums-container');
    columsContainerElement.innerHTML = '';
    for(let colum of this.colums) {
      const nonogramCollumsContainerElement = new InitialElement(columsContainerElement, "div", "nanogram--colum").returnChild();
      for(let item of colum) {
        const nonogramCollumSpanElement = new InitialElement(nonogramCollumsContainerElement, "span", "nanogram--header-column").returnChild();
        nonogramCollumSpanElement.textContent = item;
      }
    }
  }
  fillRows() {
    console.log(this.rows);
    const rowsContainerElement = document.querySelector('.nanogram--rows-container');
    rowsContainerElement.innerHTML = '';
    for(let row of this.rows) {
      const nonogramRowsContainerElement = new InitialElement(rowsContainerElement, "div", "nanogram--row").returnChild();
      for(let item of row) {
        const nonogramRowSpanElement = new InitialElement(nonogramRowsContainerElement, "span", "nanogram--header-row").returnChild();
        nonogramRowSpanElement.textContent = item;
      }
    }
  }
  fillBody() {
    console.log(this.nanoramData);
    const dataContainerElement = document.querySelector('.nanogram--body-container');
    dataContainerElement.innerHTML = '';
    dataContainerElement.style.gridTemplateColumns = `repeat(${this.nanoramData[0].length}, 1fr)`;
    for(let i = 0; i < this.nanoramData.length; i += 1) {
      // const nonogramDataContainerElement = new InitialElement(dataContainerElement, "div", "nanogram--row-data").returnChild();
      for(let j = 0; j < this.nanoramData[i].length; j += 1) {
        const nonogramDataButtonElement = new InitialElement(dataContainerElement, "button", "nanogram--row nanogram--column nanogram--data-button").returnChild();
        nonogramDataButtonElement.setAttribute('data-row', i);
        nonogramDataButtonElement.setAttribute('data-column', j);
      }
    }
  }
}

export {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm};