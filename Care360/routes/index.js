var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Doctor=require('../models/doctor.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing',{
  });
});

router.get('/docLog',function(req,res,next) {
    res.render('docLogin');
});

passport.use(new LocalStrategy(
    function(username,password,done) {
    Doctor.getDoctorByUsername(username,function(err,doctor){
        if (err){console.log(err)};
        if(!doctor){
            return done(null,false,{message:"Unknown User"})
        }
        Doctor.comparePassword(password,doctor.password,function(err,isMatch){
            if (err) throw err;
            if(isMatch){
                console.log("authenticated")
                return done(null,doctor)
            } else {
                console.log(doctor)
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
passport.serializeUser(function(doctor,done){
    done(null,doctor.id )
})
passport.deserializeUser(function(doctor,done){
    Doctor.getDoctorById(id,function(err,doctor){
        done(err,doctor)
    })
})
router.post('/docLog',
        passport.authenticate('local',{successRedirect:'/',failureRedirect:'/',failureFlash:false}),
        function(req,res) {
            console.log(req)
            console.log(res)
});
router.get('/patLog', function(req,res,next){
	res.render('patLogin')
});
module.exports = router;
