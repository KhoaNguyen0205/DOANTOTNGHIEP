const mongoose = require('mongoose');
const {Timestamp} = require("mongodb");


const voucherSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require : true,
    },
    valueVoucher: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    }
},{
    timestamps:true
})

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;