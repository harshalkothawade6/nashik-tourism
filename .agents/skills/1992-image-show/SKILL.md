---
name: 1992-image-show
description: >-
  Standardized prompt pattern, cel animation design system, and 2-by-2 pop-out interactive showcase architecture for 1992 Japanese anime cel artwork (Ramayana: The Legend of Prince Rama style) across the Nashik Kumbh Mela project.
---

# 1992 Anime Image Show & Cel Generation System

This skill defines the standardized image creation patterns, visual design rules, and interactive presentation mechanics for generating and displaying 1992 Japanese anime cel artwork (*Ramayana: The Legend of Prince Rama* style).

---

## 1. Image Creation Prompt Pattern

When generating mythological artwork or scene assets, follow this strict formula:

```text
Master 1992 Japanese anime cel animation production artwork of [SUBJECT / ITEM / SCENE] in the hand-painted style of Ramayana: The Legend of Prince Rama (1992).

[DETAILED SUBJECT SPECIFICATION]:
- Subject / Figures: [Specific deities, creatures, or sacred artifacts with authentic Vedic iconography]
- Attire & Silks: [Saffron orange silks, royal sapphire blue drapes, vermilion red accents, carved cel gold ornaments, pearl malas]
- Stance & Action: [Dynamic stance, surging from milky seafoam, celestial god rays, floating sparkles]

[ENVIRONMENT & WATER DYNAMICS]:
- Ocean / Stage: Churning milk ocean (Kshira Sagara) with frothing white gouache wave curls, stylized Japanese water crests, and dynamic sea spray specks.
- Lighting & Atmosphere: Dramatic celestial illumination, hand-painted watercolor clouds, warm radiant halos.

[MEDIUM & TECHNICAL ATTRIBUTES]:
- Traditional hand-inked black cel outlines, flat cel-shaded gouache palette, 2-tone cast shadows, 35mm cel film grain, 16:9 widescreen composition.
```

---

## 2. The 14 Ratnas (१४ रत्ने) 2-by-2 Pairing Architecture

The 14 divine treasures emerged chronologically from the churning ocean (Samudra Manthan) and are presented in 7 balanced pairs:

| Pair | Item A | Item B | Symbolic Theme | Cel Art Asset |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **हलाहल (Halahala)**<br>Cosmic venom swallowed by Lord Shiva | **कामधेनु (Kamadhenu)**<br>Wish-fulfilling sacred cow given to Rishis | Destruction & Sustenance | `assets/images/ratna_pair1.jpg` |
| **2** | **उच्चैःश्रवा (Uchhaishravas)**<br>7-headed flying celestial stallion | **ऐरावत (Airavata)**<br>4-tusked white elephant of Lord Indra | Speed & Sovereign Majesty | `assets/images/ratna_pair2.jpg` |
| **3** | **कौस्तुभ मणी (Kaustubha)**<br>Radiant chest gem of Lord Vishnu | **पारिजात (Parijata)**<br>Eternal fragrant heavenly flowering tree | Radiance & Eternal Fragrance | `assets/images/ratna_pair3.jpg` |
| **4** | **अप्सरा रंभा (Rambha)**<br>Celestial nymph of beauty and dance | **महालक्ष्मी (Maha Lakshmi)**<br>Goddess of divine fortune & prosperity | Beauty & Supreme Fortune | `assets/images/ratna_pair4.jpg` |
| **5** | **वारुणी (Varuni)**<br>Goddess of spirits given to Asuras | **चंद्र देव (Chandra)**<br>Cooling crescent moon adorning Shiva's crown | Spirit & Lunar Serenity | `assets/images/ratna_pair5.jpg` |
| **6** | **पाञ्चजन्य शंख (Shankha)**<br>Sacred conch shell of victory | **कल्पवृक्ष (Kalpavriksha)**<br>Wish-granting celestial tree of Moksha | Victory & Divine Manifestation | `assets/images/ratna_pair6.jpg` |
| **7** | **भगवान धन्वंतरी (Dhanvantari)**<br>Divine celestial physician | **अमृत कुंभ (Amrita Kumbh)**<br>Golden pot of immortality & Kumbh origin | Healing & Eternal Life | `assets/images/ratna_pair7.jpg` |

---

## 3. Pop-Out 2-by-2 Animation Blueprint (GSAP 3)

To display items emerging dynamically in pairs:

```javascript
// GSAP Bouncy Spring Pop-Out Animation (2-by-2 staggered)
gsap.fromTo(cardA,
  { scale: 0.6, y: 70, opacity: 0, rotation: -2 },
  { scale: 1, y: 0, opacity: 1, rotation: 0, duration: 0.55, ease: "back.out(1.6)" }
);

gsap.fromTo(cardB,
  { scale: 0.6, y: 70, opacity: 0, rotation: 2 },
  { scale: 1, y: 0, opacity: 1, rotation: 0, duration: 0.55, delay: 0.12, ease: "back.out(1.6)" }
);

// Decoupled Camera Shake (tremor on emergence)
function triggerCosmicEarthquake(intensity = 6.0) {
  gsap.fromTo("#quakeFlash", { opacity: 0.95 }, { opacity: 0, duration: 0.85, ease: "power2.out" });
  gsap.fromTo(["#cameraShakeRig", "#scene2ShakeRig"],
    { x: -intensity, y: intensity * 0.8, rotation: -0.5 },
    { x: intensity, y: -intensity * 0.8, rotation: 0.5, duration: 0.045, repeat: 9, yoyo: true, ease: "power1.inOut" }
  );
}
```

---

---

## 4. Master Image Rules
1. **Single Hooded Naga**: Vasuki must strictly feature ONE authentic king cobra hood (avoid 5 heads, avoid dragon horns/whiskers).
2. **Serpentine Tail**: The tail on the Deva side must be an authentic scaled serpentine tail with green/gold belly plates, not a plain yellow tube.
3. **Deva Attire**: Clad Devas in vibrant saffron-orange (`#FF7B25`), royal sapphire-blue (`#1E40AF`), vermilion, and gold borders.
4. **Zero-Tear Multiplane**: Anchor fulcrums at Lord Kurma's shell base (`960px 850px`) and decouple camera shake onto an outer wrapper `#cameraShakeRig`.

---

## 5. Cutout Generation & 1-by-1 3-Second Pop-Out Engine

### Cutout Assets Directory Structure
Cutouts are stored in `assets/images/cutouts/` in two standardized formats:
1. **Cel Medallion Tokens (`token_01_halahala.png` to `token_14_amritakumbh.png`)**: Circular 512x512 PNG with transparent alpha background, gold gouache rim ring (`#FFC233`), and cel black ink edge.
2. **Full Cel Cutouts (`cutout_01_halahala.png` to `cutout_14_amritakumbh.png`)**: Rectangular cel artwork captures of each isolated treasure.

### 3-Second Emergence Kinematics (GSAP)
Each of the 14 cutouts breaches the churning ocean center in a strict **3.0-second time frame**:
```javascript
// 1 by 1 Emergence in 3s Cycle
function showRatna(index, isAuto = true) {
  // 1. Camera tremor & golden particles burst from center vortex (0.0s)
  triggerCameraShake(3.2);

  // 2. Elastic Pop-Out from ocean base (0.0s -> 0.6s)
  gsap.fromTo(ratnaAnchor,
    { y: 150, scale: 0.2, opacity: 0, rotation: -5 },
    { y: 0, scale: 1.0, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.8)" }
  );

  // 3. Gentle celestial hover while displaying bilingual lore pill (0.6s -> 2.5s)
  gsap.to(ratnaAnchor, { y: -10, duration: 0.95, repeat: 1, yoyo: true, ease: "sine.inOut", delay: 0.6 });

  // 4. Ascend into heavens & dissolve (2.55s -> 2.95s)
  gsap.to(ratnaAnchor, { y: -65, scale: 1.12, opacity: 0, duration: 0.4, ease: "power2.in", delay: 2.55 });

  // 5. Trigger next item at 3.0s (3000ms)
  if (isAuto) setTimeout(() => showRatna(index + 1, true), 3000);
}
```

