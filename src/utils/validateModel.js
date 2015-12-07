var log = require(__dirname + '/log')('utils/validateModel');
var _ = require('underscore');
var jsonvalidator = require('jsonschema');

var validate = jsonvalidator.validate;
var Validator = jsonvalidator.Validator;

/**
 * @module validateModel
 * @param model {object}
 * @param schema {object}
 * @param required {array}
*/
function validateModel(model, schema, required){

    
    var v = new Validator();
    
    schema = {
        "id" : "temp",
        "required" : required,
        "properties" : schema
    }

    v.addSchema(schema);
    
    var validated = v.validate(model, schema);

    if(validated.errors){

        validated.errors.forEach(function(error){
            throw new Error(error.message);
        });

        return validated.errors;
    }

    return false;
}

module.exports = validateModel;

/**
USAGE:

var v = require('../utils/validateModel');

var model = {
    'test' : 'foo'
};

var valid = v(d, {
    
    //schema    
    "test" : {
        "type" : "string"
    }
}, 

    //required
    ["test"]
);

**/