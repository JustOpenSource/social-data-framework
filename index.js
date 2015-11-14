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
        console.log('run server 2');

        //require(__dirname + '/utils/server.js')();
    }

    /**
    * runs when a new instance of Main is created
    */
    function init(){
        console.log('SDF Engine init()');
    }

    init();

    return this;
}

module.exports = Main;