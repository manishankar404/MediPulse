// controllers/reorderController.js
const Batch = require('../models/Batch');
const Product = require('../models/Product');
const PurchaseOrder = require('../models/PurchaseOrder');

const checkAndCreateReorders = async () => {
  try {
    const products = await Product.find();

    for (const product of products) {
      // Get all batches for this product
      const batches = await Batch.find({ product: product._id });

      const totalStock = batches.reduce((sum, batch) => sum + batch.quantity, 0);

      if (totalStock < product.reorderLevel) {
        const reorderQty = product.reorderLevel * 2;

        // Check if an open order already exists (optional)
        const existingOrder = await PurchaseOrder.findOne({
          product: product._id,
          status: 'pending' // optional field if you implement it
        });

        if (!existingOrder) {
          const order = new PurchaseOrder({
            product: product._id,
            quantity: reorderQty,
            status: 'pending',
            orderDate: new Date()
          });

          await order.save();
          console.log(`📦 Created purchase order for ${product.name}, qty: ${reorderQty}`);
        } else {
          console.log(`🔄 Skipping reorder: already exists for ${product.name}`);
        }
      }
    }

    console.log('✅ Reorder check complete');
  } catch (err) {
    console.error('❌ Reorder logic failed:', err.message);
  }
};

module.exports = { checkAndCreateReorders };
