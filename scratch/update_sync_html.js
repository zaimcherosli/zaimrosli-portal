const fs = require('fs');

const bookmarklet = fs.readFileSync('scratch/encoded_bookmarklet.txt', 'utf8');
let html = fs.readFileSync('propmall-sync.html', 'utf8');

html = html.replace(/<div class="hero-badge">[\s\S]*?<\/div>/, '<div class="hero-badge">⚡ PropMall Auto-Sync v4.0 (Anti-Popup & Smart Scraper)</div>');
html = html.replace(/Salin Kod Bookmarklet \(v3\.1\)/g, 'Salin Kod Bookmarklet (v4.0)');

const startMarker = 'const bookmarkletCode = `';
const endMarker = '`;';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx + startMarker.length) + bookmarklet + html.substring(endIdx);
  fs.writeFileSync('propmall-sync.html', html, 'utf8');
  console.log('Successfully updated propmall-sync.html with v4.0 bookmarklet!');
} else {
  console.error('Could not find bookmarklet code marker in propmall-sync.html');
}
