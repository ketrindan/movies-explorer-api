require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const router = require('./routes/index');

const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const config = require('./utils/config');

const allowedCors = [
  'https://movies-explorer.ketrindan.nomoredomains.work',
  'http://movies-explorer.ketrindan.nomoredomains.work',
  'localhost:3000',
];

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(config.MONGODB_PATH, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
});

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
