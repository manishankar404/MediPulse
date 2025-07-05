const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');
const Batch = require('../models/Batch');

// Create a new sale and update batch stock
router.post('/', async (req, res) => {
  try {
    const { product, quantity } = req.body;

    if (!product || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Product and positive quantity are required' });
    }

    // Find batches for the product sorted by earliest expiry
    let batches = await Batch.find({ product, quantity: { $gt: 0 } }).sort({ expiryDate: 1 });

    let remainingQty = quantity;
    for (let batch of batches) {
      if (batch.quantity >= remainingQty) {
        batch.quantity -= remainingQty;
        await batch.save();
        remainingQty = 0;
        break;
      } else {
        remainingQty -= batch.quantity;
        batch.quantity = 0;
        await batch.save();
      }
    }

    if (remainingQty > 0) {
      return res.status(400).json({ error: 'Insufficient stock in batches' });
    }

    // Create sale record
    const sale = new Sale({ product, quantity });
    await sale.save();

    res.status(201).json({ message: 'Sale recorded and stock updated', sale });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('product');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
