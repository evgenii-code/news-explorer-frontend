import './style.css';
import Header from './js/components/Header';
import {
  BODY,
  HEADER,
  SIGNIN_POPUP_TEMPLATE,
  SIGNUP_POPUP_TEMPLATE,
  SUCCESS_POPUP_TEMPLATE,
  SEARCH_FORM,
  PRELOADER,
} from './js/constants/elements';
import {
  HEADER_SELECTORS,
  PRELOADER_SELECTORS,
} from './js/constants/selectors';
import {
  PRELOADER_CLASSES,
} from './js/constants/classes';
import NEWS_API_OPTIONS from './js/constants/newsApi-config';
import Popup from './js/components/Popup';
import NewsApi from './js/api/NewsApi';
import Form from './js/components/Form';
import Preloader from './js/components/Preloader';

const newsApi = new NewsApi({ options: NEWS_API_OPTIONS });

const header = new Header({
  element: HEADER,
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

const searchForm = new Form({
  element: SEARCH_FORM,
  handlers: [
    // {
    //   selector: '.search__field',
    //   eventType: 'submit',
    //   handler: submitSearchForm,
    // },
    // {
    //   selector: '.search__input',
    //   eventType: 'input',
    //   handler: submitSearchForm,
    // },
  ],
});

const preloader = new Preloader({
  element: PRELOADER,
  selectors: PRELOADER_SELECTORS,
  classes: PRELOADER_CLASSES,
});

function closePopup(event) {
  event.preventDefault(event);

  this.close();
}

function changePopup(event) {
  event.preventDefault(event);

  this.close();

  const { popupType } = this._element.dataset;

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

  if (this._props.isLoggedIn) {
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

function getInputsOnly(form) {
  return Array.from(form.elements).filter((element) => element.tagName === 'INPUT');
}

function getFormData(form) {
  const inputs = getInputsOnly(form);

  return inputs.reduce((acc, input) => {
    const result = { ...acc };
    result[input.name] = input.value;
    return result;
  }, {});
}

function submitSearchForm(event) {
  event.preventDefault();
  preloader.render({ type: 'pending' });

  const formData = getFormData(event.target);

  newsApi.getNews({ query: formData.search })
    .then((res) => {
      console.log(res);

      if (res.totalResults === 0) {
        preloader.render({ type: 'failed' });
      } else {
        preloader.clear();
      }
    })
    .catch(() => {
      preloader.render({ type: 'error' });
    });
}

header.render({
  props: {
    isLoggedIn: true,
    userName: 'Грета',
  },
});

SEARCH_FORM.addEventListener('submit', submitSearchForm);
