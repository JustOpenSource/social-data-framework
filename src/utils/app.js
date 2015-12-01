/**
* The express app
* @module utils/app
* @exports app
*/

//set base global so require can use absolute paths
global.__base = __dirname + '/';

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hogan = require('hogan-express');

var express = require('express');
var app = express();

// view engine setup
app.engine('html', hogan);

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');
app.set('layout', 'layout');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;