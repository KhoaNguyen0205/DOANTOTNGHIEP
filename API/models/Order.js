const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

const orderSchema = new mongoose.Schema({
  productId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  quantity: {
    type: Number,

  },
  size: {
    type: Number,
    require: true,
  },
  addVoucher: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Voucher',
  },
  totalPrice: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true
  },

  nameOfCus: {
    type: String,
    require: true,
  },
  PhNb: {
    type: String,
    require: true,
  },
  paymentMethod: {
    type: String,
  },
  confirmed: {
    type:Boolean,
  },
  approve: {
    type: Boolean,
  },
  adminCheck: {
    type:Boolean,
  },
  success: {
    type: Boolean,
  },
  canceled: {
    type: Boolean,
  },
}, {
  timestamps: true
})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;