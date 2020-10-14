export default class NewsApi {
  // Отвечает за взаимодействие с NewsAPI.
  // У класса есть конструктор, принимающий опции.

  constructor({ options }) {
    this.baseUrl = options.baseUrl;
    this.endpoint = options.endpoint;
    this.apiKey = options.apiKey;
    this.pageSize = options.pageSize;
  }

  _definePeriod() {
    this.from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    this.to = new Date().toISOString().slice(0, 10);
  }

  getNews({ query }) {
    // возвращает список новостей на основе запроса.
    this._definePeriod();
    const url = `${this.baseUrl}${this.endpoint}?q=${query}&from=${this.from}&to=${this.to}&pagesize=${this.pageSize}&apikey=${this.apiKey}`;

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
      });
  }
}
