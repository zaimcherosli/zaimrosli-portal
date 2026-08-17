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
    const priceStr = (prop.priceStr || 'RM 0').replace(/\/\s*bln\b/gi, '/ month').replace(/\/\s*bulan\b/gi, '/ month').replace(/"/g, '&quot;');
    const loc = (prop.location || 'Selangor').replace(/"/g, '&quot;');
    const type = (prop.type || 'Property').replace(/"/g, '&quot;');
    const desc = `${priceStr} • ${loc} • ${type} — Verified property listing by Zaim Rosli (REN39575). View photos, specs, and WhatsApp agent directly.`;
    
    let img = (Array.isArray(prop.images) && prop.images.length > 0 && prop.images[0]) || prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    if (img.startsWith('http:')) img = img.replace('http:', 'https:');

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
        "businessFunction": prop.status === 'rent' ? "https://schema.org/LeaseOut" : "https://schema.org/Sell"
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
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${img}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>
`;

    let html = await response.text();
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
