export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetSlug = context.params.slug;
  
  const assetUrl = new URL('/property-detail.html', url.origin);
  const response = await context.env.ASSETS.fetch(assetUrl);
  
  if (!targetSlug) return response;

  try {
    const apiRes = await fetch('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties');
    if (!apiRes.ok) return response;
    const properties = await apiRes.json();

    const prop = properties.find(p => 
      p.slug === targetSlug || 
      p.id === targetSlug || 
      (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === targetSlug)
    );

    if (!prop) return response;

    const rawTitle = prop.title || 'Property Listing';
    const title = rawTitle.replace(/"/g, '&quot;');
    const isSale = (prop.status || 'sale').toLowerCase() === 'sale';
    const priceDisplay = (prop.price != null && !isNaN(Number(prop.price)))
      ? (isSale ? `RM ${Number(prop.price).toLocaleString('en-US')}` : `RM ${Number(prop.price).toLocaleString('en-US')} / month`)
      : (prop.priceStr || 'RM 0');
    
    const priceStr = priceDisplay.replace(//s*bln\b/gi, '/ month').replace(//s*bulan\b/gi, '/ month').replace(/"/g, '&quot;');
    const loc = (prop.location || prop.region || 'Selangor').replace(/"/g, '&quot;');
    const region = (prop.region || 'Selangor').replace(/"/g, '&quot;');
    const type = (prop.type || prop.category || 'Property').replace(/"/g, '&quot;');
    const statusPrefix = isSale ? 'FOR SALE' : 'FOR RENT';
    const desc = `${statusPrefix}: ${priceStr} • ${loc}, ${region} • ${type} — Ejen Hartanah Berdaftar Zaim Rosli (REN39575). Lihat gambar resolusi tinggi, spesifikasi penuh & hubungi terus.`;
    
    let rawImg = '';
    if (Array.isArray(prop.images) && prop.images.length > 0 && prop.images[0]) {
      rawImg = prop.images[0];
    } else if (prop.image) {
      rawImg = prop.image.split(',')[0].trim();
    }
    if (!rawImg) {
      rawImg = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    }
    if (rawImg.startsWith('http:')) rawImg = rawImg.replace('http:', 'https:');
    const img = rawImg.replace(/"/g, '&quot;');

    const canonicalUrl = `https://zaimrosli.my/property/${prop.slug || targetSlug}`;

    // Schema.org RealEstateListing JSON-LD
    let validDatePosted = null;
    const rawDate = prop.datePosted || prop.createdAt || prop.created_at;
    if (rawDate) {
      const parsedDate = new Date(rawDate);
      if (!isNaN(parsedDate.getTime())) {
        validDatePosted = parsedDate.toISOString().split('T')[0];
      }
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": rawTitle,
      "description": desc,
      "url": canonicalUrl,
      "image": img,
      ...(validDatePosted ? { "datePosted": validDatePosted } : {}),
      "offers": {
        "@type": "Offer",
        "price": prop.price || 0,
        "priceCurrency": "MYR",
        "availability": "https://schema.org/InStock",
        "businessFunction": isSale ? "https://schema.org/Sell" : "https://schema.org/LeaseOut"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": prop.location || "Selangor",
        "addressRegion": prop.region || "Selangor",
        "addressCountry": "MY"
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
          "name": rawTitle,
          "item": canonicalUrl
        }
      ]
    };

    const seoTags = `
  <title>${title} — Zaim Rosli (REN39575)</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:site_name" content="Zaim Rosli Real Estate Portal">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:secure_url" content="${img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${title}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${img}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
`;

    let html = await response.text();

    // Cleanly strip existing static fallback meta tags from property-detail.html so WhatsApp only sees dynamic tags
    html = html.replace(/<title>[\s\S]*?<\/title>/i, '');
    html = html.replace(/<meta\s+name=["']description["'][\s\S]*?>/gi, '');
    html = html.replace(/<link\s+rel=["']canonical["'][\s\S]*?>/gi, '');
    html = html.replace(/<meta\s+property=["']og:[\s\S]*?>/gi, '');
    html = html.replace(/<meta\s+name=["']twitter:[\s\S]*?>/gi, '');
    html = html.replace(/<script\s+id=["']property-jsonld["'][\s\S]*?<\/script>/gi, '');
    html = html.replace(/<script\s+id=["']breadcrumb-jsonld["'][\s\S]*?<\/script>/gi, '');

    // Insert clean dynamic SEO tags
    html = html.replace('<head>', '<head>' + seoTags);

    return new Response(html, {
      status: response.status,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=600'
      }
    });
  } catch (err) {
    return response;
  }
}
