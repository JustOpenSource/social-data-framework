/**
* The express app
* @module utils/app
* @exports app
*/

global.__base = __dirname + '/';

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hogan = require('hogan-express');
var session = require('express-session');
var https = require('https');
var http = require('http');
var log = require('./log')('utils/app');

var express = require('express');
var app = express();

var DEFAULT_PORT = 3000;
var SESSION_SECRET = process.env.SESSION_SECRET || 'whateverthehell';

function setBase(){

    log('trace', 'setBase');

    app.engine('html', hogan);

    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'html');
    app.set('layout', 'layout');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(require('less-middleware')(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));

    app.set('port', process.env.PORT || DEFAULT_PORT);

}

//TODO: setup better longterm solution than this
function setTestUser(){

    log('trace', 'setTestUser');

    //to test as logged in user
    app.use(function(req, res, next){
        
        req.session.user = {
            'username' : 'test',
            'roles' : [{'name': 'admin'}, {'name' : 'researcher'}, {'name': 'editor'}],
            'rolesObject' : {
                'admin' : true,
                'researcher' : true,
                'editor' : true
            }
        }

        next();
    });
}

function setSession(){

    log('trace', 'setSession');

    app.use(session({
        secret: SESSION_SECRET,
        cookie: { 
            httpOnly: false , 
            maxAge: 24*60*60*1000
        }
    }));
}

function setErrorHandlers(){

    log('trace', 'setErrorHandlers');

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

function setLocals(config, databaseService){

    log('trace', 'setLocals');

    //set urls to locals
    app.use(function(req, res, next) {

        var url = {};
        url.root = req.protocol + "://" + req.get('host');
        url.data = {};
        url.data.root = url.root + '/data/api/v1';
        url.data.distinct = url.data.root + '/distinct';
        url.data.details = url.data.root + '/details';
        url.list = url.root + '/list';
        url.current = url.root + req.url;

        req.app.locals.url = url;
        req.app.locals.db = databaseService;
        req.app.locals.lang = req.query.lang || 'en';
        req.app.locals.config = config;

        next();
    });
}

function setRoutes(){

    log('trace', 'setRoutes');

    var ROUTES = [
        'list',
        'contact',
        'data',
        'details',
        'login',
        'user',
        'home',
        'apiDocs'
    ];

    var ROUTES_PATH = __dirname + '/../routes/';

    function useRoutes(app, routes){
        //adding each route in ROUTES
        routes.forEach(function(route){

            var path;
            var routeImport;

            if(route === 'home') {

                path = '';

            } else {

                path = route + '/';
            }

            try {

                routeImport = require(ROUTES_PATH + route);
            
            } catch(e) {

                console.log('test');

                throw new Error('could not get ' + ROUTES_PATH + route + ' route');
            }

            app.use('/' + path, require(ROUTES_PATH + route));

            
        });
    }

    useRoutes(app, ROUTES);

    //catch 404 and forward to error handler
    app.use(function(req, res, next) {

        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

function start(){

    log('trace', 'start');

    var httpServer = http.createServer(app).listen(app.get('port'));    
}

module.exports = function(config, databaseService) {

    setBase();
    setSession();
    setErrorHandlers();
    setRoutes();
    setTestUser();
    setLocals(config, databaseService);
    start();

    return app;
};