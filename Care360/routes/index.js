var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');

});
router.get('/docLog', function(req,res,next){
	res.render('docLogin')
});
router.get('/patLog', function(req,res,next){
	res.render('patLogin')
});
module.exports = router;
