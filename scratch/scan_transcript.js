const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('C:\\Users\\Zaim\\.gemini\\antigravity\\brain\\37fd2375-2870-4fc9-b0dd-6a199aa85017\\.system_generated\\logs\\transcript_full.jsonl')
});

const foundListings = new Map();

rl.on('line', line => {
  if (line.includes('"title"') && line.includes('"price"')) {
    try {
      const reg = /\{[^{}]*"id"[^{}]*"title"[^{}]*"price"[^{}]*\}/g;
      const m = line.match(reg);
      if (m) {
        m.forEach(str => {
          try {
            const obj = JSON.parse(str);
            if (obj.title && obj.price) {
              foundListings.set(obj.title, obj);
            }
          } catch(e) {}
        });
      }
    } catch(e) {}
  }
});

rl.on('close', () => {
  console.log('Total extracted unique listings:', foundListings.size);
  let idx = 1;
  for (const [title, item] of foundListings.entries()) {
    console.log(idx++ + '. ' + title + ' (' + item.priceStr + ')');
  }
});
