import nonograms_data from './data.json' with { type: 'json' }

// console.log(nonograms_data);
const namesSmallNonograms = nonograms_data.small;
const namesMediumNonograms = nonograms_data.medium;
const namesLargeNonograms = nonograms_data.large;

// console.log(namesSmallNonograms, namesMediumNonograms, namesLargeNonograms);
class SetNonogramm {
  constructor (level = 'small', numberNonogramm = 0) {
    this.level = level;
    this.numberNonogramm = numberNonogramm;
    this.nonogrammName = nonograms_data[this.level][this.numberNonogramm];
    this.nanoramData = nonograms_data[this.nonogrammName];
    this.rows = this.generateRows();
    this.colums = this.generateCollums();
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
}

export {namesSmallNonograms, namesMediumNonograms, namesLargeNonograms, SetNonogramm};