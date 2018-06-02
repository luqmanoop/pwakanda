const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public/')));

const PORT = process.env.PORT || 2222;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}`)
);
