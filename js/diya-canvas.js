/**
 * Virtual Diya Arpan (दीपदान) - Godavari River Canvas Simulation
 * Simulates gentle river current, water reflection ripples, flickering oil lamps, and floating prayers
 */

class DiyaRiverSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.diyas = [];
    this.waterParticles = [];
    this.prayersCount = 48924;
    this.animationFrameId = null;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.initBackgroundDiyas();
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width || 700;
    this.height = this.canvas.height = 440;
  }

  initBackgroundDiyas() {
    this.diyas = [];
    // Pre-populate with serene ambient diyas drifting in river perspective
    const count = Math.min(32, Math.floor(this.width / 22));
    for (let i = 0; i < count; i++) {
      this.diyas.push(this.createDiya({
        x: Math.random() * this.width,
        y: Math.random() * (this.height - 40) + 20,
        speed: 0.35 + Math.random() * 0.45,
        type: ['brass', 'lotus', 'marigold'][Math.floor(Math.random() * 3)],
        scale: 0.5 + Math.random() * 0.6,
        isCustom: false
      }));
    }
  }

  createDiya({ x, y, speed = 0.5, type = 'brass', scale = 1.0, devotee = '', prayer = '', isCustom = false }) {
    return {
      x,
      y,
      speed,
      type,
      scale: isCustom ? 1.25 : scale,
      devotee,
      prayer,
      isCustom,
      bobOffset: Math.random() * Math.PI * 2,
      flicker: Math.random(),
      flameSize: 1.0,
      opacity: 0,
      targetOpacity: 1,
      life: 0
    };
  }

  addDevoteeDiya(devoteeName, prayerWish, diyaType) {
    // Add custom diya at right-bottom quadrant starting point
    const newDiya = this.createDiya({
      x: this.width * 0.85,
      y: this.height * 0.72 + (Math.random() * 40 - 20),
      speed: 0.42,
      type: diyaType || 'brass',
      scale: 1.35,
      devotee: devoteeName || 'श्रद्धाळू भाविक',
      prayer: prayerWish || 'सर्व सुख, शांती व आरोग्य लाभो',
      isCustom: true
    });

    this.diyas.unshift(newDiya);
    this.prayersCount++;
    this.updateCounterDisplay();

    // Trigger sacred bell chime
    if (window.sacredAudio) {
      window.sacredAudio.playTempleBell(432, 4.0);
    }

    // Spawn water splash ripple particles
    for (let i = 0; i < 12; i++) {
      this.waterParticles.push({
        x: newDiya.x,
        y: newDiya.y + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 2 + Math.random() * 3,
        alpha: 0.9,
        color: '#fde68a'
      });
    }
  }

  updateCounterDisplay() {
    const counterEl = document.getElementById('totalDiyaCount');
    if (counterEl) {
      counterEl.textContent = this.prayersCount.toLocaleString();
    }
  }

  bindEvents() {
    // Click on canvas to float a quick blessing diya
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.x;
      const clickY = e.clientY - rect.y;

      // Only allow in the river water area
      if (clickY > 40) {
        this.addDevoteeDiya('पुण्यवान भाविक', 'हर हर गंगे, गोदावरी माते की जय', 'brass');
      }
    });
  }

  startLoop() {
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      this.update(time);
      this.render(time);

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  update(time) {
    const t = time * 0.002;

    // Update diyas
    for (let i = this.diyas.length - 1; i >= 0; i--) {
      const d = this.diyas[i];
      d.life += 0.016;

      // Gentle river flow from right to left with natural meandering
      d.x -= d.speed;
      d.y += Math.sin(t + d.bobOffset) * 0.25;

      // Fade in smoothly
      if (d.opacity < d.targetOpacity) {
        d.opacity += 0.03;
      }

      // Flame flicker
      d.flicker = 0.85 + Math.sin(time * 0.01 + d.bobOffset * 3) * 0.15;

      // Reset ambient diyas that drift off screen left
      if (d.x < -60) {
        if (!d.isCustom) {
          d.x = this.width + 40;
          d.y = Math.random() * (this.height - 50) + 25;
          d.scale = 0.5 + (d.y / this.height) * 0.7; // Depth perspective
        } else {
          this.diyas.splice(i, 1);
        }
      }
    }

    // Update splash particles
    for (let i = this.waterParticles.length - 1; i >= 0; i--) {
      const p = this.waterParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
      if (p.alpha <= 0) {
        this.waterParticles.splice(i, 1);
      }
    }
  }

  render(time) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // 1. Draw River Deep Twilight Water Gradient
    const riverGrad = ctx.createLinearGradient(0, 0, 0, h);
    riverGrad.addColorStop(0, '#040b18');
    riverGrad.addColorStop(0.3, '#07162e');
    riverGrad.addColorStop(0.7, '#0a1d3d');
    riverGrad.addColorStop(1, '#051125');

    ctx.fillStyle = riverGrad;
    ctx.fillRect(0, 0, w, h);

    // 2. Draw Gentle Water Ripples / Godavari Current
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1.2;
    for (let y = 30; y < h; y += 22) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 15) {
        const rippleY = y + Math.sin(x * 0.02 + time * 0.0015 + y) * 3;
        if (x === 0) ctx.moveTo(x, rippleY);
        else ctx.lineTo(x, rippleY);
      }
      ctx.stroke();
    }
    ctx.restore();

    // 3. Sort diyas by Y coordinate for realistic depth sorting
    this.diyas.sort((a, b) => a.y - b.y);

    // 4. Render each diya
    this.diyas.forEach(diya => {
      this.drawDiya(diya, time);
    });

    // 5. Render water particles
    this.waterParticles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  drawDiya(diya, time) {
    const ctx = this.ctx;
    const { x, y, scale, type, devotee, prayer, isCustom, opacity, flicker } = diya;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    // A. Sacred Golden Glow Radius on River Water
    const glowRadius = 38 * flicker;
    const glowGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, glowRadius);
    glowGrad.addColorStop(0, 'rgba(255, 170, 0, 0.55)');
    glowGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.22)');
    glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

    ctx.fillStyle = glowGrad;
    ctx.beginPath();
    ctx.ellipse(0, 4, glowRadius, glowRadius * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // B. Diya Base / Vessel
    if (type === 'lotus') {
      // Lotus Petals Base
      ctx.fillStyle = '#f43f5e';
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.ellipse(0, 6, 8, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Inner Cup
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(0, 2, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (type === 'marigold') {
      // Marigold Garland Ring Base
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3.5);
        ctx.beginPath();
        ctx.arc(7, 2, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Clay Diya Cup
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.ellipse(0, 2, 7, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Traditional Brass Diya Cup
      const brassGrad = ctx.createLinearGradient(-10, 0, 10, 6);
      brassGrad.addColorStop(0, '#fef08a');
      brassGrad.addColorStop(0.5, '#d97706');
      brassGrad.addColorStop(1, '#78350f');

      ctx.fillStyle = brassGrad;
      ctx.beginPath();
      ctx.moveTo(-11, 0);
      ctx.bezierCurveTo(-9, 8, 9, 8, 11, 0);
      ctx.bezierCurveTo(7, -2, -7, -2, -11, 0);
      ctx.fill();
    }

    // C. Flickering Flame
    const flameH = (12 + Math.sin(time * 0.02 + diya.bobOffset) * 2.5) * flicker;
    const flameW = 4.5 * flicker;

    // Outer flame (Orange-Red)
    ctx.fillStyle = '#ff5722';
    ctx.beginPath();
    ctx.moveTo(0, -flameH);
    ctx.bezierCurveTo(flameW * 1.5, -flameH * 0.4, flameW, 0, 0, 0);
    ctx.bezierCurveTo(-flameW, 0, -flameW * 1.5, -flameH * 0.4, 0, -flameH);
    ctx.fill();

    // Inner core (Bright Yellow-Gold)
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(0, -flameH * 0.85);
    ctx.bezierCurveTo(flameW * 0.7, -flameH * 0.35, flameW * 0.5, 0, 0, 0);
    ctx.bezierCurveTo(-flameW * 0.5, 0, -flameW * 0.7, -flameH * 0.35, 0, -flameH * 0.85);
    ctx.fill();

    // Hot center wick spark
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, -flameH * 0.25, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // D. Custom Devotee Tag
    if (isCustom && devotee) {
      ctx.restore(); // Exit scale/rotation for crisp text
      ctx.save();
      ctx.translate(x, y - (24 * scale));

      // Tooltip pill background
      ctx.fillStyle = 'rgba(8, 14, 27, 0.85)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1;

      const tagText = `${devotee}: "${prayer.slice(0, 24)}..."`;
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
      const textWidth = ctx.measureText(tagText).width;

      ctx.beginPath();
      ctx.roundRect(-textWidth / 2 - 8, -18, textWidth + 16, 20, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fde68a';
      ctx.textAlign = 'center';
      ctx.fillText(tagText, 0, -4);
      ctx.restore();
      return;
    }

    ctx.restore();
  }
}

window.DiyaRiverSimulation = DiyaRiverSimulation;
