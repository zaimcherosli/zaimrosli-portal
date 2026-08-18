const BLOG_METADATA = {
  "panduan-lengkap-sewa-rumah-malaysia-deposit-tenancy-agreement": {
    title: "Panduan Lengkap Rumah Sewa Di Malaysia 2026 (Deposit 2+1+0.5 & Hak Penyewa) — Zaim Rosli (REN39575)",
    description: "Ketahui pecahan formula deposit 2+1+0.5, kiraan duti setem STAMPS LHDN, dan hak undang-undang penyewa rumah di Selangor & Kuala Lumpur.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-17",
    category: "Panduan Sewa Rumah"
  },
  "cara-kira-kelayakan-loan-rumah-dsr-bank": {
    title: "Cara Kira Kelayakan Pinjaman Rumah Bank (Formula DSR & NDI 2026) — Zaim Rosli (REN39575)",
    description: "Panduan semakan formula Debt Service Ratio (DSR), komitmen CCRIS/CTOS, dan gaji bersih minimum untuk lulus pinjaman perumahan bank Malaysia.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-15",
    category: "Kewangan & Pinjaman"
  },
  "freehold-vs-leasehold-pelaburan-hartanah-malaysia": {
    title: "Freehold vs Leasehold: Mana Lebih Untung & Selamat? — Zaim Rosli (REN39575)",
    description: "Perbandingan mendalam tenure Pegangan Bebas (Freehold) berbanding Pegangan Pajakan (Leasehold), kelulusan consent pihak berkuasa negeri, dan nilai pasaran.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-12",
    category: "Panduan Pembeli"
  },
  "pembangunan-berasaskan-transit-tod-mrt-lrt-kuala-lumpur": {
    title: "Apa Itu Hartanah TOD? Kelebihan Rumah Berdekatan MRT & LRT — Zaim Rosli (REN39575)",
    description: "Panduan konsep Transit-Oriented Development (TOD) di Lembah Klang, potensi pulangan sewa tinggi, dan projek kediaman laluan MRT3 / LRT.",
    image: "https://images.unsplash.com/photo-1577017040065-650ee4d43339?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-10",
    category: "Trend Pasaran"
  },
  "rumah-subsale-vs-undercon-projek-baru-mana-lagi-untung": {
    title: "Rumah Subsale vs Undercon Projek Baru: Mana Lebih Untung? — Zaim Rosli (REN39575)",
    description: "Analisis pro dan kontra membeli rumah pasaran kedua (subsale) berbanding projek dalam pembinaan (undercon/developer), kos peguam dan aliran tunai.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-08",
    category: "Panduan Pembeli"
  },
  "panduan-lengkap-jual-rumah-malaysia-rpgt-kos-ejen": {
    title: "Panduan Lengkap Menjual Rumah Di Malaysia: Kos, RPGT & Lantikan Ejen — Zaim Rosli (REN39575)",
    description: "Ketahui kos sebenar menjual rumah termasuk Cukai Keuntungan Harta Tanah (RPGT/CKHT), yuran guaman pelepasan gadaian (discharge), dan strategi jualan pantas.",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-05",
    category: "Panduan Pemilik Rumah"
  },
  "refinance-rumah-cash-out-kurangkan-ansuran": {
    title: "Kelebihan Refinance Rumah: Teknik Cash Out & Kurangkan Ansuran — Zaim Rosli (REN39575)",
    description: "Panduan penyusunan semula pembiayaan perumahan (mortgage refinancing) untuk kurangkan kadar faedah bank, cash out modal bisnes, atau selesaikan hutang.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    date: "2026-08-01",
    category: "Kewangan & Pinjaman"
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const targetSlug = (context.params.slug || '').toLowerCase().trim();

  // 1. Fetch base blog.html template
  const assetUrl = new URL('/blog.html', url.origin);
  const response = await context.env.ASSETS.fetch(assetUrl);
  if (!response.ok) return response;

  const meta = BLOG_METADATA[targetSlug];
  if (!meta) {
    // If slug not found in static registry, return default blog page (client-side JS will handle or fallback)
    return response;
  }

  try {
    let html = await response.text();
    const canonicalUrl = `${url.origin}/blog/${targetSlug}`;
    const escapedTitle = escapeHtml(meta.title);
    const escapedDesc = escapeHtml(meta.description);
    const imgUrl = meta.image;

    // Build Schema.org Article Structured Data
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      },
      "headline": meta.title,
      "description": meta.description,
      "image": [imgUrl],
      "datePublished": meta.date,
      "dateModified": meta.date,
      "author": {
        "@type": "Person",
        "name": "Zaim Rosli (REN39575)",
        "jobTitle": "Registered Real Estate Negotiator",
        "url": "https://zaimrosli.my/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Zaim Rosli Real Estate Portal",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zaimrosli.my/icons/icon-512.png"
        }
      }
    };

    const ogTags = `
  <title>${escapedTitle}</title>
  <meta name="description" content="${escapedDesc}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta property="og:site_name" content="Zaim Rosli Real Estate Portal">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${escapedTitle}">
  <meta property="og:description" content="${escapedDesc}">
  <meta property="og:image" content="${imgUrl}">
  <meta property="og:image:secure_url" content="${imgUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapedTitle}">
  <meta name="twitter:description" content="${escapedDesc}">
  <meta name="twitter:image" content="${imgUrl}">
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
`;

    html = html.replace('<head>', '<head>' + ogTags);

    return new Response(html, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (err) {
    return response;
  }
}
