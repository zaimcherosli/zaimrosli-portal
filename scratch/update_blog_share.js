const fs = require('fs');

let content = fs.readFileSync('blog.html', 'utf8');

// 1. Add CSS for Share System before </style>
const cssToAdd = `
    /* Share Buttons & Card Styling */
    .blog-share-section {
      background: linear-gradient(145deg, #f8fafc, #f1f5f9);
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 24px 20px;
      margin: 32px 0 24px 0;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
      position: relative;
    }
    .blog-share-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .blog-share-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: var(--primary-navy);
      font-family: var(--font-heading);
      margin: 0;
    }
    .blog-share-desc {
      font-size: 0.88rem;
      color: #64748b;
      margin-bottom: 18px;
      line-height: 1.5;
    }
    .btn-share-wa-main {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 48px;
      padding: 12px 18px;
      border-radius: 12px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: #ffffff !important;
      font-weight: 800;
      font-size: 0.95rem;
      text-decoration: none !important;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
      transition: all 0.2s ease;
      box-sizing: border-box;
      margin-bottom: 12px;
    }
    .btn-share-wa-main:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
    }
    .blog-share-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .btn-share-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 8px;
      border-radius: 10px;
      font-size: 0.82rem;
      font-weight: 700;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s ease;
      text-decoration: none !important;
      box-sizing: border-box;
      white-space: nowrap;
    }
    .btn-share-item:hover {
      transform: translateY(-2px);
    }
    .btn-share-native {
      background: #0f172a;
      color: #ffffff !important;
    }
    .btn-share-native:hover {
      background: #1e293b;
    }
    .btn-share-tg {
      background: #229ed9;
      color: #ffffff !important;
    }
    .btn-share-tg:hover {
      background: #1d87ba;
    }
    .btn-share-fb {
      background: #1877f2;
      color: #ffffff !important;
    }
    .btn-share-fb:hover {
      background: #1565d8;
    }
    .btn-share-copy {
      background: #ffffff;
      color: #334155 !important;
      border-color: #cbd5e1;
    }
    .btn-share-copy:hover {
      background: #f8fafc;
      border-color: #94a3b8;
    }

    /* Quick Card Share Button on Grid */
    .btn-card-share {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      background: #f1f5f9;
      color: #334155;
      font-size: 0.84rem;
      font-weight: 700;
      border: 1px solid #e2e8f0;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    .btn-card-share:hover {
      background: #d97706;
      color: #ffffff;
      border-color: #d97706;
    }

    /* Header Share Icon inside Modal */
    .blog-modal-header-share-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 20px;
      background: #fef3c7;
      color: #b45309;
      font-size: 0.82rem;
      font-weight: 800;
      border: 1px solid #fde68a;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .blog-modal-header-share-btn:hover {
      background: #f59e0b;
      color: #ffffff;
      border-color: #f59e0b;
    }

    /* Mobile Sticky Bottom Bar */
    .blog-modal-sticky-footer {
      display: none;
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 10px 14px;
      border-top: 1px solid rgba(245, 158, 11, 0.35);
      z-index: 100;
      gap: 10px;
    }
    .btn-sticky-share {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      background: linear-gradient(135deg, #d97706, #b45309);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.88rem;
      cursor: pointer;
    }
    .btn-sticky-wa {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 44px;
      background: linear-gradient(135deg, #25d366, #128c7e);
      color: #ffffff !important;
      border: none;
      border-radius: 10px;
      font-weight: 800;
      font-size: 0.88rem;
      text-decoration: none !important;
    }

    /* Toast Notification */
    .blog-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #0f172a;
      color: #ffffff;
      padding: 12px 22px;
      border-radius: 30px;
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      border: 1px solid #d97706;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 99999;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .blog-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
      pointer-events: auto;
    }

    @media (max-width: 768px) {
      .blog-share-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
      .blog-modal-sticky-footer {
        display: flex;
      }
      .blog-modal-body {
        padding-bottom: 75px !important;
      }
    }
`;

if (!content.includes('.blog-share-section')) {
  content = content.replace('</style>', `${cssToAdd}\n  </style>`);
}

// 2. Update Blog Modal markup to include header share button, mobile sticky footer, and toast
const oldModalHeader = `<div class="blog-modal-header">
        <div class="blog-modal-header-left">
          <span id="modal-category" class="blog-modal-badge">PANDUAN PEMBELI</span>
          <button id="modal-lang-toggle" class="btn-lang-toggle" onclick="toggleBlogModalLang()">🌐 English</button>
        </div>
        <button class="blog-modal-close-btn" onclick="closeBlogModal()" aria-label="Tutup Modal">&times;</button>
      </div>`;

const newModalHeader = `<div class="blog-modal-header">
        <div class="blog-modal-header-left">
          <span id="modal-category" class="blog-modal-badge">PANDUAN PEMBELI</span>
          <button id="modal-lang-toggle" class="btn-lang-toggle" onclick="toggleBlogModalLang()">🌐 English</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="blog-modal-header-share-btn" onclick="shareCurrentOpenArticle()" title="Kongsikan Panduan" aria-label="Kongsikan Panduan">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span class="btn-share-text">Kongsi</span>
          </button>
          <button class="blog-modal-close-btn" onclick="closeBlogModal()" aria-label="Tutup Modal">&times;</button>
        </div>
      </div>`;

content = content.replace(oldModalHeader, newModalHeader);

const oldModalEnd = `<div id="modal-body-content" class="blog-modal-body">
        <!-- Content dynamically injected via JavaScript -->
      </div>
    </div>
  </div>`;

const newModalEnd = `<div id="modal-body-content" class="blog-modal-body">
        <!-- Content dynamically injected via JavaScript -->
      </div>

      <!-- Mobile Floating Sticky Bottom Share Bar -->
      <div class="blog-modal-sticky-footer">
        <button type="button" class="btn-sticky-share" onclick="shareCurrentOpenArticle()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          <span>Kongsi Panduan</span>
        </button>
        <a id="sticky-wa-btn" href="https://wa.me/60108118559" target="_blank" class="btn-sticky-wa">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Tanya Zaim</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div id="blog-share-toast" class="blog-toast" role="alert" aria-live="polite">
    <span class="toast-icon">✅</span>
    <span id="toast-msg">Pautan & Ringkasan Berjaya Disalin!</span>
  </div>`;

content = content.replace(oldModalEnd, newModalEnd);

// 3. Update all 7 blog cards in grid to have both Read and Share buttons
content = content.replace(
  /<button class="btn-read-article" onclick="openBlogModal\('([^']+)'\)">Baca Artikel Penuh →<\/button>/g,
  `<div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn-read-article" style="flex: 1;" onclick="openBlogModal('$1')">Baca Artikel Penuh →</button>
              <button type="button" class="btn-card-share" onclick="shareArticleFromCard(event, '$1')" title="Kongsikan Artikel" aria-label="Kongsikan Artikel">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Kongsi</span>
              </button>
            </div>`
);

fs.writeFileSync('blog.html', content, 'utf8');
console.log('Successfully updated HTML structure and styles in blog.html');
