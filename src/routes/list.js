var router = require('express').Router();

console.log('testing route list');

router.route('/')
.get(function(req, res){

    console.log('testing route');
    console.log(req.app.locals);

    res.render('test', {
        
    });
});

module.exports = router;