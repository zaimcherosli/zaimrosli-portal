const https = require('https');
const fs = require('fs');

https.get('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties?t=' + Date.now(), res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(d);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const cleanListings = parsed.filter(p => p && p.id !== '__SYS_LOCATIONS_DATA__');
        fs.writeFileSync('properties-data.js', 'const PROPERTIES_DATA = ' + JSON.stringify(cleanListings, null, 2) + ';\n', 'utf8');
        console.log('Successfully backed up ' + cleanListings.length + ' live listings into properties-data.js!');
      }
    } catch(e) {
      console.error('Backup error:', e.message);
    }
  });
});
