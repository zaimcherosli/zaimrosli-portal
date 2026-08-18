const fs = require('fs');

const files = ['admin.html', 'app.js', 'calculator.html', 'blog.html', 'index.html', 'services.html', 'about.html', 'contact.html', 'faq.html', 'foreign-buyers.html', 'login.html', 'properties.html', 'property-detail.html', 'testimonials.html', 'location.html'];

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n=== ${file} ===`);
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      console.log(`L${idx+1}: ${line.trim()}`);
    }
  });
});
