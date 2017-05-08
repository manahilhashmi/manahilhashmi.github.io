var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Doctor=require('../models/doctor')
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

passport.use(new LocalStrategy(
    function(username,password,done) {
    Doctor.getDoctorByUsername(username,function(err,doctor){
        if (err) throw err;
        if(!doctor){
            return done(null,false,{message:"Unknown User"})
        }
        Doctor.comparePassword(password,doctor.password,function(err,isMatch){
            if (err) throw err;
            if(isMatch){
                return done(null,doctor)
            } else {
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
router.post('/docLog',
        passport.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}),
        function(req,res) {
            res.redirect('/')

});
router.get('/patLog', function(req,res,next){
	res.render('patLogin')
});
module.exports = router;
