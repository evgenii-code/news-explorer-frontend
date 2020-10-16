export default class BaseComponent {
  constructor({ element, handlers }) {
    // конструктор этого класса может принимать массив обработчиков событий,
    // которые нужно добавить его элементам.
    // Обработчики следует передавать конструктору в виде массива
    if (element.tagName === 'TEMPLATE') {
      this._element = element.content.cloneNode(true).firstElementChild;
    } else {
      this._element = element;
    }

    this._handlers = handlers;

    if (this._isHandlersPassed(handlers)) {
      this._setHandlers();
    }
  }

  _isHandlersPassed() {
    return this._handlers instanceof Array && this._handlers.length !== 0;
  }

  _bindHandlers() {
    return this._handlers.map((item) => {
      const binded = { ...item };
      binded.handler = item.handler.bind(this);
      return binded;
    });
  }

  _setHandlers() {
    this._bindedHandlers = this._bindHandlers();

    this._bindedHandlers.forEach((item) => {
      this._element.querySelector(item.selector).addEventListener(item.eventType, item.handler);
    });
  }

  _removeHandlers() {
    this._bindedHandlers.forEach((item) => {
      this._element.querySelector(item.selector).removeEventListener(item.eventType, item.handler);
    });
  }
}
