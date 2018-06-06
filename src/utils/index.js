exports.slugify = text => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

exports.formatDate = date => {
  const release_date = new Date(date)
    .toDateString()
    .split(' ')
    .splice(1);

  return `${release_date[0]} ${release_date[1]}, ${release_date[2]}`;
};

exports.renderMovieRatings = rating => {
  const TOTAL_RATING = 5;
  const RATED = caculateRatings(rating);

  let ratings = '';
  for (let i = 1; i <= TOTAL_RATING; i++) {
    if (i <= RATED) {
      ratings += '<span class="rating glyphicon glyphicon-star"></span>';
    } else {
      ratings += '<span class="rating glyphicon glyphicon-star-empty"></span>';
    }
  }
  return ratings;
};

const caculateRatings = rating => {
  return Number.parseFloat((rating / 10) * 5).toFixed();
};
