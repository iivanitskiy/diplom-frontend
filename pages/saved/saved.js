import "./saved.css";

import MainApi from "../../src/js/api";
import SavedCardList from "../../src/js/savedCardList";

const savedButtonImage = document.querySelector('.saved__button-image');
const container = document.querySelector('#container');

export const mainApi = new MainApi();
const savedNewsCardList = new SavedCardList(container);
const savedButtonText = document.querySelector('.saved__button-text');
const menuButtonImagePopup = document.querySelector('.menu__button-image_popup');
const menuButtonTextPopup = document.querySelector('.menu__button-text_popup');


savedButtonImage.addEventListener('click', function () {
  mainApi.signOut();
});

menuButtonImagePopup.addEventListener('click', function () {
  mainApi.signOut();
});

document.querySelector('.menu__close').addEventListener('click', function() {
  document.querySelector('.header__popup').classList.add('header__popup-opened');
});

document.querySelector('.header__popup_close').addEventListener('click', function() {
  document.querySelector('.header__popup').classList.remove('header__popup-opened');
});

function authorized() {
  mainApi.getUser().then((user) => {
    if (user) {
      savedButtonText.textContent = user.data.name;
      menuButtonTextPopup.textContent = user.data.name;
      menuButtonTextPopup.classList.add('menu__button-text_popup-disabled');
      menuButtonImagePopup.classList.add('menu__button-image_popup-show');
    }
    if (!user) {
      window.location.replace("/index.html");
    }
  })
}

window.addEventListener('load', authorized);
window.addEventListener('load', savedNewsCardList.render());