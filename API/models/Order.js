const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

const orderSchema = new mongoose.Schema({
  productID: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  quantity: {
    type: Number,

  },

  addVoucher: {
    type: String,
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
  approve: {
    type: Boolean,

  },
  success: {
    type: Boolean,
  }

}, {
  timestamps: true
})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;