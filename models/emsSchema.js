const mongoose= require('mongoose')
const validator=require('validator')

const employeeSchema= new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Invalid email"
        }
    },
    
    phone:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:10,
        maxlength:13
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        trim:true
    },
    profile:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        trim:true
    }
})
const Employees=new mongoose.model('employees',employeeSchema)
module.exports=Employees