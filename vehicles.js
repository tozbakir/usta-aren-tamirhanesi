// Usta Aren'in Çılgın Tamirhanesi - Referans Görsel Kompozisyonlu Stüdyo Vektör Araçlar

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
    welcomeVoice: 'Dev Kaya Kamyonu tamirhanede Usta Aren! Pompayla patlak lastiği şişirelim, taşlamayla pasları silip fırçayla boyayalım!',
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
    welcomeVoice: 'Dev Kepçe geldi Usta Aren! Hidrolik kolunu, lastiklerini ve çamurlarını temizleyelim!',
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
    welcomeVoice: 'Süper İtfaiye garajda Usta Aren! Patlak tekerleğini şişirelim ve sirenini parlatıp yola çıkalım!',
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
    welcomeVoice: 'Canavar Kamyon tamirhanede! Dev tekerlekleri şişirelim ve roket motoru takalım Usta Aren!',
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
    boltsLoose: [true, true, false],
    mudLevels: [1, 1, 1],
    decals: [],
    bucketAngle: 0
  };
}

function renderVehicleDefs(u, palette) {
  return `
    <defs>
      <!-- Referans Görseldeki Beyaz Die-Cut Sticker Çerçevesi + Yumuşak Gölge (Geniş Bölge, Kesilme Yok!) -->
      <filter id="sticker_${u}" x="-25%" y="-35%" width="150%" height="170%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="4.5" result="dilated"/>
        <feFlood flood-color="#ffffff" result="white"/>
        <feComposite in="white" in2="dilated" operator="in" result="stickerBorder"/>
        <feDropShadow in="stickerBorder" dx="0" dy="5" stdDeviation="4" flood-color="#0a2540" flood-opacity="0.26" result="BorderShadow"/>
        <feMerge>
          <feMergeNode in="BorderShadow"/>
          <feMergeNode in="stickerBorder"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      <linearGradient id="paintMain_${u}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${palette.light}"/>
        <stop offset="18%" stop-color="${palette.primary}"/>
        <stop offset="85%" stop-color="${palette.dark}"/>
        <stop offset="100%" stop-color="${palette.deep}"/>
      </linearGradient>

      <linearGradient id="paintSide_${u}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${palette.primary}"/>
        <stop offset="100%" stop-color="${palette.dark}"/>
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

// Referans Görseldeki Detaylı İş Makinesi Tekerleği + Patlak Lastik & Saplanmış Yapraklı Dal
function renderStudioWheelSVG(wheelCfg, idx, wheelType, isBroken, u, isDriving = false) {
  const { x, y, r } = wheelCfg;

  if (isBroken && !isDriving) {
    return `
      <g transform="translate(${x}, ${y})" class="wheel-group interactive-part" data-part="wheel" data-wheel-index="${idx}">
        <!-- Hava Kaçırma Bulutu (Referans Görseldeki Beyaz Puf) -->
        <g class="air-leak-puff" transform="translate(${-r - 28}, ${-r * 0.52})">
          <path d="M 22 16 C 6 20, -16 16, -20 2 C -28 -8, -20 -24, -4 -20 C 6 -32, 26 -24, 24 -8 C 32 -2, 30 12, 22 16 Z"
            fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
          <path d="M 28 10 L 46 18 M 26 2 L 44 6" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round"/>
        </g>

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
          <path d="M -2 10 L -14 -24 L -6 -26 L 6 8 Z" fill="#9c6644"/>
          <path d="M -12 -20 C -28 -26, -34 -12, -14 -10 Z" fill="#38b000"/>
          <path d="M -8 -22 C -2 -36, 14 -28, -4 -14 Z" fill="#70e000"/>
        </g>
      </g>
    `;
  }

  let wheelGraphic = '';

  if (wheelType === 'donut') {
    wheelGraphic = `
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
      <path d="M ${-r*0.82} -14 L ${r*0.82} -14 L ${r*0.6} 18 L ${-r*0.6} 18 Z" fill="#495057" stroke="#adb5bd" stroke-width="3" stroke-linejoin="round"/>
      <rect x="${-r*0.48}" y="-6" width="${r*0.96}" height="10" rx="5" fill="#00f5d4"/>
    `;
  } else if (wheelType === 'gear') {
    wheelGraphic = `
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

// Referans Görseldeki Düzensiz Sıçramış Pas & Çamur Katmanı (Damperin Sol Kenarını Kaplayan Gerçekçi Doku)
function renderAuthenticRustMudSVG(mudLevels, u, isDriving = false) {
  if (isDriving) return '';
  const totalMud = mudLevels.reduce((acc, v) => acc + v, 0) / mudLevels.length;
  if (totalMud <= 0.05) {
    return `
      ${window.renderSparkleStar(185, 135, 12, 0.1)}
      ${window.renderSparkleStar(245, 165, 10, 0.4)}
      ${window.renderSparkleStar(165, 175, 11, 0.7)}
    `;
  }

  return `
    <g class="mud-blob interactive-part" data-part="mud" data-mud-index="0" opacity="${Math.min(1, totalMud * 1.15).toFixed(2)}">
      <!-- Koyu Kahve Alt Pas/Çamur Yığını (Referans görseldeki kasanın sol ucundaki organik sıçrama) -->
      <path d="M 142 115
               C 155 102, 185 108, 198 112
               C 218 104, 255 106, 272 114
               C 262 126, 245 130, 268 142
               C 252 154, 228 152, 242 168
               C 224 182, 204 196, 178 192
               C 154 186, 134 166, 142 146
               C 132 134, 136 122, 142 115 Z"
        fill="#4a2103"/>

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

      <!-- Etrafa Fırlayan Çamur/Pas Parçacıkları (Referans görselde taşlama diskinin etrafındaki parçalar) -->
      <path d="M 88 92 C 94 84, 112 86, 108 98 C 102 106, 84 102, 88 92 Z" fill="#8b4513"/>
      <path d="M 118 82 C 124 76, 138 80, 134 90 C 128 96, 114 90, 118 82 Z" fill="#6f3b11"/>
      <path d="M 116 178 C 124 170, 138 176, 132 188 C 122 196, 110 186, 116 178 Z" fill="#8b4513"/>
      <circle cx="144" cy="96" r="5" fill="#7f4f24"/>
      <circle cx="132" cy="162" r="4.5" fill="#582f0e"/>
    </g>
  `;
}

// Referans Görseldeki Sahne Üstü Aktif Aletler (Sol Üstte Taşlama, Sol Altta Yeşil Pompa, Üstte Boya Fırçası)
function renderSceneInteractiveToolsSVG(state, isDriving = false) {
  if (isDriving) return '';
  const hasMud = state.mudLevels.some((m) => m > 0.05);
  const hasFlatTire = state.wheelsBroken[0];
  const isUnpainted = state.primerUnpainted;

  let html = '';

  // 1. Sol Üst: Pas/Çamur Varsa Dönen Sarı Taşlama Makinesi (Referans görseldeki birebir konum ve açı!)
  if (hasMud) {
    html += `
      <g transform="translate(86, 136)" class="scene-hero-tool interactive-part" data-part="mud" data-scene-tool="drill">
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
        <!-- Parlak Sarı Kıvılcım Parlaması (Tam Pasla Temas Noktasında!) -->
        <circle cx="48" cy="-6" r="11" fill="#fff3b0" opacity="0.85" class="hint-pulse"/>
        <circle cx="48" cy="-6" r="6" fill="#ffbe0b"/>
      </g>
    `;
  }

  // 2. Sol Alt: Patlak Tekerlek Varsa Yeşil Basınç Göstergeli Hava Pompası ve Hortumu (Referans görseldeki birebir konum!)
  if (hasFlatTire) {
    html += `
      <g transform="translate(68, 242)" class="scene-hero-tool interactive-part" data-part="wheel" data-scene-tool="wrench">
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

  // 3. Üst Orta: Kasa Henüz Boyanmadıysa Boya Fırçası ve Turuncu Boya Dalgası (Referans görseldeki birebir konum!)
  if (isUnpainted) {
    html += `
      <g transform="translate(362, 68)" class="scene-hero-tool interactive-part" data-part="body" data-scene-tool="paint">
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

// Mekanik Somun ve Cıvatalar (Gereksiz Kesikli Çizgi Yok, Temiz Metalik Somunlar)
function renderBoltsLayerSVG(boltPositions, boltsLoose, isDriving = false) {
  return boltPositions.map((pos, idx) => {
    const isLoose = boltsLoose[idx] && !isDriving;
    const offsetY = isLoose ? -8 : 0;
    const tilt = isLoose ? -14 : 0;
    return `
      <g transform="translate(${pos.x}, ${pos.y})" class="bolt-socket interactive-part" data-part="bolt" data-bolt-index="${idx}">
        <ellipse cx="0" cy="3" rx="9" ry="4" fill="#1b1e21"/>
        ${isLoose ? `<rect x="-3.5" y="-8" width="7" height="10" fill="#8d99ae"/>` : ''}
        <g class="bolt-head-node" transform="translate(0, ${offsetY}) rotate(${tilt})">
          <polygon points="-9,-4 -4.5,-10 4.5,-10 9,-4 4.5,2 -4.5,2" fill="${isLoose ? '#ced4da' : '#ffbe0b'}"/>
          <polygon points="-7,-5 -3.5,-8.5 3.5,-8.5 7,-5" fill="#ffffff" opacity="0.45"/>
        </g>
      </g>
    `;
  }).join('');
}

// Tavan Modifiyeleri (Kabin/Siperlik Üstünde Doğru Katmanda!)
function renderRoofModSVG(x, y, roofType) {
  if (roofType === 'rocket') {
    return `
      <g transform="translate(${x}, ${y})" class="interactive-part" data-part="roof">
        <rect x="-10" y="-10" width="20" height="12" fill="#343a40"/>
        <path d="M -46 -8 L -22 -42 L 32 -42 L 50 -8 Z" fill="#e63946"/>
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
        <path d="M -42 -2 C -42 -46, 34 -50, 46 -12 L 22 -8 L 34 -2 L -42 -2 Z" fill="#2ec4b6"/>
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
        <rect x="-6" y="-34" width="12" height="34" rx="4" fill="#8d99ae"/>
        <g class="rotor-blades">
          <rect x="-82" y="-40" width="164" height="8" rx="4" fill="#ffbe0b"/>
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
        <rect x="-34" y="-10" width="68" height="10" rx="3" fill="#adb5bd"/>
        <path d="M -28 -10 C -28 -32, -4 -32, -4 -10 Z" fill="#e63946"/>
        <path d="M 4 -10 C 4 -32, 28 -32, 28 -10 Z" fill="#0077b6"/>
        <circle cx="-16" cy="-18" r="5" fill="#fff3b0"/>
        <circle cx="16" cy="-18" r="5" fill="#caf0f8"/>
      </g>
    `;
  }

  // Referans Görseldeki Kabin Önü Projektör Lambası (x=525, y=94 hizasında)
  return `
    <g transform="translate(${x}, ${y + 22})" class="interactive-part" data-part="roof">
      <path d="M -22 6 L -16 -10 L 2 -10" fill="none" stroke="#343a40" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="-2" y="-14" width="10" height="8" rx="2" fill="#343a40"/>
      <path d="M 6 -22 C 26 -24, 28 4, 6 2 Z" fill="#ff9f1c"/>
      <ellipse cx="16" cy="-10" rx="4" ry="9" fill="#fff3b0"/>
    </g>
  `;
}

// 4 Stüdyo Kalitesinde Araç Gövdesi
function renderStudioBodySVG(vehicleId, state, u) {
  const bodyFill = `url(#paintMain_${u})`;
  const sideFill = `url(#paintSide_${u})`;
  const bedFill = state.primerUnpainted ? `url(#primerSteel_${u})` : bodyFill;

  if (vehicleId === 'tractor') {
    return `
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
        <path d="M 148 118 L 408 118 L 388 212 L 215 182 Z" fill="${bedFill}"/>
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
        <path d="M 0 0 L 88 -86 L 122 -70 L 28 24 Z" fill="${bodyFill}"/>
        <line x1="16" y1="-26" x2="74" y2="-78" stroke="#ced4da" stroke-width="9" stroke-linecap="round"/>
        <path d="M 94 -78 L 168 -8 L 146 10 L 80 -60 Z" fill="${sideFill}"/>
        <path d="M 144 0 C 180 0, 202 38, 166 66 L 118 50 L 134 18 Z" fill="#495057"/>
        <polygon points="166,66 184,74 174,56" fill="#ffbe0b"/>
        <polygon points="148,60 164,70 156,52" fill="#ffbe0b"/>
      </g>

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
        <rect x="-125" y="-12" width="250" height="20" rx="5" fill="#dee2e6" stroke="#6c757d" stroke-width="2.5"/>
        <line x1="-95" y1="-12" x2="-95" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="-45" y1="-12" x2="-45" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="5" y1="-12" x2="5" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="55" y1="-12" x2="55" y2="8" stroke="#6c757d" stroke-width="4"/>
        <line x1="100" y1="-12" x2="100" y2="8" stroke="#6c757d" stroke-width="4"/>
      </g>

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

  return `
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

function buildCompleteVehicleSVG(vehicleId, state, isDriving = false) {
  const cfg = VEHICLE_CATALOG[vehicleId];
  const palette = PAINT_PALETTE[state.colorIndex % PAINT_PALETTE.length];
  const u = window.uid('veh');

  const wheelsMarkup = cfg.wheelPositions
    .map((w, i) => renderStudioWheelSVG(w, i, state.wheelType, state.wheelsBroken[i], u, isDriving))
    .join('');

  return `
    <svg class="vehicle-svg" viewBox="0 0 680 360" role="img" aria-label="${cfg.title}">
      ${renderVehicleDefs(u, palette)}

      <!-- SABİT ZEMİN GÖLGESİ (Araç zıpladığında yerde kalır!) -->
      <ellipse id="vehicle-ground-shadow" cx="385" cy="332" rx="225" ry="18" fill="#0f172a" opacity="0.22"/>

      <!-- HAVALANABİLEN ARAÇ VE SAHNE ALET GRUBU (Beyaz Sticker Çerçeveli) -->
      <g id="vehicle-airborne-group" filter="url(#sticker_${u})">
        <g id="chassis-rig" class="chassis-rig">
          <g id="body-shell" class="interactive-part" data-part="body">
            ${renderStudioBodySVG(vehicleId, state, u)}
          </g>
          <!-- Tavan Modifiyesi ve Projektör Gövdenin ÜSTÜNDE Render Edilir (Kesilmez!) -->
          ${renderRoofModSVG(cfg.roofAnchor.x, cfg.roofAnchor.y, state.roofType)}
          <g id="decals-layer">
            ${state.decals.map((key, idx) => {
              const slot = cfg.decalSlots[idx % cfg.decalSlots.length];
              return window.DECAL_SVGS[key] ? window.DECAL_SVGS[key](slot.x, slot.y) : '';
            }).join('')}
          </g>
          <g id="mud-layer">
            ${renderAuthenticRustMudSVG(state.mudLevels, u, isDriving)}
          </g>
          <g id="bolts-layer">
            ${renderBoltsLayerSVG(cfg.boltPositions, state.boltsLoose, isDriving)}
          </g>
        </g>

        <g id="wheels-layer">
          ${wheelsMarkup}
        </g>

        <!-- Referans Görseldeki Sahne Üstü Aktif Aletler (Taşlama, Hava Pompası, Boya Fırçası) -->
        <g id="scene-tools-layer">
          ${renderSceneInteractiveToolsSVG(state, isDriving)}
        </g>
      </g>
    </svg>
  `;
}

window.VEHICLE_CATALOG = VEHICLE_CATALOG;
window.PAINT_PALETTE = PAINT_PALETTE;
window.WHEEL_TYPES = WHEEL_TYPES;
window.ROOF_TYPES = ROOF_TYPES;
window.DECAL_KEYS = DECAL_KEYS;
window.createInitialVehicleState = createInitialVehicleState;
window.buildCompleteVehicleSVG = buildCompleteVehicleSVG;
