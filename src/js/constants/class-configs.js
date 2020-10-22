export const POPUP_CONFIG = {
  popupTemplate: '#popup-template',
  signupPopupTemplate: '#signup-popup',
  signinPopupTemplate: '#signin-popup',
  successPopupTemplate: '#success-popup',
  container: '.popup__container',
  closeButton: '.popup__close',
  choiceButton: '.popup__choice',
  form: '.popup__form',
  title: '.popup__title',
  signinTitle: 'Вход',
  signinChoiceText: 'Зарегистрироваться',
  signupTitle: 'Регистрация',
  signupChoiceText: 'Войти',
};

export const HEADER_CONFIG = {
  headerTemplate: '.header',
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
};

export const FORM_CONFIG = {
  signinTemplate: '#signin-template',
  signupTemplate: '#signup-template',
  successTemplate: '#success-template',
  searchTemplate: '.search__field',
  submitButton: '.button_type_colored',
  serverError: '.popup__error_align_center',
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
  descriptionStyle: 'info__description',
  keywordsContainer: '.info__keywords',
  keywordClass: 'info__keyword',
  separator: ', ',
  lastSeparator: ' и ',
  thirdKeywordReplacer: ' другим',
  userName: '.info__user-name',
  articlesCounter: '.info__articles',
};
