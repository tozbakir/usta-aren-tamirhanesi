// Usta Aren'in Çılgın Tamirhanesi - Ses & Türkçe Konuşma Motoru

class ArenAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.trVoice = null;
    this.lastSpeechTime = 0;
    this.hornIndex = 0;
    this.initVoices();
  }

  initVoices() {
    if (!('speechSynthesis' in window)) return;
    const pickTurkishVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      this.trVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('tr') && v.name.toLowerCase().includes('yelda')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('tr')) ||
        null;
    };
    pickTurkishVoice();
    window.speechSynthesis.onvoiceschanged = pickTurkishVoice;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.enabled = !this.enabled;
    if (!this.enabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return this.enabled;
  }

  speak(text, force = false) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    const now = performance.now();
    // Avoid cutting off speech if Aren is tapping super fast, unless forced
    if (!force && now - this.lastSpeechTime < 1900) return;
    this.lastSpeechTime = now;

    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'tr-TR';
      if (this.trVoice) {
        utter.voice = this.trVoice;
      }
      utter.rate = 1.02;
      utter.pitch = 1.12;
      utter.volume = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (_) {
      // Ignore speech synthesis errors on restricted webviews
    }
  }

  // 1. SÜPER MATKAP SESİ (Vıııınnn - Zzzzt!)
  playDrill() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const mod = this.ctx.createOscillator();
    const modGain = this.ctx.createGain();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(390, now + 0.22);
    osc.frequency.setValueAtTime(420, now + 0.22);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.42);

    mod.type = 'square';
    mod.frequency.setValueAtTime(48, now);
    modGain.gain.setValueAtTime(45, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.24, now + 0.05);
    gain.gain.setValueAtTime(0.24, now + 0.32);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);

    mod.connect(modGain);
    modGain.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    mod.start(now);
    osc.stop(now + 0.45);
    mod.stop(now + 0.45);
  }

  // 2. DEV ÇEKİÇ SESİ (GÜM + Komik Yay Boing!)
  playHammer() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Heavy impact thud
    const thud = this.ctx.createOscillator();
    const thudGain = this.ctx.createGain();
    thud.type = 'triangle';
    thud.frequency.setValueAtTime(160, now);
    thud.frequency.exponentialRampToValueAtTime(36, now + 0.18);
    thudGain.gain.setValueAtTime(0.45, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(now);
    thud.stop(now + 0.21);

    // Cartoon spring boing
    const boing = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const boingGain = this.ctx.createGain();

    boing.type = 'sine';
    boing.frequency.setValueAtTime(220, now + 0.06);
    boing.frequency.exponentialRampToValueAtTime(520, now + 0.38);

    lfo.frequency.setValueAtTime(28, now + 0.06);
    lfoGain.gain.setValueAtTime(85, now + 0.06);

    boingGain.gain.setValueAtTime(0.22, now + 0.06);
    boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    lfo.connect(lfoGain);
    lfoGain.connect(boing.frequency);
    boing.connect(boingGain);
    boingGain.connect(this.ctx.destination);

    boing.start(now + 0.06);
    lfo.start(now + 0.06);
    boing.stop(now + 0.43);
    lfo.stop(now + 0.43);
  }

  // 3. İNGİLİZ ANAHTARI SESİ (Cırk-Cırk-Çinng!)
  playWrench() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const clickTimes = [0, 0.08, 0.16];

    clickTimes.forEach((offset, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(600 + idx * 140, now + offset);
      osc.frequency.exponentialRampToValueAtTime(1200, now + offset + 0.045);

      gain.gain.setValueAtTime(0.18, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.055);
    });

    // Bright completion ding
    const ding = this.ctx.createOscillator();
    const dingGain = this.ctx.createGain();
    ding.type = 'sine';
    ding.frequency.setValueAtTime(1046.5, now + 0.24); // C6
    dingGain.gain.setValueAtTime(0.25, now + 0.24);
    dingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);
    ding.connect(dingGain);
    dingGain.connect(this.ctx.destination);
    ding.start(now + 0.24);
    ding.stop(now + 0.6);
  }

  // 4. ÇILGIN BOYA & ÇIKARTMA SESİ (Fısss + Baloncuk Pop!)
  playPaint() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.055);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, now + i * 0.055 + 0.08);

      gain.gain.setValueAtTime(0.2, now + i * 0.055);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.055 + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.055);
      osc.stop(now + i * 0.055 + 0.095);
    });
  }

  // 5. ÇILGIN PARÇA TAKMA SESİ (Slide Whistle + Tada!)
  playWacky() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const slide = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    slide.type = 'triangle';
    slide.frequency.setValueAtTime(240, now);
    slide.frequency.exponentialRampToValueAtTime(920, now + 0.22);
    slide.frequency.exponentialRampToValueAtTime(520, now + 0.34);
    slide.frequency.exponentialRampToValueAtTime(1040, now + 0.48);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);

    slide.connect(gain);
    gain.connect(this.ctx.destination);
    slide.start(now);
    slide.stop(now + 0.54);
  }

  // 6. KÖPÜK & KOMİK KORNA SESLERİ (Her basışta farklı komik korna!)
  playHorn() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const style = this.hornIndex % 4;
    this.hornIndex += 1;

    if (style === 0) {
      // Klasik İki Tonlu Araba Kornası (DÜT-DÜÜÜT!)
      [0, 0.16].forEach((t, idx) => {
        const dur = idx === 0 ? 0.11 : 0.28;
        [349.23, 440].forEach((freq) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + t);
          gain.gain.setValueAtTime(0.16, now + t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + dur);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + t);
          osc.stop(now + t + dur + 0.02);
        });
      });
    } else if (style === 1) {
      // Polis / İtfaiye Sireni (Vİİ-VUU-Vİİ-VUU!)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.linearRampToValueAtTime(920, now + 0.18);
      osc.frequency.linearRampToValueAtTime(620, now + 0.36);
      osc.frequency.linearRampToValueAtTime(920, now + 0.52);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.56);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    } else if (style === 2) {
      // Komik Ördek Kornası (VAK-VAK!)
      [0, 0.15].forEach((t) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, now + t);
        osc.frequency.exponentialRampToValueAtTime(260, now + t + 0.11);
        gain.gain.setValueAtTime(0.24, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + t);
        osc.stop(now + t + 0.13);
      });
    } else {
      // Koca Tren / Gemi Düdüğü (ÇUF-ÇUUUUF!)
      [220, 277.18, 329.63].forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.52);
      });
    }
  }

  // AFACAN MODU (Çamur & Bozma Sesi)
  playMischief() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(85, now + 0.38);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.44);
  }

  // KUTU DEVİRME & ZIPLAMA SESİ (Test Sürüşü)
  playSmash() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + i * 0.045);
      gain.gain.setValueAtTime(0.22, now + i * 0.045);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.045 + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.045);
      osc.stop(now + i * 0.045 + 0.18);
    });
  }

  // TAMİR TAMAMLANDI / ZAFER FANFARI
  playVictory() {
    if (!this.enabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0, d: 0.12 },
      { f: 659.25, t: 0.13, d: 0.12 },
      { f: 783.99, t: 0.26, d: 0.12 },
      { f: 1046.5, t: 0.4, d: 0.38 },
    ];
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, now + note.t);
      gain.gain.setValueAtTime(0.26, now + note.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + note.t);
      osc.stop(now + note.t + note.d + 0.02);
    });
  }
}

window.arenAudio = new ArenAudioEngine();
