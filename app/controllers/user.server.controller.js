//Invoke in strict mode.
'use strict';

var User = require('mongoose').model('User');

exports.renderSignin = function (req, res) {
    res.render('signin', {
        title: 'Signn In',
        csrfToken : req.csrfToken()
    });
};

exports.renderSignup = function (req, res) {
    res.render('signup', {
        title: 'Sign Up', 
        csrfToken : req.csrfToken()
    });
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';
        user.save(function (err) {
            
            if (err) {
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/home');
            });
        });
    } else {
        return res.redirect('/home');
    }
};

// Create a new controller middleware that is used to authorize authenticated operations 
exports.requiresLogin = function (req, res, next) {
    // If a user is not authenticated send the appropriate error message
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }
    // Call the next middleware
    next();
};

// Create a new controller middleware that is used to authorize authenticated operations 
exports.hasLogedIn = function (req, res, next) {
    // If a user is not authenticated send the appropriate error message
    if (req.isAuthenticated()) {
        return res.redirect('/home');
    }
    // Call the next middleware
    next();
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();
    
    // Redirect the user back to the main application page
    res.redirect('/');
};