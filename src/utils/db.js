function validateConfig(){
    //
}

/**
* The database utility
* @module utils/db
* @exports Db
*/

function Db(config){

    validateConfig(config);
    
    var t = this;
    var driver_root = __dirname + '/../db-drivers/' + config.system.database_driver + '/';

    t.methods = [
        'connect',
        'getCount',
        'getData',
        'getDistinct',
        'getRecord',
        'setRecord',
        'setStatus'
    ];

    /**
    * adds the db methods to 'this'
    * @param methodName {string} - the name of the method to add to 'this'
    */
    function getDbMethods(methodName){

        var driverPath = driver_root + methodName;

        try{

            t[methodName] = require(driverPath);

        } catch(e){

            throw new Error('Cannot find db driver at ' + driverPath);
        }
    }

    t.methods.forEach(function(method){
        getDbMethods(method);
    });
}

module.exports = Db;