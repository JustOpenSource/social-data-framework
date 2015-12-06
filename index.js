var Db = require('./src/utils/db');
var Config = require('./src/utils/getConfig');
var q = require('q');

/**
* the main application, a new instance of this will run an instance of the server
* @constructor
* @returns {instance} - an instance of Main
*/
function Main(){

    var config;
    var db;

    /**
    * runs the server
    */
    this.start = function(instanceRoot){

        config = new Config(instanceRoot);
        db = new Db(config);

        function startServer(database){

            var app = require('./src/utils/appDefinition');
            require('./src/utils/appSetup')(app, config);
            require('./src/utils/appRoutes')(app);
            require('./src/utils/appStartServer')(app);
        }

        db.connect(config).then(startServer);
    }

    /**
    * runs when a new instance of Main is created
    */
    function init(){
        
    }

    init();
}

module.exports = Main;