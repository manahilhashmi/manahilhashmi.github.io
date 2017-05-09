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
    res.render('docLogout');
});

router.get('/docLogout',function(req,res,next){
    res.render('docLogout')
})

router.get('/patLogout',function(req,res,next){
    res.render('patLogout')
})
passport.use(new LocalStrategy(
    function(username,password,done) {
        console.log('here1')
    Doctor.getDoctorByUsername(username,function(err,doctor){
        if (err){console.log(err)};
        if(!doctor){
            console.log("here2")
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
router.post('/docLog',function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){return next(err)}
        if(!user){return res.send(info)}
        req.LogIn(user,function(err){
            if(err){return next(err)}
            return res.redirect('/')
        })
    }) (req,res,next)
})
router.get('/patLog', function(req,res,next){
	res.render('patLogin')
});
module.exports = router;
