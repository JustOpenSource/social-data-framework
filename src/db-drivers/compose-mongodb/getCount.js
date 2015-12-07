var q = require('q');
var log = require(__dirname + '/../../utils/log')('db-drivers/compose-mongodb/getCount');
var v = require(__dirname + '/../../utils/validateModel');

function getCount(d) {

    v(d, {

        //schema
        "db" : {},
        "data" : {}
    },

        //required
        ["db", "data"]
    );

    log('trace', 'attempt to get count');

    var deferred = q.defer();

    data.collection
        .find(filterUtils.queryFilter(data.filter, data._user.username), filterUtils.querySelect())
        .count(function(err, count){

            if(err){

                log('error', 'could not get count', err);
                deferred.reject(err);
            }

            log('trace', 'got count: ' + count);

            data.count = count;

            deferred.resolve(data);

        });

    return deferred.promise;
}

module.exports = getCount;