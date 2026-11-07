// Usta Aren'in Çılgın Tamirhanesi - Tablet Optimize Ses & Türkçe Konuşma Motoru
// (iOS/iPadOS/Android üzerinde speechSynthesis.cancel() IPC bloklaması tamamen kaldırıldı)

class ArenAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.trVoice = null;
    this.lastSpeechTime = 0;
    this.lastSfxTime = 0;
    this.hornIndex = 0;
    this.speechTimer = null;
    this.initVoices();
  }

  initVoices() {
    if (!('speechSynthesis' in window)) return;
    const pickTurkishVoice = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        this.trVoice =
          voices.find((v) => v.lang.toLowerCase().startsWith('tr') && v.name.toLowerCase().includes('yelda')) ||
          voices.find((v) => v.lang.toLowerCase().startsWith('tr')) ||
          null;
      } catch (_) {}
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
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.enabled = !this.enabled;
    if (!this.enabled && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (_) {}
    }
    return this.enabled;
  }

  // Tabletlerde Ana İş Parçacığını (Main Thread) Bloklamayan Asenkron Konuşma
  speak(text, force = false) {
    if (!this.enabled || !('speechSynthesis' in window)) return;
    const now = performance.now();
    if (!force && now - this.lastSpeechTime < 3400) return;

    // KritiK Tablet Optimizasyonu: iOS/Android'de speechSynthesis.cancel() senkron IPC bloklaması yapar.
    // Normal etkileşimlerde konuşma devam ediyorsa kesmek yerine atla!
    if (!force && window.speechSynthesis.speaking) return;
    this.lastSpeechTime = now;

    if (this.speechTimer) clearTimeout(this.speechTimer);
    this.speechTimer = setTimeout(() => {
      try {
        if (force && window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'tr-TR';
        if (this.trVoice) {
          utter.voice = this.trVoice;
        }
        utter.rate = 1.04;
        utter.pitch = 1.1;
        utter.volume = 1.0;
        window.speechSynthesis.speak(utter);
      } catch (_) {}
    }, 24);
  }

  canPlaySfx() {
    if (!this.enabled) return false;
    const now = performance.now();
    if (now - this.lastSfxTime < 90) return false;
    this.lastSfxTime = now;
    this.ensureContext();
    return Boolean(this.ctx);
  }

  // 1. SÜPER MATKAP SESİ
  playDrill() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.33);
  }

  // 2. DEV ÇEKİÇ SESİ
  playHammer() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.32);

    gain.gain.setValueAtTime(0.32, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 3. HAVA POMPASI SESİ
  playWrench() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 4. BOYA & ÇIKARTMA SESİ
  playPaint() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 5. ÇILGIN PARÇA TAKMA SESİ
  playWacky() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const slide = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    slide.type = 'triangle';
    slide.frequency.setValueAtTime(260, now);
    slide.frequency.exponentialRampToValueAtTime(920, now + 0.24);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    slide.connect(gain);
    gain.connect(this.ctx.destination);
    slide.start(now);
    slide.stop(now + 0.3);
  }

  // 6. KÖPÜK & KOMİK KORNA SESLERİ
  playHorn() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const style = this.hornIndex % 3;
    this.hornIndex += 1;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (style === 0) {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.setValueAtTime(480, now + 0.12);
    } else if (style === 1) {
      osc.type = 'square';
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.linearRampToValueAtTime(920, now + 0.24);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.22);
    }

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // AFACAN MODU
  playMischief() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(560, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.3);

    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.34);
  }

  // KUTU DEVİRME SESİ
  playSmash() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.18);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // ZAFER FANFARI
  playVictory() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.setValueAtTime(659.25, now + 0.1);
    osc.frequency.setValueAtTime(783.99, now + 0.2);
    osc.frequency.setValueAtTime(1046.5, now + 0.3);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.54);
  }
}

window.arenAudio = new ArenAudioEngine();
