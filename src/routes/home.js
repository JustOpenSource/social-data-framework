var log = require('../utils/log')('routes/home');
var renderView = require('../utils/renderView');
var router = require('express').Router();

router.route('/')
.get(function(req, res){
    
    var page_title = 'Social Data Framework';

    renderView(req, res, 'home', {
       //view data
    }, {

        title: page_title,
        js: ['main/home'],
        css: ['home']
    });
});

module.exports = router;