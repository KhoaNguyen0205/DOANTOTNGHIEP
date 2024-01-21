const mongoose = require('mongoose');
const {Timestamp} = require('mongodb');

const FavoriteSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    productId:{type:mongoose.Schema.Types.ObjectId, ref:'Product',unique:true},
},{
    timestamps: true,
})

const FavoriteModel = mongoose.model('Favorite',FavoriteSchema);

module.exports = FavoriteModel;