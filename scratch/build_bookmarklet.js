const fs = require('fs');

const rawCode = `(function() {
  try {
    function isIgnored(text) {
      if (!text) return true;
      const lower = text.toLowerCase();
      return lower.includes('subscribe propmall') || 
             lower.includes('propmall premium') || 
             lower.includes('subscription') || 
             lower.includes('renew membership') || 
             lower.includes('upgrade to premium') || 
             lower.includes('terms of service') || 
             lower.includes('privacy policy');
    }

    // 1. Locate active modal or details container
    let allContainers = Array.from(document.querySelectorAll('.modal, .modal-dialog, .modal-content, .card, div[id*="Modal"], div[class*="modal"], div[class*="listing"], div[class*="detail"], body'));
    let targetEl = null;

    for (const el of allContainers) {
      const txt = el.innerText || '';
      if ((txt.includes('asking RM') || txt.includes('Asking RM') || txt.includes('Listing Details') || txt.includes('Listing Descriptions') || txt.includes('monthly') || txt.includes('Built-up Size')) && !isIgnored(txt.substring(0, 100))) {
        targetEl = el;
        if (el.tagName !== 'BODY') break;
      }
    }
    if (!targetEl) targetEl = document.body;

    const rawText = targetEl.innerText || document.body.innerText || '';
    const lines = rawText.split('\\n').map(l => l.trim()).filter(l => l.length > 0 && !isIgnored(l));

    // 2. Extract Price
    let price = 0;
    let priceStr = "RM 0";
    let askingLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/(?:asking|asking price|harga|rental|asking rental)?\\s*RM\\s*([\\d,]+(?:\\.\\d+)?)/i);
      if (match) {
        const val = parseFloat(match[1].replace(/,/g, ''));
        if (val >= 500 && val !== 365 && val !== 360 && val !== 199 && val !== 299 && !line.includes('sqft') && !line.includes('per sqft')) {
          price = val;
          askingLineIndex = i;
          break;
        }
      }
    }

    if (price === 0) {
      const allRMs = rawText.matchAll(/RM\\s*([\\d,]+)/gi);
      for (const m of allRMs) {
        const val = parseFloat(m[1].replace(/,/g, ''));
        if (val >= 500 && val !== 365 && val !== 360 && val !== 199) {
          price = val;
          break;
        }
      }
    }

    // 3. Extract Title
    let title = '';
    if (askingLineIndex !== -1 && lines[askingLineIndex + 1]) {
      const candidate = lines[askingLineIndex + 1];
      if (candidate.length > 8 && !isIgnored(candidate) && !candidate.startsWith('📍') && !candidate.startsWith('RM') && !candidate.includes('Listing Details')) {
        title = candidate;
      }
    }

    if (!title) {
      for (const l of lines) {
        if (l.length >= 10 && l.length <= 150 && !isIgnored(l)) {
          if (/Sale|Rent|Let|Office|Corner|Freehold|Leasehold|Putrajaya|Cyberjaya|Cheras|Klang|Shah Alam|Bangi|Kajang|Ayer8|Presint|Land|Tanah|Kilang|Factory|Semi-D|Banglo|Teres|Condo|Apartment|Pangsapuri|Maran|Pahang|Perak|Johor|Nilai/i.test(l) &&
              !l.startsWith('asking') && !l.startsWith('RM') && !l.includes('Built-up') && !l.includes('Listing Details') && !l.includes('LF Updated') && !l.includes('Repost')) {
            title = l;
            break;
          }
        }
      }
    }

    title = title.replace(/^[\\s\\p{Extended_Pictographic}\\p{Emoji_Presentation}‼️🔥✨📍🏢🏠🏭🏬🏪📌🔑🌟⚡]+?/u, '').trim();
    title = title.replace(/^(?:WTS|WTL|WTR|WTB|FOR SALE|FOR RENT|COA LISTING|EXCLUSIVE LISTING|HOT LISTING|UNTUK DIJUAL|UNTUK DISEWA|DISEWA|DIJUAL)\\s*[:\\-!\\=\\/,|]*\\s*(?:FOR SALE|FOR RENT|WTS|WTL|WTR)?\\s*/i, '').trim();
    title = title.replace(/^[,:\\-––—\\/.!#|*]+\\s*/, '').replace(/[,:\\-––—\\/.!#|*]+\\s*$/, '').trim();
    if (!title || title.length < 5 || isIgnored(title)) {
      title = "Hartanah PropMall " + new Date().toLocaleDateString();
    }

    // 4. Category & Status (Rent vs Sale)
    const urlStr = window.location.href;
    let isRent = false;
    if (urlStr.includes('forWTS=Y') || urlStr.includes('status=FOR_SALE') || urlStr.includes('status=SALE')) {
      isRent = false;
    } else if (urlStr.includes('forWTR=Y') || urlStr.includes('forWTL=Y') || urlStr.includes('status=FOR_RENT') || urlStr.includes('status=RENT')) {
      isRent = true;
    } else {
      const hasForSale = /FOR SALE|UNTUK DIJUAL|WTS|FOR-SALE/i.test(rawText.substring(0, 1500) + ' ' + title);
      const hasForRent = /FOR RENT|UNTUK DISEWA|DISEWA|WTL|WTR|RENTAL|MONTHLY|TO LET/i.test(rawText.substring(0, 1500) + ' ' + title);
      if (hasForSale && !hasForRent) isRent = false;
      else if (hasForRent && !hasForSale) isRent = true;
      else isRent = /FOR RENT|SEWA|RENTAL|DISEWA|WTL|TO LET/i.test(title);
    }

    const status = isRent ? 'rent' : 'sale';
    const category = isRent ? 'Rental' : 'Subsales';

    if (price > 0) {
      priceStr = isRent ? \`RM \${price.toLocaleString('en-US')} / month\` : \`RM \${price.toLocaleString('en-US')}\`;
    }

    // 5. Location & Region
    let location = '';
    if (askingLineIndex !== -1 && lines[askingLineIndex + 2]) {
      const locCand = lines[askingLineIndex + 2].replace(/^📍\\s*/, '').trim();
      if (!isIgnored(locCand) && !locCand.includes('Freehold') && !locCand.includes('Built-up') && !locCand.includes('sqft') && locCand.length < 80) {
        location = locCand;
      }
    }
    if (!location) {
      const locMatch = rawText.match(/📍\\s*([^\\n]+)/) || rawText.match(/(?:Presint\\s*\\d+|Putrajaya|Cyberjaya|Puchong|Ijok|Bangi|Sepang|Kajang|Petaling Jaya|Subang|Shah Alam|Telok Panglima Garang|Klang|Cheras|Ulu Langat|Gombak|Rawang|Ampang|Bangsar|Mont Kiara|KLCC|Maran|Kuantan|Ipoh|Taiping|Simpang|Seremban|Nilai|Melaka|Johor Bahru)[^\\n]*/i);
      if (locMatch) location = locMatch[1] ? locMatch[1].trim() : locMatch[0].trim();
    }
    location = (location || "Selangor").replace(/^[,:\\-––—\\/.!#|*\\s]+/,'').replace(/[,:\\-––—\\/.!#|*\\s]+$/,'').trim();
    if (isIgnored(location) || location.length > 80) location = "Selangor";

    let region = "Selangor";
    const locLower = (location + " " + title).toLowerCase();
    if (locLower.includes('putrajaya')) region = "Putrajaya";
    else if (locLower.includes('kuala lumpur') || locLower.includes('bangsar') || locLower.includes('cheras') || locLower.includes('ampang') || locLower.includes('mont kiara') || locLower.includes('klcc')) region = "Kuala Lumpur";
    else if (locLower.includes('pahang') || locLower.includes('maran') || locLower.includes('kuantan')) region = "Pahang";
    else if (locLower.includes('perak') || locLower.includes('taiping') || locLower.includes('ipoh') || locLower.includes('simpang')) region = "Perak";
    else if (locLower.includes('johor')) region = "Johor";
    else if (locLower.includes('melaka')) region = "Melaka";
    else if (locLower.includes('sembilan') || locLower.includes('seremban') || locLower.includes('nilai')) region = "Negeri Sembilan";
    else region = "Selangor";

    // 6. Specs (BuiltUp, LandSize, Beds, Baths, Parking)
    let builtUp = 0;
    const buMatch = rawText.match(/(?:Built[ -]?up\\s*(?:Size)?|Size\\s*Built\\s*up|Keluasan|BU|Luas)[^\\n\\d]*([\\d,]+)\\s*(?:sqft|kaki)/i);
    if (buMatch) builtUp = parseInt(buMatch[1].replace(/,/g, ''));

    let landSize = "-";
    const laMatch = rawText.match(/(?:Land[ -]?Area|Land[ -]?Size|Tanah|Keluasan Tanah)[^\\n:]*:\\s*([^\\n]+)/i);
    if (laMatch) landSize = laMatch[1].replace(/\\s*\\([^)]*\\)/g, '').trim();

    let beds = 0, baths = 0, parking = 0;
    const bedM = rawText.match(/(\\d+)\\s*(?:Rooms|Bilik|Bedrooms|Bed|R)\\b/i);
    if (bedM) beds = parseInt(bedM[1]);
    const bathM = rawText.match(/(\\d+)\\s*(?:Bathrooms|Bath|Bilik Air|B\\.Air|B)\\b/i);
    if (bathM) baths = parseInt(bathM[1]);
    const parkM = rawText.match(/(\\d+)\\s*(?:Car\\s*Park|Parking|Lot\\s*Parking|Petak\\s*Kereta|Carpark|Park)\\b/i);
    if (parkM) parking = parseInt(parkM[1]);

    // 7. Property Type
    let pType = "Shop / Office";
    const combinedCheck = (title + " " + rawText.substring(0, 1500)).toLowerCase();
    if (combinedCheck.includes('residential lot') || combinedCheck.includes('tanah lot') || combinedCheck.includes('lot banglo') || combinedCheck.includes('tanah banglo') || combinedCheck.includes('status bangunan')) pType = "Land";
    else if (combinedCheck.includes('commercial land') || combinedCheck.includes('tanah komersial')) pType = "Commercial Land";
    else if (combinedCheck.includes('industrial land') || combinedCheck.includes('tanah industri')) pType = "Industrial Land";
    else if (combinedCheck.includes('land') || combinedCheck.includes('tanah') || combinedCheck.includes('pertanian') || combinedCheck.includes('agricultural') || combinedCheck.includes('sawit')) pType = "Land";
    else if (combinedCheck.includes('factory') || combinedCheck.includes('kilang') || combinedCheck.includes('warehouse') || combinedCheck.includes('gudang')) pType = "Factory";
    else if (combinedCheck.includes('office') || combinedCheck.includes('pejabat') || combinedCheck.includes('shop') || combinedCheck.includes('kedai') || combinedCheck.includes('retail') || combinedCheck.includes('shoplot')) pType = "Shop / Office";
    else if (combinedCheck.includes('semi-d') || combinedCheck.includes('semi d') || combinedCheck.includes('semi detached')) pType = "Semi-D";
    else if (combinedCheck.includes('bungalow') || combinedCheck.includes('banglo')) pType = "Bungalow";
    else if (combinedCheck.includes('townhouse')) pType = "Townhouse";
    else if (combinedCheck.includes('condo') || combinedCheck.includes('serviced residence') || combinedCheck.includes('service apartment') || combinedCheck.includes('apartment') || combinedCheck.includes('pangsapuri')) pType = "Condominium";
    else if (combinedCheck.includes('terrace') || combinedCheck.includes('teres') || combinedCheck.includes('storey') || combinedCheck.includes('tingkat')) pType = "Terrace House";
    else if (combinedCheck.includes('commercial') || combinedCheck.includes('komersial')) pType = "Commercial Space";

    const isLandProperty = pType.toLowerCase().includes('tanah') || pType.toLowerCase().includes('land');

    let tenure = isRent ? "-" : (combinedCheck.includes('leasehold') ? "Leasehold" : "Freehold");
    let lotType = isRent ? "-" : (combinedCheck.includes('bumi') && !combinedCheck.includes('non-bumi') && !combinedCheck.includes('non bumi') ? "Bumi Lot" : "Non-Bumi Lot");
    if (combinedCheck.includes('malay reserved') || combinedCheck.includes('malay reserve') || combinedCheck.includes('rezab melayu') || combinedCheck.includes('rizab melayu')) {
      lotType = "Malay Reserve";
    }

    // 8. Clean Copywriting & Agent Info
    let bodyCopywriting = '';
    const descHeaderEl = document.querySelector('#ModalListingListingCopywriting, div.listing-descriptions, div[id*="Copywriting"], div[class*="description"]');
    if (descHeaderEl && descHeaderEl.innerText) {
      bodyCopywriting = descHeaderEl.innerText.trim();
    } else {
      const descIdx = rawText.indexOf('Listing Descriptions');
      if (descIdx !== -1) {
        bodyCopywriting = rawText.substring(descIdx + 'Listing Descriptions'.length).trim();
      }
    }

    let cleanCopy = bodyCopywriting;
    const contactCut = cleanCopy.search(/(?:Interested\\?|Contact\\s*Me|Co-Marketing|Share Listing|Download Listing|Published|PropMall|Copyright)/i);
    let agentFooterText = '';
    if (contactCut !== -1) {
      agentFooterText = cleanCopy.substring(contactCut).trim();
      cleanCopy = cleanCopy.substring(0, contactCut).trim();
    }

    const titleLower = title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const locLowerClean = location.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const rawCopyLines = cleanCopy.split('\\n').map(l => l.trim()).filter(Boolean);
    
    let processedLines = [];
    for (let line of rawCopyLines) {
      const lLower = line.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (lLower === titleLower || lLower === 'wts for sale' || lLower === 'wtl for rent' || lLower === 'for sale' || lLower === 'for rent') continue;
      if (lLower === locLowerClean || lLower.startsWith('location ') || lLower.startsWith('lokasi ') || lLower.startsWith('type ') || lLower.startsWith('jenis ')) continue;
      if (lLower.startsWith('asking price') || lLower.startsWith('harga jualan') || lLower.startsWith('asking rm') || lLower.startsWith('harga rm')) continue;
      if (lLower === 'details' || lLower === 'maklumat' || lLower === 'spesifikasi') continue;
      if (line.startsWith('***') || line.startsWith('===') || line.startsWith('---')) continue;
      if (line.startsWith('+') && (lLower.includes('selangor') || lLower.includes('putrajaya') || lLower.includes('kl') || lLower.includes('freehold') || lLower.includes('built up') || lLower.includes('title'))) continue;

      if (/^(?:amenities|kemudahan|fasiliti)\\s*[:\\-]?$/i.test(line)) {
        processedLines.push('\\nAMENITIES:');
        continue;
      }
      if (/^(?:accessibilities|accessibility|access|akses|kemudahan akses)\\s*[:\\-]?$/i.test(line)) {
        processedLines.push('\\nACCESSIBILITIES:');
        continue;
      }

      let cleanLine = line.replace(/^[~✔✅•*+]\\s*/, '').trim();
      if (!cleanLine.startsWith('-')) {
        cleanLine = '- ' + cleanLine;
      }
      processedLines.push(cleanLine);
    }

    let cleanCopyText = processedLines.join('\\n').trim();

    let agentName = '', agentAgency = '', agentTel = '';
    const telMatch = (agentFooterText || rawText).match(/(?:Tel|Phone|Contact|Mobile|WhatsApp|Wasap|Call)?\\s*[:\\=]?\\s*(\\+?6?01[\\d\\-\\s]{7,14})/i);
    if (telMatch) agentTel = telMatch[1].trim();

    const agentLines = (agentFooterText || '').split('\\n').map(l => l.trim()).filter(Boolean);
    for (let i = 0; i < agentLines.length; i++) {
      const l = agentLines[i];
      if (l.includes('Contact Me Now') && agentLines[i+1]) {
        agentName = agentLines[i+1];
        if (agentLines[i+2] && !agentLines[i+2].toLowerCase().startsWith('tel')) {
          agentAgency = agentLines[i+2];
        }
      }
    }

    let structuredDesc = \`\${isRent ? 'WTL / FOR RENT' : 'WTS / FOR SALE'}\\n\\n\`;
    structuredDesc += \`\${title}\\n\\n\`;
    structuredDesc += \`PROPERTY DETAILS\\n\`;
    structuredDesc += \`- Type : \${pType}\\n\`;
    if (!isRent) structuredDesc += \`- Tenure : \${tenure} (\${lotType})\\n\`;
    if (builtUp > 0 && !isLandProperty) structuredDesc += \`- Build Up : \${builtUp} sqft\\n\`;
    if (landSize !== "-") structuredDesc += \`- Land Area : \${landSize}\\n\`;
    if (beds > 0 && !isLandProperty) structuredDesc += \`- Bedroom : \${beds}\\n\`;
    if (baths > 0 && !isLandProperty) structuredDesc += \`- Bathroom : \${baths}\\n\`;
    if (parking > 0 && !isLandProperty) structuredDesc += \`- Parking : \${parking}\\n\`;

    if (cleanCopyText && cleanCopyText.length > 10) {
      structuredDesc += \`\\n\${cleanCopyText}\\n\\n\`;
    } else {
      structuredDesc += \`\\n\`;
    }

    structuredDesc += \`========================\\n\`;
    structuredDesc += \`\${isRent ? 'Asking Rental' : 'Asking Price'} : \${priceStr}\\n\`;
    structuredDesc += \`========================\\n\\n\`;

    structuredDesc += \`--- MAKLUMAT ASAL (RUJUKAN EJEN) ---\\n\`;
    if (agentName) structuredDesc += \`Ejen Listing : \${agentName}\\n\`;
    if (agentAgency) structuredDesc += \`Agensi : \${agentAgency}\\n\`;
    if (agentTel) structuredDesc += \`No. Tel : \${agentTel}\\n\`;
    structuredDesc += \`Pautan Rujukan : \${window.location.href}\\n\`;

    // 9. Extract HD Images (Support propmall.co, propmall.net, propmall.my)
    let allImgs = [];
    const imgs = document.querySelectorAll('img[src*="img-property/"], img[src*="propmall"], img[data-src*="img-property/"], img[id*="propmall"]');
    imgs.forEach(img => {
      let src = (img.src || img.getAttribute('data-src') || img.id || '').split('?')[0].trim();
      if (src.includes('/img-property/') && !src.includes('logo') && !allImgs.includes(src)) {
        allImgs.push(src);
      }
    });

    const matches = document.documentElement.innerHTML.match(/https?:\\/\\/[^\\s"'>]+\\/media\\/img-property\\/[^\\s"'>]+\\.(?:jpg|png|jpeg)/gi) || [];
    matches.forEach(url => {
      let clean = url.split('?')[0].trim();
      if (!allImgs.includes(clean)) allImgs.push(clean);
    });

    const coverImage = allImgs.length > 0 ? allImgs[0] : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newListing = {
      id: \`prop-\${Date.now()}\`,
      slug: slug,
      title: title,
      price: price,
      priceStr: priceStr,
      category: category,
      location: location,
      region: region,
      type: pType,
      status: status,
      beds: isLandProperty ? 0 : beds,
      baths: isLandProperty ? 0 : baths,
      parking: isLandProperty ? 0 : parking,
      size: isLandProperty ? 0 : builtUp,
      landSize: landSize,
      tenure: tenure,
      lotType: lotType,
      image: coverImage,
      images: allImgs.length > 0 ? allImgs : [coverImage],
      description: structuredDesc.trim(),
      refUrl: window.location.href
    };

    const syncPayload = encodeURIComponent(JSON.stringify(newListing));
    const syncUrl = 'https://zaimrosli.my/admin?auto_sync=' + syncPayload;

    // Use native anchor trigger to bypass popup blockers
    const a = document.createElement('a');
    a.href = syncUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { a.remove(); }, 500);

  } catch(err) {
    alert('Ralat semasa mengekstrak PropMall: ' + err.message);
  }
})();`;

const encodedBookmarklet = 'javascript:' + encodeURIComponent(rawCode);
fs.writeFileSync('scratch/encoded_bookmarklet.txt', encodedBookmarklet, 'utf8');
console.log('Saved robust anchor-triggered bookmarklet!');
