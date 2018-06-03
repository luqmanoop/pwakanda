const movieStaticCache = 'pwakanda-static-v1';
const movieDataCache = 'pwakanda-data-v1';
const movieImageCache = 'pwakanda-images-v1';

const wakandaCaches = [movieStaticCache, movieDataCache, movieImageCache];

const urlsToCache = [
  '/',
  '/css/style.css',
  '/css/detail.css',
  '/js/app.bundle.js',
  '/js/movie.bundle.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
];
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
  event.waitUntil(precache());
});
/**
 * precache App Shell
 */
function precache() {
  return caches.open(movieStaticCache).then(cache => {
    console.log('[ServiceWorker] Caching app shell');
    return cache.addAll(urlsToCache);
  });
}

/**
 * Attempt to fetch request from cache
 * @param request
 */
function serveFromCache(request) {
  const cloneRequest = request.clone();
  const res = caches.open(movieStaticCache).then(cache => {
    return cache.match(request).then(response => {
      return (
        response ||
        fetch(cloneRequest).then(networkResponse => {
          caches.open(movieDataCache).then(cache => {
            cache.put(request, networkResponse);

            return networkResponse;
          });
        })
      );
    });
  });

  return res;
}

