// Invoke in strict mode.
'use strict';

// Load the module dependencies.
var passport = require('passport'),
    mongoose = require('mongoose');

module.exports = function () {
    var User = mongoose.model('User');

    // Passport need to be able to serialize and deserialize users.
    //When user iss authenticated, passport will serialize user id into session object.
    passport.serializeUser(function (user, next) {
        return next(null, user._id);
    });
    
    passport.deserializeUser(function (id, next) {
        User.findById(id, function (err, user) {
            if (err) {
                return next(err, false);
            }
            
            if (!user) {
                return next('User Not found', false);
            }

            return next(null, user);
        });
    });

    require('./strategies/local.js')();
};