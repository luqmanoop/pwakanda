const apiRouter = require('./apiRouter');

module.exports = app => {
  app.get('/:category?/', (req, res) => {
    const category = req.params.category || '';
    res.render('index');
  });

  app.get('/movie/:id/:title?/', (req, res) => {
    res.json('root with id and title');
  });

  app.use('/api', apiRouter);
};
