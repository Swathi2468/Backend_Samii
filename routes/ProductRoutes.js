const express = require("express");
const productController = require("../controllers/ProductController");

const router = express.Router();

router.post("/add-product/:firmId", productController.addProduct);
router.get("/:firmId/products",productController.getProductByFirm);

//route to get images
router.get('/uploads/:imageName', (req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

//route to delete
router.delete('/:productId', productController.deleteProductById);
module.exports=router;