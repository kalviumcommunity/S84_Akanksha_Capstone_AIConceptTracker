const express=require('express');
const router=express.Router();
const Concept=require('../models/conceptSchema');



router.get('/',async (req,res)=>{
    try{
        const concepts=await Concept.find().populate('userId','name email');
        res.json(concepts);

    }
    catch(error){
        res.status(500).json({error:'Failed to fetch concepts' ,details:error.message});

    }
});
router.get('/:id',async(req,res)=>{
    try{
        const concept=await Concept.findById(req.params.id).populate('userId','name email');
        if(!concept) {
            return res.status(404).json({error:'Concept not found'});
        }
        res.json(concept);

    }
    catch(error){
        res.status(500).json({error:'Failed to fetch concept',details:error.message});

    }
});

router.post('/',async (req,res)=>{
    
        const {title,description,status,userId}=req.body;
        if(!title||!userId){
            return res.status(400).json({error:'Title and userId are required'});

        }try{
        const newConcept=new Concept({title,description,status,userId});
        const savedConcept=await newConcept.save();
        res.status(201).json(savedConcept);
    }
    catch(error){
        res.status(500).json({error:'Failed to create concept',details:error.message});
    }
});
module.exports=router;