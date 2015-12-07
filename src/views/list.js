var v = require('../utils/validateModel');

module.exports = function(d, cb) {

    var valid = v(d, {
        
        //schema    
        "test" : {
            "type" : "string"
        }
    }, 

        //required
        ["test"]
    );

    cb(d);
}