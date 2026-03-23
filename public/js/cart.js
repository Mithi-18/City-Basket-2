class CartUI {
  constructor() {
    // Elements
    this.sidebar = document.getElementById('cart-sidebar');
    this.overlay = document.getElementById('cart-overlay');
    this.toggleBtn = document.getElementById('cart-toggle');
    this.closeBtn = document.getElementById('cart-close');
    this.badge = document.getElementById('cart-badge');
    
    this.bodyEl = document.getElementById('cart-body');
    this.itemsEl = document.getElementById('cart-items');
    this.emptyEl = document.getElementById('cart-empty');
    this.footerEl = document.getElementById('cart-footer');
    this.totalEl = document.getElementById('cart-total');
    this.clearBtn = document.getElementById('clear-cart-btn');
    this.checkoutBtn = document.getElementById('checkout-btn');
    
    this.bindEvents();
  }

  bindEvents() {
    this.toggleBtn.addEventListener('click', () => this.open());
    this.closeBtn.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', () => this.close());
    
    this.clearBtn.addEventListener('click', () => this.clearCart());
    this.checkoutBtn.addEventListener('click', () => {
      this.close();
      app.checkoutUI.open();
    });

    // Delegate events for cart item controls
    this.itemsEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      
      const productId = parseInt(btn.dataset.id);
      
      if (btn.classList.contains('qty-inc')) {
        const qty = parseInt(btn.dataset.qty) + 1;
        this.updateItem(productId, qty);
      } else if (btn.classList.contains('qty-dec')) {
        const qty = parseInt(btn.dataset.qty) - 1;
        this.updateItem(productId, qty);
      } else if (btn.classList.contains('cart-item-remove')) {
        this.removeItem(productId);
      }
    });
  }

  open() {
    this.sidebar.classList.add('open');
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.sidebar.classList.remove('open');
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  async fetchAndRender() {
    const res = await api.getCart();
    if (res && res.success) {
      this.render(res.data, res.total, res.count);
    }
  }

  async addItem(productId, productName) {
    const res = await api.addToCart(productId, 1);
    if (res && res.success) {
      this.render(res.data, res.total, res.count);
      app.showToast(`🛒 Added ${productName} to cart`);
      
      // Animate badge
      this.badge.style.animation = 'none';
      this.badge.offsetHeight; // trigger reflow
      this.badge.style.animation = 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }
  }

  async updateItem(productId, quantity) {
    const res = await api.updateCartItem(productId, quantity);
    if (res && res.success) {
      this.render(res.data, res.total, res.count);
    }
  }

  async removeItem(productId) {
    const res = await api.removeFromCart(productId);
    if (res && res.success) {
      this.render(res.data, res.total, res.count);
    }
  }

  async clearCart() {
    const res = await api.clearCart();
    if (res && res.success) {
      this.render([], 0, 0);
    }
  }

  render(items, total, count) {
    // Update badge
    this.badge.textContent = count;
    this.badge.style.display = count > 0 ? 'flex' : 'none';
    
    // Total
    this.totalEl.textContent = `$${total.toFixed(2)}`;
    
    if (count === 0) {
      this.emptyEl.style.display = 'flex';
      this.itemsEl.innerHTML = '';
      this.footerEl.style.display = 'none';
    } else {
      this.emptyEl.style.display = 'none';
      this.footerEl.style.display = 'block';
      this.itemsEl.innerHTML = items.map(item => this.createCartItem(item)).join('');
    }
  }

  createCartItem(item) {
    if (!item.product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item-img">${item.product.image}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">$${item.product.price.toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-controls">
              <button class="qty-btn qty-dec" data-id="${item.productId}" data-qty="${item.quantity}">-</button>
              <div class="qty-val">${item.quantity}</div>
              <button class="qty-btn qty-inc" data-id="${item.productId}" data-qty="${item.quantity}">+</button>
            </div>
            <button class="cart-item-remove" data-id="${item.productId}">Remove</button>
          </div>
        </div>
      </div>
    `;
  }
}
