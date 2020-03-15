import { authorized } from '../../pages/index/index';
import { popupSignIn, popupSignUp, popupSuccess } from './popup';

const popupErrorUser = document.querySelector('.popup__error_user');
const popupErrorAuth = document.querySelector('.popup__error_auth');

export default class MainApi {
  constructor() {
  }

  signIn(email, password) {
    return fetch('http://www.newsexplorer.ga/api/signin', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => {
      if (res.ok) {
        authorized();
        popupSignIn.close();
      }
      if (res.status === 401) {
        popupErrorAuth.textContent = "Ошибка авторизации";
      }
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res}`);
    })
  }

  signUp(email, password, name) {
    return fetch('http://www.newsexplorer.ga/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    })
    .then(res => {
      if (res.ok) {
        popupSignUp.close();
        popupSuccess.open();
        return res.json();
      }
      if (res.status === 409) {
        popupErrorUser.textContent = "Такой пользователь уже есть";
      }
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  getUser() {
    return fetch('http://www.newsexplorer.ga/api/users/me', {
        credentials: 'include',
        method: 'GET',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  createArticle(keyword, title, text, date, source, link, image) {
    return fetch('http://www.newsexplorer.ga/api/articles', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      keyword: keyword,
      title: title,
      text: text,
      date: date,
      source: source,
      link: link,
      image: image,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  getArticles() {
    return fetch('http://www.newsexplorer.ga/api/articles', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  deleteArticle(id) {
    return fetch(`http://www.newsexplorer.ga/api/articles/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .catch((res) => {
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
  signOut() {
    return fetch('http://www.newsexplorer.ga/api/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      document.location.reload(true);
    })
  }
}