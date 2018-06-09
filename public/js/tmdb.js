require('whatwg-fetch');

const fetchMovies = (url, opts) => {
  return fetch(url, opts)
    .then(response => response.json())
    .then(movies => movies)
    .catch(err => null);
};

module.exports.fetchMovies = fetchMovies;
