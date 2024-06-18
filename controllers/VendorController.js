const Vendor = require('../models/Vendor'); //importing vendor model to creat controllers to vendor
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv');

dotenv.config();
const secretKey= process.env.WhatIsYourName; //here by using the secret key which has given in the .env file 

const vendorRegister = async(req, res)=>{
    const{ username, email, password }= req.body; //here if we wnt to save the data given by the body into db then we have to create instance method called newvendor that helps to store the data into db
    try{
        const vendorEmail = await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json({error:"Email already taken"});
        }
        const hashedPassword= await bcrypt.hash(password, 10);

        const newVendor =new Vendor(
            {
                username,
                email,
                password: hashedPassword
            });
            await newVendor.save(); //herr we are saving the new vendor
            
            res.status(201).json({message:"vendor registered sucessfully"})
            console.log('Registered')

    }catch(error){
        console.error(error);//this helps to check the acctual error
        res.status(500).json({error: 'Internal Server Error'})
    }
}


//for login
//in this vendorLogin we are creating r generating token based on id because after login only we have to generate tokens so in vendor login we are doing that
const vendorLogin = async(req,res)=>{
    const{email, password}=req.body; //here email and password are comming from the body

    try{
        const vendor= await Vendor.findOne({email}); //here by using the findone we are getting the email from the vendor model
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){    //here condition to check/ compare weather given password from vendor and db stored password was same r not, and we have given await because it takes time to check the bycrypted password soo
            return res.status(401).json({error: "Invalid mail r password"})   //if not error message 
        }
     
        const token = jwt.sign({vendorId: vendor._id}, secretKey, {expiresIn: "1h"} )   //jwt sign is a inbuilt methods by using sign we will generate token for wt we need, then secretkey which we have created in .env file then expires time our wish
        
        res.status(200).json({sucess:"Login succesfull", token}); // if sucessfull then sucess message
        console.log(email , "this is TOKEN", token);
    }
    catch(error){
      console.log(error);
      res.status(500).json({error:"Internal sever error"})
    }
}

const getAllVendors= async(req, res)=>{
    try{
        const vendors = await Vendor.find().populate('firm')  //here populate is the methode here we want to show the data from firm to vendor so we have given it in the populate methodh
        res.json({vendors})

    }catch(error){
     console.log(error);
     res.status(500).json({error: "Internal server error"});
    }
}

const getVendorById = async(req,res)=>{
    const vendorId= req.params.id;
    try{
        const vendor = await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"Vendor not found"})
        }
        res.status(200).json({vendor})
    }
    catch(error){
        console.log(error);
     res.status(500).json({error: "Internal server error"});
    }
}

module.exports= {vendorRegister, vendorLogin, getAllVendors, getVendorById}

