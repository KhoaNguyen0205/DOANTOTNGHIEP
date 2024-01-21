const mongoose = require('mongoose');
const {Timestamp} = require('mongodb');

const oderSchema = new mongoose.Schema({

},{
    timestamps:true
})
const Oder = mongoose.model('Oder', oderSchema);

module.exports = Oder;