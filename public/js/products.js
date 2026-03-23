class ProductsUI {
  constructor() {
    this.grid = document.getElementById('product-grid');
    this.emptyState = document.getElementById('empty-state');
    this.countEl = document.getElementById('product-count');
    this.titleEl = document.getElementById('section-title');
    
    // Filters
    this.currentCategory = 'All';
    this.currentSearch = '';
    
    // Bind UI elements
    this.categoryBtns = document.querySelectorAll('.category-btn');
    this.searchInput = document.getElementById('search-input');
    this.searchClear = document.getElementById('search-clear');
    
    this.bindEvents();
  }

  bindEvents() {
    // Category click
    this.categoryBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.category;
        
        // Update active class
        this.categoryBtns.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Fetch new data
        this.currentCategory = cat;
        this.titleEl.textContent = cat === 'All' ? 'All Products' : `${cat}`;
        this.fetchAndRender();
      });
    });

    // Search input (debounce)
    let timeout;
    this.searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      this.searchClear.style.display = val ? 'block' : 'none';
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.currentSearch = val;
        this.fetchAndRender();
      }, 300);
    });

    // Clear search
    this.searchClear.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchClear.style.display = 'none';
      this.currentSearch = '';
      this.fetchAndRender();
    });
  }

  async fetchAndRender() {
    this.grid.style.opacity = '0.5';
    const res = await api.getProducts(this.currentCategory, this.currentSearch);
    this.grid.style.opacity = '1';
    
    if (res && res.success) {
      this.render(res.data);
    }
  }

  render(products) {
    this.countEl.textContent = `${products.length} items`;
    
    if (products.length === 0) {
      this.grid.style.display = 'none';
      this.emptyState.style.display = 'block';
    } else {
      this.emptyState.style.display = 'none';
      this.grid.style.display = 'grid';
      this.grid.innerHTML = products.map(p => this.createProductCard(p)).join('');
      
      // Bind Add buttons
      this.grid.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = parseInt(btn.dataset.id);
          const name = btn.dataset.name;
          app.cartUI.addItem(id, name);
        });
      });
    }
  }

  createProductCard(product) {
    return `
      <div class="product-card">
        <div class="product-image-wrap">${product.image}</div>
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-unit" style="margin-bottom:0.5rem;font-size:0.8rem;color:var(--text-secondary)">
          ${product.description}
        </p>
        <div class="product-price-row">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="product-unit">/ ${product.unit}</span>
        </div>
        <button class="add-btn" data-id="${product.id}" data-name="${product.name}">
          <span>🛒</span> Add to Cart
        </button>
      </div>
    `;
  }
}
