var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Doctor=require('../models/doctor.js')
var Appointment=require('../models/appointments.js')
var expressSession=require('express-session')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
/* GET home page. */
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
router.use(cookieParser(process.env.SESSION_SECRET || 'secretHaseeb'));
router.use(expressSession({
    secret:process.env.SESSION_SECRET || 'secretHaseeb',
    resave:false,
    saveUninitialized:false
}));

router.use(passport.initialize());
router.use(passport.session());





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
passport.serializeUser(function(doctor,done){
    done(null,doctor._id)
})
passport.deserializeUser(function(id,done){
    Doctor.getDoctorById(id,function(err,doctor){
        done(err,doctor)
    })
})
module.exports = router;
