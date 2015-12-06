var router = require('express').Router();

router.route('/')
.get(function(req, res){
    console.log(req.app.locals);
    
});

module.exports = router;