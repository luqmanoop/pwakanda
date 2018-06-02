const express = require('express');
const router = express.Router();
const { fetchMovies, fetchMovie } = require('./controller/apiController');

router.get('/movies/:category?/', fetchMovies);

router.get('/movie/:id', fetchMovie);

module.exports = router;
