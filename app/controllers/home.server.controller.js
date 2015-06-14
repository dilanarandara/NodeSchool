// Invoke in strict mode.
'use strict';

exports.render = function (req, res) {
    res.render('home', {
        title: 'Hello World',
        layout: 'layouts/_login'
    });
};