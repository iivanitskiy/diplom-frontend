import { mainApi } from "./api";

export default class SavedNewsCard {
  constructor(id, image, date, title, description, source, link, keyword, reload) {
    this._id = id;
    this.image = image;
    this.date = date;
    this.title = title;
    this.description = description;
    this.source = source;
    this.link = link;
    this.keyword = keyword;
    this.reload = reload;
  }
  create() {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('card__image');
    cardImage.setAttribute('style', `background-image: url(${this.image})`);

    const cardDate = document.createElement('p');
    cardDate.classList.add('card__date');
    cardDate.textContent = new Date(this.date).toLocaleString("ru", { day: "numeric", year: 'numeric', month: "long" });

    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.classList.add('cardTitleContainer');

    const cardTitle = document.createElement('a');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = this.title;
    cardTitle.href = this.link;

    const cardDescription = document.createElement('h4');
    cardDescription.classList.add('card__text');
    cardDescription.textContent = this.description;

    const cardSource = document.createElement('p');
    cardSource.classList.add('card__source');
    cardSource.textContent = this.source;

    card.appendChild(cardImage);
    card.appendChild(cardDate);
    card.appendChild(cardTitleContainer);
    cardTitleContainer.appendChild(cardTitle);
    card.appendChild(cardDescription);
    card.appendChild(cardSource);

    const cardBookmark = document.createElement('button');
    cardBookmark.classList.add('card__bookmark');
    const cardBookmarkImage = document.createElement('span');
    cardBookmarkImage.classList.add('card__bookmark-image');
    cardBookmark.appendChild(cardBookmarkImage);
    const cardBookmarkTip = document.createElement('div');
    cardBookmarkTip.classList.add('card__bookmark-tip');
    const cardBookmarkText = document.createElement('p');
    cardBookmarkText.classList.add('card__bookmark-text');
    cardBookmarkText.textContent = "Войдите, чтобы сохранять статьи";
    cardBookmarkTip.appendChild(cardBookmarkText);

    card.appendChild(cardBookmark);
    card.appendChild(cardBookmarkTip);

    const keyword = document.createElement('div');
    keyword.classList.add('card__keyword');
    const keywordText = document.createElement('p');
    keywordText.classList.add('card__keyword-text');
    keywordText.textContent = this.keyword;
    keyword.appendChild(keywordText);
    card.appendChild(keyword);

    const cardDel = document.createElement('button');
    cardDel.classList.add('card__delete');
    const cardDelImage = document.createElement('span');
    cardDelImage.classList.add('card__delete-image');
    cardDel.appendChild(cardDelImage);
    card.appendChild(cardDel);
    cardDel.addEventListener('click', this.remove(this._id));

  return card;
  }
  remove() {
    return (event) => {
      mainApi.deleteArticle(this._id).then (()  => {
        this.reload();
      })
    }
  }
}