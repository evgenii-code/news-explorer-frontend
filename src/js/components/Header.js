import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  // // Класс, отвечающий за логику работы шапки сайта.
  // // Его конструктор принимает объект опций.
  // // В опциях передается цвет шапки, так как на разных страницах он может быть разный.
  constructor({
    selectors, options, element, container, handlers,
  }) {
    super({ element, handlers });
    this._selectors = selectors;
    this._options = options;
    this._applyTheme();
    this._addHeaderToDOM();
  }

  _applyTheme() {
    this._element.classList.add(this._options.overlaid ? 'body__header_position_overlaid' : 'body__header_position_normal');

    this._element.classList.add(`header_theme_${this._options.theme}`);
    this._menu = this._element.querySelector(this._selectors.menuHamburger);
    this._menu.classList.add(`menu__hamburger_theme_${this._options.theme}`);

    this._element.querySelectorAll(this._selectors.menuLink).forEach((link) => {
      link.classList.add(`menu__link_theme_${this._options.theme}`);
    });

    this._button = this._element.querySelector(this._selectors.menuButton);
    this._button.classList.add(`button_type_${this._options.theme}`);
  }

  _addHeaderToDOM() {
    document.body.prepend(this._element);
  }

  render({ props }) {
    // при вызове метода перерисовывает шапку в зависимости от объекта props.
    // У этого объекта есть два обязательных свойства:
    // isLoggedIn — залогинен ли пользователь;
    // userName — имя, которое отображается в шапке залогиненного пользователя.
    this._props = props;

    if (this._props.isLoggedIn) {
      this._button.classList.add(`button_logout_${this._options.theme}`);
      this._button.innerText = props.userName;
    } else {
      this._button.classList.remove(`button_logout_${this._options.theme}`);
      this._button.innerText = 'Авторизоваться';
    }
  }
}
