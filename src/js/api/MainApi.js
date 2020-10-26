export default class MainApi {
  // Отвечает за взаимодействие с написанным вами Node.js API.
  // Конструктор этого класса принимает опции, необходимые для инициализации работы с API
  constructor({
    options,
  }) {
    this._baseUrl = options.baseUrl;
    this._paths = options.paths;
  }

  // eslint-disable-next-line class-methods-use-this
  _fetchData({ url, options }) {
    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        // TODO - рефактор
        if (res.status >= 400 && res.status < 500) return Promise.reject(res.json());

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  getAppInfo(token) {
    return Promise.all([this.getArticles(token), this.getUserData(token)]);
  }

  signup(user) {
    // регистрирует нового пользователя;
    const url = this._baseUrl + this._paths.signup;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    };

    return this._fetchData({ url, options });
  }

  signin(user) {
    // аутентифицирует пользователя на основе почты и пароля;
    const url = this._baseUrl + this._paths.signin;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    };

    return this._fetchData({ url, options });
  }

  getUserData(token) {
    // возвращает информацию о пользователе;
    const url = this._baseUrl + this._paths.userData;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return this._fetchData({ url, options });
  }

  getArticles(token) {
    // забирает все статьи;

    const url = this._baseUrl + this._paths.articles;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return this._fetchData({ url, options });
  }

  createArticle({ article, token }) {
    // создаёт статью;
    const url = this._baseUrl + this._paths.articles;
    const options = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(article),
    };

    return this._fetchData({ url, options });
  }

  removeArticle({ cardId, token }) {
    // удаляет статью.
    const url = `${this._baseUrl + this._paths.articles}/${cardId}`;
    const options = {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return this._fetchData({ url, options });
  }
}
