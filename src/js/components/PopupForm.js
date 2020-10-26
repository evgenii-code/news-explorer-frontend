import Form from './Form';

export default class PopupForm extends Form {
  constructor({
    selector, config, errorMessages, submitHandler, choiceClickHandler,
  }) {
    super({
      selector, config, errorMessages, submitHandler,
    });

    this._choiceButton = this._element.querySelector(this._config.choiceButton);
    this._choiceClickHandler = choiceClickHandler.bind(this);
  }

  setListeners() {
    super.setListeners();

    this._choiceButton.addEventListener('click', this._choiceClickHandler);
  }
}
