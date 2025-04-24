const express=require('express');
const router=express.Router();
const User=require('../models/userSchema');
const bcrypt=require('bcryptjs');
router.get('/',async(req,res)=>{
    try{
        const users=await User.find().select('-password');
        res.json(users);
        }catch(error){
            res.status(500).json({error:'Failed to fetch users',details:error.message});

        }
});
router.post('/',async(req ,res)=>{
    try{const {name,email,password}=req.body;
    const existingUser=await User.findOne({email});
    if(existingUser){
        return res.status(400).json({error:'User already exists'});

    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User ({name,email,password:hashedPassword});
    const savedUser=await newUser.save();
    res.status(201).json({
        _id:savedUser._id,
        name:savedUser.name,
        email:savedUser.email,
        message:'User Created'
    });

}catch(error){
    res.status(500).json({error:'Failed to create user',details:error.message});
}
});

module.exports=router;