const fs = require('fs');

// 1. about.html
let about = fs.readFileSync('about.html', 'utf8');
about = about.replace("alert('📋 Link profil Zaim Rosli telah disalin!');", "alert('Link profil Zaim Rosli telah disalin!');");
fs.writeFileSync('about.html', about, 'utf8');

// 2. app.js
let app = fs.readFileSync('app.js', 'utf8');
app = app.replace("alert('📋 Pautan hartanah telah disalin!');", "alert('Pautan hartanah telah disalin!');");
fs.writeFileSync('app.js', app, 'utf8');

// 3. blog.html
let blog = fs.readFileSync('blog.html', 'utf8');
blog = blog.replace('<span class="toast-icon">✅</span>', '');
blog = blog.replace("'✅ Link & Summary Copied to Clipboard!'", "'Link & Summary Copied to Clipboard!'");
blog = blog.replace("'✅ Pautan & Ringkasan Berjaya Disalin!'", "'Pautan & Ringkasan Berjaya Disalin!'");
blog = blog.replace('`🏡 *${title}*\\n\\n💡 *Key Highlights:* ${excerpt}\\n\\n👉 *Read the full guide here:*\\n${url}\\n\\n✨ Shared from Zaim Rosli (REN39575) Real Estate Portal\\n#PropertyMalaysia #ZaimRosli #RealEstate`', '`*${title}*\\n\\n*Key Highlights:* ${excerpt}\\n\\n*Read the full guide here:*\\n${url}\\n\\nShared from Zaim Rosli (REN39575) Real Estate Portal\\n#PropertyMalaysia #ZaimRosli #RealEstate`');
blog = blog.replace('`🏡 *${title}*\\n\\n💡 *Ringkasan Utama:* ${excerpt}\\n\\n👉 *Baca panduan penuh di sini:*\\n${url}\\n\\n✨ Dikongsi daripada Portal Hartanah Zaim Rosli (REN39575)\\n#HartanahMalaysia #ZaimRosli #EjenHartanah`', '`*${title}*\\n\\n*Ringkasan Utama:* ${excerpt}\\n\\n*Baca panduan penuh di sini:*\\n${url}\\n\\nDikongsi daripada Portal Hartanah Zaim Rosli (REN39575)\\n#HartanahMalaysia #ZaimRosli #EjenHartanah`');
fs.writeFileSync('blog.html', blog, 'utf8');

// 4. calculator.html
let calc = fs.readFileSync('calculator.html', 'utf8');
calc = calc.replace('`📊 *ANGGARAN YURAN & ANSURAN HARTANAH*', '`*ANGGARAN YURAN & ANSURAN HARTANAH*');
calc = calc.replace('🏠 *Harga Hartanah:*', '*Harga Hartanah:*');
calc = calc.replace('💰 *Deposit (', '*Deposit (');
calc = calc.replace('🏦 *Pinjaman (', '*Pinjaman (');
calc = calc.replace('📈 *Kadar Faedah:*', '*Kadar Faedah:*');
calc = calc.replace('💵 *Ansuran Bulanan:*', '*Ansuran Bulanan:*');
calc = calc.replace('📋 *PECAHAN YURAN GUAMAN & STAMP DUTY:*', '*PECAHAN YURAN GUAMAN & STAMP DUTY:*');
calc = calc.replace('✨ *JUMLAH TUNAI DIPERLUKAN:*', '*JUMLAH TUNAI DIPERLUKAN:*');
calc = calc.replace("alert('📋 Hasil lengkap kalkulator telah disalin!');", "alert('Hasil lengkap kalkulator telah disalin!');");

calc = calc.replace('`🏦 *SEMAKAN KELAYAKAN PINJAMAN BANK (DSR)*', '`*SEMAKAN KELAYAKAN PINJAMAN BANK (DSR)*');
calc = calc.replace('💼 *Pendapatan Bersih:*', '*Pendapatan Bersih:*');
calc = calc.replace('💳 *Komitmen Sedia Ada:*', '*Komitmen Sedia Ada:*');
calc = calc.replace('📊 *Komitmen Keseluruhan:*', '*Komitmen Keseluruhan:*');
calc = calc.replace('📈 *Nisbah Hutang (DSR):*', '*Nisbah Hutang (DSR):*');
calc = calc.replace('🎯 *Status Kelayakan:*', '*Status Kelayakan:*');
calc = calc.replace('💵 *Maksimum Ansuran Dibenarkan:*', '*Maksimum Ansuran Dibenarkan:*');
calc = calc.replace('🏡 *Anggaran Harga Rumah Mampu Milik:*', '*Anggaran Harga Rumah Mampu Milik:*');
calc = calc.replace("alert('📋 Hasil semakan DSR telah disalin!');", "alert('Hasil semakan DSR telah disalin!');");
fs.writeFileSync('calculator.html', calc, 'utf8');

// 5. contact.html
let contact = fs.readFileSync('contact.html', 'utf8');
contact = contact.replace('✅ Thank you! Your inquiry has been submitted successfully.', 'Thank you! Your inquiry has been submitted successfully.');
contact = contact.replace('`✅ Terima kasih ${name}!', '`Terima kasih ${name}!');
contact = contact.replace('👤 Nama:', 'Nama:');
contact = contact.replace('📧 Email:', 'Email:');
contact = contact.replace('📱 No Telefon:', 'No Telefon:');
contact = contact.replace('🏷️ Perkhidmatan:', 'Perkhidmatan:');
contact = contact.replace('💬 Mesej:', 'Mesej:');
fs.writeFileSync('contact.html', contact, 'utf8');

// 6. property-detail.html
let propDetail = fs.readFileSync('property-detail.html', 'utf8');
propDetail = propDetail.replace(
  '<div style="font-size: 3rem; margin-bottom: 12px;">🏡</div>',
  `<div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>`
);
fs.writeFileSync('property-detail.html', propDetail, 'utf8');

// 7. services.html
let services = fs.readFileSync('services.html', 'utf8');
services = services.replace(
  '<div style="font-size: 2.5rem; margin-bottom: 16px;">🏡</div>',
  `<div style="width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(245, 158, 11, 0.04)); border: 1.5px solid rgba(217, 119, 6, 0.28); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; box-shadow: 0 4px 14px rgba(217, 119, 6, 0.08);">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </div>`
);
fs.writeFileSync('services.html', services, 'utf8');

// 8. admin.html
let admin = fs.readFileSync('admin.html', 'utf8');
admin = admin.replace(
  '<button onclick="loadPropertiesList()" class="btn-icon-round" style="width: 36px; height: 36px; border-radius: 9px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" title="Refresh Data">🔄</button>',
  `<button onclick="loadPropertiesList()" class="btn-icon-round" style="width: 36px; height: 36px; border-radius: 9px; border: 1px solid #cbd5e1; background: #ffffff; color: #334155; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0,0,0,0.04);" title="Refresh Data">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
  </button>`
);
admin = admin.replace(
  `<button onclick="deleteLocation('\${loc.slug}')" class="btn" style="padding:7px 10px; background:#fef2f2; border:1px solid #fca5a5; color:#dc2626; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer;" title="Delete Location">🗑️</button>`,
  `<button onclick="deleteLocation('\${loc.slug}')" class="btn" style="padding:7px 10px; background:#fef2f2; border:1px solid #fca5a5; color:#dc2626; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer;" title="Delete Location">Delete</button>`
);
fs.writeFileSync('admin.html', admin, 'utf8');

// 9. pwa.js
let pwa = fs.readFileSync('pwa.js', 'utf8');
pwa = pwa.replace('<span>⚡ Pasang Aplikasi Sekarang (1-Click)</span>', '<span>Pasang Aplikasi Sekarang (1-Click)</span>');
fs.writeFileSync('pwa.js', pwa, 'utf8');

console.log('Final emoji cleanup successfully completed across all target files!');
