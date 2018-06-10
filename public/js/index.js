import { formatDate, renderMovieRatings } from '../../src/utils';
import '../css/style.css';
import Movie from './tmdb';
require('./bootstrap-navbar-toggle');

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

const urlPath = window.location.pathname;
const paths = urlPath.split('/');
const cat = paths[paths.length - 1] || '';

const url = `/api/movies/${cat}`;
const movie = new Movie(url);

let requestPending,
  shouldFadeIn = true;

const showSpinner = () => {
  _loader.classList.remove('hide');
};

const hideSpinner = () => {
  _loader.classList.add('hide');
};

const updatePage = movies => {
  hideSpinner();
  html.innerHTML = movies ? movies.map(movie => addMovie(movie)).join('') : '';
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('[ServiceWorker] registered');
    if (!navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener(
        'controllerchange',
        function changeListener() {
          // New worker has claimed, warm up the caches
          movie.fromNetwork({ 'x-cache-warmup': '1' });
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

// fetch latest movies on script load
const latestMovies = movie.fromNetwork().then(movies => {
  if (!movies) return false;

  requestPending = false;
  updatePage(movies);
  fadeInPosters();
  return true;
});

const fadeInPosters = () => {
  shouldFadeIn
    ? document.querySelectorAll('img.poster').forEach(posterElement => {
        posterElement.classList.add('fade-in');
      })
    : !!shouldFadeIn;
};

const cachedMovies = movie.fromCache().then(movies => {
  if (!movies) return false;

  if (requestPending) {
    updatePage(movies);
    fadeInPosters();
  }
  return true;
});

latestMovies
  .then(fetched => {
    return fetched || cachedMovies;
  })
  .then(result => {
    hideSpinner();
  });
