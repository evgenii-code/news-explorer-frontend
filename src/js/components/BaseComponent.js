export default class BaseComponent {
  constructor({ element, handlers }) {
    // конструктор этого класса может принимать массив обработчиков событий,
    // которые нужно добавить его элементам.
    // Обработчики следует передавать конструктору в виде массива
    if (element.tagName === 'TEMPLATE') {
      this.element = element.content.cloneNode(true).firstElementChild;
    } else {
      this.element = element;
    }

    this.handlers = handlers;

    if (this._isHandlersPassed(handlers)) {
      this._setHandlers();
    }
  }

  _isHandlersPassed() {
    return this.handlers instanceof Array && this.handlers.length !== 0;
  }

  _bindHandlers() {
    return this.handlers.map((item) => ({
      selector: item.selector,
      eventType: item.eventType,
      handler: item.handler.bind(this),
    }));
  }

  _setHandlers() {
    this.bindedHandlers = this._bindHandlers();

    this.bindedHandlers.forEach((item) => {
      this.element.querySelector(item.selector).addEventListener(item.eventType, item.handler);
    });
  }

  _removeHandlers() {
    this.bindedHandlers.forEach((item) => {
      this.element.querySelector(item.selector).removeEventListener(item.eventType, item.handler);
    });
  }
}
