'use strict';

module.isAuthenticated = function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
    }
    next();
}