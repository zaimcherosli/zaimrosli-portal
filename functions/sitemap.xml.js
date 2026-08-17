const RESERVED_SLUGS = new Set([
  'properties',
  'for-sale',
  'for-rent',
  'residential',
  'commercial',
  'commercial-industrial',
  'admin',
  'login',
  'api',
  'services',
  'about',
  'contact',
  'faq',
  'calculator',
  'foreign-buyers',
  'testimonials',
  'blog',
  'property',
  'blog-post',
  'propmall'
]);

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function onRequestGet(context) {
  const url = new URL(context.request.url);

  // 1. Fetch static base sitemap.xml via Pages ASSETS binding (safe, no recursion)
  const assetUrl = new URL('/sitemap.xml', url.origin);
  let baseSitemapResponse;
  try {
    baseSitemapResponse = await context.env.ASSETS.fetch(assetUrl);
    if (!baseSitemapResponse.ok) {
      // If the static asset file itself cannot be fetched, return the underlying asset response directly
      return baseSitemapResponse;
    }
  } catch (err) {
    // If the asset binding itself is unavailable, propagate an explicit safe error
    return new Response('Underlying static sitemap asset is unavailable', { status: 503 });
  }

  const baseXml = await baseSitemapResponse.text();

  // If base XML is missing or invalid, return original asset response directly
  if (!baseXml || !baseXml.includes('</urlset>')) {
    return new Response(baseXml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }

  try {
    // 2. Fetch active locations from canonical /api/locations
    const locApiUrl = new URL('/api/locations', url.origin);
    locApiUrl.searchParams.set('t', Date.now().toString());
    const locApiRes = await fetch(locApiUrl.toString(), {
      headers: { 'Cache-Control': 'no-cache' }
    });

    if (!locApiRes.ok) {
      // Fallback: If /api/locations is unavailable, return immutable static base sitemap unchanged
      throw new Error(`Location API returned status ${locApiRes.status}`);
    }

    const locations = await locApiRes.json();
    if (!Array.isArray(locations) || locations.length === 0) {
      // Fallback: Return immutable static base sitemap unchanged
      throw new Error('No location records found');
    }

    // 3. Extract existing <loc> URLs from base sitemap to prevent duplicates
    const existingUrls = new Set();
    const locRegex = /<loc>([^<]+)<\/loc>/gi;
    let match;
    while ((match = locRegex.exec(baseXml)) !== null) {
      existingUrls.add(match[1].trim().toLowerCase());
    }

    // 4. Generate <url> blocks for active, non-reserved, non-duplicate locations
    const newLocationBlocks = [];

    for (const loc of locations) {
      if (!loc || typeof loc !== 'object') continue;
      if (loc.active === false) continue;

      const slug = (loc.slug || '').trim().toLowerCase();
      if (!slug || !/^[a-z0-9-]+$/.test(slug)) continue;
      if (RESERVED_SLUGS.has(slug)) continue;

      // Follow current request origin dynamically (no hardcoded domain)
      const canonicalUrl = `${url.origin}/properties/${slug}`;
      if (existingUrls.has(canonicalUrl.toLowerCase())) continue;

      existingUrls.add(canonicalUrl.toLowerCase());

      // Only include <lastmod> if a reliable updatedAt date exists; otherwise omit completely (no invented dates)
      let lastmodXml = '';
      if (loc.updatedAt) {
        const d = new Date(loc.updatedAt);
        if (!isNaN(d.getTime())) {
          lastmodXml = `\n    <lastmod>${d.toISOString().split('T')[0]}</lastmod>`;
        }
      }

      newLocationBlocks.push(`  <url>
    <loc>${escapeXml(canonicalUrl)}</loc>${lastmodXml}
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`);
    }

    if (newLocationBlocks.length === 0) {
      return new Response(baseXml, {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

    // 5. Append new location blocks cleanly before closing </urlset>
    const closingTagIndex = baseXml.lastIndexOf('</urlset>');
    if (closingTagIndex === -1) {
      return new Response(baseXml, {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
        }
      });
    }

    const mergedXml = baseXml.slice(0, closingTagIndex) + newLocationBlocks.join('\n') + '\n' + baseXml.slice(closingTagIndex);

    return new Response(mergedXml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      }
    });

  } catch (err) {
    // Immutable Fallback: If dynamic processing fails at any step, ALWAYS return original static sitemap.xml unchanged
    return new Response(baseXml, {
      status: 200,
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }
}
