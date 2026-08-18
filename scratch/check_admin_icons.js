const fs = require('fs');

const adminHtml = fs.readFileSync('admin.html', 'utf8');
const lines = adminHtml.split('\n');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E0}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/u;

console.log('=== ADMIN.HTML EMOJIS / ICONS ===');
lines.forEach((l, i) => {
  if (emojiRegex.test(l) || l.includes('📍') || l.includes('🏠') || l.includes('🔑') || l.includes('⚙️') || l.includes('📊') || l.includes('➕') || l.includes('⚡') || l.includes('🗑️') || l.includes('✏️')) {
    console.log(`L${i+1}: ${l.trim()}`);
  }
});
