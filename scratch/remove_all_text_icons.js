const fs = require('fs');

const files = [
  'admin.html',
  'app.js',
  'calculator.html',
  'blog.html',
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'faq.html',
  'foreign-buyers.html',
  'login.html',
  'properties.html',
  'property-detail.html',
  'testimonials.html',
  'location.html',
  'functions/blog/[slug].js',
  'functions/properties/[location].js'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Navigation & Headers
  content = content.replace(/📍\s*LOKASI FOKUS/g, 'LOKASI FOKUS');
  content = content.replace(/🌏\s*Foreign Buyer & Expat Advisory/g, 'Foreign Buyer & Expat Advisory');
  content = content.replace(/🌏\s*Foreign Buyer & Expat Guide/g, 'Foreign Buyer & Expat Guide');
  content = content.replace(/🌏\s*Foreign Buyer Guide/g, 'Foreign Buyer Guide');
  content = content.replace(/🌏\s*INTERNATIONAL INVESTORS & EXPATRIATE GUIDE/g, 'INTERNATIONAL INVESTORS & EXPATRIATE GUIDE');
  content = content.replace(/🌐\s*English/g, 'English');
  content = content.replace(/🌐\s*Bahasa Melayu/g, 'Bahasa Melayu');
  content = content.replace(/🌐\s*View Public Website/g, 'View Public Website');
  content = content.replace(/🔐\s*Sign In/g, 'Sign In');
  content = content.replace(/🔐\s*Admin Login/g, 'Admin Login');
  content = content.replace(/⚡\s*1-Click PropMall Sync Tool/g, 'PropMall Sync Tool');
  content = content.replace(/⚡\s*1-Click PropMall Sync/g, 'PropMall Sync');
  content = content.replace(/⚡\s*Sync to ZaimRosli/g, 'Sync to ZaimRosli');
  content = content.replace(/⚡\s*Pasang Aplikasi Sekarang/g, 'Pasang Aplikasi Sekarang');

  // 2. Calculator & Actions
  content = content.replace(/🧮\s*Calculate Financial Breakdown/g, 'Calculate Financial Breakdown');
  content = content.replace(/🧮\s*Kira Pecahan Kewangan & Guaman/g, 'Kira Pecahan Kewangan & Guaman');
  content = content.replace(/📊\s*Semak Kelayakan Nisbah Hutang \(DSR\)/g, 'Semak Kelayakan Nisbah Hutang (DSR)');
  content = content.replace(/📊\s*ANGGARAN YURAN & ANSURAN HARTANAH/g, 'ANGGARAN YURAN & ANSURAN HARTANAH');
  content = content.replace(/🏦\s*SEMAKAN KELAYAKAN PINJAMAN BANK/g, 'SEMAKAN KELAYAKAN PINJAMAN BANK');
  content = content.replace(/📋\s*PECAHAN YURAN GUAMAN/g, 'PECAHAN YURAN GUAMAN');
  content = content.replace(/✨\s*JUMLAH TUNAI DIPERLUKAN/g, 'JUMLAH TUNAI DIPERLUKAN');
  content = content.replace(/💼\s*Pendapatan Bersih/g, 'Pendapatan Bersih');
  content = content.replace(/💳\s*Komitmen Sedia Ada/g, 'Komitmen Sedia Ada');
  content = content.replace(/📊\s*Komitmen Keseluruhan/g, 'Komitmen Keseluruhan');
  content = content.replace(/📈\s*Nisbah Hutang/g, 'Nisbah Hutang');
  content = content.replace(/🎯\s*Status Kelayakan/g, 'Status Kelayakan');
  content = content.replace(/💵\s*Maksimum Ansuran/g, 'Maksimum Ansuran');
  content = content.replace(/🏡\s*Anggaran Harga Rumah/g, 'Anggaran Harga Rumah');
  content = content.replace(/👉\s*\$\{url\}/g, '${url}');
  content = content.replace(/👉\s*\`/g, '`');
  content = content.replace(/🟢\s*LULUS CEMERLANG/g, 'LULUS CEMERLANG');
  content = content.replace(/🟡\s*SEDERHANA/g, 'SEDERHANA');
  content = content.replace(/🔴\s*RISIKO TINGGI/g, 'RISIKO TINGGI');
  content = content.replace(/🔄\s*Reset/g, 'Reset');
  content = content.replace(/🔍\s*Search/g, 'Search');
  content = content.replace(/📩\s*Submit Inquiry/g, 'Submit Inquiry');
  content = content.replace(/📜\s*LPPEH Certified/g, 'LPPEH Certified');
  content = content.replace(/💼\s*RM50M\+\s*Transacted/g, 'RM50M+ Transacted');
  content = content.replace(/🔥\s*TERJUAL/g, 'TERJUAL');
  content = content.replace(/🔑\s*DISEWAKAN/g, 'DISEWAKAN');
  content = content.replace(/🔥\s*SOLD/g, 'SOLD');
  content = content.replace(/🔑\s*RENTED/g, 'RENTED');

  // 3. Blog & Details
  content = content.replace(/📅\s*/g, '');
  content = content.replace(/⏱️\s*/g, '');
  content = content.replace(/💬\s*Kongsi ke WhatsApp/g, 'Kongsi ke WhatsApp');
  content = content.replace(/💬\s*Share to WhatsApp/g, 'Share to WhatsApp');
  content = content.replace(/💡\s*<strong>Note on Restrictions:<\/strong>/g, '<strong>Note on Restrictions:</strong>');
  content = content.replace(/👉\s*Swipe left \/ right to view full table/g, 'Swipe left / right to view full table');
  content = content.replace(/🌏\s*Foreigner Eligible Listing/g, 'Foreigner Eligible Listing');

  // 4. Admin Portal Specific
  content = content.replace(/🏢\s*Active Listings/g, 'Active Listings');
  content = content.replace(/🏢\s*All Active Listings/g, 'All Active Listings');
  content = content.replace(/🏠\s*Residential Listings/g, 'Residential Listings');
  content = content.replace(/🏭\s*Commercial & Industrial/g, 'Commercial & Industrial');
  content = content.replace(/📍\s*Location SEO Hub/g, 'Location SEO Hub');
  content = content.replace(/📍\s*Location SEO/g, 'Location SEO');
  content = content.replace(/🤝\s*Past Deals/g, 'Past Deals');
  content = content.replace(/📍\s*Hub Pengurusan Lokasi SEO/g, 'Hub Pengurusan Lokasi SEO');
  content = content.replace(/🔄\s*Refresh Data/g, 'Refresh Data');
  content = content.replace(/🔄\s*Refresh Past Deals/g, 'Refresh Past Deals');
  content = content.replace(/🔄\s*Refresh/g, 'Refresh');
  content = content.replace(/💾\s*Save Location/g, 'Save Location');
  content = content.replace(/💾\s*Save to Cloudflare R2/g, 'Save to Cloudflare R2');
  content = content.replace(/✅\s*Saved to Cloudflare R2!/g, 'Saved to Cloudflare R2!');
  content = content.replace(/✅\s*Saved!/g, 'Saved!');
  content = content.replace(/🔗\s*Referral Link \(PropMall\)/g, 'Referral Link (PropMall)');
  content = content.replace(/🙈\s*HIDDEN FROM MAIN PAGE/g, 'HIDDEN FROM MAIN PAGE');
  content = content.replace(/📊\s*Matching Listings:/g, 'Matching Listings:');
  content = content.replace(/✏️\s*Edit/g, 'Edit');
  content = content.replace(/🗑️\s*Delete/g, 'Delete');
  content = content.replace(/💡\s*Click & drag images/g, 'Click & drag images');
  content = content.replace(/✓\s*ACTIVE \(INDEXED\)/g, 'ACTIVE (INDEXED)');
  content = content.replace(/✓\s*Comprehensive/g, 'Comprehensive');
  content = content.replace(/✓\s*On-site/g, 'On-site');
  content = content.replace(/✓\s*Offer/g, 'Offer');
  content = content.replace(/✓\s*Professional/g, 'Professional');
  content = content.replace(/✓\s*Targeted/g, 'Targeted');
  content = content.replace(/✓\s*Pre-qualified/g, 'Pre-qualified');
  content = content.replace(/✓\s*Tenant/g, 'Tenant');
  content = content.replace(/✓\s*Standard/g, 'Standard');
  content = content.replace(/✓\s*Inventory/g, 'Inventory');
  content = content.replace(/✓\s*Complimentary/g, 'Complimentary');
  content = content.replace(/✓\s*SPA,/g, 'SPA,');
  content = content.replace(/✓\s*LPPSA/g, 'LPPSA');

  // Specific text cleanups
  content = content.replace(/📍\s*\$\{prop\.location\}/g, '${prop.location}');
  content = content.replace(/📍\s*\$\{d\.location\}/g, '${d.location}');
  content = content.replace(/📍\s*\$\{item\.location\}/g, '${item.location}');
  content = content.replace(/📍\s*\$\{loc\.state/g, '${loc.state');
  content = content.replace(/>📍\s*Location</g, '>Location<');
  content = content.replace(/<span>📍<\/span>/g, '');
  content = content.replace(/<span>📱<\/span>/g, '');
  content = content.replace(/<span>💻<\/span>/g, '');
  content = content.replace(/<span>📋<\/span>/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned icons in front of text in: ${file}`);
  }
});

console.log('All files processed!');
