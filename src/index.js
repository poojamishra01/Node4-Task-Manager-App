const express=require('express')
require('./db/mongoose.js')
const userRouter=require('./routers/userrouter.js')
const taskRouter=require('./routers/taskrouter.js')

const app=express()

app.use(express.json())//for post http request method we need it
app.use(userRouter)//register with express routes
app.use(taskRouter)

const port=process.env.PORT ||3000

app.listen(port, ()=> {
    console.log('Server is up on '+port)
})