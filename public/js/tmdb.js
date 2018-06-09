import { fetchMovies } from './fetch';

export default class TMDb {
  constructor(url) {
    this.url = url;
  }

  fromNetwork(headerNameValue = {}) {
    return fetchMovies(this.url, { headers: headerNameValue })
      .then(movies => movies)
      .catch(() => null);
  }

  fromCache() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      return fetchMovies(this.url, {
        headers: { 'x-use-cache-only': '1' }
      }).catch(() => null);
    } else {
      return Promise.resolve(null);
    }
  }
}
