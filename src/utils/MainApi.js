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
  signup({ email, password, name }) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      email,
      password,
      name,
    });
    return this._getDataPromise("signup");
  }
  signin({ email, password }) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      email,
      password
    });
    return this._getDataPromise("signin");

  }
  signout() {
    this._options.method = "POST";
    return fetch(`${this._baseUrl}/signout`, this._options).then((res) => {
      return res.ok ? res : Promise.reject(`Error: ${res.statusText}`);
    });
  }
  getArticles() {
    const { body, ...rest } = this._options
    rest.method = "GET";
    this._options = rest;
    return this._getDataPromise("articles");
  }
  deleteArticle(id) {
    this._options.method = "DELETE";
    return this._getDataPromise(`articles/${id}`);
  }
}

const mainApi = new MainApi("https://newspin.students.nomoreparties.site/api", {
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
