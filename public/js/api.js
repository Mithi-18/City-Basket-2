class Api {
  constructor() {
    // Determine base URL dynamically based on where the frontend is served.
    // When using Live Server or file:// it ensures we point to localhost:3000
    // If served from Express, it uses relative path.
    const isExternalServer = window.location.port !== '3000' && window.location.protocol !== 'file:';
    this.baseUrl = (isExternalServer || window.location.protocol === 'file:') ? 'http://localhost:3000/api' : '/api';
  }

  async get(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      return await response.json();
    } catch (err) {
      console.error(`API GET error on ${endpoint}:`, err);
      return { success: false, message: 'Network error' };
    }
  }

  async post(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      console.error(`API POST error on ${endpoint}:`, err);
      return { success: false, message: 'Network error' };
    }
  }

  async put(endpoint, data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      console.error(`API PUT error on ${endpoint}:`, err);
      return { success: false, message: 'Network error' };
    }
  }

  async delete(endpoint) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'DELETE'
      });
      return await response.json();
    } catch (err) {
      console.error(`API DELETE error on ${endpoint}:`, err);
      return { success: false, message: 'Network error' };
    }
  }

  // Products
  async getProducts(category = 'All', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    
    const qs = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/products${qs}`);
  }

  // Cart
  async getCart() { return this.get('/cart'); }
  async addToCart(productId, quantity = 1) { return this.post('/cart', { productId, quantity }); }
  async updateCartItem(productId, quantity) { return this.put(`/cart/${productId}`, { quantity }); }
  async removeFromCart(productId) { return this.delete(`/cart/${productId}`); }
  async clearCart() { return this.delete('/cart'); }

  // Orders
  async placeOrder(customerName) { return this.post('/orders', { customerName }); }
  async getOrders() { return this.get('/orders'); }
}

const api = new Api();
