const tmdb = require('./tmdb');

const addMovie = movie => {
  const { id = '', poster = '', overview = '', title = '', slug = '' } =
    movie || {};
  return `
    <div class="col-sm-6 col-md-4">
        <article class="movie">
            <a href="/movie/${slug}/${id}">
                <div class="poster_container">
                    <img class="poster" src="${poster}" alt='${title}'/>
                </div>
            </a>
                <h3 class="title truncate" title="${title}">
                    <a href="/movie/${slug}/${id}">${title}</a>
                </h3>
                <p class="overview-excerpt">${overview}</p>
        </article>
    </div>
    `;
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
