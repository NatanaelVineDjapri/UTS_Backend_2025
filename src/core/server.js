const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const pinoHTTP = require('pino-http');

require('../models');

const config = require('./config');
const logger = require('./logger')('app');
const routes = require('../api/routes');
const { errorResponder, errorTypes } = require('./error');

const app = express();

app.enable('trust proxy');

app.use(cors());

app.use(require('method-override')());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(pinoHTTP({ logger }));

app.use(`${config.api.prefix}`, routes());

app.use((request, response, next) =>
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, 'Route not found'))
);

app.use((error, request, response, next) => {
  const ctx = {
    code: error.code,
    status: error.status,
    description: error.description,
  };

  if (error.stack) {
    ctx.stack = error.stack;
  }

  logger.error(ctx, error.toString());

  return next(error);
});

app.use((error, request, response, next) =>
  response.status(error.status || 500).json({
    statusCode: error.status || 500,
    error: error.code || 'UNKNOWN_ERROR',
    description: error.description || 'Unknown error',
    message: error.message || 'An error has occurred',
  })
);

module.exports = app;
