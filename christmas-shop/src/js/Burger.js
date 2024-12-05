export function openBurger() {

  // console.log('burger action');
  document.querySelector('.burger').classList.toggle('active');

  document.body.classList.toggle('nonescroll');
  document.querySelector('.header__navigation').classList.toggle('active');
  document.querySelector('.navigation').classList.toggle('active');
}

// export function openBurger(action) {

//   console.log(action);

//   if (action === 'open') {
//     document.querySelector('.burger').classList.add('active');

//     document.body.classList.add('nonescroll');
//     document.querySelector('.header__navigation').classList.add('active');
//     document.querySelector('.navigation').classList.add('active');
//   } else if (action === "close") {
//     document.querySelector('.burger').classList.remove('active');

//     document.body.classList.remove('nonescroll');
//     document.querySelector('.header__navigation').classList.remove('active');
//     document.querySelector('.navigation').classList.remove('active');
//   }

// }