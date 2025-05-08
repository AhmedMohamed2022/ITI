const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    imageUrl:String
})

module.exports = mongoose.model("Products", productSchema);