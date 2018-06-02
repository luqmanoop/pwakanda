const express = require('express');
const router = express.Router();

router.get('/movies/:category', (req, res) => {
  res.json({ message: 'hello, world 1' });
});

router.get('/movie/:id/:title?/', (req, res) => {
  res.json({ message: 'hello, world' });
});

module.exports = router;
