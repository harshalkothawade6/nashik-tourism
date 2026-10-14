/**
 * Nashik Simhastha Kumbh Mela - Master Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Diya Canvas River Simulation
  if (window.DiyaRiverSimulation) {
    window.diyaSim = new DiyaRiverSimulation('diyaRiverCanvas');
  }

  // 2. Initialize Countdown Timer
  initCountdownTimer();

  // 3. Render Shahi Snan Dates Grid
  renderDates('all');
  initDateFilters();

  // 4. Render Spots to Visit Grid
  renderSpots('all');
  initSpotFilters();

  // 5. Initialize Transit Estimator
  initTransitEstimator();

  // 6. Initialize Audio Controller
  initAudioControls();

  // 7. Initialize Diya Arpan Form
  initDiyaForm();

  // 8. Navigation & Sticky Scroll
  initNavigation();

  // 9. Language Switcher
  initThemeSwitcher();
  initLanguageSwitcher();

  // 10. Modal controls
  initModals();
});

/* --- 1. Countdown Timer Engine --- */
function initCountdownTimer() {
  // Target: The upcoming Simhastha Kumbh Mela First Shahi Snan
  const targetDate = new Date('2027-08-17T04:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('daysVal').textContent = '00';
      document.getElementById('hoursVal').textContent = '00';
      document.getElementById('minsVal').textContent = '00';
      document.getElementById('secsVal').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => n < 10 ? '0' + n : n;

    const daysEl = document.getElementById('daysVal');
    const hoursEl = document.getElementById('hoursVal');
    const minsEl = document.getElementById('minsVal');
    const secsEl = document.getElementById('secsVal');

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl) minsEl.textContent = pad(mins);
    if (secsEl) secsEl.textContent = pad(secs);
  }

  update();
  setInterval(update, 1000);
}

/* --- 2. Shahi Snan Dates Rendering & Filtering --- */
function renderDates(filter = 'all') {
  const container = document.getElementById('datesGrid');
  if (!container || !window.SHAHI_SNAN_DATES) return;

  const filtered = window.SHAHI_SNAN_DATES.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'shahi') return item.category === 'shahi';
    if (filter === 'ramkund') return item.locationType === 'ramkund' || item.locationType === 'both';
    if (filter === 'kushavarta') return item.locationType === 'kushavarta' || item.locationType === 'both';
    if (filter === 'rituals') return item.category === 'rituals';
    return true;
  });

  container.innerHTML = filtered.map(item => `
    <article class="date-card ${item.category === 'shahi' ? 'shahi-major' : ''}">
      <div class="card-top">
        <div class="event-date-badge">
          <div class="date-calendar-box">
            <span class="date-month">${item.month}</span>
            <span class="date-day">${item.day}</span>
            <span class="date-year">${item.year}</span>
          </div>
          <div class="event-meta">
            <span class="event-tithi">${item.tithi}</span>
            <span class="event-location-pill">
              📍 ${item.location}
            </span>
          </div>
        </div>
        <span class="card-tag ${item.tagClass}">${item.tag}</span>
      </div>

      <h3 class="event-title">${item.title}</h3>
      <p class="event-desc">${item.desc}</p>

      <ul class="event-details-list">
        <li class="event-detail-item">
          <span class="detail-label">⏰ Auspicious Muhurat:</span>
          <span class="detail-value">${item.muhurat}</span>
        </li>
        <li class="event-detail-item">
          <span class="detail-label">🕉️ Holy Rituals:</span>
          <span class="detail-value">${item.holyRitual}</span>
        </li>
        <li class="event-detail-item">
          <span class="detail-label">👥 Crowd Alert:</span>
          <div class="crowd-density-meter density-${item.density}">
            <span class="density-dot"></span>
            <span class="detail-value">${item.densityText}</span>
          </div>
        </li>
      </ul>

      <button class="btn-card-action" onclick="window.downloadIcsCalendar('${item.id}')" title="Add to Google/Apple Calendar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Add to Calendar (.ics)</span>
      </button>
    </article>
  `).join('');
}

function initDateFilters() {
  const filterBtns = document.querySelectorAll('.date-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderDates(filter);
    });
  });
}

/* --- 3. Spots to Visit Rendering & Modal --- */
function renderSpots(filter = 'all') {
  const container = document.getElementById('spotsGrid');
  if (!container || !window.SPOTS_DATA) return;

  const filtered = window.SPOTS_DATA.filter(spot => {
    if (filter === 'all') return true;
    return spot.category === filter;
  });

  container.innerHTML = filtered.map(spot => `
    <article class="spot-card">
      <div class="spot-image-box">
        <img src="${spot.image}" alt="${spot.title}" class="spot-img" loading="lazy">
        <span class="spot-category-badge">${spot.category}</span>
        <span class="spot-rating">${spot.rating}</span>
      </div>

      <div class="spot-content">
        <h3 class="spot-title">${spot.title}</h3>
        <span class="spot-subtitle">${spot.titleMr}</span>
        <p class="spot-snippet">${spot.snippet}</p>

        <div class="spot-quick-tags">
          <span class="quick-tag">⏱️ ${spot.timings.split('|')[0]}</span>
          <span class="quick-tag">🚗 ${spot.distance.split('/')[0]}</span>
        </div>

        <button class="btn-spot-modal" onclick="openSpotModal('${spot.id}')">
          <span>View Pilgrimage Guide</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </article>
  `).join('');
}

function initSpotFilters() {
  const filterBtns = document.querySelectorAll('.spot-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderSpots(filter);
    });
  });
}

window.openSpotModal = function(spotId) {
  const spot = window.SPOTS_DATA.find(s => s.id === spotId);
  if (!spot) return;

  const modal = document.getElementById('spotDetailsModal');
  const body = document.getElementById('modalDynamicContent');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="modal-header-img-box">
      <img src="${spot.image}" alt="${spot.title}" class="modal-header-img">
    </div>

    <div class="modal-body">
      <h2 class="modal-title">${spot.title}</h2>
      <div class="modal-marathi-title">${spot.titleMr}</div>
      <p style="font-size: 1.02rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
        ${spot.fullHistory}
      </p>

      <div style="background: rgba(8, 14, 27, 0.7); border: 1px solid var(--border-gold-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">⏰ Darshan Timings:</span>
          <strong style="color: #fff;">${spot.timings}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">📍 Distance & Route:</span>
          <strong style="color: var(--gold-300);">${spot.distance}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">👔 Dress Code:</span>
          <strong style="color: #fff;">${spot.dressCode}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between;">
          <span style="color: var(--text-muted);">🎟️ Entry / Pass:</span>
          <strong style="color: var(--river-glow);">${spot.entryFee}</strong>
        </div>
      </div>

      <h4 class="modal-section-h4">💡 Pilgrim Pro-Tips & Etiquette:</h4>
      <ul class="modal-pro-tips-list">
        ${spot.tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>

      <div class="modal-footer-actions">
        <a href="${spot.mapLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>Open in Google Maps</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function initModals() {
  const modal = document.getElementById('spotDetailsModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/* --- 4. Interactive Virtual Diya Form --- */
function initDiyaForm() {
  const form = document.getElementById('diyaArpanForm');
  const typeCards = document.querySelectorAll('.diya-type-card');
  let selectedType = 'brass';

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedType = card.getAttribute('data-type') || 'brass';
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('devoteeName');
      const wishSelect = document.getElementById('prayerWish');

      const name = nameInput.value.trim() || 'श्रद्धाळू भाविक';
      const wish = wishSelect.value || 'सर्व सुख, शांती व आरोग्य लाभो';

      if (window.diyaSim) {
        window.diyaSim.addDevoteeDiya(name, wish, selectedType);
      }

      // Show toast or highlight
      const submitBtn = document.getElementById('floatDiyaBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>✓ दीप गोदावरीत अर्पण झाला!</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        nameInput.value = '';
      }, 3000);
    });
  }
}

/* --- 5. Transit Estimator --- */
function initTransitEstimator() {
  const citySelect = document.getElementById('transitCitySelect');
  const transitTabs = document.querySelectorAll('.transit-tab-btn');
  const transitPanels = document.querySelectorAll('.transit-content-panel');

  // Mode Switcher (Air / Train / Road / Shuttles)
  transitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      transitTabs.forEach(t => t.classList.remove('active'));
      transitPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // City Selector
  function updateCityStats(cityKey) {
    const data = window.TRANSIT_CITIES[cityKey];
    if (!data) return;

    document.getElementById('calcCityName').textContent = data.name;
    document.getElementById('calcDistance').textContent = data.distance;
    document.getElementById('calcDuration').textContent = data.duration;
    document.getElementById('calcRoute').textContent = data.route;
    document.getElementById('calcTrains').textContent = data.trains;
    document.getElementById('calcToll').textContent = data.tollEst;
  }

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      updateCityStats(e.target.value);
    });
    updateCityStats('mumbai');
  }
}

/* --- 6. Audio Synthesizer Control --- */
function initAudioControls() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn && window.sacredAudio) {
    audioBtn.addEventListener('click', () => {
      window.sacredAudio.toggleAmbient(audioBtn);
    });
  }
}

/* --- 7. Sticky Navigation & Smooth Scroll --- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      navLinks.style.display = isVisible ? 'none' : 'flex';
      if (!isVisible) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--bg-glass-strong)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.borderBottom = '1px solid var(--border-gold-subtle)';
      }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
}

/* --- 8. Language Switcher (EN / MR) --- */
const TRANSLATIONS = {
  mr: {
    heroTag: 'कुंभमेळा नाशिक-त्र्यंबकेश्वर • सिंहस्थ महाकुंभ २०२७',
    heroTitle: 'धर्म, संस्कृती आणि मोक्षाचा महासंगम',
    heroSub: 'गोदावरी मातेच्या पावन तीरावर शतकानुशतके वाहणारी भक्तीची अखंड अमृतधारा. नाशिक आणि त्र्यंबकेश्वर सिंहस्थ यात्रेचे संपूर्ण अधिकृत मार्गदर्शक.',
    navKumbh: 'सिंहस्थ कुंभ',
    navDates: 'शाही स्नान',
    navDiya: 'दीपदान',
    navSpots: 'दर्शनीय स्थळे',
    navTravel: 'कसे पोहोचावे',
    navAmenities: 'मदत कक्ष'
  },
  en: {
    heroTag: 'NASHIK-TRIMBAKESHWAR • SIMHASTHA MAHA KUMBH 2027',
    heroTitle: 'The Eternal Flow of Divinity, Faith & Salvation',
    heroSub: 'Experience the world’s grandest spiritual congregation on the sacred banks of Mother Godavari. Your definitive pilgrimage guide to Nashik and Trimbakeshwar.',
    navKumbh: 'Kumbh Mela',
    navDates: 'Shahi Snan',
    navDiya: 'Virtual Diya',
    navSpots: 'Spots to Visit',
    navTravel: 'Travel Guide',
    navAmenities: 'Helpline'
  }
};

function initLanguageSwitcher() {
  const enBtn = document.getElementById('langEn');
  const mrBtn = document.getElementById('langMr');

  if (enBtn && mrBtn) {
    enBtn.addEventListener('click', () => switchLanguage('en'));
    mrBtn.addEventListener('click', () => switchLanguage('mr'));
  }
}

function switchLanguage(lang) {
  const enBtn = document.getElementById('langEn');
  const mrBtn = document.getElementById('langMr');

  if (lang === 'mr') {
    mrBtn.classList.add('active');
    enBtn.classList.remove('active');
    applyLanguageData(TRANSLATIONS.mr);
  } else {
    enBtn.classList.add('active');
    mrBtn.classList.remove('active');
    applyLanguageData(TRANSLATIONS.en);
  }
}

function applyLanguageData(data) {
  const badgeEl = document.querySelector('.hero-badge .badge-text');
  const titleEl = document.querySelector('.hero-title-main');
  const subEl = document.querySelector('.hero-subtitle');

  if (badgeEl) badgeEl.textContent = data.heroTag;
  if (titleEl) titleEl.innerHTML = `<span class="gold-gradient-text">${data.heroTitle}</span>`;
  if (subEl) {
    subEl.childNodes[0].textContent = data.heroSub;
  }
}

/* --- 11. Theme Controller (Dark, Light, Heritage) --- */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('kumbh_theme') || 'dark';

  applyTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme-set');
      applyTheme(selectedTheme);
      try {
        localStorage.setItem('kumbh_theme', selectedTheme);
      } catch (e) {
        console.warn('LocalStorage unavailable', e);
      }
    });
  });
}

function applyTheme(theme) {
  const html = document.documentElement;
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');

  if (theme === 'dark') {
    html.removeAttribute('data-theme');
    if (metaThemeColor) metaThemeColor.setAttribute('content', '#050912');
  } else {
    html.setAttribute('data-theme', theme);
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#fbf8f2' : '#1f0b03');
    }
  }

  // Update active state on all theme buttons
  document.querySelectorAll('.theme-btn').forEach(btn => {
    if (btn.getAttribute('data-theme-set') === theme) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}