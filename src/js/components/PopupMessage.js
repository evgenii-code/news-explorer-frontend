export default class PopupMessage {
  constructor({
    selector, config, choiceClickHandler,
  }) {
    this._config = config;
    this._element = document.querySelector(selector).content.cloneNode(true).firstElementChild;
    this._choiceButton = this._element.querySelector(this._config.choiceButton);
    this._choiceClickHandler = choiceClickHandler.bind(this);
    this._setListeners();
  }

  node() {
    return this._element;
  }

  _setListeners() {
    this._choiceButton.addEventListener('click', this._choiceClickHandler);
  }
}
