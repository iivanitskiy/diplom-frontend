class Popup {
  constructor(container) {
    this.container = container
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.container.querySelector('.popup__close').addEventListener('click', this.close)
  }
  open() {
    this.container.classList.add('popup_is-opened');
  }
  close() {
    this.container.classList.remove('popup_is-opened')
  }
}

export const popupSignIn = new Popup(document.querySelector('#popup-signIn'));
export const popupSignUp = new Popup(document.querySelector('#popup-signUp'));
export const popupSuccess = new Popup(document.querySelector('#popup-success'));

const popupRegistrationLink = document.querySelector('.popup__registration');
const popupEnterLink = document.querySelector('.popup__enter');
const popupEnterReg = document.querySelector('.popup__enter-reg');

popupRegistrationLink.addEventListener('click', function () {
  popupSignIn.close();
  popupSignUp.open();
});

popupEnterLink.addEventListener('click', function () {
  popupSignUp.close();
  popupSignIn.open();
});

popupEnterReg.addEventListener('click', function () {
  popupSuccess.close();
  popupSignIn.open();
});