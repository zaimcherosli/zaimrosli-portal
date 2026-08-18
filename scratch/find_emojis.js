const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('font-size: 2.') && (l.includes('🏠') || l.includes('📈') || l.includes('📑') || l.includes('🏢') || l.includes('⚖️') || l.includes('📊'))) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
