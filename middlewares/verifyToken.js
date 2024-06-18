const Vendor= require("../models/Vendor");
const jwt =require("jsonwebtoken");
const dotenv= require("dotenv");

dotenv.config();

const secretKey= process.env.WhatIsYourName;

//middleware 
const verifyToken = async(req, res, next)=>{
    const token = req.headers.token; //we are passing a header with token to the token variable
     
    if(!token){
        return res.status(401).json({error:"token is required"})
    }
    try{
        const decoded = jwt.verify(token, secretKey)  //inbuilt method to verify
        const vendor = await Vendor.findById(decoded.vendorId);
        
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }

        req.vendorId= vendor._id

        next()
    }
    catch(error){
        console.error(error)
        return res.status(500).json({error: "Invalid token"});
    }
}
module.exports=verifyToken;