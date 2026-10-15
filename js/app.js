/**
 * Nashik Simhastha Kumbh Mela - Master Application Controller
 * Features:
 * - Default Heritage Theme (Vedic Parampara)
 * - Tri-Lingual Support: English (en), Marathi (mr), Hindi (hi)
 * - Geolocation Language Auto-Detection with subtle confirmation toast
 * - Instant Live Search Filters for Spots & Holy Dates
 * - Dual Intent Toggle: Kumbh Pilgrimage vs. Nashik Tourism
 * - Google Calendar 1-Click Link + .ics Download
 * - Accessible Modal Dialog & Mobile Navigation
 */

// Global State
let currentLang = 'mr'; // Will be set by initLanguage()
let currentDateFilter = 'all';
let currentSpotFilter = 'all';
let dateSearchQuery = '';
let spotSearchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme Engine (Default to Heritage)
  initThemeSwitcher();

  // 2. Initialize Language Engine & Geolocation Tracking
  initLanguageEngine();

  // 3. Initialize Diya Canvas River Simulation
  if (window.DiyaRiverSimulation) {
    window.diyaSim = new DiyaRiverSimulation('diyaRiverCanvas');
  }

  // 4. Initialize Countdown Timer
  initCountdownTimer();

  // 5. Initialize Live Search & Filters
  initSearchAndFilters();

  // 6. Initialize Audience Intent Toggle
  initAudienceIntent();

  // 7. Initialize Transit Estimator
  initTransitEstimator();

  // 8. Initialize Audio Controller
  initAudioControls();

  // 9. Initialize Diya Arpan Form
  initDiyaForm();

  // 10. Navigation & Mobile Drawer
  initNavigation();

  // 11. Modal Controls
  initModals();
});

/* ==========================================================================
   1. THEME CONTROLLER (Default: Heritage)
   ========================================================================== */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  // Default to 'heritage' as requested by user
  const savedTheme = localStorage.getItem('kumbh_theme') || 'heritage';

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

  html.setAttribute('data-theme', theme);
  
  if (metaThemeColor) {
    if (theme === 'heritage') metaThemeColor.setAttribute('content', '#1f0b03');
    else if (theme === 'light') metaThemeColor.setAttribute('content', '#fbf8f2');
    else metaThemeColor.setAttribute('content', '#050912');
  }

  // Update active states
  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isTarget = btn.getAttribute('data-theme-set') === theme;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });
}

/* ==========================================================================
   2. TRILINGUAL LOCALIZATION & GEOLOCATION TRACKING
   ========================================================================== */
const TRANSLATIONS = {
  en: {
    brandTitle: 'NASHIK SIMHASTHA',
    brandSub: 'MAHA KUMBH MELA & TOURISM',
    navDates: '📅 Shahi Snan Dates',
    navDiya: '🪔 Virtual Diya',
    navSpots: '📍 Spots to Visit',
    navTravel: '🚆 Travel Guide',
    navAmenities: '🚨 Pilgrim Helpline',
    audioLabel: 'Temple Sound',
    audioLabelPlaying: 'Sounding (Mute)',
    
    // Intent Selector
    intentKumbh: '🕉️ Simhastha Kumbh Mela 2027',
    intentTourism: '🍇 Nashik Tourism & Wine Capital',

    // Hero
    heroBadge: 'NASHIK-TRIMBAKESHWAR • SIMHASTHA MAHA KUMBH',
    heroMarathiTitle: 'सिंहस्थ कुंभमेळा नाशिक-त्र्यंबकेश्वर',
    heroTitleMain: 'The Sacred Confluence of Divinity, Faith & Salvation',
    heroSubtitle: 'Experience the world’s grandest spiritual congregation on the sacred banks of Mother Godavari.',
    sanskritVerse: '"गंगा द्वारे कुशावर्ते बिल्वके नीले पर्वते। स्नात्वा च अश्वमेधस्य फलं प्राप्नोति मानवः॥"',
    countdownLabel: '⏳ COUNTDOWN TO FIRST SHAHI SNAN',
    countdownTarget: 'Shravan Purnima • August 17, 2027',
    unitDays: 'Days',
    unitHours: 'Hours',
    unitMins: 'Minutes',
    unitSecs: 'Seconds',
    btnHeroDates: 'View Shahi Snan Dates',
    btnHeroDiya: 'Light a Diya on Godavari',
    btnHeroTravel: 'Plan Your Yatra',
    stat1Val: '13 Akhadas',
    stat1Desc: 'Shaiva, Vaishnava & Udasin Sects',
    stat2Val: '12 Years',
    stat2Desc: 'Brihaspati in Simha Celestial Cycle',
    stat3Val: '30 Million+',
    stat3Desc: 'Pilgrims & Sadhus Expected',
    stat4Val: '2 Holy Tirtha',
    stat4Desc: 'Ramkund & Kushavarta Confluences',

    // Dates Section
    datesTag: 'Auspicious Calendar',
    datesTitle: 'Shahi Snan & Parvani Auspicious Calendar',
    datesSubtitle: 'Sacred Shahi Snan Muhurats, royal Akhada procession schedules, and planetary alignments on the banks of Godavari.',
    filterAllDates: 'All Holy Dates',
    filterShahiDates: '👑 Royal Shahi Snans',
    filterRamkundDates: '📍 Ramkund Nashik',
    filterKushavartaDates: '⛰️ Trimbakeshwar',
    filterRitualsDates: '🚩 Consecration & Rituals',
    dateSearchPlaceholder: '🔍 Search holy dates, snans, or ghats...',
    noDatesFound: 'No holy dates match your search.',
    labelMuhurat: '⏰ Auspicious Muhurat:',
    labelRituals: '🕉️ Holy Rituals:',
    labelCrowd: '👥 Crowd Alert:',
    btnGoogleCal: 'Google Calendar',
    btnIcsCal: 'Add to iCal (.ics)',

    // Diya Section
    diyaTag: 'Live Devotion Experience',
    diyaTitle: 'Godavari Diya Arpan • Virtual Lamp Offering',
    diyaSubtitle: 'Offer your heartfelt prayer and light a virtual brass lamp on the sacred rippling waters of Godavari alongside thousands of devotees worldwide.',
    diyaFormH3: 'Offer Your Sacred Prayer',
    diyaFormDesc: 'Choose your sacred offering, enter your name or family gotra, select your prayer blessing, and release your diya into Mother Godavari.',
    diyaLabel1: '1. Choose Diya Offering (दीप प्रकार)',
    diyaBrass: 'Panchdhatu Brass',
    diyaLotus: 'Kamal / Lotus',
    diyaMarigold: 'Marigold Leaf',
    diyaLabel2: '2. Devotee Name / Family Gotra',
    diyaPlaceholderName: 'e.g. Ramesh Joshi & Family',
    diyaLabel3: '3. Sacred Sankalpa / Prayer',
    wish1: 'Peace, Health & Well-being for Family (सुख-शांती)',
    wish2: 'Spiritual Liberation & Moksha (मोक्ष प्राप्ती)',
    wish3: 'Prosperity, Success & Knowledge (यश व समृद्धी)',
    wish4: 'Universal Peace & Global Harmony (विश्वशांती)',
    btnSubmitDiya: 'अर्पण करा • Offer to Sacred Godavari',
    btnDiyaSuccess: '✓ Diya Offered to Sacred Godavari!',
    diyaStatsSuffix: '+ Diyas currently floating in the sacred river',
    canvasGuide: '🌊 Click anywhere on river to float a blessing diya',
    canvasBadge: '✨ Sacred River Godavari (दक्षिण गंगा)',

    // Spots Section
    spotsTag: 'Explore Nashik & Trimbakeshwar',
    spotsTitle: 'Spots to Visit in Nashik • Tourism & Pilgrimage',
    spotsSubtitle: 'From the 10th Jyotirlinga and Ramayana sanctuaries to prehistoric Buddhist caves, Hanuman’s birthplace, and sprawling vineyard estates.',
    filterAllSpots: 'All Spots (सर्व)',
    filterTemples: '🕉️ Sacred Temples',
    filterHeritage: '⛰️ Mythology & Heritage',
    filterVineyards: '🍇 Vineyards & Lakes',
    filterCulinary: '🍲 Culinary Misal Trail',
    spotSearchPlaceholder: '🔍 Search spots (e.g. Trimbakeshwar, Sula, Sita Gufa, Misal)...',
    noSpotsFound: 'No destinations match your search filter.',
    btnViewSpotGuide: 'View Pilgrimage Guide',
    modalDarshan: '⏰ Darshan Timings:',
    modalDistance: '📍 Distance & Route:',
    modalDress: '👔 Dress Code:',
    modalEntry: '🎟️ Entry / Pass:',
    modalProTips: '💡 Pilgrim Pro-Tips & Etiquette:',
    btnOpenMaps: 'Open in Google Maps',

    // Travel Section
    travelTag: 'Transit & Logistics',
    travelTitle: 'How to Reach Nashik • Complete Travel Guide',
    travelSubtitle: 'Comprehensive air, railway, expressway corridors, and special Kumbh Mela ring shuttles connecting Nashik to the nation.',
    tabFlight: '✈️ By Flight',
    tabTrain: '🚆 By Train',
    tabRoad: '🚗 Expressway & Road',
    tabShuttle: '🚌 Kumbh EV Shuttles',
    calcTitle: 'Journey Distance & Route Calculator',
    calcSubtitle: 'Select your originating city to calculate travel hours, best highways, and train recommendations.',
    calcOriginLabel: 'Originating City (प्रारंभ शहर)',
    calcDestLabel: 'Destination:',
    calcDistLabel: 'Driving Distance:',
    calcDurationLabel: 'Approx. Travel Time:',
    calcRouteLabel: 'Recommended Route:',
    calcTrainsLabel: 'Frequent Express Trains:',
    calcTollLabel: 'Estimated Road Toll:',
    strip1H4: 'Satellite Parking Hubs',
    strip1P: 'Safe, CCTV-monitored mega parking lots outside inner city perimeters with cloakrooms and clean restrooms.',
    strip2H4: 'Free Green EV Shuttles',
    strip2P: 'Continuous fleet of zero-emission electric buses running pilgrims straight to Ramkund & Tapovan drop-offs.',
    strip3H4: 'Pedestrian Ghat Corridors',
    strip3P: 'Shaded, misted walking corridors with fresh drinking water points and emergency medical booths every 300 meters.',

    // Amenities Section
    amenitiesTag: 'Pilgrim Assistance',
    amenitiesTitle: 'Pilgrim Amenities & Emergency Help Centers',
    amenitiesSubtitle: 'Essential pilgrim support services, round-the-clock emergency outposts, and free langar facilities setup for Simhastha.',
    amenity1H3: '24x7 Field Hospitals',
    amenity1P: 'Advanced cardiac life-support ambulances, free ICU trauma beds, and round-the-clock medical specialists on site.',
    amenity2H3: 'Maha Annachhatra (Langar)',
    amenity2P: 'Wholesome, hygienic satvik meals and warm breakfast served free to all pilgrims through religious trusts and Akhadas.',
    amenity3H3: 'Ghat Divers & Safety Patrol',
    amenity3P: 'Trained disaster management swimmers, motorized rescue lifeboats, safety nets, and life buoys deployed at all bathing kunds.',
    amenity4H3: 'Lost & Found Multilingual Hub',
    amenity4P: 'Central computerized portal with AI facial recognition to help reconnect separated family members and track lost belongings.',
    emergencyH3: '🚨 24/7 Pilgrim Emergency Helpline Numbers',
    emergencyP: 'Immediate police assistance, medical emergency, fire control, and Kumbh administrative desk. Toll-free and available in Hindi, Marathi, and English.',
    btnHelpKumbh: 'Kumbh Helpline: 1077',
    btnHelpPolice: 'Police / SOS: 112',
    btnHelpAmbulance: 'Ambulance: 108',

    // Footer
    footerBrandDesc: 'Nashik & Trimbakeshwar Simhastha Kumbh Mela — The eternal celebration of faith, sanctity, and salvation on the sacred Godavari riverbanks.',
    footerChant: '🕉️ "Har Har Gange • Jai Godavari Mata"',
    footerH5Exploration: 'Quick Exploration',
    footerH5Transit: 'Pilgrim Transit',
    footerBottomCopy: '© 2026–2027 Nashik Simhastha Kumbh Mela & Tourism Portal. Crafted with devotion and visual excellence.',
    footerBottomTag: 'Nashik • Trimbakeshwar • Panchavati • Dakshin Ganga Godavari',

    // Toast
    toastActionChange: 'Change'
  },

  mr: {
    brandTitle: 'नाशिक सिंहस्थ',
    brandSub: 'महाकुंभमेळा आणि पर्यटन मार्गदर्शक',
    navDates: '📅 शाही स्नान पर्वणी',
    navDiya: '🪔 गोदावरी दीपदान',
    navSpots: '📍 दर्शनीय स्थळे',
    navTravel: '🚆 प्रवास मार्गदर्शक',
    navAmenities: '🚨 भाविक मदत कक्ष',
    audioLabel: 'मंदिराची घंटा',
    audioLabelPlaying: 'ध्वनी सुरू (म्यूट)',

    // Intent Selector
    intentKumbh: '🕉️ सिंहस्थ कुंभमेळा २०२७',
    intentTourism: '🍇 नाशिक पर्यटन व द्राक्षनगरी',

    // Hero
    heroBadge: 'नाशिक-त्र्यंबकेश्वर • सिंहस्थ महाकुंभ २०२७',
    heroMarathiTitle: 'सिंहस्थ कुंभमेळा नाशिक-त्र्यंबकेश्वर',
    heroTitleMain: 'धर्म, संस्कृती आणि मोक्षाचा पवित्र महासंगम',
    heroSubtitle: 'गोदावरी मातेच्या पावन तीरावर शतकानुशतके वाहणारी भक्तीची अखंड अमृतधारा. नाशिक आणि त्र्यंबकेश्वर सिंहस्थ यात्रेचे संपूर्ण अधिकृत मार्गदर्शक.',
    sanskritVerse: '"गंगा द्वारे कुशावर्ते बिल्वके नीले पर्वते। स्नात्वा च अश्वमेधस्य फलं प्राप्नोति मानवः॥"',
    countdownLabel: '⏳ प्रथम शाही स्नानासाठी शिल्लक वेळ',
    countdownTarget: 'श्रावण पौर्णिमा • १७ ऑगस्ट २०२७',
    unitDays: 'दिवस',
    unitHours: 'तास',
    unitMins: 'मिनिटे',
    unitSecs: 'सेकंद',
    btnHeroDates: 'शाही स्नान दिनदर्शिका पहा',
    btnHeroDiya: 'गोदावरीत दीपदान करा',
    btnHeroTravel: 'यात्रेचे नियोजन करा',
    stat1Val: '१३ आखाडे',
    stat1Desc: 'शैव, वैष्णव आणि उदासीन संप्रदाय',
    stat2Val: '१२ वर्षे',
    stat2Desc: 'सिंह राशीत बृहस्पतीचा अलौकिक योग',
    stat3Val: '३ कोटी+',
    stat3Desc: 'अपेक्षित भाविक व साधू-संत',
    stat4Val: '२ पवित्र तीर्थे',
    stat4Desc: 'रामकुंड (नाशिक) व कुशावर्त (त्र्यंबक)',

    // Dates Section
    datesTag: 'शुभ पर्वणी दिनदर्शिका',
    datesTitle: 'शाही स्नान आणि पर्वणी दिनदर्शिका',
    datesSubtitle: 'पवित्र गोदावरी तीरावरील शाही स्नान मुहूर्त, आखाड्यांच्या शाही मिरवणुका आणि ग्रह-ताऱ्यांचे शुभ योग.',
    filterAllDates: 'सर्व पवित्र तिथी',
    filterShahiDates: '👑 शाही स्नान पर्वणी',
    filterRamkundDates: '📍 रामकुंड (नाशिक)',
    filterKushavartaDates: '⛰️ कुशावर्त (त्र्यंबकेश्वर)',
    filterRitualsDates: '🚩 ध्वजारोहण व धार्मिक विधी',
    dateSearchPlaceholder: '🔍 स्नान, तिथी किंवा घाट शोधा...',
    noDatesFound: 'शोधाशी जुळणारी कोणतीही तिथी सापडली नाही.',
    labelMuhurat: '⏰ अमृत स्नान मुहूर्त:',
    labelRituals: '🕉️ धार्मिक विधी:',
    labelCrowd: '👥 भाविकांची गर्दी:',
    btnGoogleCal: 'गुगल कॅलेंडर',
    btnIcsCal: 'iCal मध्ये जोडा (.ics)',

    // Diya Section
    diyaTag: 'थेट भक्ती अनुभूती',
    diyaTitle: 'गोदावरी दीपदान • व्हर्च्युअल दीप अर्पण',
    diyaSubtitle: 'गोदावरी मातेच्या पावन प्रवाहावर आपले नाव आणि संकल्पासह सुवर्णदीप अर्पण करा आणि जगभरातील लाखो भाविकांसोबत पुण्य संपादन करा.',
    diyaFormH3: 'सद्भावनेचे दीपदान करा',
    diyaFormDesc: 'आपला आवडता दीप निवडा, आपले नाव व कुल गोत्र प्रविष्ट करा, मनोभावे संकल्प निवडा आणि गोदावरी नदीत दीप सोडा.',
    diyaLabel1: '१. दीप प्रकार निवडा (Choose Diya)',
    diyaBrass: 'पंचधातू पितळी दीप',
    diyaLotus: 'कमल पुष्प दीप',
    diyaMarigold: 'झेंडूचे पान दीप',
    diyaLabel2: '२. भाविकाचे नाव / कुल गोत्र',
    diyaPlaceholderName: 'उदा. रमेश जोशी व कुटुंबीय',
    diyaLabel3: '३. पावन संकल्प / प्रार्थना',
    wish1: 'सर्व सुख, शांती व आरोग्य लाभो (सुख-समृद्धी)',
    wish2: 'पापमुक्ती व आध्यात्मिक उन्नती (मोक्ष प्राप्ती)',
    wish3: 'यश, विद्या व भरभराट (कार्यसिद्धी)',
    wish4: 'विश्व शांती व लोककल्याण (विश्वशांती)',
    btnSubmitDiya: 'अर्पण करा • Offer to Sacred Godavari',
    btnDiyaSuccess: '✓ दीप गोदावरीत भक्तिभावाने अर्पण झाला!',
    diyaStatsSuffix: '+ दीप सध्या पावन गोदावरीत प्रज्वलित वाहत आहेत',
    canvasGuide: '🌊 नदीवर कुठेही क्लिक करून आपला प्रार्थना दीप प्रवाहित करा',
    canvasBadge: '✨ दक्षिण गंगा पावन गोदावरी',

    // Spots Section
    spotsTag: 'नाशिक दर्शन',
    spotsTitle: 'दर्शनीय स्थळे • नाशिक व त्र्यंबकेश्वर',
    spotsSubtitle: '१०वे ज्योतिर्लिंग, रामायणकालीन पावन भूमी, प्राचीन बौद्ध लेणी, हनुमानाची जन्मभूमी आणि जागतिक ख्यातीच्या द्राक्षबागा.',
    filterAllSpots: 'सर्व स्थळे (All)',
    filterTemples: '🕉️ पवित्र मंदिरे',
    filterHeritage: '⛰️ पौराणिक व ऐतिहासिक',
    filterVineyards: '🍇 द्राक्षबागा व धरणे',
    filterCulinary: '🍲 नाशिकची झणझणीत मिसळ',
    spotSearchPlaceholder: '🔍 स्थळ शोधा (उदा. त्र्यंबकेश्वर, सुला, काळाराम, मिसळ)...',
    noSpotsFound: 'शोधाशी जुळणारे कोणतेही स्थळ सापडले नाही.',
    btnViewSpotGuide: 'संपूर्ण माहिती व दर्शन गाइड',
    modalDarshan: '⏰ दर्शन वेळ:',
    modalDistance: '📍 अंतर व रस्ता:',
    modalDress: '👔 वेशभूषा नियम:',
    modalEntry: '🎟️ प्रवेश व पास:',
    modalProTips: '💡 भाविकांसाठी महत्त्वाच्या टिप्स:',
    btnOpenMaps: 'गुगल मॅप्सवर पहा (Google Maps)',

    // Travel Section
    travelTag: 'वाहतूक व प्रवास',
    travelTitle: 'नाशिकला कसे पोहोचावे • संपूर्ण प्रवास मार्गदर्शक',
    travelSubtitle: 'समृद्धी महामार्ग, रेल्वे सेवा, विमानतळ आणि कुंभमेळ्यासाठी विशेष मोफत ई-बस शटल कॉरिडोअर.',
    tabFlight: '✈️ विमानाने (Flight)',
    tabTrain: '🚆 रेल्वेने (Train)',
    tabRoad: '🚗 महामार्ग व रस्ता',
    tabShuttle: '🚌 मोफत कुंभ ई-बस',
    calcTitle: 'प्रवास अंतर व मार्ग गणक (Route Calculator)',
    calcSubtitle: 'आपले शहर निवडून प्रवासाचे तास, सर्वोत्तम महामार्ग आणि रेल्वे गाड्यांची माहिती मिळवा.',
    calcOriginLabel: 'प्रारंभ शहर निवडा (Origin City)',
    calcDestLabel: 'गंतव्य स्थान:',
    calcDistLabel: 'रस्ता अंतर:',
    calcDurationLabel: 'अंदाजे वेळ:',
    calcRouteLabel: 'सर्वोत्तम महामार्ग:',
    calcTrainsLabel: 'प्रमुख रेल्वे गाड्या:',
    calcTollLabel: 'अंदाजे टोल दर:',
    strip1H4: 'सॅटेलाइट पार्किंग हब',
    strip1P: 'शहराबाहेर सुरक्षित, सीसीटीव्हीयुक्त अवाढव्य पार्किंग तळ, विश्रामगृहे आणि स्वच्छ प्रसाधनगृहे.',
    strip2H4: 'मोफत वातानुकूलित ई-बसेस',
    strip2P: 'पार्किंगवरून रामकुंड आणि तपोवन प्रवेशद्वारापर्यंत २४ तास मोफत धावणाऱ्या पर्यावरणपूरक बसेस.',
    strip3H4: 'पादचारी घाट कॉरिडोअर',
    strip3P: 'सावलीयुक्त मार्ग, शुद्ध थंड पिण्याच्या पाण्याचे बूथ आणि दर ३०० मीटरवर आपत्कालीन प्रथमोपचार केंद्र.',

    // Amenities Section
    amenitiesTag: 'भाविक सेवा',
    amenitiesTitle: 'भाविक सुविधा आणि आपत्कालीन कक्ष',
    amenitiesSubtitle: '२४ तास वैद्यकीय सेवा, मोफत अन्नछत्रे, घाट सुरक्षा आणि हरवलेल्या व्यक्तींसाठी आधुनिक मदत केंद्र.',
    amenity1H3: '२४ तास फिरते रुग्णालय',
    amenity1P: 'अतिदक्षता कार्डियाक रुग्णवाहिका, मोफत आयसीयू बेड्स आणि तज्ज्ञ डॉक्टरांचे पथक २४ तास तत्पर.',
    amenity2H3: 'महा अन्नछत्र (प्रसाद भोजन)',
    amenity2P: 'विविध धार्मिक संस्था आणि आखाड्यांमार्फत सर्व भाविकांना शुद्ध सात्विक महाप्रसाद मोफत दिला जातो.',
    amenity3H3: 'गोताखोर व घाट सुरक्षा पथक',
    amenity3P: 'जल सुरक्षेसाठी प्रशिक्षित जीवरक्षक, मोटर बोट, सुरक्षा जाळ्या आणि लाइफ जॅकेट्स तैनात.',
    amenity4H3: 'हरवले-सापडले बहुभाषिक कक्ष',
    amenity4P: 'कुटुंबापासून दुरावलेल्या व्यक्तींचा शोध घेण्यासाठी एआय फेशियल रेकग्निशन आणि आधुनिक कंट्रोल रूम.',
    emergencyH3: '🚨 २४/७ भाविक आपत्कालीन हेल्पलाइन क्रमांक',
    emergencyP: 'पोलीस मदत, रुग्णवाहिका, अग्निशामक आणि कुंभमेळा प्रशासन कक्ष. टोल-फ्री आणि मराठी, हिंदी व इंग्रजीत उपलब्ध.',
    btnHelpKumbh: 'कुंभ हेल्पलाइन: १०७७',
    btnHelpPolice: 'पोलीस मदत: ११२',
    btnHelpAmbulance: 'रुग्णवाहिका: १०८',

    // Footer
    footerBrandDesc: 'नाशिक आणि त्र्यंबकेश्वर सिंहस्थ कुंभमेळा — गोदावरी मातेच्या पावन तीरावरील श्रद्धा, संस्कृती आणि मोक्षाचा चिरंतन उत्सव.',
    footerChant: '🕉️ "हर हर गंगे • जय गोदावरी माता"',
    footerH5Exploration: 'जलद नेव्हिगेशन',
    footerH5Transit: 'प्रवास व साहाय्य',
    footerBottomCopy: '© २०२६–२०२७ नाशिक सिंहस्थ कुंभमेळा व पर्यटन महाद्वार. अत्यंत भक्तिभावाने व तंत्रकुशलतेने साकारले.',
    footerBottomTag: 'नाशिक • त्र्यंबकेश्वर • पंचवटी • दक्षिण गंगा गोदावरी',

    // Toast
    toastActionChange: 'बदला'
  },

  hi: {
    brandTitle: 'नासिक सिंहस्थ',
    brandSub: 'महाकुंभमेला एवं पर्यटन गाइड',
    navDates: '📅 शाही स्नान तिथियां',
    navDiya: '🪔 गोदावरी दीपदान',
    navSpots: '📍 दर्शनीय स्थल',
    navTravel: '🚆 यात्रा गाइड',
    navAmenities: '🚨 तीर्थयात्री हेल्पलाइन',
    audioLabel: 'मंदिर की घंटी',
    audioLabelPlaying: 'ध्वनि सक्रिय (म्यूट)',

    // Intent Selector
    intentKumbh: '🕉️ सिंहस्थ कुंभमेला 2027',
    intentTourism: '🍇 नासिक पर्यटन एवं वाइन सिटी',

    // Hero
    heroBadge: 'नासिक-त्र्यंबकेश्वर • सिंहस्थ महाकुंभ 2027',
    heroMarathiTitle: 'सिंहस्थ कुंभमेळा नाशिक-त्र्यंबकेश्वर',
    heroTitleMain: 'धर्म, आस्था और मोक्ष का पावन महासंगम',
    heroSubtitle: 'दक्षिण गंगा मां गोदावरी के पवित्र तट पर आस्था और मुक्ति का विश्वप्रसिद्ध अलौकिक महापर्व। नासिक एवं त्र्यंबकेश्वर यात्रा की संपूर्ण प्रामाणिक मार्गदर्शिका।',
    sanskritVerse: '"गंगा द्वारे कुशावर्ते बिल्वके नीले पर्वते। स्नात्वा च अश्वमेधस्य फलं प्राप्नोति मानवः॥"',
    countdownLabel: '⏳ प्रथम शाही स्नान हेतु शेष समय',
    countdownTarget: 'श्रावण पूर्णिमा • 17 अगस्त 2027',
    unitDays: 'दिन',
    unitHours: 'घंटे',
    unitMins: 'मिनट',
    unitSecs: 'सेकंड',
    btnHeroDates: 'शाही स्नान तिथियां देखें',
    btnHeroDiya: 'गोदावरी में दीपदान करें',
    btnHeroTravel: 'यात्रा की योजना बनाएं',
    stat1Val: '13 अखाड़े',
    stat1Desc: 'शैव, वैष्णव एवं उदासीन संप्रदाय',
    stat2Val: '12 वर्ष',
    stat2Desc: 'सिंह राशि में गुरु का दिव्य खगोलीय योग',
    stat3Val: '3 करोड़+',
    stat3Desc: 'अपेक्षित श्रद्धालु एवं संत-महात्मा',
    stat4Val: '2 पावन तीर्थ',
    stat4Desc: 'रामकुंड (नासिक) एवं कुशावर्त (त्र्यंबकेश्वर)',

    // Dates Section
    datesTag: 'शुभ पर्वणी पंचांग',
    datesTitle: 'शाही स्नान एवं पावन पर्वणी दिनदर्शिका',
    datesSubtitle: 'पवित्र गोदावरी तट पर अमृत स्नान मुहूर्त, अखाड़ों के शाही जुलूस का समय और शुभ खगोलीय योग।',
    filterAllDates: 'सभी पावन तिथियां',
    filterShahiDates: '👑 शाही स्नान पर्वणी',
    filterRamkundDates: '📍 रामकुंड (नासिक)',
    filterKushavartaDates: '⛰️ कुशावर्त (त्र्यंबकेश्वर)',
    filterRitualsDates: '🚩 ध्वजारोहण एवं धार्मिक अनुष्ठान',
    dateSearchPlaceholder: '🔍 स्नान, तिथि या घाट खोजें...',
    noDatesFound: 'आपकी खोज के अनुसार कोई तिथि नहीं मिली।',
    labelMuhurat: '⏰ अमृत स्नान मुहूर्त:',
    labelRituals: '🕉️ पावन अनुष्ठान:',
    labelCrowd: '👥 श्रद्धालु भीड़ अनुमान:',
    btnGoogleCal: 'गूगल कैलेंडर',
    btnIcsCal: 'iCal में जोड़ें (.ics)',

    // Diya Section
    diyaTag: 'साक्षात भक्ति अनुभव',
    diyaTitle: 'गोदावरी दीपदान • पावन वर्चुअल दीप अर्पण',
    diyaSubtitle: 'मां गोदावरी की पावन तरंगों पर अपने नाम और संकल्प के साथ दीप अर्पित करें और देश-विदेश के लाखों श्रद्धालुओं के साथ पुण्य के भागी बनें।',
    diyaFormH3: 'भक्तिभाव से दीपदान करें',
    diyaFormDesc: 'अपना प्रिय दीप चुनें, अपना नाम व गोत्र लिखें, पवित्र संकल्प चुनें और मां गोदावरी में दीप प्रवाहित करें।',
    diyaLabel1: '1. दीप का प्रकार चुनें (Choose Diya)',
    diyaBrass: 'पंचधातु पीतल दीप',
    diyaLotus: 'कमल पुष्प दीप',
    diyaMarigold: 'गेंदा पत्ता दीप',
    diyaLabel2: '2. श्रद्धालु का नाम / कुल गोत्र',
    diyaPlaceholderName: 'उदा. रमेश शर्मा एवं सपरिवार',
    diyaLabel3: '3. पावन संकल्प / मनोकामना',
    wish1: 'परिवार के लिए सुख, शांति एवं आरोग्य (सुख-शांति)',
    wish2: 'पापमुक्ति एवं आध्यात्मिक मोक्ष प्राप्ति (मोक्ष प्राप्ति)',
    wish3: 'कार्यसिद्धि, विद्या एवं समृद्धि (यश व समृद्धि)',
    wish4: 'विश्व शांति एवं प्राणिमात्र का कल्याण (विश्वशांति)',
    btnSubmitDiya: 'अर्पण करा • Offer to Sacred Godavari',
    btnDiyaSuccess: '✓ मां गोदावरी में दीप श्रद्धापूर्वक अर्पित हुआ!',
    diyaStatsSuffix: '+ दीप इस समय पावन गोदावरी में ज्योतिर्मय बह रहे हैं',
    canvasGuide: '🌊 नदी पर कहीं भी क्लिक करके अपना मंगल दीप प्रवाहित करें',
    canvasBadge: '✨ दक्षिण गंगा पावन गोदावरी',

    // Spots Section
    spotsTag: 'नासिक दर्शन',
    spotsTitle: 'नासिक के दर्शनीय स्थल • तीर्थ एवं पर्यटन',
    spotsSubtitle: '10वां ज्योतिर्लिंग, रामायण कालीन पंचवटी, प्राचीन बौद्ध गुफाएं, हनुमान जी का जन्मस्थान और एशिया की प्रसिद्ध अंगूर वाटिकाएं।',
    filterAllSpots: 'सभी स्थल (All)',
    filterTemples: '🕉️ पावन मंदिर',
    filterHeritage: '⛰️ पौराणिक एवं ऐतिहासिक',
    filterVineyards: '🍇 अंगूर वाटिका एवं झीलें',
    filterCulinary: '🍲 प्रसिद्ध नासिकी मिसल',
    spotSearchPlaceholder: '🔍 स्थल खोजें (उदा. त्र्यंबकेश्वर, सुला, कालाराम, मिसल)...',
    noSpotsFound: 'खोज से मेल खाता कोई स्थल नहीं मिला।',
    btnViewSpotGuide: 'संपूर्ण तीर्थ विवरण एवं गाइड',
    modalDarshan: '⏰ दर्शन समय:',
    modalDistance: '📍 दूरी एवं मार्ग:',
    modalDress: '👔 वेशभूषा नियम:',
    modalEntry: '🎟️ प्रवेश एवं पास:',
    modalProTips: '💡 तीर्थयात्रियों हेतु विशेष सुझाव:',
    btnOpenMaps: 'गूगल मैप्स पर देखें (Google Maps)',

    // Travel Section
    travelTag: 'यातायात एवं मार्ग',
    travelTitle: 'नासिक कैसे पहुंचें • संपूर्ण यात्रा मार्गदर्शिका',
    travelSubtitle: 'समृद्धि महामार्ग, सीधी रेलगाड़ियां, नासिक एयरपोर्ट और कुंभमेला विशेष 24 घंटे निःशुल्क ई-बस शटल सेवा।',
    tabFlight: '✈️ हवाई मार्ग (Flight)',
    tabTrain: '🚆 रेल मार्ग (Train)',
    tabRoad: '🚗 सड़क एवं महामार्ग',
    tabShuttle: '🚌 निःशुल्क कुंभ ई-बस',
    calcTitle: 'यात्रा दूरी एवं मार्ग गणक (Route Calculator)',
    calcSubtitle: 'अपने शहर का चयन करें और यात्रा समय, सर्वश्रेष्ठ हाईवे तथा ट्रेनों की जानकारी तुरंत पाएं।',
    calcOriginLabel: 'प्रारंभिक शहर चुनें (Origin City)',
    calcDestLabel: 'गंतव्य स्थल:',
    calcDistLabel: 'सड़क दूरी:',
    calcDurationLabel: 'अनुमानित समय:',
    calcRouteLabel: 'सर्वोत्तम महामार्ग:',
    calcTrainsLabel: 'प्रमुख रेलगाड़ियां:',
    calcTollLabel: 'अनुमानित टोल शुल्क:',
    strip1H4: 'सैटेलाइट पार्किंग हब',
    strip1P: 'शहर के बाहर सीसीटीवी युक्त विशाल सुरक्षित पार्किंग स्थल, विश्राम गृह एवं स्वच्छ शौचालय।',
    strip2H4: 'निःशुल्क एसी ई-बसें',
    strip2P: 'पार्किंग से सीधे रामकुंड एवं तपोवन प्रवेश द्वार तक 24 घंटे चलने वाली प्रदूषण-मुक्त बसें।',
    strip3H4: 'छायादार पैदल घाट कॉरिडोर',
    strip3P: 'शीतल पेयजल बूथ, छायादार मार्ग और प्रत्येक 300 मीटर पर आपातकालीन चिकित्सा सहायता केंद्र।',

    // Amenities Section
    amenitiesTag: 'श्रद्धालु सहायता',
    amenitiesTitle: 'तीर्थयात्री सुविधाएं एवं आपातकालीन सहायता केंद्र',
    amenitiesSubtitle: '24 घंटे चिकित्सालय, निःशुल्क महा अन्नक्षेत्र, घाट जल सुरक्षा और खोया-पाया आधुनिक बहुभाषी केंद्र।',
    amenity1H3: '24x7 फील्ड चिकित्सालय',
    amenity1P: 'आधुनिक कार्डियक एम्बुलेंस, आईसीयू ट्रॉमा बेड और विशेषज्ञ डॉक्टरों की टीम 24 घंटे तैनात।',
    amenity2H3: 'महा अन्नक्षेत्र (निःशुल्क भोजन)',
    amenity2P: 'विभिन्न धार्मिक ट्रस्टों और अखाड़ों द्वारा सभी श्रद्धालुओं को शुद्ध सात्विक भोजन व नाश्ता निःशुल्क।',
    amenity3H3: 'घाट गोताखोर व जल सुरक्षा दल',
    amenity3P: 'घाटों पर प्रशिक्षित गोताखोर, मोटर बचाव नौकाएं, सुरक्षा जालियां एवं लाइफ जैकेट की पुख्ता व्यवस्था।',
    amenity4H3: 'खोया-पाया बहुभाषी केंद्र',
    amenity4P: 'बिछड़े परिजनों को मिलाने के लिए एआई चेहरा पहचान प्रणाली और कंप्यूटरीकृत सहायता केंद्र।',
    emergencyH3: '🚨 24/7 तीर्थयात्री आपातकालीन हेल्पलाइन नंबर',
    emergencyP: 'पुलिस सहायता, एम्बुलेंस, अग्निशमन और कुंभमेला प्रशासन कक्ष। टोल-फ्री और हिंदी, मराठी व अंग्रेजी में उपलब्ध।',
    btnHelpKumbh: 'कुंभ हेल्पलाइन: 1077',
    btnHelpPolice: 'पुलिस हेल्पलाइन: 112',
    btnHelpAmbulance: 'एम्बुलेंस: 108',

    // Footer
    footerBrandDesc: 'नासिक एवं त्र्यंबकेश्वर सिंहस्थ महाकुंभ — मां गोदावरी के पवित्र तट पर आस्था, शुचिता और मुक्ति का शाश्वत उत्सव।',
    footerChant: '🕉️ "हर हर गंगे • जय गोदावरी माता"',
    footerH5Exploration: 'शीघ्र नेविगेशन',
    footerH5Transit: 'यातायात एवं सहायता',
    footerBottomCopy: '© 2026–2027 नासिक सिंहस्थ कुंभमेला एवं पर्यटन पोर्टल। श्रद्धा एवं तकनीकी उत्कृष्टता से निर्मित।',
    footerBottomTag: 'नासिक • त्र्यंबकेश्वर • पंचवटी • दक्षिण गंगा गोदावरी',

    // Toast
    toastActionChange: 'बदलें'
  }
};

function initLanguageEngine() {
  const enBtn = document.getElementById('langEn');
  const mrBtn = document.getElementById('langMr');
  const hiBtn = document.getElementById('langHi');

  if (enBtn) enBtn.addEventListener('click', () => switchLanguage('en', true));
  if (mrBtn) mrBtn.addEventListener('click', () => switchLanguage('mr', true));
  if (hiBtn) hiBtn.addEventListener('click', () => switchLanguage('hi', true));

  // Determine language priority:
  // 1. Manually saved language in LocalStorage
  const savedLang = localStorage.getItem('kumbh_lang');
  if (savedLang && (savedLang === 'en' || savedLang === 'mr' || savedLang === 'hi')) {
    switchLanguage(savedLang, false);
  } else {
    // 2. Default to Marathi first as Maharashtra portal, then track location asynchronously
    switchLanguage('mr', false);
    detectLocationAndLanguage();
  }
}

/**
 * Geolocation & IP Location Tracking to automatically pick among (mr, hi, en)
 */
async function detectLocationAndLanguage() {
  // If user already explicitly set their language, do not override
  if (localStorage.getItem('kumbh_lang')) return;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2600);

    const response = await fetch('https://ipwho.is/?fields=success,country,country_code,region,city', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) throw new Error('Geo API non-ok');
    const data = await response.json();

    if (data && data.success) {
      const region = (data.region || '').toLowerCase();
      const city = (data.city || '').toLowerCase();
      const countryCode = (data.country_code || '').toUpperCase();

      let detectedLang = 'en';
      let toastMsg = '';

      // Check Maharashtra -> Marathi
      const isMaha = region.includes('maharashtra') || 
        ['mumbai', 'pune', 'nashik', 'nagpur', 'thane', 'chhatrapati sambhajinagar', 'aurangabad', 'solapur', 'kolhapur'].some(c => city.includes(c));

      // Check Hindi Belt States
      const isHindiBelt = ['delhi', 'uttar pradesh', 'madhya pradesh', 'bihar', 'rajasthan', 'haryana', 'uttarakhand', 'jharkhand', 'chhattisgarh', 'himachal pradesh', 'chandigarh'].some(s => region.includes(s));

      if (isMaha) {
        detectedLang = 'mr';
        toastMsg = `📍 स्थान: महाराष्ट्र (${data.city || 'महाराष्ट्र'}) • मराठी भाषा निवडली गेली`;
      } else if (isHindiBelt) {
        detectedLang = 'hi';
        toastMsg = `📍 स्थान: ${data.region || 'उत्तर भारत'} • हिंदी भाषा चुनी गई`;
      } else if (countryCode === 'IN') {
        // Other Indian states: check navigator
        const nav = (navigator.language || '').toLowerCase();
        if (nav.startsWith('mr')) detectedLang = 'mr';
        else if (nav.startsWith('hi')) detectedLang = 'hi';
        else detectedLang = 'en';
        toastMsg = `📍 Location: ${data.region || 'India'} • ${detectedLang.toUpperCase()} selected`;
      } else {
        detectedLang = 'en';
        toastMsg = `📍 Location: ${data.country || 'Global'} • English selected`;
      }

      // Apply detected language
      switchLanguage(detectedLang, false);
      showGeoToast(toastMsg, detectedLang);
    }
  } catch (err) {
    // Fallback to browser language
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('mr')) switchLanguage('mr', false);
    else if (nav.startsWith('hi')) switchLanguage('hi', false);
    else switchLanguage('en', false);
  }
}

function showGeoToast(message, activeLang) {
  const toast = document.getElementById('geoLangToast');
  const toastText = document.getElementById('geoToastText');
  const toastAction = document.getElementById('geoToastAction');
  const toastClose = document.getElementById('geoToastClose');

  if (!toast || !toastText) return;

  toastText.textContent = message;
  if (toastAction) {
    toastAction.textContent = activeLang === 'mr' ? 'बदला (Change)' : (activeLang === 'hi' ? 'बदलें (Change)' : 'Change');
    toastAction.onclick = () => {
      // Rotate language
      const nextLang = activeLang === 'mr' ? 'hi' : (activeLang === 'hi' ? 'en' : 'mr');
      switchLanguage(nextLang, true);
      toast.style.display = 'none';
    };
  }

  if (toastClose) {
    toastClose.onclick = () => {
      toast.style.display = 'none';
    };
  }

  toast.style.display = 'flex';
  setTimeout(() => {
    if (toast) toast.style.display = 'none';
  }, 6500);
}

function switchLanguage(lang, userExplicit = false) {
  if (userExplicit) {
    try {
      localStorage.setItem('kumbh_lang', lang);
    } catch (e) {}
  }

  currentLang = lang;
  document.documentElement.lang = lang;

  // Update active pill state
  ['langEn', 'langMr', 'langHi'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const isTarget = (id === 'langEn' && lang === 'en') ||
                     (id === 'langMr' && lang === 'mr') ||
                     (id === 'langHi' && lang === 'hi');
    el.classList.toggle('active', isTarget);
    el.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // 1. Static Text Elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });

  // 2. Specific Nav & Header Elements
  safeText('brandTitleSpan', t.brandTitle);
  safeText('brandSubSpan', t.brandSub);
  safeText('navDatesLink', t.navDates);
  safeText('navDiyaLink', t.navDiya);
  safeText('navSpotsLink', t.navSpots);
  safeText('navTravelLink', t.navTravel);
  safeText('navAmenitiesLink', t.navAmenities);

  // Audio button text
  const audioLabel = document.querySelector('.btn-audio-toggle .audio-label');
  if (audioLabel) {
    const isPlaying = window.sacredAudio && window.sacredAudio.isPlayingAmbient;
    audioLabel.textContent = isPlaying ? t.audioLabelPlaying : t.audioLabel;
  }

  // Hero Section
  safeText('heroBadgeText', t.heroBadge);
  const heroMain = document.getElementById('heroTitleMain');
  if (heroMain) heroMain.innerHTML = `<span class="gold-gradient-text">${t.heroTitleMain}</span>`;
  safeText('heroSubtitleText', t.heroSubtitle);
  safeText('sanskritVerseSpan', t.sanskritVerse);
  safeText('countdownLabelSpan', t.countdownLabel);
  safeText('countdownTargetSpan', t.countdownTarget);

  safeText('lblDays', t.unitDays);
  safeText('lblHours', t.unitHours);
  safeText('lblMins', t.unitMins);
  safeText('lblSecs', t.unitSecs);

  safeText('heroDatesBtnText', t.btnHeroDates);
  safeText('heroDiyaBtnText', t.btnHeroDiya);
  safeText('heroTravelBtnText', t.btnHeroTravel);

  // Search input placeholders
  const dateInput = document.getElementById('dateSearchInput');
  if (dateInput) dateInput.placeholder = t.dateSearchPlaceholder;
  const spotInput = document.getElementById('spotSearchInput');
  if (spotInput) spotInput.placeholder = t.spotSearchPlaceholder;

  // Diya Form labels and options
  safeText('diyaFormH3', t.diyaFormH3);
  safeText('diyaFormDesc', t.diyaFormDesc);
  safeText('diyaLabel1', t.diyaLabel1);
  safeText('diyaBrassTitle', t.diyaBrass);
  safeText('diyaLotusTitle', t.diyaLotus);
  safeText('diyaMarigoldTitle', t.diyaMarigold);
  safeText('diyaLabel2', t.diyaLabel2);
  const devoteeInput = document.getElementById('devoteeName');
  if (devoteeInput) devoteeInput.placeholder = t.diyaPlaceholderName;
  safeText('diyaLabel3', t.diyaLabel3);
  safeText('wishOpt1', t.wish1);
  safeText('wishOpt2', t.wish2);
  safeText('wishOpt3', t.wish3);
  safeText('wishOpt4', t.wish4);
  safeText('floatDiyaBtnText', t.btnSubmitDiya);
  safeText('canvasGuideText', t.canvasGuide);
  safeText('canvasBadgeText', t.canvasBadge);

  // Re-render Dynamic Grids in the new language
  renderDates(currentDateFilter);
  renderSpots(currentSpotFilter);

  // Update Transit city calculator display
  const citySelect = document.getElementById('transitCitySelect');
  if (citySelect) {
    updateCityStats(citySelect.value);
  }
}

function safeText(elementId, text) {
  const el = document.getElementById(elementId);
  if (el && text !== undefined) {
    el.textContent = text;
  }
}

/* ==========================================================================
   3. COUNTDOWN TIMER
   ========================================================================== */
function initCountdownTimer() {
  const targetDate = new Date('2027-08-17T04:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      safeText('daysVal', '00');
      safeText('hoursVal', '00');
      safeText('minsVal', '00');
      safeText('secsVal', '00');
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => n < 10 ? '0' + n : n;

    safeText('daysVal', days);
    safeText('hoursVal', pad(hours));
    safeText('minsVal', pad(mins));
    safeText('secsVal', pad(secs));
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   4. SHAHI SNAN DATES RENDERING & SEARCH
   ========================================================================== */
function renderDates(filter = 'all') {
  currentDateFilter = filter;
  const container = document.getElementById('datesGrid');
  if (!container || !window.SHAHI_SNAN_DATES) return;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const query = dateSearchQuery.toLowerCase().trim();

  const filtered = window.SHAHI_SNAN_DATES.filter(item => {
    // 1. Tab category filter
    let matchCategory = true;
    if (filter === 'shahi') matchCategory = (item.category === 'shahi');
    else if (filter === 'ramkund') matchCategory = (item.locationType === 'ramkund' || item.locationType === 'both');
    else if (filter === 'kushavarta') matchCategory = (item.locationType === 'kushavarta' || item.locationType === 'both');
    else if (filter === 'rituals') matchCategory = (item.category === 'rituals');

    if (!matchCategory) return false;

    // 2. Search query filter
    if (!query) return true;
    const title = (item.title + ' ' + (item.titleMr || '') + ' ' + (item.titleHi || '')).toLowerCase();
    const desc = (item.desc + ' ' + (item.descMr || '') + ' ' + (item.descHi || '')).toLowerCase();
    const loc = (item.location + ' ' + (item.locationMr || '') + ' ' + (item.locationHi || '')).toLowerCase();
    const tithi = (item.tithi + ' ' + (item.tithiMr || '') + ' ' + (item.tithiHi || '')).toLowerCase();

    return title.includes(query) || desc.includes(query) || loc.includes(query) || tithi.includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-search-state">
        <span class="empty-icon">🔍</span>
        <p>${t.noDatesFound}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const title = currentLang === 'mr' ? item.titleMr : (currentLang === 'hi' ? item.titleHi : item.title);
    const desc = currentLang === 'mr' ? item.descMr : (currentLang === 'hi' ? item.descHi : item.desc);
    const month = currentLang === 'mr' ? (item.monthMr || item.month) : (currentLang === 'hi' ? (item.monthHi || item.month) : item.month);
    const tithi = currentLang === 'mr' ? (item.tithiMr || item.tithi) : (currentLang === 'hi' ? (item.tithiHi || item.tithi) : item.tithi);
    const location = currentLang === 'mr' ? (item.locationMr || item.location) : (currentLang === 'hi' ? (item.locationHi || item.location) : item.location);
    const tag = currentLang === 'mr' ? (item.tagMr || item.tag) : (currentLang === 'hi' ? (item.tagHi || item.tag) : item.tag);
    const densityText = currentLang === 'mr' ? (item.densityTextMr || item.densityText) : (currentLang === 'hi' ? (item.densityTextHi || item.densityText) : item.densityText);
    const muhurat = currentLang === 'mr' ? (item.muhuratMr || item.muhurat) : (currentLang === 'hi' ? (item.muhuratHi || item.muhurat) : item.muhurat);
    const holyRitual = currentLang === 'mr' ? (item.holyRitualMr || item.holyRitual) : (currentLang === 'hi' ? (item.holyRitualHi || item.holyRitual) : item.holyRitual);
    
    const googleCalUrl = window.getGoogleCalendarUrl ? window.getGoogleCalendarUrl(item.id, currentLang) : '#';

    return `
      <article class="date-card ${item.category === 'shahi' ? 'shahi-major' : ''}">
        <div class="card-top">
          <div class="event-date-badge">
            <div class="date-calendar-box">
              <span class="date-month">${month}</span>
              <span class="date-day">${item.day}</span>
              <span class="date-year">${item.year}</span>
            </div>
            <div class="event-meta">
              <span class="event-tithi">${tithi}</span>
              <span class="event-location-pill">📍 ${location}</span>
            </div>
          </div>
          <span class="card-tag ${item.tagClass}">${tag}</span>
        </div>

        <h3 class="event-title">${title}</h3>
        <p class="event-desc">${desc}</p>

        <ul class="event-details-list">
          <li class="event-detail-item">
            <span class="detail-label">${t.labelMuhurat}</span>
            <span class="detail-value">${muhurat}</span>
          </li>
          <li class="event-detail-item">
            <span class="detail-label">${t.labelRituals}</span>
            <span class="detail-value">${holyRitual}</span>
          </li>
          <li class="event-detail-item">
            <span class="detail-label">${t.labelCrowd}</span>
            <div class="crowd-density-meter density-${item.density}">
              <span class="density-dot"></span>
              <span class="detail-value">${densityText}</span>
            </div>
          </li>
        </ul>

        <div class="calendar-actions-row">
          <a href="${googleCalUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-action btn-google-cal" title="Add directly to Google Calendar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>${t.btnGoogleCal}</span>
          </a>

          <button class="btn-card-action btn-ics-cal" onclick="window.downloadIcsCalendar('${item.id}', '${currentLang}')" title="Download .ics Calendar file">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>${t.btnIcsCal}</span>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   5. SPOTS TO VISIT RENDERING & SEARCH
   ========================================================================== */
function renderSpots(filter = 'all') {
  currentSpotFilter = filter;
  const container = document.getElementById('spotsGrid');
  if (!container || !window.SPOTS_DATA) return;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const query = spotSearchQuery.toLowerCase().trim();

  const filtered = window.SPOTS_DATA.filter(spot => {
    // 1. Tab category filter
    if (filter !== 'all' && spot.category !== filter) return false;

    // 2. Search query filter
    if (!query) return true;
    const title = (spot.title + ' ' + (spot.titleMr || '') + ' ' + (spot.titleHi || '')).toLowerCase();
    const snippet = (spot.snippet + ' ' + (spot.snippetMr || '') + ' ' + (spot.snippetHi || '')).toLowerCase();
    const history = (spot.fullHistory + ' ' + (spot.fullHistoryMr || '') + ' ' + (spot.fullHistoryHi || '')).toLowerCase();

    return title.includes(query) || snippet.includes(query) || history.includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-search-state">
        <span class="empty-icon">🏛️</span>
        <p>${t.noSpotsFound}</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(spot => {
    const title = currentLang === 'mr' ? spot.titleMr : (currentLang === 'hi' ? spot.titleHi : spot.title);
    const subTitle = currentLang === 'mr' ? spot.title : spot.titleMr;
    const snippet = currentLang === 'mr' ? (spot.snippetMr || spot.snippet) : (currentLang === 'hi' ? (spot.snippetHi || spot.snippet) : spot.snippet);
    const timings = currentLang === 'mr' ? (spot.timingsMr || spot.timings) : (currentLang === 'hi' ? (spot.timingsHi || spot.timings) : spot.timings);
    const distance = currentLang === 'mr' ? (spot.distanceMr || spot.distance) : (currentLang === 'hi' ? (spot.distanceHi || spot.distance) : spot.distance);

    return `
      <article class="spot-card">
        <div class="spot-image-box">
          <img src="${spot.image}" alt="${title}" class="spot-img" loading="lazy">
          <span class="spot-category-badge">${spot.category}</span>
          <span class="spot-rating">${spot.rating}</span>
        </div>

        <div class="spot-content">
          <h3 class="spot-title">${title}</h3>
          <span class="spot-subtitle">${subTitle}</span>
          <p class="spot-snippet">${snippet}</p>

          <div class="spot-quick-tags">
            <span class="quick-tag">⏱️ ${timings.split('|')[0]}</span>
            <span class="quick-tag">🚗 ${distance.split('/')[0]}</span>
          </div>

          <button class="btn-spot-modal" onclick="openSpotModal('${spot.id}')">
            <span>${t.btnViewSpotGuide}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function initSearchAndFilters() {
  // Date Filters
  const dateFilterBtns = document.querySelectorAll('.date-filter-btn');
  dateFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dateFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDates(btn.getAttribute('data-filter'));
    });
  });

  // Date Search Input
  const dateSearchInput = document.getElementById('dateSearchInput');
  const clearDateSearch = document.getElementById('clearDateSearch');
  if (dateSearchInput) {
    dateSearchInput.addEventListener('input', (e) => {
      dateSearchQuery = e.target.value;
      if (clearDateSearch) clearDateSearch.style.display = dateSearchQuery ? 'block' : 'none';
      renderDates(currentDateFilter);
    });
  }
  if (clearDateSearch && dateSearchInput) {
    clearDateSearch.addEventListener('click', () => {
      dateSearchInput.value = '';
      dateSearchQuery = '';
      clearDateSearch.style.display = 'none';
      renderDates(currentDateFilter);
      dateSearchInput.focus();
    });
  }

  // Spot Filters
  const spotFilterBtns = document.querySelectorAll('.spot-filter-btn');
  spotFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      spotFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSpots(btn.getAttribute('data-filter'));
    });
  });

  // Spot Search Input
  const spotSearchInput = document.getElementById('spotSearchInput');
  const clearSpotSearch = document.getElementById('clearSpotSearch');
  if (spotSearchInput) {
    spotSearchInput.addEventListener('input', (e) => {
      spotSearchQuery = e.target.value;
      if (clearSpotSearch) clearSpotSearch.style.display = spotSearchQuery ? 'block' : 'none';
      renderSpots(currentSpotFilter);
    });
  }
  if (clearSpotSearch && spotSearchInput) {
    clearSpotSearch.addEventListener('click', () => {
      spotSearchInput.value = '';
      spotSearchQuery = '';
      clearSpotSearch.style.display = 'none';
      renderSpots(currentSpotFilter);
      spotSearchInput.focus();
    });
  }
}

/* ==========================================================================
   6. AUDIENCE INTENT SELECTOR (Kumbh vs. Tourism)
   ========================================================================== */
function initAudienceIntent() {
  const kumbhBtn = document.getElementById('intentKumbhBtn');
  const tourismBtn = document.getElementById('intentTourismBtn');

  if (kumbhBtn) {
    kumbhBtn.addEventListener('click', () => {
      kumbhBtn.classList.add('active');
      if (tourismBtn) tourismBtn.classList.remove('active');
      const datesEl = document.getElementById('dates');
      if (datesEl) datesEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (tourismBtn) {
    tourismBtn.addEventListener('click', () => {
      tourismBtn.classList.add('active');
      if (kumbhBtn) kumbhBtn.classList.remove('active');
      const spotsEl = document.getElementById('spots');
      if (spotsEl) spotsEl.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   7. SPOT MODAL DIALOG WITH KEYBOARD TRAP
   ========================================================================== */
window.openSpotModal = function(spotId) {
  const spot = window.SPOTS_DATA.find(s => s.id === spotId);
  if (!spot) return;

  const modal = document.getElementById('spotDetailsModal');
  const body = document.getElementById('modalDynamicContent');
  if (!modal || !body) return;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const title = currentLang === 'mr' ? spot.titleMr : (currentLang === 'hi' ? spot.titleHi : spot.title);
  const titleAlt = currentLang === 'mr' ? spot.title : spot.titleMr;
  const history = currentLang === 'mr' ? (spot.fullHistoryMr || spot.fullHistory) : (currentLang === 'hi' ? (spot.fullHistoryHi || spot.fullHistory) : spot.fullHistory);
  const timings = currentLang === 'mr' ? (spot.timingsMr || spot.timings) : (currentLang === 'hi' ? (spot.timingsHi || spot.timings) : spot.timings);
  const distance = currentLang === 'mr' ? (spot.distanceMr || spot.distance) : (currentLang === 'hi' ? (spot.distanceHi || spot.distance) : spot.distance);
  const dressCode = currentLang === 'mr' ? (spot.dressCodeMr || spot.dressCode) : (currentLang === 'hi' ? (spot.dressCodeHi || spot.dressCode) : spot.dressCode);
  const entryFee = currentLang === 'mr' ? (spot.entryFeeMr || spot.entryFee) : (currentLang === 'hi' ? (spot.entryFeeHi || spot.entryFee) : spot.entryFee);
  const tips = currentLang === 'mr' ? (spot.tipsMr || spot.tips) : (currentLang === 'hi' ? (spot.tipsHi || spot.tips) : spot.tips);

  body.innerHTML = `
    <div class="modal-header-img-box">
      <img src="${spot.image}" alt="${title}" class="modal-header-img">
    </div>

    <div class="modal-body">
      <h2 class="modal-title">${title}</h2>
      <div class="modal-marathi-title">${titleAlt}</div>
      <p style="font-size: 1.02rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">
        ${history}
      </p>

      <div style="background: rgba(8, 14, 27, 0.7); border: 1px solid var(--border-gold-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.25rem;">
          <span style="color: var(--text-muted);">${t.modalDarshan}</span>
          <strong style="color: #fff;">${timings}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.25rem;">
          <span style="color: var(--text-muted);">${t.modalDistance}</span>
          <strong style="color: var(--gold-300);">${distance}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.25rem;">
          <span style="color: var(--text-muted);">${t.modalDress}</span>
          <strong style="color: #fff;">${dressCode}</strong>
        </div>
        <div style="font-size: 0.88rem; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.25rem;">
          <span style="color: var(--text-muted);">${t.modalEntry}</span>
          <strong style="color: var(--river-glow);">${entryFee}</strong>
        </div>
      </div>

      <h4 class="modal-section-h4">${t.modalProTips}</h4>
      <ul class="modal-pro-tips-list">
        ${tips.map(tip => `<li>${tip}</li>`).join('')}
      </ul>

      <div class="modal-footer-actions">
        <a href="${spot.mapLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="flex: 1; justify-content: center;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${t.btnOpenMaps}</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Focus modal close button for accessibility
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.focus();
};

function initModals() {
  const modal = document.getElementById('spotDetailsModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. VIRTUAL DIYA ARPAN FORM
   ========================================================================== */
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

      const name = nameInput.value.trim() || (currentLang === 'mr' ? 'श्रद्धाळू भाविक' : (currentLang === 'hi' ? 'श्रद्धालु भक्त' : 'Devoted Pilgrim'));
      const wish = wishSelect.value;

      if (window.diyaSim) {
        window.diyaSim.addDevoteeDiya(name, wish, selectedType);
      }

      // Visual feedback
      const submitBtn = document.getElementById('floatDiyaBtn');
      const originalText = submitBtn.innerHTML;
      const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      submitBtn.innerHTML = `<span>${t.btnDiyaSuccess}</span>`;
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        nameInput.value = '';
      }, 3000);
    });
  }
}

/* ==========================================================================
   9. TRANSIT ESTIMATOR
   ========================================================================== */
function initTransitEstimator() {
  const citySelect = document.getElementById('transitCitySelect');
  const transitTabs = document.querySelectorAll('.transit-tab-btn');
  const transitPanels = document.querySelectorAll('.transit-content-panel');

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

  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      updateCityStats(e.target.value);
    });
    updateCityStats('mumbai');
  }
}

function updateCityStats(cityKey) {
  if (!window.TRANSIT_CITIES) return;
  const data = window.TRANSIT_CITIES[cityKey];
  if (!data) return;

  const cityName = currentLang === 'mr' ? (data.nameMr || data.name) : (currentLang === 'hi' ? (data.nameHi || data.name) : data.name);
  const duration = currentLang === 'mr' ? (data.durationMr || data.duration) : (currentLang === 'hi' ? (data.durationHi || data.duration) : data.duration);
  const route = currentLang === 'mr' ? (data.routeMr || data.route) : (currentLang === 'hi' ? (data.routeHi || data.route) : data.route);
  const trains = currentLang === 'mr' ? (data.trainsMr || data.trains) : (currentLang === 'hi' ? (data.trainsHi || data.trains) : data.trains);

  safeText('calcCityName', cityName);
  safeText('calcDistance', data.distance);
  safeText('calcDuration', duration);
  safeText('calcRoute', route);
  safeText('calcTrains', trains);
  safeText('calcToll', data.tollEst);
}

/* ==========================================================================
   10. AUDIO SYNTHESIZER CONTROLS
   ========================================================================== */
function initAudioControls() {
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn && window.sacredAudio) {
    audioBtn.addEventListener('click', () => {
      const isPlaying = window.sacredAudio.toggleAmbient(audioBtn);
      const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
      const label = audioBtn.querySelector('.audio-label');
      if (label) {
        label.textContent = isPlaying ? t.audioLabelPlaying : t.audioLabel;
      }
    });
  }
}

/* ==========================================================================
   11. NAVIGATION & POLISHED MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('is-open');
      if (isOpen) {
        navLinks.classList.remove('is-open');
        mobileBtn.classList.remove('is-active');
        mobileBtn.setAttribute('aria-expanded', 'false');
      } else {
        navLinks.classList.add('is-open');
        mobileBtn.classList.add('is-active');
        mobileBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close on navigation link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navLinks.classList.remove('is-open');
          mobileBtn.classList.remove('is-active');
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992 && navLinks.classList.contains('is-open')) {
        if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
          navLinks.classList.remove('is-open');
          mobileBtn.classList.remove('is-active');
          mobileBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
}