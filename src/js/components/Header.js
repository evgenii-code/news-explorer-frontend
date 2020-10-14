import BaseComponent from './BaseComponent';

export default class Header extends BaseComponent {
  // // Класс, отвечающий за логику работы шапки сайта.
  // // Его конструктор принимает объект опций.
  // // В опциях передается цвет шапки, так как на разных страницах он может быть разный.
  constructor({
    selectors, options, element, handlers,
  }) {
    super({ element, handlers });
    this.selectors = selectors;
    this.options = options;
    this._applyTheme();
    this._addHeaderToDOM();
  }

  _applyTheme() {
    this.element.classList.add(this.options.overlaid ? 'body__header_position_overlaid' : 'body__header_position_normal');

    this.element.classList.add(`header_theme_${this.options.theme}`);
    this.menu = this.element.querySelector(this.selectors.menuHamburger);
    this.menu.classList.add(`menu__hamburger_theme_${this.options.theme}`);

    this.element.querySelectorAll(this.selectors.menuLink).forEach((link) => {
      link.classList.add(`menu__link_theme_${this.options.theme}`);
    });

    this.button = this.element.querySelector(this.selectors.menuButton);
    this.button.classList.add(`button_type_${this.options.theme}`);
  }

  _addHeaderToDOM() {
    document.body.prepend(this.element);
  }

  render({ props }) {
    // при вызове метода перерисовывает шапку в зависимости от объекта props.
    // У этого объекта есть два обязательных свойства:
    // isLoggedIn — залогинен ли пользователь;
    // userName — имя, которое отображается в шапке залогиненного пользователя.
    this.props = props;

    if (this.props.isLoggedIn) {
      this.button.classList.add(`button_logout_${this.options.theme}`);
      this.button.innerText = props.userName;
    } else {
      this.button.classList.remove(`button_logout_${this.options.theme}`);
      this.button.innerText = 'Авторизоваться';
    }
  }
}
