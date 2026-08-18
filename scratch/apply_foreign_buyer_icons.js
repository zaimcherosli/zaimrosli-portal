const fs = require('fs');

let fbHtml = fs.readFileSync('foreign-buyers.html', 'utf8');

const oldGrid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🏛️</div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">100% Direct Ownership</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.5;">Foreigners can hold 100% legal title (Freehold or Leasehold) in their own individual or company name under the National Land Code.</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">📈</div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">High Rental Yields</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.5;">Kuala Lumpur & Cyberjaya tech corridors offer compelling rental yields ranging from 4.5% to 7.0% per annum with steady capital appreciation.</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🛂</div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">MM2H & Visa Friendly</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.5;">Malaysia My Second Home (MM2H) and Premium Visa Programme (PVIP) holders enjoy relaxed property acquisition incentives and extended stay permits.</p>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px;">
          <div style="font-size: 2.2rem; margin-bottom: 12px;">🏦</div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Mortgage Financing Available</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.5;">Malaysian commercial banks provide competitive housing loans for non-residents, with margins typically up to 70% - 80% Margin of Finance.</p>
        </div>
      </div>`;

const newGrid = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="M9 12l2 2 4-4"></path>
            </svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">100% Direct Ownership</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.6;">Foreigners can hold 100% legal title (Freehold or Leasehold) in their own individual or company name under the National Land Code.</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
              <path d="M4 8l5-5 5 5 6-6"></path>
              <polyline points="15 2 20 2 20 7"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">High Rental Yields</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.6;">Kuala Lumpur & Cyberjaya tech corridors offer compelling rental yields ranging from 4.5% to 7.0% per annum with steady capital appreciation.</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">MM2H & Visa Friendly</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.6;">Malaysia My Second Home (MM2H) and Premium Visa Programme (PVIP) holders enjoy relaxed property acquisition incentives and extended stay permits.</p>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);">
          <div style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.08);">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Mortgage Financing Available</h3>
          <p style="font-size: 0.90rem; color: #64748b; line-height: 1.6;">Malaysian commercial banks provide competitive housing loans for non-residents, with margins typically up to 70% - 80% Margin of Finance.</p>
        </div>
      </div>`;

fbHtml = fbHtml.replace(oldGrid, newGrid);
fs.writeFileSync('foreign-buyers.html', fbHtml, 'utf8');
console.log('Successfully updated foreign-buyers.html icons');
