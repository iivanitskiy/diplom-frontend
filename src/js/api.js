const popupErrorUser = document.querySelector('.popup__error_user');
const popupErrorAuth = document.querySelector('.popup__error_auth');

export default class MainApi {
  constructor() {
  }

  signIn(email, password) {
    return fetch('https://newsexplorer.ga/api/signin', {
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
        return res.status;
      }
      if (res.status === 401) {
        popupErrorAuth.textContent = "Ошибка авторизации";
      }
    })
  }

  signUp(email, password, name) {
    return fetch('https://newsexplorer.ga/api/signup', {
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
        return res.json();
      }
      if (res.status === 409) {
        popupErrorUser.textContent = "Такой пользователь уже есть";
      }
    })
  }
  getUser() {
    return fetch('https://newsexplorer.ga/api/users/me', {
        credentials: 'include',
        method: 'GET',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
  }
  createArticle(keyword, title, text, date, source, link, image) {
    return fetch('https://newsexplorer.ga/api/articles', {
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
    return fetch('https://newsexplorer.ga/api/articles', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
  }
  deleteArticle(id) {
    return fetch(`https://newsexplorer.ga/api/articles/${id}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
  }
  signOut() {
    return fetch('https://newsexplorer.ga/api/logout', {
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

export const mainApi = new MainApi();