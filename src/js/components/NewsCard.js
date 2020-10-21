export default class NewsCard {
  // Класс карточки новости
  constructor({
    selector, config, content, dateFormatter, iconClickHandler,
  }) {
    this._element = document.querySelector(selector).content.cloneNode(true).firstElementChild;
    this._config = config;
    this._content = content;
    this._title = this._element.querySelector(this._config.title);
    this._address = this._element.querySelector(this._config.address);
    this._publishedAt = this._element.querySelector(this._config.publishedAt);
    this._dateFormatter = dateFormatter || ((date) => date);
    this._description = this._element.querySelector(this._config.description);
    this._urlToImage = this._element.querySelector(this._config.urlToImage);
    this._iconContainer = this._element.querySelector(this._config.iconContainer);
    this._icon = this._element.querySelector(this._config.icon);
    this._iconClickHandler = iconClickHandler.bind(this);
  }

  _addKeyword() {
    this._keyword = document.createElement('p');
    this._keyword.classList.add(this._config.keyword);
    this._keyword.textContent = 'Слово';
    this._element.prepend(this._keyword);
  }

  create() {
    this._title.textContent = this._content.title;
    this._address.textContent = this._content.source.name;
    this._publishedAt.textContent = this._dateFormatter(this._content.publishedAt);
    this._publishedAt.setAttribute('datetime', this._content.publishedAt.slice(0, 10));
    this._description.textContent = this._content.description;
    this._urlToImage.src = this._content.urlToImage;
    // this._addKeyword();

    this._setListeners();

    return this._element;
  }

  node() {
    // возвращает разметку элемента
    return this._element;
  }

  _setListeners() {
    this._icon.addEventListener('click', this._iconClickHandler);
  }

  _removeListeners() {
    this._icon.removeEventListener('click', this._iconClickHandler);
  }

  renderIcon({ isLoggedIn, marked }) {
    // отвечает за отрисовку иконки карточки.
    // У этой иконки три состояния:
    // - иконка незалогиненного пользователя,
    // - активная иконка залогиненного,
    // - неактивная иконка залогиненного

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
