const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'ordered', 'received', 'cancelled'],
    default: 'pending',
  },
  expectedDeliveryDate: Date,
  notes: String,
});

module.exports = mongoose.model('PurchaseOrder', purchaseOrderSchema);

