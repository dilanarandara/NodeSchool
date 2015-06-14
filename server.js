// Invoke strict javascript mode.
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV = 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');

// Create mongoose DB.
var db = mongoose();

// Cretae a new express application instance.
var app = express(db);

// Create a passport instance.
var passport = passport();

// Use express application for listen on port 3000.
app.listen(3000);

console.log('Server running at http://localhost:3000/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;