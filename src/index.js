import './style.css';
import Header from './js/components/Header';

import {
  BODY,
  NEWS_CARDS,
  CARD,
} from './js/constants/elements';

import {
  NEWS_CARDS_SELECTORS,
  CARD_SELECTORS,
} from './js/constants/selectors';

import {
  NEWS_CARDS_CLASSES,
} from './js/constants/classes';

import {
  POPUP_CONFIG,
  HEADER_CONFIG,
  FORM_CONFIG,
} from './js/constants/class-configs';

import {
  NEWS_CARDS_ERRORS,
  FORM_ERRORS,
} from './js/constants/error-messages';

import {
  NEWS_API_OPTIONS,
  MAIN_API_OPTIONS,
} from './js/constants/api-config';
import dateFormatter from './js/utils/date-formatter';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import NewsCardsList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

function getToken() {
  return localStorage.getItem('jwt');
}

function saveToken(token) {
  localStorage.setItem('jwt', token);
}

const mainApi = new MainApi({ options: MAIN_API_OPTIONS });
const newsApi = new NewsApi({ options: NEWS_API_OPTIONS });

const signinForm = new Form({
  selector: FORM_CONFIG.signinTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler(info) {
    mainApi.signin(info)
      .then((res) => {
        saveToken(res.token);

        header.render({
          props: {
            isLoggedIn: true,
            userName: 'dude',
          },
        });

        popup.close();
      })
      .catch((error) => {
        // TODO - отрефакторить
        error.then((data) => {
          signinForm.setServerError(data);
        });
      });
  },
});

const signupForm = new Form({
  selector: FORM_CONFIG.signupTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
});

const popup = new Popup({
  selector: POPUP_CONFIG.popupTemplate,
  config: POPUP_CONFIG,
  forms: {
    signin: signinForm.node(),
    signup: signupForm.node(),
    // success: successForm.node(),
  },
});

const header = new Header({
  selector: HEADER_CONFIG.headerTemplate,
  config: HEADER_CONFIG,
  options: {
    theme: 'light',
    overlaid: true,
  },
  openPopupMethod: popup.open,
});

const newsCardsList = new NewsCardsList({
  element: NEWS_CARDS,
  newsCards: [],
  selectors: NEWS_CARDS_SELECTORS,
  classes: NEWS_CARDS_CLASSES,
});

const searchForm = new Form({
  selector: FORM_CONFIG.searchTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler(info) {
    newsCardsList.renderLoader();

    newsApi.getNews({ query: info.search })
      .then((results) => {
        console.log(results);

        if (results.totalResults === 0) {
          newsCardsList.renderError({ message: NEWS_CARDS_ERRORS.notFound });
        } else {
          const newsCards = results.articles.map((result) => new NewsCard({
            element: CARD,
            selectors: CARD_SELECTORS,
            content: result,
            dateFormatter,
          }).create());

          newsCardsList.renderResults({ newsCards });
        }
      })
      .catch((error) => {
        console.log('error', error);
        newsCardsList.renderError({ message: NEWS_CARDS_ERRORS.serverError });
      });
  },
});

mainApi.getUserData(getToken())
  .then((userData) => {
    console.log(userData.data);

    header.render({
      props: {
        isLoggedIn: true,
        userName: userData.data.name,
      },
    });

    return [ header ];
  })
  .then(([ header ]) => {
    console.log(header);
  })
  .catch((error) => {
    console.log(error);

    header.render({
      props: {
        isLoggedIn: false,
      },
    });
  });
