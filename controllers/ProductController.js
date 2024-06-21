const Firm = require("../models/Firm");
const Product = require("../models/Product");
const multer = require("multer");
const Vendor = require("../models/Vendor");
const path= require ('path');

//for images
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');//destination folder where the uploaded images will be stored
    },
    filename: function(req,file, cb){
        cb(null, Date.now() +path.extname(file.originalname));//creating a unique filename
    }
   });

   const upload = multer({storage: storage});

   const addProduct = async(req,res)=>{
     try{
            const {productName, price, category, bestseller, description} = req.body;
            const image= req.file? req.file.filename: undefined;
            
            const firmId = req.params.firmId;//to get the firm id
            const firm = await Firm.findById(firmId); //condition
    
            if(!firm){
             res.status(404).json({message: "firm not found"})
            }
            
            const product = new Product({
                productName, price, category, bestseller, description, image, firm: firm._id
            })
            const savedProduct = await product.save();
            firm.products.push(savedProduct);
            await firm.save()
            res.status(200).json(savedProduct)

     }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
     }
   }

   //method to get the products by the firm 
   const getProductByFirm = async(req,res)=>{
    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No firm found"})
        }

        const vendorName = Vendor.username;
        const restaurantName = firm.firmName; //this is adding to get the firm name to print that with procucts
        const products = await Product.find({firm: firmId});//this is to get the products.

        res.status(200).json({vendorName, restaurantName, products});
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
   }

   const deleteProductById = async(req,res)=>{
    try{
             const productId = req.params.productId;

             const deleteProduct = await Product.findByIdAndDelete(productId);
             if(!deleteProduct){
                return res.status(404).json({error:"No Product Found"})
             }
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
   }

   module.exports= {addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById};