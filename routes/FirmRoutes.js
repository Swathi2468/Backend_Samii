const express = require("express");
const firmController = require('../controllers/FirmControllers');
const verifyToken = require("../middlewares/verifyToken");

const router =express.Router() //to define route the method which is in router we are using

router.post('/add-firm', verifyToken,firmController.addFirm);

//route to get images
router.get('/uploads/:imageName', (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

//route to delete
router.delete('/:firmId', firmController.deleteFirmById);

module.exports= router;
