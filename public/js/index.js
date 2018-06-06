import { formatDate, renderMovieRatings } from '../../src/utils';
const tmdb = require('./tmdb');

const addMovie = movie => {
  const {
    id = '',
    poster = '',
    overview = '',
    title = '',
    slug = '',
    vote_count = 0,
    release_date,
    vote_average
  } =
    movie || {};
  const date = formatDate(release_date);
  return (
    `<div class="col-sm-6 col-md-4">` +
    `<article class="movie">` +
    `<a href="/movie/${slug}/${id}">` +
    `<div class="poster_container">` +
    `<img class="poster" src="${poster}" alt='${title}'/>` +
    `</div>` +
    `</a>` +
    `<h3 class="title truncate" title="${title}">` +
    `<a href="/movie/${slug}/${id}">${title}</a>` +
    `</h3>` +
    `<date class='release_date'>${date}</date>` +
    `<p class="overview-excerpt">${overview}</p>` +
    `<div>` +
    `${renderMovieRatings(vote_average)}` +
    `<div class="vote-count pull-right">` +
    `<span class="glyphicon glyphicon-heart"></span> ${vote_count.toLocaleString()}` +
    `</div>` +
    `</div>` +
    `</article>` +
    `</div>`
  );
};

const html = document.querySelector('.row.movies');
const _loader = document.querySelector('.loader');

(dom => {
  const urlPath = window.location.pathname;
  const paths = urlPath.split('/');
  const cat = paths[paths.length - 1] || '';

  const url = `/api/movies/${cat}`;
  let requestPending = true;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('[ServiceWorker] registered');
      if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.addEventListener(
          'controllerchange',
          function changeListener() {
            // New worker has claimed, warm up the caches
            tmdb.fetchMovies(url);
            // We only care about this once.
            navigator.serviceWorker.removeEventListener(
              'controllerchange',
              changeListener
            );
          }
        );
      }
    });
  }

  tmdb.fetchMovies(url).then(movies => {
    requestPending = false;
    _loader.classList.add('hide');

    dom.innerHTML = movies.map(movie => addMovie(movie)).join('');
  });
})(html);
