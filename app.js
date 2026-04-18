/* ============================================================
   STYLIN' — App Logic
   ============================================================ */

(() => {
  'use strict';

  // ──────────────────────────────────────────────
  //  DATA
  // ──────────────────────────────────────────────

  const STYLE_TAGS = [
    { label: 'Minimalist',    color: '#0A84FF', confidence: 94, primary: true  },
    { label: 'Earth Tones',   color: '#8B7355', confidence: 87, primary: false },
    { label: 'Clean Lines',   color: '#636366', confidence: 82, primary: false },
    { label: 'Neutral Palette', color: '#A0916B', confidence: 78, primary: false },
    { label: 'Streetwear',    color: '#48484A', confidence: 62, primary: false },
    { label: 'Casual Luxe',   color: '#2C2C2E', confidence: 55, primary: false },
  ];

  const PRODUCTS = [
    {
      id: 1,
      brand: 'COS',
      name: 'Linen-Blend Oversized Blazer',
      price: 175,
      originalPrice: 250,
      match: 96,
      image: 'assets/product_blazer.png',
    },
    {
      id: 2,
      brand: 'Everlane',
      name: 'The Organic Cotton Crew',
      price: 38,
      originalPrice: null,
      match: 93,
      image: 'assets/product_tshirt.png',
    },
    {
      id: 3,
      brand: 'Arket',
      name: 'Relaxed Cargo Trousers',
      price: 89,
      originalPrice: 120,
      match: 91,
      image: 'assets/product_pants.png',
    },
    {
      id: 4,
      brand: 'Mansur Gavriel',
      name: 'Cloud Crossbody Bag',
      price: 295,
      originalPrice: null,
      match: 88,
      image: 'assets/product_bag.png',
    },
    {
      id: 5,
      brand: 'Common Projects',
      name: 'Original Achilles Low',
      price: 340,
      originalPrice: 425,
      match: 85,
      image: 'assets/product_sneakers.png',
    },
    {
      id: 6,
      brand: 'Auralee',
      name: 'Super Fine Wool Knit',
      price: 210,
      originalPrice: null,
      match: 82,
      image: 'assets/product_sweater.png',
    },
  ];

  const AI_PHRASES = [
    'AI Analyzing Style...',
    'Detecting color palette...',
    'Matching silhouettes...',
    'Identifying trends...',
    'Curating picks for you...',
  ];

  // ──────────────────────────────────────────────
  //  DOM REFERENCES
  // ──────────────────────────────────────────────

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const scannerImage    = $('#scannerImage');
  const scannerArea     = $('#scannerArea');
  const uploadOverlay   = $('#uploadOverlay');
  const fileInput       = $('#fileInput');
  const statusText      = $('#statusText');
  const styleTags       = $('#styleTags');
  const productGrid     = $('#productGrid');
  const fabCamera       = $('#fabCamera');
  const cartToast       = $('#cartToast');
  const toastMessage    = $('#toastMessage');
  const statusTime      = $('#statusTime');

  // ──────────────────────────────────────────────
  //  STATUS BAR CLOCK
  // ──────────────────────────────────────────────

  function updateClock() {
    const now = new Date();
    const h   = now.getHours().toString().padStart(2, '0');
    const m   = now.getMinutes().toString().padStart(2, '0');
    statusTime.textContent = `${h}:${m}`;
  }
  updateClock();
  setInterval(updateClock, 10_000);

  // ──────────────────────────────────────────────
  //  RENDER STYLE TAGS
  // ──────────────────────────────────────────────

  function renderStyleTags() {
    styleTags.innerHTML = STYLE_TAGS.map((tag) => {
      const cls = tag.primary ? 'style-tag--primary' : 'style-tag--secondary';
      const dot = tag.primary
        ? ''
        : `<span class="style-tag__dot" style="background:${tag.color}"></span>`;
      return `
        <span class="style-tag ${cls}" data-label="${tag.label}">
          ${dot}
          ${tag.label}
          <span class="style-tag__confidence">${tag.confidence}%</span>
        </span>
      `;
    }).join('');

    // Toggle active on click
    styleTags.addEventListener('click', (e) => {
      const tag = e.target.closest('.style-tag');
      if (!tag) return;

      // Visual feedback
      tag.style.transform = 'scale(0.92)';
      setTimeout(() => { tag.style.transform = ''; }, 150);
    });
  }

  // ──────────────────────────────────────────────
  //  RENDER PRODUCT GRID
  // ──────────────────────────────────────────────

  function renderProducts() {
    productGrid.innerHTML = PRODUCTS.map((p) => {
      const origPrice = p.originalPrice
        ? `<span class="product-card__price-original">$${p.originalPrice}</span>`
        : '';

      return `
        <article class="product-card" data-product-id="${p.id}">
          <div class="product-card__image-wrapper">
            <img class="product-card__image" src="${p.image}" alt="${p.name}" loading="lazy" />
            <span class="product-card__match">
              <span class="product-card__match-dot"></span>
              ${p.match}% Match
            </span>
            <button class="product-card__wishlist" aria-label="Add to wishlist" data-wishlist="${p.id}">
              <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <div class="product-card__info">
            <div class="product-card__brand">${p.brand}</div>
            <div class="product-card__name">${p.name}</div>
            <div class="product-card__footer">
              <span class="product-card__price">$${p.price}${origPrice}</span>
              <button class="btn-cart" data-cart="${p.id}">
                <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                Add
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ──────────────────────────────────────────────
  //  IMAGE LOADING
  // ──────────────────────────────────────────────

  function onImageLoad() {
    scannerImage.classList.add('loaded');
    uploadOverlay.classList.remove('visible');
  }

  if (scannerImage.complete && scannerImage.naturalWidth) {
    onImageLoad();
  } else {
    scannerImage.addEventListener('load', onImageLoad);
  }

  // ──────────────────────────────────────────────
  //  FILE UPLOAD / CAMERA
  // ──────────────────────────────────────────────

  function openFilePicker() {
    fileInput.click();
  }

  uploadOverlay.addEventListener('click', openFilePicker);
  fabCamera.addEventListener('click', openFilePicker);

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      scannerImage.classList.remove('loaded');
      scannerImage.src = ev.target.result;
      scannerImage.addEventListener('load', () => {
        scannerImage.classList.add('loaded');
        // Reset scan animation
        const laser = $('#scannerLaser');
        laser.style.animation = 'none';
        laser.offsetHeight; // trigger reflow
        laser.style.animation = '';
        // Show analyzing status
        cycleStatus();
      }, { once: true });
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be selected again
    fileInput.value = '';
  });

  // ──────────────────────────────────────────────
  //  AI STATUS CYCLING
  // ──────────────────────────────────────────────

  let statusInterval = null;

  function cycleStatus() {
    let i = 0;
    clearInterval(statusInterval);
    statusInterval = setInterval(() => {
      i = (i + 1) % AI_PHRASES.length;
      statusText.textContent = AI_PHRASES[i];
      // Subtle text fade
      statusText.style.opacity = '0';
      setTimeout(() => { statusText.style.opacity = '1'; }, 100);
    }, 2200);
  }

  // Start initial cycling
  cycleStatus();

  // ──────────────────────────────────────────────
  //  ADD TO CART
  // ──────────────────────────────────────────────

  let toastTimer = null;

  function showToast(message) {
    toastMessage.textContent = message;
    cartToast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      cartToast.classList.remove('visible');
    }, 2400);
  }

  productGrid.addEventListener('click', (e) => {
    const cartBtn = e.target.closest('.btn-cart');
    if (cartBtn) {
      const id = cartBtn.dataset.cart;
      const product = PRODUCTS.find((p) => p.id === Number(id));
      cartBtn.classList.add('added');
      cartBtn.innerHTML = `
        <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Added
      `;
      showToast(`${product.name} added to cart!`);

      setTimeout(() => {
        cartBtn.classList.remove('added');
        cartBtn.innerHTML = `
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Add
        `;
      }, 2500);
      return;
    }

    // Wishlist toggle
    const wishBtn = e.target.closest('.product-card__wishlist');
    if (wishBtn) {
      wishBtn.classList.toggle('active');
      const isActive = wishBtn.classList.contains('active');
      showToast(isActive ? 'Saved to wishlist ❤️' : 'Removed from wishlist');
    }
  });

  // ──────────────────────────────────────────────
  //  TAB BAR
  // ──────────────────────────────────────────────

  $$('.tab-bar__item').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.tab-bar__item').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // ──────────────────────────────────────────────
  //  DRAG & DROP ON SCANNER
  // ──────────────────────────────────────────────

  scannerArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadOverlay.classList.add('visible');
  });

  scannerArea.addEventListener('dragleave', () => {
    uploadOverlay.classList.remove('visible');
  });

  scannerArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadOverlay.classList.remove('visible');

    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      scannerImage.classList.remove('loaded');
      scannerImage.src = ev.target.result;
      scannerImage.addEventListener('load', () => {
        scannerImage.classList.add('loaded');
        const laser = $('#scannerLaser');
        laser.style.animation = 'none';
        laser.offsetHeight;
        laser.style.animation = '';
        cycleStatus();
      }, { once: true });
    };
    reader.readAsDataURL(file);
  });

  // ──────────────────────────────────────────────
  //  INTERSECTION OBSERVER — Entrance animations
  // ──────────────────────────────────────────────

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe product cards after render
  function observeCards() {
    $$('.product-card').forEach((card) => {
      card.style.animationPlayState = 'paused';
      observer.observe(card);
    });
  }

  // ──────────────────────────────────────────────
  //  INIT
  // ──────────────────────────────────────────────

  renderStyleTags();
  renderProducts();

  // Slight delay so CSS animations don't conflict
  requestAnimationFrame(() => {
    observeCards();
  });

})();
