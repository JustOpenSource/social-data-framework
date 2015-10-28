function main(){

    this.runServer = function(){
        require(__dirname + '/utils/server.js')();
    }

    function init(){
        console.log('SDF Engine init()');
    }

    init();

    return this;
}

module.exports = main;