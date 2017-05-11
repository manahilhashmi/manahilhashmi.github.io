var mongoose = require('mongoose')
var bcrypt=require('bcryptjs')

var DoctorSchema=mongoose.Schema({
    fullName:{
        type:String
    },
    registrationNumber:{
        type:String
    },
    emailId:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    clinicAddress:{
        type:String
    },
    contactNumber:{
        type:String
    },
    Qualification:{
        type:String
    },
    specialization:{
        type:String
    }
})
var Doctor = module.exports = mongoose.model('doctors',DoctorSchema);

module.exports.createDoctor=function (newDoctor,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newDoctor.password,salt,function(err,hash){
            newDoctor.password=hash
            var doc=new Doctor(newDoctor)
            doc.save(callback)
        })
    })
}

module.exports.getDoctorByUsername=function(emailId,callback){
    var query={emailId:emailId}
    Doctor.findOne(query,callback)
}
module.exports.getDoctorBytype=function(type,callback){
    var query={specialization:type}
    Doctor.find(query,callback)
}
module.exports.getDoctorById=function(id,callback){
    Doctor.findById(id,callback)
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err
        callback(null,isMatch)
    })
}
