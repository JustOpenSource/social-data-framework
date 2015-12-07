var v = require('./validateModel');

var dbModels = {};

dbModels.connect = {
    
    'param' : function(d){

        v(d, {
        
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
    },

    'return' : function(d){

        v(d, {
    
        }, []);
    }
}

dbModels.getCount = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.getData = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.getDistinct = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.getRecord = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.getRecords = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.setRecord = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

dbModels.setStatus = {

    'param' : function(d){

        v(d, {
    
        }, []);
    },

    'return' : function(d){
        
        v(d, {
    
        }, []);
    }
}

module.exports = dbModels;