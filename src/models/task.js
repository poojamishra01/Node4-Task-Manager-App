const mongoose=require('mongoose')
const Task=mongoose.model('Task',{
    //validation and sanitization
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports=Task