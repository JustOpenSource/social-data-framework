var ROUTES = [
    'list',
    'contact',
    'data',
    'details',
    'login',
    'user',
    'home'
];

var ROUTES_PATH = __dirname + '/../routes/';

module.exports = function(app){

    useRoutes(app, ROUTES);

    //catch 404 and forward to error handler
    app.use(function(req, res, next) {

        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}

function useRoutes(app, routes){
    //adding each route in ROUTES
    routes.forEach(function(route){

        var path;

        if(route === 'home') {

            path = '';

        } else {

            path = route + '/';
        }

        app.use('/' + path, require(ROUTES_PATH + route));
    });
}