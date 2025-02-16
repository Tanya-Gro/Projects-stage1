import girtBanch from "./gifts.json" with { type: "json"};
import { GiftCard } from "./src/js/GiftCard.js";
import { openBurger } from "./src/js/Burger.js";

window.onload = function () {

  const giftsWrapper = document.querySelector('.gifts__conteiner');
  for (let i = 0; i < 36; i += 1) {
    giftsWrapper.append(new GiftCard(girtBanch[i], "../src/accets/png/").generateGift());
  }

  addTagsClickHandler();

  document.addEventListener('scroll', showButtonTop);

  //burger click ivent
  document.querySelector('.burger').addEventListener('click', () => openBurger());

  document.querySelector('.header__navigation').addEventListener("click", (event) => {
    // console.log(event.target.classList.value, 1);
    if (document.body.classList.value === "nonescroll" || event.target.classList.value === 'burger active' || event.target.classList.value === 'burger__line') openBurger();
  });

  // window.addEventListener('resize', (e) => {
  //   if (document.body.classList.value === "nonescroll" && window.innerWidth > 768) openBurger();
  // });


}

const addTagsClickHandler = () => {
  document.querySelector('.tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab')) {
      let clickedTab = e.target;

      removeSelecredTab();
      addSelecredTab(clickedTab);
      sortSelecredTab(clickedTab);
    }
  })
}

const removeSelecredTab = () => {
  const tab_enable = document.querySelector('.tab-enable');
  tab_enable.classList.remove('tab-enable');
  tab_enable.classList.add('tab-disable');
}

const addSelecredTab = clickedTab => {
  clickedTab.classList.remove('tab-disable');
  clickedTab.classList.add('tab-enable');
}

const sortSelecredTab = clickedTab => {
  const all_gifts = document.querySelectorAll('.gift__content');
  all_gifts.forEach(i => i.classList.remove('gift_disable'));

  if (clickedTab.innerText !== "all".toUpperCase()) {
    all_gifts.forEach(gift => {
      const gift_h5 = gift.querySelector('h5');
      if (gift_h5.innerHTML.toUpperCase() !== clickedTab.innerText.toUpperCase())
        gift.classList.add('gift_disable');
    })
  }
}

const showButtonTop = () => {
  window.scrollY >= 300 ?
    document.querySelector('.button__top').classList.add('button__top_visible') :
    document.querySelector('.button__top').classList.remove('button__top_visible');
}