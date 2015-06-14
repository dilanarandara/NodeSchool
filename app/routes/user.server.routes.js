// Invoke 'strict' JavaScript mode
'use strict';

var passport = passport = require('passport'),
    user = require('../controllers/user.server.controller');

module.exports = function (app) {
    app.route('/signin')
    .get(user.hasLogedIn, user.renderSignin)
    .post(user.hasLogedIn, passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/signin'
    }));
    
    app.route('/signup')
        .get(user.hasLogedIn, user.renderSignup)
        .post(user.hasLogedIn, user.signup);

    app.get('/signout', user.signout);
}