const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

// Ensure proper closing of the blog grid and insertion of blog-modal before footer
const sectionBeforeFooter = `            <div style="display: flex; gap: 8px; margin-top: 14px;">
              <button class="btn-read-article" style="flex: 1;" onclick="openBlogModal('refinance-rumah-cash-out-kurangkan-ansuran')">Baca Artikel Penuh →</button>
              <button type="button" class="btn-card-share" onclick="shareArticleFromCard(event, 'refinance-rumah-cash-out-kurangkan-ansuran')" title="Kongsikan Artikel" aria-label="Kongsikan Artikel">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Kongsi</span>
              </button>
            </div>
          </div>
        </article>

      </div>

    </div>
  </section>

  <!-- Interactive Article Modal -->
  <div id="blog-modal" class="blog-modal-overlay" aria-hidden="true" role="dialog">
    <div class="blog-modal-card">
      <div class="blog-modal-header">
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
      </div>
      <div id="modal-body-content" class="blog-modal-body">
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
  </div>

  <!-- Site Footer -->`;

const startTarget = '            <div style="display: flex; gap: 8px; margin-top: 14px;">\n              <button class="btn-read-article" style="flex: 1;" onclick="openBlogModal(\'refinance-rumah-cash-out-kurangkan-ansuran\')">';
const endTarget = '  <!-- Site Footer -->';

const sIdx = html.indexOf(startTarget);
const eIdx = html.indexOf(endTarget);

if (sIdx !== -1 && eIdx !== -1) {
  html = html.substring(0, sIdx) + sectionBeforeFooter + html.substring(eIdx + endTarget.length);
  fs.writeFileSync('blog.html', html, 'utf8');
  console.log('Successfully structured blog.html cleanly!');
} else {
  console.error('Could not find markers', sIdx, eIdx);
}
