const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    }
});
const conceptSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        required:true,

    }
});
const User=mongoose.model('User',userSchema);
const Concept=mongoose.model('Concept',conceptSchema);

module.exports={User,Concept};