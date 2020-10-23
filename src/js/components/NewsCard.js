export default class NewsCard {
  // Класс карточки новости
  constructor({
    selector, config, content, dateFormatter, iconClickHandler,
  }) {
    this._element = document.querySelector(selector).content.cloneNode(true).firstElementChild;
    this._config = config;
    this._content = content;
    this._cardId = this._content._id;
    this._title = this._element.querySelector(this._config.title);
    this._source = this._element.querySelector(this._config.source);
    this._date = this._element.querySelector(this._config.date);
    this._dateFormatter = dateFormatter || ((date) => date);
    this._text = this._element.querySelector(this._config.text);
    this._image = this._element.querySelector(this._config.image);
    this._iconContainer = this._element.querySelector(this._config.iconContainer);
    this._icon = this._element.querySelector(this._config.icon);
    this._iconClickHandler = iconClickHandler.bind(this);
  }

  _addKeyword() {
    this._keyword = document.createElement('p');
    this._keyword.classList.add(this._config.keyword);
    this._keyword.textContent = this._content.keyword;
    this._element.prepend(this._keyword);
  }

  create() {
    this._title.textContent = this._content.title;
    this._source.textContent = this._content.source;
    this._date.textContent = this._dateFormatter(this._content.date);
    this._date.setAttribute('datetime', this._content.date.slice(0, 10));
    this._text.textContent = this._content.text;
    if (this._content.image) this._image.src = this._content.image;
    this._image.alt = this._content.title;

    if (this._cardId) this._addKeyword();

    this._setListeners();

    return this._element;
  }

  node() {
    // возвращает разметку элемента
    return this._element;
  }

  id() {
    return this._cardId;
  }

  delete() {
    this._removeListeners();
    this._element.remove();
    this._element = null;
  }

  _setListeners() {
    this._icon.addEventListener('click', this._iconClickHandler);
  }

  _removeListeners() {
    this._icon.removeEventListener('click', this._iconClickHandler);
  }

  renderIcon({ isLoggedIn, marked, saved }) { // TODO - рефактор
    // отвечает за отрисовку иконки карточки.
    // У этой иконки три состояния:
    // - иконка незалогиненного пользователя,
    // - активная иконка залогиненного,
    // - неактивная иконка залогиненного
    if (saved) {
      return this._icon.classList.add(this._config.iconDelete);
    }

    if (isLoggedIn) {
      this._iconContainer.classList.remove(this._config.iconContainerUnauth);
      if (marked) {
        this._icon.classList.add(this._config.iconMarked);
        this._icon.classList.remove(this._config.iconUnmarked);
      } else {
        this._icon.classList.remove(this._config.iconMarked);
        this._icon.classList.add(this._config.iconUnmarked);
      }
    } else {
      this._iconContainer.classList.add(this._config.iconContainerUnauth);
    }
  }
}
