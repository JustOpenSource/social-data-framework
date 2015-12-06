/**
* The app server
* @module utils/server
* @exports server
*/

var __base = __base || '../';
var debug = require('debug')('dashboard');
var app = require(__base + 'utils/app');
//var c = require(__base + 'constants');

//var log = require(__base + 'utils/log')('src/bin/www');

//var MongoClient = require('mongodb').MongoClient;

var https = require('https');
var http = require('http');
var fs = require('fs');
var session = require('express-session');

//var getView = require(__base + 'utils/get-view');

//var writeSchemaCache = require(__base + 'utils/schema-write-cache');

/*
var KEYS_DIR = __dirname + '/' + __base + '../_keys/';

app.set('port', process.env.PORT);

function unableToConnectToDB(e){
    log('error', 'missing mongo url', 'generate .env by running: heroku config:get MONGOHQ_URL -s  >> .env');

    if(e){
        log('error', 'mongo connection error', e);
    }
}

var url = process.env.MONGOHQ_URL;

if(!url){
    unableToConnectToDB();
    process.exit();
}

log('trace', 'write schema cache');

writeSchemaCache('fe', 1);
*/

function setupServer(db){

    //UPDATE RECORDS IN SAMPLE DATABASE
    //DANGER DANGER DANGER, DO NOT UNCOMMENT UNLESS YOU KNOW EXACTLY WHAT YOU ARE DOING
    /*
    db.collection(c.collection.fatalities).update({},
        {
            $unset : {"recordState":'new'},
            $unset : {"recordState":'published'},
            $unset : {"recordState":'pending'},
            $set : {"record_state":'published'}
        },
        {upsert:false,
        multi:true}) 
    /**/

/*
    log('trace', 'setup sessions');

    if(!process.env.SESSION_SECRET){
        log('trace', 'add SESSION_SECRET to .env');
    }

    //sessions
    app.use(session({
        secret: process.env.SESSION_SECRET,
        cookie: { 
            httpOnly: false , 
            maxAge: 24*60*60*1000
        }
    }));

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

    log('trace', 'adding  db and lang to req');

    //todo: remove this, add it to locals
    app.use(function(req, res, next){

        req._db = {
            fatalities : db.collection(c.collection.fatalities),
            users : db.collection(c.collection.users)
        };

        req.lang = req.query.lang || 'en';

        next();
    });

    log('trace', 'adding app.locals');

    //set urls to locals
    app.use(function(req, res, next) {

        req._rootUrl = function() {
            var url = req.protocol + "://" + req.get('host');

            return url;
        }

        req.app.locals.url_root = req._rootUrl();
        req.app.locals.url_data = req.app.locals.url_root + '/data/api/v1';
        req.app.locals.url_list = req.app.locals.url_root + '/list';
        req.app.locals.url_distinct = req.app.locals.url_data + '/distinct/';
        req.app.locals.url_details = req.app.locals.url_data + '/details/';
        req.app.locals.url_current = req.app.locals.url_root + req.url;

        next();
    });

    log('trace', 'setting up 404 page');
    

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

    log('trace', 'creating routes');

    //routes
    app.use('/', require(__base + 'routes/home'));
    app.use('/list/', require(__base + 'routes/list'));
    app.use('/contact/', require(__base + 'routes/contact'));
    app.use('/data/', require(__base + 'routes/data'));
    app.use('/details/', require(__base + 'routes/details'));
    app.use('/login/', require(__base + 'routes/login'));
    app.use('/user/', require(__base + 'routes/user'));


    //catch 404 and forward to error handler
    app.use(function(req, res, next) {

        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    
    
    });

    log('trace', 'creating http server');

    var httpServer = http.createServer(app).listen(app.get('port'));

    
    log('trace', 'getting key and cert');

    var key, cert;

    try{

        key = fs.readFileSync(KEYS_DIR + 'key.pem');
    
    } catch(e){

        log('error', 'cannot get key', e);
    
    }

    try{
    
        cert = fs.readFileSync(KEYS_DIR + 'cert.pem');
    
    } catch(e){
    
        log('error', 'cannot get cert', e);
    
    }

    if(key && cert){
    
        log('trace', 'creating https options');

        var options = {
            "key" : key,
            "cert" : cert
        };

        log('trace', 'creating https server');

        var httpsServer = https.createServer(options, app).listen(8000);
    } else {

        log('error', 'could not start https server')
    
    }

    */
}

/*
//MAKE THIS PRETTIER AND ABSTRACT IT
try {

    MongoClient.connect(url, function(err, db) {

        if(err){

            log('error', 'could not connect to connected to ' + url, err);

            return;
        }

        log('trace', 'connected to ' + url);

        setupServer(db);

    });

} catch (e){
    unableToConnectToDB(e);
}
*/

module.exports = {};