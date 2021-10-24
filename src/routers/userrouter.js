const express=require('express')
const User=require('../models/user')
const auth=require('../middleware/auth')
const multer=require('multer')
const sharp=require('sharp')
const router=express.Router()
router.post('/users',async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login',async (req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email, req.body.password)
        const token=await user.generateAuthToken()
       // console.log(token)
        res.send({user,token})
    }catch(e)
    {
        res.status(400).send()
    }

})


////ERROR IN THIS CODE
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }
    catch(e)
    {
        res.status(500).send()
    }
})

router.post('/users/logoutall',auth,async(req,res)=>{
        try{
req.user.tokens=[]
await req.user.save()
res.send()
        }
        catch(e)
        {
            res.status(500).send()
        }
})

router.get('/users/me',auth ,async (req,res)=>{
    res.send(req.user)
})


///profile pic upload
const upload=multer({
   
    limits:{
        filSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/))
        {
            cb(new Error('Unsupported file format for image.Please upload a valid file.'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar',auth,upload.single('avatar'),async(req   ,res)=>{
       const buffer=await sharp(req.file.buffer).png().resize({width:250,height:250}).toBuffer()
       req.user.avatar= buffer
       await req.user.save()
       res.send()
    
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


//delete profile image
router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send('Avatar Deleted!')  
})

//get Profile avatar
router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user ||!user.avatar)
        {
        throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e)
    {
        res.status(404).send()
    }

})





router.patch('/users/me',auth,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdate=['name','email','password','age']
    const isvalidUpdate=updates.every((update)=> allowedUpdate.includes(update))

    if(!isvalidUpdate)
    {
        return res.status(400).send({error:"Inavlid Updates!"})
    }
    try{   
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{ new:true,runValidators:true})
        res.send(req.user)
    }catch(e)
    {
        res.status(400).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try{
        // const user=await  User.findByIdAndDelete(req.user._i)
        // if(!user)
        // {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    }catch(e)
    {
        res.status(500).send()
    }
})




module.exports=router