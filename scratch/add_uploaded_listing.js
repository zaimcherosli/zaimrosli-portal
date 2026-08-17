const fs = require('fs');
const https = require('https');

let content = fs.readFileSync('properties-data.js', 'utf8');
content = content.replace('const PROPERTIES_DATA =', 'var PROPERTIES_DATA =');
eval(content);

const newListing = {
  id: "prop-" + Date.now(),
  slug: "endlot-shop-lot-for-rent-bandar-mahkota-bangi-kajang-nilai",
  title: "Endlot Shop Lot for Rent Bandar Mahkota Bangi Kajang Nilai",
  price: 4500,
  priceStr: "RM 4,500 / month",
  category: "Rental",
  location: "Bandar Mahkota Bangi, Kajang",
  region: "Selangor",
  type: "Shop / Office",
  status: "rent",
  beds: 0,
  bedsPlus: 0,
  baths: 2,
  bathsPlus: 0,
  parking: 2,
  size: 1300,
  landSize: "20×65",
  tenure: "-",
  lotType: "-",
  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
  ],
  description: "WTL / FOR RENT\n\nEndlot Shop Lot for Rent Bandar Mahkota Bangi Kajang Nilai\n\nPROPERTY DETAILS\n- Type : Shop / Office\n- Size : 20×65\n- Facing House and Empty Land\n- Endlot\n- New Repaint\n- Rental Whole Unit RM4,500\n- Nearby : Highway, Lotus, MCD, Hospital, University, Kinder garden, Residence Area\n\n========================\nAsking Rental : RM 4,500 / month\n========================\n\n--- MAKLUMAT ASAL (RUJUKAN EJEN) ---\nEjen Listing : Zaim Rosli\nAgensi : JAZ INTERNATIONAL MALAYSIA SDN BHD (VEPM (1) 0120/4)\nNo. Tel : +60108118559\nPautan Rujukan : https://propmall.co/listing?str=nilai&state=&area=&price_min=&price_max=&category=2012&type=&room=any&bath=any&goprice=ANY&status=ALL",
  refUrl: "https://propmall.co/listing?str=nilai&state=&area=&price_min=&price_max=&category=2012&type=&room=any&bath=any&goprice=ANY&status=ALL",
  hidden: false
};

// Insert at the top
const existing = PROPERTIES_DATA.filter(p => p.slug !== newListing.slug && p.id !== newListing.id);
const fullData = [newListing, ...existing];

// 1. Write to properties-data.js
fs.writeFileSync('properties-data.js', 'const PROPERTIES_DATA = ' + JSON.stringify(fullData, null, 2) + ';\n', 'utf8');
console.log('Saved to properties-data.js. Total items:', fullData.length);

// 2. Upload to Cloudflare KV
const req = https.request('https://zaimrosli-worker.huzaimrosli.workers.dev/api/properties', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    console.log('Upload to Cloudflare KV Status:', res.statusCode);
    console.log('Response:', d);
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(JSON.stringify(fullData));
req.end();
