const vendorController = require('../controllers/VendorController');

const express= require('express')

const router = express.Router();

router.post('/register',vendorController.vendorRegister);
 //we have mentioned post because we are taking the given register data and posting it in the db and getting that from vendercontrollers in that vender register

 router.post('/login', vendorController.vendorLogin);
 //creating router for login
 
 router.get('/all-vendors',vendorController.getAllVendors);
 //creating router for getallvendors function in vendorcontrollers

 router.get('/single-vendor/:id', vendorController.getVendorById);
 //creating router
 module.exports= router;