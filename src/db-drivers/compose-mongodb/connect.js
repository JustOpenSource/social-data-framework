var MongoClient = require('mongodb').MongoClient;
var q = require('q');
//var log = require('../utils/log');

function connect(config){

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