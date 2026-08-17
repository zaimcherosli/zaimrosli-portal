const fs = require('fs');

const mainPages = [
  'index.html',
  'properties.html',
  'property-detail.html',
  'about.html',
  'services.html',
  'contact.html',
  'calculator.html',
  'foreign-buyers.html',
  'blog.html',
  'faq.html',
  'testimonials.html'
];

mainPages.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('locations-config.js')) {
      content = content.replace(/(<script\s+src=["']\/app\.js[^>]*><\/script>)/, '<script src="/locations-config.js?v=20"></script>\n  $1');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Added locations-config.js to', file);
    }
  }
});
