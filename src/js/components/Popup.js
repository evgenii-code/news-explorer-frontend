import ESC_KEYCODE from '../constants/key-codes';

export default class Popup {
  constructor({
    selector, config, toggleMenu,
  }) {
    this._config = config;
    this._parentContainer = document.querySelector(this._config.parentContainer);
    this._element = this._parentContainer.querySelector(selector)
      .content.cloneNode(true).firstElementChild;
    this._background = this._element.querySelector(this._config.background);
    this._contentContainerElement = this._element.querySelector(this._config.container);
    this._closeButton = this._element.querySelector(this._config.closeButton);
    this._choiceButton = this._element.querySelector(this._config.choiceButton);
    this._title = this._element.querySelector(this._config.title);
    this._toggleMenu = toggleMenu;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._handleEscUp = this._handleEscUp.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setContent(element, nextElement) {
  // вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации
    this._currentContentElement = element;
    this._nextContentElement = nextElement;
    this._contentContainerElement.append(element);
  }

  clearContent() {
  // очищает содержимое попапа
    this._contentContainerElement.innerHTML = '';
  }

  open() {
    this._toggleMenu();
    this._setHandlers();
    this._parentContainer.append(this._element);
  }

  close() {
    this._toggleMenu();
    this._removeHandlers();
    this._element.remove();
  }

  _closeButtonClickHandler(event) {
    // event.preventDefault(event);

    const { target } = event;

    if (target.classList.contains(this._config.backgroundClass)
    || target.classList.contains(this._config.closeButtonClass)) {
      this.close();
    }
  }

  _handleEscUp(event) {
    event.preventDefault();

    if (event.which === ESC_KEYCODE) this.close();
  }

  _setHandlers() {
    this._element.addEventListener('click', this._closeButtonClickHandler);
    document.addEventListener('keyup', this._handleEscUp);
  }

  _removeHandlers() {
    this._element.removeEventListener('click', this._closeButtonClickHandler);
    document.removeEventListener('keyup', this._handleEscUp);
  }
}
