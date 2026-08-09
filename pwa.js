// PWA Service Worker Registration & Custom App Install Banner
(function initPWA() {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('[PWA] Service Worker registered successfully:', reg.scope))
        .catch((err) => console.warn('[PWA] Service Worker registration failed:', err));
    });
  }

  // 2. Handle Custom "Install App" Banner
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  function showInstallBanner() {
    if (document.getElementById('pwa-install-banner') || localStorage.getItem('PWA_BANNER_DISMISSED')) return;

    const banner = document.createElement('div');
    banner.id = 'pwa-install-banner';
    banner.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 420px;
      background: #0f172a;
      color: #ffffff;
      padding: 14px 18px;
      border-radius: 16px;
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(217, 119, 6, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      z-index: 99999;
      animation: slideUpPWA 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `;

    banner.innerHTML = `
      <style>
        @keyframes slideUpPWA {
          from { opacity: 0; transform: translate(-50%, 30px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      </style>
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 42px; height: 42px; background: #d97706; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 1.1rem; flex-shrink: 0;">
          ZR
        </div>
        <div>
          <div style="font-weight: 800; font-size: 0.95rem; line-height: 1.2;">Pasang App Zaim Rosli</div>
          <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px;">Akses pantas terus dari Home Screen</div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="pwa-install-btn" style="background: #d97706; color: #ffffff; border: none; padding: 8px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer;">
          Pasang
        </button>
        <button id="pwa-close-btn" style="background: none; border: none; color: #64748b; font-size: 1.2rem; cursor: pointer; padding: 4px; line-height: 1;">
          &times;
        </button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('pwa-install-btn').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] User response to install prompt:', outcome);
      deferredPrompt = null;
      banner.remove();
    });

    document.getElementById('pwa-close-btn').addEventListener('click', () => {
      localStorage.setItem('PWA_BANNER_DISMISSED', 'true');
      banner.remove();
    });
  }
})();
