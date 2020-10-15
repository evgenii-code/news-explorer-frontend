export default class Preloader {
  constructor({ element, selectors, classes }) {
    this.element = element;
    this.selectors = selectors;
    this.classes = classes;
  }

  render({ type }) {
    this.element.classList.remove(this.classes.preloaderHidden);
    this.element.children.forEach((container) => {
      container.classList.add(this.classes.containerHidden);

      if (container.classList.contains(`${this.classes.containerType}${type}`)) {
        container.classList.remove(this.classes.containerHidden);
      }
    });
  }

  clear() {
    this.element.classList.add(this.classes.preloaderHidden);
  }
}
