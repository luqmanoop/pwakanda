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
        movie.slug = slugify(movie.title);
        movie.poster = movieConfig.poster.build(movie.poster_path);

        return movie;
      })
    )
    .then(movies => res.json(movies))
    .catch(err => res.json({ error: true, message: err }));
};

exports.fetchMovie = (req, res) => {
  const movieId = req.params.id;
  console.log(movieId);
  client(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits,reviews'
    }
  })
    .then(response => response.data)
    .then(movie => {
      const {
        backdrop_path,
        release_date,
        original_title,
        title,
        poster_path,
        overview,
        reviews,
        credits,
        videos,
        genres
      } = movie;

      return {
        backdrop: movieConfig.backdrop.build(backdrop_path, 'medium'),
        release_date,
        original_title,
        genres,
        poster: movieConfig.poster.build(poster_path),
        overview,
        reviews: reviews.results,
        trailers: videos.results.slice(0, 2),
        cast: credits.cast
          .map(c => {
            c.profile = movieConfig.poster.build(c.profile_path);
            return c;
          })
          .slice(0, 5)
      };
    })
    .then(movie => res.json(movie))
    .catch(err => res.send({ error: true, message: err.message }));
};
