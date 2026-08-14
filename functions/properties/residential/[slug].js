export async function onRequest(context) {
  const url = new URL(context.request.url);
  const assetUrl = new URL('/property-detail.html', url.origin);
  const response = await context.env.ASSETS.fetch(assetUrl);
  
  const targetSlug = context.params.slug;
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

    const title = (prop.title || 'Property Listing').replace(/"/g, '&quot;');
    const price = (prop.priceStr || 'RM 0').replace(/\/\s*bln\b/gi, '/ month').replace(/\/\s*bulan\b/gi, '/ month').replace(/"/g, '&quot;');
    const loc = (prop.location || 'Selangor').replace(/"/g, '&quot;');
    const type = (prop.type || 'Property').replace(/"/g, '&quot;');
    const desc = `${price} • ${loc} • ${type} — Zaim Rosli (REN39575)`;
    let img = (Array.isArray(prop.images) && prop.images.length > 0 && prop.images[0]) || prop.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    if (img.startsWith('http:')) img = img.replace('http:', 'https:');

    const ogTags = `
  <title>${title} — Zaim Rosli</title>
  <meta name="description" content="${desc}">
  <meta property="og:site_name" content="Zaim Rosli Real Estate Portal">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url.href}">
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
`;

    let html = await response.text();
    html = html.replace('<head>', '<head>' + ogTags);

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
