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

    // Check if user already saw preloader in this session or requested bypass
    if (window.location.search.includes('nopreloader') || sessionStorage.getItem('kumbh_preloader_seen') === 'true') {
      preloader.style.display = 'none';
      return;
    }

    // Fast graceful loading duration (2.2s)
    const delayTime = 2200;

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
    const MIN_DISTANCE = 44; // Minimum travel distance (px) between human steps
    const MAX_QUEUE_SIZE = 25; // Safety cap to keep DOM lightweight & 60fps

    // Sacred Paduka Water Ripple on Holy Ground
    function spawnPadukaRipple(rx, ry) {
      const ripple = document.createElement('div');
      ripple.className = 'sacred-paduka-ripple';
      ripple.style.left = `${rx}px`;
      ripple.style.top = `${ry}px`;
      container.appendChild(ripple);
      setTimeout(() => {
        if (ripple.parentNode) ripple.remove();
      }, 900);
    }

    // Option 3: Parallax World Drift (Background layers subtly shift with footstep movement)
    let parallaxX = 0;
    let parallaxY = 0;
    function handleParallaxDrift(dx, dy) {
      parallaxX = Math.max(-28, Math.min(28, parallaxX + dx * 0.12));
      parallaxY = Math.max(-28, Math.min(28, parallaxY + dy * 0.12));
      const heroBg = document.querySelector('.hero-bg, .hero-particles');
      if (heroBg) {
        heroBg.style.transform = `translate3d(${parallaxX}px, ${parallaxY}px, 0)`;
      }
    }

    // Sequential Footprint Fade Queue (guarantees one-by-one step fade)
    const footprintQueue = []; // Array of { el, birthTime }
    let isFading = false;
    let fadeTimer = null;

    function processQueue() {
      if (isFading) return;
      if (footprintQueue.length === 0) {
        if (fadeTimer) {
          clearTimeout(fadeTimer);
          fadeTimer = null;
        }
        return;
      }

      const now = performance.now();
      const oldest = footprintQueue[0];
      const age = now - oldest.birthTime;
      const count = footprintQueue.length;

      const MAX_VISIBLE = 7;
      const MIN_LIFETIME = 700; // ms to remain fully visible before eligible to fade

      // If trail length is within limit, let the oldest step linger for at least MIN_LIFETIME
      if (count <= MAX_VISIBLE && age < MIN_LIFETIME) {
        if (fadeTimer) clearTimeout(fadeTimer);
        fadeTimer = setTimeout(processQueue, Math.max(25, MIN_LIFETIME - age));
        return;
      }

      // Begin fading strictly ONE step at a time
      isFading = true;
      const current = footprintQueue.shift();

      // Dynamic duration: crisp, smooth, and prevents pileups
      let fadeDuration = 380; // ms
      let pauseAfter = 85;    // ms pause before next step can begin fading
      if (count > 14) {
        fadeDuration = 200;
        pauseAfter = 25;
      } else if (count > 8) {
        fadeDuration = 280;
        pauseAfter = 45;
      }

      if (current.el) {
        current.el.style.setProperty('--dissolve-duration', `${fadeDuration}ms`);
        current.el.classList.add('dissolve-step');
      }

      setTimeout(() => {
        if (current.el && current.el.parentNode) {
          current.el.remove();
        }
        setTimeout(() => {
          isFading = false;
          processQueue(); // Fades the next step in sequence, strictly one by one!
        }, pauseAfter);
      }, fadeDuration);
    }

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
      if (footprintQueue.length >= MAX_QUEUE_SIZE) {
        const excess = footprintQueue.shift();
        if (excess && excess.el && excess.el.parentNode) {
          excess.el.remove();
        }
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

      // Sacred Water Ripple on ground contact
      spawnPadukaRipple(stepX, stepY);

      // Trigger animation frame for smooth appearance
      requestAnimationFrame(() => {
        printEl.classList.add('active-step');
      });

      // Enqueue footprint with timestamp
      footprintQueue.push({
        el: printEl,
        birthTime: performance.now()
      });

      // Alternate foot for next step!
      isLeftFoot = !isLeftFoot;

      // Trigger sequential queue processing
      processQueue();
    }

    function handlePointerMove(e) {
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      if (lastX === 0 && lastY === 0) {
        lastX = clientX;
        lastY = clientY;
        return;
      }

      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);

      // Option 3: Parallax World Drift on movement
      handleParallaxDrift(dx, dy);

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

  // Safe Boot Loader: runs immediately if DOM already parsed, or waits for DOMContentLoaded
  function bootRamYatra() {
    initPreloader();
    initFootprintTrail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootRamYatra);
  } else {
    bootRamYatra();
  }
})();
