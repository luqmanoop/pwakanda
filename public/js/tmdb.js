const axios = require('axios');

const fetchMovies = url => {
  return axios(url)
    .then(response => response.data)
    .then(movies => movies)
    .catch(err => null);
};

module.exports.fetchMovies = fetchMovies;
