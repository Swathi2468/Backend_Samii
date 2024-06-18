const Firm= require("../models/Firm");
const Vendor= require("../models/Vendor");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/');//destination folder where the uploaded images will be stored
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + path.extname(file.originalname));//creating a unique filename
    }
   });

   const upload = multer({storage: storage});


const addFirm = async(req,res)=>{
   try{
    const {firmName, area, category, region, offer} = req.body
    
   const image= req.file? req.file.filename: undefined;

   const vendor = await Vendor.findById(req.vendorId);
    
   if(!vendor){
    res.status(404).json({message: "vendor not found"})
   }

   const firm = new Firm({
    firmName, area, category, region, offer,image, vendor: vendor._id
   })

   const savedFirm= await firm.save();
   vendor.firm.push(savedFirm)

   await vendor.save()


   return res.status(200).json({message: 'firm added successfully'});

   }
   catch(error){
     console.error(error)
     res.status(500).json({message:"Internal server error"})
   }

}

const deleteFirmById = async(req,res)=>{
    try{
             const firmId = req.params.firmId;

             const deleteFirm = await Firm.findByIdAndDelete(firmId);
             if(!deleteFirm){
                return res.status(404).json({error:"No Firm Found"})
             }
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Internal server error"})
    }
   }

module.exports={addFirm: [upload.single('image'), addFirm], deleteFirmById}