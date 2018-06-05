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
