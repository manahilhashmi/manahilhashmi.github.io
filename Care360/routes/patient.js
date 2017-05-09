var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Patient=require('../models/patient.js')

/* GET users listing. */
router.get('/patLog', function(req, res, next) {
  res.render('patLogin');
});
router.get('/patLogout',function(req,res,next){
    res.render('patLogout')
})

router.get('/patReg',function(req,res,next){
    res.render('patReg')
})
passport.use(new LocalStrategy(
    function(username,password,done) {
    Patient.getPatientByUsername(username,function(err,patient){
        if (err){console.log(err)};
        if(!patient){
            console.log("here2")
            return done(null,false,{message:"Unknown User"})
        }
        Patient.comparePassword(password,password.password,function(err,isMatch){
            if (err) throw err;
            if(isMatch){
                console.log("authenticated")
                return done(null,patient)
            } else {
                console.log(patient)
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
passport.serializeUser(function(patient,done){
    done(null,patient.id )
})
passport.deserializeUser(function(patient,done){
    Patient.getPatientById(id,function(err,patient){
        done(err,patient)
    })
})
router.post('/patLog',function(req,res,next){
    passport.authenticate('local',function(err,user,info){
        if(err){return next(err)}
        if(!user){return res.send(info)}
        req.LogIn(user,function(err){
            if(err){return next(err)}
            return res.redirect('/')
        })
    }) (req,res,next)
})

module.exports = router;
