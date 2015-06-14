// Invoke 'strict' JavaScript mode
'use strict';

// Define the routes module' method
module.exports = function (app) {
    // Load the 'home' controller
    var home = require('../controllers/home.server.controller'),
        users = require('../controllers/user.server.controller');
    
    // Mount the 'home' controller's 'render' method
    app.route('/home')
        .get(users.requiresLogin, home.render);
};