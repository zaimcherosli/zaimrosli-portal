import { LOCATIONS_CONFIG } from '../../locations-config.js';

function safeJsonStringify(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
    .replace(/<\/script/gi, '<\\/script');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderServerPropertyCard(item) {
  if (!item) return '';
  const badgeClass = item.status === 'sale' ? 'badge-sale' : 'badge-rent';
  const badgeLabel = item.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
  const cardImg = Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : (item.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');
  const detailUrl = `/property/${item.slug || item.id}`;
  const priceDisplay = (item.priceStr || (item.price ? `RM ${item.price.toLocaleString('en-US')}` : 'RM 0')).replace(/\/\s*bln\b/gi, '/ month').replace(/\/\s*bulan\b/gi, '/ month');

  const bedsVal = item.bedsPlus > 0 ? `${item.beds}+${item.bedsPlus}` : (item.beds || '-');
  const bathsVal = item.bathsPlus > 0 ? `${item.baths}+${item.bathsPlus}` : (item.baths || '-');
  const sizeVal = item.size ? `${Number(item.size).toLocaleString('en-US')} sqft` : '-';
  const landVal = (item.landSize && item.landSize !== '-') ? item.landSize : '-';

  return `
    <div class="property-card">
      <a href="${escapeHtml(detailUrl)}" class="property-thumb-wrap" aria-label="View details for ${escapeHtml(item.title || 'Property')}">
        <img src="${escapeHtml(cardImg)}" class="property-thumb" alt="${escapeHtml(item.title || 'Property')}" referrerpolicy="no-referrer" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'">
        <span class="property-badge ${badgeClass}">${badgeLabel}</span>
        <span class="property-region-badge">${escapeHtml(item.region || 'Selangor')}</span>
      </a>
      <div class="property-content">
        <div class="property-price">${escapeHtml(priceDisplay)}</div>
        <h3 class="property-title"><a href="${escapeHtml(detailUrl)}" style="color: inherit; text-decoration: none;">${escapeHtml(item.title || '')}</a></h3>
        <div class="property-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${escapeHtml(item.location || '')}
        </div>
        <div class="property-specs-container">
          <div class="property-specs-row specs-grid-2x2">
            <div class="property-spec-box">
              <div class="spec-top">BEDS</div>
              <div class="spec-val">${escapeHtml(String(bedsVal))}</div>
            </div>
            <div class="property-spec-box">
              <div class="spec-top">BATHS</div>
              <div class="spec-val">${escapeHtml(String(bathsVal))}</div>
            </div>
            <div class="property-spec-box">
              <div class="spec-top">BUILT-UP</div>
              <div class="spec-val">${escapeHtml(String(sizeVal))}</div>
            </div>
            <div class="property-spec-box spec-land">
              <div class="spec-top">LAND AREA</div>
              <div class="spec-val">${escapeHtml(String(landVal))}</div>
            </div>
          </div>
        </div>
        <div class="property-card-actions">
          <a href="${escapeHtml(detailUrl)}" class="btn btn-outline btn-sm btn-details">View Details →</a>
        </div>
      </div>
    </div>
  `;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetLocSlug = (context.params.location || '').toLowerCase();

  // 1. Resolve Location Configuration (Support static config + dynamic KV registry)
  let config = LOCATIONS_CONFIG[targetLocSlug] || null;

  try {
    const locApiRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/locations?t=' + Date.now(), {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (locApiRes.ok) {
      const dynamicLocations = await locApiRes.json();
      if (dynamicLocations && typeof dynamicLocations === 'object') {
        if (Array.isArray(dynamicLocations)) {
          const found = dynamicLocations.find(l => (l.slug || '').toLowerCase() === targetLocSlug);
          if (found) config = found;
        } else if (dynamicLocations[targetLocSlug]) {
          config = dynamicLocations[targetLocSlug];
        }
      }
    }
  } catch (locFetchErr) {}

  // 2. Reject non-existent or inactive locations with true HTTP 404
  if (!config || config.active === false) {
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lokasi Tidak Dijumpai — Zaim Rosli (REN39575)</title>
  <meta name="robots" content="noindex, follow">
  <link rel="stylesheet" href="/styles.css?v=21">
</head>
<body style="background:#0f172a; color:#ffffff; font-family:sans-serif; text-align:center; padding:80px 20px;">
  <h1 style="font-size:2.5rem; color:#d97706; margin-bottom:16px;">404 - Lokasi Tidak Dijumpai</h1>
  <p style="color:#94a3b8; font-size:1.1rem; max-width:500px; margin:0 auto 24px auto;">
    Maaf, halaman lokasi yang anda cari tidak wujud atau telah dipindahkan.
  </p>
  <a href="/properties" style="display:inline-block; background:#d97706; color:#0f172a; font-weight:800; padding:12px 24px; border-radius:8px; text-decoration:none;">Lihat Semua Hartanah →</a>
</body>
</html>`, {
      status: 404,
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  }

  // 3. Fetch base template location.html
  const assetUrl = new URL('/location.html', url.origin);
  const response = await context.env.ASSETS.fetch(assetUrl);
  if (!response.ok) return response;

  try {
    // 4. Fetch fresh live property inventory from Cloudflare Worker KV API
    const apiRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties?t=' + Date.now(), {
      headers: { 'Cache-Control': 'no-cache' }
    });
    
    let allProperties = [];
    if (apiRes.ok) {
      allProperties = await apiRes.json();
    }

    // 5. Robust Location Filtering (Uses configured keywords or builds auto-keywords from subareas/name)
    let keywords = [];
    if (Array.isArray(config.filterKeywords) && config.filterKeywords.length > 0) {
      keywords = config.filterKeywords.map(k => k.toLowerCase().trim()).filter(Boolean);
    } else {
      keywords = [
        config.slug.toLowerCase(),
        config.name.toLowerCase(),
        ...(Array.isArray(config.subareas) ? config.subareas.map(s => s.toLowerCase().replace(/📍/g, '').trim()) : [])
      ].filter(Boolean);
    }

    const matchedProperties = allProperties.filter(item => {
      if (item.hidden) return false;
      const combinedText = `
        ${item.title || ''} 
        ${item.location || ''} 
        ${item.region || ''} 
        ${item.description || ''}
      `.toLowerCase();

      return keywords.some(k => combinedText.includes(k));
    });

    const canonicalUrl = `https://zaimrosli.my/properties/${config.slug}`;
    const pageTitle = config.seoTitle || `Ejen Hartanah ${config.name} & Rumah Dijual / Sewa — Zaim Rosli (REN39575)`;
    const pageDesc = config.seoDescription || `Cari rumah sewa, banglo, semi-d & ruang komersial untuk dijual di ${config.name}. Khidmat ejen hartanah berdaftar REN39575.`;
    const h1Title = config.h1 || `Hartanah di ${config.name}: Rumah Dijual & Sewa`;
    const introText = config.introContent || `Senarai hartanah kediaman dan komersial disahkan di ${config.name} bersama ejen hartanah berdaftar Zaim Rosli (REN39575).`;

    const ogImg = (matchedProperties.length > 0 && Array.isArray(matchedProperties[0].images) && matchedProperties[0].images[0]) 
      ? matchedProperties[0].images[0] 
      : 'https://zaimrosli.my/icons/og-share.jpg';

    // 6. Build Schema.org Structured Data
    const collectionLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDesc,
      "url": canonicalUrl,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": matchedProperties.length,
        "itemListElement": matchedProperties.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": p.title || 'Property Listing',
          "url": `https://zaimrosli.my/property/${p.slug || p.id}`
        }))
      }
    };

    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://zaimrosli.my/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Properties",
          "item": "https://zaimrosli.my/properties"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": config.name,
          "item": canonicalUrl
        }
      ]
    };

    const saleCount = matchedProperties.filter(p => p.status === 'sale').length;
    const rentCount = matchedProperties.filter(p => p.status === 'rent').length;
    const resCount = matchedProperties.filter(p => p.category === 'Residential' || ['Terrace House', 'Bungalow', 'Semi-D House', 'Condominium'].includes(p.type)).length;
    const commCount = matchedProperties.filter(p => p.category === 'Commercial' || ['Shop / Office', 'Commercial Space', 'Land', 'Factory'].includes(p.type)).length;
    
    const prices = matchedProperties.map(p => p.price).filter(Boolean);
    let priceRangeText = '-';
    if (prices.length > 0) {
      const minP = Math.min(...prices);
      const maxP = Math.max(...prices);
      const formatP = (n) => n >= 1000000 ? `RM ${(n/1000000).toFixed(1)}M` : (n >= 1000 ? `RM ${(n/1000).toFixed(0)}k` : `RM ${n}`);
      priceRangeText = (minP === maxP) ? formatP(minP) : `${formatP(minP)} – ${formatP(maxP)}`;
    }

    const subareasHtml = Array.isArray(config.subareas) 
      ? config.subareas.map(s => `<span class="subarea-pill">📍 ${escapeHtml(s)}</span>`).join('') 
      : '';

    const propertyCardsHtml = matchedProperties.length > 0 
      ? matchedProperties.map(renderServerPropertyCard).join('') 
      : '';

    const faqsHtml = Array.isArray(config.faqs) 
      ? config.faqs.map((f, i) => `
        <div class="faq-item">
          <div class="faq-q" onclick="toggleFaq(${i})">${escapeHtml(f.question)} <span>▾</span></div>
          <div class="faq-a" id="faq-ans-${i}">${escapeHtml(f.answer)}</div>
        </div>
      `).join('') 
      : '';

    const seoTags = `
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeHtml(pageDesc)}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:site_name" content="Zaim Rosli Real Estate Portal">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapeHtml(pageTitle)}">
  <meta property="og:description" content="${escapeHtml(pageDesc)}">
  <meta property="og:image" content="${escapeHtml(ogImg)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(pageTitle)}">
  <meta name="twitter:description" content="${escapeHtml(pageDesc)}">
  <meta name="twitter:image" content="${escapeHtml(ogImg)}">
  <script type="application/ld+json">${safeJsonStringify(collectionLd)}</script>
  <script type="application/ld+json">${safeJsonStringify(breadcrumbLd)}</script>
  <script>
    window.__LOCATION_INITIAL_DATA__ = ${safeJsonStringify(matchedProperties)};
    window.__LOCATION_CONFIG__ = ${safeJsonStringify(config)};
  </script>
`;

    let html = await response.text();
    html = html.replace('<head>', '<head>' + seoTags);

    html = html.replace('<span id="breadcrumb-loc-name" style="color: var(--accent-gold); font-weight: 700;">Location</span>', `<span id="breadcrumb-loc-name" style="color: var(--accent-gold); font-weight: 700;">${escapeHtml(config.name)}</span>`);
    html = html.replace('<h1 class="location-hero-title" id="loc-h1">Hartanah</h1>', `<h1 class="location-hero-title" id="loc-h1">${escapeHtml(h1Title)}</h1>`);
    html = html.replace('<p class="location-hero-desc" id="loc-intro">Memuatkan senarai hartanah disahkan...</p>', `<p class="location-hero-desc" id="loc-intro">${escapeHtml(introText)}</p>`);
    html = html.replace('<div id="subareas-list" style="display: flex; gap: 8px; flex-wrap: wrap;"></div>', `<div id="subareas-list" style="display: flex; gap: 8px; flex-wrap: wrap;">${subareasHtml}</div>`);
    
    html = html.replace('<div class="location-stat-val" id="stat-total">0</div>', `<div class="location-stat-val" id="stat-total">${matchedProperties.length}</div>`);
    html = html.replace('<div class="location-stat-val" id="stat-sale">0</div>', `<div class="location-stat-val" id="stat-sale">${saleCount}</div>`);
    html = html.replace('<div class="location-stat-val" id="stat-rent">0</div>', `<div class="location-stat-val" id="stat-rent">${rentCount}</div>`);
    html = html.replace('<div class="location-stat-val" id="stat-price-range" style="font-size: 1.05rem;">-</div>', `<div class="location-stat-val" id="stat-price-range" style="font-size: 1.05rem;">${escapeHtml(priceRangeText)}</div>`);

    html = html.replace('<span id="count-all">0</span>', `<span id="count-all">${matchedProperties.length}</span>`);
    html = html.replace('<span id="count-sale">0</span>', `<span id="count-sale">${saleCount}</span>`);
    html = html.replace('<span id="count-rent">0</span>', `<span id="count-rent">${rentCount}</span>`);
    html = html.replace('<span id="count-res">0</span>', `<span id="count-res">${resCount}</span>`);
    html = html.replace('<span id="count-comm">0</span>', `<span id="count-comm">${commCount}</span>`);

    html = html.replace('<span id="cta-loc-name">Kawasan Ini</span>', `<span id="cta-loc-name">${escapeHtml(config.name)}</span>`);
    html = html.replace('<span id="faq-loc-name">Lokasi Ini</span>', `<span id="faq-loc-name">${escapeHtml(config.name)}</span>`);
    html = html.replace('<div id="loc-faq-list"></div>', `<div id="loc-faq-list">${faqsHtml}</div>`);

    if (matchedProperties.length > 0) {
      html = html.replace('<div id="location-listings-grid" class="properties-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">\n      <!-- Cards rendered here -->\n    </div>', `<div id="location-listings-grid" class="properties-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">${propertyCardsHtml}</div>`);
    }

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=600'
      }
    });

  } catch (err) {
    return response;
  }
}
