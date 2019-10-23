const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const createError = require('http-errors');
const db = require('./db')();

const app = express();

const PORT = process.env.PORT || 3000;
const api = require('./api');

db.sequelize.authenticate();

app.use(morgan());
app.use(bodyParser.json());

app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
  if (err.message.match(/not found/i)) {
    return res.status(404).json({ error: err.message });
  }

  if (err.message.match(/bad request/i)) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: err.message });

  next();
});

app.listen(PORT, () => {
  console.log(`App running at port ${PORT}`);
});
