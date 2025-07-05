const PurchaseOrder = require('../models/PurchaseOrder');
const Batch = require('../models/Batch');
const Product = require('../models/Product');

async function checkAndCreateReorders() {
  // Fetch all products
  const products = await Product.find();

  for (const product of products) {
    // Aggregate total stock across batches for this product
    const batches = await Batch.find({ product: product._id });
    const totalStock = batches.reduce((sum, b) => sum + b.quantity, 0);

    // If stock below reorder level, create a purchase order
    if (totalStock <= product.reorderLevel) {
      // Check if a pending purchase order already exists to avoid duplicates
      const existingPO = await PurchaseOrder.findOne({
        product: product._id,
        status: 'pending',
      });
      if (!existingPO) {
        // Decide reorder quantity (e.g., reorderLevel * 2)
        const orderQuantity = product.reorderLevel * 2;

        const po = new PurchaseOrder({
          product: product._id,
          orderQuantity,
          notes: `Auto-generated reorder for product ${product.name}`,
        });

        await po.save();
        console.log(`Created purchase order for ${product.name} qty ${orderQuantity}`);
      }
    }
  }
}

module.exports = checkAndCreateReorders;
