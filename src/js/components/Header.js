export default class Header {
  // // Класс, отвечающий за логику работы шапки сайта.
  // // Его конструктор принимает объект опций.
  // // В опциях передается цвет шапки, так как на разных страницах он может быть разный.
  constructor({
    selector, config, options, openPopupMethod, signupPopupOpenMethod, signinPopupOpenMethod,
  }) {
    this._element = document.querySelector(selector);
    this._config = config;
    this._options = options;
    this._openPopupMethod = openPopupMethod;
    this._signupPopupOpenMethod = signupPopupOpenMethod;
    this._signinPopupOpenMethod = signinPopupOpenMethod;
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
    this._applyTheme();
    this._setHandlers();
  }

  _applyTheme() {
    this._element.classList
      .add(this._options.overlaid ? this._config.positionOverlaid : this._config.positionNormal);

    this._element.classList.add(this._config.headerThemeTemplate + this._options.theme);
    this._menu = this._element.querySelector(this._config.menuHamburger);
    this._menu.classList.add(this._config.hamburgerThemeTemplate + this._options.theme);

    this._element.querySelectorAll(this._config.menuLink).forEach((link) => {
      link.classList.add(this._config.linkThemeTemplate + this._options.theme);
    });

    this._button = this._element.querySelector(this._config.menuButton);
    this._button.classList.add(this._config.buttonTypeTemplate + this._options.theme);
  }

  _buttonClickHandler(event) {
    event.preventDefault(event);

    if (this._props.isLoggedIn) {
      return this.render({
        props: {
          isLoggedIn: false,
        },
      });
    }

    return this._openPopupMethod();
  }

  _setHandlers() {
    this._button.addEventListener('click', this._buttonClickHandler);
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
    } else {
      this._button.classList.remove(this._config.buttonLogoutTypeTemplate + this._options.theme);
      this._button.innerText = this._config.buttonText;
    }
  }
}
