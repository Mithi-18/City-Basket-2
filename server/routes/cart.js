const express = require('express');
const store = require('../store');
const router = express.Router();

// GET /api/cart — get current cart
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: store.getCart(),
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// POST /api/cart — add item { productId, quantity }
router.post('/', (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ success: false, message: 'productId is required' });
  }
  const cart = store.addToCart(parseInt(productId), parseInt(quantity) || 1);
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({
    success: true,
    data: cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// PUT /api/cart/:productId — update quantity { quantity }
router.put('/:productId', (req, res) => {
  const { quantity } = req.body;
  const cart = store.updateCartItem(parseInt(req.params.productId), parseInt(quantity));
  if (!cart) {
    return res.status(404).json({ success: false, message: 'Item not in cart' });
  }
  res.json({
    success: true,
    data: cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// DELETE /api/cart/:productId — remove item
router.delete('/:productId', (req, res) => {
  const cart = store.removeFromCart(parseInt(req.params.productId));
  res.json({
    success: true,
    data: cart,
    total: store.getCartTotal(),
    count: store.getCartCount()
  });
});

// DELETE /api/cart — clear entire cart
router.delete('/', (req, res) => {
  store.clearCart();
  res.json({
    success: true,
    data: [],
    total: 0,
    count: 0
  });
});

module.exports = router;
