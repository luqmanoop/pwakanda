require('whatwg-fetch');

const fetchMovies = url => {
  return fetch(url)
    .then(response => response.json())
    .then(movies => movies)
    .catch(err => null);
};

module.exports.fetchMovies = fetchMovies;
