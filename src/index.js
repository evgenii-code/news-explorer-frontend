import './style.css';
import Header from './js/components/Header';
import {
  HEADER_TEMPLATE,
  SIGNIN_POPUP_TEMPLATE,
  SIGNUP_POPUP_TEMPLATE,
  SUCCESS_POPUP_TEMPLATE,
  SEARCH_FORM,
} from './js/constants/elements';
import {
  HEADER_SELECTORS,
} from './js/constants/selectors';
import NEWS_API_OPTIONS from './js/constants/newsApi-config';
import Popup from './js/components/Popup';
import NewsApi from './js/api/NewsApi';
import Form from './js/components/Form';

function closePopup(event) {
  event.preventDefault(event);

  this.close();
}

function changePopup(event) {
  event.preventDefault(event);

  this.close();

  const { popupType } = this.element.dataset;

  const signinPopup = new Popup({
    element: (popupType === 'signup') ? SIGNIN_POPUP_TEMPLATE : SIGNUP_POPUP_TEMPLATE,
    handlers: [
      {
        selector: '.popup__close',
        eventType: 'click',
        handler: closePopup,
      },
      {
        selector: '.popup__choice',
        eventType: 'click',
        handler: changePopup,
      },
    ],
  });

  signinPopup.open();
}

function openPopup(event) {
  event.preventDefault(event);

  if (this.props.isLoggedIn) {
    return this.render({
      props: {
        isLoggedIn: false,
      },
    });
  }

  const signupPopup = new Popup({
    element: SIGNIN_POPUP_TEMPLATE,
    handlers: [
      {
        selector: '.popup__close',
        eventType: 'click',
        handler: closePopup,
      },
      {
        selector: '.popup__choice',
        eventType: 'click',
        handler: changePopup,
      },
    ],
  });

  return signupPopup.open();
}

function submitSearchForm(event) {
  event.preventDefault();

  console.log(event);
}

// const newsApi = new NewsApi({ options: NEWS_API_OPTIONS });
// newsApi.getNews({ query: 'Путин' })
//   .then((res) => {
//     console.log(res);
//   });

const header = new Header({
  element: HEADER_TEMPLATE,
  selectors: HEADER_SELECTORS,
  options: {
    theme: 'light',
    overlaid: true,
  },
  handlers: [
    {
      selector: '.menu__button',
      eventType: 'click',
      handler: openPopup,
    },
  ],
});

header.render({
  props: {
    isLoggedIn: true,
    userName: 'Грета',
  },
});

const searchForm = new Form({
  element: SEARCH_FORM,
  handlers: [
    {
      selector: '.search__button',
      eventType: 'click',
      handler: submitSearchForm,
    },
    // {
    //   selector: '.search__input',
    //   eventType: 'input',
    //   handler: submitSearchForm,
    // },
  ],
});
