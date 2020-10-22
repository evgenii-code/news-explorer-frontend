import './style.css';

import {
  // POPUP_CONFIG,
  HEADER_CONFIG,
  // FORM_CONFIG,
  NEWS_CARDS_CONFIG,
  CARD_CONFIG,
  INFO_CONFIG,
} from '../../js/constants/class-configs';

// import {
//   NEWS_CARDS_ERRORS,
//   FORM_ERRORS,
// } from '../../js/constants/error-messages';

import {
  MAIN_API_OPTIONS,
} from '../../js/constants/api-config';

import dateFormatter from '../../js/utils/date-formatter';
import MainApi from '../../js/api/MainApi';
import User from '../../js/components/User';
import Header from '../../js/components/Header';
// import Popup from '../../js/components/Popup';
// import Form from '../../js/components/Form';
import NewsCardsList from '../../js/components/NewsCardList';
import NewsCard from '../../js/components/NewsCard';
import Info from '../../js/components/Info';

function getToken() {
  return localStorage.getItem('jwt');
}

const user = new User();
const mainApi = new MainApi({ options: MAIN_API_OPTIONS });

const header = new Header({
  selector: HEADER_CONFIG.headerTemplate,
  config: HEADER_CONFIG,
  options: {
    theme: 'dark',
    overlaid: false,
  },
  logoutMethod: (event) => {
    event.preventDefault(event);

    localStorage.removeItem('jwt');
    user.loggedOut();

    location.replace('/');
  },
});

mainApi.getAppInfo(getToken())
  .then(([articlesData, userData]) => {
    let articles = articlesData.data;

    user.loggedIn(userData.data.name);

    header.render({
      props: user.getStatus(),
    });

    const info = new Info({
      selector: INFO_CONFIG.infoTemplate,
      config: INFO_CONFIG,
      articles,
      userName: user.getStatus().userName,
    });

    const cardsArray = articles.map((article) => {
      const card = new NewsCard({
        selector: CARD_CONFIG.cardTemplate,
        config: CARD_CONFIG,
        content: article,
        dateFormatter,
        iconClickHandler: (event) => {
          event.preventDefault();

          const cardId = card.id();

          mainApi.removeArticle({ cardId, token: getToken() })
            .then(() => {
              articles = articles.filter((item) => item._id !== card.id());

              card.delete();
              info.render(articles);
            })
            .catch((error) => console.log(`При удалении карточки: ${error}`));
        },
      });

      card.renderIcon({ saved: true });

      return card.create();
    });

    const newsCardsList = new NewsCardsList({
      selector: NEWS_CARDS_CONFIG.newsCardsTemplate,
      config: NEWS_CARDS_CONFIG,
      newsCards: cardsArray,
    });
  })
  .catch((error) => {
    console.log('error', error);
    // localStorage.removeItem('jwt');
    // user.loggedOut();
    // location.replace('/');
  });
