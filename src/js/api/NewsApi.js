export default class NewsApi {
  // Отвечает за взаимодействие с NewsAPI.
  // У класса есть конструктор, принимающий опции.

  constructor({ options }) {
    this._baseUrl = options.baseUrl;
    this._endpoint = options.endpoint;
    this._apiKey = options.apiKey;
    this._pageSize = options.pageSize;
  }

  _definePeriod() {
    this._from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    this._to = new Date().toISOString().slice(0, 10);
  }

  getNews({ query }) {
    // возвращает список новостей на основе запроса.
    this._definePeriod();
    const url = `${this._baseUrl}${this._endpoint}?q=${query}&from=${this._from}&to=${this._to}&pageSize=${this._pageSize}&apiKey=${this._apiKey}`;

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }
}
