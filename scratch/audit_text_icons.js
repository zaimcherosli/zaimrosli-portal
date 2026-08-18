const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));

// Regex to detect emojis in text
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

console.log('=== AUDITING EMOJIS & TEXT ICONS ACROSS ALL FILES ===\n');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const found = [];
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      found.push({ lineNum: idx + 1, text: line.trim() });
    }
  });
  if (found.length > 0) {
    console.log(`\n--- ${file} (${found.length} lines with emojis) ---`);
    found.slice(0, 15).forEach(item => {
      console.log(`  L${item.lineNum}: ${item.text.substring(0, 100)}`);
    });
    if (found.length > 15) {
      console.log(`  ... and ${found.length - 15} more lines`);
    }
  }
});
