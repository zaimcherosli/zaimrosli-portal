const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('locations-config.js', 'utf8');
content = content.replace('const LOCATIONS_CONFIG =', 'var LOCATIONS_CONFIG =');
eval(content);

console.log('Locations to sync:', Object.keys(LOCATIONS_CONFIG));

const req = https.request('https://zaimrosli-worker.huzaimrosli.workers.dev/api/locations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Location Sync Status:', res.statusCode);
    console.log('Response:', d);
  });
});

req.on('error', e => console.error('Error syncing locations:', e.message));
req.write(JSON.stringify(LOCATIONS_CONFIG));
req.end();
