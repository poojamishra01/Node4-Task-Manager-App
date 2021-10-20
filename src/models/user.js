const mongoose=require('mongoose')
const validator=require('validator')

const User=mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
        
    },
    age:{
        type:Number,
        default:0,
        //custom validation
        validate(value){
            if(value<0)
            {
              throw new Error('Age must be a positive number')
            }
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
            
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value)
        {
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("Password should not include 'password'")
            }
        }

    }
})
module.exports=User