export const POPUP_CONFIG = {
  parentContainer: '.body',
  popupTemplate: '#popup-template',
  signupPopupTemplate: '#signup-popup',
  signinPopupTemplate: '#signin-popup',
  successPopupTemplate: '#success-popup',
  container: '.popup__container',
  closeButton: '.popup__close',
  choiceButton: '.popup__choice',
  form: '.popup__form',
  backgroundClass: 'body__popup',
  closeButtonClass: 'popup__close',
};

export const HEADER_CONFIG = {
  parentContainer: '.body',
  headerTemplate: '#header',
  positionOverlaid: 'body__header_position_overlaid',
  positionNormal: 'body__header_position_normal',
  menuHamburger: '.menu__hamburger',
  menuButton: '.menu__button',
  menuLink: '.menu__link',
  headerThemeTemplate: 'header_theme_',
  hamburgerThemeTemplate: 'menu__hamburger_theme_',
  linkThemeTemplate: 'menu__link_theme_',
  buttonTypeTemplate: 'button_type_',
  buttonLogoutTypeTemplate: 'button_logout_',
  buttonText: 'Авторизоваться',
  menuItemHidden: 'menu__item_hidden',
  loggedOnlyLink: '#logged-only-link',
  menuCheckboxSelector: '.menu__checkbox',
  menuSelector: '.header__menu',
  menuHiddenClass: 'header__menu_hidden',
};

export const FORM_CONFIG = {
  signinTemplate: '#signin-template',
  signupTemplate: '#signup-template',
  searchTemplate: '.search__field',
  submitButton: '.button_type_colored',
  serverError: '.error_type_server',
  choiceButton: '.popup__choice',
};

export const POPUP_MESSAGE_CONFIG = {
  successTemplate: '#message-template',
  messageElement: '.popup__message',
  choiceButton: '.popup__choice',
};

export const NEWS_CARDS_CONFIG = {
  newsCardsTemplate: '.cards',
  pending: '.cards__container_type_pending',
  failed: '.cards__container_type_failed',
  error: 'cards__container_type_error',
  success: '.cards__container_type_success',
  results: '.cards__results',
  errorMessage: '.preloader__description_type_error',
  showMoreButton: '.cards__button',
  containerHidden: 'cards__container_hidden',
  containerType: 'cards__container_type_',
  showMoreButtonHidden: 'cards__button_hidden',
};

export const CARD_CONFIG = {
  cardTemplate: '#card',
  title: '.card__title',
  source: '.card__address',
  date: '.card__date',
  text: '.card__description',
  image: '.card__image',
  iconContainer: '.card__icon-container',
  iconContainerUnauth: 'card__icon-container_unauth',
  icon: '.card__icon',
  iconUnmarked: 'card__icon_type_unmarked',
  iconMarked: 'card__icon_type_marked',
  iconDelete: 'card__icon_type_delete',
  keyword: 'card__keyword',
};

export const INFO_CONFIG = {
  infoTemplate: '.info',
  title: '.info__title',
  description: '.info__description',
  descriptionHiddenStyle: 'info__description_hidden',
  keywordsContainer: '.info__keywords',
  keywordClass: 'info__keyword',
  separator: ', ',
  lastSeparator: ' и ',
  etCetera: ' другим',
  userName: '.info__user-name',
  articlesCounter: '.info__articles',
  articlesText: '.info__saved-articles',
  articlesMessage: {
    single: ' сохраненная статья',
    double: ' сохраненные статьи',
    multi: ' сохраненных статей',
  },
};
