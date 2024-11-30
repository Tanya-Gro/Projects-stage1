const timerDays = document.querySelector('.h3-days');
const timerHours = document.querySelector('.h3-hours');
const timerMinutes = document.querySelector('.h3-minutes');
const timerSeconds = document.querySelector('.h3-seconds');
let time = Math.floor((Date.parse('31 Dec ' + new Date().getFullYear() + ' 23: 59: 59 GMT+0') - Date.now()) / 1000);
let days, hours, minutes, remainder = 0;

window.onload = function () {
  days = Math.floor(time / 86400);
  timerDays.innerText = days;
  remainder = time % 86400;
  hours = Math.floor(remainder / 3600);
  timerHours.innerText = hours;
  remainder = remainder % 3600;
  minutes = Math.floor(remainder / 60);
  timerMinutes.innerText = minutes;

  timerSeconds.innerText = remainder % 60;
}

const setTimer = () => {
  time = Math.floor((Date.parse('31 Dec ' + new Date().getFullYear() + ' 23: 59: 59 GMT+0') - Date.now()) / 1000);
  if (days !== Math.floor(time / 86400)) {
    days = Math.floor(time / 86400);
    timerDays.innerText = days;
  }
  remainder = time % 86400;
  if (hours !== Math.floor(remainder / 3600)) {
    hours = Math.floor(remainder / 3600);
    timerHours.innerText = hours;
  }
  remainder = remainder % 3600;
  if (minutes !== Math.floor(remainder / 60)) {
    minutes = Math.floor(remainder / 60);
    timerMinutes.innerText = minutes;
  }

  timerSeconds.innerText = remainder % 60;
  time -= 1;
}

setInterval(setTimer, 1000);

