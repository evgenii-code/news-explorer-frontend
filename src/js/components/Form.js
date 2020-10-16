import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor(...args) {
    super(...args);
    this._inputs = Array.from(this._element.elements)
      .filter((element) => element.tagName === 'INPUT');
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => this._validateInputElement({ input }));
    });
  }

  // setServerError() {
  //   // добавляет форме ошибку, пришедшую с сервера

  // }

  _validateInputElement({ input }) {
    // валидирует переданный в качестве аргумента инпут;
    console.log('Валидация');
  }

  // _validateForm() {
  //   // валидирует всю форму;

  // }

  // _clear() {
  //   // вспомогательный метод, очищает поля формы;

  // }

  // _getInfo() {
  //   // вспомогательный метод, возвращает данные формы.

  // }
}
