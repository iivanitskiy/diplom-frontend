export default class NewApi {
  constructor() {
  }
  getUser() {
    return fetch('https://www.newsexplorer.ga/api/users/me', {
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
  deleteArticle(id) {
    return fetch(`https://www.newsexplorer.ga/api/articles/${id}`, {
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
    return fetch('https://www.newsexplorer.ga/api/logout', {
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
  getArticles() {
    return fetch('https://www.newsexplorer.ga/api/articles', {
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
}