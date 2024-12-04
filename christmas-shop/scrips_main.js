import girtBanch from "./gifts.json" with { type: "json"};
import { GiftCard } from "./src/js/GiftCard.js";
import { openBurger } from "./src/js/Burger.js";

const timerDays = document.querySelector('.h3-days');
const timerHours = document.querySelector('.h3-hours');
const timerMinutes = document.querySelector('.h3-minutes');
const timerSeconds = document.querySelector('.h3-seconds');

let time = Math.floor((Date.parse('31 Dec ' + new Date().getFullYear() + ' 23: 59: 59 GMT+0') - Date.now()) / 1000);
let days, hours, minutes, remainder = 0;

window.onload = function () {

  // gifts cards
  const giftsWrapper = document.querySelector('.gifts');
  const indexes = [];
  let randomID;

  for (let i = 0; i < 4; i += 1) {
    do {
      randomID = Math.floor(Math.random() * girtBanch.length);
    } while (indexes.includes(randomID));
    indexes.push(randomID);
    giftsWrapper.append(new GiftCard(girtBanch[randomID], './src/accets/png/').generateGift());
  }

  // timer
  days = Math.floor(time / 86400);
  timerDays.innerText = days;
  remainder = time % 86400;
  hours = Math.floor(remainder / 3600);
  timerHours.innerText = hours;
  remainder = remainder % 3600;
  minutes = Math.floor(remainder / 60);
  timerMinutes.innerText = minutes;
  timerSeconds.innerText = remainder % 60;

  //burger click ivent
  // const burger = document.querySelector('.burger');
  document.querySelector('.burger').addEventListener('click', () => openBurger());

  document.querySelector('.header__navigation').addEventListener("click", (event) => {
    // console.log(event.target.classList.value, 1);
    if (document.body.classList.value === "nonescroll" || event.target.classList.value === 'burger active' || event.target.classList.value === 'burger__line') openBurger();
  });

  window.addEventListener('resize', (e) => {
    if (document.body.classList.value === "nonescroll" && window.innerWidth > 768) openBurger();
  });

  // slider
  // шаг надо высчитать на 3 ед и на 6 ед
  let sliderStep = 135;
  let sliderWidthR = 540;
  let sliderPosition = 65;
  const slider = document.querySelector('.slider__content');
  const sliderLeftBtn = document.querySelector('.burron__left');
  const sliderRightBtn = document.querySelector('.burron__right');

  sliderLeftBtn.addEventListener('click', () => {
    if (sliderLeftBtn.classList.contains('button__arrow_active')) {
      sliderPosition += sliderStep;
      slider.style.left = sliderPosition + 'px';
      sliderWidthR += sliderStep;
      if (sliderWidthR == 540) sliderLeftBtn.classList.remove('button__arrow_active');
      if (!sliderRightBtn.classList.contains('button__arrow_active') && sliderWidthR > 0)
        sliderRightBtn.classList.add('button__arrow_active');
    }
    console.log(sliderPosition, sliderWidthR)
  });
  sliderRightBtn.addEventListener('click', () => {
    if (sliderRightBtn.classList.contains('button__arrow_active')) {
      sliderPosition -= sliderStep;
      slider.style.left = sliderPosition + 'px';
      sliderWidthR -= sliderStep;
      if (sliderWidthR == 0) sliderRightBtn.classList.remove('button__arrow_active');
      if (!sliderLeftBtn.classList.contains('button__arrow_active') && sliderWidthR < 540)
        sliderLeftBtn.classList.add('button__arrow_active');
    }
    console.log(sliderPosition, sliderWidthR)
  });
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

