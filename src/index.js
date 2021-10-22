const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./routers/userrouter.js')
const taskRouter=require('./routers/taskrouter.js')

const app=express()

// app.use((req,res,next)=> {
//     if(req.method=== 'GET')
//     {
//        res.send('GET request are diisabled') 
//         }
//     else{
//         next()
//     }
// })

const Task=require('./models/task')
const User=require('./models/user')

// const main=async()=>{
//     const user=await User.findById('617265c1b384c40cc01599ac')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }
// main()

app.use(express.json())//for post http request method we need it
app.use(userRouter)
app.use(taskRouter)

const port=process.env.PORT ||3000

app.listen(port, ()=> {
    console.log('Server is up on '+port)
})
