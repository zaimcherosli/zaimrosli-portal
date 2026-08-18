const fs = require('fs');

let html = fs.readFileSync('blog.html', 'utf8');

const jsCode = `
    // Helper untuk menjana teks ringkasan, gambar dan caption perkongsian (Viral Share Payload)
    function getArticleSharePayload(article, lang) {
      if (!article) return null;
      const isEn = (lang === 'en');
      const title = (isEn && article.titleEn) ? article.titleEn : article.title;
      const slug = article.slug;
      const url = \`\${window.location.origin}/blog/\${slug}\`;
      
      let excerpt = '';
      if (slug === 'panduan-lengkap-sewa-rumah-malaysia-deposit-tenancy-agreement') {
        excerpt = isEn
          ? 'Essential 2026 guide on 2+1+0.5 rental deposit breakdown, LHDN Tenancy Stamp Duty formula, and tenant rights in Malaysia.'
          : 'Pecahan formula deposit sewa rumah 2+1+0.5, formula kiraan duti setem STAMPS LHDN & hak undang-undang penyewa.';
      } else if (slug === 'panduan-lengkap-pembeli-rumah-pertama-2026' || slug === 'cara-kira-kelayakan-loan-rumah-dsr-bank') {
        excerpt = isEn
          ? 'Step-by-step guide for first-time home buyers: Debt Service Ratio (DSR), bank loan eligibility, legal fees, and stamp duty rebates.'
          : 'Formula Debt Service Ratio (DSR), kelayakan pinjaman bank, kos guaman, MOT & rebat pengecualian cukai.';
      } else if (slug === 'freehold-vs-leasehold-pelaburan-hartanah-malaysia') {
        excerpt = isEn
          ? 'Comprehensive comparison between Freehold vs Leasehold tenures, state consent rules, and long-term capital appreciation.'
          : 'Perbandingan tenure Pegangan Bebas (Freehold) vs Pegangan Pajakan (Leasehold), kelulusan consent & nilai pasaran.';
      } else if (slug === 'pembangunan-berasaskan-transit-tod-mrt-lrt-kuala-lumpur') {
        excerpt = isEn
          ? 'What is Transit-Oriented Development (TOD)? High rental yield potential near MRT3 & LRT in Klang Valley.'
          : 'Konsep pembangunan TOD berhampiran stesen MRT & LRT, potensi sewa tinggi dan akses mobiliti di Lembah Klang.';
      } else if (slug === 'rumah-subsale-vs-undercon-pemaju-mana-berbaloi') {
        excerpt = isEn
          ? 'Pros and cons of buying subsale homes vs new developer undercon projects in Malaysia.'
          : 'Analisis pro & kontra membeli rumah pasaran kedua (subsale) berbanding projek baru (undercon) dan kos guaman.';
      } else if (slug === 'panduan-menjual-rumah-cepat-terjual-harga-pasaran') {
        excerpt = isEn
          ? 'Complete checklist on selling property in Malaysia: bank valuation, Real Property Gains Tax (RPGT/CKHT) & fast sale strategies.'
          : 'Ketahui kos menjual rumah, Cukai Keuntungan Harta Tanah (RPGT/CKHT), pelepasan gadaian & strategi jualan pantas.';
      } else if (slug === 'refinance-rumah-cash-out-kurangkan-ansuran') {
        excerpt = isEn
          ? 'Smart mortgage refinancing strategies: cash-out equity, lowering monthly bank installments, and debt consolidation.'
          : 'Teknik penyusunan semula pinjaman rumah (refinance) untuk kurangkan ansuran bank & cash out modal ekuiti.';
      } else {
        excerpt = isEn
          ? 'Read verified real estate analysis and property insights by Registered Real Estate Negotiator Zaim Rosli (REN39575).'
          : 'Baca panduan dan analisis hartanah sahih daripada Perunding Hartanah Berdaftar Zaim Rosli (REN39575).';
      }

      const shareText = isEn
        ? \`🏡 *\${title}*\\n\\n💡 *Key Highlights:* \${excerpt}\\n\\n👉 *Read the full guide here:*\\n\${url}\\n\\n✨ Shared from Zaim Rosli (REN39575) Real Estate Portal\\n#PropertyMalaysia #ZaimRosli #RealEstate\`
        : \`🏡 *\${title}*\\n\\n💡 *Ringkasan Utama:* \${excerpt}\\n\\n👉 *Baca panduan penuh di sini:*\\n\${url}\\n\\n✨ Dikongsi daripada Portal Hartanah Zaim Rosli (REN39575)\\n#HartanahMalaysia #ZaimRosli #EjenHartanah\`;

      return {
        title,
        excerpt,
        url,
        shareText,
        image: article.image
      };
    }

    // Paparan Toast Notifikasi
    function showBlogToast(msg) {
      const toast = document.getElementById('blog-share-toast');
      const msgEl = document.getElementById('toast-msg');
      if (toast && msgEl) {
        msgEl.innerText = msg;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 3200);
      }
    }

    // 1. Kongsi ke WhatsApp dengan Teks & Pautan Terformat
    function shareToWhatsApp(targetSlug) {
      const slug = targetSlug || (currentOpenArticle ? currentOpenArticle.slug : null);
      const article = BLOG_ARTICLES.find(a => a.slug === slug) || currentOpenArticle;
      if (!article) return;

      const payload = getArticleSharePayload(article, currentBlogLang);
      const waUrl = \`https://api.whatsapp.com/send?text=\${encodeURIComponent(payload.shareText)}\`;
      window.open(waUrl, '_blank');
    }

    // 2. Kongsi ke Telegram
    function shareToTelegram(targetSlug) {
      const slug = targetSlug || (currentOpenArticle ? currentOpenArticle.slug : null);
      const article = BLOG_ARTICLES.find(a => a.slug === slug) || currentOpenArticle;
      if (!article) return;

      const payload = getArticleSharePayload(article, currentBlogLang);
      const tgUrl = \`https://t.me/share/url?url=\${encodeURIComponent(payload.url)}&text=\${encodeURIComponent(payload.title + '\\n\\n' + payload.excerpt)}\`;
      window.open(tgUrl, '_blank');
    }

    // 3. Kongsi ke Facebook
    function shareToFacebook(targetSlug) {
      const slug = targetSlug || (currentOpenArticle ? currentOpenArticle.slug : null);
      const article = BLOG_ARTICLES.find(a => a.slug === slug) || currentOpenArticle;
      if (!article) return;

      const payload = getArticleSharePayload(article, currentBlogLang);
      const fbUrl = \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(payload.url)}\`;
      window.open(fbUrl, '_blank');
    }

    // 4. Salin Pautan & Info Teks Lengkap
    async function copyArticleShareText(targetSlug) {
      const slug = targetSlug || (currentOpenArticle ? currentOpenArticle.slug : null);
      const article = BLOG_ARTICLES.find(a => a.slug === slug) || currentOpenArticle;
      if (!article) return;

      const payload = getArticleSharePayload(article, currentBlogLang);
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(payload.shareText);
        } else {
          const ta = document.createElement('textarea');
          ta.value = payload.shareText;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        showBlogToast(currentBlogLang === 'en' ? '✅ Link & Summary Copied to Clipboard!' : '✅ Pautan & Ringkasan Berjaya Disalin!');
      } catch (e) {
        showBlogToast(currentBlogLang === 'en' ? 'Pautan: ' + payload.url : 'Pautan: ' + payload.url);
      }
    }

    // 5. Kongsi Asal Peranti Mudah Alih (Native Web Share API)
    async function shareViaNative(targetSlug) {
      const slug = targetSlug || (currentOpenArticle ? currentOpenArticle.slug : null);
      const article = BLOG_ARTICLES.find(a => a.slug === slug) || currentOpenArticle;
      if (!article) return;

      const payload = getArticleSharePayload(article, currentBlogLang);

      if (navigator.share) {
        try {
          await navigator.share({
            title: payload.title,
            text: payload.shareText,
            url: payload.url
          });
          return;
        } catch (err) {
          if (err.name === 'AbortError') return; // User canceled
        }
      }
      
      // Fallback if Web Share API is cancelled or not available
      shareToWhatsApp(slug);
    }

    // Shortcut untuk perkongsian dari Header / Sticky Footer Modal
    function shareCurrentOpenArticle() {
      if (currentOpenArticle) {
        shareViaNative(currentOpenArticle.slug);
      }
    }

    // Shortcut untuk butang Kongsi pada Grid Card
    function shareArticleFromCard(e, slug) {
      if (e && e.stopPropagation) e.stopPropagation();
      shareViaNative(slug);
    }

    // Mengemaskini Kandungan Modal mengikut Bahasa Semasa (BM / EN)
    function renderBlogModalContent() {
      if (!currentOpenArticle) return;
      const article = currentOpenArticle;
      const isEn = currentBlogLang === 'en';

      const categoryText = (isEn && article.categoryEn) ? article.categoryEn : article.category;
      const titleText = (isEn && article.titleEn) ? article.titleEn : article.title;
      const contentText = (isEn && article.contentEn) ? article.contentEn : article.content;
      const dateText = (isEn && article.dateEn) ? article.dateEn : article.date;
      const readTimeText = (isEn && article.readTimeEn) ? article.readTimeEn : article.readTime;

      document.getElementById('modal-category').innerText = categoryText.toUpperCase();

      const langBtn = document.getElementById('modal-lang-toggle');
      if (langBtn) {
        langBtn.innerText = isEn ? '🌐 Bahasa Melayu' : '🌐 English';
      }

      // Update sticky WhatsApp button link in modal footer
      const stickyWaBtn = document.getElementById('sticky-wa-btn');
      if (stickyWaBtn) {
        const waText = isEn
          ? \`Hi Zaim, I am reading your article: "\${titleText}". I would like to consult on real estate.\`
          : \`Halo Zaim, saya sedang membaca panduan "\${titleText}". Boleh saya dapatkan khidmat rundingan hartanah?\`;
        stickyWaBtn.href = \`https://wa.me/60108118559?text=\${encodeURIComponent(waText)}\`;
      }

      const shareSectionHtml = \`
        <div class="blog-share-section">
          <div class="blog-share-header">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <h4 class="blog-share-title">\${isEn ? 'Share This Property Guide' : 'Kongsikan Panduan Hartanah Ini'}</h4>
          </div>
          <p class="blog-share-desc">\${isEn ? 'Help your friends, family, and colleagues make well-informed real estate & financing decisions.' : 'Bantu kenalan, keluarga dan rakan anda membuat keputusan jual beli atau sewa hartanah yang lebih tepat & bijak.'}</p>
          
          <!-- Primary WhatsApp Share Button with Rich Formatted Message -->
          <button type="button" class="btn-share-wa-main" onclick="shareToWhatsApp('\${article.slug}')">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span>\${isEn ? '💬 Share to WhatsApp (with Caption & Preview)' : '💬 Kongsi ke WhatsApp (Beserta Ringkasan & Gambar)'}</span>
          </button>

          <!-- Grid of Alternative Share Channels -->
          <div class="blog-share-grid">
            <button type="button" class="btn-share-item btn-share-native" onclick="shareViaNative('\${article.slug}')" title="\${isEn ? 'Mobile Share Sheet' : 'Kongsi Terus Telefon'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <span>\${isEn ? 'Share' : 'Kongsi'}</span>
            </button>
            <button type="button" class="btn-share-item btn-share-tg" onclick="shareToTelegram('\${article.slug}')" title="Telegram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.196 1.006.128.832.943z"/></svg>
              <span>Telegram</span>
            </button>
            <button type="button" class="btn-share-item btn-share-fb" onclick="shareToFacebook('\${article.slug}')" title="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span>Facebook</span>
            </button>
            <button type="button" class="btn-share-item btn-share-copy" onclick="copyArticleShareText('\${article.slug}')" title="\${isEn ? 'Copy Link & Summary' : 'Salin Pautan & Info'}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>\${isEn ? 'Copy' : 'Salin'}</span>
            </button>
          </div>
        </div>
      \`;

      document.getElementById('modal-body-content').innerHTML = \`
        <div class="blog-article-meta-row">
          <span>📅 \${dateText}</span>
          <span>•</span>
          <span>⏱️ \${readTimeText}</span>
        </div>
        <h1 style="font-size: clamp(1.25rem, 4.5vw, 1.85rem); font-weight: 800; color: var(--primary-navy); margin-bottom: 20px; line-height: 1.3; font-family: var(--font-heading);">\${titleText}</h1>
        \${contentText}
        \${shareSectionHtml}
      \`;
    }
`;

// Replace renderBlogModalContent with the new implementation
const targetStart = '    // Mengemaskini Kandungan Modal mengikut Bahasa Semasa (BM / EN)';
const targetEnd = '    // Menukar Bahasa Secara Instant tanpa Menutup Modal';

const startIdx = html.indexOf(targetStart);
const endIdx = html.indexOf(targetEnd);

if (startIdx !== -1 && endIdx !== -1) {
  html = html.substring(0, startIdx) + jsCode + '\n' + html.substring(endIdx);
  fs.writeFileSync('blog.html', html, 'utf8');
  console.log('Successfully updated JavaScript in blog.html');
} else {
  console.error('Target markers not found in blog.html');
}
