var mongoose = require('mongoose')
var bcrypt=require('bcryptjs')

var PatientSchema=mongoose.Schema({
    fullName:{
        type:String
    },
    ContactNumber:{
        type:String
    },
    emailId:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    age:{
        type:String
    },
    weight:{
        type:String
    },
    height:{
        type:String
    }
})
var Patient = module.exports = mongoose.model('patients',PatientSchema);

module.exports.createPatient=function (newPatient,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newPatient.password,salt,function(err,hash){
            var patient=new Patient(newPatient)
            patient.password=hash
            patient.save(callback)
        })
    })
}

module.exports.getPatientByUsername=function(emailId,callback){
    var query={emailId:emailId}
    Patient.findOne(query,callback)
}

module.exports.getPatientById=function(id,callback){
    Patient.findById(id,callback)
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err
        callback(null,isMatch)
    })
}
