class App {
  constructor() {
    this.toastContainer = document.getElementById('toast-container');
    
    // Initialize UI modules
    this.productsUI = new ProductsUI();
    this.cartUI = new CartUI();
    this.checkoutUI = new CheckoutUI();
    
    this.init();
  }

  async init() {
    // Initial fetch
    await Promise.all([
      this.productsUI.fetchAndRender(),
      this.cartUI.fetchAndRender()
    ]);
    
    // Header effect on scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✅' : '❌';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    this.toastContainer.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// Start app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
