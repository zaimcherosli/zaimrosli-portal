const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

// 1. Update modal header markup to cleanly show category on left, and English button + Close button on right
const oldHeaderRegex = /<div class="blog-modal-header">[\s\S]*?<div id="modal-body-content"/;
const newHeader = `<div class="blog-modal-header">
        <div class="blog-modal-header-left">
          <span id="modal-category" class="blog-modal-badge">PANDUAN PEMBELI</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button id="modal-lang-toggle" class="btn-lang-toggle" onclick="toggleBlogModalLang()">🌐 English</button>
          <button class="blog-modal-close-btn" onclick="closeBlogModal()" aria-label="Tutup Modal">&times;</button>
        </div>
      </div>
      <div id="modal-body-content"`;

html = html.replace(oldHeaderRegex, newHeader);

// 2. Ensure modal close tag has only one closing pair
const oldModalCloseRegex = /<div id="modal-body-content" class="blog-modal-body">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<!-- Toast Notification -->/;
if (oldModalCloseRegex.test(html)) {
  html = html.replace(oldModalCloseRegex, `<div id="modal-body-content" class="blog-modal-body">
        <!-- Content dynamically injected via JavaScript -->
      </div>
    </div>
  </div>

  <!-- Toast Notification -->`);
} else {
  // If only 3 closing divs
  html = html.replace(
    /<div id="modal-body-content" class="blog-modal-body">\s*<!-- Content dynamically injected via JavaScript -->\s*<\/div>[\s\S]*?<!-- Toast Notification -->/,
    `<div id="modal-body-content" class="blog-modal-body">
        <!-- Content dynamically injected via JavaScript -->
      </div>
    </div>
  </div>

  <!-- Toast Notification -->`
  );
}

// 3. Remove any sticky footer remnants in JS
html = html.replace(/\/\/ Update sticky WhatsApp button link in modal footer[\s\S]*?stickyWaBtn\.href = [^;]+;\s*\}/g, '');

fs.writeFileSync('blog.html', html, 'utf8');
console.log('Successfully applied clean header & modal structure in blog.html');
