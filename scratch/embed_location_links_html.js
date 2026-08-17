const fs = require('fs');

const desktopSnippet = `            <div style="margin: 6px 8px; border-top: 1px solid rgba(255,255,255,0.15);"></div>
            <div class="dropdown-section-header" style="font-size: 0.72rem; font-weight: 800; color: #fbbf24; padding: 4px 14px 2px; text-transform: uppercase; letter-spacing: 0.8px;">📍 LOKASI FOKUS</div>
            <a href="/properties/bangi" class="dropdown-item">Bangi Properties</a>
            <a href="/properties/nilai" class="dropdown-item">Nilai Properties</a>`;

const mobileSnippet = `            <div style="margin: 6px 12px; border-top: 1px solid rgba(255,255,255,0.1);"></div>
            <div style="font-size: 0.72rem; font-weight: 800; color: #d97706; padding: 6px 12px 2px; text-transform: uppercase; letter-spacing: 0.8px;">📍 LOKASI FOKUS</div>
            <a href="/properties/bangi" class="mobile-drawer-link">Bangi Properties</a>
            <a href="/properties/nilai" class="mobile-drawer-link">Nilai Properties</a>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.includes('sample') && !f.includes('modal') && !f.includes('share'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // 1. Desktop area focus
  if (content.includes('area-focus-desktop')) {
    content = content.replace(/<div class="area-focus-nav area-focus-desktop"><\/div>/g, `<div class="area-focus-nav area-focus-desktop">\n${desktopSnippet}\n            </div>`);
    changed = true;
  }

  // 2. Mobile area focus
  if (content.includes('area-focus-mobile')) {
    content = content.replace(/<div class="area-focus-nav area-focus-mobile"><\/div>/g, `<div class="area-focus-nav area-focus-mobile">\n${mobileSnippet}\n            </div>`);
    changed = true;
  }

  // 3. Bump app.js version
  if (content.includes('/app.js')) {
    content = content.replace(/\/app\.js(\?v=\d+)?/g, '/app.js?v=22');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated navigation in', file);
  }
});
