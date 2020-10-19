export const NEWS_API_OPTIONS = {
  baseUrl: NODE_ENV === 'development' ? 'https://newsapi.org' : 'https://nomoreparties.co/news',
  endpoint: '/v2/everything',
  pageSize: '100',
  apiKey: '276906eed3144044a3a709d8c4dd24d4',
};

export const MAIN_API_OPTIONS = {
  baseUrl: 'https://api.news-app.ga',
  paths: {
    signup: '/signup',
    signin: '/signin',
    userData: '/users/me',
    articles: '/articles',
  },
};
