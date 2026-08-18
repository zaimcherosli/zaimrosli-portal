const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const sIdx = content.indexOf('<div class="services-grid">');
const eIdx = content.indexOf('</div>\n    </div>\n  </section>\n\n  <!-- CTA Banner Section -->');
const eIdxCRLF = content.indexOf('</div>\r\n    </div>\r\n  </section>\r\n\r\n  <!-- CTA Banner Section -->');

const finalEndIdx = (eIdx !== -1) ? eIdx : eIdxCRLF;

const newGrid = `<div class="services-grid">
        <div style="background: #ffffff; padding: 36px 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: transform 0.25s, box-shadow 0.25s;">
          <div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 10px;">Property Acquisition</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Assisting home buyers in securing dream residential properties with transparent legal & valuation insights.</p>
        </div>

        <div style="background: #ffffff; padding: 36px 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: transform 0.25s, box-shadow 0.25s;">
          <div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
              <path d="M4 8l5-5 5 5 6-6"></path>
              <polyline points="15 2 20 2 20 7"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 10px;">Exclusive Seller Marketing</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">High-impact digital marketing campaigns and targeted exposure to close property sales at optimal prices.</p>
        </div>

        <div style="background: #ffffff; padding: 36px 32px; border-radius: var(--radius-lg); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); transition: transform 0.25s, box-shadow 0.25s;">
          <div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--primary-navy); margin-bottom: 10px;">Loan & Legal Advisory</h3>
          <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">Pre-screening bank loan eligibility and assisting with SPA, MOT stamp duty, and panel lawyer connections.</p>
        </div>
      </div>`;

if (sIdx !== -1 && finalEndIdx !== -1) {
  content = content.substring(0, sIdx) + newGrid + content.substring(finalEndIdx + 6);
  fs.writeFileSync('index.html', content, 'utf8');
  console.log('Successfully updated index.html with gold SVG badges!');
} else {
  console.error('Markers not found in index.html', sIdx, finalEndIdx);
}
