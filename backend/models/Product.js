const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: String,
  category: String,
  price: Number,
  reorderLevel: {
    type: Number,
    default: 10,
  },
  unit: {
    type: String,
    default: 'tablet', // or 'ml', 'bottle', etc.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Product', productSchema);
