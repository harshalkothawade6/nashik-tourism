/**
 * Sacred Nashik Kumbh Mela - Planner, Dates, Spots & Transit Data Engine
 * Multilingual Support: English (en), Marathi (mr), Hindi (hi)
 */

const SHAHI_SNAN_DATES = [
  {
    id: 'snan-dhwaja',
    category: 'rituals',
    title: 'Dhwajarohan (सिंहस्थ ध्वजारोहण)',
    titleMr: 'सिंहस्थ कुंभमेळा ध्वजारोहण',
    titleHi: 'सिंहस्थ कुंभमेला ध्वजारोहण (आरंभ)',
    month: 'JUL',
    monthMr: 'जुलै',
    monthHi: 'जुलाई',
    day: '14',
    year: '2027',
    fullDate: '2027-07-14T06:30:00',
    tithi: 'Ashadha Shukla Ekadashi (आषाढी एकादशी)',
    tithiMr: 'आषाढ शुक्ल एकादशी (देवशयनी एकादशी)',
    tithiHi: 'आषाढ़ शुक्ल एकादशी (देवशयनी एकादशी)',
    location: 'Ramkund (Nashik) & Kushavarta (Trimbakeshwar)',
    locationMr: 'रामकुंड (नाशिक) व कुशावर्त (त्र्यंबकेश्वर)',
    locationHi: 'रामकुंड (नासिक) एवं कुशावर्त (त्र्यंबकेश्वर)',
    locationType: 'both',
    tag: 'Flag Hoisting',
    tagMr: 'ध्वजारोहण विधी',
    tagHi: 'ध्वजारोहण विधि',
    tagClass: 'tag-parvani',
    density: 'high',
    densityText: 'High Footfall Expected',
    densityTextMr: 'मोठ्या प्रमाणात भाविक उपस्थिती',
    densityTextHi: 'भारी संख्या में श्रद्धालु उपस्थिति',
    desc: 'The official ceremonial commencement of the holy Simhastha Kumbh Mela. Sacred flags of all 13 Akharas, Mahants, and Sadhus are consecrated and hoisted amidst Vedic chanting and conch resonance.',
    descMr: 'सिंहस्थ कुंभमेळ्याचा अधिकृत आणि भव्य शुभारंभ. सर्व १३ आखाड्यांचे महंत आणि साधूंच्या उपस्थितीत वेदमंत्रांच्या जयघोषात पवित्र ध्वजारोहण संपन्न होते.',
    descHi: 'सिंहस्थ कुंभमेले का औपचारिक एवं भव्य शुभारंभ। सभी 13 अखाड़ों के संतों, महंतों की उपस्थिति में वेदमंत्रोच्चार एवं शंखनाद के साथ पावन धर्मध्वज स्थापित होता है।',
    muhurat: '06:15 AM - 08:45 AM',
    muhuratMr: 'सकाळी ०६:१५ ते ०८:४५',
    muhuratHi: 'प्रातः 06:15 से 08:45',
    holyRitual: 'Dhwaja Pujan, Sankalpa, Ganga Aradhana',
    holyRitualMr: 'ध्वज पूजन, महासंकल्प आणि गंगा आराधना',
    holyRitualHi: 'ध्वज पूजन, महासंकल्प एवं गोदावरी गंगा आराधना'
  },
  {
    id: 'snan-first',
    category: 'shahi',
    title: 'First Shahi Snan (प्रथम शाही स्नान)',
    titleMr: 'प्रथम शाही स्नान (श्रावण पौर्णिमा)',
    titleHi: 'प्रथम शाही स्नान (श्रावण पूर्णिमा)',
    month: 'AUG',
    monthMr: 'ऑगस्ट',
    monthHi: 'अगस्त',
    day: '17',
    year: '2027',
    fullDate: '2027-08-17T04:00:00',
    tithi: 'Shravan Shuddha Purnima / Raksha Bandhan',
    tithiMr: 'श्रावण शुद्ध पौर्णिमा / नारळी पौर्णिमा',
    tithiHi: 'श्रावण शुक्ल पूर्णिमा / रक्षाबंधन',
    location: 'Ramkund (Nashik) & Kushavarta (Trimbak)',
    locationMr: 'रामकुंड (नाशिक) व कुशावर्त (त्र्यंबक)',
    locationHi: 'रामकुंड (नासिक) एवं कुशावर्त (त्र्यंबकेश्वर)',
    locationType: 'both',
    tag: 'Royal Shahi Snan',
    tagMr: 'शाही स्नान',
    tagHi: 'शाही स्नान',
    tagClass: 'tag-shahi',
    density: 'extreme',
    densityText: 'Peak Footfall (Millions of Pilgrims)',
    densityTextMr: 'अत्युच्च गर्दी (लाखो भाविक)',
    densityTextHi: 'अत्यधिक भीड़ (लाखों तीर्थयात्री)',
    desc: 'The glorious inaugural royal bath of Simhastha. Naga Babas, Mahamandaleshwars, and sadhus of the Shaiva and Vaishnava Akhadas march in magnificent royal processions with silver chariots and traditional weapons.',
    descMr: 'सिंहस्थ कुंभमेळ्याचे पहिले भव्य शाही स्नान. नागा साधू आणि आखाड्यांचे महामंडलेश्वर चांदीच्या रथांमधून भव्य मिरवणुकीने रामकुंड व कुशावर्तावर स्नानासाठी येतात.',
    descHi: 'सिंहस्थ कुंभमेले का पहला पावन शाही स्नान। नागा साधु, महामंडलेश्वर एवं संत-संन्यासी भव्य शाही जुलूस के साथ पवित्र गोदावरी एवं कुशावर्त में अमृत स्नान करते हैं।',
    muhurat: 'Brahma Muhurat: 03:45 AM - 09:30 AM',
    muhuratMr: 'ब्रह्म मुहूर्त: पहाटे ०३:४५ ते ०९:३०',
    muhuratHi: 'ब्रह्म मुहूर्त: प्रातः 03:45 से 09:30',
    holyRitual: 'Akhada Shahi Juloos followed by Devotees Holy Dip',
    holyRitualMr: 'आखाडा शाही मिरवणूक व त्यानंतर सर्वसामान्य भाविक स्नान',
    holyRitualHi: 'अखाड़ा शाही जुलूस एवं तत्पश्चात श्रद्धालु अमृत स्नान'
  },
  {
    id: 'snan-second',
    category: 'shahi',
    title: 'Maha Shahi Snan (महा शाही स्नान)',
    titleMr: 'महा शाही स्नान (भाद्रपद सोमवती अमावस्या)',
    titleHi: 'महा शाही स्नान (भाद्रपद सोमवती अमावस्या)',
    month: 'SEP',
    monthMr: 'सप्टेंबर',
    monthHi: 'सितंबर',
    day: '01',
    year: '2027',
    fullDate: '2027-09-01T03:30:00',
    tithi: 'Bhadrapada Krishna Amavasya (Somvati Amavasya)',
    tithiMr: 'भाद्रपद कृष्ण अमावस्या (सोमवती पर्वणी)',
    tithiHi: 'भाद्रपद कृष्ण अमावस्या (सोमवती अमावस्या)',
    location: 'Ramkund Ghat & Kushavarta Tirtha',
    locationMr: 'रामकुंड घाट आणि कुशावर्त तीर्थ',
    locationHi: 'रामकुंड घाट एवं कुशावर्त तीर्थ',
    locationType: 'both',
    tag: 'Grand Royal Snan',
    tagMr: 'महा शाही पर्वणी',
    tagHi: 'महा शाही पर्वणी',
    tagClass: 'tag-shahi',
    density: 'extreme',
    densityText: 'Maximum Crowd Density (Estimated 8-10M)',
    densityTextMr: 'सर्वोच्च गर्दी (सुमारे ८० ते १०० लाख भाविक)',
    densityTextHi: 'शिखर भीड़ (अनुमानित 80-100 लाख श्रद्धालु)',
    desc: 'The supreme spiritual pinnacle of the Nashik Kumbh Mela. Astrologically considered the most potent planetary alignment when Jupiter is in Leo (Simha Rashi) and Sun in Leo. Millions submerge in Godavari for moksha.',
    descMr: 'सिंहस्थ कुंभमेळ्याचा सर्वोच्च भक्तीचा दिवस. गुरू व सूर्य सिंह राशीत असताना होणारी ही अलौकिक पर्वणी मोक्षदायी मानली जाते. कोट्यवधी भाविक गोदावरीत डुबकी मारतात.',
    descHi: 'सिंहस्थ कुंभमेले का सर्वोच्च आध्यात्मिक दिन। जब देवगुरु बृहस्पति और सूर्य सिंह राशि में होते हैं, तब गोदावरी स्नान से अश्वमेध यज्ञ और मोक्ष फल की प्राप्ति होती है।',
    muhurat: '03:15 AM - 12:00 PM (Auspicious all day)',
    muhuratMr: 'पहाटे ०३:१५ ते दु. १२:०० (दिवसभर अमृत योग)',
    muhuratHi: 'प्रातः 03:15 से दोपहर 12:00 (दिनभर अमृत योग)',
    holyRitual: 'Mahasnana, Pitru Tarpan, Maha Kumbh Aarti',
    holyRitualMr: 'महानदी स्नान, पितृ तर्पण आणि महाआरती',
    holyRitualHi: 'महानदी स्नान, पितृ तर्पण एवं महाकुंभ आरती'
  },
  {
    id: 'snan-third',
    category: 'shahi',
    title: 'Third Shahi Snan (तृतीय शाही स्नान)',
    titleMr: 'तृतीय शाही स्नान (वामन द्वादशी)',
    titleHi: 'तृतीय शाही स्नान (वामन द्वादशी)',
    month: 'SEP',
    monthMr: 'सप्टेंबर',
    monthHi: 'सितंबर',
    day: '13',
    year: '2027',
    fullDate: '2027-09-13T04:30:00',
    tithi: 'Bhadrapada Shukla Dwadashi (Vaman Dwadashi)',
    tithiMr: 'भाद्रपद शुक्ल द्वादशी (वामन जयंती)',
    tithiHi: 'भाद्रपद शुक्ल द्वादशी (वामन जयंती पर्व)',
    location: 'Ramkund & Godavari Snan Ghats',
    locationMr: 'रामकुंड व गोदावरी स्नान घाट',
    locationHi: 'रामकुंड एवं गोदावरी स्नान घाट',
    locationType: 'ramkund',
    tag: 'Royal Shahi Snan',
    tagMr: 'शाही स्नान',
    tagHi: 'शाही स्नान',
    tagClass: 'tag-shahi',
    density: 'high',
    densityText: 'High Footfall',
    densityTextMr: 'मोठ्या प्रमाणात गर्दी',
    densityTextHi: 'भारी भीड़',
    desc: 'Dedicated holy bath commemorating Lord Vaman’s victory. Extensive participation by the three Vaishnava Bairagi Akhadas (Nirmohi, Digambar, Nirvani) along the sacred Godavari pilgrim corridors.',
    descMr: 'भगवान वामनाच्या अवताराला समर्पित पवित्र पर्वणी. निर्मोही, दिगंबर आणि निर्वाणी या तीनही वैष्णव बैरागी आखाड्यांचे ऐतिहासिक शाही स्नान या दिवशी संपन्न होते.',
    descHi: 'भगवान वामन अवतरण को समर्पित पावन स्नान। तीनों वैष्णव बैरागी अखाड़ों (निर्मोही, दिगंबर, निर्वाणी) का दिव्य शाही जुलूस एवं गोदावरी तट पर पावन अमृत स्नान।',
    muhurat: '04:30 AM - 10:15 AM',
    muhuratMr: 'पहाटे ०४:३० ते सकाळी १०:१५',
    muhuratHi: 'प्रातः 04:30 से 10:15 बजे तक',
    holyRitual: 'Vaishnava Akhada Royal Procession & Snan',
    holyRitualMr: 'वैष्णव आखाडा शाही मिरवणूक व पवित्र स्नान',
    holyRitualHi: 'वैष्णव अखाड़ा शाही शोभायात्रा एवं महास्नान'
  },
  {
    id: 'snan-kushavarta',
    category: 'kushavarta',
    title: 'Trimbakeshwar Akhada Parvani (कुशावर्त पर्वणी)',
    titleMr: 'कुशावर्त तीर्थ त्र्यंबकेश्वर विशेष पर्वणी',
    titleHi: 'कुशावर्त तीर्थ त्र्यंबकेश्वर विशेष पर्वणी',
    month: 'SEP',
    monthMr: 'सप्टेंबर',
    monthHi: 'सितंबर',
    day: '29',
    year: '2027',
    fullDate: '2027-09-29T05:00:00',
    tithi: 'Bhadrapada Purnima (Anant Chaturdashi)',
    tithiMr: 'भाद्रपद पौर्णिमा (अनंत चतुर्दशी)',
    tithiHi: 'भाद्रपद पूर्णिमा (अनंत चतुर्दशी)',
    location: 'Kushavarta Kund, Trimbakeshwar',
    locationMr: 'कुशावर्त कुंड, त्र्यंबकेश्वर',
    locationHi: 'कुशावर्त कुंड, त्र्यंबकेश्वर',
    locationType: 'kushavarta',
    tag: 'Shaiva Parvani',
    tagMr: 'शैव पर्वणी',
    tagHi: 'शैव पर्वणी',
    tagClass: 'tag-parvani',
    density: 'high',
    densityText: 'High Footfall in Trimbak Valley',
    densityTextMr: 'त्र्यंबक खोऱ्यात मोठी गर्दी',
    densityTextHi: 'त्र्यंबकेश्वर घाटी में भारी भीड़',
    desc: 'The holy dip in Kushavarta Tirtha, the sacred tank where sage Gautama bound Ganga with Kusha grass. Sanyasis and Giri, Puri, Bharati Dashnami orders take precedence for the concluding royal bath.',
    descMr: 'महर्षी गौतम ऋषींनी गंगा नदीला कुशाच्या गवताने बांधून ठेवले ते पावन कुशावर्त कुंड. दशनामी संन्यासी, गिरी, पुरी आणि भारती पंथाचे साधू येथे विशेष पर्वणी स्नान करतात.',
    descHi: 'महर्षि गौतम द्वारा कुश से बंधी पवित्र गंगा (गोदावरी) का कुशावर्त कुंड। दशनामी संन्यासियों और शैव अखाड़ों के महामंडलेश्वरों का पावन विशेष पर्वणी स्नान।',
    muhurat: '05:00 AM - 11:30 AM',
    muhuratMr: 'पहाटे ०५:०० ते सकाळी ११:३०',
    muhuratHi: 'प्रातः 05:00 से 11:30 बजे तक',
    holyRitual: 'Kushavarta Jal Puja & Rudra Abhishek',
    holyRitualMr: 'कुशावर्त जल पूजन आणि रुद्राभिषेक',
    holyRitualHi: 'कुशावर्त तीर्थ पूजन एवं रुद्राभिषेक'
  },
  {
    id: 'snan-samapti',
    category: 'rituals',
    title: 'Simhastha Samapti (ध्वजावतरण व सांगता)',
    titleMr: 'कुंभमेळा ध्वजावतरण व सांगता विधी',
    titleHi: 'कुंभमेला ध्वजावतरण एवं पूर्णाहुति सांगता',
    month: 'NOV',
    monthMr: 'नोव्हेंबर',
    monthHi: 'नवंबर',
    day: '10',
    year: '2027',
    fullDate: '2027-11-10T08:00:00',
    tithi: 'Kartik Shukla Dwadashi (Tulsi Vivah)',
    tithiMr: 'कार्तिक शुक्ल द्वादशी (तुलसी विवाह प्रारंभ)',
    tithiHi: 'कार्तिक शुक्ल द्वादशी (तुलसी विवाह प्रारंभ)',
    location: 'Ramkund & Trimbakeshwar',
    locationMr: 'रामकुंड व त्र्यंबकेश्वर',
    locationHi: 'रामकुंड एवं त्र्यंबकेश्वर',
    locationType: 'both',
    tag: 'Holy Consecration',
    tagMr: 'सांगता विधी',
    tagHi: 'पूर्णाहुति विधि',
    tagClass: 'tag-parvani',
    density: 'moderate',
    densityText: 'Moderate Footfall',
    densityTextMr: 'मध्यम गर्दी',
    densityTextHi: 'मध्यम भीड़',
    desc: 'The solemn flag-lowering (Dhwajavataran) and Maha Yajna concluding the 12-year Simhastha Kumbh Mela cycle with heartfelt thanksgiving prayers to Mother Godavari.',
    descMr: '१२ वर्षांच्या सिंहस्थ कुंभपर्वाची सांगता. विधीवत ध्वजावतरण, महायज्ञ आणि गोदावरी मातेप्रती कृतज्ञता व्यक्त करणारा शांत व भावुक दीपोत्सव.',
    descHi: '12-वर्षीय सिंहस्थ महापर्व की पूर्णाहुति। वैदिक विधि से धर्मध्वज अवतरण, महायज्ञ एवं मां गोदावरी के प्रति कृतज्ञता महाआरती के साथ संतों की भावपूर्ण विदाई।',
    muhurat: '08:00 AM - 01:00 PM',
    muhuratMr: 'सकाळी ०८:०० ते दुपारी ०१:००',
    muhuratHi: 'प्रातः 08:00 से दोपहर 01:00 बजे तक',
    holyRitual: 'Dhwajavataran, Maha Deepotsav, Sant Vidai',
    holyRitualMr: 'ध्वजावतरण, महादीपोत्सव आणि संत विदाई',
    holyRitualHi: 'ध्वजावतरण, महादीपोत्सव एवं संत विदाई'
  }
];

const SPOTS_DATA = [
  {
    id: 'trimbakeshwar',
    category: 'temples',
    title: 'Trimbakeshwar Jyotirlinga',
    titleMr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    titleHi: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग',
    image: 'assets/images/trimbakeshwar.jpg',
    rating: '4.9 ★',
    snippet: 'One of the 12 sacred Jyotirlingas in India. Unique 3-faced linga representing Brahma, Vishnu, and Maheshwar at the foothills of Brahmagiri.',
    snippetMr: 'भारतातील १२ पवित्र ज्योतिर्लिंगांपैकी एक. ब्रम्हगिरीच्या पायथ्याशी ब्रम्हा, विष्णू आणि महेश या तिन्हींचे त्रिमुखी रूप असलेले एकमेव ज्योतिर्लिंग.',
    snippetHi: 'भारत के 12 पावन ज्योतिर्लिंगों में से एक। ब्रह्मगिरि पर्वत की तलहटी में स्थित एकमात्र त्रिमूर्ति (ब्रह्मा, विष्णु, महेश) लिंग स्वरूप।',
    fullHistory: 'Revered as the source of sacred River Godavari, the Trimbakeshwar temple was built in classical black basalt stone by Peshwa Balaji Baji Rao in 1755-1786. It holds immense significance during Kumbh Mela, where Shaiva Sadhus take their first royal holy bath at the nearby Kushavarta Kund.',
    fullHistoryMr: 'पवित्र गोदावरीचे उगमस्थान मानले जाणारे हे काळ्या पाषाणातील भव्य मंदिर पेशवे बाळाजी बाजीराव यांनी १७५५-१७८६ दरम्यान बांधले. सिंहस्थ कुंभमेळ्यात शैव आखाड्यांचे संत-संन्यासी जवळच असलेल्या कुशावर्त कुंडात शाही स्नान करतात.',
    fullHistoryHi: 'पवित्र गोदावरी नदी के उद्गम के रूप में पूजनीय यह भव्य मंदिर पेशवा बालाजी बाजीराव द्वारा 1755-1786 में काले पाषाण से निर्मित कराया गया था। सिंहस्थ कुंभ में शैव अखाड़ों के संत सर्वप्रथम कुशावर्त कुंड में अमृत स्नान करते हैं।',
    timings: '5:30 AM – 9:00 PM (VIP Rudrabhishek 6:00 AM)',
    timingsMr: 'पहाटे ५:३० ते रात्री ९:०० (रुद्राभिषेक स. ६:००)',
    timingsHi: 'प्रातः 5:30 से रात्रि 9:00 तक (रुद्राभिषेक 6:00)',
    distance: '28 km from Nashik Central / 36 km from Railway Station',
    distanceMr: 'नाशिक मध्यवर्ती बसस्थानकापासून २८ किमी / रेल्वे स्टेशनपासून ३६ किमी',
    distanceHi: 'नासिक शहर से 28 किमी / रेलवे स्टेशन से 36 किमी',
    dressCode: 'Strict Traditional Indian (Dhoti/Kurta for inner sanctum, Saree/Salwar for women)',
    dressCodeMr: 'पारंपरिक भारतीय वस्त्र (गाभाऱ्यात पुरुषांसाठी सोवळे/धोती, महिलांसाठी साडी/सलवार)',
    dressCodeHi: 'पारंपरिक भारतीय वस्त्र (गर्भगृह में धोती/कुर्ता, महिलाओं हेतु साड़ी/सूट)',
    entryFee: 'Free General Darshan | Special Pass: ₹200 (Online Booking Recommended)',
    entryFeeMr: 'मोफत सामान्य दर्शन | विशेष दर्शन पास: ₹२००',
    entryFeeHi: 'सामान्य दर्शन निःशुल्क | विशेष पास: ₹200',
    mapLink: 'https://maps.google.com/?q=Trimbakeshwar+Temple+Nashik',
    tips: [
      'Leather items, belts, and mobile phones are strictly prohibited inside sanctum.',
      'Visit Kushavarta Kund located just 400m from the temple for sacred holy pond darshan.',
      'Take the electric pilgrim shuttle from the Trimbak Bypass parking hub to avoid traffic.'
    ],
    tipsMr: [
      'मंदिराच्या गाभाऱ्यात चामड्याच्या वस्तू, पट्टे आणि मोबाईल नेण्यास सक्त मनाई आहे.',
      'मंदिरापासून अवघ्या ४०० मीटरवर असलेले पवित्र कुशावर्त कुंड अवश्य पहावे.',
      'ट्रॅफिक टाळण्यासाठी त्र्यंबक बायपास पार्किंगवरून मोफत ई-बस शटलचा वापर करा.'
    ],
    tipsHi: [
      'गर्भगृह के भीतर चमड़े की वस्तुएं, बेल्ट और मोबाइल ले जाना पूर्णतः प्रतिबंधित है।',
      'मंदिर से मात्र 400 मीटर दूर स्थित पावन कुशावर्त तीर्थ कुंड का दर्शन अवश्य करें।',
      'भीड़ नियंत्रण हेतु त्र्यंबक बाईपास पार्किंग से इलेक्ट्रिक शटल बस का उपयोग करें।'
    ]
  },
  {
    id: 'ramkund',
    category: 'temples',
    title: 'Ramkund Ghat & Godavari Aarti',
    titleMr: 'रामकुंड व गोदावरी महाआरती',
    titleHi: 'रामकुंड घाट एवं गोदावरी महाआरती',
    image: 'assets/images/ramkund_aarti.jpg',
    rating: '4.9 ★',
    snippet: 'The epicentre of Kumbh Mela in Nashik. Where Lord Rama took sacred baths and immersed the ashes of King Dasharatha.',
    snippetMr: 'नाशिक कुंभमेळ्याचा मुख्य प्राण. प्रभू श्रीरामांनी वनवासात जिथे स्नान केले व दशरथ राजांचे अस्थिविसर्जन केले ते पवित्र तीर्थ.',
    snippetHi: 'नासिक कुंभमेले का मुख्य केंद्र। जहां मर्यादा पुरुषोत्तम भगवान राम ने स्नान किया और पिता दशरथ का अस्थि विसर्जन व श्राद्ध किया।',
    fullHistory: 'Built by Chitrarao Khatarkar in 1696, Ramkund is considered the holiest water tank along the Godavari River. Asthi (bone ashes) immersed in its waters dissolve miraculously into calcium within minutes due to unique river minerals. Every evening, the Godavari Maha Aarti with blazing brass lamps rivals the spectacle of Haridwar and Varanasi.',
    fullHistoryMr: '१६९६ मध्ये बांधलेले रामकुंड गोदावरीचे अत्यंत पावन कुंड आहे. येथे विसर्जित केलेल्या अस्थी काही वेळातच विरघळतात असा भाविकांचा अनुभव आहे. दररोज सायंकाळी होणारी गोदावरी महाआरती वाराणसी व हरिद्वारच्या धर्तीवर डोळ्यांचे पारणे फेडते.',
    fullHistoryHi: '1696 में निर्मित रामकुंड दक्षिण गंगा गोदावरी का परम पावन घाट है। यहां की विशेष जल संरचना में विसर्जित अस्थियां चमत्कारी रूप से विलीन हो जाती हैं। प्रतिदिन सायंकाल होने वाली गोदावरी महाआरती हरिद्वार-काशी जैसी भव्य होती है।',
    timings: 'Open 24 Hours | Maha Aarti: 6:45 PM Daily',
    timingsMr: '२४ तास खुले | सायंकाळची महाआरती: ६:४५ वा.',
    timingsHi: '24 घंटे खुला | सायंकालीन महाआरती: शाम 6:45',
    distance: '2 km from Nashik CBS Bus Stand / 8 km from Railway Station',
    distanceMr: 'नाशिक मध्यवर्ती बसस्थानकापासून २ किमी / रेल्वे स्टेशनपासून ८ किमी',
    distanceHi: 'नासिक सीबीएस से 2 किमी / रेलवे स्टेशन से 8 किमी',
    dressCode: 'Modest respectful attire | Change rooms available along the ghat',
    dressCodeMr: 'मर्यादशील कपडे | घाटावर कपडे बदलण्यासाठी स्वच्छतागृहे उपलब्ध',
    dressCodeHi: 'मर्यादित वस्त्र | घाट पर कपड़े बदलने हेतु सुरक्षित कक्ष उपलब्ध',
    entryFee: 'Free for all pilgrims',
    entryFeeMr: 'सर्व भाविकांसाठी पूर्णपणे मोफत',
    entryFeeHi: 'सभी श्रद्धालुओं के लिए निःशुल्क',
    mapLink: 'https://maps.google.com/?q=Ramkund+Nashik',
    tips: [
      'Do not carry single-use plastic into the river ghat area.',
      'Participate in the evening Deepotsav by purchasing an organic marigold leaf diya from local vendors.',
      'Visit nearby Asthi Vilay Kund and Victoria Bridge for breathtaking elevated panoramic views.'
    ],
    tipsMr: [
      'गोदावरी नदी परिसरात प्लास्टिक कचरा किंवा थर्माकोल नेण्यास मनाई आहे.',
      'सायंकाळी स्थानिक कारागिरांकडून पानांचा दिवा घेऊन दीपदानात सहभागी व्हा.',
      'जवळच असलेले अस्थिविलय कुंड आणि अहिल्याबाई होळकर पुलावरून सुंदर दृश्य दिसते.'
    ],
    tipsHi: [
      'नदी घाट क्षेत्र में सिंगल-यूज प्लास्टिक का प्रयोग न करें।',
      'सायंकालीन महाआरती में सम्मिलित होकर गोदावरी में दीपदान का पुण्य अवश्य लें।',
      'निकटवर्ती अस्थि विलय कुंड और विक्टोरिया पुल से विहंगम दृश्य का आनंद लें।'
    ]
  },
  {
    id: 'kalaram',
    category: 'temples',
    title: 'Shree Kalaram Mandir & Sita Gufa',
    titleMr: 'श्री काळाराम मंदिर आणि सीता गुंफा',
    titleHi: 'श्री कालाराम मंदिर एवं सीता गुंफा',
    image: 'assets/images/kalaram_panchavati.jpg',
    rating: '4.8 ★',
    snippet: 'Spectacular 1782 black stone temple dedicated to Lord Rama, situated in the heart of historic Panchavati amidst five sacred Banyan trees.',
    snippetMr: 'ऐतिहासिक पंचवटीत पाच पवित्र वटवृक्षांच्या सानिध्यात १७८२ मध्ये बांधलेले प्रभू श्रीरामांचे भव्य काळ्या पाषाणातील मंदिर.',
    snippetHi: 'ऐतिहासिक पंचवटी में 1782 में काले पाषाण से निर्मित श्रीराम का भव्य मंदिर एवं पांच वटवृक्षों के मध्य स्थित सीता गुफा।',
    fullHistory: 'Built by Sardar Rangrao Odhekar under the Peshwa era after a divine vision in the Godavari, this temple is made entirely of glossy black stone brought from Ramshej hills. The copper-plated kalash stands 69 feet tall. Nearby Sita Gufa is the mythological cave where Devi Sita worshipped Lord Shiva and from where Ravana abducted her.',
    fullHistoryMr: 'पेशवे काळात सरदार रंगराव ओढेकर यांनी बांधलेले हे अप्रतिम मंदिर रामशेज डोंगरावरून आणलेल्या काळ्या पाषाणात साकारले आहे. जवळील सीता गुंफेत माता सीतेने महादेवाची पूजा केली होती आणि येथूनच रावणाने तिचे हरण केले होते.',
    fullHistoryHi: 'पेशवा काल में निर्मित यह मंदिर रामशेज की पहाड़ियों के चमकदार काले पत्थरों से बना है। पास ही स्थित सीता गुफा वह पौराणिक स्थल है जहां माता सीता ने शिव आराधना की थी और जहां से रावण ने हरण किया था।',
    timings: '5:00 AM – 10:00 PM daily',
    timingsMr: 'दररोज सकाळी ५:०० ते रात्री १०:००',
    timingsHi: 'प्रातः 5:00 से रात्रि 10:00 तक',
    distance: '1.2 km from Ramkund / 7.5 km from Railway Station',
    distanceMr: 'रामकुंडापासून १.२ किमी / रेल्वे स्टेशनपासून ७.५ किमी',
    distanceHi: 'रामकुंड से 1.2 किमी / रेलवे स्टेशन से 7.5 किमी',
    dressCode: 'Traditional Indian attire encouraged',
    dressCodeMr: 'भारतीय पारंपरिक पेहराव',
    dressCodeHi: 'पारंपरिक भारतीय परिधान',
    entryFee: 'Free Darshan',
    entryFeeMr: 'मोफत दर्शन',
    entryFeeHi: 'निःशुल्क दर्शन',
    mapLink: 'https://maps.google.com/?q=Kalaram+Temple+Panchavati+Nashik',
    tips: [
      'Enter the Sita Gufa cave with care as the inner door passage is narrow and low.',
      'Notice the 84 pillars in the temple courtyard representing the 8.4 million life reincarnations.',
      'Try the historic sweet shops right outside the temple gate for authentic pedas and ukadiche modak.'
    ],
    tipsMr: [
      'सीता गुंफेत प्रवेश करताना काळजी घ्या, कारण आतील दरवाजा व रस्ता अरुंद आहे.',
      'मंदिराच्या प्रांगणात ८४ योनींचे प्रतीक असलेले ८४ भव्य पाषाणी खांब आहेत.',
      'मंदिराबाहेरील जुन्या मिठाई दुकानांमधील प्रसिद्ध पेढे आणि उकडीचे मोदक नक्की चाखा.'
    ],
    tipsHi: [
      'सीता गुफा का प्रवेश द्वार संकरा व नीचा है, अतः सावधानीपूर्वक प्रवेश करें।',
      'मंदिर प्रांगण के 84 खंभे 84 लाख योनियों का प्रतीक माने जाते हैं।',
      'मंदिर के बाहर स्थित प्राचीन दुकानों के नासिकी पेड़े व प्रसाद का आनंद लें।'
    ]
  },
  {
    id: 'anjaneri',
    category: 'heritage',
    title: 'Anjaneri Hills (Hanuman Birthplace)',
    titleMr: 'अंजनेरी टेकडी (हनुमान जन्मभूमी)',
    titleHi: 'अंजनेरी पर्वत (श्री हनुमान जन्मस्थान)',
    image: 'assets/images/anjaneri.jpg',
    rating: '4.9 ★',
    snippet: 'Revered mountain fortress where Mata Anjani gave birth to Lord Hanuman. Features ancient Jain rock shrines, waterfalls, and Sahyadri vistas.',
    snippetMr: 'माता अंजनीने जेथे मारुतीरायांना जन्म दिला ती पवित्र भूमी. सह्याद्रीच्या डोंगररांगा, प्राचीन पाषाण मंदिरे आणि धबधब्यांचे निसर्गसौंदर्य.',
    snippetHi: 'माता अंजनी की तपस्थली एवं पवनपुत्र श्री हनुमान की जन्मस्थली। सह्याद्रि पर्वतमाला, प्राचीन जैन गुफाएं एवं मनोरम प्राकृतिक झरने।',
    fullHistory: 'Located at an elevation of 4,264 feet, Anjaneri is steeped in Ramayana lore. The trek winds through ancient rock-carved steps, Jain caves dating to the 12th century, and opens onto a sprawling plateau shaped like a footprint with an ancient temple dedicated to Anjani Mata and baby Hanuman.',
    fullHistoryMr: 'समुद्रसपाटीपासून ४,२६४ फूट उंचीवर असलेला अंजनेरी किल्ला रामायण काळातील पावन संदर्भ जपून आहे. पायथ्यापासून दगडी पायऱ्या, १२व्या शतकातील गुंफा आणि माथ्यावरील पावलाच्या आकाराचे विस्तीर्ण पठार पाहण्यासारखे आहे.',
    fullHistoryHi: 'समुद्र तल से 4,264 फीट ऊंचाई पर स्थित अंजनेरी पर्वत रामायण काल से जुड़ा है। प्राचीन पाषाण सीढ़ियों से होते हुए शिखर पर माता अंजनी एवं बाल हनुमान का दुर्लभ मंदिर स्थित है।',
    timings: '6:00 AM – 5:30 PM (Entry closes at 3:00 PM for safety)',
    timingsMr: 'सकाळी ६:०० ते संध्या. ५:३० (दुपारी ३ नंतर प्रवेश बंद)',
    timingsHi: 'प्रातः 6:00 से शाम 5:30 (दोपहर 3 बजे बाद प्रवेश बंद)',
    distance: '20 km from Nashik City / 7 km before Trimbakeshwar',
    distanceMr: 'नाशिक शहरापासून २० किमी / त्र्यंबकेश्वरच्या आधी ७ किमी',
    distanceHi: 'नासिक से 20 किमी / त्र्यंबकेश्वर मार्ग पर',
    dressCode: 'Sturdy trekking shoes and comfortable sports clothing',
    dressCodeMr: 'ट्रेकिंग शूज आणि आरामदायी कपडे',
    dressCodeHi: 'ट्रेकिंग जूते एवं आरामदायक वस्त्र',
    entryFee: 'Nominal forest entry fee (₹20 per person)',
    entryFeeMr: 'वनविभाग नाममात्र शुल्क: ₹२० प्रति व्यक्ती',
    entryFeeHi: 'वन विभाग शुल्क: ₹20 प्रति व्यक्ति',
    mapLink: 'https://maps.google.com/?q=Anjaneri+Hill+Nashik',
    tips: [
      'Carry at least 2 liters of drinking water as shops are only available at the base village.',
      'Beware of playful mountain langurs; keep snacks securely zipped in backpacks.',
      'Trek takes approximately 2 to 2.5 hours to reach the summit temple.'
    ],
    tipsMr: [
      'गडावर पिण्याचे पाणी व खाद्यपदार्थ सुरक्षित पिशवीत ठेवा, माकडांची खोडी असते.',
      'माथ्यापर्यंत पोहोचण्यासाठी सुमारे २ ते २.५ तास चढाई करावी लागते.',
      'पावसाळ्यात धुक्याची चादर आणि धबधब्यांचा मनसोक्त आनंद घेता येतो.'
    ],
    tipsHi: [
      'चढ़ाई हेतु कम से कम 2 लीटर पेयजल साथ रखें, आधार गांव के बाद दुकानें नहीं हैं।',
      'वानरों से सावधान रहें, खाद्य सामग्री बैग में सुरक्षित रखें।',
      'शिखर तक पहुंचने में लगभग 2 से 2.5 घंटे का समय लगता है।'
    ]
  },
  {
    id: 'pandavleni',
    category: 'heritage',
    title: 'Pandavleni Rock-Cut Caves',
    titleMr: 'पांडवलेणी बौद्ध लेणी (Trirashmi Caves)',
    titleHi: 'पांडवलेणी बौद्ध गुफाएं (त्रिरश्मि लेणी)',
    image: 'assets/images/pandavleni.jpg',
    rating: '4.7 ★',
    snippet: '2,000-year-old Hinayana Buddhist monastic caves carved into Trirashmi hill with ancient Brahmi inscriptions and Chaitya halls.',
    snippetMr: 'त्रिरश्मी टेकडीवर कोरलेली २००० वर्षे जुनी बौद्ध लेणी. प्राचीन ब्राह्मी शिलालेख, भव्य चैत्यगृह आणि अप्रतिम शिल्पकला.',
    snippetHi: 'त्रिरश्मि पहाड़ी पर उत्कीर्ण 2000 वर्ष प्राचीन 24 बौद्ध गुफाएं, ब्राह्मी शिलालेख एवं प्राचीन चैत्य गृह।',
    fullHistory: 'Carved between the 2nd century BCE and 6th century CE, this complex of 24 caves was sponsored by Satavahana kings and local merchant guilds. Cave 3 and Cave 18 feature breathtaking chaitya arches, sculpted water cisterns, and monumental stupas overlooking the modern expanse of Nashik city.',
    fullHistoryMr: 'इसवीसन पूर्व २रे शतक ते ६व्या शतकादरम्यान सातवाहन राजांनी कोरून घेतलेला हा २४ लेण्यांचा समूह आहे. येथून आधुनिक नाशिक शहराचे आणि मुंबई महामार्गाचे विहंगम दृश्य दिसते.',
    fullHistoryHi: 'ईसा पूर्व दूसरी सदी से छठी सदी के मध्य सातवाहन शासकों द्वारा निर्मित 24 गुफाओं का यह परिसर प्राचीन स्थापत्य का अद्भुत संगम है। गुफा सं. 3 व 18 विशेष दर्शनीय हैं।',
    timings: '8:30 AM – 5:30 PM daily',
    timingsMr: 'दररोज सकाळी ८:३० ते संध्याकाळी ५:३०',
    timingsHi: 'प्रातः 8:30 से शाम 5:30 तक',
    distance: '8 km from Central CBS / Directly on Mumbai-Nashik NH160',
    distanceMr: 'सीबीएस पासून ८ किमी / मुंबई-नाशिक महामार्गालगत',
    distanceHi: 'सीबीएस से 8 किमी / मुंबई-नासिक राष्ट्रीय राजमार्ग पर',
    dressCode: 'Comfortable casual attire (Requires climbing ~250 stone steps)',
    dressCodeMr: 'आरामदायी कपडे (सुमारे २५० पायऱ्या चढाव्या लागतात)',
    dressCodeHi: 'आरामदायक वस्त्र (लगभग 250 सीढ़ियां चढ़नी होती हैं)',
    entryFee: '₹25 (Indians) | ₹300 (Foreign tourists)',
    entryFeeMr: 'भारतीय नागरिक: ₹२५ | परदेशी पर्यटक: ₹३००',
    entryFeeHi: 'भारतीय: ₹25 | विदेशी पर्यटक: ₹300',
    mapLink: 'https://maps.google.com/?q=Pandav+Leni+Caves+Nashik',
    tips: [
      'Visit the Buddha Smarak and Dada Dadasaheb Phalke Smarak situated right at the foothills.',
      'The morning view of Nashik skyline and Godavari valley from Cave 10 is spectacular for photography.'
    ],
    tipsMr: [
      'टेकडीच्या पायथ्याशी असलेले दादासाहेब फाळके स्मारक आणि बुद्ध स्मारक नक्की पहा.',
      'सकाळच्या कोवळ्या उन्हात लेण्यांमधून संपूर्ण नाशिक शहराचे अप्रतिम फोटो येतात.'
    ],
    tipsHi: [
      'पहाड़ी की तलहटी में स्थित दादासाहेब फाल्के स्मारक और बुद्ध स्मारक भी अवश्य देखें।',
      'सुबह के समय गुफा संख्या 10 से संपूर्ण नाशिक शहर का दृश्य फोटोग्राफी हेतु श्रेष्ठ है।'
    ]
  },
  {
    id: 'sula',
    category: 'vineyards',
    title: 'Sula Vineyards & Gangapur Lakeside',
    titleMr: 'सुला वाईनयार्ड्स आणि गंगापूर धरण',
    titleHi: 'सुला वाइनयार्ड्स एवं गंगापुर झील',
    image: 'assets/images/sula_vineyard.jpg',
    rating: '4.8 ★',
    snippet: 'Experience India’s undisputed wine capital with sun-drenched vineyards, winery cellar tours, and water sports at Gangapur Boat Club.',
    snippetMr: 'भारताची द्राक्ष व वाईन राजधानी नाशिक. विस्तीर्ण द्राक्षबागा, वाइनरी फेरफटका आणि गंगापूर बोट क्लबवरील जलक्रीडा.',
    snippetHi: 'भारत की वाइन राजधानी नाशिक के विहंगम अंगूर के बाग, वाइनरी टूर एवं गंगापुर डैम बोट क्लब में वाटर स्पोर्ट्स का आनंद।',
    fullHistory: 'Nashik’s unique microclimate of warm days, cool Sahyadri night breezes, and rich red soil makes it India’s premier grape-growing region. Sula Vineyards pioneered commercial viticulture here in 1999. Combined with the scenic backwaters of Gangapur Dam, it offers a refreshing blend of luxury and pastoral countryside.',
    fullHistoryMr: 'नाशिकचे आल्हाददायक हवामान आणि सह्याद्रीची लाल माती द्राक्ष शेतीसाठी जागतिक दर्जाची मानली जाते. सुला वाईनयार्ड्स आणि गंगापूर धरणाचे निळे पाणी पर्यटकांना निसर्गरम्य शांततेची अनुभूती देते.',
    fullHistoryHi: 'सह्याद्रि की अनुकूल जलवायु और उपजाऊ भूमि नासिक को भारत का सबसे बड़ा अंगूर उत्पादक क्षेत्र बनाती है। गंगापुर झील के किनारे फैला यह क्षेत्र पर्यटन का प्रमुख आकर्षण है।',
    timings: '11:00 AM – 10:00 PM (Tour batches until 6:00 PM)',
    timingsMr: 'सकाळी ११:०० ते रात्री १०:०० (टूर संध्या. ६ वाजेपर्यंत)',
    timingsHi: 'प्रातः 11:00 से रात्रि 10:00 तक (वाइन टूर शाम 6 तक)',
    distance: '14 km from Nashik City Center / 15 km from Trimbak road',
    distanceMr: 'नाशिक शहरापासून १४ किमी / गंगापूर रोड',
    distanceHi: 'नासिक शहर से 14 किमी / गंगापुर रोड',
    dressCode: 'Smart casual',
    dressCodeMr: 'कॅज्युअल आधुनिक पेहराव',
    dressCodeHi: 'स्मार्ट कैजुअल',
    entryFee: 'Winery Tour & Tasting: ₹400 – ₹1000 per person',
    entryFeeMr: 'वाइनरी टूर व टेस्टींग: ₹४०० - ₹१००० प्रति व्यक्ती',
    entryFeeHi: 'वाइनरी टूर शुल्क: ₹400 - ₹1000 प्रति व्यक्ति',
    mapLink: 'https://maps.google.com/?q=Sula+Vineyards+Nashik',
    tips: [
      'Book tours in advance during Kumbh Mela weekends to avoid waiting.',
      'Pair your visit with MTDC Boat Club at Gangapur Dam for jet skiing and sunset cruises.'
    ],
    tipsMr: [
      'कुंभमेळा आणि विकेंडला गर्दी टाळण्यासाठी टूरचे ऑनलाइन बुकिंग आधीच करा.',
      'जवळच असलेल्या एमटीडीसी बोट क्लबला भेट देऊन स्पीड बोट आणि सूर्यास्ताचा आनंद घ्या.'
    ],
    tipsHi: [
      'सप्ताहांत में भीड़ से बचने हेतु अग्रिम बुकिंग की सलाह दी जाती है।',
      'निकटवर्ती एमटीडीसी गंगापुर बोट क्लब में वाटर स्पोर्ट्स एवं सनसेट क्रूज का आनंद लें।'
    ]
  },
  {
    id: 'misal',
    category: 'culinary',
    title: 'The Legendary Nashik Misal Trail',
    titleMr: 'नाशिकची झणझणीत मिसळ आणि खाद्यसंस्कृती',
    titleHi: 'प्रसिद्ध नासिक की तीखी मिसल एवं खानपान',
    image: 'assets/images/misal_pav.jpg',
    rating: '4.9 ★',
    snippet: 'Savor the fiery red ‘Tarri’, sprouted matki, crunchy farsan, and butter-toasted pav that defines Nashik’s culinary identity.',
    snippetMr: 'चुलीवरची झणझणीत काळ्या मसाल्याची तर्री, मटकी, कुरकुरीत फरसाण आणि गरमागरम पाव या नाशिकच्या खाद्यसंस्कृतीचा आस्वाद.',
    snippetHi: 'चूल्हे पर पकी तीखी तरी, अंकुरित मटकी, कुरकुरा फरसाण और मक्खनयुक्त पाव — नासिक की विश्वप्रसिद्ध मिसल का जायका।',
    fullHistory: 'No pilgrimage to Nashik is complete without experiencing its legendary Misal. Unlike Pune or Kolhapur variations, Nashik Misal is celebrated for its spicy wood-fired (Chulivarchi) broth, rich black spice (Kala Masala), served with raw onions, fresh lemon, yogurt curd, and piping hot pav. Renowned institutions like Sadhana, Shamsundar, and Mamacha Gaon carry decades of heritage.',
    fullHistoryMr: 'नाशिकची यात्रा मिसळ चाखल्याशिवाय अपूर्णच मानली जाते. चुलीवरचा काळा मसाला, जाळदार कट आणि सोबत थंडगार दही-ताक हे नाशिक मिसळीचे खास वैशिष्ट्य आहे. साधना, शामसुंदर, तुकाराम यांसारखी प्रसिद्ध मिसळ दालने लोकप्रिय आहेत.',
    fullHistoryHi: 'नासिक की कोई भी यात्रा यहां की पारंपरिक चूल्हे वाली मिसल खाए बिना अधूरी है। विशेष काले मसाले की तरी, मटकी और छाछ का यह अनोखा मेल पूरे देश में विख्यात है।',
    timings: '7:00 AM – 3:30 PM (Iconic spots sell out by afternoon)',
    timingsMr: 'सकाळी ७:०० ते दुपारी ३:३० (दुपारनंतर स्टॉक संपतो)',
    timingsHi: 'प्रातः 7:00 से दोपहर 3:30 बजे तक',
    distance: 'Multiple locations across Gangapur Road, Satpur, and Old Nashik',
    distanceMr: 'गंगापूर रोड, सातपूर आणि जुने नाशिक या परिसरांमध्ये',
    distanceHi: 'गंगापुर रोड, सातपुर एवं पुराने नासिक क्षेत्र में',
    dressCode: 'Casual & ready to experience authentic Maharashtrian spice!',
    dressCodeMr: 'झणझणीत मसालेदार खाद्यपदार्थांचा आनंद घेण्यासाठी सज्ज!',
    dressCodeHi: 'तीखा और लजीज भोजन चखने के लिए तैयार!',
    entryFee: '₹80 – ₹140 per thali',
    entryFeeMr: '₹८० ते ₹१४० प्रति थाळी',
    entryFeeHi: '₹80 से ₹140 प्रति थाली',
    mapLink: 'https://maps.google.com/?q=Sadhana+Chulivarchi+Misal+Nashik',
    tips: [
      'Order "Katakirrr" or extra Tarri on the side if you love fiery spices; keep a glass of cold Chaas (buttermilk) handy!',
      'Also sample Nashik’s famous Kondaji Chivda and hot Jalebis near Panchavati bazaar.'
    ],
    tipsMr: [
      'जास्त तिखट आवडत असल्यास जादा कट/तर्री मागा; सोबत थंडगार ताकाचा ग्लास नक्की ठेवा.',
      'पंचवटी परिसरातील प्रसिद्ध कोंडाजी चिवडा आणि गरमागरम जिलेबीचा आस्वाद अवश्य घ्या.'
    ],
    tipsHi: [
      'यदि तीखा पसंद हो तो अतिरिक्त तरी मांगें और साथ में ठंडी छाछ अवश्य पिएं।',
      'पंचवटी बाजार के पास प्रसिद्ध कोंडाजी चिवड़ा और गरम जलेबी का स्वाद अवश्य लें।'
    ]
  }
];

const TRANSIT_CITIES = {
  mumbai: {
    name: 'Mumbai (मुंबई)',
    nameMr: 'मुंबई (१६५ किमी)',
    nameHi: 'मुंबई (165 किमी)',
    distance: '165 km',
    duration: '3 hrs 15 mins',
    durationMr: '३ तास १५ मिनिटे',
    durationHi: '3 घंटे 15 मिनट',
    route: 'Samruddhi Mahamarg (Igatpuri Interchange) / NH160 via Kasara Ghat',
    routeMr: 'हिंदूहृदयसम्राट बाळासाहेब ठाकरे समृद्धी महामार्ग / मुंबई-नाशिक राष्ट्रीय महामार्ग १६०',
    routeHi: 'समृद्धि महामार्ग (इगतपुरी) / मुंबई-नासिक राष्ट्रीय राजमार्ग 160 (कसारा घाट)',
    trains: 'Panchavati Express, Vande Bharat Exp (CSMT to Nashik), Tapovan Exp (Daily 22+ trains)',
    trainsMr: 'पंचवटी एक्सप्रेस, मुंबई-नाशिक वंदे भारत, तपोवन एक्सप्रेस (दररोज २२+ गाड्या)',
    trainsHi: 'पंचवटी एक्सप्रेस, वंदे भारत एक्सप्रेस (सीएसएमटी से नासिक), तपोवन (दैनिक 22+ ट्रेन)',
    roadQuality: 'Superb 6-lane expressway / 4-lane NH160 with scenic Kasara Ghat views',
    tollEst: '₹180 - ₹340 (FasTag)'
  },
  pune: {
    name: 'Pune (पुणे)',
    nameMr: 'पुणे (२१० किमी)',
    nameHi: 'पुणे (210 किमी)',
    distance: '210 km',
    duration: '4 hrs 15 mins',
    durationMr: '४ तास १५ मिनिटे',
    durationHi: '4 घंटे 15 मिनट',
    route: 'NH60 via Narayangaon, Alephata, Sangamner & Sinnar',
    routeMr: 'पुणे-नाशिक महामार्ग ६० (नारायणगाव, आळेफाटा, संगमनेर, सिन्नर मार्गे)',
    routeHi: 'पुणे-नासिक राजमार्ग 60 (नारायणगांव, संगमनेर, सिन्नर होकर)',
    trains: 'Pune-Nashik special link passenger / MSRTC Shivneri AC Volvo buses every 45 mins',
    trainsMr: 'पुणे-नाशिक लिंक पॅसेंजर / दर ४५ मिनिटांनी शिवनेरी वातानुकूलित बस सेवा',
    trainsHi: 'पुणे-नासिक स्पेशल ट्रेन / प्रति 45 मिनट पर शिवनेरी एसी वॉल्वो बसें',
    roadQuality: '4-lane highway with scenic rural Maharashtra countryside',
    tollEst: '₹220 (FasTag)'
  },
  shirdi: {
    name: 'Shirdi (शिर्डी)',
    nameMr: 'शिर्डी (८५ किमी)',
    nameHi: 'शिर्डी (85 किमी)',
    distance: '85 km',
    duration: '1 hr 30 mins',
    durationMr: '१ तास ३० मिनिटे',
    durationHi: '1 घंटा 30 मिनट',
    route: 'NH160 via Sinnar / Samruddhi Expressway feeder',
    routeMr: 'सिन्नर मार्गे शिर्डी-नाशिक रस्ता / समृद्धी महामार्ग फीडर',
    routeHi: 'सिन्नर होकर एनएच 160 / समृद्धि महामार्ग लिंक',
    trains: 'Direct pilgrim shuttle buses and cabs running 24/7 between Saibaba Temple & Nashik',
    trainsMr: 'साईबाबा मंदिर ते नाशिक २४ तास नियमित बस आणि टॅक्सी सेवा उपलब्ध',
    trainsHi: 'साईं मंदिर शिर्डी से नासिक हेतु 24 घंटे लगातार बस व टैक्सी उपलब्ध',
    roadQuality: 'Excellent smooth 4-lane corridor',
    tollEst: '₹85 (FasTag)'
  },
  surat: {
    name: 'Surat (सुरत)',
    nameMr: 'सुरत (२३५ किमी)',
    nameHi: 'सूरत (235 किमी)',
    distance: '235 km',
    duration: '4 hrs 30 mins',
    durationMr: '४ तास ३० मिनिटे',
    durationHi: '4 घंटे 30 मिनट',
    route: 'NH848 via Navsari, Dharampur & Peint Ghat',
    routeMr: 'पेठ घाट, धरमपूर व नवसारी मार्गे सुरत-नाशिक महामार्ग ८४८',
    routeHi: 'नवसारी, धरमपुर एवं पेठ घाट होकर राष्ट्रीय राजमार्ग 848',
    trains: 'Khandesh Express / Bhusaval-Surat link express',
    trainsMr: 'खानदेश एक्सप्रेस / सुरत-भुसावळ पॅसेंजर',
    trainsHi: 'खानदेश एक्सप्रेस / सूरत-भुसावल लिंक',
    roadQuality: 'Scenic ghat highway connecting Gujarat to Maharashtra',
    tollEst: '₹140'
  },
  delhi: {
    name: 'New Delhi (नवी दिल्ली)',
    nameMr: 'नवी दिल्ली (१२८० किमी)',
    nameHi: 'नई दिल्ली (1280 किमी)',
    distance: '1,280 km',
    duration: '18 hrs (Train) / 2 hrs (Flight)',
    durationMr: '१८ तास (ट्रेन) / २ तास (विमान)',
    durationHi: '18 घंटे (ट्रेन) / 2 घंटे (उड़ान)',
    route: 'Flight to Nashik Airport (Ozar ISK) or Mumbai CSMT + Fast Train',
    routeMr: 'ओझर विमानतळ (नासिक) किंवा मुंबई विमानतळ + सुपरफास्ट ट्रेन',
    routeHi: 'ओझर एयरपोर्ट (नासिक) सीधी उड़ान अथवा मुंबई होकर ट्रेन',
    trains: 'Mumbai Rajdhani, Mangala Lakshadweep Exp, Punjab Mail (Stop at Nashik Road)',
    trainsMr: 'मंगला लक्षद्वीप, पंजाब मेल, सचखंड एक्सप्रेस (नाशिक रोड थांबा)',
    trainsHi: 'मंगला लक्षद्वीप एक्सप्रेस, पंजाब मेल, सचखंड एक्सप्रेस',
    roadQuality: 'Western Dedicated Freight & NH48 / Delhi-Mumbai Expressway connector',
    tollEst: 'Train / Air Preferred'
  },
  hyderabad: {
    name: 'Hyderabad (हैदराबाद)',
    nameMr: 'हैदराबाद (६९० किमी)',
    nameHi: 'हैदराबाद (690 किमी)',
    distance: '690 km',
    duration: '11 hrs (Road) / 12 hrs (Train)',
    durationMr: '११ तास (रस्ता) / १२ तास (ट्रेन)',
    durationHi: '11 घंटे (सड़क) / 12 घंटे (ट्रेन)',
    route: 'NH65 & NH52 via Solapur, Ahmednagar to Nashik',
    routeMr: 'सोलापूर आणि अहिल्यानगर (अहमदनगर) मार्गे राष्ट्रीय महामार्ग ५२',
    routeHi: 'सोलापुर, अहिल्यानगर (अहमदनगर) होकर राष्ट्रीय राजमार्ग 52',
    trains: 'Devagiri Express, Hyderabad-Pune-Nashik links',
    trainsMr: 'देवगिरी एक्सप्रेस, हैदराबाद-नाशिक विशेष गाड्या',
    trainsHi: 'देवगिरि एक्सप्रेस, हैदराबाद-नासिक स्पेशल ट्रेन',
    roadQuality: 'Well-paved national highway corridor across Deccan plateau',
    tollEst: '₹680'
  },
  bengaluru: {
    name: 'Bengaluru (बंगळुरू)',
    nameMr: 'बंगळुरू (९९० किमी)',
    nameHi: 'बेंगलुरु (990 किमी)',
    distance: '990 km',
    duration: '16 hrs (Road) / Direct Flight to Mumbai/Shirdi',
    durationMr: '१६ तास (रस्ता) / मुंबई किंवा शिर्डी थेट विमान',
    durationHi: '16 घंटे (सड़क) / मुंबई या शिर्डी सीधी उड़ान',
    route: 'NH48 via Belagavi, Kolhapur, Pune to Nashik',
    routeMr: 'पुणे, सातारा, कोल्हापूर व बेळगाव मार्गे राष्ट्रीय महामार्ग ४८',
    routeHi: 'बेलगावी, कोल्हापुर, पुणे होकर राष्ट्रीय राजमार्ग 48',
    trains: 'Karnataka Express / Udyan Exp connecting via Kalyan',
    trainsMr: 'कर्नाटक एक्सप्रेस / कल्याण जंक्शनमार्गे लिंक गाड्या',
    trainsHi: 'कर्नाटक एक्सप्रेस / कल्याण होकर विशेष संपर्क ट्रेन',
    roadQuality: 'Golden Quadrilateral NH48 + Pune-Nashik highway',
    tollEst: '₹1,150'
  },
  indore: {
    name: 'Indore (इंदूर)',
    nameMr: 'इंदूर (४१५ किमी)',
    nameHi: 'इंदौर (415 किमी)',
    distance: '415 km',
    duration: '7 hrs 30 mins',
    durationMr: '७ तास ३० मिनिटे',
    durationHi: '7 घंटे 30 मिनट',
    route: 'NH52 via Dhamnod, Julwania, Sendhwa, Dhule to Nashik',
    routeMr: 'धुळे, सेंधवा, जुलवानिया मार्गे इंदूर-नाशिक राष्ट्रीय महामार्ग ५२',
    routeHi: 'धुले, सेंधवा, जुलवानिया होकर इंदौर-नासिक राजमार्ग 52',
    trains: 'Indore-Daund Superfast, Avantika link to Kalyan',
    trainsMr: 'इंदूर-दौंड सुपरफास्ट / अवंतिका एक्सप्रेस लिंक',
    trainsHi: 'इंदौर-दौंड सुपरफास्ट, अवंतिका एक्सप्रेस',
    roadQuality: '4-lane National Highway through Madhya Pradesh-Maharashtra border',
    tollEst: '₹420'
  }
};

/**
 * Generate Google Calendar 1-Click Link
 */
function getGoogleCalendarUrl(eventId, lang = 'en') {
  const event = SHAHI_SNAN_DATES.find(e => e.id === eventId);
  if (!event) return '#';

  const start = event.fullDate.replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = event.fullDate.replace(/[-:]/g, '').split('.')[0].replace(/T\d{6}/, 'T235959Z');

  const title = (lang === 'mr' ? event.titleMr : (lang === 'hi' ? event.titleHi : event.title)) + ' - Nashik Kumbh Mela';
  const desc = (lang === 'mr' ? event.descMr : (lang === 'hi' ? event.descHi : event.desc)) + ' | Muhurat: ' + (lang === 'mr' ? event.muhuratMr : (lang === 'hi' ? event.muhuratHi : event.muhurat));
  const location = (lang === 'mr' ? event.locationMr : (lang === 'hi' ? event.locationHi : event.location));

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(location)}`;
}

/**
 * Download a real iCalendar (.ics) file to add to Apple/Outlook Calendar
 */
function downloadIcsCalendar(eventId, lang = 'en') {
  const event = SHAHI_SNAN_DATES.find(e => e.id === eventId);
  if (!event) return;

  const startDate = event.fullDate.replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDate = event.fullDate.replace(/[-:]/g, '').split('.')[0].replace(/T\d{6}/, 'T235959Z');

  const title = (lang === 'mr' ? event.titleMr : (lang === 'hi' ? event.titleHi : event.title));
  const desc = (lang === 'mr' ? event.descMr : (lang === 'hi' ? event.descHi : event.desc));
  const location = (lang === 'mr' ? event.locationMr : (lang === 'hi' ? event.locationHi : event.location));

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nashik Simhastha Kumbh Mela//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:kumbh-${event.id}@nashikkumbh.org`,
    `SUMMARY:${title} - Nashik Kumbh Mela`,
    `DESCRIPTION:${desc.replace(/,/g, '\\,')} | Muhurat: ${event.muhurat}`,
    `LOCATION:${location}`,
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
window.getGoogleCalendarUrl = getGoogleCalendarUrl;
window.downloadIcsCalendar = downloadIcsCalendar;
