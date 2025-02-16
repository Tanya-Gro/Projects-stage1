import girtBanch from "./gifts.json" with { type: "json"};
import { GiftCard } from "./src/js/GiftCard.js";
import { openBurger } from "./src/js/Burger.js";

const timerDays = document.querySelector('.h3-days');
const timerHours = document.querySelector('.h3-hours');
const timerMinutes = document.querySelector('.h3-minutes');
const timerSeconds = document.querySelector('.h3-seconds');

let time = Math.floor((Date.parse('31 Dec ' + new Date().getFullYear() + ' 23: 59: 59 GMT+0') - Date.now()) / 1000);
let days, hours, minutes, remainder = 0;

let sliderPosition;
let sliderStep;
let sliderWidthR;

const slider = document.querySelector('.slider__content');
const sliderLeftBtn = document.querySelector('.burron__left');
const sliderRightBtn = document.querySelector('.burron__right');

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
  document.querySelector('.burger').addEventListener('click', () => {
    // console.log(e.target);
    // if (document.querySelector('.burger').classList.contains('active'))
    //   openBurger('close');
    // else 
    openBurger();
  });

  document.querySelector('.header__navigation').addEventListener("click", (event) => {
    // console.log(event.target.classList.value, 1);
    if (document.body.classList.contains("nonescroll") || event.target.classList.value === 'burger active' || event.target.classList.value === 'burger__line') openBurger('close');
  });

  // slider
  if (window.innerWidth > 1080) sliderPosition = 65;
  else sliderPosition = -11;

  // sliderWidthR = 2040 - window.innerWidth + sliderPosition;

  // if (window.innerWidth > 768) sliderStep = Math.ceil(sliderWidthR / 3);
  // else sliderStep = Math.ceil(sliderWidthR / 6);


  // console.log('position:', sliderPosition, 'width:', sliderWidthR, 'step:', sliderStep)

  // move slider on left
  sliderLeftBtn.addEventListener('click', () => {
    if (sliderLeftBtn.classList.contains('button__arrow_active')) {

      sliderPosition += sliderStep;
      slider.style.left = sliderPosition + 'px';
      sliderWidthR += sliderStep;

      if (sliderPosition > -12) {
        sliderLeftBtn.classList.remove('button__arrow_active');
        window.removeEventListener('resize', eventResizeByActionSlider);
      }

      if (!sliderRightBtn.classList.contains('button__arrow_active') && sliderWidthR > 0) sliderRightBtn.classList.add('button__arrow_active');
    }
    // console.log('LEFT position:', sliderPosition, 'width:', sliderWidthR, 'step:', sliderStep)
  });

  // move slider on RIGHT
  sliderRightBtn.addEventListener('click', () => {
    if (sliderRightBtn.classList.contains('button__arrow_active')) {

      if (!sliderLeftBtn.classList.contains('button__arrow_active') && (sliderPosition === 65 || sliderPosition === -11)) {
        sliderLeftBtn.classList.add('button__arrow_active');

        if (window.innerWidth > 1080) sliderPosition = 65;
        else sliderPosition = -11;

        // slider.style.left = sliderPosition + 'px';

        sliderWidthR = 2040 - window.innerWidth + sliderPosition;

        if (window.innerWidth > 768) sliderStep = Math.ceil(sliderWidthR / 3);
        else sliderStep = Math.ceil(sliderWidthR / 6);

        window.addEventListener('resize', eventResizeByActionSlider);
      }

      sliderPosition -= sliderStep;
      slider.style.left = sliderPosition + 'px';
      sliderWidthR -= sliderStep;

      if (sliderWidthR <= 0) sliderRightBtn.classList.remove('button__arrow_active');

    }
    // console.log('RIGHT position:', sliderPosition, 'width:', sliderWidthR, 'step:', sliderStep)
  });
}

const eventResizeByActionSlider = () => {
  // console.log('resizing action')
  // if (document.body.classList.contains("nonescroll") && window.innerWidth > 768) openBurger();

  if (window.innerWidth > 1080) sliderPosition = 65;
  else sliderPosition = -11;

  slider.style.left = sliderPosition + 'px';
  // console.log(window.innerWidth, sliderPosition)
  // sliderWidthR = 2040 - window.innerWidth + sliderPosition;

  if (sliderLeftBtn.classList.contains('button__arrow_active')) sliderLeftBtn.classList.remove('button__arrow_active');
  if (!sliderRightBtn.classList.contains('button__arrow_active')) sliderRightBtn.classList.add('button__arrow_active');

  window.removeEventListener('resize', eventResizeByActionSlider);

  // console.log('Resizing position:', sliderPosition, 'width:', sliderWidthR, 'step:', sliderStep)
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

