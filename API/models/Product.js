const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");


const productSchema = new mongoose.Schema({
    brand: {
        type: String,
        require: true,
    },
    name : {
        type: String,
        require: true
    },
    imagePaths :{
        type: [String],
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true,
    },
},
{
    timestamp: true,
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;