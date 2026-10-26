# 🕉️ Nashik Simhastha Kumbh Mela — Master Project Specification & Prompt Archive

> **Status:** Active & Updated  
> **Last Synchronized:** October 22, 2026 (Restored after abrupt IDE shutdown)  
> **Files Covered:** [`index.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/index.html), [`samudra_manthan_scene.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/samudra_manthan_scene.html), [`story_chapter1_hybrid.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/story_chapter1_hybrid.html), [`js/ram-yatra.js`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/js/ram-yatra.js), [`css/kumbh.css`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/css/kumbh.css)

---

## 1. Master Portal Specification & Refinements

### A. Core Architecture & Visual Theme
- **Default Theme**: **Vedic Parampara (Heritage Mode)** by default, with instant toggles for *Ratri Prakash (Dark)* and *Divya Prakash (Light)*.
- **Trilingual Support**: English, Marathi (मराठी), and Hindi (हिन्दी).
- **Geolocation-Aware Language Detection**: Automatically detects user location in India (Maharashtra -> Marathi; North India -> Hindi; International/Other -> English) with manual override.
- **Micro-Interactions & Brand Identity**:
  - **Ram-Sita-Lakshman 2D Walking Yatra Preloader**: Custom animated silhouettes of Lord Ram, Mata Sita, and Lakshman walking through Panchavati, built in [`js/ram-yatra.js`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/js/ram-yatra.js).
  - **Sacred Footprint Cursor Trail (चरण पादुका)**: Interactive cursor trail leaving alternating left/right auspicious footsteps that smoothly dissolve over 2–3 seconds.
  - **Light Mode Readability**: High-contrast typography and enhanced card shadow overlays to preserve legibility against ivory backgrounds.

---

## 2. Japanese 90s Anime Style Animated Explainer — "Origins of Kumbh Mela"
*(Integrated into [`story_chapter1_hybrid.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/story_chapter1_hybrid.html) & [`samudra_manthan_scene.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/samudra_manthan_scene.html))*

- **Aesthetic Benchmark**: 1992 Indo-Japanese animation classic *"Ramayana: The Legend of Prince Rama"* (directed by Yugo Sako & Ram Mohan).
- **Color & Style**: Deep lapis lazuli cosmic blues, warm saffron golds, frothing milky turquoise waters, cel-shaded highlights, dark contours (#2A1810), and sunset twilight hues.
- **4-Scene Storyboard**:
  1. **Scene 1: Samudra Manthan**: Mount Mandara as churning rod, King Vasuki as the churning rope, Devas and Asuras in tug-of-war.
  2. **Scene 2: Emergence of Amrit Kumbh**: Lord Dhanvantari rises with the divine golden vessel.
  3. **Scene 3: Celestial Pursuit & 4 Sacred Drops**: Garuda soars across the cosmos clutching the Kumbh; 4 drops fall upon **Haridwar, Ujjain, Nashik, and Prayagraj**.
  4. **Scene 4: The Eternal Gathering**: Starlit Godavari riverbank with floating illuminated diyas and planetary alignment.

---

## 3. High-Fidelity Samudra Manthan Scene (Pure SVG + GSAP Kinematics)
*(Implemented in [`samudra_manthan_scene.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/samudra_manthan_scene.html))*

### Exact Prompt Specification (Captured from Pre-Crash Session):

```markdown
Rebuild the Samudra Manthan scene using pure SVG vectors and GSAP (via CDN) inside a single, self-contained HTML file:

1. Visual Direction (1992 Japanese Anime Cel Style):
   - Strict 1992 'Ramayana: The Legend of Prince Rama' aesthetic: dark ink outlines (#2A1810, 2-3px) and 2-tone hard-edged cel shading.
   - Layout & Position Correction:
     * Asuras on the LEFT holding the serpent's hissing head (breathing faint venom particles).
     * Devas on the RIGHT holding the golden tail.
     * Single unified serpent body (fixed prior double-tail artifact).

2. SVG Path Architecture & Dynamic Morphing:
   - Vasuki Path Morphing: Model King Vasuki with bezier paths (`d` attribute). Use GSAP to morph tension states:
     * State A (Asuras pull): Serpent stretches taut to the left, relaxing right coils.
     * State B (Devas pull): Serpent stretches taut to the right, relaxing left coils.
   - Character Rigging: Sync SVG groups with the tug cycle:
     * `#asuras`: Lean back -4° on pull stroke (transform-origin: bottom center).
     * `#devas`: Lean back +4° on pull stroke (transform-origin: bottom center).

3. Advanced Water & Environmental Effects:
   - Dynamic Churn Vortex: Animated SVG circular foam ring at the pivot base of Mount Mandara expanding/contracting with displacement to ground the mountain deeper into the sea.
   - Layered Wave Splashes: Morphing wave crests crashing against the central mountain with SVG water droplet particle bursts.
   - Specular Venom Glow: Pulsing purple light filter/glow cast onto the faces and armor of the lead Asuras from Vasuki's venom mist.
   - Camera Dynamics:
     * Ken Burns Camera Drift: Subtle, slow horizontal camera drift across the scene for cinematic 90s film feel.
     * Tension Shake Impulse: 1-2px SVG viewport shake impulse at peak pull tension.

4. UI & Controls:
   - Floating glassmorphism dock: Play/Pause, Replay, Speed (1x / 1.5x), and Scene Progress Bar.
   - Auto-fade: Hide header and controls after 3 seconds of inactivity; restore on mouse move.
   - Clean serif header ('Cinzel') with bilingual subtitles (English + Marathi/Hindi).
   - Fully responsive `viewBox="0 0 1920 1080"` with zero external image dependencies.
```

---

## 4. Prompt Evolution & Session History Log

| Step / Date | Origin Session | Prompt / Directive | Status |
| :--- | :--- | :--- | :--- |
| **Oct 14** | `b0a0a221` | Initial portal setup, traditional Kumbh theme, spots, travel, .ics calendar export | ✅ Live in `index.html` |
| **Oct 15** | `3f972a89` | Dark/Light mode toggle, Git repository push, Vercel configuration | ✅ Deployed on Vercel |
| **Oct 22 (19:25)** | `37723a57` | Heritage default theme, Hindi language support, auto geolocation detect, Ram-Sita-Lakshman walking preloader, footprint trail | ✅ Implemented in `index.html` & `ram-yatra.js` |
| **Oct 22 (20:50)** | `7ba87f43` (Step 0–165) | 1992 Indo-Japanese Anime style Kumbh Origin Story | ✅ Replaced by `story_chapter1_hybrid.html` |
| **Oct 22 (21:30)** | `7ba87f43` (Step 240) | Swap sides: Asuras on Left (Head), Devas on Right (Tail); add rhythmic tug-of-war motion; glassmorphism controls | ✅ Integrated in `samudra_manthan_scene.html` |
| **Oct 22 (21:45)** | `7ba87f43` (Step 310) | Fix double-tail glitch; add circular foam vortex around Mandara pivot base; add Ken Burns camera drift | ✅ Integrated in `samudra_manthan_scene.html` |
| **Oct 22 (22:00)** | `7ba87f43` (Step 462) | Rebuild pure SVG vector + GSAP kinematics version of Samudra Manthan with path morphing and venom glow | ✅ Generated in `samudra_manthan_scene.html` |
| **Oct 23 (19:55)** | `7e6317f9` | Hybrid Visual Storytelling: SBS Scrollytelling + Spline 3D Diorama + Lusion Fluid FX for Chapter 1 | ✅ Built in `story_chapter1_hybrid.html` |
| **Oct 23 (20:15)** | `7e6317f9` | Remove unmoving duplicate backdrop image; eliminate ghosting/double objects; add kinetic elongation & subtitle toggle | ✅ Refined in `story_chapter1_hybrid.html` |
| **Oct 23 (20:25)** | `7e6317f9` | Restore authentic left/right painted anime sky with `manthan_clean_sky_bg.jpg`; reduce motion to subtle micro-kinetics | ✅ Refined in `story_chapter1_hybrid.html` |
| **Oct 23 (20:31)** | `7e6317f9` | Revert background to original `manthan_bg_corrected.jpg` as requested; retain reduced micro-kinetics | ✅ Restored in `story_chapter1_hybrid.html` |
| **Oct 23 (20:35)** | `7e6317f9` | Remove pull meter bar; add 2-cycle automated tug demonstration on entrance | ✅ Implemented in `story_chapter1_hybrid.html` |

---

## 5. Verification & Next Steps Checklist

- [x] Recover all missed prompts from local session logs (`transcript.jsonl`).
- [x] Document the complete master prompt and SVG/GSAP kinematics specification in `antigravity_kumbhmela_spec.md`.
- [x] Verify integrity of [`samudra_manthan_scene.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/samudra_manthan_scene.html) and [`story_chapter1_hybrid.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/story_chapter1_hybrid.html).
- [x] Connect [`samudra_manthan_scene.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/samudra_manthan_scene.html) and [`story_chapter1_hybrid.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/story_chapter1_hybrid.html) directly into main [`index.html`](file:///c:/Users/Lenovo/Documents/nashik-kumbhmela/index.html).