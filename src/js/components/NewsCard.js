import BaseComponent from './BaseComponent';

export default class NewsCard extends BaseComponent {
  // Класс карточки новости
  constructor({
    selectors, element, handlers, content, dateFormatter,
  }) {
    super({ element, handlers });
    this._content = content;
    this._selectors = selectors;
    this._title = this._element.querySelector(this._selectors.title);
    this._address = this._element.querySelector(this._selectors.address);
    this._publishedAt = this._element.querySelector(this._selectors.publishedAt);
    this._description = this._element.querySelector(this._selectors.description);
    this._urlToImage = this._element.querySelector(this._selectors.urlToImage);
    this._dateFormatter = dateFormatter;
  }

  create() {
    this._title.textContent = this._content.title;
    this._address.textContent = this._content.source.name;
    this._publishedAt.textContent = this._dateFormatter(this._content.publishedAt);
    this._description.textContent = this._content.description;
    this._urlToImage.src = this._content.urlToImage;
    return this._element;
  }

  // renderIcon(){
  // // отвечает за отрисовку иконки карточки.
  // // У этой иконки три состояния:
  // // - иконка незалогиненного пользователя,
  // // - активная иконка залогиненного,
  // // - неактивная иконка залогиненного
  // }
}
