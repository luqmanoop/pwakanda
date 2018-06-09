require('whatwg-fetch');

export const fetchMovies = (url, opts) => {
  return fetch(url, opts)
    .then(response => response.json())
    .then(movies => movies)
    .catch(err => null);
};
