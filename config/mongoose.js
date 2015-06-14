// Invoke strict javascript mode.
'use strict';

// Load module dependenceis.
var config = require('./config'),
    mongoose = require('mongoose');

// define mongoose configuration methods.
module.exports = function () {
    var db = mongoose.connect(config.db);

    // require all the models in here.
    require('../app/models/user.server.model');
    require('../app/models/student.server.model');
    return db;
};