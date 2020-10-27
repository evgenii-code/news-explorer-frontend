import './style.css';

import {
  POPUP_CONFIG,
  HEADER_CONFIG,
  FORM_CONFIG,
  POPUP_MESSAGE_CONFIG,
  NEWS_CARDS_CONFIG,
  CARD_CONFIG,
} from './js/constants/class-configs';

import {
  NEWS_CARDS_MESSAGES,
  FORM_ERRORS,
} from './js/constants/text-messages';

import {
  NEWS_API_OPTIONS,
  MAIN_API_OPTIONS,
} from './js/constants/api-config';

import {
  getToken,
  saveToken,
  deleteToken,
} from './js/utils/local-storage-utils';

import dateFormatter from './js/utils/date-formatter';
import MainApi from './js/api/MainApi';
import NewsApi from './js/api/NewsApi';
import User from './js/components/User';
import Header from './js/components/Header';
import Popup from './js/components/Popup';
import Form from './js/components/Form';
import PopupForm from './js/components/PopupForm';
import PopupMessage from './js/components/PopupMessage';
import NewsCardsList from './js/components/NewsCardList';
import NewsCard from './js/components/NewsCard';

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

const header = new Header({
  selector: HEADER_CONFIG.headerTemplate,
  config: HEADER_CONFIG,
  options: {
    theme: 'light',
    overlaid: true,
  },
  logoutMethod: (event) => {
    event.preventDefault(event);

    if (user.getStatus().isLoggedIn) {
      deleteToken();

      user.loggedOut();

      header.render({ props: user.getStatus() });
      return;
    }

    popup.clearContent();
    popup.setContent(signinForm.node());
    popup.open();
  },
});

const popup = new Popup({
  selector: POPUP_CONFIG.popupTemplate,
  config: POPUP_CONFIG,
  toggleMenu: header.toggleMenu,
});

const signinForm = new PopupForm({
  selector: FORM_CONFIG.signinTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler: (info) => {
    mainApi.signin(info)
      .then((res) => {
        saveToken(res.token);

        return renderLoggedUser(res.token);
      })
      .then(() => {
        signinForm.clear();
        popup.close();
      })
      .catch((error) => error.then((data) => signinForm.setServerError(data)))
      .catch((error) => console.log(`Ошибка ${error}`));
  },
  choiceClickHandler: (event) => {
    event.preventDefault();

    signinForm.clear();
    popup.clearContent();
    popup.setContent(signupForm.node());
  },
});

const popupSuccess = new PopupMessage({
  selector: POPUP_MESSAGE_CONFIG.successTemplate,
  config: POPUP_MESSAGE_CONFIG,
  choiceClickHandler: (event) => {
    event.preventDefault();

    popup.clearContent();
    popup.setContent(signinForm.node());
  },
});

const signupForm = new PopupForm({
  selector: FORM_CONFIG.signupTemplate,
  errorMessages: FORM_ERRORS,
  config: FORM_CONFIG,
  submitHandler: (info) => {
    mainApi.signup(info)
      .then(() => {
        popup.clearContent();
        popup.setContent(popupSuccess.node());
      })
      .catch((error) => error.then((data) => signupForm.setServerError(data)))
      .catch((error) => console.log(`Ошибка ${error}`));
  },
  choiceClickHandler: (event) => {
    event.preventDefault();

    signupForm.clear();
    popup.clearContent();
    popup.setContent(signinForm.node());
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
  submitHandler: (info) => {
    newsCardsList.renderLoader();

    newsApi.getNews({ query: info.search })
      .then((articlesData) => {
        if (articlesData.totalResults === 0) {
          newsCardsList.renderError({ message: NEWS_CARDS_MESSAGES.notFound });
          return;
        }

        const newsCards = articlesData.articles.map((article) => {
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

              if (user.isLoggedIn()) {
                const cardId = card.id();

                const apiRoute = cardId
                  ? mainApi.removeArticle({
                    cardId,
                    token: getToken(),
                  })
                  : mainApi.createArticle({
                    article: content,
                    token: getToken(),
                  });

                apiRoute
                  .then((cardData) => {
                    card.setId(cardData.data._id);
                    card.renderIcon({ isLoggedIn: user.isLoggedIn() });
                  })
                  .catch((error) => console.log(`Ошибка при сохранении/удалении статьи ${error}`));
              }
            },
          });

          card.renderIcon({ isLoggedIn: user.isLoggedIn() });

          return card.create();
        });

        newsCardsList.renderResults({ newsCards, limitResults: true });
      })
      .catch((error) => {
        console.log(`Ошибка при получении статей ${error}`);
        newsCardsList.renderError({ message: NEWS_CARDS_MESSAGES.serverError });
      });
  },
});

searchForm.setListeners();
signinForm.setListeners();
signupForm.setListeners();

renderLoggedUser(getToken());
