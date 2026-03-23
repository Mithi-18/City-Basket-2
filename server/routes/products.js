const express = require('express');
const store = require('../store');
const router = express.Router();

// GET /api/products — list all products (supports ?category= & ?search=)
router.get('/', (req, res) => {
  const { category, search } = req.query;
  const products = store.getAllProducts(category, search);
  res.json({
    success: true,
    count: products.length,
    categories: store.getCategories(),
    data: products
  });
});

// GET /api/products/:id — get single product
router.get('/:id', (req, res) => {
  const product = store.getProductById(parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

module.exports = router;
