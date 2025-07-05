const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  saleDate: {
    type: Date,
    default: Date.now
  },
  // Optional: price at sale time for reporting
  price: Number,
});

module.exports = mongoose.model('Sale', saleSchema);
