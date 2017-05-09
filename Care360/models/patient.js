var mongoose = require('mongoose')
var bcrypt=require('bcryptjs')

var PatientSchema=mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    }
})
var Patient = module.exports = mongoose.model('patients',PatientSchema);

module.exports.createPatient=function (newPatient,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newPatient.password,salt,function(err,hash){
            newPatient.password=hash
            newPatient.save(callback)
        })
    })
}

module.exports.getPatientByUsername=function(username,callback){
    var query={username:username}
    Patient.findOne(query,callback)
}

module.exports.getUserById=function(id,callback){
    Patient.findById(id,callback)
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err
        callback(null,isMatch)
    })
}
