var mongoose = require('mongoose')
var bcrypt=require('bcryptjs')

var AppointmentSchema=mongoose.Schema({
    doctorName:{
        type:String
    },
    patientName:{
        type:String
    },
    date:{
        type:Date,
        index:true
    },
    time:{
        type:String
    }
})
var Appointment = module.exports = mongoose.model('appointments',AppointmentSchema);


module.exports.createAppointment=function (appointment,callback){
    var appoint=new Appointment(appointment)
        appoint.save(callback)
}

module.exports.getAppointmentByDoctor=function(doctor,callback){
    var query={doctorName:doctor}
    Appointment.find(query,callback)
}

module.exports.getAppointmentByDate=function(date,callback){
    Appointment.find(date,callback)
}
