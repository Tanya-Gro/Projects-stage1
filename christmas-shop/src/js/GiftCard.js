// import girtCards from "./gifts.json" with { type: "json"};
import { Modal } from "./Modal.js";

export class GiftCard {
  constructor({ name, description, category, superpowers }, path) {
    // this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.superpowers = superpowers;
    this.path = path;
  }

  // gift generator
  generateGift() {
    let template = '';
    // let path = './src/accets/png/';
    let gift__content = document.createElement('div');
    gift__content.className = 'gift__content';
    gift__content.setAttribute("data-description", this.description);

    this.superpowers.live &&
      (gift__content.setAttribute("data-live", this.superpowers.live))
    this.superpowers.create &&
      (gift__content.setAttribute("data-create", this.superpowers.create))
    this.superpowers.love &&
      (gift__content.setAttribute("data-love", this.superpowers.love))
    this.superpowers.dream &&
      (gift__content.setAttribute("data-dream", this.superpowers.dream))

    if (this.category) {

      // if (this.category === "For Health") template += `<img src="${path}gift-for-health.png"   alt="gift for health" class="gift__image"><div class="gift__description"> <h5 class="h5--green">${this.category}</h5>`;

      // else if (this.category === "For Harmony") template += `<img src="${path}gift-for-harmony.png" alt="gift for harmony" class="gift__image"><div class="gift__description"> <h5 class="h5--pink">${this.category}</h5>`;

      // else template += `<img src="${path}gift-for-work.png" alt="gift for work" class="gift__image"><div class="gift__description"> <h5 class="h5--blue">${this.category}</h5>`;
      let alt, h5class = '';
      if (this.category === "For Health") {
        this.path += 'gift-for-health.png';
        alt = 'gift for health';
        h5class = 'h5--green';
      }
      else if (this.category === "For Harmony") {
        this.path += 'gift-for-harmony.png';
        alt = 'gift for harmony';
        h5class = 'h5--pink';
      }
      else {
        this.path += 'gift-for-work.png';
        alt = 'gift for work';
        h5class = 'h5--blue';
      }
      template += `<img src="${this.path}" alt="${alt}" class="gift__image"><div class="gift__description"> <h5 class="${h5class}">${this.category}</h5>`;

      this.name &&
        (template += ` <h4>${this.name}</h4>`)

      template += '  </div>';
    }

    // добавдяем ивент
    gift__content.addEventListener('click', () => new Modal({
      'path': this.path,
      'name': this.name,
      'description': this.description,
      'category': this.category,
      'live': this.superpowers.live,
      'create': this.superpowers.create,
      'love': this.superpowers.love,
      'dream': this.superpowers.dream
    }).generateModal())

    gift__content.innerHTML = template;
    return gift__content;
  }
}