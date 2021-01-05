class MainApi {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _getDataPromise(endpoint) {
    return fetch(`${this._baseUrl}/${endpoint}`, this._options).then((res) => {
      return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
    });
  }

  authorize(token) {
    const { body, ...rest } = this._options
    rest.method = "GET";
    rest.headers.authorization = `Bearer ${token}`;
    this._options = rest;

    return this._getDataPromise("users/me");
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

  updateUserInfo(user) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify(user);
    return this._getDataPromise('users/me');
  }

  updateUserAvatar(imageLink) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({ avatar: imageLink });
    return this._getDataPromise('users/me/avatar');
  }

  getCards() {
    this._options.method = "GET";
    delete this._options.body;
    return this._getDataPromise("cards");
  }

  addCard(name, link) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: name,
      link: link,
    });
    return this._getDataPromise("cards");
  }

  removeCard(cardId) {
    this._options.method = "DELETE";
    return this._getDataPromise(`cards/${cardId}`);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this._addCardLike(cardId) : this._removeCardLike(cardId);
  }

  _addCardLike(cardId) {
    this._options.method = "PUT";
    return this._getDataPromise(`cards/${cardId}/likes`);
  }

  _removeCardLike(cardId) {
    this._options.method = "DELETE";
    return this._getDataPromise(`cards/${cardId}/likes`);
  }
}

const mainApi = new MainApi("https://newspin.students.nomoreparties.site/api", {
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
