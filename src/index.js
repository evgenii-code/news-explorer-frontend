import './style.css';

import {
  POPUP_CONFIG,
  HEADER_CONFIG,
  FORM_CONFIG,
  NEWS_CARDS_CONFIG,
  CARD_CONFIG,
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
import User from './js/components/User';
import Header from './js/components/Header';
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

const user = new User();
const mainApi = new MainApi({ options: MAIN_API_OPTIONS });
const newsApi = new NewsApi({ options: NEWS_API_OPTIONS });

const renderLoggedUser = (token) => mainApi.getUserData(token)
  .then((userData) => {
    user.loggedIn(userData.data.name);

    header.render({
      props: user.getStatus(),
    });
  })
  .catch(() => {
    user.loggedOut();

    header.render({
      props: user.getStatus(),
    });
  });

const signinForm = new Form({
  selector: FORM_CONFIG.signinTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler(info) {
    mainApi.signin(info)
      .then((res) => {
        saveToken(res.token);

        renderLoggedUser(res.token)
          .then(() => {
            popup.close();
          });
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
  submitHandler: (info) => {
    mainApi.signup(info)
      .then((res) => {
        console.log(res);

        popup.clearContent();
        popup.setContent('Успешно!'); // TODO - Вставить правильный контент
      })
      .catch((error) => {
        // TODO - отрефакторить
        error.then((data) => {
          signupForm.setServerError(data);
        });
      });
  },
});

const popup = new Popup({
  selector: POPUP_CONFIG.popupTemplate,
  config: POPUP_CONFIG,
  content: {
    signinElement: signinForm.node(), // получаю элемент формы
    signupElement: signupForm.node(),
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
  // logoutMethod() {
  //   localStorage.removeItem('jwt');
  // },
  logoutMethod: (event) => {
    event.preventDefault(event);

    if (user.getStatus().isLoggedIn) {
      localStorage.removeItem('jwt');

      user.loggedOut();

      return header.render({ props: user.getStatus() });
    }

    return popup.open();
  },
});

const newsCardsList = new NewsCardsList({
  selector: NEWS_CARDS_CONFIG.newsCardsTemplate,
  config: NEWS_CARDS_CONFIG,
  newsCards: [],
});

const searchForm = new Form({
  selector: FORM_CONFIG.searchTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler(info) {
    newsCardsList.renderLoader();

    newsApi.getNews({ query: info.search })
      .then((articlesData) => {
        console.log(articlesData);

        if (articlesData.totalResults === 0) {
          newsCardsList.renderError({ message: NEWS_CARDS_ERRORS.notFound });
        } else {
          const newsCards = articlesData.articles.map((article) => {
            const { isLoggedIn } = user.getStatus();

            const content = {
              title: article.title,
              text: article.description,
              date: article.publishedAt,
              source: article.source.name,
              link: article.url,
              image: article.urlToImage,
              keyword: info.search,
            };

            const card = new NewsCard({
              selector: CARD_CONFIG.cardTemplate,
              config: CARD_CONFIG,
              content,
              dateFormatter,
              iconClickHandler: (event) => {
                event.preventDefault();

                if (isLoggedIn) {
                  mainApi.createArticle({
                    article: content,
                    token: getToken(),
                  })
                    .then(() => {
                      card.renderIcon({ isLoggedIn, marked: true });
                    })
                    .catch((error) => console.log(error));
                } else {
                  console.log('Необходима авторизация'); // TODO - сделать попап
                }
              },
            });

            card.renderIcon({ isLoggedIn, marked: false });

            return card.create();
          });

          newsCardsList.renderResults({ newsCards });
        }
      })
      .catch((error) => {
        console.log('error', error);
        newsCardsList.renderError({ message: NEWS_CARDS_ERRORS.serverError });
      });
  },
});

renderLoggedUser(getToken());
