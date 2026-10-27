# Nashik Kumbh Mela - Master Automated Testing Suite

Comprehensive end-to-end automated test harness for the Nashik Simhastha Kumbh Mela web portal.

## 🌟 Overview & Capabilities

This test suite runs headless Google Chrome via the **Chrome DevTools Protocol (CDP)** over WebSockets. It tests real user interactions, physics engines, SVG transforms, dynamic themes, languages, and viewports with zero browser-driver friction (no webdriver/selenium setup required).

### Test Coverage

1. **Main Portal (`index.html`)**:
   - Tri-lingual localization (Marathi, English, Hindi)
   - Visual theme transitions (Heritage, Dark, Light)
   - Virtual Diya Arpan live count increment & form validation
   - Live Shahi Snan countdown timer
   - Hero CTA & navigation routing
   - Responsive viewports: Desktop (1920×1080), Tablet (768×1024), Mobile (390×844)
   - Mobile hamburger drawer open/close state

2. **Chapter 1: Samudra Manthan & 14 Ratnas (`story_chapter1_hybrid.html`)**:
   - Scene 1 3D Multiplane Kinematics & Mount Mandara camera presets
   - Scene 2 cosmic earthquake shockwave & transition
   - 2-by-2 pop-out emergence of all 7 pairs with GSAP spring physics
   - **Strict Verification of Uchhaishravas featuring 7 distinct heads**
   - **Panoramic Overview Mode**: All 14 Ratnas rendered simultaneously in native SVG
   - Interactive SVG node selection updating Card A & Card B dynamically
   - **Zero AI mismatch**: Master base image strictly locked to `assets/images/manthan_bg_corrected.jpg`
   - Responsive layouts across Desktop, Tablet, and Mobile vertical stack

3. **3D Manthan Scene (`samudra_manthan_scene.html`)**:
   - 3D harmonic camera rig
   - All 14 Ratnas SVG mode
   - 3.0s individual ratna emergence cycle
   - Mobile responsiveness

4. **Console Health**:
   - Real-time exception listener ensuring **0 JavaScript runtime exceptions**.

---

## 🚀 How to Run

### 1. Prerequisites
Ensure the local server is running:
```bash
npm start
# or: python -m http.server 3000
```

Install test dependencies (if not already installed):
```bash
pip install websockets requests
```

### 2. Execute Tests
Using npm:
```bash
npm test
```

Using Python directly:
```bash
python tests/run_full_site_test.py
```

### 3. Optional Flags
- `--url <URL>`: Set custom local or staging URL (default: `http://localhost:3000`).
- `--screenshots-dir <PATH>`: Custom directory for captured PNGs.
- `--no-headless`: Launch Chrome with a visible window to watch tests run live.

---

## 📸 Generated Screenshots
Test screenshots are automatically captured and saved in `tests/screenshots/` (git-ignored to keep repo light):
- `test_index_desktop_1920.png`
- `test_index_tablet_768.png`
- `test_index_mobile_drawer_390.png`
- `test_story_scene1_desktop.png`
- `test_story_pair1_halahala_kamadhenu.png`
- `test_story_pair2_uchhaishravas_7heads.png`
- `test_story_pair7_amritakumbh.png`
- `test_story_overview_14ratnas_desktop.png`
- `test_story_scene2_tablet_768.png`
- `test_story_scene2_mobile_390.png`
- `test_manthan_scene_svg14_desktop.png`
- `test_manthan_scene_emergence_3s.png`
- `test_manthan_scene_mobile_390.png`
