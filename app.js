/* ==========================================================================
   ZAIM ROSLI PORTAL — APP JS LOGIC (ENGLISH)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveNavLink();
  initMobileDrawerNav();
});

// 1. Highlight Active Nav Link based on Current Page URL
function highlightActiveNavLink() {
  const path = window.location.pathname.toLowerCase();
  let currentFile = (path.split('/').pop() || 'index.html').replace(/\.html$/, '');
  if (!currentFile) currentFile = 'index';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-drawer-link');
  
  navLinks.forEach(link => {
    const rawHref = link.getAttribute('href') || '';
    let href = rawHref.toLowerCase().replace(/^\//, '').replace(/\.html$/, '');
    if (!href) href = 'index';
    
    if (href === currentFile || (currentFile === 'index' && href === 'index')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 2. Mobile Drawer Navigation Toggle & Submenu Accordions
function initMobileDrawerNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (toggleBtn && overlay) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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

  // Setup accordion toggle for mobile drawer dropdowns
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.style.cursor = 'pointer';
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parent = toggle.closest('.mobile-item-dropdown');
      if (parent) {
        parent.classList.toggle('active');
      }
    });
  });
}

// 3. Property Card Generator HTML String
function createPropertyCardHTML(item) {
  if (!item) return '';
  const badgeClass = item.status === 'sale' ? 'badge-sale' : 'badge-rent';
  const badgeLabel = item.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
  const cardImg = Array.isArray(item.images) && item.images.length > 0 
    ? item.images[0] 
    : (typeof item.image === 'string' ? item.image.split(',')[0].trim() : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');

  const bedsVal = item.bedsPlus > 0 ? `${item.beds}+${item.bedsPlus}` : item.beds;
  const bathsVal = item.bathsPlus > 0 ? `${item.baths}+${item.bathsPlus}` : item.baths;
  const commTypes = ['Factory', 'Industrial Land', 'Commercial Land', 'Commercial Space', 'Office Space', 'Shop / Office', 'Land', 'Kilang', 'Tanah Industri', 'Kedai / Pejabat', 'Ruang Komersial', 'Tanah', 'Tanah Komersial'];
  const isCommercial = commTypes.includes(item.type) || (item.type && (item.type.toLowerCase().includes('tanah') || item.type.toLowerCase().includes('land') || item.type.toLowerCase().includes('shop') || item.type.toLowerCase().includes('office') || item.type.toLowerCase().includes('factory') || item.type.toLowerCase().includes('kilang')));
  const isPureLand = ['Land', 'Commercial Land', 'Industrial Land', 'Tanah', 'Tanah Komersial', 'Tanah Industri', 'Tanah Lot', 'Pertanian', 'Agricultural Land'].includes(item.type) || ((!item.type || item.type.toLowerCase().includes('tanah') || item.type.toLowerCase().includes('land')) && (!item.size || item.size === 0 || item.size === '0') && (!item.beds || item.beds === 0));

  const roomLabel = isCommercial ? 'Rooms' : 'Beds';

  const cleanLandText = (item.landSize || '').replace(/\s*\([^)]*\)/g, '').trim();
  const hasLand = cleanLandText && cleanLandText !== '-' && cleanLandText !== '0';
  const hasSize = (item.size && parseFloat(item.size) > 0) && !isPureLand;
  const hasBeds = !isPureLand && item.beds > 0;
  const hasBaths = !isPureLand && item.baths > 0;

  let specsHTML = '';

  // 1. Full-width horizontal bar for Land or single Land spec
  if (isPureLand || (hasLand && !hasBeds && !hasBaths && !hasSize)) {
    specsHTML = `
      <div class="property-spec-banner spec-land-banner">
        <span class="spec-banner-label">LAND AREA</span>
        <span class="spec-banner-val">${cleanLandText || '-'}</span>
      </div>
    `;
  } else if (isCommercial && !hasLand && !hasBeds && !hasBaths && hasSize) {
    // 2. Commercial / Retail with only Built-up size
    const formattedSize = (typeof item.size === 'number') ? item.size.toLocaleString('en-US') : item.size;
    specsHTML = `
      <div class="property-spec-banner">
        <span class="spec-banner-label">BUILT-UP AREA</span>
        <span class="spec-banner-val">${formattedSize} sqft</span>
      </div>
    `;
  } else if (isCommercial) {
    // 3. Commercial items with multiple specs (Shoplots, Offices, Factories)
    const specItems = [];
    const formattedSize = hasSize ? ((typeof item.size === 'number') ? item.size.toLocaleString('en-US') : item.size) : null;
    
    if (hasBeds) {
      specItems.push(`
        <div class="property-spec-box">
          <div class="spec-top">ROOMS</div>
          <div class="spec-val">${bedsVal}</div>
        </div>
      `);
    }
    if (hasBaths) {
      specItems.push(`
        <div class="property-spec-box">
          <div class="spec-top">BATHS</div>
          <div class="spec-val">${bathsVal}</div>
        </div>
      `);
    }
    if (formattedSize) {
      specItems.push(`
        <div class="property-spec-box">
          <div class="spec-top">BUILT-UP</div>
          <div class="spec-val">${formattedSize} sqft</div>
        </div>
      `);
    }
    if (hasLand) {
      specItems.push(`
        <div class="property-spec-box spec-land">
          <div class="spec-top">LAND AREA</div>
          <div class="spec-val">${cleanLandText}</div>
        </div>
      `);
    }

    const gridClass = specItems.length >= 4 ? 'specs-grid-2x2' : 'specs-left-aligned';
    specsHTML = `
      <div class="property-specs-row ${gridClass}">
        ${specItems.join('')}
      </div>
    `;
  } else {
    // 4. Uniform 4-box 2x2 grid for ALL Residential properties (Condos, Terraces, Semi-D, Bungalows, Townhouses)
    const formattedSize = hasSize ? ((typeof item.size === 'number') ? item.size.toLocaleString('en-US') : item.size) : null;
    const landClass = hasLand ? 'spec-land' : '';

    specsHTML = `
      <div class="property-specs-row specs-grid-2x2">
        <div class="property-spec-box">
          <div class="spec-top">BEDS</div>
          <div class="spec-val">${hasBeds ? bedsVal : '-'}</div>
        </div>
        <div class="property-spec-box">
          <div class="spec-top">BATHS</div>
          <div class="spec-val">${hasBaths ? bathsVal : '-'}</div>
        </div>
        <div class="property-spec-box">
          <div class="spec-top">BUILT-UP</div>
          <div class="spec-val">${formattedSize ? `${formattedSize} sqft` : '-'}</div>
        </div>
        <div class="property-spec-box ${landClass}">
          <div class="spec-top">LAND AREA</div>
          <div class="spec-val">${hasLand ? cleanLandText : '-'}</div>
        </div>
      </div>
    `;
  }

  const catFolder = isCommercial ? 'commercial' : 'residential';
  const detailUrl = `/properties/${catFolder}/${item.slug || item.id}`;

  return `
    <div class="property-card">
      <div class="property-thumb-wrap">
        <img src="${cardImg}" class="property-thumb" alt="${item.title || 'Property'}" referrerpolicy="no-referrer" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'">
        <span class="property-badge ${badgeClass}">${badgeLabel}</span>
        <span class="property-region-badge">${item.region || 'Selangor'}</span>
      </div>
      <div class="property-content">
        <div class="property-price">${(item.priceStr || 'RM 0').replace(/\/\s*bln\b/gi, '/ month').replace(/\/\s*bulan\b/gi, '/ month')}</div>
        <h3 class="property-title">${item.title || ''}</h3>
        <div class="property-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${item.location || ''}
        </div>
        <div class="property-specs-container">
          ${specsHTML}
        </div>
        <div class="property-card-actions">
          <a href="${detailUrl}" class="btn btn-outline btn-sm btn-details">View Details →</a>
          <button onclick="shareProperty(event, '${item.slug || item.id}', '${(item.title || '').replace(/'/g, "\\'")}', '${item.image || ''}', '${catFolder}')" class="btn btn-outline btn-sm btn-share" title="Share Property" aria-label="Share Property">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

window.createPropertyCardHTML = createPropertyCardHTML;
window.initMobileDrawerNav = initMobileDrawerNav;

// Global Share Function
window.shareProperty = async function(e, slugOrId, title, imageUrl, catFolder = 'residential') {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const url = window.location.origin + '/properties/' + catFolder + '/' + slugOrId;
  const shareText = title + ' — Zaim Rosli Real Estate';
  const fullCopyText = shareText + '\n' + url;

  const shareData = {
    title: title,
    text: shareText,
    url: url
  };

  if (imageUrl && navigator.canShare) {
    try {
      const resp = await fetch(imageUrl, { mode: 'cors' });
      if (resp.ok) {
        const blob = await resp.blob();
        const file = new File([blob], 'property.jpg', { type: blob.type || 'image/jpeg' });
        if (navigator.canShare({ files: [file] })) {
          shareData.files = [file];
        }
      }
    } catch(err) {
      console.log('Image fetch for share skipped:', err);
    }
  }

  if (navigator.share) {
    navigator.share(shareData).catch(err => console.log('Share dismissed or failed:', err));
  } else {
    navigator.clipboard.writeText(fullCopyText).then(() => {
      alert('📋 Pautan hartanah telah disalin!');
    }).catch(() => {
      prompt('Salin pautan me:', fullCopyText);
    });
  }
};

// 4. Formatting Utilities
function formatCurrency(val) {
  return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', maximumFractionDigits: 0 }).format(val);
}

// 5. Real Estate Financial & Legal Calculation Utilities
function calcSPALegalFee(price) {
  if (!price || price <= 0) return 0;
  if (price <= 500000) return Math.max(500, price * 0.0125);
  if (price <= 7000000) return 500000 * 0.0125 + (price - 500000) * 0.01;
  return 500000 * 0.0125 + 6500000 * 0.01 + (price - 7000000) * 0.0075;
}

function calcMOTStampDuty(price) {
  if (!price || price <= 0) return 0;
  if (price <= 100000) return price * 0.01;
  if (price <= 500000) return 1000 + (price - 100000) * 0.02;
  if (price <= 1000000) return 1000 + 8000 + (price - 500000) * 0.03;
  return 1000 + 8000 + 15000 + (price - 1000000) * 0.04;
}

function calcLoanLegalFee(loanAmount) {
  return calcSPALegalFee(loanAmount);
}

function calcLoanStampDuty(loanAmount) {
  return loanAmount * 0.005;
}

function calcValuationFee(price) {
  if (!price || price <= 0) return 0;
  if (price <= 100000) return Math.max(300, price * 0.0025);
  if (price <= 2000000) return 100000 * 0.0025 + (price - 100000) * 0.002;
  return 100000 * 0.0025 + 1900000 * 0.002 + (price - 2000000) * 0.001;
}

window.calcSPALegalFee = calcSPALegalFee;
window.calcMOTStampDuty = calcMOTStampDuty;
window.calcLoanLegalFee = calcLoanLegalFee;
window.calcLoanStampDuty = calcLoanStampDuty;
window.calcValuationFee = calcValuationFee;


// Live Cloudflare KV Synchronizer for All Public Pages (Real-Time Mobile & Desktop Sync)
(function initLivePropertiesSync() {
  function syncFromStorage() {
    try {
      const local = localStorage.getItem('ZAIM_ROSLI_PROPERTIES');
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          window.PROPERTIES_DATA = parsed;
          window.dispatchEvent(new CustomEvent('properties-updated'));
        }
      }
    } catch(e) {}
  }

  function fetchLiveKV() {
    fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties?t=' + Date.now(), { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          window.PROPERTIES_DATA = data;
          try {
            localStorage.setItem('ZAIM_ROSLI_PROPERTIES', JSON.stringify(data));
          } catch(e) {}
          window.dispatchEvent(new CustomEvent('properties-updated'));
        }
      })
      .catch(err => console.log('Live KV sync skipped:', err));
  }

  // 1. Initial fast local load + network fetch
  syncFromStorage();
  fetchLiveKV();

  // 2. Real-time auto-sync when user returns to app/tab on mobile or desktop
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      fetchLiveKV();
    }
  });
  window.addEventListener('focus', fetchLiveKV);
})();
