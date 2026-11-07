// Usta Aren'in Çılgın Tamirhanesi - 60FPS Tablet GPU Optimize Stüdyo Vektör Araçlar
// (Ağır SVG feMorphology/feDropShadow filtreleri kaldırıldı; saf GPU vektör beyaz sticker konturları ve yerinde DOM güncellemesi kullanıldı)

const PAINT_PALETTE = [
  { name: 'Katerpilar Sarısı', primary: '#ff9f1c', light: '#ffbf69', dark: '#e07a00', deep: '#b35c00', accent: '#2b2d42' },
  { name: 'İtfaiye Kırmızısı', primary: '#e63946', light: '#ff758f', dark: '#b51724', deep: '#800f18', accent: '#ffbe0b' },
  { name: 'Zümrüt Yeşili', primary: '#2ec4b6', light: '#72efdd', dark: '#1b9aaa', deep: '#0f6e7a', accent: '#ff9f1c' },
  { name: 'Kobalt Mavisi', primary: '#0077b6', light: '#48cae4', dark: '#023e8a', deep: '#032554', accent: '#ffbe0b' },
  { name: 'Galaksi Moru', primary: '#7209b7', light: '#b5179e', dark: '#560bad', deep: '#3c096c', accent: '#4cc9f0' },
  { name: 'Canavar Yeşili', primary: '#38b000', light: '#70e000', dark: '#008000', deep: '#004b23', accent: '#ffbe0b' }
];

const WHEEL_TYPES = ['normal', 'donut', 'monster', 'hover', 'gear'];
const ROOF_TYPES = ['normal', 'rocket', 'dino', 'rotor', 'siren'];
const DECAL_KEYS = ['flame', 'lightning', 'starBadge', 'numberThree', 'dinoCrest'];

const VEHICLE_CATALOG = {
  tractor: {
    id: 'tractor',
    title: 'Dev Kamyon',
    welcomeVoiceKey: 'welcome_tractor',
    welcomeVoice: 'Dev Kamyon tamirhanede Usta Aren! Hadi şarjlı matkapla pasları temizleyelim ve patlak lastiği şişirelim!',
    defaultColor: 0,
    wheelPositions: [
      { x: 268, y: 268, r: 68 },
      { x: 498, y: 268, r: 68 }
    ],
    boltPositions: [
      { x: 372, y: 238 },
      { x: 458, y: 182 },
      { x: 562, y: 196 }
    ],
    decalSlots: [
      { x: 425, y: 178 },
      { x: 505, y: 182 },
      { x: 315, y: 152 }
    ],
    roofAnchor: { x: 525, y: 70 }
  },

  excavator: {
    id: 'excavator',
    title: 'Dev Kepçe',
    welcomeVoiceKey: 'welcome_excavator',
    welcomeVoice: 'Dev Kepçe geldi Usta Aren! Gevşek vidaları matkapla sıkalım ve kepçe kolunu tamir edelim!',
    defaultColor: 0,
    wheelPositions: [
      { x: 245, y: 272, r: 60 },
      { x: 435, y: 272, r: 60 }
    ],
    boltPositions: [
      { x: 225, y: 195 },
      { x: 335, y: 195 },
      { x: 472, y: 132 }
    ],
    decalSlots: [
      { x: 235, y: 182 },
      { x: 325, y: 182 },
      { x: 405, y: 182 }
    ],
    roofAnchor: { x: 335, y: 84 }
  },

  firetruck: {
    id: 'firetruck',
    title: 'Süper İtfaiye',
    welcomeVoiceKey: 'welcome_firetruck',
    welcomeVoice: 'Süper İtfaiye burada Usta Aren! Merdiveni düzeltelim, vidaları sıkalım ve parlak kırmızıya boyayalım!',
    defaultColor: 1,
    wheelPositions: [
      { x: 250, y: 272, r: 62 },
      { x: 495, y: 272, r: 62 }
    ],
    boltPositions: [
      { x: 215, y: 168 },
      { x: 325, y: 168 },
      { x: 405, y: 215 }
    ],
    decalSlots: [
      { x: 235, y: 155 },
      { x: 335, y: 155 },
      { x: 470, y: 195 }
    ],
    roofAnchor: { x: 472, y: 96 }
  },

  monster: {
    id: 'monster',
    title: 'Canavar Kamyon',
    welcomeVoiceKey: 'welcome_monster',
    welcomeVoice: 'Canavar Kamyon sahnede Usta Aren! Dev tekerlekleri şişirelim ve çılgın modifiye yapalım!',
    defaultColor: 3,
    wheelPositions: [
      { x: 250, y: 266, r: 68 },
      { x: 498, y: 266, r: 68 }
    ],
    boltPositions: [
      { x: 235, y: 178 },
      { x: 335, y: 172 },
      { x: 435, y: 172 }
    ],
    decalSlots: [
      { x: 265, y: 172 },
      { x: 370, y: 168 },
      { x: 475, y: 172 }
    ],
    roofAnchor: { x: 365, y: 78 }
  },

  washer: {
    id: 'washer',
    title: 'Çamaşır Makinesi',
    isAppliance: true,
    welcomeVoiceKey: 'welcome_washer',
    welcomeVoice: 'Çamaşır Makinesi bozulmuş Usta Aren! Şarjlı matkapla gevşek vidaları sıkalım, su borusunu tamir edip çamaşır yıkayalım!',
    defaultColor: 2,
    wheelPositions: [
      { x: 256, y: 292, r: 26 },
      { x: 434, y: 292, r: 26 }
    ],
    boltPositions: [
      { x: 232, y: 122 },
      { x: 458, y: 122 },
      { x: 232, y: 242 },
      { x: 458, y: 242 }
    ],
    decalSlots: [
      { x: 236, y: 182 },
      { x: 454, y: 182 },
      { x: 345, y: 112 }
    ],
    roofAnchor: { x: 345, y: 46 }
  },

  dishwasher: {
    id: 'dishwasher',
    title: 'Bulaşık Makinesi',
    isAppliance: true,
    welcomeVoiceKey: 'welcome_dishwasher',
    welcomeVoice: 'Bulaşık Makinesi arızalanmış Usta Aren! Matkapla kapak vidalarını sıkalım, su fıskiyesini tamir edip bulaşıkları yıkayalım!',
    defaultColor: 4,
    wheelPositions: [
      { x: 256, y: 292, r: 26 },
      { x: 434, y: 292, r: 26 }
    ],
    boltPositions: [
      { x: 228, y: 118 },
      { x: 462, y: 118 },
      { x: 228, y: 246 },
      { x: 462, y: 246 }
    ],
    decalSlots: [
      { x: 234, y: 182 },
      { x: 456, y: 182 },
      { x: 345, y: 108 }
    ],
    roofAnchor: { x: 345, y: 46 }
  }
};

function createInitialVehicleState(vehicleId) {
  const cfg = VEHICLE_CATALOG[vehicleId];
  return {
    colorIndex: cfg.defaultColor,
    primerUnpainted: true,
    wheelType: 'normal',
    wheelsBroken: [true, false],
    roofType: 'normal',
    roofDent: false,
    engineDent: false,
    turboExhaust: false,
    boltsLoose: cfg.isAppliance ? [true, true, true, true] : [true, true, false],
    mudLevels: [1, 1, 1],
    decals: [],
    bucketAngle: 0
  };
}

// Sıfır SVG Filtresi: Saf Vektör Gradyanlar (Tablet GPU'da 0ms Rasterizasyon Maliyeti)
function renderVehicleDefs(u, palette) {
  return `
    <defs>
      <linearGradient id="paintMain_${u}" x1="0" y1="0" x2="0" y2="1">
        <stop data-stop="light" offset="0%" stop-color="${palette.light}"/>
        <stop data-stop="primary" offset="18%" stop-color="${palette.primary}"/>
        <stop data-stop="dark" offset="85%" stop-color="${palette.dark}"/>
        <stop data-stop="deep" offset="100%" stop-color="${palette.deep}"/>
      </linearGradient>

      <linearGradient id="paintSide_${u}" x1="0" y1="0" x2="1" y2="1">
        <stop data-stop="side-primary" offset="0%" stop-color="${palette.primary}"/>
        <stop data-stop="side-dark" offset="100%" stop-color="${palette.dark}"/>
      </linearGradient>

      <linearGradient id="primerSteel_${u}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ced4da"/>
        <stop offset="30%" stop-color="#8d99ae"/>
        <stop offset="100%" stop-color="#495057"/>
      </linearGradient>

      <linearGradient id="mintGlass_${u}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d8f3dc"/>
        <stop offset="55%" stop-color="#95d5b2"/>
        <stop offset="100%" stop-color="#52b788"/>
      </linearGradient>

      <linearGradient id="darkChassis_${u}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#343a40"/>
        <stop offset="100%" stop-color="#1b1e21"/>
      </linearGradient>

      <radialGradient id="rimGrad_${u}" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#ffbf69"/>
        <stop offset="55%" stop-color="#ff9f1c"/>
        <stop offset="100%" stop-color="#cc5803"/>
      </radialGradient>

      <linearGradient id="rustSplash_${u}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#d48c2a"/>
        <stop offset="45%" stop-color="#8b4513"/>
        <stop offset="100%" stop-color="#4a2103"/>
      </linearGradient>
    </defs>
  `;
}

// Çamaşır ve Bulaşık Makinesi İçin Araba Tekerleği Yerine Gerçek Denge Ayağı & Su Tahliye Pompa Valfi
function renderApplianceBaseFeetSVG(wheelCfg, idx, isBroken) {
  const { x, y } = wheelCfg;
  if (idx === 0 && isBroken) {
    return `
      <g transform="translate(${x}, ${y})" class="wheel-group interactive-part" data-part="wheel" data-wheel-index="${idx}">
        <!-- Su Kaçağı ve Köpük Sızıntısı (Araba Lastiği Değil, Arızalı Su Tahliye Pompası!) -->
        <ellipse cx="0" cy="14" rx="44" ry="11" fill="#38bdf8" opacity="0.7" stroke="#ffffff" stroke-width="3"/>
        <ellipse cx="-8" cy="14" rx="26" ry="6" fill="#caf0f8" opacity="0.9"/>
        <!-- Açılmış Tahliye Filtre Borusu -->
        <rect x="-22" y="-14" width="44" height="22" rx="6" fill="#334155" stroke="#ffffff" stroke-width="5" paint-order="stroke fill"/>
        <circle cx="-6" cy="-3" r="8" fill="#0f172a" stroke="#ef4444" stroke-width="3"/>
        <!-- Fışkıran Su Damlaları ve Köpükler -->
        <path d="M -12 -6 C -28 -22, -38 -8, -22 4 Z" fill="#38bdf8" stroke="#ffffff" stroke-width="3" paint-order="stroke fill"/>
        <path d="M 6 -8 C 22 -26, 34 -10, 16 4 Z" fill="#00b4d8" stroke="#ffffff" stroke-width="3" paint-order="stroke fill"/>
        <circle cx="-18" cy="-16" r="6" fill="#caf0f8" stroke="#ffffff" stroke-width="2"/>
        <circle cx="14" cy="-18" r="5" fill="#ffffff"/>
      </g>
    `;
  }

  return `
    <g transform="translate(${x}, ${y})" class="wheel-group interactive-part" data-part="wheel" data-wheel-index="${idx}">
      <!-- Sağlam Beyaz Eşya Kauçuk Denge Ayağı ve Kapalı Su Valfi -->
      <rect x="-24" y="-10" width="48" height="16" rx="5" fill="#334155" stroke="#ffffff" stroke-width="5" paint-order="stroke fill"/>
      <rect x="-30" y="2" width="60" height="10" rx="5" fill="#1e293b" stroke="#ffffff" stroke-width="3" paint-order="stroke fill"/>
      ${idx === 0 ? `<circle cx="0" cy="-2" r="5" fill="#38b000" stroke="#ffffff" stroke-width="1.5"/>` : ''}
    </g>
  `;
}

// Referans Görseldeki Detaylı İş Makinesi Tekerleği + Patlak Lastik & Saplanmış Yapraklı Dal (Saf Vektör Beyaz Sticker Konturlu)
function renderStudioWheelSVG(wheelCfg, idx, wheelType, isBroken, u, isDriving = false, isAppliance = false) {
  if (isAppliance) {
    return renderApplianceBaseFeetSVG(wheelCfg, idx, isBroken);
  }
  const { x, y, r } = wheelCfg;

  if (isBroken && !isDriving) {
    return `
      <g transform="translate(${x}, ${y})" class="wheel-group interactive-part" data-part="wheel" data-wheel-index="${idx}">
        <!-- Hava Kaçırma Bulutu (Referans Görseldeki Beyaz Puf) -->
        <g class="air-leak-puff" transform="translate(${-r - 28}, ${-r * 0.52})">
          <path d="M 22 16 C 6 20, -16 16, -20 2 C -28 -8, -20 -24, -4 -20 C 6 -32, 26 -24, 24 -8 C 32 -2, 30 12, 22 16 Z"
            fill="#f8f9fa" stroke="#ffffff" stroke-width="5" paint-order="stroke fill"/>
          <path d="M 28 10 L 46 18 M 26 2 L 44 6" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
        </g>

        <!-- Beyaz Sticker Dış Kontur (Filtresiz Saf Vektör) -->
        <path d="M ${-r * 1.25} ${r * 0.84}
                 C ${-r * 1.15} ${r * 0.44}, ${-r * 0.82} ${-r * 0.86}, 0 ${-r * 0.86}
                 C ${r * 0.82} ${-r * 0.86}, ${r * 1.15} ${r * 0.44}, ${r * 1.25} ${r * 0.84}
                 Q 0 ${r * 0.96} ${-r * 1.25} ${r * 0.84} Z"
          fill="#ffffff" stroke="#ffffff" stroke-width="11" stroke-linejoin="round"/>

        <!-- Yere Yayılmış Sönük Kauçuk Lastik Gövdesi -->
        <path d="M ${-r * 1.25} ${r * 0.84}
                 C ${-r * 1.15} ${r * 0.44}, ${-r * 0.82} ${-r * 0.86}, 0 ${-r * 0.86}
                 C ${r * 0.82} ${-r * 0.86}, ${r * 1.15} ${r * 0.44}, ${r * 1.25} ${r * 0.84}
                 Q 0 ${r * 0.96} ${-r * 1.25} ${r * 0.84} Z"
          fill="#2b2d2f" stroke="#495057" stroke-width="4" stroke-dasharray="15 6"/>

        <path d="M ${-r * 1.06} ${r * 0.78}
                 C ${-r * 0.92} ${r * 0.36}, ${-r * 0.68} ${-r * 0.66}, 0 ${-r * 0.66}
                 C ${r * 0.68} ${-r * 0.66}, ${r * 0.92} ${r * 0.36}, ${r * 1.06} ${r * 0.78} Z"
          fill="#3d4043"/>

        <!-- Kirli/Tozlu Sönük Jant -->
        <circle cx="0" cy="${r * 0.14}" r="${r * 0.46}" fill="#5c3a21" stroke="#242628" stroke-width="6"/>
        <circle cx="0" cy="${r * 0.14}" r="${r * 0.28}" fill="#7f4f24"/>
        <circle cx="0" cy="${r * 0.14}" r="${r * 0.14}" fill="#3d2616"/>

        <!-- Yırtık Patlak Deliği ve İçinden Çıkan Yapraklı Dal -->
        <g transform="translate(${-r * 0.32}, ${-r * 0.58})">
          <polygon points="-16,8 -8,-6 0,2 10,-8 14,6 6,16 -8,14" fill="#111315" stroke="#6c757d" stroke-width="2"/>
          <path d="M -2 10 L -14 -24 L -6 -26 L 6 8 Z" fill="#9c6644" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill"/>
          <path d="M -12 -20 C -28 -26, -34 -12, -14 -10 Z" fill="#38b000" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill"/>
          <path d="M -8 -22 C -2 -36, 14 -28, -4 -14 Z" fill="#70e000" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke fill"/>
        </g>
      </g>
    `;
  }

  let wheelGraphic = '';

  if (wheelType === 'donut') {
    wheelGraphic = `
      <circle cx="0" cy="0" r="${r + 5}" fill="#ffffff"/>
      <circle cx="0" cy="0" r="${r}" fill="#383b3e" stroke="#242628" stroke-width="4" stroke-dasharray="16 7"/>
      <circle cx="0" cy="0" r="${r * 0.88}" fill="#d97706"/>
      <circle cx="0" cy="0" r="${r * 0.74}" fill="#ff4d8d"/>
      <path d="M ${-r*0.5} ${-r*0.35} A ${r*0.6} ${r*0.6} 0 0 1 ${r*0.5} ${-r*0.35}" fill="none" stroke="#ff85b3" stroke-width="6" stroke-linecap="round"/>
      <line x1="${-r*0.42}" y1="${-r*0.32}" x2="${-r*0.2}" y2="${-r*0.48}" stroke="#ffffff" stroke-width="5" stroke-linecap="round"/>
      <line x1="${r*0.25}" y1="${-r*0.45}" x2="${r*0.48}" y2="${-r*0.25}" stroke="#fde047" stroke-width="5" stroke-linecap="round"/>
      <line x1="${-r*0.48}" y1="${r*0.25}" x2="${-r*0.24}" y2="${r*0.46}" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <line x1="${r*0.24}" y1="${r*0.46}" x2="${r*0.46}" y2="${r*0.22}" stroke="#4ade80" stroke-width="5" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="${r * 0.3}" fill="#2b2d42"/>
      <circle cx="0" cy="0" r="${r * 0.16}" fill="url(#rimGrad_${u})"/>
    `;
  } else if (wheelType === 'monster') {
    const mr = r * 1.12;
    wheelGraphic = `
      <circle cx="0" cy="0" r="${mr + 6}" fill="#ffffff"/>
      <circle cx="0" cy="0" r="${mr}" fill="#25282a" stroke="#3a3d40" stroke-width="10" stroke-dasharray="18 9"/>
      <circle cx="0" cy="0" r="${mr * 0.84}" fill="#3a3d40"/>
      <circle cx="0" cy="0" r="${mr * 0.68}" fill="#1e2022"/>
      <circle cx="0" cy="0" r="${mr * 0.52}" fill="url(#rimGrad_${u})"/>
      <circle cx="0" cy="0" r="${mr * 0.36}" fill="#d97706"/>
      <circle cx="0" cy="0" r="${mr * 0.2}" fill="#ff9f1c"/>
    `;
  } else if (wheelType === 'hover') {
    wheelGraphic = `
      <ellipse cx="0" cy="${r * 0.45}" rx="${r * 0.92}" ry="${r * 0.26}" fill="#00b4d8" opacity="0.55"/>
      <ellipse cx="0" cy="${r * 0.45}" rx="${r * 0.58}" ry="${r * 0.14}" fill="#caf0f8"/>
      <path d="M ${-r*0.82} -14 L ${r*0.82} -14 L ${r*0.6} 18 L ${-r*0.6} 18 Z" fill="#495057" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill"/>
      <rect x="${-r*0.48}" y="-6" width="${r*0.96}" height="10" rx="5" fill="#00f5d4"/>
    `;
  } else if (wheelType === 'gear') {
    wheelGraphic = `
      <circle cx="0" cy="0" r="${r + 5}" fill="#ffffff"/>
      <circle cx="0" cy="0" r="${r}" fill="#f59e0b" stroke="#b45309" stroke-width="9" stroke-dasharray="15 8"/>
      <circle cx="0" cy="0" r="${r * 0.8}" fill="#fbbf24"/>
      <circle cx="0" cy="0" r="${r * 0.52}" fill="#495057"/>
      <circle cx="0" cy="0" r="${r * 0.26}" fill="#fde047"/>
    `;
  } else {
    let lugDots = '';
    for (let i = 0; i < 10; i++) {
      const a = (i * 36) * (Math.PI / 180);
      const lx = Math.cos(a) * (r * 0.38);
      const ly = Math.sin(a) * (r * 0.38);
      lugDots += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2.6" fill="#7f4f24"/>`;
    }
    wheelGraphic = `
      <circle cx="0" cy="0" r="${r + 5}" fill="#ffffff"/>
      <circle cx="0" cy="0" r="${r}" fill="#2b2d2f" stroke="#3a3d40" stroke-width="8" stroke-dasharray="15 7"/>
      <circle cx="0" cy="0" r="${r * 0.86}" fill="#495057"/>
      <circle cx="0" cy="0" r="${r * 0.72}" fill="#2b2d2f"/>
      <circle cx="0" cy="0" r="${r * 0.54}" fill="#1b1d1f"/>
      <circle cx="0" cy="0" r="${r * 0.47}" fill="url(#rimGrad_${u})"/>
      <circle cx="0" cy="0" r="${r * 0.31}" fill="#d97706"/>
      ${lugDots}
      <circle cx="0" cy="0" r="${r * 0.21}" fill="#ff9f1c"/>
      <circle cx="-3" cy="-3" r="${r * 0.08}" fill="#ffbf69" opacity="0.7"/>
    `;
  }

  return `
    <g transform="translate(${x}, ${y})" class="wheel-group interactive-part" data-part="wheel" data-wheel-index="${idx}">
      <g class="wheel-spin-node">
        ${wheelGraphic}
      </g>
    </g>
  `;
}

// Referans Görseldeki Düzensiz Sıçramış Pas & Çamur Katmanı
function renderAuthenticRustMudSVG(mudLevels, u, isDriving = false, vehicleId = 'tractor') {
  if (isDriving) return '';
  const totalMud = mudLevels.reduce((acc, v) => acc + v, 0) / mudLevels.length;
  if (totalMud <= 0.05) {
    return `
      ${window.renderSparkleStar(185, 135, 12, 0.1)}
      ${window.renderSparkleStar(245, 165, 10, 0.4)}
      ${window.renderSparkleStar(165, 175, 11, 0.7)}
    `;
  }

  const mudShift = (vehicleId === 'washer' || vehicleId === 'dishwasher') ? 'transform="translate(68, 28) scale(0.88)"' : '';

  return `
    <g class="mud-blob interactive-part" data-part="mud" data-mud-index="0" ${mudShift} opacity="${Math.min(1, totalMud * 1.15).toFixed(2)}">
      <!-- Koyu Kahve Alt Pas/Çamur Yığını (Saf Vektör Beyaz Sticker Konturlu) -->
      <path d="M 142 115
               C 155 102, 185 108, 198 112
               C 218 104, 255 106, 272 114
               C 262 126, 245 130, 268 142
               C 252 154, 228 152, 242 168
               C 224 182, 204 196, 178 192
               C 154 186, 134 166, 142 146
               C 132 134, 136 122, 142 115 Z"
        fill="#4a2103" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill"/>

      <!-- Orta Katman Paslı Turuncu-Kahve Dalgalar -->
      <path d="M 148 122
               C 162 112, 192 114, 212 120
               C 232 112, 252 118, 242 132
               C 225 142, 246 154, 224 168
               C 202 180, 174 182, 156 164
               C 142 152, 140 132, 148 122 Z"
        fill="url(#rustSplash_${u})"/>

      <!-- Açık Kehribar/Toprak Parıltı Katmanı -->
      <path d="M 152 134 C 165 124, 188 128, 195 142 C 202 156, 178 168, 160 158 C 146 150, 145 140, 152 134 Z"
        fill="#d48c2a" opacity="0.85"/>
      <path d="M 205 124 C 218 118, 236 122, 228 134 C 220 144, 202 136, 205 124 Z"
        fill="#c67d30" opacity="0.8"/>

      <!-- Etrafa Fırlayan Çamur/Pas Parçacıkları -->
      <path d="M 88 92 C 94 84, 112 86, 108 98 C 102 106, 84 102, 88 92 Z" fill="#8b4513" stroke="#ffffff" stroke-width="4" paint-order="stroke fill"/>
      <path d="M 118 82 C 124 76, 138 80, 134 90 C 128 96, 114 90, 118 82 Z" fill="#6f3b11" stroke="#ffffff" stroke-width="4" paint-order="stroke fill"/>
      <path d="M 116 178 C 124 170, 138 176, 132 188 C 122 196, 110 186, 116 178 Z" fill="#8b4513" stroke="#ffffff" stroke-width="4" paint-order="stroke fill"/>
      <circle cx="144" cy="96" r="5" fill="#7f4f24"/>
      <circle cx="132" cy="162" r="4.5" fill="#582f0e"/>
    </g>
  `;
}

// Sahne Üstü Şarjlı Matkap Çizimi (Hem Çamaşır Makinesinde Hem Araçlarda Gevşek Vidaları Sıkar!)
function renderStageCordlessDrillSVG(x, y) {
  return `
    <g transform="translate(${x}, ${y})" class="scene-hero-tool interactive-part" data-part="bolt" data-scene-tool="drill">
      <!-- Saf Vektör Beyaz Sticker Kontur -->
      <g stroke="#ffffff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff">
        <rect x="-86" y="-18" width="54" height="30" rx="10"/>
        <path d="M -74 10 L -82 40 L -64 42 L -56 10 Z"/>
        <rect x="-88" y="36" width="28" height="14" rx="5"/>
        <polygon points="-32,-14 -16,-10 -16,4 -32,8"/>
        <polygon points="-16,-6 12,-6 18,-3 12,0 -16,0"/>
      </g>
      <!-- Alt Şarjlı Batarya Bloğu -->
      <rect x="-88" y="36" width="28" height="14" rx="5" fill="#1e293b"/>
      <rect x="-84" y="39" width="12" height="4" rx="1.5" fill="#ef4444"/>
      <!-- Tabanca Kabza ve Kırmızı Tetik -->
      <path d="M -74 10 L -82 39 L -64 40 L -56 10 Z" fill="#ff9f1c"/>
      <path d="M -77 16 L -81 34 L -72 35 L -68 16 Z" fill="#2b2d42"/>
      <path d="M -58 12 L -50 12 L -52 22 L -60 20 Z" fill="#e63946"/>
      <!-- Matkap Ana Gövdesi -->
      <rect x="-86" y="-18" width="54" height="30" rx="10" fill="#ffbe0b"/>
      <rect x="-86" y="-18" width="16" height="30" rx="8" fill="#2b2d42"/>
      <rect x="-80" y="-15" width="38" height="7" rx="3.5" fill="#fff3b0" opacity="0.85"/>
      <rect x="-64" y="-5" width="4" height="10" rx="1.5" fill="#d97706"/>
      <rect x="-57" y="-5" width="4" height="10" rx="1.5" fill="#d97706"/>
      <rect x="-50" y="-5" width="4" height="10" rx="1.5" fill="#d97706"/>
      <!-- Mandren -->
      <polygon points="-32,-15 -16,-11 -16,5 -32,9" fill="#334155"/>
      <rect x="-30" y="-12" width="5" height="18" rx="1.5" fill="#94a3b8"/>
      <!-- Burgulu Çelik Matkap Ucu -->
      <polygon points="-16,-6 12,-6 18,-3 12,0 -16,0" fill="#ced4da" stroke="#475569" stroke-width="1.5"/>
      <line x1="-11" y1="0" x2="-6" y2="-6" stroke="#475569" stroke-width="2.2"/>
      <line x1="-3" y1="0" x2="2" y2="-6" stroke="#475569" stroke-width="2.2"/>
      <line x1="5" y1="0" x2="10" y2="-6" stroke="#475569" stroke-width="2.2"/>
      <!-- Parlak Sarı Kıvılcım Parlaması -->
      <circle cx="18" cy="-3" r="10" fill="#fff3b0" opacity="0.88" class="hint-pulse"/>
      <circle cx="18" cy="-3" r="5" fill="#ff9f1c"/>
    </g>
  `;
}

// Referans Görseldeki Sahne Üstü Aktif Aletler (Saf Vektör Beyaz Sticker Konturlu - Filtresiz 60FPS)
function renderSceneInteractiveToolsSVG(state, isDriving = false, vehicleId = 'tractor') {
  if (isDriving) return '';
  const hasMud = state.mudLevels.some((m) => m > 0.05);
  const hasLooseBolts = state.boltsLoose.some(Boolean);
  const hasFlatTire = state.wheelsBroken[0];
  const isUnpainted = state.primerUnpainted;

  let html = '';

  // 1. Sol Üst: Çamaşır veya Bulaşık Makinesinde (veya Gevşek Vidalarda) Şarjlı Matkap + Kamyonda Taşlama/Matkap!
  if (vehicleId === 'washer' || vehicleId === 'dishwasher') {
    if (hasLooseBolts || hasMud) {
      const cfg = VEHICLE_CATALOG[vehicleId];
      const firstLooseIdx = state.boltsLoose.findIndex(Boolean);
      const boltPos = cfg.boltPositions[firstLooseIdx !== -1 ? firstLooseIdx : 0];
      html += renderStageCordlessDrillSVG(boltPos.x - 24, boltPos.y + 2);
    }
  } else {
    if (hasMud) {
      html += `
        <g transform="translate(86, 136)" class="scene-hero-tool interactive-part" data-part="mud" data-scene-tool="drill">
          <!-- Saf Vektör Beyaz Sticker Kontur -->
          <g stroke="#ffffff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">
            <rect x="-64" y="-13" width="66" height="26" rx="11" fill="#ffffff" transform="rotate(-18)"/>
            <circle cx="20" cy="-2" r="28" fill="#ffffff"/>
          </g>
          <!-- Sap (Sarı-Turuncu-Siyah) -->
          <g transform="rotate(-18)">
            <rect x="-64" y="-13" width="66" height="26" rx="11" fill="#ff9f1c"/>
            <rect x="-64" y="-13" width="22" height="26" rx="10" fill="#2b2d42"/>
            <rect x="-58" y="-8" width="12" height="5" rx="2.5" fill="#5c677d"/>
            <rect x="-40" y="-10" width="34" height="7" rx="3" fill="#ffbf69"/>
            <rect x="-34" y="1" width="4" height="8" rx="1.5" fill="#d97706"/>
            <rect x="-26" y="1" width="4" height="8" rx="1.5" fill="#d97706"/>
            <rect x="-18" y="1" width="4" height="8" rx="1.5" fill="#d97706"/>
            <rect x="-32" y="-18" width="11" height="5" rx="2" fill="#1f2421"/>
          </g>
          <!-- Koruyucu Siyah Siper -->
          <path d="M 10 -30 A 30 30 0 0 0 -4 18 L 20 0 Z" fill="#2b2d42"/>
          <!-- Dönen Metal Disk -->
          <g class="spinning-disc-part" style="transform-origin: 20px -2px;">
            <circle cx="20" cy="-2" r="26" fill="#adb5bd"/>
            <circle cx="20" cy="-2" r="21" fill="#ced4da"/>
            <circle cx="20" cy="-2" r="15" fill="#e9ecef"/>
            <path d="M 6 -10 A 16 16 0 0 1 34 -12" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="20" cy="-2" r="8" fill="#2b2d42"/>
            <circle cx="20" cy="-2" r="3.5" fill="#adb5bd"/>
          </g>
          <!-- Parlak Sarı Kıvılcım Parlaması -->
          <circle cx="48" cy="-6" r="11" fill="#fff3b0" opacity="0.85" class="hint-pulse"/>
          <circle cx="48" cy="-6" r="6" fill="#ffbe0b"/>
        </g>
      `;
    }
    if (hasLooseBolts) {
      const cfg = VEHICLE_CATALOG[vehicleId];
      const firstLooseIdx = state.boltsLoose.findIndex(Boolean);
      const boltPos = cfg.boltPositions[firstLooseIdx !== -1 ? firstLooseIdx : 0];
      html += renderStageCordlessDrillSVG(boltPos.x - 24, boltPos.y + 2);
    }
  }

  // 2. Sol Alt: Patlak Tekerlek Varsa Yeşil Basınç Göstergeli Hava Pompası ve Hortumu
  if (hasFlatTire) {
    html += `
      <g transform="translate(68, 242)" class="scene-hero-tool interactive-part" data-part="wheel" data-scene-tool="wrench">
        <!-- Saf Vektör Beyaz Sticker Kontur -->
        <g stroke="#ffffff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff">
          <rect x="-26" y="-68" width="52" height="11" rx="5.5"/>
          <rect x="-5" y="-55" width="10" height="26"/>
          <path d="M -28 68 L -22 14 C -22 -6, 22 -6, 22 14 L 28 68 Z"/>
          <rect x="-34" y="66" width="68" height="10" rx="5"/>
          <path d="M 24 56 C 65 62, 92 84, 145 78 C 192 72, 232 94, 248 54 C 256 34, 242 18, 246 -4" fill="none" stroke-width="16"/>
          <rect x="-9" y="-14" width="18" height="28" rx="4" transform="translate(248, -18) rotate(14)"/>
        </g>
        <!-- T-Kol Tutamaç -->
        <rect x="-26" y="-68" width="52" height="11" rx="5.5" fill="#495057"/>
        <rect x="-10" y="-70" width="20" height="15" rx="3.5" fill="#ff8800"/>
        <rect x="-5" y="-55" width="10" height="26" fill="#adb5bd"/>
        <!-- Yeşil Ana Gövde -->
        <path d="M -28 68 L -22 14 C -22 -6, 22 -6, 22 14 L 28 68 Z" fill="#16db65"/>
        <path d="M -22 68 L -18 16 C -18 2, 0 2, 0 16 L 0 68 Z" fill="#38b000" opacity="0.32"/>
        <rect x="-14" y="-32" width="28" height="10" rx="4" fill="#058c42"/>
        <rect x="-18" y="-22" width="36" height="12" rx="5" fill="#16db65"/>
        <!-- Basınç Göstergesi (Manometre) -->
        <path d="M -18 32 C -18 10, 18 10, 18 32 Z" fill="#fefae0" stroke="#ffbe0b" stroke-width="3.5"/>
        <line x1="0" y1="30" x2="5" y2="16" stroke="#d90429" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="30" r="3.5" fill="#2b2d42"/>
        <!-- Taban -->
        <rect x="-34" y="66" width="68" height="10" rx="5" fill="#343a40"/>
        <!-- Patlak Tekerleğe Uzanan Siyah Hortum ve Yeşil Sibop Ucu -->
        <path d="M 24 56 C 65 62, 92 84, 145 78 C 192 72, 232 94, 248 54 C 256 34, 242 18, 246 -4"
          fill="none" stroke="#2b2d42" stroke-width="8" stroke-linecap="round"/>
        <g transform="translate(248, -18) rotate(14)">
          <rect x="-9" y="-14" width="18" height="28" rx="4" fill="#058c42"/>
          <rect x="-6" y="-11" width="6" height="22" rx="2" fill="#16db65"/>
        </g>
      </g>
    `;
  }

  // 3. Üst Orta: Kasa Henüz Boyanmadıysa Boya Fırçası ve Turuncu Boya Dalgası
  if (isUnpainted) {
    html += `
      <g transform="translate(362, 68)" class="scene-hero-tool interactive-part" data-part="body" data-scene-tool="paint">
        <!-- Saf Vektör Beyaz Sticker Kontur -->
        <g stroke="#ffffff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff">
          <path d="M -28 8 C -34 38, -18 68, 4 68 C 14 68, 12 52, 4 44 C 18 54, 30 48, 20 32 C 34 36, 38 24, 22 10 Z"/>
          <path d="M -28 10 C -30 -14, 4 -28, 26 -26 L 14 2 C 2 14, -16 18, -28 10 Z"/>
          <polygon points="-2,-2 28,-26 38,-16 8,8"/>
          <path d="M 18 -6 L 48 10 C 52 14, 46 22, 38 18 L 8 2 Z"/>
        </g>
        <!-- Sürülen Canlı Sarı-Turuncu Boya Dalgaları -->
        <path d="M -28 8 C -34 38, -18 68, 4 68 C 14 68, 12 52, 4 44 C 18 54, 30 48, 20 32 C 34 36, 38 24, 22 10 Z"
          fill="#ff9f1c" stroke="#e07a00" stroke-width="2.5"/>
        <path d="M -20 18 C -24 40, -12 58, 0 60" fill="none" stroke="#ffbf69" stroke-width="4" stroke-linecap="round"/>
        <!-- Fırça Kılları (Koyu Kahve) -->
        <path d="M -28 10 C -30 -14, 4 -28, 26 -26 L 14 2 C 2 14, -16 18, -28 10 Z" fill="#3d2616"/>
        <path d="M -20 2 C -18 -14, 4 -22, 18 -22" fill="none" stroke="#5c3a21" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Metal Kelepçe -->
        <polygon points="-2,-2 28,-26 38,-16 8,8" fill="#adb5bd"/>
        <polygon points="0,0 30,-24 34,-20 4,4" fill="#dee2e6"/>
        <!-- Ahşap Sap -->
        <path d="M 18 -6 L 48 10 C 52 14, 46 22, 38 18 L 8 2 Z" fill="#582f0e"/>
        <circle cx="38" cy="11" r="2.5" fill="#ffffff"/>
      </g>
    `;
  }

  return html;
}

// Mekanik Somun ve Cıvatalar (Matkapla Sıkılan Burgulu Gövde Vidaları)
function renderBoltsLayerSVG(boltPositions, boltsLoose, isDriving = false) {
  return boltPositions.map((pos, idx) => {
    const isLoose = boltsLoose[idx] && !isDriving;
    const offsetY = isLoose ? -10 : 0;
    const tilt = isLoose ? -15 : 0;
    return `
      <g transform="translate(${pos.x}, ${pos.y})" class="bolt-socket interactive-part" data-part="bolt" data-bolt-index="${idx}">
        <ellipse cx="0" cy="4" rx="10" ry="4.5" fill="#1b1e21"/>
        ${isLoose ? `
          <!-- Dışarı Çıkmış Burgulu Vida Gövdesi (Matkapla Sıkılmaya Hazır!) -->
          <rect x="-4" y="-10" width="8" height="13" fill="#adb5bd" stroke="#343a40" stroke-width="1.5"/>
          <line x1="-4" y1="-7" x2="4" y2="-5" stroke="#495057" stroke-width="1.8"/>
          <line x1="-4" y1="-3" x2="4" y2="-1" stroke="#495057" stroke-width="1.8"/>
        ` : ''}
        <g class="bolt-head-node" transform="translate(0, ${offsetY}) rotate(${tilt})">
          <polygon points="-10,-4 -5,-11 5,-11 10,-4 5,3 -5,3"
            fill="${isLoose ? '#e2e8f0' : '#ffbe0b'}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
          <!-- Yıldız / Artı Matkap Yuvası -->
          <line x1="-4" y1="-4" x2="4" y2="-4" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
          <line x1="0" y1="-8" x2="0" y2="0" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>
        </g>
      </g>
    `;
  }).join('');
}

// Tavan Modifiyeleri (Saf Vektör Beyaz Sticker Konturlu)
function renderRoofModSVG(x, y, roofType) {
  if (roofType === 'rocket') {
    return `
      <g transform="translate(${x}, ${y})" class="interactive-part" data-part="roof">
        <path d="M -46 -8 L -22 -42 L 32 -42 L 50 -8 Z" fill="#e63946" stroke="#ffffff" stroke-width="9" stroke-linejoin="round" paint-order="stroke fill"/>
        <rect x="-10" y="-10" width="20" height="12" fill="#343a40"/>
        <path d="M -20 -36 L 28 -36 L 34 -26 L -26 -26 Z" fill="#ffbe0b"/>
        <polygon points="-46,-8 -58,-2 -58,-38 -34,-32" fill="#2b2d42"/>
        <path d="M -58 -6 C -92 -10, -104 -20, -120 -20 C -104 -28, -88 -34, -58 -34 Z" fill="#ff9f1c" class="turbo-flame"/>
        <path d="M -58 -13 C -80 -15, -88 -20, -96 -20 C -86 -25, -78 -28, -58 -28 Z" fill="#fff3b0" class="turbo-flame"/>
      </g>
    `;
  }

  if (roofType === 'dino') {
    return `
      <g transform="translate(${x}, ${y})" class="interactive-part" data-part="roof">
        <path d="M -42 -2 C -42 -46, 34 -50, 46 -12 L 22 -8 L 34 -2 L -42 -2 Z" fill="#2ec4b6" stroke="#ffffff" stroke-width="9" stroke-linejoin="round" paint-order="stroke fill"/>
        <polygon points="-36,-16 -50,-32 -26,-30" fill="#ffbe0b"/>
        <polygon points="-16,-32 -24,-52 -2,-38" fill="#ffbe0b"/>
        <polygon points="8,-34 8,-54 24,-30" fill="#ffbe0b"/>
        <polygon points="20,-12 25,-3 30,-12 35,-3 40,-12" fill="#ffffff"/>
        <circle cx="16" cy="-25" r="5.5" fill="#fff3b0"/>
        <circle cx="18" cy="-25" r="2.5" fill="#1b1e21"/>
      </g>
    `;
  }

  if (roofType === 'rotor') {
    return `
      <g transform="translate(${x}, ${y})" class="interactive-part" data-part="roof">
        <rect x="-6" y="-34" width="12" height="34" rx="4" fill="#8d99ae" stroke="#ffffff" stroke-width="7" paint-order="stroke fill"/>
        <g class="rotor-blades">
          <rect x="-82" y="-40" width="164" height="8" rx="4" fill="#ffbe0b" stroke="#ffffff" stroke-width="6" paint-order="stroke fill"/>
          <rect x="-72" y="-38" width="28" height="4" fill="#e63946"/>
          <rect x="44" y="-38" width="28" height="4" fill="#e63946"/>
        </g>
        <circle cx="0" cy="-36" r="9" fill="#e63946"/>
      </g>
    `;
  }

  if (roofType === 'siren') {
    return `
      <g transform="translate(${x}, ${y})" class="interactive-part" data-part="roof">
        <rect x="-34" y="-10" width="68" height="10" rx="3" fill="#adb5bd" stroke="#ffffff" stroke-width="8" stroke-linejoin="round" paint-order="stroke fill"/>
        <path d="M -28 -10 C -28 -32, -4 -32, -4 -10 Z" fill="#e63946" stroke="#ffffff" stroke-width="7" stroke-linejoin="round" paint-order="stroke fill"/>
        <path d="M 4 -10 C 4 -32, 28 -32, 28 -10 Z" fill="#0077b6" stroke="#ffffff" stroke-width="7" stroke-linejoin="round" paint-order="stroke fill"/>
        <circle cx="-16" cy="-18" r="5" fill="#fff3b0"/>
        <circle cx="16" cy="-18" r="5" fill="#caf0f8"/>
      </g>
    `;
  }

  // Referans Görseldeki Kabin Önü Projektör Lambası
  return `
    <g transform="translate(${x}, ${y + 22})" class="interactive-part" data-part="roof">
      <path d="M -22 6 L -16 -10 L 2 -10" fill="none" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 6 -22 C 26 -24, 28 4, 6 2 Z" fill="#ffffff" stroke="#ffffff" stroke-width="9" stroke-linejoin="round"/>
      <path d="M -22 6 L -16 -10 L 2 -10" fill="none" stroke="#343a40" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="-2" y="-14" width="10" height="8" rx="2" fill="#343a40"/>
      <path d="M 6 -22 C 26 -24, 28 4, 6 2 Z" fill="#ff9f1c"/>
      <ellipse cx="16" cy="-10" rx="4" ry="9" fill="#fff3b0"/>
    </g>
  `;
}

// 4 Stüdyo Kalitesinde Araç Gövdesi (Saf Vektör Beyaz Sticker Konturlu, Filtresiz 60FPS)
function renderStudioBodySVG(vehicleId, state, u) {
  const bodyFill = `url(#paintMain_${u})`;
  const sideFill = `url(#paintSide_${u})`;
  const bedFill = state.primerUnpainted ? `url(#primerSteel_${u})` : bodyFill;

  if (vehicleId === 'tractor') {
    return `
      <!-- Saf Vektör Beyaz Die-Cut Sticker Dış Çerçevesi (GPU Hızlandırmalı, 0ms Filtre Yükü) -->
      <g stroke="#ffffff" stroke-width="11" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff">
        <path d="M 152 108 L 408 108 L 464 76 C 472 72, 484 70, 496 70 L 556 70 C 566 70, 568 86, 554 88 L 532 94 L 542 164 L 594 164 L 604 168 L 604 252 L 578 264 L 465 270 L 185 270 L 195 182 L 148 118 Z"/>
        <path d="M 495 164 L 495 134 L 578 134 L 578 164" fill="none" stroke-width="13"/>
        <path d="M 522 164 L 522 124 L 594 124 L 594 164" fill="none" stroke-width="13"/>
      </g>

      <!-- Koyu Antrasit Alt Şasi ve Çamurluk Oyukları -->
      <path d="M 195 182 L 425 182 L 465 270 L 185 270 Z" fill="url(#darkChassis_${u})"/>
      <path d="M 408 268 A 78 78 0 0 1 588 268 Z" fill="#1b1e21"/>
      <path d="M 178 268 A 78 78 0 0 1 358 268 Z" fill="#1b1e21"/>

      <!-- Gri Metal Yakıt/Hidrolik Tankı (İki Tekerlek Arası - Referans Görseldeki Detay) -->
      <path d="M 352 204 L 425 204 L 425 268 L 368 268 Z" fill="#adb5bd" stroke="#343a40" stroke-width="3" stroke-linejoin="round"/>
      <path d="M 395 204 L 425 204 L 425 245 Z" fill="${bodyFill}"/>
      <circle cx="376" cy="228" r="6" fill="none" stroke="#1b1e21" stroke-width="3.5"/>
      <circle cx="376" cy="242" r="2.2" fill="#1b1e21"/>
      <circle cx="384" cy="242" r="2.2" fill="#1b1e21"/>

      <!-- Dev Damperli Kasa -->
      <g class="interactive-part" data-part="body">
        <path id="bed-main-path" d="M 148 118 L 408 118 L 388 212 L 215 182 Z" fill="${bedFill}"/>
        <rect x="152" y="108" width="256" height="16" rx="4" fill="#ced4da"/>
        <rect x="152" y="122" width="256" height="6" fill="#6c757d"/>
        <!-- Eğimli Kaburga Destekleri -->
        <polygon points="222,128 242,128 222,184 204,180" fill="#adb5bd"/>
        <polygon points="268,128 288,128 266,192 248,188" fill="#adb5bd"/>
        <polygon points="314,128 334,128 310,200 292,196" fill="#adb5bd"/>
        <polygon points="360,128 380,128 354,208 336,204" fill="#adb5bd"/>
      </g>

      <!-- Koyu Gri Kabin Gövdesi ve Yeşil-Mint Cam -->
      <path d="M 442 184 L 468 106 C 472 96, 480 94, 492 94 L 532 94 L 542 184 Z" fill="#343a40"/>
      <path d="M 464 162 L 482 106 L 534 106 L 538 162 Z" fill="url(#mintGlass_${u})"/>
      <polygon points="488,106 506,106 486,162 470,162" fill="#ffffff" opacity="0.45"/>
      <path d="M 505 112 L 512 112 L 512 152 L 505 152 Z" fill="#212529"/>

      <!-- Damperin Kabin Üstüne Uzanan Devasa Turuncu-Sarı Koruyucu Siperliği -->
      <path d="M 372 198
               L 398 118
               L 464 76
               C 472 72, 484 70, 496 70
               L 556 70
               C 566 70, 568 86, 554 88
               L 482 88
               L 436 196
               C 428 214, 382 214, 372 198 Z"
        fill="${bodyFill}" class="interactive-part" data-part="body"/>
      <path d="M 402 116 L 468 74 L 554 74" fill="none" stroke="#fff3b0" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>

      <!-- Sağ Ön Burun, Çamurluk ve Ön Tampon -->
      <path d="M 438 164 L 592 164 L 600 258 L 578 264 L 552 192 L 438 192 Z" fill="${bodyFill}"/>
      <rect x="436" y="164" width="154" height="16" rx="6" fill="${sideFill}"/>
      <!-- Ön Far Yuvası -->
      <rect x="564" y="186" width="16" height="26" rx="3" fill="#2b2d42"/>
      <rect x="567" y="190" width="10" height="8" rx="1.5" fill="#fff3b0"/>
      <rect x="567" y="201" width="10" height="8" rx="1.5" fill="#ffbe0b"/>
      <path d="M 592 164 L 604 168 L 604 252 L 592 256 Z" fill="#343a40"/>

      <!-- Siyah Güvenlik Korkulukları -->
      <g fill="none" stroke="#1b1e21" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M 495 164 L 495 134 L 578 134 L 578 164"/>
        <path d="M 522 164 L 522 124 L 594 124 L 594 164"/>
        <line x1="550" y1="134" x2="550" y2="164"/>
        <line x1="568" y1="124" x2="568" y2="164"/>
      </g>

      <!-- Parıltı Yıldızları -->
      ${window.renderSparkleStar(452, 115, 9, 0.2)}
      ${window.renderSparkleStar(505, 58, 11, 0.5)}
      ${window.renderSparkleStar(535, 92, 8, 0.8)}
      ${!state.primerUnpainted ? `
        ${window.renderSparkleStar(260, 145, 11, 0.1)}
        ${window.renderSparkleStar(350, 165, 13, 0.4)}
      ` : ''}
    `;
  }

  if (vehicleId === 'excavator') {
    const armRot = state.bucketAngle || 0;
    return `
      <g transform="translate(425, 168) rotate(${armRot})" class="excavator-arm interactive-part" data-part="arm">
        <g stroke="#ffffff" stroke-width="11" stroke-linejoin="round" stroke-linecap="round" fill="#ffffff">
          <path d="M 0 0 L 88 -86 L 122 -70 L 28 24 Z"/>
          <path d="M 94 -78 L 168 -8 L 146 10 L 80 -60 Z"/>
          <path d="M 144 0 C 180 0, 202 38, 166 66 L 118 50 L 134 18 Z"/>
        </g>
        <path d="M 0 0 L 88 -86 L 122 -70 L 28 24 Z" fill="${bodyFill}"/>
        <line x1="16" y1="-26" x2="74" y2="-78" stroke="#ced4da" stroke-width="9" stroke-linecap="round"/>
        <path d="M 94 -78 L 168 -8 L 146 10 L 80 -60 Z" fill="${sideFill}"/>
        <path d="M 144 0 C 180 0, 202 38, 166 66 L 118 50 L 134 18 Z" fill="#495057"/>
        <polygon points="166,66 184,74 174,56" fill="#ffbe0b"/>
        <polygon points="148,60 164,70 156,52" fill="#ffbe0b"/>
      </g>

      <path d="M 172 224 L 182 132 L 268 132 L 286 84 L 408 84 L 438 162 L 455 224 L 475 264 L 180 264 Z"
        fill="#ffffff" stroke="#ffffff" stroke-width="11" stroke-linejoin="round"/>
      <rect x="180" y="218" width="295" height="46" rx="18" fill="url(#darkChassis_${u})"/>
      <path d="M 172 224 L 182 132 L 268 132 L 286 84 L 408 84 L 438 162 L 455 224 Z" fill="${bodyFill}"/>
      <path d="M 178 142 L 262 142 L 262 208 L 178 208 Z" fill="${bedFill}"/>
      <path d="M 296 98 L 394 98 L 418 168 L 286 168 Z" fill="url(#mintGlass_${u})"/>
      <polygon points="308,98 332,98 308,168 292,168" fill="#ffffff" opacity="0.45"/>
      <path d="M 192 132 L 192 108 L 258 108 L 258 132" fill="none" stroke="#1b1e21" stroke-width="5" stroke-linecap="round"/>
    `;
  }

  if (vehicleId === 'firetruck') {
    const ladderTilt = state.roofDent ? -7 : 0;
    return `
      <g transform="translate(295, 82) rotate(${ladderTilt})" class="interactive-part" data-part="roof">
        <rect x="-125" y="-12" width="250" height="20" rx="5" fill="#dee2e6" stroke="#ffffff" stroke-width="9" paint-order="stroke fill"/>
        <rect x="-125" y="-12" width="250" height="20" rx="5" fill="#dee2e6" stroke="#6c757d" stroke-width="2.5"/>
        <line x1="-95" y1="-12" x2="-95" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="-45" y1="-12" x2="-45" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="5" y1="-12" x2="5" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="55" y1="-12" x2="55" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="100" y1="-12" x2="100" y2="8" stroke="#6c757d" stroke-width="4"/>
      </g>

      <path d="M 158 96 L 518 96 L 562 172 L 562 236 L 572 236 L 572 256 L 148 256 L 148 236 L 158 236 Z"
        fill="#ffffff" stroke="#ffffff" stroke-width="11" stroke-linejoin="round"/>
      <rect x="175" y="218" width="380" height="44" rx="14" fill="url(#darkChassis_${u})"/>
      <rect x="158" y="96" width="265" height="152" rx="14" fill="${bodyFill}"/>
      <path d="M 414 96 L 518 96 L 562 172 L 562 248 L 414 248 Z" fill="${sideFill}"/>
      <path d="M 432 112 L 508 112 L 542 168 L 432 168 Z" fill="url(#mintGlass_${u})"/>
      <polygon points="446,112 468,112 446,168 434,168" fill="#ffffff" opacity="0.45"/>
      <rect x="158" y="186" width="404" height="20" fill="#ffffff"/>
      <rect x="185" y="116" width="92" height="58" rx="6" fill="url(#primerSteel_${u})"/>
      <rect x="295" y="116" width="92" height="58" rx="6" fill="url(#primerSteel_${u})"/>
      <rect x="148" y="236" width="424" height="20" rx="8" fill="#ced4da"/>
    `;
  }

  if (vehicleId === 'washer') {
    const doorBroken = state.wheelsBroken[0];
    return `
      <!-- Saf Vektör Beyaz Sticker Dış Kontur (60FPS Tablet GPU) -->
      <rect x="202" y="48" width="286" height="238" rx="24"
        fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round"/>

      <!-- Çamaşır Makinesi Ana Gövde (Boyanmadan Önce Gri Astar Çelik, Boyanınca Canlı Parlak Renk!) -->
      <rect x="205" y="50" width="280" height="234" rx="22" fill="${bedFill}"/>
      <!-- Sağ 3B Derinlik Kenarı -->
      <path d="M 462 50 L 465 50 C 476 50, 485 59, 485 70 L 485 264 C 485 275, 476 284, 465 284 L 462 284 Z" fill="${sideFill}" opacity="0.85"/>
      <!-- Sol Üst Parlama Şeridi -->
      <path d="M 216 64 L 216 266" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35"/>

      <!-- Üst Kontrol Paneli (Deterjan Çekmecesi + Dijital LED Ekran + Program Kadranı) -->
      <path d="M 205 70 C 205 58, 214 50, 226 50 L 464 50 C 476 50, 485 58, 485 70 L 485 102 L 205 102 Z" fill="#f1f5f9"/>
      <line x1="205" y1="102" x2="485" y2="102" stroke="#94a3b8" stroke-width="4"/>

      <!-- Sol: Deterjan ve Köpük Çekmecesi -->
      <rect x="218" y="60" width="76" height="30" rx="7" fill="#e2e8f0" stroke="#64748b" stroke-width="2.5"/>
      <rect x="234" y="72" width="44" height="8" rx="4" fill="#38bdf8"/>
      <!-- Deterjan Gözünden Taşan Köpük Baloncukları -->
      <circle cx="228" cy="62" r="7" fill="#caf0f8" stroke="#ffffff" stroke-width="2"/>
      <circle cx="240" cy="58" r="5.5" fill="#fbcfe8" stroke="#ffffff" stroke-width="2"/>
      <circle cx="282" cy="63" r="6" fill="#caf0f8" stroke="#ffffff" stroke-width="2"/>

      <!-- Orta: Dijital LED Gösterge Ekranı -->
      <rect x="306" y="60" width="82" height="30" rx="7" fill="#0f172a" stroke="#475569" stroke-width="2.5"/>
      <circle cx="320" cy="75" r="4.5" fill="${doorBroken ? '#ef4444' : '#38b000'}"/>
      <circle cx="333" cy="75" r="4.5" fill="#ffbe0b"/>
      <path d="M 346 78 Q 354 68 362 78 T 378 78" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round"/>

      <!-- Sağ: Döner Program Seçici Kadran -->
      <circle cx="436" cy="75" r="15" fill="#334155" stroke="#cbd5e1" stroke-width="3"/>
      <circle cx="436" cy="75" r="9" fill="#f8fafc"/>
      <line x1="436" y1="75" x2="444" y2="68" stroke="#ff9f1c" stroke-width="3.5" stroke-linecap="round"/>

      <!-- Alt Servis ve Pompa Filtre Kapağı -->
      <rect x="220" y="256" width="250" height="20" rx="6" fill="#334155" opacity="0.28"/>
      <circle cx="442" cy="266" r="7" fill="#475569" stroke="#1e293b" stroke-width="2"/>
      <line x1="238" y1="266" x2="295" y2="266" stroke="#475569" stroke-width="3.5" stroke-linecap="round"/>

      <!-- ORTA DEV YUVARLAK TAMBUR VE CAM KAPAK (60FPS Dönen Çamaşırlar ve Köpüklü Su!) -->
      <g transform="translate(345, 178)">
        <!-- Tambur Dış Gölge Yuvası -->
        <circle cx="0" cy="0" r="68" fill="#1e293b"/>
        <circle cx="0" cy="0" r="56" fill="#0f172a"/>

        <!-- 60FPS DÖNEN PASLANMAZ ÇELİK TAMBUR VE RENKLİ ÇAMAŞIRLAR (.wheel-spin-node ile otomatik döner!) -->
        <g class="wheel-spin-node">
          <circle cx="0" cy="0" r="52" fill="#334155"/>
          <!-- Tambur Delikleri ve Kanatçıkları -->
          <circle cx="0" cy="-38" r="3.5" fill="#0f172a"/>
          <circle cx="33" cy="-19" r="3.5" fill="#0f172a"/>
          <circle cx="33" cy="19" r="3.5" fill="#0f172a"/>
          <circle cx="0" cy="38" r="3.5" fill="#0f172a"/>
          <circle cx="-33" cy="19" r="3.5" fill="#0f172a"/>
          <circle cx="-33" cy="-19" r="3.5" fill="#0f172a"/>

          <!-- Tambur İçindeki Renkli Çamaşırlar (Kırmızı Tişört, Sarı Çorap, Mor Havlu) -->
          <path d="M -32 -12 C -24 -36, 12 -38, 26 -16 C 14 -2, -16 4, -32 -12 Z" fill="#e63946"/>
          <path d="M -14 10 C 8 -8, 38 4, 28 28 C 12 40, -24 30, -14 10 Z" fill="#ffbe0b"/>
          <path d="M -36 8 C -20 2, -6 22, -18 36 C -34 34, -44 18, -36 8 Z" fill="#7209b7"/>

          <!-- Köpüklü Turkuaz Su Dalgası -->
          <path d="M -48 6 Q -24 -10 0 6 T 48 6 A 48 48 0 0 1 -48 6 Z" fill="#38bdf8" opacity="0.82"/>
          <path d="M -44 18 Q -18 6 8 18 T 44 18 A 46 46 0 0 1 -44 18 Z" fill="#0077b6" opacity="0.75"/>

          <!-- Su İçi Sabun Köpükleri -->
          <circle cx="-18" cy="-8" r="7" fill="#ffffff" opacity="0.85"/>
          <circle cx="16" cy="-14" r="5.5" fill="#caf0f8" opacity="0.9"/>
          <circle cx="6" cy="12" r="8" fill="#ffffff" opacity="0.75"/>
          <circle cx="-22" cy="18" r="5" fill="#caf0f8" opacity="0.85"/>
        </g>

        <!-- Krom Kapak Çerçevesi ve Cam Yansıması (Arızalıyken Sıkışmış Çizgili Çorap Sarkıyor!) -->
        <g transform="rotate(${doorBroken ? -8 : 0})">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#cbd5e1" stroke-width="12"/>
          <circle cx="0" cy="0" r="60" fill="none" stroke="#f8fafc" stroke-width="5"/>
          <!-- Cam Parlaması -->
          <path d="M -36 -24 A 44 44 0 0 1 28 -32" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" opacity="0.55"/>
          <!-- Sağ Kapak Mandalı -->
          <rect x="50" y="-14" width="14" height="28" rx="5" fill="#334155" stroke="#ffffff" stroke-width="2"/>
        </g>

        ${doorBroken ? `
          <!-- Kapağa Sıkışmış Komik Pembe-Sarı Çizgili Çorap (Tamir Edilince İçeri Girer!) -->
          <g transform="translate(-44, 38) rotate(18)">
            <path d="M 0 0 L 18 6 L 12 32 C 10 42, -14 42, -18 32 C -22 24, -8 18, -4 14 Z"
              fill="#ff4d8d" stroke="#ffffff" stroke-width="4" stroke-linejoin="round" paint-order="stroke fill"/>
            <line x1="-2" y1="8" x2="14" y2="13" stroke="#ffbe0b" stroke-width="4.5"/>
            <line x1="-4" y1="17" x2="12" y2="22" stroke="#ffbe0b" stroke-width="4.5"/>
          </g>
        ` : ''}
      </g>

      ${!state.primerUnpainted ? `
        ${window.renderSparkleStar(228, 108, 10, 0.1)}
        ${window.renderSparkleStar(462, 108, 12, 0.4)}
      ` : ''}
    `;
  }

  if (vehicleId === 'dishwasher') {
    const doorBroken = state.wheelsBroken[0];
    return `
      <!-- Saf Vektör Beyaz Sticker Dış Kontur (60FPS Tablet GPU) -->
      <rect x="202" y="48" width="286" height="238" rx="18"
        fill="#ffffff" stroke="#ffffff" stroke-width="12" stroke-linejoin="round"/>

      <!-- Bulaşık Makinesi Ana Gövde (Boyanmadan Önce Gri Astar Çelik, Boyanınca Canlı Parlak Renk!) -->
      <rect x="205" y="50" width="280" height="234" rx="16" fill="${bedFill}"/>
      <!-- Sağ 3B Derinlik Kenarı -->
      <path d="M 462 50 L 469 50 C 478 50, 485 57, 485 66 L 485 268 C 485 277, 478 284, 469 284 L 462 284 Z" fill="${sideFill}" opacity="0.85"/>
      <!-- Sol Üst Parlama Şeridi -->
      <path d="M 216 64 L 216 266" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.35"/>

      <!-- Üst Dijital Kontrol Paneli ve Kapak Kolu -->
      <path d="M 205 66 C 205 57, 212 50, 221 50 L 469 50 C 478 50, 485 57, 485 66 L 485 100 L 205 100 Z" fill="#1e293b"/>
      <line x1="205" y1="100" x2="485" y2="100" stroke="#94a3b8" stroke-width="4"/>

      <!-- Sol: Yıkama Program Tuşları ve Tablet Deterjan Göstergesi -->
      <rect x="220" y="62" width="24" height="24" rx="5" fill="#334155" stroke="#64748b" stroke-width="2"/>
      <circle cx="232" cy="74" r="5" fill="#38bdf8"/>
      <rect x="250" y="62" width="24" height="24" rx="5" fill="#334155" stroke="#64748b" stroke-width="2"/>
      <circle cx="262" cy="74" r="5" fill="#ffbe0b"/>
      <rect x="280" y="62" width="18" height="24" rx="4" fill="#334155"/>

      <!-- Orta: Krom Ankastre Kapak Kolu -->
      <rect x="308" y="62" width="74" height="16" rx="8" fill="#cbd5e1" stroke="#475569" stroke-width="2.5"/>
      <rect x="316" y="66" width="58" height="6" rx="3" fill="#475569"/>

      <!-- Sağ: Dijital Sıcaklık ve Durum LED Ekranı -->
      <rect x="394" y="60" width="76" height="28" rx="6" fill="#0f172a" stroke="#475569" stroke-width="2"/>
      <circle cx="408" cy="74" r="5" fill="${doorBroken ? '#ef4444' : '#38b000'}"/>
      <rect x="420" y="67" width="16" height="14" rx="3" fill="#38bdf8" opacity="0.85"/>
      <rect x="442" y="67" width="18" height="14" rx="3" fill="#ff9f1c" opacity="0.85"/>

      <!-- BULAŞIK MAKİNESİ İÇ KAZAN CAM PENCERESİ (Üst Sepet, Alt Sepet ve 60FPS Dönen Su Fıskiyesi!) -->
      <g transform="translate(345, 182)">
        <rect x="-104" y="-68" width="208" height="136" rx="14" fill="#0f172a" stroke="#cbd5e1" stroke-width="8"/>
        <rect x="-96" y="-60" width="192" height="120" rx="10" fill="#1e293b"/>

        <!-- ÜST SEPET (Renkli Kupa Bardaklar ve Kaseler) -->
        <g transform="translate(0, -30)">
          <!-- Kırmızı Kase -->
          <path d="M -78 -8 C -78 10, -46 10, -46 -8 Z" fill="#e63946" stroke="#ffffff" stroke-width="2"/>
          <!-- Sarı Kupa -->
          <rect x="-34" y="-16" width="22" height="22" rx="4" fill="#ffbe0b" stroke="#ffffff" stroke-width="2"/>
          <!-- Turkuaz Kupa -->
          <rect x="-2" y="-16" width="22" height="22" rx="4" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
          <!-- Pembe Kase -->
          <path d="M 32 -8 C 32 10, 68 10, 68 -8 Z" fill="#ff4d8d" stroke="#ffffff" stroke-width="2"/>
          <!-- Tel Sepet Izgarası -->
          <line x1="-88" y1="8" x2="88" y2="8" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
          <line x1="-70" y1="-2" x2="-70" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
          <line x1="-40" y1="-2" x2="-40" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
          <line x1="-10" y1="-2" x2="-10" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
          <line x1="25" y1="-2" x2="25" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
          <line x1="55" y1="-2" x2="55" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
          <line x1="78" y1="-2" x2="78" y2="8" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round"/>
        </g>

        <!-- ALT SEPET (Tabaklar, Tencere ve Çatal-Kaşık Sepeti) -->
        <g transform="translate(0, 32)">
          <!-- Sıralı Yemek Tabakları -->
          <ellipse cx="-68" cy="0" rx="7" ry="20" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5" transform="rotate(-8 -68 0)"/>
          <ellipse cx="-48" cy="0" rx="7" ry="20" fill="#caf0f8" stroke="#0077b6" stroke-width="2.5" transform="rotate(-8 -48 0)"/>
          <ellipse cx="-28" cy="0" rx="7" ry="20" fill="#ffffff" stroke="#38bdf8" stroke-width="2.5" transform="rotate(-8 -28 0)"/>
          <!-- Turuncu Tencere -->
          <rect x="-6" y="-8" width="44" height="24" rx="6" fill="#ff9f1c" stroke="#ffffff" stroke-width="2"/>
          <rect x="-12" y="-4" width="6" height="8" rx="2" fill="#334155"/>
          <rect x="38" y="-4" width="6" height="8" rx="2" fill="#334155"/>
          <!-- Çatal Kaşık Sepeti -->
          <rect x="52" y="-6" width="28" height="22" rx="4" fill="#475569" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="60" y1="-16" x2="60" y2="-6" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="70" y1="-16" x2="70" y2="-6" stroke="#e2e8f0" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Alt Tel Izgara -->
          <line x1="-88" y1="18" x2="88" y2="18" stroke="#94a3b8" stroke-width="4.5" stroke-linecap="round"/>
        </g>

        <!-- 60FPS DÖNEN SU FISKİYESİ PERVANESİ (.wheel-spin-node ile otomatik döner!) -->
        <g transform="translate(0, 2)">
          <g class="wheel-spin-node">
            <rect x="-64" y="-6" width="128" height="12" rx="6" fill="#38bdf8" stroke="#ffffff" stroke-width="2.5"/>
            <rect x="-6" y="-42" width="12" height="84" rx="6" fill="#00b4d8" stroke="#ffffff" stroke-width="2.5"/>
            <circle cx="0" cy="0" r="11" fill="#ffbe0b" stroke="#ffffff" stroke-width="2.5"/>
            <!-- Su Püskürtme Nozulları ve Damlalar -->
            <circle cx="-48" cy="0" r="3.5" fill="#ffffff"/>
            <circle cx="48" cy="0" r="3.5" fill="#ffffff"/>
            <circle cx="0" cy="-30" r="3.5" fill="#ffffff"/>
            <circle cx="0" cy="30" r="3.5" fill="#ffffff"/>
            <circle cx="-30" cy="-22" r="5" fill="#caf0f8" opacity="0.9"/>
            <circle cx="32" cy="20" r="5" fill="#caf0f8" opacity="0.9"/>
          </g>
        </g>

        <!-- Cam Parlaması -->
        <path d="M -84 -46 L -38 -46 L -64 42 L -84 42 Z" fill="#ffffff" opacity="0.16"/>

        ${doorBroken ? `
          <!-- Arızalıyken Kapaktan Taşan Köpük ve Sıkışmış Tabak/Kaşık -->
          <g transform="translate(-56, 56) rotate(-14)">
            <ellipse cx="0" cy="0" rx="18" ry="9" fill="#ff4d8d" stroke="#ffffff" stroke-width="3.5"/>
            <circle cx="16" cy="-4" r="8" fill="#caf0f8" stroke="#ffffff" stroke-width="2"/>
            <circle cx="26" cy="2" r="6" fill="#ffffff"/>
          </g>
        ` : ''}
      </g>

      <!-- Alt Baza Kapağı -->
      <rect x="220" y="260" width="250" height="16" rx="5" fill="#334155" opacity="0.32"/>

      ${!state.primerUnpainted ? `
        ${window.renderSparkleStar(228, 108, 10, 0.1)}
        ${window.renderSparkleStar(462, 108, 12, 0.4)}
      ` : ''}
    `;
  }

  return `
    <path d="M 158 204 L 176 132 L 268 132 L 306 78 L 436 78 L 478 132 L 568 142 L 576 204 L 540 241 L 205 241 Z"
      fill="#ffffff" stroke="#ffffff" stroke-width="11" stroke-linejoin="round"/>
    <rect x="205" y="205" width="335" height="36" rx="12" fill="url(#darkChassis_${u})"/>
    <line x1="250" y1="235" x2="315" y2="195" stroke="#adb5bd" stroke-width="9" stroke-linecap="round"/>
    <line x1="495" y1="235" x2="430" y2="195" stroke="#adb5bd" stroke-width="9" stroke-linecap="round"/>

    <path d="M 158 204 L 176 132 L 268 132 L 306 78 L 436 78 L 478 132 L 568 142 L 576 204 Z" fill="${bodyFill}"/>
    <path d="M 162 136 L 272 136 L 272 198 L 162 198 Z" fill="${bedFill}"/>
    <path d="M 164 174 L 572 174 L 574 190 L 162 190 Z" fill="#ffbe0b"/>
    <path d="M 318 92 L 424 92 L 458 140 L 292 140 Z" fill="url(#mintGlass_${u})"/>
    <polygon points="332,92 356,92 332,140 312,140" fill="#ffffff" opacity="0.45"/>
  `;
}

function renderDecalsLayerSVG(cfg, decals) {
  return decals.map((key, idx) => {
    const slot = cfg.decalSlots[idx % cfg.decalSlots.length];
    return window.DECAL_SVGS[key] ? window.DECAL_SVGS[key](slot.x, slot.y) : '';
  }).join('');
}

function computeLayerSignatures(vehicleId, state, isDriving) {
  const totalMud = state.mudLevels.reduce((acc, v) => acc + v, 0) / state.mudLevels.length;
  const hasMud = totalMud > 0.05;
  return {
    paletteSig: `${state.colorIndex}`,
    bodySig: `${vehicleId}|${state.primerUnpainted}|${state.bucketAngle}|${state.roofDent}|${state.wheelsBroken[0]}`,
    roofSig: `${vehicleId}|${state.roofType}`,
    decalsSig: state.decals.join(','),
    mudBinarySig: `${vehicleId}|${isDriving}|${hasMud ? 'dirty' : 'clean'}`,
    mudOpacity: Math.min(1, totalMud * 1.15).toFixed(2),
    boltsSig: `${isDriving}|${state.boltsLoose.join(',')}`,
    wheelsSig: `${isDriving}|${state.wheelType}|${state.wheelsBroken.join(',')}`,
    toolsSig: `${vehicleId}|${isDriving}|${hasMud}|${state.boltsLoose.join(',')}|${state.wheelsBroken[0]}|${state.primerUnpainted}`
  };
}

function buildCompleteVehicleSVG(vehicleId, state, isDriving = false) {
  const cfg = VEHICLE_CATALOG[vehicleId];
  const palette = PAINT_PALETTE[state.colorIndex % PAINT_PALETTE.length];
  const u = window.uid('veh');
  const sigs = computeLayerSignatures(vehicleId, state, isDriving);

  const wheelsMarkup = cfg.wheelPositions
    .map((w, i) => renderStudioWheelSVG(w, i, state.wheelType, state.wheelsBroken[i], u, isDriving, Boolean(cfg.isAppliance)))
    .join('');

  return `
    <svg class="vehicle-svg" viewBox="0 0 680 360" role="img" aria-label="${cfg.title}"
      data-vehicle-id="${vehicleId}" data-uid="${u}" data-driving="${isDriving}">
      ${renderVehicleDefs(u, palette)}

      <!-- SABİT ZEMİN GÖLGESİ (Araç zıpladığında yerde kalır!) -->
      <ellipse id="vehicle-ground-shadow" cx="385" cy="332" rx="225" ry="18" fill="#0f172a" opacity="0.22"/>

      <!-- HAVALANABİLEN ARAÇ VE SAHNE ALET GRUBU (Filtresiz Saf Vektör Sticker Konturlu - 60FPS Tablet GPU) -->
      <g id="vehicle-airborne-group">
        <g id="chassis-rig" class="chassis-rig">
          <g id="body-shell" class="interactive-part" data-part="body" data-sig="${sigs.bodySig}">
            ${renderStudioBodySVG(vehicleId, state, u)}
          </g>
          <g id="roof-mod-layer" data-sig="${sigs.roofSig}">
            ${renderRoofModSVG(cfg.roofAnchor.x, cfg.roofAnchor.y, state.roofType)}
          </g>
          <g id="decals-layer" data-sig="${sigs.decalsSig}">
            ${renderDecalsLayerSVG(cfg, state.decals)}
          </g>
          <g id="mud-layer" data-sig="${sigs.mudBinarySig}">
            ${renderAuthenticRustMudSVG(state.mudLevels, u, isDriving, vehicleId)}
          </g>
          <g id="bolts-layer" data-sig="${sigs.boltsSig}">
            ${renderBoltsLayerSVG(cfg.boltPositions, state.boltsLoose, isDriving)}
          </g>
        </g>

        <g id="wheels-layer" data-sig="${sigs.wheelsSig}">
          ${wheelsMarkup}
        </g>

        <g id="scene-tools-layer" data-sig="${sigs.toolsSig}">
          ${renderSceneInteractiveToolsSVG(state, isDriving, vehicleId)}
        </g>
      </g>
    </svg>
  `;
}

// Tabletlerde DOM Thrashing'i Önleyen Yerinde (In-Place) Alt Katman Güncelleyici
function updateVehicleInPlace(containerEl, vehicleId, state, isDriving = false) {
  const existingSvg = containerEl.querySelector('svg.vehicle-svg');
  if (
    !existingSvg ||
    existingSvg.dataset.vehicleId !== vehicleId ||
    existingSvg.dataset.driving !== String(isDriving)
  ) {
    containerEl.innerHTML = buildCompleteVehicleSVG(vehicleId, state, isDriving);
    return true; // Tam montaj yapıldı
  }

  const u = existingSvg.dataset.uid;
  const cfg = VEHICLE_CATALOG[vehicleId];
  const palette = PAINT_PALETTE[state.colorIndex % PAINT_PALETTE.length];
  const sigs = computeLayerSignatures(vehicleId, state, isDriving);

  // 1. Renk Paleti Gradyan Duraklarını Yerinde Güncelle
  if (existingSvg.dataset.paletteSig !== sigs.paletteSig) {
    existingSvg.dataset.paletteSig = sigs.paletteSig;
    const stopLight = existingSvg.querySelector('[data-stop="light"]');
    const stopPrimary = existingSvg.querySelector('[data-stop="primary"]');
    const stopDark = existingSvg.querySelector('[data-stop="dark"]');
    const stopDeep = existingSvg.querySelector('[data-stop="deep"]');
    const stopSidePrimary = existingSvg.querySelector('[data-stop="side-primary"]');
    const stopSideDark = existingSvg.querySelector('[data-stop="side-dark"]');
    if (stopLight) stopLight.setAttribute('stop-color', palette.light);
    if (stopPrimary) stopPrimary.setAttribute('stop-color', palette.primary);
    if (stopDark) stopDark.setAttribute('stop-color', palette.dark);
    if (stopDeep) stopDeep.setAttribute('stop-color', palette.deep);
    if (stopSidePrimary) stopSidePrimary.setAttribute('stop-color', palette.primary);
    if (stopSideDark) stopSideDark.setAttribute('stop-color', palette.dark);
  }

  // 2. Gövde Katmanı
  const bodyShell = existingSvg.querySelector('#body-shell');
  let drumRefreshed = false;
  if (bodyShell && bodyShell.dataset.sig !== sigs.bodySig) {
    bodyShell.dataset.sig = sigs.bodySig;
    bodyShell.innerHTML = renderStudioBodySVG(vehicleId, state, u);
    drumRefreshed = true;
  }

  // 3. Tavan Modifiye Katmanı
  const roofLayer = existingSvg.querySelector('#roof-mod-layer');
  if (roofLayer && roofLayer.dataset.sig !== sigs.roofSig) {
    roofLayer.dataset.sig = sigs.roofSig;
    roofLayer.innerHTML = renderRoofModSVG(cfg.roofAnchor.x, cfg.roofAnchor.y, state.roofType);
  }

  // 4. Çıkartmalar Katmanı
  const decalsLayer = existingSvg.querySelector('#decals-layer');
  if (decalsLayer && decalsLayer.dataset.sig !== sigs.decalsSig) {
    decalsLayer.dataset.sig = sigs.decalsSig;
    decalsLayer.innerHTML = renderDecalsLayerSVG(cfg, state.decals);
  }

  // 5. Pas & Çamur Katmanı (Sürükleme sırasında yalnız opacity özniteliği güncellenir, DOM silinmez!)
  const mudLayer = existingSvg.querySelector('#mud-layer');
  if (mudLayer) {
    if (mudLayer.dataset.sig !== sigs.mudBinarySig) {
      mudLayer.dataset.sig = sigs.mudBinarySig;
      mudLayer.innerHTML = renderAuthenticRustMudSVG(state.mudLevels, u, isDriving, vehicleId);
    } else {
      const mudBlob = mudLayer.querySelector('.mud-blob');
      if (mudBlob) {
        mudBlob.setAttribute('opacity', sigs.mudOpacity);
      }
    }
  }

  // 6. Cıvata & Somunlar Katmanı
  const boltsLayer = existingSvg.querySelector('#bolts-layer');
  if (boltsLayer && boltsLayer.dataset.sig !== sigs.boltsSig) {
    boltsLayer.dataset.sig = sigs.boltsSig;
    boltsLayer.innerHTML = renderBoltsLayerSVG(cfg.boltPositions, state.boltsLoose, isDriving);
  }

  // 7. Tekerlekler Katmanı
  let wheelsRefreshed = false;
  const wheelsLayer = existingSvg.querySelector('#wheels-layer');
  if (wheelsLayer && wheelsLayer.dataset.sig !== sigs.wheelsSig) {
    wheelsLayer.dataset.sig = sigs.wheelsSig;
    wheelsLayer.innerHTML = cfg.wheelPositions
      .map((w, i) => renderStudioWheelSVG(w, i, state.wheelType, state.wheelsBroken[i], u, isDriving, Boolean(cfg.isAppliance)))
      .join('');
    wheelsRefreshed = true;
  }

  // 8. Sahne Üstü Aletler Katmanı
  const toolsLayer = existingSvg.querySelector('#scene-tools-layer');
  if (toolsLayer && toolsLayer.dataset.sig !== sigs.toolsSig) {
    toolsLayer.dataset.sig = sigs.toolsSig;
    toolsLayer.innerHTML = renderSceneInteractiveToolsSVG(state, isDriving, vehicleId);
  }

  return drumRefreshed || wheelsRefreshed;
}

window.VEHICLE_CATALOG = VEHICLE_CATALOG;
window.PAINT_PALETTE = PAINT_PALETTE;
window.WHEEL_TYPES = WHEEL_TYPES;
window.ROOF_TYPES = ROOF_TYPES;
window.DECAL_KEYS = DECAL_KEYS;
window.createInitialVehicleState = createInitialVehicleState;
window.buildCompleteVehicleSVG = buildCompleteVehicleSVG;
window.updateVehicleInPlace = updateVehicleInPlace;
