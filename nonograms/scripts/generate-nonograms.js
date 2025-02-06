import nonograms_data from './data.json' with { type: 'json' }
import {InitialElement} from "./initial-class.js";


const namesSmallNonograms = nonograms_data.small;
const namesMediumNonograms = nonograms_data.medium;
const namesLargeNonograms = nonograms_data.large;

class SetNonogramm {
  constructor (level = 'small', numberNonogramm = 0, soundStatus = true) {
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
    this.soundStatus = soundStatus;
    this.soundSolution = new Audio('./assets/mp3/solution.mp3');
    this.soundFinal = new Audio('./assets/mp3/final.mp3');
    this.soundOn = new Audio('./assets/mp3/on.mp3');
    this.soundOff = new Audio('./assets/mp3/off.mp3');
    this.timerElement = document.querySelector('.nonogramTimer');
    this.timerElement.textContent = "00:00";
    this.saveButtonElement = document.querySelector('.option--button-save');
    this.resetButtonElement = document.querySelector('.options--button-reset');
    document.querySelector('.option--button-solution').disabled = false;
    this.timer;
    document.querySelector('.nonogramName').textContent = this.nonogrammName;
    this.resetButtonElement.disabled = true;
    this.saveButtonElement.disabled = true;
    this.isPauseByClicking = false;
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
      const nonogramDataRowElement = new InitialElement(dataContainerElement, "div", "nanogram--row").returnChild();
      for(let j = 0; j < this.nonogramData[i].length; j += 1) {
        const nonogramDataButtonElement = new InitialElement(nonogramDataRowElement, "button", "nanogram--column nanogram--data-button").returnChild();
        nonogramDataButtonElement.setAttribute('data-row', i);
        nonogramDataButtonElement.setAttribute('data-column', j);
      }
    }
    this.setButtonsEvent();
  }
  setButtonsEvent() {
    const nonogramDataElements = document.querySelectorAll('.nanogram--data-button');
    for(let button of nonogramDataElements) {
      // console.log(button);

      button.addEventListener('click', (e) => this.byClickCell(e, 'left'));
      button.addEventListener('contextmenu', (e) => this.byClickCell(e, 'right'));
      // this.leftClick = (e) => this.byClickCell(e, 'left');
      // this.rightClick = (e) => this.byClickCell(e, 'right');
      // button.addEventListener('click', this.leftClick);
      // button.addEventListener('contextmenu', this.rightClick);
    }
  }
  pauseTimer(){
    if (this.timerElement.classList.contains('enable')){
      clearInterval(this.timer);
      this.timerElement.classList.remove('enable');
    }
  }
  resetTimer(){
    if (this.timerElement.classList.contains('enable')){
      this.saveButtonElement.disabled = true;
      clearInterval(this.timer);
      this.timerElement.classList.remove('enable');
    }
    this.timerElement.textContent = '00:00';
  }
  updateTimet(sec) {
    this.timerElement.textContent = `${Math.floor(sec / 60).toString().padStart(2,'0')}:${(sec % 60).toString().padStart(2,'0')}`
  }
  getTimeInSeconds(timeInString) {
    const time = timeInString.split(':').map((item)=> item = Number(item));
    return time[0] * 60 + time[1];
  }
  startTimer() {
    let sec = this.getTimeInSeconds(this.timerElement.textContent);
    if (!this.timerElement.classList.contains('enable')) this.timerElement.classList.add('enable');
    this.timer = setInterval(() => {
      sec += 1;
      this.updateTimet(sec);
    },1000);
  }
  byClickCell(e, mouseButton){
    // проверка: заблокирован ввод?
    if (this.isPauseByClicking) return;

    const buttonElement = e.target;

    if (!this.timerElement.classList.contains('enable')){
      this.saveButtonElement.disabled = false;
      this.resetButtonElement.disabled = false;
      this.startTimer();
    }
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
  }
  checkResult() {
    // console.log(this.nonogramData, this.inputData)
    for(let i = 0; i < this.nonogramData.length; i += 1) {
      if (this.nonogramData[i].join('') !== this.inputData[i].join('').replaceAll('-1', '0')) return;
    }
    //сохраняем результат в localStorage
    let scoreResult = [];
    if (localStorage.getItem('score')) scoreResult = JSON.parse(localStorage.getItem('score'));

    // console.log(scoreResult, [this.nonogrammName, this.level, getTimeInSeconds(this.timerElement.textContent)]);
    scoreResult.push([this.nonogrammName, this.level, this.getTimeInSeconds(this.timerElement.textContent).toString()]);
    if(scoreResult.length > 5) scoreResult.shift();
    // console.log(scoreResult);
    localStorage.setItem('score', JSON.stringify(scoreResult));
    // модалка
    if (this.soundStatus) this.soundFinal.play();
    document.querySelector(".modal-overlay").classList.add('active');
    const time = this.timerElement.textContent.split(':');
    const text = 'Great! You have solved nonogram in ';
    if(+time[0] > 0) text += `${+time[0]} min, `;
    document.querySelector(".modal--span.timer").textContent = `${text}${+time[1]} sec!`;
    this.resetNonogram();
  }
  resetNonogram(){
    this.resetTimer();

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
    // this.soundSolution.volume = 0.1;
    // if (this.soundStatus) this.soundSolution.play();

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