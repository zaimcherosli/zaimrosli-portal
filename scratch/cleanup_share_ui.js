const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

// 1. Remove sticky footer HTML completely from modal
const stickyFooterRegex = /<!-- Mobile Floating Sticky Bottom Share Bar -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
html = html.replace(stickyFooterRegex, '</div>\n  </div>');

// 2. Remove SVG icon from modal header share button
html = html.replace(
  /<button class="blog-modal-header-share-btn"[^>]*>[\s\S]*?<span class="btn-share-text">Kongsi<\/span>\s*<\/button>/g,
  `<button class="blog-modal-header-share-btn" onclick="shareCurrentOpenArticle()" title="Kongsikan Panduan" aria-label="Kongsikan Panduan">
            <span class="btn-share-text">Kongsi</span>
          </button>`
);

// 3. Remove SVG icon from card share button in grid
html = html.replace(
  /<button type="button" class="btn-card-share" onclick="shareArticleFromCard\([^)]+\)"[^>]*>[\s\S]*?<span>Kongsi<\/span>\s*<\/button>/g,
  (match) => {
    const slugMatch = match.match(/shareArticleFromCard\(event,\s*'([^']+)'\)/);
    const slug = slugMatch ? slugMatch[1] : '';
    return `<button type="button" class="btn-card-share" onclick="shareArticleFromCard(event, '${slug}')" title="Kongsikan Artikel" aria-label="Kongsikan Artikel">
                <span>Kongsi</span>
              </button>`;
  }
);

// 4. In renderBlogModalContent, remove SVG from .blog-share-header and .btn-share-native
html = html.replace(
  /<div class="blog-share-header">[\s\S]*?<h4 class="blog-share-title">/g,
  '<div class="blog-share-header">\n            <h4 class="blog-share-title">'
);

html = html.replace(
  /<button type="button" class="btn-share-item btn-share-native"[^>]*>[\s\S]*?<span>\${isEn \? 'Share' : 'Kongsi'}<\/span>\s*<\/button>/g,
  `<button type="button" class="btn-share-item btn-share-native" onclick="shareViaNative('\${article.slug}')" title="\${isEn ? 'Mobile Share Sheet' : 'Kongsi Terus Telefon'}">
              <span>\${isEn ? 'Share' : 'Kongsi'}</span>
            </button>`
);

// 5. Clean up sticky footer CSS
html = html.replace(/\/\* Mobile Sticky Bottom Bar \*\/[\s\S]*?\.btn-sticky-wa:hover\s*\{[^}]*\}\s*/g, '');
html = html.replace(/\.blog-modal-sticky-footer\s*\{[\s\S]*?\}\s*/g, '');
html = html.replace(/\.btn-sticky-share\s*\{[\s\S]*?\}\s*/g, '');
html = html.replace(/\.btn-sticky-wa\s*\{[\s\S]*?\}\s*/g, '');
html = html.replace(/\.blog-modal-body\s*\{\s*padding-bottom:\s*75px\s*!important;\s*\}\s*/g, '');

fs.writeFileSync('blog.html', html, 'utf8');
console.log('Successfully cleaned up share UI in blog.html');
