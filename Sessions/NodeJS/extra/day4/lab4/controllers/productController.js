const Product = require('../Models/Products');


async function AddProdouct(req, res) {
    const {name,price,quantity} = req.body;
    const imageUrl=req.file.path;
    console.log(req.file.path);
    
    const data={name,price,quantity,imageUrl}
    let created = await Product.create(data);
    console.log(created);
    res.send("asd");
}
async function EditProduct(req, res) {
    const {name,price,quantity} = req.body;
    const imageUrl=req.file.path;
    console.log(req.file.path);
    const data={name,price,quantity,imageUrl}
    const {id} = req.params;
    let updated = await Product.findOneAndUpdate({_id:id},data);

    console.log(updated);
    res.send("updated");
}
async function DeleteProduct(req, res) {
    const data = req.body;
    const {id} = req.params;
    let deleted = await Product.findOneAndDelete({_id:id},data);

    console.log(deleted);
    res.send("deleted");
}

async function GetProduct(req, res) {
    // const data = req.body;
    const {id}=req.params;
    let result = await Product.find({_id:id});

    console.log(result);
    res.send(result);
}

async function GetAllProducts(req, res) {
    let Products = await Product.find();

    console.log(Products);
    res.send(Products);
}



module.exports = {AddProdouct,EditProduct,DeleteProduct,GetProduct,GetAllProducts};