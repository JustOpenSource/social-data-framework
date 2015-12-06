var Db = require('../../src/utils/db.js');
var assert = require('assert');
var testConfg = require('./testConfig');

describe('Db', function() {

    var VALID_DRIVER_NAME = 'compose-mongodb';
    var TEST_DB = new Db(testConfg);

    var METHODS = [
        'connect',
        'getCount',
        'getData',
        'getDistinct',
        'getRecord',
        'setRecord',
        'setStatus'
    ];

    describe('"new" constructor', function () {
        
        it('should create instance of "Db"', function () {

            assert.equal(true, TEST_DB instanceof Db);
        });

        /*
        it('should throw error if no config parameter is set', function () {

            function newInstanceNoParam(){

                var test = new Db();
            }

            assert.throws(newInstanceNoParam, Error);
        });
        */
    });

    describe('method', function () {
        
        it('should be an array of method name strings', function () {

            assert.deepEqual(METHODS, TEST_DB.methods);
        });
    });
});