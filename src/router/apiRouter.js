const express = require('express');
const router = express.Router();
const { fetchMovies } = require('./controller/apiController');

router.get('/movies/:category?/', fetchMovies);

router.get('/movie/:id/:title?/', (req, res) => {
  res.json({ message: 'hello, world' });
});

module.exports = router;
