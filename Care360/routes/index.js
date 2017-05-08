var express = require('express');
var router = express.Router();
var passport=require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing',{
    isAuthenticated:false,
    user:req.user
  });
});

router.get('/docLog',function(req,res,next) {
    res.render('docLogin');
});

router.post('/docLog',function(req,res){
    res.send('good to go')
    console.log(req.body.user)
        console.log(req.body.pass)
});
router.get('/patLog', function(req,res,next){
	res.render('patLogin')
});
module.exports = router;
