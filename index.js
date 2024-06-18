const express= require("express"); //to import express
const dotenv= require("dotenv");//to import .env
const mongoose= require("mongoose");//to import mongoose
const venderRoutes= require("./routes/VendorRoutes");
const bodyParser= require("body-parser");
const firmRoutes = require("./routes/FirmRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cors = require("cors")
const path = require("path");

const app=express() //here we are assigning the methods in express to app variable

const PORT= 4000;//creating the port number as 4000

dotenv.config()//this is to help to axis info in the .env file
app.use(cors());

mongoose.connect(process.env.mongo_url)//this will help to connect mongoo_url
.then(()=>console.log("Mongodb connected sucessfully"))//this is a promiss
.catch((error)=>console.log(error))

app.use(bodyParser.json());
app.use('/vendor',venderRoutes );//middleware to create http request
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
//based on server creating a router 
app.use('/uploads', express.static('uploads'));

app.use('/home' ,(req,res)=>{
    res.send("<h1>Welcome to SAMII");
})


//to start the server

app.listen(PORT,()=>{
  console.log(`Server started and  running sucessfully at ${PORT} `)
})

