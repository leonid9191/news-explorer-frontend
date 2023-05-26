export default class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `something goes wrong: ${res.status} ${res.statusText}`
    );
  }

  saveArticle(data) {
    return fetch(this._baseUrl + "/articles", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  getSavedArticles() {
    return fetch(this._baseUrl + "/articles", {
      headers: this._headers,
    }).then((res) => {
      this._checkResponse(res);
    });
  }

  removeArticle(articleId) {
    return fetch(this._baseUrl + "/articles/" + articleId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      this._checkResponse(res);
    });
  }
}
