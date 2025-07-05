const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const Product = require('../models/Product');

// Create a new batch with product validation
router.post('/', async (req, res) => {
  try {
    const { product, batchNumber, expiryDate, quantity, purchaseDate } = req.body;

    // Validate referenced product exists
    const productExists = await Product.findById(product);
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found. Please provide a valid product ID.' });
    }

    // Create and save batch
    const batch = new Batch({
      product, // already an ObjectId
      batchNumber,
      expiryDate,
      quantity,
      purchaseDate: purchaseDate || new Date()
    });

    await batch.save();
    res.status(201).json(batch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all batches
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find().populate('product');
    res.json(batches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
