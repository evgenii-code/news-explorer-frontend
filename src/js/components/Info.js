export default class Info {
  constructor({
    selector, config, articles, userName,
  }) {
    this._element = document.querySelector(selector);
    this._config = config;
    this._userNameField = this._element.querySelector(this._config.userName);
    this._userNameField.textContent = userName;
    this._articlesCounter = this._element.querySelector(this._config.articlesCounter);
    this._articlesText = this._element.querySelector(this._config.articlesText);
    this._title = this._element.querySelector(this._config.title);
    this._description = this._element.querySelector(this._config.description);
    this._keywordsContainer = this._element.querySelector(this._config.keywordsContainer);
    this.render(articles);
  }

  _countKeywords() {
    return this._articles.reduce((acc, article) => {
      const result = acc;

      if (!result[article.keyword]) {
        result[article.keyword] = 1;
      } else {
        result[article.keyword] += 1;
      }

      return result;
    }, {});
  }

  _getSortedKeywords() {
    const countedKeywords = this._countKeywords();

    return Object
      .keys(countedKeywords)
      .reduce((acc, keyword) => {
        const obj = {};

        obj.keyword = keyword;
        obj.total = countedKeywords[keyword];

        acc.push(obj);
        return acc;
      }, [])
      .sort((first, second) => second.total - first.total);
  }

  _createKeywordElement(keyword) {
    const keywordElement = document.createElement('b');
    keywordElement.classList.add(this._config.keywordClass);
    keywordElement.textContent = keyword;
    return keywordElement;
  }

  _includeSeparation() {
    return this._keywordElements.reduce((acc, item, index, arr) => {
      const result = acc;

      result.push(item);
      if (index === (arr.length - 2)) {
        result.push(this._config.lastSeparator);
      } else if (index < (arr.length - 1)) {
        result.push(this._config.separator);
      }

      return result;
    }, []);
  }

  _defineKeywordsToShow() {
    const sortedKeywords = this._getSortedKeywords();

    this._description.classList.remove(this._config.descriptionHiddenStyle);

    if (sortedKeywords.length === 0) {
      this._description.classList.add(this._config.descriptionHiddenStyle);
      this._keywordElements = [];
    } else if (sortedKeywords.length <= 3) {
      this._keywordElements = sortedKeywords
        .map((item) => this._createKeywordElement(item.keyword));
    } else {
      this._keywordElements = sortedKeywords
        .slice(0, 2)
        .map((item) => this._createKeywordElement(item.keyword));

      this._keywordElements
        .push(this._createKeywordElement(`${sortedKeywords.length - 2} ${this._config.etCetera}`));
    }

    this._keywordElements = this._includeSeparation();
  }

  _defineDeclensions(number) {
    const n = Math.abs(number) % 100;
    const n1 = number % 10;
    if (n > 10 && n < 20) { return this._config.articlesMessage.multi; }
    if (n1 > 1 && n1 < 5) { return this._config.articlesMessage.double; }
    if (n1 === 1) { return this._config.articlesMessage.single; }
    return this._config.articlesMessage.multi;
  }

  render(articles) {
    this._articles = articles;
    this._articlesCounter.textContent = articles.length;
    this._articlesText.textContent = this._defineDeclensions(articles.length);
    this._keywordsContainer.innerHTML = '';
    this._defineKeywordsToShow();
    this._keywordsContainer.append(...this._keywordElements);
  }
}
