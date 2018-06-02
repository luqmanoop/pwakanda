const axios = require('axios');
const { apiKey: api_key } = require('../../config/keys');
const { slugify } = require('../../utils');
const { base_url, movie: movieConfig } = require('../../data/TMDb');

const client = axios.create({
  baseURL: base_url,
  params: { api_key }
});

exports.fetchMovies = (req, res) => {
  const category = req.params.category || 'popular';
  client(movieConfig.category[category])
    .then(
      response =>
        response.data.results
          ? response.data.results
          : Promise.reject('no data')
    )
    .then(movies =>
      movies.map(movie => {
        movie.slug = slugify(movie.original_title);
        movie.poster = movieConfig.poster.build(movie.poster_path);

        return movie;
      })
    )
    .then(movies => res.json(movies))
    .catch(err => res.json({ error: true, message: err }));
};
