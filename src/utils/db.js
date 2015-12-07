var v = require('./validateModel');
var dbModels = require('./dbDriverModels');

/**
* The database utility
* @module utils/db
* @exports Db
*/

function Db(config){

    v(config, {
    
        "system" : {
            "type" : "object",
            "properties" : {
                "database_driver" : {
                    "type" : "string"
                }
            },
            "required" : ["database_driver"]
        }

    }, ["system"]);

    var t = this;
    
    var driver_root = __dirname + '/../db-drivers/' + config.system.database_driver + '/';

    t.methods = [
        'connect',
        'getCount',
        'getData',
        'getDistinct',
        'getRecord',
        'setRecord',
        'setStatus',
        'import'
    ];

    t.methods.forEach(function(methodName){

        var driverPath = driver_root + methodName;

        try {
            
            var tempDriver = require(driverPath);

        } catch(e){

            throw new Error('Cannot find db driver at ' + driverPath);
        }

        t[methodName] = function(d){
                
            dbModels[methodName].param(d);

            var tempReturn = tempDriver(d);

            dbModels[methodName].return(tempReturn);

            return tempReturn;
        }
    });
    
    t.setDatabase = function(db){
        
        t.db = db;
    }
}

module.exports = Db;