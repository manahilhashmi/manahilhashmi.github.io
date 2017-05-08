var mongoose = require('mongoose')
var bcrypt=require('bcryptjs')

var DoctorSchema=mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    }
})
module.exports=mongoose.model('Doctor',DoctorSchema);

module.exports.createDoctor=function (newDoctor,callback){
    bycrypt.genSalt(10,function(err,salt){
        bycrypt.hash(newDoctor.password,salt,function(err,hash){
            newDoctor.password=hash
            newDoctor.save(callback)
        })
    })
}

module.exports.getDoctorByUsername=function(username,callback){
    var query={username:username}
    Doctor.findOne(query,callback)
}

module.exports.getUserById=function(id,callback){
    Doctor.findById(id,callback)
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bycrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err) throw err
        callback(null,isMatch)
    })
}
