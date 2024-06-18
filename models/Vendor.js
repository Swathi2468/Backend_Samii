const mongoose = require("mongoose");

const vendorSchema= new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
       type: String,
       required: true,
       unique: true
    },
    password:{
        type: String,
        required: true
    },
    firm:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
});
const Vendor= mongoose.model('Vendor', vendorSchema);// created a mongoo schema

module.exports= Vendor; //exporting to import where ever u need
//here we have created model and created schemas inside the model 
//if we want to use this model then we have to export here and  import it where u needed..