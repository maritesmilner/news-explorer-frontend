import { NEWS_API_BASE_URL, NEWS_API_KEY, NEWS_NO_OF_DAYS_OLD } from "../utils/Constants";

class NewsApi {
  constructor(baseUrl, apiKey) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
  }

  getArticles({ query, to = new Date(), from = new Date(), pageSize = 100 }) {
    from.setDate(to.getDate() - NEWS_NO_OF_DAYS_OLD);
    return fetch(`${this._baseUrl}?q=${encodeURIComponent(query)}&apiKey=${this._apiKey}&pageSize=${pageSize}&from=${from.toISOString()}&to=${to.toISOString()}`)
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
      }
      );
  }
}

const newsApi = new NewsApi(NEWS_API_BASE_URL, NEWS_API_KEY);
export default newsApi;
