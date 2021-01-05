class NewsApi {
  constructor(baseUrl, apiKey) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  getArticles({ query, to = new Date(), from = new Date(), pageSize = 100 }) {
    from.setDate(to.getDate() - 7);
    return fetch(`${this._baseUrl}?q=${encodeURIComponent(query)}&apiKey=${this._apiKey}&pageSize=${pageSize}&from=${from.toISOString()}&to=${to.toISOString()}`)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
      }
      );
  }
}

const newsApi = new NewsApi("https://newsapi.org/v2/everything", "dfa4a65001354fab869f2be0f08e9217");
export default newsApi;
