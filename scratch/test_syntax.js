const fs = require('fs');
const html = fs.readFileSync('blog.html', 'utf8');

const match = html.match(/<script>\s*(\/\/ Data Lengkap[\s\S]*?)<\/script>\s*<script src="\/pwa\.js">/);
if (match) {
  try {
    new Function(match[1]);
    console.log('✅ PASS: Inline script in blog.html is 100% VALID & SYNTAX-CHECKED!');
  } catch (e) {
    console.error('❌ FAIL: Syntax error:', e.message);
  }
} else {
  console.log('Regex did not match script');
}
