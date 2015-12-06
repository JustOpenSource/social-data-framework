var session = require('express-session');

module.exports = function(app, config){

    var DEFAULT_PORT = 3000;
    var SESSION_SECRET = process.env.SESSION_SECRET || 'whateverthehell';

    app.set('port', process.env.PORT || DEFAULT_PORT);

    app.use(session({
        secret: SESSION_SECRET,
        cookie: { 
            httpOnly: false , 
            maxAge: 24*60*60*1000
        }
    }));

    /*
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
    */

/*
    //todo: remove this, add it to locals, rework with new framework
    app.use(function(req, res, next){

        req._db = {
            fatalities : db.collection(c.collection.fatalities),
            users : db.collection(c.collection.users)
        };

        req.lang = req.query.lang || 'en';

        next();
    });
*/


    //set urls to locals
    app.use(function(req, res, next) {

        req._rootUrl = function() {
            var url = req.protocol + "://" + req.get('host');

            return url;
        }

        req.app.locals.config = config;

        var url = {};

        url.root = req._rootUrl();
        url.data = {};
        url.data.root = url.root + '/data/api/v1';
        url.list = url.root + '/list';
        url.data.distinct = url.data.root + '/distinct';
        url.data.details = url.data.root + '/details';
        url.current = url.root + req.url;

        req.app.locals.url = url;

        next();
    });


/*

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
*/
}