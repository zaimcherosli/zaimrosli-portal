// PWA Service Worker Registration & Custom App Install Banner
(function initPWA() {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      let isUpdating = false;

      function applyUpdate(waitingSW) {
        if (isUpdating) return;
        isUpdating = true;
        console.log('[PWA] Triggering silent update activation...');
        if (waitingSW) {
          waitingSW.postMessage({ type: 'SKIP_WAITING' });
        }
      }

      function isUserEditing() {
        const activeEl = document.activeElement;
        if (!activeEl) return false;
        const tag = activeEl.tagName.toUpperCase();
        return tag === 'INPUT' || tag === 'TEXTAREA' || activeEl.isContentEditable;
      }

      navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered successfully:', reg.scope);

          // Check for updates on page load and tab focus
          reg.update().catch(() => {});
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
              reg.update().catch(() => {});
            }
          });

          // Detect new updates
          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;

            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('[PWA] New version installed in background');
                applyUpdate(newSW);
              }
            });
          });

          // If a SW is already waiting on load
          if (reg.waiting && navigator.serviceWorker.controller) {
            applyUpdate(reg.waiting);
          }

        }).catch((err) => console.warn('[PWA] Service Worker registration failed:', err));

      // Reload when new SW takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;

        const performReload = () => {
          refreshing = true;
          showSilentUpdateBadge();
          setTimeout(() => {
            window.location.reload();
          }, 600);
        };

        if (isUserEditing()) {
          console.log('[PWA] User is typing — deferring update reload until tab switch');
          const onNav = () => {
            document.removeEventListener('visibilitychange', onNav);
            performReload();
          };
          document.addEventListener('visibilitychange', onNav, { once: true });
        } else {
          performReload();
        }
      });
    });
  }

  function showSilentUpdateBadge() {
    if (document.getElementById('swSilentBadge')) return;
    const badge = document.createElement('div');
    badge.id = 'swSilentBadge';
    const isMobile = window.innerWidth <= 768;
    const bottomPos = isMobile ? '78px' : '24px';
    badge.style.cssText = `
        position: fixed;
        bottom: ${bottomPos};
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, rgba(217, 119, 6, 0.95), rgba(180, 83, 9, 0.95));
        color: #ffffff;
        font-family: 'Inter', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.5rem 1.1rem;
        border-radius: 50px;
        box-shadow: 0 8px 24px rgba(217, 119, 6, 0.35);
        z-index: 999999;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        display: flex;
        align-items: center;
        gap: 0.4rem;
    `;
    badge.innerHTML = '<span>✨</span><span>Kemaskini sistem digunakan...</span>';
    document.body.appendChild(badge);
    requestAnimationFrame(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'translateX(-50%) translateY(0)';
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
