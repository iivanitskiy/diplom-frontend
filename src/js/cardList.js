import NewsCard from "./card";
import { buttonMoreCards } from "../../pages/index/index";

export default class CardList {
  constructor(container) {
    this.container = container;
    this.articlesNumber = 0;
    this.count = 0;
  }
  addCard(id, image, date, title, description, source, link, keyword) {
    const card = new NewsCard(id, image, date, title, description, source, link, keyword).create();
    this.container.appendChild(card);
  }
  render(newCount, keyword) {
    this.cards.slice(this.count, newCount).forEach(card =>
      this.addCard(card.source.id, card.urlToImage, card.publishedAt, card.title, card.description, card.source.name, card.url, keyword));
      this.count = newCount;
  }
  renderResults(cards, keyword) {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.lastChild);
    }
    this.cards = cards;
    this.count = 0;
    this.render(3, keyword);
    buttonMoreCards.classList.add('more-cards_is-show');
  }
  readMore(keyword) {
    this.render(this.count +3, keyword);
    if (this.count > this.cards.length) {
      buttonMoreCards.classList.remove('more-cards_is-show');
    }
  }
}