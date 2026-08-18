const https = require('https');

https.get('https://zaimrosli.my/?t=' + Date.now(), (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Homepage Status:', res.statusCode);
    console.log('✅ Homepage contains Gold SVG icons:', data.includes('stroke="#d97706"'));
  });
});

https.get('https://zaimrosli.my/calculator?t=' + Date.now(), (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Calculator Status:', res.statusCode);
    console.log('✅ Calculator contains DSR Tab:', data.includes('tab-btn-dsr'));
    console.log('✅ Calculator contains Legal Tab:', data.includes('tab-btn-legal'));
    console.log('✅ Calculator contains DSR Meter Box:', data.includes('dsr-meter-box'));
  });
});
