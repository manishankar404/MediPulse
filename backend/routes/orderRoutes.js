const express = require('express');
const router = express.Router();
const PurchaseOrder = require('../models/PurchaseOrder');

// GET /api/orders
// Get all orders with optional filters (status, product)
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.product) filters.product = req.query.product;

    const orders = await PurchaseOrder.find(filters)
      .populate('product')
      .sort({ orderDate: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/orders/:id/status
// Update order status: pending, received, cancelled
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['pending', 'received', 'cancelled'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const order = await PurchaseOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/orders/:id
// Delete a purchase order
router.delete('/:id', async (req, res) => {
  try {
    const order = await PurchaseOrder.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
