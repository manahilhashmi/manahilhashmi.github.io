var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Doctor=require('../models/doctor.js')
/* GET home page. */
router.get('/docLog',function(req,res,next) {
    res.render('docLogin');
});

router.get('/docLogout',function(req,res,next){
    res.render('docLogout')
})

router.get('/docReg',function(req,res,next){
    res.render('docReg')
})

router.post('/docReg',function(req,res,next){
    var doctor={
        fullName:req.body.FullName,
        registrationNumber:req.body.PMDCRegistraionNumber,
        emailId:req.body.EmailID,
        password:req.body.Password,
        clinicAddress:req.body.ClinicAddress,
        contactNumber:req.body.ContactNumber,
        Qualification:req.body.Qualification,
        specialization:req.body.Speacialization
    }
    Doctor.createDoctor(doctor,function(err,doctor){
        if(err) throw err
    })
    res.end('User Created')
})
passport.use('doctor-local',new LocalStrategy(
    function(username,password,done) {
    console.log(username) 
    Doctor.getDoctorByUsername(username,function(err,doctor){
        console.log('hello')
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
    console.log('break')
    passport.authenticate('doctor-local',function(err,user,info){
        if(err){return next(err)}
        if(!user){return res.send(info)}
        req.logIn(user,function(err){
            if(err){return next(err)}
            console.log('you have made it')
        })
    }) (req,res,next)
})
module.exports = router;
