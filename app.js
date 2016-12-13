const express     = require('express');
const logger      = require('morgan');
const bodyParser  = require('body-parser');

const { NODE_ENV = 'development' } = process.env;

// Set up the express app
const app = express();

// Log requests to the console when development mode.
if (NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Require our middlewares into the application
require('./server/middlewares')(app);

// Require our routes into the application.
require('./server/routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the begining of nothingness.'
}));

module.exports = app;
