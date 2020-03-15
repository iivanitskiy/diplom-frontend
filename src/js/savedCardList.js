import SavedNewsCard from './savedNewsCard';
import NewApi from "../../src/js/newApi";

const newApi = new NewApi();

let userName;

newApi.getUser().then((user) => {
  if (user) {
    userName = user.data.name
  };
});

export default class SavedCardList {
    constructor(container) {
      this.container = container;
    }
    addCard(id, image, date, title, description, source, link, keyword) {
      const card = new SavedNewsCard(id, image, date, title, description, source, link, keyword, this.render()).create();
      this.container.appendChild(card);
    }
    renderCards() {
      this.cards.slice().forEach(card =>
        this.addCard(card._id, card.image, card.date, card.title, card.text, card.source, card.link, card.keyword));
    }
    renderResults() {
      return (res) => {

        const keywords = res.data.map((item) => (item.keyword));

        const keywordsReduce = keywords.reduce(function(acc, cur) {
          if (!acc.hash[cur]) {
            acc.hash[cur] = { [cur]: 1 };
            acc.map.set(acc.hash[cur], 1);
            acc.result.push(acc.hash[cur]);
          } else {
            acc.hash[cur][cur] += 1;
            acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
          }
          return acc;
        }, {
          hash: {},
          map: new Map(),
          result: []
        });

        const keywordsSort = keywordsReduce.result.sort(function(a, b) {
          return keywordsReduce.map.get(b) - keywordsReduce.map.get(a);
        });

        const keywordsKeys = keywordsSort.map((keyword) => {
          return Object.keys(keyword)[0];
        })

        const info = document.querySelector('.savedTitle');
        const infoTitle = document.createElement('h2');
        infoTitle.classList.add('info__title');
        const infoSubtitle = document.createElement('p');
        infoSubtitle.classList.add('info__subtitle');
        infoSubtitle.textContent = "Сохранённые статьи";
        const infoKeyWords = document.createElement('p');
        infoKeyWords.classList.add('info__keywords');
        infoKeyWords.textContent = `По ключевым словам: ${keywordsKeys.va} и другим`;
        infoTitle.textContent = `${userName}, у вас ${res.data.length} сохранённых статей`;
        while (info.firstChild) {
          info.removeChild(info.lastChild);
        }

        switch (keywordsKeys.length) {
          case 0:
            infoKeyWords.textContent = `Нет ключевых слов`;
            break;
          case 1:
            infoKeyWords.textContent = `По ключевому слову ${keywordsKeys[0]}`;
            break;
          case 2:
            infoKeyWords.textContent = `Нет ключевых слов`;
            break;
          default:
            infoKeyWords.textContent = `По ключевому слову ${keywordsKeys.length - 2 }`;
            break;
        }

        info.appendChild(infoSubtitle);
        info.appendChild(infoTitle);
        info.appendChild(infoKeyWords);

        while (this.container.firstChild) {
          this.container.removeChild(this.container.lastChild);
        }
        this.cards = res.data;
        this.renderCards();
      }
    }
    render() {
      return () => {
        newApi.getArticles()
        .then(this.renderResults());
      }
    }
  }
