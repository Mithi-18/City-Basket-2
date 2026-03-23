const express = require('express');
const store = require('../store');
const router = express.Router();

// POST /api/orders — place order { customerName }
router.post('/', (req, res) => {
  const { customerName } = req.body;
  const order = store.placeOrder(customerName);
  if (!order) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }
  res.status(201).json({ success: true, data: order });
});

// GET /api/orders — list all orders
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.getAllOrders()
  });
});

module.exports = router;
