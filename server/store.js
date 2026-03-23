const seedProducts = require('./data/products');

// In-memory data store
const store = {
  products: [...seedProducts],
  cart: [],
  orders: [],
  nextOrderId: 1001,

  // Product methods
  getAllProducts(category, search) {
    let results = this.products;
    if (category && category !== 'All') {
      results = results.filter(p => p.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return results;
  },

  getProductById(id) {
    return this.products.find(p => p.id === id);
  },

  getCategories() {
    return [...new Set(this.products.map(p => p.category))];
  },

  // Cart methods
  getCart() {
    return this.cart.map(item => {
      const product = this.getProductById(item.productId);
      return {
        ...item,
        product,
        subtotal: product ? +(product.price * item.quantity).toFixed(2) : 0
      };
    });
  },

  getCartTotal() {
    return +this.getCart().reduce((sum, item) => sum + item.subtotal, 0).toFixed(2);
  },

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  addToCart(productId, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return null;

    const existing = this.cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
    return this.getCart();
  },

  updateCartItem(productId, quantity) {
    const item = this.cart.find(item => item.productId === productId);
    if (!item) return null;

    if (quantity <= 0) {
      return this.removeFromCart(productId);
    }
    item.quantity = quantity;
    return this.getCart();
  },

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    return this.getCart();
  },

  clearCart() {
    this.cart = [];
    return [];
  },

  // Order methods
  placeOrder(customerName) {
    if (this.cart.length === 0) return null;

    const order = {
      id: this.nextOrderId++,
      items: this.getCart(),
      total: this.getCartTotal(),
      customerName: customerName || 'Guest',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    this.orders.push(order);
    this.clearCart();
    return order;
  },

  getAllOrders() {
    return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

module.exports = store;
