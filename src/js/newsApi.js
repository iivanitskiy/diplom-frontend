export default class NewsApi {
  constructor({ apiKey, pageSize }) {
    this.url = "http://newsapi.org/v2/everything?";
    this.apiKey = apiKey;
    this.pageSize = pageSize;
  }
  getNews(theme, time) {
    return fetch(`${this.url}q=${theme}&from=${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}&sortBy=publishedAt&pageSize=${this.pageSize}&apiKey=${this.apiKey}`)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })
  }
}