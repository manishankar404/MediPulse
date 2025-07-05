const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
    },
  batchNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Batch', batchSchema);
