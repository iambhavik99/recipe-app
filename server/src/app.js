const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const entry = require('./routers/entry');

// defining the Express app
const app = express();

// connect to database
require('./config/db.config');

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyparser.json());

// enabling CORS for all requests
app.use(cors({ origin: '*' }));

// API routers
entry(app);

module.exports = app;

