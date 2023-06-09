class NewsExplorerApi {
  constructor({ baseURL, headers, key }) {
    this._baseURL = baseURL;
    this._headers = headers;
    this._key = key;
  }

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getNews(keyword) {
    const currentDate = new Date().toISOString().slice(0, 10);

    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    return fetch(
      `${this._baseURL}?q=${keyword}&sortBy=popularity&from=${lastWeek}&to=${currentDate}&pageSize=100&apiKey=${this._key}`,
      {
        method: "GET",
        headers: {
          ...this._headers,
        },
      }
    ).then(this._handleServerResponse);
  }
}

export const NewsApi = new NewsExplorerApi({
  baseURL: 'https://nomoreparties.co/news/v2/everything',
  key: "870d9c87a2344d62b67c86a698c15412",
  // key: "6422de520f344b469d07eb1a555210d2",
});
