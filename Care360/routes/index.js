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

router.post('/docLog',passport.authenticate('local'),function(req,res){
    console.log(req);
});
module.exports = router;
