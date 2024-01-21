const mongoose = require('mongoose');
const {Timestamp} = require('mongodb');

const cartSchema = new mongoose.Schema({
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productId: {type: mongoose.Schema.Types.ObjectId,ref:'Product'},
    quantity:{
        type:Number,
    },
    size:{
        type: Number,
    },
    
},{
    timeStamps:true,
})

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;