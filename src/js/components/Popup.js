import BaseComponent from './BaseComponent';

export default class Popup extends BaseComponent {
  constructor(...args) {
    super(...args);
    // this.selectors = selectors;
    // this.options = options;
    this._test = 'test';
  }

  // setContent() {
  // // вставляет в попап содержимое, например, форму входа или сообщение об успешной регистрации

  // }

  // clearContent() {
  // // очищает содержимое попапа

  // }

  open() {
    document.body.prepend(this._element);
  }

  close() {
    this._removeHandlers();
    this._element.remove();
  }
}
