export default class NewsCardList {
  // // Класс списка карточек новостей.
  // // Конструктор принимает массив карточек, которые должны быть в списке при первой отрисовке.
  constructor({
    element, selectors, classes, newsCards,
  }) {
    this._element = element;
    this._selectors = selectors;
    this._classes = classes;
    this._newsCards = newsCards;
    this._errorMessage = this._element.querySelector(this._selectors.errorMessage);
    this._results = this._element.querySelector(this._selectors.results);
  }

  _render({ type }) {
    this._element.children.forEach((container) => {
      container.classList.add(this._classes.containerHidden);

      if (container.classList.contains(`${this._classes.containerType}${type}`)) {
        container.classList.remove(this._classes.containerHidden);
      }
    });
  }

  renderResults({ newsCards }) {
    // принимает массив экземпляров карточек и отрисовывает их;
    this._results.innerHTML = '';
    this._newsCards = newsCards;

    this._newsCards.slice(0, 3).forEach((newsCard) => {
      this._results.appendChild(newsCard);
    });

    this._render({ type: 'success' });
  }

  renderLoader() {
    // отвечает за отрисовку лоудера;
    this._render({ type: 'pending' });
  }

  renderError(error) {
    // принимает объект ошибки и показывает ошибку в интерфейсе;
    this._errorMessage.textContent = error.message;
    this._render({ type: 'error' });
  }

  // showMore() {
  //   // отвечает за функциональность кнопки «Показать ещё»;

  // }

  addCard({ newsCard }) {
    // принимает экземпляр карточки и добавляет её в список.
    this._element.appendChild(newsCard);
  }
}
