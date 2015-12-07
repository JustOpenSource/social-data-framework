var fs = require('fs');
var mustache = require('mustache');
var log = require('./log')('utils/getView');

var PATH_TO_TEMPLATES = __dirname + '/../views/';
var TEMPLATE_EXT = '.html';
var DEFAULT_LANG = 'en';

function getStrings(template, lang){

    var str = {};

    var lang = lang || DEFAULT_LANG;

    var langPath = __dirname + '/../lang/' + template + '/' + lang;

    try {

        log('trace', 'get lang: ' + langPath);

        str = require(langPath);

    } catch (err) {

        log('warn', 'could not get lang: ' + langPath);
    
    }

    str._lang = lang;

    return str;
}

function getTemplate(template, viewPath){

    var templateFile = viewPath + TEMPLATE_EXT;
    var html;

    try {

        log('trace', 'attempt to retrieve ' + template + ' view template');

        html = fs.readFileSync(templateFile).toString();
    
    } catch (err) {

        throw new Error('could not retrieve ' + template + ' view template', err);

    }

    return html;
}

function getModel(template, viewPath){

    log('trace', 'attempt to retrieve async view model ' + template);

    return require(viewPath);
    
}

function syncModel(template, model, data, html, cb){

    var data = model(data);
    var returnValue = mustache.render(html, data);

    //even if the view is sync, allow it to be called with a callback
    if(cb){

        cb(null, returnValue);
    
    } else {
        
        return returnValue;
    
    }
}

function asyncModel(template, model, data, html, cb){

    model(data, function(err, d){

        if(err){

            throw new Error('async view model ' + template + ' returned error', err);

            cb(err);
        }

        d._str = data._str;

        cb(null, mustache.render(html, d));
    });
}

function getView (lang, template, data, cb) {

    var viewPath = PATH_TO_TEMPLATES + template;

    var html = getTemplate(template, viewPath);

    var model = getModel(template, viewPath);

    data._str = getStrings(template, lang);

    //sync model
    if(model.length === 1){

        return syncModel(template, model, data, html, cb);

    //async model
    } else if(model.length === 2){

        asyncModel(template, model, data, html, cb);
        
    }

};

module.exports = getView;