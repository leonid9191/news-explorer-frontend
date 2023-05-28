class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  saveArticle(data, jwt) {
    return fetch(this._baseUrl + "/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error! " + res.statusText);
      }
    });
  }

  getSavedArticles(jwt) {
    return fetch(this._baseUrl + "/articles", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error! " + res.statusText);
      }
    });
  }

  removeArticle(articleId, jwt) {
    return fetch(this._baseUrl + "/articles/" + articleId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject("Error! " + res.statusText);
      }
    });
  }
}

const BASE_URL = "https://api.news-leo.mooo.com";
// const BASE_URL = "http://localhost:3000";
export const mainApi = new MainApi({
  baseUrl: BASE_URL,
});
