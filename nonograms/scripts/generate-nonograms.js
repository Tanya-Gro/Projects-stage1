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
    this.nonogramData = nonograms_data[this.nonogrammName];
    this.inputData = this.nonogramData.map(arr => arr.map(item => 0))
    this.rows = this.generateRows();
    this.colums = this.generateCollums();
    this.fillCollums();
    this.fillRows();
    this.fillBody();
    this.soundStatus = true;
    // this.soundOk = new Audio('./assets/mp3/ok.mp3');
    // this.soundCancel = new Audio('./assets/mp3/cancel.mp3');
    // this.soundClear = new Audio('./assets/mp3/clear.mp3');
    this.soundSolution = new Audio('./assets/mp3/solution.mp3');
    this.soundFinal = new Audio('./assets/mp3/final.mp3');
    this.soundOn = new Audio('./assets/mp3/on.mp3');
    this.soundOff = new Audio('./assets/mp3/off.mp3');
    this.soundReset = new Audio('./assets/mp3/reset.mp3');
    // console.log(this.nonogramData, this.rows,this.colums,this.inputData)
  }
  generateRows() {
    const rows = new Array(this.nonogramData.length).fill(new Array());
    let count;
    for(let i = 0; i < this.nonogramData.length; i += 1) {
      rows[i] = new Array();
      count = 0;
      for(let j = 0; j < this.nonogramData[i].length; j += 1) {
        if(this.nonogramData[i][j] === 1) count += 1;
        if(this.nonogramData[i][j] === 0 && count !== 0) {
          // console.log(this.nonogramData[i][j], count !== 0, this.nonogramData[i][j] === 0 && count !== 0, i, j), 
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
    const colums = new Array(this.nonogramData[0].length);
    let count = 0;
    for(let j = 0; j < this.nonogramData[0].length; j += 1) {
      colums[j] = new Array();
      count = 0;
      for(let i = 0; i< this.nonogramData.length; i += 1) {
        if(this.nonogramData[i][j] === 1) count += 1;
        if(this.nonogramData[i][j] === 0 && count !== 0) {
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
    return {
      "levet" : this.level,
      "nonogrammName" : this.nonogrammName,
      "numberNonogramm" : this.numberNonogramm,
      "data": this.nonogramData,
      // "rows":this.rows,
      // "collums":this.colums,
      "input": this.inputData,
    };
  }
  fillCollums(){
    // console.log(this.colums);
    const columsContainerElement = document.querySelector('.nanogram--colums-container');
    columsContainerElement.innerHTML = '';
    for(let colum of this.colums) {
      const nonogramCollumsContainerElement = new InitialElement(columsContainerElement, "div", "nanogram--column").returnChild();
      for(let item of colum) {
        const nonogramCollumSpanElement = new InitialElement(nonogramCollumsContainerElement, "span", "nanogram--header-column").returnChild();
        nonogramCollumSpanElement.textContent = item;
      }
    }
  }
  fillRows() {
    // console.log(this.rows);
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
    // console.log(this.nonogramData);
    const dataContainerElement = document.querySelector('.nanogram--body-container');
    dataContainerElement.innerHTML = '';
    for(let i = 0; i < this.nonogramData.length; i += 1) {
      // const nonogramDataContainerElement = new InitialElement(dataContainerElement, "div", "nanogram--row-data").returnChild();
      const nonogramDataRowElement = new InitialElement(dataContainerElement, "div", "nanogram--row").returnChild();
      for(let j = 0; j < this.nonogramData[i].length; j += 1) {
        const nonogramDataButtonElement = new InitialElement(nonogramDataRowElement, "button", "nanogram--column nanogram--data-button").returnChild();
        nonogramDataButtonElement.setAttribute('data-row', i);
        nonogramDataButtonElement.setAttribute('data-column', j);
        nonogramDataButtonElement.addEventListener('click', (e) => this.byClickCell(e, 'left'));
        nonogramDataButtonElement.addEventListener('contextmenu', (e) => this.byClickCell(e, 'right'));
      }
    }
  }
  byClickCell(e, mouseButton){
    // console.log(inputData,);
    const buttonElement = e.target;
    // console.log(e.target, this.inputData)
    // console.log(this.inputData)
    const row = +buttonElement.getAttribute('data-row');
    const coll = +buttonElement.getAttribute('data-column');
    switch(mouseButton){
      case 'left':
        if(this.inputData[row][coll] === 1) {
          buttonElement.classList.remove('button--colored');
          if (this.soundStatus) new Audio('./assets/mp3/cancel.mp3').play();
          this.inputData[row][coll] = 0;
        } else {
          buttonElement.classList.add('button--colored');
          this.inputData[row][coll] = 1;
          if (this.soundStatus)  new Audio('./assets/mp3/ok.mp3').play();
          buttonElement.textContent = '';
        }
        break;
      case 'right':
        if(this.inputData[row][coll] === -1){
          if (this.soundStatus) new Audio('./assets/mp3/cancel.mp3').play();
          buttonElement.textContent = '';
          this.inputData[row][coll] = 0;
        } else {
          if (buttonElement.classList.contains('button--colored')) buttonElement.classList.remove('button--colored');
          if (this.soundStatus) new Audio('./assets/mp3/clear.mp3').play();
          buttonElement.textContent = '×';
          this.inputData[row][coll] = -1;
        }
        e.preventDefault();
        break;
    }
    this.checkResult()
    // console.log(row, coll)
  }
  checkResult() {
    // console.log(this.nonogramData, this.inputData)
    for(let i = 0; i < this.nonogramData.length; i += 1) {
      if (this.nonogramData[i].join('') !== this.inputData[i].join('').replaceAll('-1', '0')) return;
    }
    if (this.soundStatus) this.soundFinal.play();
    document.querySelector(".modal-overlay").classList.add('active');
    // document.querySelector("modal--span timer").textContent = 'Great! You have solved the nonogram!';
    this.resetNonogram();
  }
  resetNonogram(){
    if (this.soundStatus) this.soundReset.play();
    this.inputData.forEach(element => {
      element.fill(0);
    });
    // console.log(this.inputData);
    const cellsNonogtamElements = document.querySelectorAll('.nanogram--data-button');
    cellsNonogtamElements.forEach((buttonElement => {
      buttonElement.textContent = '';
      if (buttonElement.classList.contains('button--colored')) buttonElement.classList.remove('button--colored');
      // buttonElement.style.backgroundColor = 'var(--primary-color)';
    }))
  };
  showSolution(showData){
    // todo: неактивность кноспи сохранения
    this.resetNonogram();
    this.soundSolution.volume = 0.1;
    if (this.soundStatus) this.soundSolution.play();

    // console.log(this.nonogramData);
    this.nonogramData.forEach((itemRow, indexRow)=> {
      const rowButtonsNonogram = document.querySelectorAll(`[data-row="${indexRow}"]`);
      itemRow.forEach((itemRowCol, indexColumn) => {
        // console.log('знач:', itemRowCol, 'стр:', indexRow, 'столб:', indexColumn)
        if (itemRowCol === 1) 
          rowButtonsNonogram.forEach(button => {
            if (button.dataset.column == indexColumn) button.classList.add('button--colored');
          });
      });
    });
  };
  showSavigData(savingData) {
    this.inputData = savingData;
    // console.log(this.inputData, savingData);
    this.soundSolution.volume = 0.1;
    if (this.soundStatus) this.soundSolution.play();

    savingData.forEach((itemRow, indexRow)=> {
      const rowButtonsNonogram = document.querySelectorAll(`[data-row="${indexRow}"]`);
      rowButtonsNonogram.forEach(button => {
        button.textContent = '';
        // console.log(itemRow[button.dataset.column], typeof itemRow[button.dataset.column])
        if(itemRow[button.dataset.column] === 1){
          if(!button.classList.contains('button--colored')) button.classList.add('button--colored');
        } else { 
          if(button.classList.contains('button--colored')) button.classList.remove('button--colored');
          if(itemRow[button.dataset.column] === -1) button.textContent = '×';
        }
      });
    });
  }
  switchSoundEffects(set){
    switch(set) {
      case 'on':
        this.soundOn.play();
        this.soundStatus = true;
        break;
      case 'off':
        this.soundOff.play();
        this.soundStatus = false;
        break;
    }
  }

}

export {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm};