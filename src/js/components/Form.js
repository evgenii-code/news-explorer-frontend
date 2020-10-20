export default class Form {
  constructor({
    selector, config, errorMessages, submitHandler,
  }) {
    this._element = document.querySelector(selector);

    if (this._element.tagName === 'TEMPLATE') {
      this._element = this._element.content.cloneNode(true).firstElementChild;
    }

    this._config = config;
    this._errorMessages = errorMessages;

    this._inputs = Array.from(this._element.elements)
      .filter((element) => element.tagName === 'INPUT');

    this._submitButton = this._element.querySelector(this._config.submitButton);
    this._serverError = this._element.querySelector(this._config.serverError);
    this._submitHandler = submitHandler;
    this._setListeners();
  }

  node() {
    return this._element;
  }

  type() {
    return this._element.dataset.contentType;
  }

  setServerError(error) {
    // добавляет форме ошибку, пришедшую с сервера
    console.log(error);

    this._serverError.textContent = error.message;
  }

  _validateInputElement(input) {
    // валидирует переданный в качестве аргумента инпут;
    if (input.validity.valueMissing) {
      this._showInputError(input, this._errorMessages.valueMissing);
      return;
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      this._showInputError(input, this._errorMessages.tooShort);
      return;
    }
    if (input.validity.typeMismatch) {
      this._showInputError(input, this._errorMessages.typeMismatch);
      return;
    }

    this._hideInputError(input);
  }

  _showInputError(input, errorMessage) {
    const error = this._element.querySelector(`#${input.id}-error`);
    error.textContent = errorMessage;
  }

  _hideInputError(input) {
    const error = this._element.querySelector(`#${input.id}-error`);
    error.textContent = '';
  }

  _validateForm() {
    // валидирует всю форму;

    const isAllInputsValid = this._element.checkValidity();

    if (isAllInputsValid) {
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.setAttribute('disabled', true);
    }
  }

  _clear() {
    // вспомогательный метод, очищает поля формы;

    this._serverError.textContent = '';
    this._element.reset();
  }

  _getInfo() {
    return this._inputs.reduce((acc, input) => {
      const result = { ...acc };
      result[input.name] = input.value;
      return result;
    }, {});
  }

  _submitForm(event) {
    event.preventDefault();

    this._submitHandler(this._getInfo());

    this._clear();
  }

  _setListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateInputElement(input));
    });

    this._element.addEventListener('input', (event) => this._validateForm(event));
    this._element.addEventListener('submit', (event) => this._submitForm(event));
  }
}
