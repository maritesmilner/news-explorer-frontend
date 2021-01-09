import { MAIN_API_BASE_URL } from "../utils/Constants";

class MainApi {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }
  _getDataPromise(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, this._options).then((res) => {
      return res.ok ? res.json() : Promise.reject(res.json());
    });
  }
  authorize(token) {
    const { body, ...rest } = this._options
    rest.method = "GET";
    rest.headers.authorization = `Bearer ${token}`;
    this._options = rest;

    return this._getDataPromise("users/me");
  }
  saveArticle({ keyword, title, text, source, link, image, date }) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      keyword,
      title,
      text,
      source,
      link,
      image,
      date,
    });
    return this._getDataPromise("articles");
  }
  signUp({ email, password, name }) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      email,
      password,
      name,
    });
    return this._getDataPromise("signup");
  }
  signIn({ email, password }) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      email,
      password
    });
    return this._getDataPromise("signin");

  }
  getArticles(userId) {
    const { body, ...rest } = this._options
    rest.method = "GET";
    this._options = rest;
    return this._getDataPromise(`articles/${userId}`);
  }
  deleteArticle(id) {
    this._options.method = "DELETE";
    return this._getDataPromise(`articles/${id}`);
  }
}

const mainApi = new MainApi(MAIN_API_BASE_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
