# 🕉️ Nashik Simhastha Kumbh Mela Portal
> A breathtaking, traditional yet ultra-modern frontend website for **Nashik City** & the sacred **Simhastha Kumbh Mela**. Ready for instant **Vercel** and **Git** deployment.

---

## 🌟 Highlights & Features

- **Mesmerizing Traditional Aesthetic**:
  - Royal Marigold, Temple Gold, and Godavari Twilight Indigo color palette.
  - Devanagari flourishes, traditional toran arches, and floating sacred ember particle effects.
- **Dynamic Live Shahi Snan Countdown**:
  - Real-time countdown timer to the upcoming royal bathing day (*Shravan Purnima*).
- **Sacred Bathing Dates & Rituals Calendar**:
  - Categorized calendar covering Dhwajarohan, 1st Shahi Snan, Maha Shahi Snan, 3rd Shahi Snan, Kushavarta Parvani, and Samapti.
  - Instant **.ics calendar file export** to add any Shahi Snan date directly into Google Calendar, Apple Calendar, or Outlook.
- **Virtual Diya Arpan (दीपदान) Interactive Experience**:
  - Interactive HTML5 river canvas with flowing water ripple physics and floating diya candles.
  - Choose between Panchdhatu Brass, Kamal (Lotus), or Marigold leaf diyas.
  - Devotees can enter their family gotra/name and prayer blessing to float an illuminated lamp into the Godavari.
- **Web Audio API Sacred Soundscape**:
  - Self-contained, realistic Tibetan bronze temple bell chime and meditative river drone (no external mp3 files required).
- **Spots to Visit in Nashik (दर्शनीय स्थळे)**:
  - High-res photography and interactive filterable guides for:
    - *Trimbakeshwar Jyotirlinga (10th Jyotirlinga)*
    - *Ramkund Ghat & Godavari Evening Maha Aarti*
    - *Shree Kalaram Mandir & Sita Gufa (Panchavati)*
    - *Anjaneri Hills (Birthplace of Lord Hanuman)*
    - *Pandavleni Rock-Cut Buddhist Caves (2nd Century BCE)*
    - *Sula Vineyards & Gangapur Lakeside (Wine Capital)*
    - *The Legendary Nashik Chulivarchi Misal Trail*
  - Interactive modal dialogs with timings, dress codes, entry fees, and direct Google Maps navigation links.
- **Comprehensive Travel Guide & Journey Estimator**:
  - Air (Ozar Airport ISK), Rail (Nashik Road NK), Expressways (Samruddhi Mahamarg & NH160), and free Kumbh EV shuttle corridors.
  - Interactive distance & travel time calculator for 8 major Indian cities (Mumbai, Pune, Shirdi, Surat, Delhi, Hyderabad, Bengaluru, Indore).
- **Pilgrim Amenities & 24/7 Helplines**:
  - Emergency contacts for Kumbh Control Room (1077), Police SOS (112), and Medical Ambulance (108).
- **Multilingual Support**:
  - Seamless toggle between English and Marathi (मराठी).

---

## 🚀 How to Run Locally

You can preview the website locally using Python (built into Windows):

```powershell
# Navigate into the project directory
cd "C:\Users\Lenovo\.gemini\antigravity-ide\scratch\nashik-kumbhmela"

# Start the local server
python -m http.server 3000
```
Open your browser at `http://localhost:3000`.

---

## 🐙 How to Push to Git & GitHub

1. Open your terminal in this project folder:
   ```bash
   cd "C:\Users\Lenovo\.gemini\antigravity-ide\scratch\nashik-kumbhmela"
   ```
2. Initialize git and make your first commit:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Nashik Simhastha Kumbh Mela Web Portal"
   ```
3. Create a new repository on [GitHub](https://github.com/new) named `nashik-kumbhmela`.
4. Link and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/nashik-kumbhmela.git
   git push -u origin main
   ```

---

## ▲ How to Deploy on Vercel

### Method 1: Via GitHub (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Click **"Import Project"** and select your `nashik-kumbhmela` repository from GitHub.
3. Keep default settings (Framework: *Other*, Root Directory: `./`).
4. Click **Deploy**. Vercel will deploy the site in ~10 seconds with a free `.vercel.app` domain and automatic SSL!

### Method 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📁 Project Structure

```
nashik-kumbhmela/
├── index.html               # Main semantic, SEO-optimized webpage
├── vercel.json              # Vercel configuration for static routing & headers
├── package.json             # Project metadata & start scripts
├── .gitignore               # Ignored system & node files
├── README.md                # Comprehensive documentation
├── css/
│   ├── variables.css        # Spiritual gold, saffron & twilight palette tokens
│   ├── main.css             # Navigation, hero, typography & animations
│   └── kumbh.css            # Dates, diya experience, spots & travel styles
├── js/
│   ├── audio.js             # Web Audio API bronze bell & river stream synth
│   ├── diya-canvas.js       # Interactive Godavari river diya float simulation
│   ├── planner.js           # Datasets for dates, spots, transit & .ics export
│   └── app.js               # Main UI controller, filters, modals & countdown
└── assets/
    └── images/              # High-resolution generated visual assets
        ├── ramkund_aarti.jpg
        ├── trimbakeshwar.jpg
        ├── kalaram_panchavati.jpg
        ├── anjaneri.jpg
        ├── pandavleni.jpg
        ├── sula_vineyard.jpg
        └── misal_pav.jpg
```
