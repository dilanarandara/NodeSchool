// Invoke in strict mode.
'use strict';

exports.home = function (req, res) {
    res.render('index', {
        title: 'Hello World'
    });
};