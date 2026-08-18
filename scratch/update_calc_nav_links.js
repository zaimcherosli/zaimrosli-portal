const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace Legal Fee link with #legal
  if (content.includes('href="/calculator" class="dropdown-item">Legal Fee')) {
    content = content.replace('href="/calculator" class="dropdown-item">Legal Fee', 'href="/calculator#legal" class="dropdown-item">Legal Fee');
    changed = true;
  }
  if (content.includes('href="/calculator" class="mobile-drawer-link">Legal Fee')) {
    content = content.replace('href="/calculator" class="mobile-drawer-link">Legal Fee', 'href="/calculator#legal" class="mobile-drawer-link">Legal Fee');
    changed = true;
  }

  // Replace DSR link with #dsr
  if (content.includes('href="/calculator" class="dropdown-item">Bank Loan DSR Check')) {
    content = content.replace('href="/calculator" class="dropdown-item">Bank Loan DSR Check', 'href="/calculator#dsr" class="dropdown-item">Bank Loan DSR Check');
    changed = true;
  }
  if (content.includes('href="/calculator" class="dropdown-item">DSR Calculator')) {
    content = content.replace('href="/calculator" class="dropdown-item">DSR Calculator', 'href="/calculator#dsr" class="dropdown-item">DSR Calculator');
    changed = true;
  }
  if (content.includes('href="/calculator" class="mobile-drawer-link">Bank Loan DSR Check')) {
    content = content.replace('href="/calculator" class="mobile-drawer-link">Bank Loan DSR Check', 'href="/calculator#dsr" class="mobile-drawer-link">Bank Loan DSR Check');
    changed = true;
  }
  if (content.includes('href="/calculator" class="mobile-drawer-link">DSR Calculator')) {
    content = content.replace('href="/calculator" class="mobile-drawer-link">DSR Calculator', 'href="/calculator#dsr" class="mobile-drawer-link">DSR Calculator');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated calculator nav links in ' + file);
  }
});
