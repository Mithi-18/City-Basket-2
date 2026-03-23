class CheckoutUI {
  constructor() {
    this.modal = document.getElementById('checkout-modal');
    this.closeBtn = document.getElementById('modal-close');
    this.formView = document.getElementById('checkout-form-view');
    this.confirmView = document.getElementById('order-confirm-view');
    
    this.summaryEl = document.getElementById('checkout-summary');
    this.formTotalEl = document.getElementById('form-total-amount');
    
    this.form = document.getElementById('checkout-form');
    this.nameInput = document.getElementById('customer-name');
    this.placeOrderBtn = document.getElementById('place-order-btn');
    
    // Success view elements
    this.orderIdEl = document.getElementById('order-id');
    this.orderDetailsEl = document.getElementById('order-details');
    this.continueBtn = document.getElementById('continue-shopping-btn');
    
    this.bindEvents();
  }

  bindEvents() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
    
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.placeOrder();
    });
    
    this.continueBtn.addEventListener('click', () => {
      this.close();
      this.reset();
      app.productsUI.fetchAndRender(); // refresh products
    });
  }

  async open() {
    const res = await api.getCart();
    if (!res || !res.success || res.count === 0) {
      app.showToast('Your cart is empty', 'error');
      return;
    }
    
    this.renderSummary(res.data, res.total);
    this.modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    this.nameInput.focus();
  }

  close() {
    this.modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  reset() {
    this.form.reset();
    this.formView.style.display = 'block';
    this.confirmView.style.display = 'none';
  }

  renderSummary(items, total) {
    this.summaryEl.innerHTML = items.map(item => `
      <div class="summary-item">
        <span>${item.quantity}x ${item.product.name}</span>
        <span>$${item.subtotal.toFixed(2)}</span>
      </div>
    `).join('');
    
    this.formTotalEl.textContent = `$${total.toFixed(2)}`;
  }

  async placeOrder() {
    const name = this.nameInput.value.trim();
    if (!name) return;
    
    const originalText = this.placeOrderBtn.innerHTML;
    this.placeOrderBtn.innerHTML = 'Processing...';
    this.placeOrderBtn.disabled = true;
    
    const res = await api.placeOrder(name);
    
    this.placeOrderBtn.innerHTML = originalText;
    this.placeOrderBtn.disabled = false;
    
    if (res && res.success) {
      this.showSuccess(res.data);
      app.cartUI.render([], 0, 0); // Clear cart UI
    } else {
      app.showToast(res ? res.message : 'Error placing order', 'error');
    }
  }

  showSuccess(order) {
    this.formView.style.display = 'none';
    this.confirmView.style.display = 'block';
    
    this.orderIdEl.textContent = `Order #${order.id}`;
    
    this.orderDetailsEl.innerHTML = `
      <div style="margin:1rem 0;padding:1rem;background:var(--background);border-radius:var(--radius-md);text-align:left">
        <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
          <span style="color:var(--text-secondary)">Total Paid:</span>
          <strong>$${order.total.toFixed(2)}</strong>
        </div>
        <div style="display:flex;justify-content:space-between">
          <span style="color:var(--text-secondary)">Items:</span>
          <strong>${order.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
        </div>
      </div>
    `;
  }
}
