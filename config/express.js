// Invoke in strict mode.
'use strict';

// Load module dependencies.
var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    cookieParser = require('cookie-parser'),    
    csrf = require('csurf'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    express = require('express'),  
    expressLayouts = require('express-ejs-layouts'), 
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport');

// Define express configuration method.
module.exports = function (db) {
    var app = express();
    var server = http.createServer(app);
    var io = socketio.listen(server);
    
    // Use the 'body-parser' and 'method-override' middleware functions
    //To read body from req object(req.body), we need to install body-parser.
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    var mongoStore = new MongoStore({
        db: db.connection.db
    });
    
    // Configure session using express-session middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));
    
    // Enable CSRF tokens.
    app.use(csrf());
    
    // Set the application view engine and 'views' folder
    app.set('view engine', 'ejs');
    app.set('views', './app/views');
    app.set('layout', 'layouts/_main'); // set default layout in layouts/main
    app.use(expressLayouts);
    
    // Configure the Passport middleware
    app.use(passport.initialize());
    app.use(passport.session()); // This will enable express session to keep track of user sessions.
    
    //Load routes in here.
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/home.server.routes.js')(app);
    require('../app/routes/user.server.routes.js')(app);
    require('../app/routes/student.server.routes.js')(app);
    
    // Configure static file serving
    app.use(express.static('./public'));
    
    require('./socketio')(server, io, mongoStore);

    return server;
};