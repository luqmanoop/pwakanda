const image = {
  config: {
    base_url: 'https://image.tmdb.org/t/p',
    backdrop_size: {
      original: '/original',
      high: '/w1280',
      medium: '/w780',
      low: '/w300'
    },
    poster_size: {
      original: '/original',
      high: '/w500',
      medium: '/w342',
      low: '/w185',
      xlow: '/w154',
      xxlow: '/w92'
    }
  }
};

const configPoster = function(size = 'xxlow') {
  let poster_size = process.env.NODE_ENV === 'production' ? 'xlow' : size;
  const base_url = image.config.base_url;
  const { high, medium, low, xlow, xxlow, original } = image.config.poster_size;

  switch (poster_size) {
    case 'high':
      poster_size = high;
      break;
    case 'medium':
      poster_size = medium;
      break;
    case 'low':
      poster_size = low;
      break;
    case 'xlow':
      poster_size = xlow;
      break;
    case 'xxlow':
      poster_size = xxlow;
      break;
    default:
      poster_size = original;
      break;
  }

  return `${base_url}${poster_size}`;
};

const configBackdrop = function(size = 'low') {
  let backdrop_size = process.env.NODE_ENV === 'production' ? 'medium' : size;
  const base_url = image.config.base_url;
  const { high, medium, low, original } = image.config.backdrop_size;

  switch (backdrop_size) {
    case 'high':
      backdrop_size = high;
      break;
    case 'medium':
      backdrop_size = medium;
      break;
    case 'low':
      backdrop_size = low;
      break;
    default:
      backdrop_size = original;
      break;
  }

  return `${base_url}${backdrop_size}`;
};

module.exports = {
  base_url: 'https://api.themoviedb.org/3',
  movie: {
    category: {
      popular: '/movie/popular',
      top_rated: '/movie/top_rated',
      now_playing: '/movie/now_playing'
    },
    poster: {
      build: (poster_path, size = 'xxlow') => {
        return configPoster(size) + poster_path;
      }
    },
    backdrop: {
      build: (backdrop_path, size = 'low') => {
        return configBackdrop(size) + backdrop_path;
      }
    }
  }
};
