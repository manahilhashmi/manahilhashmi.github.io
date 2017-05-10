var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrat=require('passport-local').Strategy
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

router.get('/',function(req,res,next){
    res.render('patHome')
})
passport.use(new LocalStrat(
    function(username,password,done) {
    Patient.getPatientByUsername(username,function(err,patient){
        if (err){console.log(err)};
        if(!patient){
            return done(null,false,{message:"Unknown User"})
        }
        Patient.comparePassword(password,patient.password,function(err,isMatch){
            if (err) throw err;
            if(isMatch){
                return done(null,patient,{message:'authenticated'})
            } else {
                console.log(patient)
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
passport.serializeUser(function(patient,done){
    done(null,patient._id )
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
        req.logIn(user,function(err){
            if(err){return next(err)}
            res.send({patient:user,message:info.message}) 
        })
    }) (req,res,next)
})

router.post('/patReg',function(req,res,next){
    var patient={
        fullName:req.body.FullName,
        contactNumber:req.body.ContactNumber,
        emailId:req.body.EmailID,
        password:req.body.Password,
        age:req.body.Age,
        weight:req.body.Weight,
        height:req.body.Height,
    }
    Patient.createPatient(patient,function(err,patient){
        if(err) throw err
    })
    res.end('User Created')
})
module.exports = router;
