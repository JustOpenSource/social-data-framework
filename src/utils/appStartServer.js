var https = require('https');
var http = require('http');

module.exports = function(app){

    var httpServer = http.createServer(app).listen(app.get('port'));
}