function getConfig(dir){

    var t = this;

    t.system = require(dir + '/config/system.1');
}

module.exports = getConfig;