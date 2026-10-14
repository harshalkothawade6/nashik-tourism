/**
 * Sacred Audio Synthesizer (Web Audio API)
 * Generates realistic temple bronze bell chimes and ambient river acoustics
 * 100% self-contained with zero external file dependencies
 */

class SacredAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingAmbient = false;
    this.riverGain = null;
    this.droneGain = null;
    this.noiseNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Ring a resonant Sacred Bronze Temple Bell
  playTempleBell(freq = 432, duration = 3.5) {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Fundamental strike + harmonic overtones (Bells have rich inharmonic partials)
    const partials = [
      { ratio: 1.0, gain: 0.6, decay: duration },
      { ratio: 2.02, gain: 0.35, decay: duration * 0.8 },
      { ratio: 3.14, gain: 0.25, decay: duration * 0.6 },
      { ratio: 4.42, gain: 0.18, decay: duration * 0.4 },
      { ratio: 6.18, gain: 0.1, decay: duration * 0.25 }
    ];

    const masterBellGain = this.ctx.createGain();
    masterBellGain.gain.setValueAtTime(0.7, now);
    masterBellGain.connect(this.ctx.destination);

    partials.forEach(({ ratio, gain, decay }) => {
      const osc = this.ctx.createOscillator();
      const partialGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * ratio, now);

      // Strike attack and smooth exponential decay
      partialGain.gain.setValueAtTime(0.001, now);
      partialGain.gain.exponentialRampToValueAtTime(gain, now + 0.015);
      partialGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(partialGain);
      partialGain.connect(masterBellGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  // Toggle ambient sacred river breeze & meditative drone
  toggleAmbient(buttonEl) {
    this.init();

    if (this.isPlayingAmbient) {
      this.stopAmbient();
      if (buttonEl) {
        buttonEl.classList.remove('playing');
        buttonEl.querySelector('.audio-label').textContent = 'Temple Sound';
      }
      return false;
    } else {
      this.startAmbient();
      this.playTempleBell(432, 4.0);
      if (buttonEl) {
        buttonEl.classList.add('playing');
        buttonEl.querySelector('.audio-label').textContent = 'Sounding (Mute)';
      }
      return true;
    }
  }

  startAmbient() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // 1. Soothing Godavari River White/Pink Noise filter
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.15;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Filter to sound like flowing holy river water
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(0.8, now);

    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.001, now);
    this.riverGain.gain.exponentialRampToValueAtTime(0.08, now + 2);

    this.noiseNode.connect(filter);
    filter.connect(this.riverGain);
    this.riverGain.connect(this.ctx.destination);
    this.noiseNode.start();

    // 2. Meditative Om Drone (Tanpura / Drone chord: D 146.8Hz + A 220Hz)
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.001, now);
    this.droneGain.gain.exponentialRampToValueAtTime(0.04, now + 3);

    const freq1 = 146.83; // D3
    const freq2 = 220.00; // A3

    [freq1, freq2].forEach(f => {
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);
      osc.connect(this.droneGain);
      osc.start();
      this.droneOscs = this.droneOscs || [];
      this.droneOscs.push(osc);
    });

    this.droneGain.connect(this.ctx.destination);
    this.isPlayingAmbient = true;
  }

  stopAmbient() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.riverGain) {
      this.riverGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        if (this.noiseNode) {
          try { this.noiseNode.stop(); } catch(e){}
        }
      }, 1000);
    }

    if (this.droneGain) {
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        if (this.droneOscs) {
          this.droneOscs.forEach(osc => { try { osc.stop(); } catch(e){} });
          this.droneOscs = [];
        }
      }, 1000);
    }

    this.isPlayingAmbient = false;
  }
}

window.sacredAudio = new SacredAudioEngine();
