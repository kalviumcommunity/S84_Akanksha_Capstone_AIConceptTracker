const express=require('express');
const mongoose=require('mongoose');
const {User,Concept}=require('./models/schema');
const cors=require('cors');
require('dotenv').config();
const app=express();
const port=process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("ConnEcetd to database")) 
    .catch((error)=>console.error("Failed to connect to database:",error));

app.get("/",(req,res)=>res.send({message:"Server is running"}));
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
});