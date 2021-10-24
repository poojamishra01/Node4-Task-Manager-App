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



app.use(express.json())//for post http request method we need it
app.use(userRouter)
app.use(taskRouter)

const port=process.env.PORT

app.listen(port, ()=> {
    console.log('Server is up on '+port)
})
