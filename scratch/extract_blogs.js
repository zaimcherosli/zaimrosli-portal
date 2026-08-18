const fs = require('fs');

const html = fs.readFileSync('blog.html', 'utf8');
const match = html.match(/const BLOG_ARTICLES = (\[[\s\S]*?\]);\s*let currentOpenArticle/);
if (match) {
  const articles = eval(match[1]);
  console.log('Total articles found:', articles.length);
  articles.forEach((a, i) => {
    console.log(`${i + 1}. [${a.slug}] ${a.title}`);
    console.log(`   Image: ${a.image}`);
  });
} else {
  console.log('BLOG_ARTICLES not matched');
}
