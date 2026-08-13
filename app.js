/* ==========================================================================
   ZAIM ROSLI PORTAL — APP JS LOGIC (ENGLISH)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNavLink();
  initMobileDrawerNav();
});

// 1. Highlight Active Nav Link based on Current Page URL
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 2. Mobile Drawer Navigation Toggle
function initMobileDrawerNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

// 3. Property Card Generator HTML String
function createPropertyCardHTML(item) {
  const badgeClass = item.status === 'sale' ? 'badge-sale' : 'badge-rent';
  const badgeLabel = item.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
  const cardImg = Array.isArray(item.images) && item.images.length > 0 
    ? item.images[0] 
    : (typeof item.image === 'string' ? item.image.split(',')[0].trim() : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');

  const isCommercial = ['Kilang', 'Tanah Industri', 'Kedai / Pejabat', 'Ruang Komersial'].includes(item.type);
  const bedsSpec = (!isCommercial && item.beds > 0) ? `<span class="property-spec-item">🛏️ ${item.beds} Beds</span>` : '';
  const bathsSpec = (item.baths > 0) ? `<span class="property-spec-item">🚿 ${item.baths} Baths</span>` : '';
  const sizeSpec = item.size ? `<span class="property-spec-item">📐 ${item.size} sqft</span>` : '';

  return `
    <div class="property-card">
      <div class="property-thumb-wrap">
        <img src="${cardImg}" class="property-thumb" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'">
        <span class="property-badge ${badgeClass}">${badgeLabel}</span>
        <span class="property-region-badge">${item.region}</span>
      </div>
      <div class="property-content">
        <div class="property-price">${item.priceStr}</div>
        <h3 class="property-title">${item.title}</h3>
        <div class="property-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${item.location}
        </div>
        <div class="property-specs-row">
          ${bedsSpec}
          ${bathsSpec}
          ${sizeSpec}
        </div>
        <div style="display: flex; gap: 8px; margin-top: 16px;">
          <a href="/property-detail/${item.slug || item.id}" class="btn btn-outline btn-sm" style="flex: 1;">View Details</a>
          <button onclick="shareProperty(event, '${item.slug || item.id}', '${(item.title || '').replace(/'/g, "\\'")}')" class="btn btn-outline btn-sm" style="width: 42px; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="Share Property" aria-label="Share Property">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global Share Function
window.shareProperty = function(e, slugOrId, title) {
  e.preventDefault();
  e.stopPropagation();
  const url = window.location.origin + '/property-detail/' + slugOrId;
  if (navigator.share) {
    navigator.share({
      title: title,
      text: 'Look at this property by Zaim Rosli: ' + title,
      url: url
    }).catch(err => console.log('Share dismissed or failed:', err));
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert('Link copied to clipboard!');
    }).catch(() => {
      prompt('Copy this link:', url);
    });
  }
};

// 4. Formatting Utilities
function formatCurrency(val) {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', maximumFractionDigits: 0 }).format(val);
}
