import { mainApi } from "./api";

export default class NewsCard {
  constructor(id, image, date, title, description, source, link, keyword) {
    this._id = id;
    this.image = image;
    this.date = date;
    this.title = title;
    this.description = description;
    this.source = source;
    this.link = link;
    this.keyword = keyword;
    this.savedId = null;
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
    const cardBookmarkBlock = document.createElement('div');
    cardBookmarkBlock.classList.add('card__bookmark_block');
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
    card.appendChild(cardBookmarkBlock);
    card.appendChild(cardBookmarkTip);

    cardBookmarkBlock.addEventListener('mouseover', function () {
      cardBookmarkTip.classList.add('card__bookmark-tip_show');
    });
    cardBookmarkBlock.addEventListener('mouseout', function () {
      cardBookmarkTip.classList.remove('card__bookmark-tip_show');
    });

    cardBookmark.addEventListener('click', this.createArticle(cardBookmarkImage));

  return card;
  }

  createArticle(e) {
    return () => {
      if (!e.classList.contains('card__bookmark-image_marked')) {
        mainApi.createArticle(this.keyword, this.title, this.description, this.date, this.source, this.link, this.image)
        .then(res => {
          if (res) {
            this.savedId = res.data._id
            e.classList.toggle('card__bookmark-image_marked')
          }
        })
      } else {
        mainApi.deleteArticle(this.savedId)
        .then(res => {
          if (res) {
            e.classList.toggle('card__bookmark-image_marked')
          }
        })
      }
    }
  }
}
