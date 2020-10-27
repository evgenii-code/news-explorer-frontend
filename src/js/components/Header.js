export default class Header {
  // // Класс, отвечающий за логику работы шапки сайта.
  // // Его конструктор принимает объект опций.
  // // В опциях передается цвет шапки, так как на разных страницах он может быть разный.
  constructor({
    selector, config, options, logoutMethod,
  }) {
    this._config = config;
    this._parentContainer = document.querySelector(this._config.parentContainer);
    this._element = this._parentContainer.querySelector(selector)
      .content.cloneNode(true).firstElementChild;
    this._menu = this._element.querySelector(this._config.menuSelector);
    this._menuCheckbox = this._menu.querySelector(this._config.menuCheckboxSelector);
    this._options = options;
    this._loggedOnlyLink = this._element.querySelector(this._config.loggedOnlyLink);
    this._logoutMethod = logoutMethod.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this._applyTheme();
    this._setHandlers();
  }

  _applyTheme() {
    this._element.classList
      .add(this._options.overlaid ? this._config.positionOverlaid : this._config.positionNormal);

    this._element.classList.add(this._config.headerThemeTemplate + this._options.theme);
    this._menuHamburger = this._element.querySelector(this._config.menuHamburger);
    this._menuHamburger.classList.add(this._config.hamburgerThemeTemplate + this._options.theme);

    this._element.querySelectorAll(this._config.menuLink).forEach((link) => {
      link.classList.add(this._config.linkThemeTemplate + this._options.theme);
    });

    this._button = this._element.querySelector(this._config.menuButton);
    this._button.classList.add(this._config.buttonTypeTemplate + this._options.theme);
  }

  _setHandlers() {
    this._button.addEventListener('click', this._logoutMethod);
  }

  _addElementToDOM() {
    this._parentContainer.prepend(this._element);
  }

  toggleMenu() {
    this._menuCheckbox.checked = false;
    this._menu.classList.toggle(this._config.menuHiddenClass);
  }

  render({ props }) {
    // при вызове метода перерисовывает шапку в зависимости от объекта props.
    // У этого объекта есть два обязательных свойства:
    // isLoggedIn — залогинен ли пользователь;
    // userName — имя, которое отображается в шапке залогиненного пользователя.
    this._props = props;

    if (this._props.isLoggedIn) {
      this._button.classList.add(this._config.buttonLogoutTypeTemplate + this._options.theme);
      this._button.innerText = props.userName;
      this._loggedOnlyLink.classList.remove(this._config.menuItemHidden);
    } else {
      this._button.classList.remove(this._config.buttonLogoutTypeTemplate + this._options.theme);
      this._button.innerText = this._config.buttonText;
      this._loggedOnlyLink.classList.add(this._config.menuItemHidden);
    }

    this._addElementToDOM();
  }
}
