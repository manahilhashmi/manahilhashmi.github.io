var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Doctor=require('../models/doctor.js')
var Appointment=require('../models/appointments.js')
/* GET home page. */
router.get('/docLog',function(req,res,next) {
    res.render('docLogin');
});

router.get('/docLogout',function(req,res){
    req.logout()
    res.render('docLogout')
})

router.get('/docReg',function(req,res,next){
    res.render('docReg')
})

router.get('/',function(req,res,next){
    if(req.user){
        var appoints=0
        Appointment.getAppointmentByDoctor(req.user.fullName,function(err,appointments){
            appoints=appointments.length
        })
        res.render('docHome',{Doctor:req.user.fullName,num_appointments:appoints})
    }
    else{
        res.redirect('/doctor/docLog')
        res.end()
    }
})
router.get('/myPatients',function(req,res,next){
    res.render('myPatients')
})
router.get('/schedule',function(req,res,next){
    res.render('schedule')
})

router.get('/approveAppoint',function(req,res,next){
    res.render('approveAppoint')
})
router.get('/setClinicTimes',function(req,res,next){
    res.render('setClinicTimes')
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
    Doctor.getDoctorByUsername(username,function(err,doctor){
        if (err){console.log(err)};
        if(!doctor){
            return done(null,false,{message:"Unknown User"})
        }
        Doctor.comparePassword(password,doctor.password,function(err,isMatch){
            if (err) throw err;
            if(isMatch){
                return done(null,doctor,{message:'authenticated'})
            } else {
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
passport.serializeUser(function(doctor,done){
    done(null,doctor._id)
})
passport.deserializeUser(function(id,done){
    Doctor.getDoctorById(id,function(err,doctor){
        done(err,doctor)
    })
})
router.post('/docLog',function(req,res,next){
    passport.authenticate('doctor-local',function(err,user,info){
        if(err){return next(err)}
        if(!user){
            return res.send(info)
        }
        req.logIn(user,function(err){
            if(err){return next(err)}
            res.send({doctor:user,message:info.message})
        })
    }) (req,res,next)
})
module.exports = router;
