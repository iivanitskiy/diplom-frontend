import "./index.css";
import MainApi from "../../src/js/api";
import NewsApi from "../../src/js/newsApi";
import CardList from "../../src/js/cardList";
import { popupSignIn } from "../../src/js/popup";
import { errorEmail, errorPass, errorRegEmail, errorRegPass, errorName } from "../../src/js/error";
import { NEWS_API_PARAMETERS, week } from "../../src/js/constants";

const popupErrorEmail = document.querySelector('.popup__error_email');
const popupErrorPass = document.querySelector('.popup__error_pass');
const popupRegErrorEmail = document.querySelector('.popup-reg__error_email');
const popupRegErrorPass = document.querySelector('.popup-reg__error_pass');
const popupErrorName = document.querySelector('.popup__error_name');

const popupButtonEnter = document.querySelector('.popup__button-enter');
const popupButtonReg = document.querySelector('.popup__button-reg');

const signInEmail = document.querySelector('#signIn-email');
const signInPassword = document.querySelector('#signIn-password');
const signInForm = document.forms.signin;
const signUpPassword = document.querySelector('#signUp-password');
const signUpEmail = document.querySelector('#signUp-email');
const signUpName = document.querySelector('#signUp-name');
const signUpForm = document.forms.signup;

const menuArticles = document.querySelector('.menu__articles');
const menuButtonText = document.querySelector('.menu__button-text');
const menuButtonTextPopup = document.querySelector('.menu__button-text_popup');
const menuButtonImage = document.querySelector('.menu__button-image');
const menuButtonImagePopup = document.querySelector('.menu__button-image_popup');

const searchForm = document.forms.search;
const searchInput = document.querySelector('.search__input');

export const buttonMoreCards = document.querySelector('.more-cards');
const container = document.querySelector('#container');

export const mainApi = new MainApi();
const newsApi = new NewsApi(NEWS_API_PARAMETERS);
const newsCardList = new CardList(container);

menuButtonText.addEventListener('click', function () {
  popupSignIn.open();
});

menuButtonTextPopup.addEventListener('click', function () {
  popupSignIn.open();
  document.querySelector('.header__popup').classList.remove('header__popup-opened');
});

menuButtonImage.addEventListener('click', function () {
  mainApi.signOut();
});

menuButtonImagePopup.addEventListener('click', function () {
  mainApi.signOut();
});

document.querySelector('.header__popup_close').addEventListener('click', function() {
  document.querySelector('.header__popup').classList.remove('header__popup-opened');
});

document.querySelector('.menu__close').addEventListener('click', function() {
  document.querySelector('.header__popup').classList.add('header__popup-opened');
});

signInForm.addEventListener('submit', function() {
  event.preventDefault();
  mainApi.signIn(signInEmail.value, signInPassword.value)
});

signInForm.addEventListener('input', function () {
  if (signInEmail.value.length < 1 || signInPassword.value.length <= 7) {
    popupButtonEnter.setAttribute('disabled', true);
  } else if (signInEmail.value.length > 200 || signInPassword.value.length > 30) {
    popupButtonEnter.setAttribute('disabled', true);
  } else if (signInEmail.validity.typeMismatch) {
    popupErrorEmail.textContent = 'Неправильный формат email',
    popupErrorEmail.style.visibility = 'visible';
    popupButtonEnter.setAttribute('disabled', true);
  } else if (signInPassword.validity.typeMismatch) {
    popupErrorPass.textContent = 'Неправильный формат пароля',
    popupErrorPass.style.visibility = 'visible';
    popupButtonEnter.setAttribute('disabled', true);
  } else {
    popupErrorEmail.style.visibility = 'hidden';
    popupErrorPass.style.visibility = 'hidden';
    popupButtonEnter.removeAttribute('disabled')
  }
});

errorEmail(signInForm, signInEmail, popupErrorEmail);
errorPass(signInForm, signInPassword, popupErrorPass);

signUpForm.addEventListener('submit', function() {
  event.preventDefault();
  mainApi.signUp(signUpEmail.value, signUpPassword.value, signUpName.value)
});

signUpForm.addEventListener('input', function () {
  if (signUpEmail.value.length < 1 || signUpPassword.value.length <= 7 || signUpName.value.length < 2) {
    popupButtonReg.setAttribute('disabled', true);
  } else if (signUpEmail.value.length > 200 || signUpPassword.value.length > 30) {
    popupButtonReg.setAttribute('disabled', true);
  } else if (signUpEmail.validity.typeMismatch) {
    popupRegErrorEmail.textContent = 'Неправильный формат email',
    popupRegErrorEmail.style.visibility = 'visible';
    popupButtonReg.setAttribute('disabled', true);
  } else if (signUpPassword.validity.typeMismatch) {
    popupRegErrorPass.textContent = 'Неправильный формат пароля',
    popupRegErrorPass.style.visibility = 'visible';
    popupButtonReg.setAttribute('disabled', true);
  } else if (signUpName.validity.typeMismatch) {
    popupRegErrorPass.textContent = 'Неправильный формат имени',
    popupRegErrorPass.style.visibility = 'visible';
    popupButtonReg.setAttribute('disabled', true);
  } else {
    popupRegErrorEmail.style.visibility = 'hidden';
    popupRegErrorPass.style.visibility = 'hidden';
    popupErrorName.style.visibility = 'hidden';
    popupButtonReg.removeAttribute('disabled')
  }
});

errorRegEmail(signUpForm, signUpEmail, popupRegErrorEmail);
errorRegPass(signUpForm, signUpPassword, popupRegErrorPass);
errorName(signUpForm, signUpName, popupErrorName);

searchForm.addEventListener('submit', function() {
  event.preventDefault();
  if (searchInput.value.length < 1) {
    searchInput.placeholder = "Нужно ввести ключевое слово";
  }
  const time = week;
  newsApi.getNews(searchInput.value, time)
    .then(res => {
      if (!res) {
        searchInput.placeholder = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
      }
      if (res.totalResults >= 1) {
        document.querySelector('.cards').classList.add('cards_show');
        document.querySelector('.load').classList.add('load_show');
      }
      if (res.totalResults < 1) {
        document.querySelector('.cards').classList.remove('cards_show');
      }
      if (res.totalResults == 0) {
        document.querySelector('.not-found').classList.add('not-found_show');
      }
      else if (res.totalResults >= 1) {
        document.querySelector('.not-found').classList.remove('not-found_show');
      }
      newsCardList.renderResults(res.articles, searchInput.value);
      document.querySelector('.load').classList.remove('load_show');
    })
});

buttonMoreCards.addEventListener('click', () => newsCardList.readMore(searchInput.value));

export function authorized() {
  mainApi.getUser().then((user) => {
    if (user) {
      container.classList.add('authorized');
      menuArticles.classList.add('menu__articles-show');
      menuButtonText.textContent = user.data.name;
      menuButtonText.classList.add('menu__button-text_disabled');
      menuButtonTextPopup.textContent = user.data.name;
      menuButtonTextPopup.classList.add('menu__button-text_popup-disabled');
      menuButtonImage.classList.add('menu__button-image_show');
      menuButtonImagePopup.classList.add('menu__button-image_popup-show');
    } else {
      container.classList.remove('authorized');
    }
  })
  .catch();
}

window.addEventListener('load', authorized);