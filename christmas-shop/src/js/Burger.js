export class Burger {
  constructor() {
    this.openBurger = '';
    this.closeBurger = '';

    this.overlay = '';
  }
  openBurger() {
    this.overlay = document.createElement('div');
    this.overlay.classList = 'overlay';
    this.overlay.addEventListener('click', (e) => this.closeBurger(e.target));

    //modify button close

    document.body.append(this.overlay);
    document.body.classList.add('nonescroll');


  }

  closeBurger(target) {
    if (target.classList == 'overlay' || target.classList == 'burger__close-btn') {
      document.body.classList.remove('nonescroll');
      this.overlay.remove();
    }
  }
}