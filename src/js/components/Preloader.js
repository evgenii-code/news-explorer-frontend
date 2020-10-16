export default class Preloader {
  constructor({ element, selectors, classes }) {
    this._element = element;
    this._selectors = selectors;
    this._classes = classes;
  }

  render({ type }) {
    this._element.classList.remove(this._classes.preloaderHidden);
    this._element.children.forEach((container) => {
      container.classList.add(this._classes.containerHidden);

      if (container.classList.contains(`${this._classes.containerType}${type}`)) {
        container.classList.remove(this._classes.containerHidden);
      }
    });
  }

  clear() {
    this._element.classList.add(this._classes.preloaderHidden);
  }
}
