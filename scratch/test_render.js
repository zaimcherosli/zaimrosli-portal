const fs = require('fs');

let content = fs.readFileSync('properties-data.js', 'utf8');
content = content.replace('const PROPERTIES_DATA =', 'var PROPERTIES_DATA =');
eval(content);

const commTypes = ['Factory', 'Industrial Land', 'Commercial Land', 'Commercial Space', 'Office Space', 'Shop / Office', 'Land', 'Kilang', 'Tanah Industri', 'Kedai / Pejabat', 'Ruang Komersial', 'Tanah', 'Tanah Komersial'];
const typeMap = {
  'Tanah': 'Land',
  'Tanah Komersial': 'Commercial Land',
  'Tanah Industri': 'Industrial Land',
  'Kedai / Pejabat': 'Shop / Office',
  'Ruang Komersial': 'Commercial Space',
  'Ruang Pejabat': 'Office Space',
  'Kilang': 'Factory',
  'Banglo': 'Bungalow',
  'Teres': 'Terrace House',
  'Kondominium': 'Condominium',
  'Kondominium / Pangsapuri': 'Condominium'
};

let errors = [];
PROPERTIES_DATA.forEach((p, idx) => {
  try {
    const mainImg = p.image ? p.image.split(',')[0].trim() : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80';
    const badgeClass = p.status === 'sale' ? 'badge-sale-style' : 'badge-rent-style';
    const badgeText = p.status === 'sale' ? 'FOR SALE' : 'FOR RENT';
    const priceDisplay = (p.price != null && !isNaN(Number(p.price))) 
      ? (p.status === 'sale' ? `RM ${Number(p.price).toLocaleString('en-US')}` : `RM ${Number(p.price).toLocaleString('en-US')} / month`) 
      : (p.priceStr || 'RM 0');
    
    const rawType = p.type || (p.landSize && (!p.beds || p.beds === 0) ? 'Land' : '');
    const displayType = typeMap[rawType] || rawType;
    const typeBadge = displayType ? `<span style="background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:6px; font-size:0.72rem; font-weight:700; border:1px solid #bae6fd;">${displayType}</span>` : '';
    const refLinkHtml = p.refUrl ? `<a href="${p.refUrl}" target="_blank">Ref</a>` : '';

    const isCommercial = commTypes.includes(p.type) || (p.type && (p.type.toLowerCase().includes('tanah') || p.type.toLowerCase().includes('land') || p.type.toLowerCase().includes('shop') || p.type.toLowerCase().includes('office') || p.type.toLowerCase().includes('factory') || p.type.toLowerCase().includes('kilang')));
    const isPureLand = ['Land', 'Commercial Land', 'Industrial Land', 'Tanah', 'Tanah Komersial', 'Tanah Industri', 'Tanah Lot', 'Pertanian', 'Agricultural Land'].includes(p.type) || ((!p.type || p.type.toLowerCase().includes('tanah') || p.type.toLowerCase().includes('land')) && (!p.size || p.size === 0 || p.size === '0') && (!p.beds || p.beds === 0));

    const roomLabel = isCommercial ? 'Rooms' : 'Beds';
    const bedsVal = p.bedsPlus > 0 ? `${p.beds}+${p.bedsPlus}` : p.beds;
    const bathsVal = p.bathsPlus > 0 ? `${p.baths}+${p.bathsPlus}` : p.baths;

    const cleanLandText = (p.landSize || '').replace(/\s*\([^)]*\)/g, '').trim();
    const hasLand = cleanLandText && cleanLandText !== '-' && cleanLandText !== '0';
    const hasSize = (p.size && parseFloat(p.size) > 0) && !isPureLand;
    const hasBeds = !isPureLand && p.beds > 0;
    const hasBaths = !isPureLand && p.baths > 0;

    let adminSpecsHTML = '';

    if (isPureLand || (hasLand && !hasBeds && !hasBaths && !hasSize)) {
      adminSpecsHTML = `Land: ${cleanLandText}`;
    } else if (isCommercial && !hasLand && !hasBeds && !hasBaths && hasSize) {
      const formattedSize = (p.size != null && !isNaN(Number(p.size))) ? Number(p.size).toLocaleString('en-US') : (p.size || '-');
      adminSpecsHTML = `Built: ${formattedSize}`;
    } else if (isCommercial) {
      const specItems = [];
      const formattedSize = hasSize ? ((p.size != null && !isNaN(Number(p.size))) ? Number(p.size).toLocaleString('en-US') : p.size) : null;
      if (hasBeds) specItems.push(bedsVal);
      if (hasBaths) specItems.push(bathsVal);
      if (formattedSize) specItems.push(formattedSize);
      if (hasLand) specItems.push(cleanLandText);
      adminSpecsHTML = specItems.join(', ');
    } else {
      const formattedSize = hasSize ? ((p.size != null && !isNaN(Number(p.size))) ? Number(p.size).toLocaleString('en-US') : p.size) : null;
      adminSpecsHTML = `Res: ${formattedSize}`;
    }
  } catch (err) {
    errors.push({ idx, title: p ? p.title : 'unknown', error: err.message, stack: err.stack });
  }
});

console.log('Tested ' + PROPERTIES_DATA.length + ' listings. Errors:', errors);
