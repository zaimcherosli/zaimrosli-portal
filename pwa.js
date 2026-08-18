// PWA Service Worker Registration & Premium Custom App Install Modal
(function initPWA() {
  // Check if running in standalone mode (already installed & opened as PWA)
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
    || window.navigator.standalone === true 
    || document.referrer.includes('android-app://');

  if (isStandalone) {
    console.log('[PWA] App is running in standalone mode.');
    localStorage.setItem('zaimrosli_pwa_installed', 'true');
  }

  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      let isUpdating = false;

      function applyUpdate(waitingSW) {
        if (isUpdating) return;
        isUpdating = true;
        console.log('[PWA] Triggering update activation...');
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
          reg.update().catch(() => {});
          document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
              reg.update().catch(() => {});
            }
          });

          reg.addEventListener('updatefound', () => {
            const newSW = reg.installing;
            if (!newSW) return;

            newSW.addEventListener('statechange', () => {
              if (newSW.state === 'installed' && navigator.serviceWorker.controller) {
                applyUpdate(newSW);
              }
            });
          });

          if (reg.waiting && navigator.serviceWorker.controller) {
            applyUpdate(reg.waiting);
          }

          // Aggressive auto-update: check for new SW every 60 seconds
          setInterval(() => {
            reg.update().catch(() => {});
          }, 60 * 1000);

        }).catch((err) => console.warn('[PWA] SW registration failed:', err));

      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        const performReload = () => {
          refreshing = true;
          setTimeout(() => { window.location.reload(); }, 600);
        };

        if (isUserEditing()) {
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

  // If already installed or in standalone mode, DO NOT show install popup
  if (isStandalone || localStorage.getItem('zaimrosli_pwa_installed') === 'true') {
    return;
  }

  // 2. Inject & Manage Premium PWA Installation Modal
  let deferredPrompt = null;

  function injectPwaModalHTML() {
    if (document.getElementById('pwa-install-modal')) return;
    if (isStandalone || localStorage.getItem('zaimrosli_pwa_installed') === 'true') return;

    const modalDiv = document.createElement('div');
    modalDiv.id = 'pwa-install-modal';
    modalDiv.className = 'pwa-modal-overlay';
    modalDiv.setAttribute('aria-hidden', 'true');
    modalDiv.innerHTML = `
      <style>
        .pwa-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          background: rgba(15, 23, 42, 0.75) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          z-index: 999999 !important;
          display: flex !important;
          align-items: flex-end !important;
          justify-content: center !important;
          padding: 0 !important;
          box-sizing: border-box !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition: opacity 0.3s ease, visibility 0.3s ease !important;
        }

        @media (min-width: 600px) {
          .pwa-modal-overlay {
            align-items: center !important;
            padding: 16px !important;
          }
        }

        .pwa-modal-overlay.active {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .pwa-modal-body {
          background: #ffffff !important;
          border-top-left-radius: 24px !important;
          border-top-right-radius: 24px !important;
          border-bottom-left-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          border: 1.5px solid #d97706 !important;
          width: 100% !important;
          max-width: 440px !important;
          padding: 16px 20px 24px !important;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.35) !important;
          transform: translateY(100%) !important;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          box-sizing: border-box !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        @media (min-width: 600px) {
          .pwa-modal-body {
            border-radius: 24px !important;
            transform: translateY(20px) scale(0.95) !important;
          }
          .pwa-modal-overlay.active .pwa-modal-body {
            transform: translateY(0) scale(1) !important;
          }
        }

        .pwa-modal-overlay.active .pwa-modal-body {
          transform: translateY(0) !important;
        }

        .pwa-modal-drag-handle {
          width: 36px !important;
          height: 4px !important;
          background: #cbd5e1 !important;
          border-radius: 4px !important;
          margin: 0 auto 12px !important;
        }

        .pwa-modal-header {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 12px !important;
          margin-bottom: 14px !important;
        }

        .pwa-modal-logo-row {
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }

        .pwa-modal-logo-avatar {
          width: 44px !important;
          height: 44px !important;
          background: linear-gradient(135deg, #f59e0b, #d97706) !important;
          color: #ffffff !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-weight: 800 !important;
          font-size: 1.05rem !important;
          flex-shrink: 0 !important;
          box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3) !important;
        }

        .pwa-modal-title {
          font-size: 1.05rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin: 0 0 2px 0 !important;
          line-height: 1.2 !important;
        }

        .pwa-modal-subtitle {
          font-size: 0.78rem !important;
          color: #64748b !important;
          margin: 0 !important;
          line-height: 1.3 !important;
        }

        .pwa-modal-close {
          background: #f1f5f9 !important;
          border: none !important;
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          font-weight: 800 !important;
          font-size: 1.2rem !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #0f172a !important;
          flex-shrink: 0 !important;
          transition: background 0.2s ease !important;
        }
        .pwa-modal-close:hover {
          background: #e2e8f0 !important;
        }

        .pwa-direct-install-btn {
          width: 100% !important;
          background: linear-gradient(135deg, #f59e0b, #d97706) !important;
          color: #ffffff !important;
          border: none !important;
          padding: 12px 18px !important;
          border-radius: 12px !important;
          font-weight: 800 !important;
          font-size: 0.9rem !important;
          cursor: pointer !important;
          display: none;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          margin-bottom: 12px !important;
          box-shadow: 0 4px 14px rgba(217, 119, 6, 0.3) !important;
          transition: transform 0.2s ease !important;
        }
        .pwa-direct-install-btn:hover {
          transform: translateY(-1px) !important;
        }

        .pwa-guide-box {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 14px !important;
          padding: 12px 14px !important;
          margin-bottom: 12px !important;
        }

        .pwa-guide-head {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          font-size: 0.82rem !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin-bottom: 6px !important;
        }

        .pwa-guide-steps {
          margin: 0 !important;
          padding-left: 20px !important;
          font-size: 0.78rem !important;
          color: #475569 !important;
          line-height: 1.5 !important;
        }
        
        .pwa-modal-dismiss-btn {
          width: 100% !important;
          background: transparent !important;
          border: 1px solid #cbd5e1 !important;
          color: #64748b !important;
          padding: 10px !important;
          border-radius: 12px !important;
          font-weight: 700 !important;
          font-size: 0.82rem !important;
          cursor: pointer !important;
          text-align: center !important;
        }
      </style>

      <div class="pwa-modal-body">
        <div class="pwa-modal-drag-handle"></div>

        <div class="pwa-modal-header">
          <div class="pwa-modal-logo-row">
            <div class="pwa-modal-logo-avatar">ZR</div>
            <div>
              <h3 class="pwa-modal-title">Pasang Aplikasi Zaim Rosli</h3>
              <p class="pwa-modal-subtitle">Akses senarai hartanah & kalkulator di skrin HP anda</p>
            </div>
          </div>
          <button class="pwa-modal-close" id="pwa-modal-close" aria-label="Tutup">&times;</button>
        </div>

        <div class="pwa-modal-content">
          <!-- 1-Click Direct Chrome Install Button -->
          <button class="pwa-direct-install-btn" id="pwa-direct-install-btn">
            <span>Pasang Aplikasi Sekarang (1-Click)</span>
          </button>

          <!-- Android Guide -->
          <div class="pwa-guide-box android-guide" id="pwa-android-guide" style="display: none;">
            <div class="pwa-guide-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#3DDC84"><path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5516 0 .9997.4482.9997.9993 0 .5511-.4481.9997-.9997.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5516 0 .9997.4482.9997.9993 0 .5511-.4481.9997-.9997.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.368 13.8533 8 12 8s-3.5902.368-5.1368.9501L4.8409 5.4471a.4155.4155 0 0 0-.5676-.1521.4155.4155 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.083.3444 14.168.0467 17.8427h23.9066c-.2977-3.6747-2.6422-6.7597-6.0718-8.5213"/></svg>
              <span>Pengguna Android (Google Chrome):</span>
            </div>
            <ol class="pwa-guide-steps">
              <li>Tekan <b>Tiga Titik (⋮)</b> di atas kanan browser.</li>
              <li>Pilih <b>"Add to Home screen"</b> / <b>"Install App"</b>.</li>
            </ol>
          </div>

          <!-- Apple Guide -->
          <div class="pwa-guide-box apple-guide" id="pwa-apple-guide" style="display: none;">
            <div class="pwa-guide-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.16.66-2.86 1.48-.63.73-1.18 1.9-1.03 3.02 1.1.09 2.23-.58 2.9-1.4"/></svg>
              <span>Pengguna iPhone & Apple (Safari):</span>
            </div>
            <ol class="pwa-guide-steps">
              <li>Tekan <b>Kongsi (Share ⎋)</b> di bawah Safari.</li>
              <li>Skrol & pilih <b>"Add to Home Screen" (+ Tambah)</b>.</li>
            </ol>
          </div>

          <!-- Desktop Guide -->
          <div class="pwa-guide-box desktop-guide" id="pwa-desktop-guide" style="display: none;">
            <div class="pwa-guide-head">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2563EB"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2h-4zM4 5h16v11H4V5z"/></svg>
              <span>Pengguna Komputer / Laptop (Chrome / Edge):</span>
            </div>
            <ol class="pwa-guide-steps">
              <li>Tekan ikon <b>Pasang Aplikasi (⊕)</b> di bar URL browser.</li>
              <li>Klik <b>"Install"</b> untuk akses pantas dari Desktop.</li>
            </ol>
          </div>

          <button class="pwa-modal-dismiss-btn" id="pwa-modal-dismiss">
            Lain Kali
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalDiv);
    setupPwaModalListeners();
  }

  function setupPwaModalListeners() {
    const modal = document.getElementById('pwa-install-modal');
    const closeBtn = document.getElementById('pwa-modal-close');
    const dismissBtn = document.getElementById('pwa-modal-dismiss');
    const directBtn = document.getElementById('pwa-direct-install-btn');

    // Auto detect device type
    const userAgent = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || window.innerWidth <= 768;

    const androidGuide = document.getElementById('pwa-android-guide');
    const appleGuide = document.getElementById('pwa-apple-guide');
    const desktopGuide = document.getElementById('pwa-desktop-guide');

    if (isIOS) {
      if (appleGuide) appleGuide.style.display = 'block';
    } else if (isMobile) {
      if (androidGuide) androidGuide.style.display = 'block';
    } else {
      if (desktopGuide) desktopGuide.style.display = 'block';
    }

    function openPwaModal() {
      if (isStandalone || localStorage.getItem('zaimrosli_pwa_installed') === 'true') return;
      const dismissedUntil = parseInt(localStorage.getItem('zaimrosli_pwa_dismissed_until') || '0', 10);
      if (Date.now() < dismissedUntil) return;
      if (modal) modal.classList.add('active');
    }

    function closePwaModal(permanent = false) {
      if (modal) modal.classList.remove('active');
      if (permanent) {
        localStorage.setItem('zaimrosli_pwa_installed', 'true');
      } else {
        // Dismiss for 14 days
        localStorage.setItem('zaimrosli_pwa_dismissed_until', (Date.now() + (14 * 24 * 60 * 60 * 1000)).toString());
      }
    }

    window.openPwaInstallModal = openPwaModal;

    if (closeBtn) closeBtn.addEventListener('click', () => closePwaModal(false));
    if (dismissBtn) dismissBtn.addEventListener('click', () => closePwaModal(false));

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePwaModal(false);
      });
    }

    if (directBtn) {
      directBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          console.log('[PWA] Choice:', outcome);
          if (outcome === 'accepted') {
            localStorage.setItem('zaimrosli_pwa_installed', 'true');
          }
          deferredPrompt = null;
          closePwaModal(true);
        }
      });
    }

    // Auto-show modal after 4s only if not installed and not dismissed within 14 days
    const dismissedUntil = parseInt(localStorage.getItem('zaimrosli_pwa_dismissed_until') || '0', 10);
    const isDismissed = Date.now() < dismissedUntil;
    const isInstalled = localStorage.getItem('zaimrosli_pwa_installed') === 'true';

    if (!isDismissed && !isInstalled && !isStandalone) {
      setTimeout(openPwaModal, 4000);
    }
  }

  // Listen for native appinstalled event to permanently silence popup
  window.addEventListener('appinstalled', () => {
    console.log('[PWA] Application was successfully installed!');
    localStorage.setItem('zaimrosli_pwa_installed', 'true');
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.remove('active');
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    injectPwaModalHTML();
    const directBtn = document.getElementById('pwa-direct-install-btn');
    if (directBtn) directBtn.style.display = 'inline-flex';
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPwaModalHTML);
  } else {
    injectPwaModalHTML();
  }
})();
