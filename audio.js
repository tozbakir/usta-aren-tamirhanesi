// Usta Aren'in Çılgın Tamirhanesi - Vertex AI Doğal Kadın Seslendirme & Web Audio Ses Efekt Motoru

const VOICE_TEXT_TO_KEY = {
  'Merhaba Usta Aren! Çılgın Tamirhaneye hoş geldin! Hadi tamire başlayalım!': 'welcome_open',
  'Tamirhaneye döndük Usta Aren! Şimdi neyi tamir edelim?': 'back_to_garage',
  'Dev Kamyon tamirhanede Usta Aren! Hadi şarjlı matkapla pasları temizleyelim ve patlak lastiği şişirelim!': 'welcome_tractor',
  'Dev Kepçe geldi Usta Aren! Gevşek vidaları matkapla sıkalım ve kepçe kolunu tamir edelim!': 'welcome_excavator',
  'Süper İtfaiye burada Usta Aren! Merdiveni düzeltelim, vidaları sıkalım ve parlak kırmızıya boyayalım!': 'welcome_firetruck',
  'Canavar Kamyon sahnede Usta Aren! Dev tekerlekleri şişirelim ve çılgın modifiye yapalım!': 'welcome_monster',
  'Çamaşır Makinesi bozulmuş Usta Aren! Şarjlı matkapla gevşek vidaları sıkalım, su borusunu tamir edip çamaşır yıkayalım!': 'welcome_washer',
  'Bulaşık Makinesi arızalanmış Usta Aren! Matkapla kapak vidalarını sıkalım, su fıskiyesini tamir edip bulaşıkları yıkayalım!': 'welcome_dishwasher',
  'Vıııınn! Şarjlı matkap vidaları sımsıkı sıkıyor, pasları parlatıyor Usta Aren!': 'tool_drill_1',
  'Matkap ucu hızla dönüyor, harikasın Aren Usta!': 'tool_drill_2',
  'Bütün gevşek vidalar matkapla sıkıldı, pırıl pırıl oldu Aren!': 'tool_drill_3',
  'Fıss fıss! Yeşil hava pompası patlak lastiği şişirdi Usta Aren!': 'tool_wrench_1',
  'Tekerlek taş gibi sağlam oldu, aferin Aren Usta!': 'tool_wrench_2',
  'Fırçayla boyuyoruz! Bu parlak renk çok yakıştı Usta Aren!': 'tool_paint_1',
  'Gri astar boyandı, yepyeni oldu Aren Usta!': 'tool_paint_2',
  'Tak tak tak! Ne güçlü bir çekiç Usta Aren, yamuk yerler dümdüz oldu!': 'tool_hammer_1',
  'Hahaha! Çılgın parçalar takıldı, burada kuralları Aren Usta koyar!': 'tool_wacky_1',
  'Köpüklerle tertemiz yıkandı, yıldız gibi parlıyor Usta Aren!': 'tool_wash_1',
  'Test sürüşü başladı Usta Aren! Kutuları devirmek için ekrana dokun veya Zıpla düğmesine bas!': 'drive_start',
  'Düt düüüt! Yolu açın Usta Aren hızla geliyor!': 'drive_horn',
  'Süper Turbo Zıplama! Harikasın Aren Usta!': 'drive_jump',
  'Şarjlı matkapla çamaşır makinesinin gevşek vidalarını sıktık Usta Aren!': 'washer_drill',
  'Su tahliye borusu tamir edildi, kapağa sıkışan çorap kurtarıldı Usta Aren!': 'washer_wrench',
  'Çamaşır makinesi fırçayla boyandı, harika görünüyor Usta Aren!': 'washer_paint',
  'Şarjlı matkapla bulaşık makinesinin kapak vidalarını sağlamlaştırdık Usta Aren!': 'dishwasher_drill',
  'Bulaşık makinesinin su pompası ve fıskiye pervanesi tamir edildi Usta Aren!': 'dishwasher_wrench',
  'Bulaşık makinesini pırıl pırıl boyadık, ellerine sağlık Aren Usta!': 'dishwasher_paint',
  'Hahaha! Afacan Aren kamyonu çamura buladı ve lastiğini patlattı! Hadi baştan tamir edelim!': 'mischief_vehicle',
  'Hahaha! Afacan Aren çamaşır makinesinin vidalarını gevşetti ve kapağa çorap sıkıştırdı!': 'mischief_washer',
  'Hahaha! Afacan Aren bulaşık makinesini köpüğe buladı ve vidalarını gevşetti!': 'mischief_dishwasher',
  'Çamaşır yıkama zamanı Usta Aren! Kirli çamaşırları tambura at, deterjanı koy ve yıkamayı başlat!': 'washer_play_intro',
  'Hop! Kirli çamaşırı çamaşır makinesinin tamburuna attık Usta Aren!': 'washer_add_clothes',
  'Mis kokulu sıvı deterjanı ve yumuşatıcıyı çekmeceye koyduk Usta Aren!': 'washer_add_detergent',
  'Önce kirli çamaşırları makinenin içine atalım Usta Aren!': 'washer_need_items',
  'Deterjan koymayı unutmayalım Usta Aren! Deterjan şişesine dokun!': 'washer_need_detergent',
  'Çamaşır makinesi çalışıyor! Su doluyor, köpüklerle tambur dönüyor Usta Aren!': 'washer_cycle_start',
  'Yaşasın! Bütün çamaşırlar bembeyaz ve mis kokulu yıkandı, harikasın Usta Aren!': 'washer_cycle_done',
  'Bulaşık yıkama zamanı Usta Aren! Kirli tabakları ve bardakları sepete diz, tableti koy ve makineyi çalıştır!': 'dishwasher_play_intro',
  'Harika! Kirli bulaşığı bulaşık makinesinin sepetine yerleştirdik Usta Aren!': 'dishwasher_add_dish',
  'Parlatıcı bulaşık tabletini deterjan kutusuna taktık Usta Aren!': 'dishwasher_add_detergent',
  'Önce kirli tabak ve bardakları sepete dizelim Usta Aren!': 'dishwasher_need_items',
  'Bulaşık tabletini koymayı unutmayalım Usta Aren! Deterjan kutusuna dokun!': 'dishwasher_need_detergent',
  'Bulaşık makinesi çalışıyor! Sıcak su fıskiyeleri dönüyor, bulaşıklar yıkanıyor Usta Aren!': 'dishwasher_cycle_start',
  'Yaşasın! Bütün tabaklar ve bardaklar gıcır gıcır tertemiz oldu, aferin Usta Aren!': 'dishwasher_cycle_done'
};

class ArenAudioEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.lastSpeechTime = 0;
    this.lastSfxTime = 0;
    this.hornIndex = 0;
    this.currentVoiceAudio = null;
    this.audioCache = new Map();
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
    if (!this.enabled && this.currentVoiceAudio) {
      try {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      } catch (_) {}
    }
    return this.enabled;
  }

  // Vertex AI ile üretilmiş doğal Türkçe kadın seslendirmesini (voices/<key>.mp3) oynatır
  speak(text, force = false, explicitKey = null) {
    if (!this.enabled) return;
    const now = performance.now();
    if (!force && now - this.lastSpeechTime < 1850) return;

    const voiceKey = explicitKey || VOICE_TEXT_TO_KEY[text];
    if (!voiceKey) return;

    this.lastSpeechTime = now;

    try {
      if (this.currentVoiceAudio) {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      }

      let audio = this.audioCache.get(voiceKey);
      if (!audio) {
        audio = new Audio(`voices/${voiceKey}.mp3?v=7`);
        audio.preload = 'auto';
        this.audioCache.set(voiceKey, audio);
      } else {
        audio.currentTime = 0;
      }

      this.currentVoiceAudio = audio;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } catch (_) {}
  }

  canPlaySfx() {
    if (!this.enabled) return false;
    const now = performance.now();
    if (now - this.lastSfxTime < 70) return false;
    this.lastSfxTime = now;
    this.ensureContext();
    return Boolean(this.ctx);
  }

  // 1. SÜPER ŞARJLI MATKAP SESİ
  playDrill() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
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

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.34);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // 3. HAVA POMPASI & BORU TAMİR SESİ
  playWrench() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.25);

    gain.gain.setValueAtTime(0.2, now);
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

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // 5. ÇILGIN PARÇA & EŞYA EKLEME SESİ
  playWacky() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const slide = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    slide.type = 'triangle';
    slide.frequency.setValueAtTime(280, now);
    slide.frequency.exponentialRampToValueAtTime(920, now + 0.24);

    gain.gain.setValueAtTime(0.22, now);
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

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // 7. SU & DETERJAN DÖKME / YIKAMA SESİ
  playWaterSplash() {
    if (!this.canPlaySfx()) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.24);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.34);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.37);
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

    gain.gain.setValueAtTime(0.22, now);
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
    gain.gain.setValueAtTime(0.2, now);
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
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.52);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.54);
  }
}

window.arenAudio = new ArenAudioEngine();
