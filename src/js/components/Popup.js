export default class Popup {
  constructor({
    selector, config, content, toggleMenu,
  }) {
    this._config = config;
    this._parentContainer = document.querySelector(this._config.parentContainer);
    this._element = this._parentContainer.querySelector(selector)
      .content.cloneNode(true).firstElementChild;
    this._contentContainerElement = this._element.querySelector(this._config.container);
    this._content = content;
    this._closeButton = this._element.querySelector(this._config.closeButton);
    this._choiceButton = this._element.querySelector(this._config.choiceButton);
    this._title = this._element.querySelector(this._config.title);
    this._toggleMenu = toggleMenu;
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._choiceClickHandler = this._choiceClickHandler.bind(this);
    this._setHandlers();
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  setContent(element) {
  // вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации
    this._contentContainerElement.append(element);
  }

  clearContent() {
  // очищает содержимое попапа
    this._contentContainerElement.innerHTML = '';
  }

  open() {
    this._setDefaultContent();

    this._toggleMenu();

    this._parentContainer.append(this._element);
  }

  close() {
    this._toggleMenu();

    this._element.remove();
  }

  _closeButtonClickHandler(event) {
    event.preventDefault(event);

    this.close();
  }

  _setDefaultContent() {
    this.clearContent();
    this.setContent(this._content.signinElement);
  }

  _choiceClickHandler(event) {
    event.preventDefault(event);

    const formType = this._contentContainerElement.querySelector(this._config.form)
      .dataset.contentType;

    this.clearContent();

    if (formType === 'signin') {
      this._title.textContent = this._config.signupTitle;
      this._choiceButton.textContent = this._config.signupChoiceText;
      this.setContent(this._content.signupElement);
    } else {
      this._title.textContent = this._config.signinTitle;
      this._choiceButton.textContent = this._config.signinChoiceText;
      this.setContent(this._content.signinElement);
    }
  }

  _setHandlers() {
    this._closeButton.addEventListener('click', this._closeButtonClickHandler);
    this._choiceButton.addEventListener('click', this._choiceClickHandler);
  }
}
