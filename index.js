/**
* the main application, a new instance of this will run an instance of the server
* @constructor
* @returns {instance} - an instance of Main
*/

function Main(){

    /**
    * runs the server
    */
    this.runServer = function(){
        

        //require(__dirname + '/utils/server.js')();
    }

    /**
    * runs when a new instance of Main is created
    */
    function init(){
        
    }

    init();

    return this;
}

module.exports = Main;