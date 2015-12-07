var MongoClient = require('mongodb').MongoClient;
var q = require('q');
var log = require(__dirname + '/../../utils/log')('db-drivers/compose-mongodb/connect');
var v = require(__dirname + '/../../utils/validateModel');

function connect(config){

    v(config, {
    
        "system" : {
            "type" : "object",
            "properties" : {
                "database_url" : {
                    "type" : "string"
                }
            },
            
            "required" : ["database_url"]
        }

    }, ["system"]);

    var deferred = q.defer();

    var url = config.system.database_url;

    try {

        MongoClient.connect(url, function(err, db) {

            if(err){

                throw new Error('failed to connect to ' + url, e);

                deferred.reject(err);
            }

            deferred.resolve(db);
        });

    } catch (e){

        throw new Error('could not connect to MongoClient', e);
        
        deferred.reject(err);
    }

    return deferred.promise;
}

module.exports = connect;