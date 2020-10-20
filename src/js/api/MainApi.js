export default class MainApi {
  // Отвечает за взаимодействие с написанным вами Node.js API.
  // Конструктор этого класса принимает опции, необходимые для инициализации работы с API
  constructor({
    options,
  }) {
    this.baseUrl = options.baseUrl;
    this.paths = options.paths;
  }

  // signup() {
  // // регистрирует нового пользователя;

  // }

  signin(user) {
    // аутентифицирует пользователя на основе почты и пароля;
    const url = this.baseUrl + this.paths.signin;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(user),
    };

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

  getUserData(token) {
    // возвращает информацию о пользователе;
    const url = this.baseUrl + this.paths.userData;
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }

  // getArticles() {
  // // забирает все статьи;

  // }

  // createArticle() {
  // // создаёт статью;

  // }
  // removeArticle() {
  // // удаляет статью.

  // }
}
