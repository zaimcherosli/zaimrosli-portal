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

  const bedsVal = item.bedsPlus > 0 ? `${item.beds}+${item.bedsPlus}` : item.beds;
  const bathsVal = item.bathsPlus > 0 ? `${item.baths}+${item.bathsPlus}` : item.baths;
  const isCommercial = ['Kilang', 'Tanah Industri', 'Kedai / Pejabat', 'Ruang Komersial'].includes(item.type);
  const bedsSpec = (!isCommercial && item.beds > 0) ? `<span class="property-spec-item">🛏️ ${bedsVal} Beds</span>` : '';
  const bathsSpec = (item.baths > 0) ? `<span class="property-spec-item">🚿 ${bathsVal} Baths</span>` : '';
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
          <button onclick="shareProperty(event, '${item.slug || item.id}', '${(item.title || '').replace(/'/g, "\\'")}', '${item.image || ''}')" class="btn btn-outline btn-sm" style="width: 42px; padding: 0 !important; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="Share Property" aria-label="Share Property">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global Share Function
window.shareProperty = async function(e, slugOrId, title, imageUrl, catFolder = 'residential') {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const url = window.location.origin + '/properties/' + catFolder + '/' + slugOrId;
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const url = window.location.origin + '/property-detail/' + slugOrId;
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
      prompt('Salin pautan ini:', fullCopyText);
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
