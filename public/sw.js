const movieStaticCache = 'pwakanda-static-v1';
const movieDataCache = 'pwakanda-data-v1';
const movieImageCache = 'pwakanda-images-v1';

const wakandaCaches = [movieStaticCache, movieDataCache, movieImageCache];

const urlsToCache = [
  '/',
  '/js/app.bundle.js',
  '/css/app.css',
  '/css/bootstrap.slim.min.css',
  '/fonts/glyphicons-halflings-regular.woff2',
  'https://fonts.googleapis.com/css?family=Roboto+Mono'
];
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  self.skipWaiting();
  event.waitUntil(precache());
});

self.addEventListener('activate', event => {
  console.log('[serviceWorker] Activated');
  if (self.clients && clients.claim) {
    clients.claim();
  }
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (
            key !== movieStaticCache &&
            (key !== movieDataCache) & (key !== movieImageCache)
          )
            return caches.delete(key);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.href.match(/\/api\//)) {
    if (requestUrl.pathname === '/api/movies/popular') {
      event.respondWith(
        caches
          .match(requestUrl.href.replace('popular', ''))
          .then(cacheResponse => {
            return cacheResponse || tmdbApi(event.request);
          })
      );
    } else if (
      requestUrl.pathname &&
      requestUrl.pathname.startsWith('/api/movie')
    ) {
      event.respondWith(tmdbApi(event.request));
    } else event.respondWith(tmdbApi(event.request));
  } else if (requestUrl.hostname === 'image.tmdb.org') {
    event.respondWith(tmdbMoviePosters(event.request));
  } else {
    if (requestUrl.pathname && requestUrl.pathname.startsWith('/movies')) {
      event.respondWith(caches.match('/'));
    } else {
      if (requestUrl.pathname && requestUrl.pathname.startsWith('/movie')) {
        event.respondWith(
          caches.match(event.request).then(cacheResponse => {
            if (cacheResponse) return cacheResponse;
            return caches.open(movieStaticCache).then(cache => {
              let url = '';
              return cache
                .keys()
                .then(requests => {
                  requests.forEach(request => {
                    if (request.url.match(/\/movie\//)) url = request.url;
                  });
                  return url;
                })
                .then(matchedUrl => {
                  if (matchedUrl) return caches.match(matchedUrl);
                  return fetchAndUpdateStaticCache(event.request);
                });
            });
          })
        );
      } else
        event.respondWith(
          caches.match(event.request).then(cacheResponse => {
            return cacheResponse || fetchAndUpdateStaticCache(event.request);
          })
        );
    }
  }
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
 * Fetch from network and update cache
 * @param request
 */
function fetchAndUpdateStaticCache(request) {
  return caches.open(movieStaticCache).then(function(cache) {
    return cache.match(request).then(cacheResponse => {
      if (cacheResponse) {
        console.log('[ServiceWorker] fetching from cache.');
        return cacheResponse;
      }

      return fetch(request)
        .then(function(response) {
          if (response.status === 404)
            return new Response("So sorry that page doesn't exist.");

          console.log('[ServiceWorker] fetching from network.');
          if (!request.url.startsWith('chrome-extension://')) {
            cache.put(request.url, response.clone());
          }

          return response;
        })
        .catch(() => new Response('Oh nooooo! Server is down.'));
    });
  });
}

function tmdbApi(request) {
  if (request.headers.get('x-use-cache-only')) {
    // respond with cache data if headers is asking for cached content
    return caches.match(request);
  } else if (request.headers.get('x-cache-warmup')) {
    const headers = new Headers(request.headers);
    headers.delete('x-cache-warmup');
    console.log('[serviceWorker] warming up the cache...');
    return tmdbApi(new Request(request, { headers: headers }))
      .then(response => {
        return response.json();
      })
      .then(data => {
        const moviePostersRequests = data
          .map(movie => movie.poster)
          .map(posterUrl => new Request(posterUrl, { mode: 'no-cors' }));

        return Promise.all(moviePostersRequests.map(tmdbMoviePosters));
      })
      .then(() => {
        return caches.match(request);
      });
  } else {
    return fetch(request).then(networkResponse => {
      return caches.open(movieDataCache).then(movieCache => {
        movieCache.put(request, networkResponse.clone());
        return networkResponse;
      });
    });
  }
}

function tmdbMoviePosters(request) {
  return caches.match(request).then(cacheResponse => {
    if (cacheResponse) {
      return cacheResponse;
    }

    return fetch(request)
      .then(networkResponse => {
        return caches.open(movieImageCache).then(cache => {
          cache.put(request, networkResponse.clone());

          return networkResponse;
        });
      })
      .catch(() => {
        console.log('[@tmdbMoviePosters] - Failed to fetch from network');
      });
  });
}
