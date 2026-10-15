/**
 * Sacred Ram-Sita-Laxman 2D Walking Preloader & Sacred Paduka (Footprint) Cursor Trail
 * 
 * Features:
 * 1. 2D Silhouette Walking Animation of Lord Rama, Devi Sita, and Lakshmana
 * 2. Left-Right Alternating Sacred Paduka (Footprints) Trail with Natural Walking Stride
 * 3. Graceful 2.5-second dissolve with golden particle luminescence
 * 4. 60 FPS GPU-accelerated performance with automatic DOM cleanup
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. PRELOADER: RAM, SITA, LAXMAN 2D WALKING ANIMATION
     ========================================================================== */
  function initPreloader() {
    // Only show full preloader on initial page load
    const preloader = document.getElementById('kumbhPreloader');
    if (!preloader) return;

    // 10-second loading duration as requested
    const delayTime = 10000;

    // Update progress bar smoothly over 5 seconds
    const bar = document.getElementById('preloaderBar');
    if (bar) {
      bar.style.width = '0%';
      // Force layout reflow so the 0% start state is guaranteed to animate
      void bar.offsetWidth;
      bar.style.transition = `width ${delayTime}ms linear`;
      requestAnimationFrame(() => {
        bar.style.width = '100%';
      });
    }

    // Dismiss Preloader
    function dismiss() {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
        sessionStorage.setItem('kumbh_preloader_seen', 'true');
      }, 500);
    }

    const timer = setTimeout(dismiss, delayTime);

    // "Go to Main Page" Action Button
    const enterBtn = document.getElementById('preloaderEnterBtn');
    if (enterBtn) {
      enterBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismiss();
      });
    }

    // Skip Button (top-right)
    const skipBtn = document.getElementById('preloaderSkipBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(timer);
        dismiss();
      });
    }
  }

  /* ==========================================================================
     2. SACRED PADUKA (FOOTPRINT) MOUSE & TOUCH TRAIL
     ========================================================================== */
  function initFootprintTrail() {
    // Container for footprints
    let container = document.getElementById('footprintTrailContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'footprintTrailContainer';
      container.className = 'footprint-trail-container';
      document.body.appendChild(container);
    }

    let lastX = 0;
    let lastY = 0;
    let isLeftFoot = true;
    let activePrints = 0;
    const MAX_PRINTS = 35; // Keep DOM lightweight & 60fps
    const MIN_DISTANCE = 44; // Minimum travel distance (px) between human steps

    // Golden Sacred Footprint SVG (Left & Right anatomical variations)
    function createPadukaSvg(isLeft) {
      // Distinct left vs right footprint with 5 toes
      // If left foot: big toe is on the right of the foot (inner side)
      // If right foot: big toe is on the left of the foot (inner side)
      const mirror = isLeft ? 'scale(-1, 1)' : 'scale(1, 1)';
      const origin = isLeft ? 'transform-origin: center;' : '';

      return `
        <svg viewBox="0 0 32 48" class="paduka-svg" style="transform: ${mirror}; ${origin}">
          <!-- Sacred Heel -->
          <ellipse cx="16" cy="38" rx="8" ry="6.5" fill="url(#padukaGoldGradient)" opacity="0.9" />
          <!-- Sacred Arch & Ball of Foot -->
          <path d="M 9,33 C 8,24 10,18 16,14 C 22,18 24,24 23,33 C 21,37 11,37 9,33 Z" fill="url(#padukaGoldGradient)" opacity="0.95" />
          <!-- Divine Padma Chakra in the Center -->
          <circle cx="16" cy="24" r="2.5" fill="#fef08a" opacity="0.8" />
          <!-- 5 Sacred Toes (Big toe to Small toe) -->
          <!-- Big Toe (Inner) -->
          <ellipse cx="11" cy="7.5" rx="3.5" ry="4.5" fill="url(#padukaGoldGradient)" />
          <!-- Second Toe -->
          <ellipse cx="16.5" cy="6.5" rx="2.4" ry="3.8" fill="url(#padukaGoldGradient)" />
          <!-- Third Toe -->
          <ellipse cx="21" cy="7.5" rx="2.1" ry="3.4" fill="url(#padukaGoldGradient)" />
          <!-- Fourth Toe -->
          <ellipse cx="24.8" cy="10" rx="1.8" ry="2.9" fill="url(#padukaGoldGradient)" />
          <!-- Little Toe -->
          <ellipse cx="27.8" cy="13" rx="1.5" ry="2.4" fill="url(#padukaGoldGradient)" />
          <!-- Gold Gradient Definition -->
          <defs>
            <linearGradient id="padukaGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fef08a" />
              <stop offset="50%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#ea580c" />
            </linearGradient>
          </defs>
        </svg>
      `;
    }

    function spawnFootprint(x, y, angle) {
      if (activePrints >= MAX_PRINTS) {
        const oldest = container.firstElementChild;
        if (oldest) oldest.remove();
        activePrints--;
      }

      // Step Stride Offset: offset step laterally perpendicular to travel direction
      // Walking step width is roughly 9px to the left or right of center line
      const perpAngle = angle + (isLeftFoot ? -Math.PI / 2 : Math.PI / 2);
      const strideOffset = 9;
      const stepX = x + Math.cos(perpAngle) * strideOffset;
      const stepY = y + Math.sin(perpAngle) * strideOffset;

      const printEl = document.createElement('div');
      printEl.className = `sacred-paduka-print ${isLeftFoot ? 'foot-left' : 'foot-right'}`;

      // Rotate footprint in direction of walking (SVG points upward naturally)
      const rotationDeg = (angle * 180) / Math.PI + 90;
      printEl.style.left = `${stepX}px`;
      printEl.style.top = `${stepY}px`;
      printEl.style.transform = `translate(-50%, -50%) rotate(${rotationDeg}deg)`;
      printEl.style.setProperty('--foot-rot', `${rotationDeg}deg`);

      printEl.innerHTML = createPadukaSvg(isLeftFoot);
      container.appendChild(printEl);
      activePrints++;

      // Trigger animation frame for smooth appearance
      requestAnimationFrame(() => {
        printEl.classList.add('active-step');
      });

      // Dissolve in 2.5 seconds as requested by user
      setTimeout(() => {
        printEl.classList.add('dissolve-step');
      }, 1000);

      // Clean up completely from DOM after dissolve completes
      setTimeout(() => {
        if (printEl.parentNode) {
          printEl.remove();
          activePrints--;
        }
      }, 2600);

      // Alternate foot for next step!
      isLeftFoot = !isLeftFoot;
    }

    function handlePointerMove(e) {
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist >= MIN_DISTANCE) {
        const angle = Math.atan2(dy, dx);
        spawnFootprint(clientX, clientY, angle);
        lastX = clientX;
        lastY = clientY;
      }
    }

    // Attach to mousemove & touchmove (passive for smooth scrolling)
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
  }

  /* ==========================================================================
     3. VIRAL RETENTION: WHATSAPP SHARE ENGINE FOR SHAHI SNAN DATES
     ========================================================================== */
  window.shareSnanOnWhatsApp = function (eventId) {
    if (!window.SHAHI_SNAN_DATES) return;
    const event = window.SHAHI_SNAN_DATES.find(e => e.id === eventId);
    if (!event) return;

    const lang = document.documentElement.lang || 'mr';
    const title = lang === 'mr' ? event.titleMr : (lang === 'hi' ? event.titleHi : event.title);
    const tithi = lang === 'mr' ? event.tithiMr : (lang === 'hi' ? event.tithiHi : event.tithi);
    const muhurat = lang === 'mr' ? event.muhuratMr : (lang === 'hi' ? event.muhuratHi : event.muhurat);
    const loc = lang === 'mr' ? event.locationMr : (lang === 'hi' ? event.locationHi : event.location);

    const shareText = `🚩 *सिंहस्थ कुंभमेळा नाशिक-त्र्यंबकेश्वर २०२७*\n\n` +
      `📅 *${title}*\n` +
      `🕉️ तिथी: ${tithi}\n` +
      `⏰ शुभ मुहूर्त: ${muhurat}\n` +
      `📍 स्थान: ${loc}\n\n` +
      `✨ संपूर्ण दिनदर्शिका, दर्शन माहिती व प्रवास मार्गदर्शकासाठी येथे भेट द्या:\n` +
      `🌐 https://nashik-tourism-delta.vercel.app/#dates\n\n` +
      `"हर हर गंगे • जय गोदावरी माता" 🙏`;

    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initFootprintTrail();
  });
})();
