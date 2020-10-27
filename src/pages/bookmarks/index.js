import './style.css';

import {
  // POPUP_CONFIG,
  HEADER_CONFIG,
  // FORM_CONFIG,
  NEWS_CARDS_CONFIG,
  CARD_CONFIG,
  INFO_CONFIG,
} from '../../js/constants/class-configs';

import {
  NEWS_CARDS_MESSAGES,
  // FORM_ERRORS,
} from '../../js/constants/text-messages';

import {
  MAIN_API_OPTIONS,
} from '../../js/constants/api-config';

import {
  getToken,
  deleteToken,
} from '../../js/utils/local-storage-utils';
import redirectToRoot from '../../js/utils/redirect';
import dateFormatter from '../../js/utils/date-formatter';
import MainApi from '../../js/api/MainApi';
import User from '../../js/components/User';
import Header from '../../js/components/Header';
// import Popup from '../../js/components/Popup';
// import Form from '../../js/components/Form';
import NewsCardsList from '../../js/components/NewsCardList';
import NewsCard from '../../js/components/NewsCard';
import Info from '../../js/components/Info';

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

    redirectToRoot();
  },
});

const newsCardsList = new NewsCardsList({
  selector: NEWS_CARDS_CONFIG.newsCardsTemplate,
  config: NEWS_CARDS_CONFIG,
  newsCards: [],
});

newsCardsList.renderLoader();

mainApi.getAppInfo(getToken())
  .then(([articlesData, userData]) => {
    let articles = articlesData.data;

    user.loggedIn(userData.data.name);

    const info = new Info({
      selector: INFO_CONFIG.infoTemplate,
      config: INFO_CONFIG,
      articles,
      userName: user.getName(),
    });

    header.render({
      props: user.getStatus(),
    });

    if (articles.length === 0) {
      newsCardsList.renderError({ message: NEWS_CARDS_MESSAGES.empty });
    } else {
      const newsCards = articles.map((article) => {
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

                if (articles.length === 0) {
                  newsCardsList.renderError({ message: NEWS_CARDS_MESSAGES.empty });
                }
              })
              .catch((error) => console.log(`При удалении карточки: ${error}`));
          },
        });

        card.renderIcon({ saved: true });

        return card.create();
      });

      newsCardsList.renderResults({ newsCards, limitResults: false });
    }
  })
  .catch((error) => {
    console.log(`Ошибка при авторизации: ${error}`);
    deleteToken();
    user.loggedOut();
    redirectToRoot();
  });
