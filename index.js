var Db = require('./src/utils/db');
var Config = require('./src/utils/getConfig');
var q = require('q');

/**
* the main application, a new instance of this will run an instance of the server
* @constructor
* @returns {instance} - an instance of Main
*/
function Main(){

    //private variables
    var config;
    var db;

    /**
    * runs the server
    */
    this.start = function(instanceRoot){

        config = new Config(instanceRoot);
        dbService = new Db(config);

        function startServer(db){
            
            dbService.setDatabase(db);
            var app = require(__dirname + '/src/utils/app')(config, dbService);
        }

        dbService.connect(config).then(startServer);
    }

    /**
    * runs when a new instance of Main is created
    */
    //INIT
}

module.exports = Main;