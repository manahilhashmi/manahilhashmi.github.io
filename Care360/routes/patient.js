var express = require('express');
var router = express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy
var Patient=require('../models/patient.js')
var Appointment=require('../models/appointments.js')
var expressSession=require('express-session')
var bodyParser=require('body-parser')
var cookieParser=require('cookie-parser')
var Doctor=require('../models/doctor.js')
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

router.get('/',function(req,res,next){
    res.render('landing')
})
router.get('/patient/patLog',function(req,res,next) {
    res.render('patLogin');
});
router.get('/doctor/docLog',function(req,res,next) {
    res.render('docLogin');
});

router.get('/doctor/docLogout',function(req,res){
    req.logout()
    req.session.destroy()
    res.render('docLogout')
})
router.get('/patient/patLogout',function(req,res){
    req.logout()
    req.session.destroy()
    res.render('patLogout')
})

router.get('/patient/patReg',function(req,res,next){
    res.render('patReg')
})
router.get('/doctor/docReg',function(req,res,next){
    res.render('docReg')
})
router.get('/patient/',function(req,res,next){
   if(req.user){
        res.render('patHome',{Patient:req.user.fullName})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/cardiologist',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("cardiologists",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/psychologist',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("psychologist",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/physicians',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("physicians",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/ent',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("ent",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/pediatrician',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("pediatrician",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/dermatician',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("dermatician",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
})
router.get('/patient/dentist',function(req,res,next){
   if(req.user){
        var doctors=[]
        Doctor.getDoctorBytype("dentist",function(err,docs){
            doctors=docs
        });
        res.render('findDoc',{})
   }
   else {
    res.redirect('/patient/patLog')
    res.end()
   }
}
router.get('/doctor/',function(req,res,next){
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
router.get('/patient/findDoc',function(req,res,next){
    res.render('findDoc')
})
router.get('/patient/history',function(req,res,next){
    res.render('history')
})
router.get('/doctor/myPatients',function(req,res,next){
    res.render('myPatients')
})
router.get('/doctor/schedule',function(req,res,next){
    res.render('schedule')
})

router.get('/doctor/approveAppoint',function(req,res,next){
    res.render('approveAppoint')
})
router.get('/doctor/setClinicTimes',function(req,res,next){
    res.render('setClinicTimes')
})
router.post('/patient/patReg',function(req,res,next){
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
router.post('/doctor/docReg',function(req,res,next){
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

passport.use('patient-local',new LocalStrategy(
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
                return done(null,false,{message:'Invalid password'})
            }
        })
    })
}));
passport.use('doctor-local',new LocalStrategy(
    function(username,password,done) {
    console.log('here')
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

passport.serializeUser(function(patient,done){
    done(null,patient._id)
})
passport.deserializeUser(function(id,done){
    Patient.getPatientById(id,function(err,patient){
        if(err) done(err)
        if(patient){
            done(null,patient)
        } else {
            Doctor.getDoctorById(id,function(err,doctor){
                if(err) done(err)
                done(null,doctor)
            })
        }
    })
})
router.post('/patient/patLog',function(req,res,next){
    passport.authenticate('patient-local',function(err,user,info){
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

router.post('/doctor/docLog',function(req,res,next){
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
