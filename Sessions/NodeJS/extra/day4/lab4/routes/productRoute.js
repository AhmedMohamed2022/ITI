const express = require('express');
const route = express.Router();
const productController = require('../controllers/productController');
const uploadImg=require("../middleware/uploadImg");

route.post('/addProduct',uploadImg.single("file"),productController.AddProdouct)
route.patch('/editProduct/:id',uploadImg.single("file"),productController.EditProduct)
route.delete('/deleteProduct/:id', productController.DeleteProduct)
route.get('/getProduct/:id', productController.GetProduct)
route.get('/getAllProducts', productController.GetAllProducts)


module.exports = route;