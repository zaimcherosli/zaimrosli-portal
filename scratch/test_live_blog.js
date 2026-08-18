const https = require('https');

https.get('https://zaimrosli.my/blog/panduan-lengkap-sewa-rumah-malaysia-deposit-tenancy-agreement', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status for /blog/[slug]:', res.statusCode);
    const titleMatch = data.match(/<meta property="og:title" content="([^"]+)"/);
    const imgMatch = data.match(/<meta property="og:image" content="([^"]+)"/);
    const descMatch = data.match(/<meta property="og:description" content="([^"]+)"/);
    console.log('✅ og:title:', titleMatch ? titleMatch[1] : 'NOT FOUND');
    console.log('✅ og:image:', imgMatch ? imgMatch[1] : 'NOT FOUND');
    console.log('✅ og:description:', descMatch ? descMatch[1] : 'NOT FOUND');
  });
});
