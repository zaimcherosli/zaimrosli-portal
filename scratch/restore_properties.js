const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('properties-data.js', 'utf8');
content = content.replace('const PROPERTIES_DATA =', 'var PROPERTIES_DATA =');
eval(content);

console.log('Total properties in properties-data.js:', PROPERTIES_DATA.length);

const req = https.request('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Restore to Cloudflare KV Status:', res.statusCode);
    console.log('Response:', d);
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(JSON.stringify(PROPERTIES_DATA));
req.end();
