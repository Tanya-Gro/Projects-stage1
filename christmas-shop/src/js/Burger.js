export function openBurger() {

  // console.log(111);
  document.querySelector('.burger').classList.toggle('active');

  document.body.classList.toggle('nonescroll');
  document.querySelector('.header__navigation').classList.toggle('active');
  document.querySelector('.navigation').classList.toggle('active');
}