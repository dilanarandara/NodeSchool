// Invoke 'strict' JavaScript mode
'use strict';

var passport = passport = require('passport'),
    index = require('../controllers/index.server.controller'),
    users = require('../controllers/user.server.controller');

// Define the routes module' method
module.exports = function (app) {
    
    // Mount the 'index' controller's 'home' method
    app.route('/').get(users.hasLogedIn, index.home);
};