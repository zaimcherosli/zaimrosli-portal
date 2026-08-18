const https = require('https');

https.get('https://zaimrosli.my/properties/nilai', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Includes LOKASI FOKUS in HTML:', data.includes('LOKASI FOKUS'));
    console.log('Includes Bangi Properties in HTML:', data.includes('Bangi Properties'));
    console.log('Includes Nilai Properties in HTML:', data.includes('Nilai Properties'));
    console.log('app.js version in HTML:', data.match(/app\.js[^"']*/)?.[0]);
  });
});
