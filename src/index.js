const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const appRoutes = require('./router');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public/')));

appRoutes(app);

const PORT = process.env.PORT || 2222;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}`)
);
