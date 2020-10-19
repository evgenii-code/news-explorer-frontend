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
    this._showMore = this._showMore.bind(this);
    this._showMoreButton = this._element.querySelector(this._selectors.showMoreButton);
  }

  _render({ type }) {
    this._element.children.forEach((container) => {
      container.classList.add(this._classes.containerHidden);

      if (container.classList.contains(`${this._classes.containerType}${type}`)) {
        container.classList.remove(this._classes.containerHidden);
      }
    });
  }

  _checkButtonDisplay() {
    if (this._newsCards.length <= 3 || this._newsCards.length === this._results.children.length) {
      this._showMoreButton.classList.add(this._classes.showMoreButtonHidden);

      this._showMoreButton.removeEventListener('click', this._showMore);
    } else {
      this._showMoreButton.classList.remove(this._classes.showMoreButtonHidden);

      this._showMoreButton.addEventListener('click', this._showMore);
    }
  }

  renderResults({ newsCards }) {
    // принимает массив экземпляров карточек и отрисовывает их;
    this._results.innerHTML = '';
    this._newsCards = newsCards;

    this._newsCards.slice(0, 3).forEach((newsCard) => {
      this.addCard({ newsCard });
    });

    this._checkButtonDisplay();
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

  _showMore(event) {
    // отвечает за функциональность кнопки «Показать ещё»;
    event.preventDefault();

    const showedNews = this._results.children.length;
    const newsTotal = this._newsCards.length;

    for (let i = showedNews; (i < newsTotal) && (i < (showedNews + 3)); i += 1) {
      this.addCard({ newsCard: this._newsCards[i] });
    }

    this._checkButtonDisplay();
  }

  addCard({ newsCard }) {
    // принимает экземпляр карточки и добавляет её в список.
    this._results.appendChild(newsCard);
  }
}
