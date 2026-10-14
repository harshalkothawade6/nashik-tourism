/**
 * Sacred Nashik Kumbh Mela - Planner, Dates, Spots & Transit Data Engine
 */

const SHAHI_SNAN_DATES = [
  {
    id: 'snan-dhwaja',
    category: 'rituals',
    title: 'Dhwajarohan (सिंहस्थ ध्वजारोहण)',
    titleMr: 'सिंहस्थ कुंभमेळा ध्वजारोहण',
    month: 'JUL',
    day: '14',
    year: '2027',
    fullDate: '2027-07-14T06:30:00',
    tithi: 'Ashadha Shukla Ekadashi (आषाढी एकादशी)',
    location: 'Ramkund (Nashik) & Kushavarta (Trimbakeshwar)',
    locationType: 'both',
    tag: 'Flag Hoisting',
    tagClass: 'tag-parvani',
    density: 'high',
    densityText: 'High Footfall Expected',
    desc: 'The official ceremonial commencement of the holy Simhastha Kumbh Mela. Sacred flags of all 13 Akharas, Mahants, and Sadhus are consecrated and hoisted amidst Vedic chanting and conch resonance.',
    muhurat: '06:15 AM - 08:45 AM',
    holyRitual: 'Dhwaja Pujan, Sankalpa, Ganga Aradhana'
  },
  {
    id: 'snan-first',
    category: 'shahi',
    title: 'First Shahi Snan (प्रथम शाही स्नान)',
    titleMr: 'प्रथम शाही स्नान (श्रावण पौर्णिमा)',
    month: 'AUG',
    day: '17',
    year: '2027',
    fullDate: '2027-08-17T04:00:00',
    tithi: 'Shravan Shuddha Purnima / Raksha Bandhan',
    location: 'Ramkund (Nashik) & Kushavarta (Trimbak)',
    locationType: 'both',
    tag: 'Royal Snan',
    tagClass: 'tag-shahi',
    density: 'extreme',
    densityText: 'Peak Footfall (Millions of Pilgrims)',
    desc: 'The glorious inaugural royal bath of Simhastha. Naga Babas, Mahamandaleshwars, and sadhus of the Shaiva and Vaishnava Akhadas march in magnificent royal processions with silver chariots and traditional weapons.',
    muhurat: 'Brahma Muhurat: 03:45 AM - 09:30 AM',
    holyRitual: 'Akhada Shahi Juloos followed by Devotees Holy Dip'
  },
  {
    id: 'snan-second',
    category: 'shahi',
    title: 'Maha Shahi Snan (महा शाही स्नान)',
    titleMr: 'महा शाही स्नान (भाद्रपद सोमवती अमावस्या)',
    month: 'SEP',
    day: '01',
    year: '2027',
    fullDate: '2027-09-01T03:30:00',
    tithi: 'Bhadrapada Krishna Amavasya (Somvati Amavasya)',
    location: 'Ramkund Ghat & Kushavarta Tirtha',
    locationType: 'both',
    tag: 'Grand Royal Snan',
    tagClass: 'tag-shahi',
    density: 'extreme',
    densityText: 'Maximum Crowd Density (Estimated 8-10M)',
    desc: 'The supreme spiritual pinnacle of the Nashik Kumbh Mela. Astrologically considered the most potent planetary alignment when Jupiter is in Leo (Simha Rashi) and Sun in Leo. Millions submerge in Godavari for moksha.',
    muhurat: '03:15 AM - 12:00 PM (Auspicious all day)',
    holyRitual: 'Mahasnana, Pitru Tarpan, Maha Kumbh Aarti'
  },
  {
    id: 'snan-third',
    category: 'shahi',
    title: 'Third Shahi Snan (तृतीय शाही स्नान)',
    titleMr: 'तृतीय शाही स्नान (वामन द्वादशी)',
    month: 'SEP',
    day: '13',
    year: '2027',
    fullDate: '2027-09-13T04:30:00',
    tithi: 'Bhadrapada Shukla Dwadashi (Vaman Dwadashi)',
    location: 'Ramkund & Godavari Snan Ghats',
    locationType: 'ramkund',
    tag: 'Royal Snan',
    tagClass: 'tag-shahi',
    density: 'high',
    densityText: 'High Footfall',
    desc: 'Dedicated holy bath commemorating Lord Vaman’s victory. Extensive participation by the three Vaishnava Bairagi Akhadas (Nirmohi, Digambar, Nirvani) along the sacred Godavari pilgrim corridors.',
    muhurat: '04:30 AM - 10:15 AM',
    holyRitual: 'Vaishnava Akhada Royal Procession & Snan'
  },
  {
    id: 'snan-kushavarta',
    category: 'kushavarta',
    title: 'Trimbakeshwar Akhada Parvani (कुशावर्त पर्वणी)',
    titleMr: 'कुशावर्त तीर्थ त्र्यंबकेश्वर विशेष पर्वणी',
    month: 'SEP',
    day: '29',
    year: '2027',
    fullDate: '2027-09-29T05:00:00',
    tithi: 'Bhadrapada Purnima (Anant Chaturdashi)',
    location: 'Kushavarta Kund, Trimbakeshwar',
    locationType: 'kushavarta',
    tag: 'Shaiva Parvani',
    tagClass: 'tag-parvani',
    density: 'high',
    densityText: 'High Footfall in Trimbak Valley',
    desc: 'The holy dip in Kushavarta Tirtha, the sacred tank where sage Gautama bound Ganga with Kusha grass. Sanyasis and Giri, Puri, Bharati Dashnami orders take precedence for the concluding royal bath.',
    muhurat: '05:00 AM - 11:30 AM',
    holyRitual: 'Kushavarta Jal Puja & Rudra Abhishek'
  },
  {
    id: 'snan-samapti',
    category: 'rituals',
    title: 'Simhastha Samapti (ध्वजावतरण व समाप्ती)',
    titleMr: 'कुंभमेळा ध्वजावतरण व सांगता विधी',
    month: 'NOV',
    day: '10',
    year: '2027',
    fullDate: '2027-11-10T08:00:00',
    tithi: 'Kartik Shukla Dwadashi (Tulsi Vivah)',
    location: 'Ramkund & Trimbakeshwar',
    locationType: 'both',
    tag: 'Holy Consecration',
    tagClass: 'tag-parvani',
    density: 'moderate',
    densityText: 'Moderate Footfall',
    desc: 'The solemn flag-lowering (Dhwajavataran) and Maha Yajna concluding the 12-year Simhastha Kumbh Mela cycle with heartfelt thanksgiving prayers to Mother Godavari.',
    muhurat: '08:00 AM - 01:00 PM',
    holyRitual: 'Dhwajavataran, Maha Deepotsav, Sant Vidai'
  }
];

const SPOTS_DATA = [
  {
    id: 'trimbakeshwar',
    category: 'temples',
    title: 'Trimbakeshwar Jyotirlinga',
    titleMr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    image: 'assets/images/trimbakeshwar.jpg',
    rating: '4.9 ★',
    snippet: 'One of the 12 sacred Jyotirlingas in India. Unique 3-faced linga representing Brahma, Vishnu, and Maheshwar at the foothills of Brahmagiri.',
    fullHistory: 'Revered as the source of sacred River Godavari, the Trimbakeshwar temple was built in classical black basalt stone by Peshwa Balaji Baji Rao in 1755-1786. It holds immense significance during Kumbh Mela, where Shaiva Sadhus take their first royal holy bath at the nearby Kushavarta Kund.',
    timings: '5:30 AM – 9:00 PM (VIP Rudrabhishek 6:00 AM)',
    distance: '28 km from Nashik Central / 36 km from Nashik Road Railway Station',
    dressCode: 'Strict Traditional Indian (Dhoti/Kurta for inner sanctum abhishek, Saree/Salwar for women)',
    entryFee: 'Free General Darshan | Special Pass: ₹200 (Online Booking Recommended)',
    bestTime: 'Early morning during Kakad Aarti or evening for deep serenity',
    mapLink: 'https://maps.google.com/?q=Trimbakeshwar+Temple+Nashik',
    tips: [
      'Leather items, belts, and mobile phones are strictly prohibited inside sanctum.',
      'Visit Kushavarta Kund located just 400m from the temple for sacred holy pond darshan.',
      'Take the electric pilgrim shuttle from the Trimbak Bypass parking hub to avoid traffic.'
    ]
  },
  {
    id: 'ramkund',
    category: 'temples',
    title: 'Ramkund Ghat & Godavari Aarti',
    titleMr: 'रामकुंड व गोदावरी महाआरती',
    image: 'assets/images/ramkund_aarti.jpg',
    rating: '4.9 ★',
    snippet: 'The epicentre of Kumbh Mela in Nashik. Where Lord Rama took sacred baths and immersed the ashes of King Dasharatha.',
    fullHistory: 'Built by Chitrarao Khatarkar in 1696, Ramkund is considered the holiest water tank along the Godavari River. Asthi (bone ashes) immersed in its waters dissolve miraculously into calcium within minutes due to unique river minerals. Every evening, the Godavari Maha Aarti with blazing brass lamps rivals the spectacle of Haridwar and Varanasi.',
    timings: 'Open 24 Hours | Maha Aarti: 6:45 PM Daily',
    distance: '2 km from Nashik CBS Bus Stand / 8 km from Nashik Road Railway Station',
    dressCode: 'Modest respectful attire | Change rooms available along the ghat',
    entryFee: 'Free for all pilgrims',
    bestTime: 'Sunset (6:00 PM) to experience the evening brass lamp aarti & floating diyas',
    mapLink: 'https://maps.google.com/?q=Ramkund+Nashik',
    tips: [
      'Do not carry single-use plastic into the river ghat area.',
      'Participate in the evening Deepotsav by purchasing an organic marigold leaf diya from local vendors.',
      'Visit nearby Asthi Vilay Kund and Victoria Bridge for breathtaking elevated panoramic views.'
    ]
  },
  {
    id: 'kalaram',
    category: 'temples',
    title: 'Shree Kalaram Mandir & Sita Gufa',
    titleMr: 'श्री काळाराम मंदिर आणि सीता गुंफा',
    image: 'assets/images/kalaram_panchavati.jpg',
    rating: '4.8 ★',
    snippet: 'Spectacular 1782 black stone temple dedicated to Lord Rama, situated in the heart of historic Panchavati amidst five sacred Banyan trees.',
    fullHistory: 'Built by Sardar Rangrao Odhekar under the Peshwa era after a divine vision in the Godavari, this temple is made entirely of glossy black stone brought from Ramshej hills. The copper-plated kalash stands 69 feet tall. Nearby Sita Gufa is the mythological cave where Devi Sita worshipped Lord Shiva and from where Ravana abducted her.',
    timings: '5:00 AM – 10:00 PM daily',
    distance: '1.2 km from Ramkund / 7.5 km from Nashik Road Station',
    dressCode: 'Traditional Indian attire encouraged',
    entryFee: 'Free Darshan',
    bestTime: 'Morning 7:00 AM to 10:00 AM',
    mapLink: 'https://maps.google.com/?q=Kalaram+Temple+Panchavati+Nashik',
    tips: [
      'Enter the Sita Gufa cave with care as the inner door passage is narrow and low.',
      'Notice the 84 pillars in the temple courtyard representing the 8.4 million life reincarnations.',
      'Try the historic sweet shops right outside the temple gate for authentic pedas and ukadiche modak.'
    ]
  },
  {
    id: 'anjaneri',
    category: 'heritage',
    title: 'Anjaneri Hills (Hanuman Birthplace)',
    titleMr: 'अंजनेरी टेकडी (हनुमान जन्मभूमी)',
    image: 'assets/images/anjaneri.jpg',
    rating: '4.9 ★',
    snippet: 'Revered mountain fortress where Mata Anjani gave birth to Lord Hanuman. Features ancient Jain rock shrines, waterfalls, and Sahyadri vistas.',
    fullHistory: 'Located at an elevation of 4,264 feet, Anjaneri is steeped in Ramayana lore. The trek winds through ancient rock-carved steps, Jain caves dating to the 12th century, and opens onto a sprawling plateau shaped like a footprint with an ancient temple dedicated to Anjani Mata and baby Hanuman.',
    timings: '6:00 AM – 5:30 PM (Entry closes at 3:00 PM for safety)',
    distance: '20 km from Nashik City / 7 km before Trimbakeshwar',
    dressCode: 'Sturdy trekking shoes and comfortable sports clothing',
    entryFee: 'Nominal forest entry fee (₹20 per person)',
    bestTime: 'Monsoon and Post-Monsoon (July to February) for lush green Sahyadri waterfalls',
    mapLink: 'https://maps.google.com/?q=Anjaneri+Hill+Nashik',
    tips: [
      'Carry at least 2 liters of drinking water as shops are only available at the base village.',
      'Beware of playful mountain langurs; keep snacks securely zipped in backpacks.',
      'Trek takes approximately 2 to 2.5 hours to reach the summit temple.'
    ]
  },
  {
    id: 'pandavleni',
    category: 'heritage',
    title: 'Pandavleni Rock-Cut Caves',
    titleMr: 'पांडवलेणी बौद्ध लेणी (Trirashmi Caves)',
    image: 'assets/images/pandavleni.jpg',
    rating: '4.7 ★',
    snippet: '2,000-year-old Hinayana Buddhist monastic caves carved into Trirashmi hill with ancient Brahmi inscriptions and Chaitya halls.',
    fullHistory: 'Carved between the 2nd century BCE and 6th century CE, this complex of 24 caves was sponsored by Satavahana kings and local merchant guilds. Cave 3 and Cave 18 feature breathtaking chaitya arches, sculpted water cisterns, and monumental stupas overlooking the modern expanse of Nashik city.',
    timings: '8:30 AM – 5:30 PM daily',
    distance: '8 km from Central CBS / Directly on Mumbai-Nashik NH160 highway',
    dressCode: 'Comfortable casual attire (Requires climbing ~250 stone steps)',
    entryFee: '₹25 (Indians) | ₹300 (Foreign tourists) via ASI counter/QR',
    bestTime: 'Early morning or late afternoon for gentle sunlight and cool breeze',
    mapLink: 'https://maps.google.com/?q=Pandav+Leni+Caves+Nashik',
    tips: [
      'Visit the Buddha Smarak and Dada Dadasaheb Phalke Smarak situated right at the foothills.',
      'The morning view of Nashik skyline and Godavari valley from Cave 10 is spectacular for photography.'
    ]
  },
  {
    id: 'sula',
    category: 'vineyards',
    title: 'Sula Vineyards & Gangapur Lakeside',
    titleMr: 'सुला वाईनयार्ड्स आणि गंगापूर धरण',
    image: 'assets/images/sula_vineyard.jpg',
    rating: '4.8 ★',
    snippet: 'Experience India’s undisputed wine capital with sun-drenched vineyards, winery cellar tours, and water sports at Gangapur Boat Club.',
    fullHistory: 'Nashik’s unique microclimate of warm days, cool Sahyadri night breezes, and rich red soil makes it India’s premier grape-growing region. Sula Vineyards pioneered commercial viticulture here in 1999. Combined with the scenic backwaters of Gangapur Dam, it offers a refreshing blend of luxury and pastoral countryside.',
    timings: '11:00 AM – 10:00 PM (Tour batches every hour until 6:00 PM)',
    distance: '14 km from Nashik City Center / 15 km from Trimbakeshwar road',
    dressCode: 'Smart casual',
    entryFee: 'Winery Tour & Tasting: ₹400 – ₹1000 per person',
    bestTime: 'Sunset hour (4:30 PM - 7:00 PM) for balcony lake views',
    mapLink: 'https://maps.google.com/?q=Sula+Vineyards+Nashik',
    tips: [
      'Book tours in advance during Kumbh Mela weekends to avoid waiting.',
      'Pair your visit with MTDC Boat Club at Gangapur Dam for jet skiing and sunset cruises.'
    ]
  },
  {
    id: 'misal',
    category: 'culinary',
    title: 'The Legendary Nashik Misal Trail',
    titleMr: 'नाशिकची झणझणीत मिसळ आणि खाद्यसंस्कृती',
    image: 'assets/images/misal_pav.jpg',
    rating: '4.9 ★',
    snippet: 'Savor the fiery red ‘Tarri’, sprouted matki, crunchy farsan, and butter-toasted pav that defines Nashik’s culinary identity.',
    fullHistory: 'No pilgrimage to Nashik is complete without experiencing its legendary Misal. Unlike Pune or Kolhapur variations, Nashik Misal is celebrated for its spicy wood-fired (Chulivarchi) broth, rich black spice (Kala Masala), served with raw onions, fresh lemon, yogurt curd, and piping hot pav. Renowned institutions like Sadhana, Shamsundar, and Mamacha Gaon carry decades of heritage.',
    timings: '7:00 AM – 3:30 PM (Most iconic misal spots sell out by afternoon)',
    distance: 'Multiple locations across Gangapur Road, Satpur, and Old Nashik',
    dressCode: 'Casual & ready to experience authentic Maharashtrian spice!',
    entryFee: '₹80 – ₹140 per thali',
    bestTime: 'Breakfast time (8:00 AM - 10:30 AM)',
    mapLink: 'https://maps.google.com/?q=Sadhana+Chulivarchi+Misal+Nashik',
    tips: [
      'Order "Katakirrr" or extra Tarri on the side if you love fiery spices; keep a glass of cold Chaas (buttermilk) handy!',
      'Also sample Nashik’s famous Kondaji Chivda and hot Jalebis near Panchavati bazaar.'
    ]
  }
];

const TRANSIT_CITIES = {
  mumbai: {
    name: 'Mumbai (मुंबई)',
    distance: '165 km',
    duration: '3 hrs 15 mins',
    route: 'Samruddhi Mahamarg (Interchange at Igatpuri) / NH160 via Kasara Ghat',
    trains: 'Panchavati Express, Vande Bharat Exp (CSMT to Nashik), Tapovan Exp (Daily 22+ trains)',
    roadQuality: 'Superb 6-lane expressway / 4-lane NH160 with scenic Kasara Western Ghat views',
    tollEst: '₹180 - ₹340 (FasTag)'
  },
  pune: {
    name: 'Pune (पुणे)',
    distance: '210 km',
    duration: '4 hrs 15 mins',
    route: 'NH60 via Narayangaon, Alephata, Sangamner & Sinnar',
    trains: 'Pune-Nashik special link passenger / MSRTC Shivneri AC Volvo buses every 45 mins',
    roadQuality: '4-lane highway with scenic rural Maharashtra countryside',
    tollEst: '₹220 (FasTag)'
  },
  shirdi: {
    name: 'Shirdi (शिर्डी)',
    distance: '85 km',
    duration: '1 hr 30 mins',
    route: 'NH160 via Sinnar / Samruddhi Expressway feeder',
    trains: 'Direct pilgrim shuttle buses and cabs running 24/7 between Saibaba Temple & Nashik',
    roadQuality: 'Excellent smooth 4-lane corridor',
    tollEst: '₹85 (FasTag)'
  },
  surat: {
    name: 'Surat (सुरत)',
    distance: '235 km',
    duration: '4 hrs 30 mins',
    route: 'NH848 via Navsari, Dharampur & Peint Ghat',
    trains: 'Khandesh Express / Bhusaval-Surat link express',
    roadQuality: 'Scenic ghat highway connecting Gujarat to Maharashtra',
    tollEst: '₹140'
  },
  delhi: {
    name: 'New Delhi (नवी दिल्ली)',
    distance: '1,280 km',
    duration: '18 hrs (Train) / 2 hrs (Flight)',
    route: 'Flight to Nashik Airport (Ozar ISK) or Mumbai CSMT + Fast Train',
    trains: 'Mumbai Rajdhani, Mangala Lakshadweep Exp, Punjab Mail (Stop at Nashik Road)',
    roadQuality: 'Western Dedicated Freight & NH48 / Delhi-Mumbai Expressway connector',
    tollEst: 'Train / Air Preferred'
  },
  hyderabad: {
    name: 'Hyderabad (हैदराबाद)',
    distance: '690 km',
    duration: '11 hrs (Road) / 12 hrs (Train)',
    route: 'NH65 & NH52 via Solapur, Ahmednagar to Nashik',
    trains: 'Devagiri Express, Hyderabad-Pune-Nashik links',
    roadQuality: 'Well-paved national highway corridor across Deccan plateau',
    tollEst: '₹680'
  },
  bengaluru: {
    name: 'Bengaluru (बंगळुरू)',
    distance: '990 km',
    duration: '16 hrs (Road) / Direct Flight to Mumbai/Shirdi',
    route: 'NH48 via Belagavi, Kolhapur, Pune to Nashik',
    trains: 'Karnataka Express / Udyan Exp connecting via Kalyan',
    roadQuality: 'Golden Quadrilateral NH48 + Pune-Nashik highway',
    tollEst: '₹1,150'
  },
  indore: {
    name: 'Indore (इंदूर)',
    distance: '415 km',
    duration: '7 hrs 30 mins',
    route: 'NH52 via Dhamnod, Julwania, Sendhwa, Dhule to Nashik',
    trains: 'Indore-Daund Superfast, Avantika link to Kalyan',
    roadQuality: '4-lane National Highway through Madhya Pradesh-Maharashtra border',
    tollEst: '₹420'
  }
};

/**
 * Download a real iCalendar (.ics) file to add to Google/Apple Calendar
 */
function downloadIcsCalendar(eventId) {
  const event = SHAHI_SNAN_DATES.find(e => e.id === eventId);
  if (!event) return;

  const startDate = event.fullDate.replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = event.fullDate.replace(/[-:]/g, '').split('.')[0].replace(/T\d{6}/, 'T235959Z');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nashik Simhastha Kumbh Mela//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:kumbh-${event.id}@nashikkumbh.org`,
    `SUMMARY:${event.title} - Nashik Kumbh Mela`,
    `DESCRIPTION:${event.desc.replace(/,/g, '\\,')} | Muhurat: ${event.muhurat}`,
    `LOCATION:${event.location}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.id}-kumbh-mela.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

window.SHAHI_SNAN_DATES = SHAHI_SNAN_DATES;
window.SPOTS_DATA = SPOTS_DATA;
window.TRANSIT_CITIES = TRANSIT_CITIES;
window.downloadIcsCalendar = downloadIcsCalendar;
