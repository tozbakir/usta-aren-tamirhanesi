// Usta Aren'in Çılgın Tamirhanesi - Stüdyo Kalitesinde Katmanlı Vektör (SVG) Varlık Kütüphanesi

let uidSeq = 0;
function uid(prefix = 'id') {
  uidSeq += 1;
  return `${prefix}_${uidSeq}`;
}

// 4 Köşeli Parıltı Yıldızı (Referans Görseldeki Beyaz Işıltılar)
function renderSparkleStar(x, y, size = 12, delay = 0) {
  return `
    <path d="M ${x} ${y - size} Q ${x} ${y} ${x + size} ${y} Q ${x} ${y} ${x} ${y + size} Q ${x} ${y} ${x - size} ${y} Q ${x} ${y} ${x} ${y - size} Z"
      fill="#ffffff" class="twinkle-star" style="animation-delay: ${delay}s; transform-origin: ${x}px ${y}px;"/>
  `;
}

// Usta Aren Karakter Portresi (Yumuşak Gölgeli, Beyaz Sticker Çerçeveli)
function createUstaArenAvatarSVG() {
  const u = uid('aren');
  return `
    <svg viewBox="0 0 120 120" class="svg-icon" role="img" aria-label="Usta Aren">
      <defs>
        <linearGradient id="bg_${u}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
        <linearGradient id="skin_${u}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe4cc"/>
          <stop offset="100%" stop-color="#f3ba8e"/>
        </linearGradient>
        <linearGradient id="hat_${u}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fff066"/>
          <stop offset="15%" stop-color="#fde047"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="55" fill="#ffffff"/>
      <circle cx="60" cy="60" r="50" fill="url(#bg_${u})"/>
      <!-- Omuzlar ve Tulum -->
      <path d="M 24 102 C 30 82, 90 82, 96 102 C 82 112, 38 112, 24 102 Z" fill="#ff7b00"/>
      <path d="M 38 106 L 43 85 L 77 85 L 82 106 Z" fill="#1d4ed8"/>
      <circle cx="48" cy="93" r="3.5" fill="#fde047"/>
      <circle cx="72" cy="93" r="3.5" fill="#fde047"/>
      <!-- Kulaklar -->
      <circle cx="28" cy="64" r="9" fill="url(#skin_${u})"/>
      <circle cx="92" cy="64" r="9" fill="url(#skin_${u})"/>
      <!-- Kafa -->
      <rect x="31" y="36" width="58" height="53" rx="26" fill="url(#skin_${u})"/>
      <!-- Yanak Alı -->
      <ellipse cx="40" cy="69" rx="6" ry="3.5" fill="#fb7185" opacity="0.45"/>
      <ellipse cx="80" cy="69" rx="6" ry="3.5" fill="#fb7185" opacity="0.45"/>
      <!-- Gözler -->
      <ellipse cx="47" cy="60" rx="6" ry="6.8" fill="#1e293b"/>
      <circle cx="49" cy="57.5" r="2.4" fill="#ffffff"/>
      <ellipse cx="73" cy="60" rx="6" ry="6.8" fill="#1e293b"/>
      <circle cx="75" cy="57.5" r="2.4" fill="#ffffff"/>
      <!-- Kaşlar -->
      <path d="M 39 50 Q 47 46 54 50" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 66 50 Q 73 45 81 49" fill="none" stroke="#78350f" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Burun -->
      <ellipse cx="60" cy="64" rx="3.5" ry="2.5" fill="#e09f67"/>
      <!-- Gülümseme -->
      <path d="M 48 73 Q 60 85 72 73 Z" fill="#e11d48"/>
      <path d="M 51 74 Q 60 77 69 74" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <!-- Usta Bareti -->
      <path d="M 24 44 C 24 12, 96 12, 96 44 Z" fill="url(#hat_${u})"/>
      <!-- Baret Tepe Kabartması -->
      <path d="M 52 19 L 68 19 L 70 40 L 50 40 Z" fill="#fef08a" opacity="0.55"/>
      <!-- Baret Siperliği -->
      <path d="M 18 42 Q 60 35 102 42 Q 104 48 95 48 Q 60 42 25 48 Q 16 48 18 42 Z" fill="#d97706"/>
      <!-- Koruyucu Gözlük -->
      <rect x="33" y="25" width="23" height="13" rx="6" fill="#292524"/>
      <rect x="35" y="27" width="19" height="9" rx="4" fill="#7dd3fc"/>
      <rect x="64" y="25" width="23" height="13" rx="6" fill="#292524"/>
      <rect x="66" y="27" width="19" height="9" rx="4" fill="#7dd3fc"/>
      <rect x="55" y="29" width="10" height="4" fill="#44403c"/>
    </svg>
  `;
}

const SVG_ICONS = {
  get ustaArenAvatar() {
    return createUstaArenAvatarSVG();
  },

  star: `
    <svg viewBox="0 0 56 56" class="svg-icon" aria-hidden="true">
      <polygon points="28,4 35.5,18.5 52,21 40,32.5 43,49 28,41 13,49 16,32.5 4,21 20.5,18.5"
        fill="#ffffff" stroke="#ffffff" stroke-width="6" stroke-linejoin="round"/>
      <polygon points="28,4 35.5,18.5 52,21 40,32.5 43,49 28,41 13,49 16,32.5 4,21 20.5,18.5"
        fill="#fbbf24" stroke="#d97706" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="28,9 33,19 44,21 36,29 38,40 28,34.5" fill="#fef08a" opacity="0.65"/>
    </svg>
  `,

  // 1. TAŞLAMA & MATKAP (Referans görseldeki sarı-siyah dönen diskli taşlama/matkap!)
  drill: `
    <svg viewBox="0 0 120 100" class="svg-icon tool-svg" aria-hidden="true">
      <!-- Beyaz Sticker Dış Kontur -->
      <g stroke="#ffffff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">
        <rect x="10" y="42" width="58" height="24" rx="10" fill="#ffffff" transform="rotate(-18 39 54)"/>
        <circle cx="76" cy="40" r="24" fill="#ffffff"/>
      </g>
      <!-- Gövde Sapı (Siyah-Turuncu-Sarı Endüstriyel Tasarım) -->
      <g transform="rotate(-18 39 54)">
        <rect x="10" y="42" width="58" height="24" rx="10" fill="#ff9f1c"/>
        <rect x="10" y="42" width="20" height="24" rx="9" fill="#2b2d42"/>
        <rect x="14" y="46" width="12" height="5" rx="2.5" fill="#5c677d"/>
        <rect x="30" y="44" width="32" height="7" rx="3" fill="#ffbf69"/>
        <!-- Havalandırma Kanalları -->
        <rect x="36" y="55" width="4" height="7" rx="1.5" fill="#d97706"/>
        <rect x="43" y="55" width="4" height="7" rx="1.5" fill="#d97706"/>
        <rect x="50" y="55" width="4" height="7" rx="1.5" fill="#d97706"/>
        <!-- Üst Siyah Anahtar Düğmesi -->
        <rect x="38" y="37" width="10" height="5" rx="2" fill="#1f2421"/>
      </g>
      <!-- Koruyucu Siyah Yarım Ay Siper -->
      <path d="M 66 14 A 27 27 0 0 0 54 58 L 76 40 Z" fill="#2b2d42"/>
      <!-- Dönen Metal Disk -->
      <g class="spinning-disc-part" style="transform-origin: 76px 40px;">
        <circle cx="76" cy="40" r="23" fill="#adb5bd"/>
        <circle cx="76" cy="40" r="19" fill="#ced4da"/>
        <circle cx="76" cy="40" r="14" fill="#e9ecef"/>
        <!-- Hız Çizgileri -->
        <path d="M 63 32 A 15 15 0 0 1 88 30" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 64 50 A 15 15 0 0 0 89 48" fill="none" stroke="#6c757d" stroke-width="2" stroke-linecap="round"/>
        <circle cx="76" cy="40" r="7" fill="#2b2d42"/>
        <circle cx="76" cy="40" r="3" fill="#adb5bd"/>
      </g>
      <!-- Parlak Sarı Kıvılcım Noktası (Referans görseldeki gibi) -->
      <circle cx="99" cy="36" r="7" fill="#fff3b0" opacity="0.9"/>
      <circle cx="99" cy="36" r="4" fill="#ffbe0b"/>
    </svg>
  `,

  // 2. YEŞİL HAVA POMPASI (Referans görseldeki basınç göstergeli yeşil lastik pompası!)
  wrench: `
    <svg viewBox="0 0 120 110" class="svg-icon tool-svg" aria-hidden="true">
      <!-- Beyaz Sticker Kontur -->
      <g stroke="#ffffff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
        <rect x="26" y="16" width="38" height="10" rx="5" fill="#ffffff"/>
        <rect x="41" y="24" width="8" height="24" fill="#ffffff"/>
        <path d="M 22 92 L 26 52 C 26 38, 64 38, 64 52 L 68 92 Z" fill="#ffffff"/>
        <rect x="16" y="90" width="58" height="9" rx="4.5" fill="#ffffff"/>
        <path d="M 64 84 C 82 88, 96 96, 98 64" fill="none"/>
        <rect x="91" y="42" width="14" height="24" rx="4" fill="#ffffff"/>
      </g>
      <!-- T-Kol Tutamaç (Gri-Turuncu) -->
      <g class="pump-handle-part">
        <rect x="24" y="16" width="42" height="9" rx="4.5" fill="#495057"/>
        <rect x="37" y="14" width="16" height="13" rx="3" fill="#ff8800"/>
        <rect x="41" y="26" width="8" height="22" fill="#adb5bd"/>
      </g>
      <!-- Yeşil Ana Gövde -->
      <path d="M 22 92 L 26 52 C 26 38, 64 38, 64 52 L 68 92 Z" fill="#16db65"/>
      <path d="M 26 92 L 29 54 C 29 44, 44 44, 44 54 L 44 92 Z" fill="#38b000" opacity="0.35"/>
      <rect x="34" y="38" width="22" height="8" rx="3" fill="#058c42"/>
      <!-- Basınç Göstergesi (Manometre) -->
      <path d="M 30 74 C 30 56, 60 56, 60 74 Z" fill="#fefae0" stroke="#ffbe0b" stroke-width="3"/>
      <line x1="45" y1="72" x2="49" y2="61" stroke="#d90429" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="45" cy="72" r="3" fill="#2b2d42"/>
      <!-- Taban -->
      <rect x="16" y="90" width="58" height="9" rx="4.5" fill="#343a40"/>
      <!-- Siyah Hortum ve Yeşil Sibop Ucu -->
      <path d="M 64 84 C 82 92, 98 90, 98 62" fill="none" stroke="#2b2d42" stroke-width="7" stroke-linecap="round"/>
      <rect x="91" y="42" width="14" height="22" rx="4" fill="#058c42"/>
      <rect x="93" y="44" width="5" height="18" rx="2" fill="#16db65"/>
    </svg>
  `,

  // 3. BOYA FIRÇASI (Referans görseldeki turuncu-sarı boya sürülmüş fırça!)
  paint: `
    <svg viewBox="0 0 110 110" class="svg-icon tool-svg" aria-hidden="true">
      <!-- Beyaz Sticker Dış Kontur -->
      <g stroke="#ffffff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 26 42 C 20 68, 34 94, 52 94 C 60 94, 58 80, 52 74 C 64 82, 74 78, 66 64 C 78 68, 82 58, 68 46 Z" fill="#ffffff"/>
        <path d="M 30 42 C 30 22, 62 12, 74 14 L 80 26 L 44 48 Z" fill="#ffffff"/>
        <path d="M 66 28 L 90 42 L 82 50 L 58 34 Z" fill="#ffffff"/>
      </g>
      <!-- Sürülen Canlı Sarı-Turuncu Boya Dalgaları -->
      <path d="M 26 42 C 20 68, 34 94, 52 94 C 60 94, 58 80, 52 74 C 64 82, 74 78, 66 64 C 78 68, 82 58, 68 46 Z"
        fill="#ff9f1c" stroke="#e07a00" stroke-width="2.5"/>
      <path d="M 32 52 C 28 70, 38 86, 48 88" fill="none" stroke="#ffbf69" stroke-width="4" stroke-linecap="round"/>
      <!-- Fırça Kılları (Koyu Kahve) -->
      <path d="M 26 44 C 24 24, 54 12, 72 14 L 62 38 C 52 48, 36 52, 26 44 Z" fill="#3d2616"/>
      <path d="M 32 38 C 34 24, 54 16, 66 16" fill="none" stroke="#5c3a21" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Metal Kelepçe (Ferrule) -->
      <polygon points="48,34 74,14 82,22 56,42" fill="#adb5bd"/>
      <polygon points="50,36 76,16 79,19 53,39" fill="#dee2e6"/>
      <!-- Ahşap Fırça Sapı -->
      <path d="M 66 30 L 92 43 C 96 46, 90 54, 84 50 L 58 36 Z" fill="#582f0e"/>
      <circle cx="84" cy="44" r="2.2" fill="#ffffff"/>
    </svg>
  `,

  // 4. AĞIR TAMİR ÇEKİCİ & KAYNAK
  hammer: `
    <svg viewBox="0 0 110 100" class="svg-icon tool-svg" aria-hidden="true">
      <g transform="rotate(-24 55 50)">
        <g stroke="#ffffff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">
          <rect x="46" y="34" width="16" height="54" rx="8" fill="#ffffff"/>
          <rect x="18" y="16" width="66" height="24" rx="6" fill="#ffffff"/>
        </g>
        <!-- Sap -->
        <rect x="46" y="34" width="16" height="54" rx="8" fill="#ff9f1c"/>
        <rect x="46" y="58" width="16" height="28" rx="7" fill="#2b2d42"/>
        <rect x="50" y="62" width="4" height="20" rx="2" fill="#495057"/>
        <!-- Çelik Çekiç Başı -->
        <rect x="20" y="16" width="62" height="24" rx="6" fill="#495057"/>
        <rect x="24" y="19" width="54" height="8" rx="3" fill="#adb5bd"/>
        <!-- Darbe Tamponları -->
        <rect x="14" y="14" width="9" height="28" rx="3.5" fill="#ff8800"/>
        <rect x="79" y="18" width="8" height="20" rx="3" fill="#adb5bd"/>
      </g>
    </svg>
  `,

  // 5. ÇILGIN MODİFİYE PARÇALARI (Beyaz Sticker Konturlu)
  wacky: `
    <svg viewBox="0 0 110 100" class="svg-icon tool-svg" aria-hidden="true">
      <circle cx="55" cy="50" r="37" fill="#ffffff"/>
      <circle cx="55" cy="50" r="32" fill="#d97706"/>
      <circle cx="55" cy="50" r="26" fill="#ff4d8d"/>
      <path d="M 36 38 A 22 22 0 0 1 74 38" fill="none" stroke="#ff85b3" stroke-width="4" stroke-linecap="round"/>
      <!-- Pasta Süsleri -->
      <line x1="40" y1="32" x2="47" y2="29" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="63" y1="31" x2="70" y2="36" stroke="#fde047" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="35" y1="54" x2="41" y2="62" stroke="#38bdf8" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="67" y1="60" x2="73" y2="52" stroke="#4ade80" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="51" y1="70" x2="59" y2="70" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <circle cx="55" cy="50" r="12" fill="#2b2d42"/>
      <circle cx="55" cy="50" r="6" fill="#ff9f1c"/>
    </svg>
  `,

  // 6. YÜKSEK BASINÇLI YIKAMA & HAVALI KORNA
  wash: `
    <svg viewBox="0 0 110 100" class="svg-icon tool-svg" aria-hidden="true">
      <g stroke="#ffffff" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
        <path d="M 36 36 L 78 20 L 78 56 L 36 42 Z" fill="#ffffff"/>
        <circle cx="28" cy="39" r="13" fill="#ffffff"/>
        <rect x="44" y="48" width="26" height="34" rx="8" fill="#ffffff"/>
      </g>
      <circle cx="18" cy="24" r="7" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2.5"/>
      <circle cx="28" cy="14" r="5" fill="#e0f2fe" stroke="#38bdf8" stroke-width="2"/>
      <!-- Havalı Korna -->
      <path d="M 36 36 L 78 20 L 78 56 L 36 42 Z" fill="#ffbe0b"/>
      <path d="M 38 37 L 76 24 L 76 34 L 38 40 Z" fill="#fff3b0" opacity="0.6"/>
      <ellipse cx="78" cy="38" rx="6" ry="18" fill="#fb8500"/>
      <circle cx="28" cy="39" r="13" fill="#e63946"/>
      <circle cx="24" cy="35" r="4" fill="#ff8fa3"/>
      <!-- Köpük Şişesi -->
      <rect x="44" y="48" width="26" height="34" rx="8" fill="#00b4d8"/>
      <rect x="48" y="52" width="8" height="26" rx="4" fill="#90e0ef" opacity="0.6"/>
    </svg>
  `,

  // Araç Sekme İkonları (Referans Görseldeki Kamyon/İş Makinesi Stilinde)
  tabDumpTruck: `
    <svg viewBox="0 0 72 50" class="svg-icon" aria-hidden="true">
      <path d="M 8 16 L 42 16 L 36 32 L 12 32 Z" fill="#adb5bd" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M 36 12 L 56 12 L 62 24 L 62 34 L 36 34 Z" fill="#ff9f1c" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="44" y="16" width="12" height="9" rx="2" fill="#a8f0d8"/>
      <circle cx="22" cy="36" r="10" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="22" cy="36" r="5" fill="#ff9f1c"/>
      <circle cx="50" cy="36" r="10" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="50" cy="36" r="5" fill="#ff9f1c"/>
    </svg>
  `,

  tabExcavator: `
    <svg viewBox="0 0 72 50" class="svg-icon" aria-hidden="true">
      <path d="M 40 20 L 52 8 L 64 18 L 58 28" fill="none" stroke="#ff9f1c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="12" y="14" width="28" height="18" rx="5" fill="#ffbe0b" stroke="#ffffff" stroke-width="2.5"/>
      <rect x="17" y="17" width="13" height="10" rx="2" fill="#a8f0d8"/>
      <rect x="10" y="32" width="34" height="11" rx="5.5" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="17" cy="37.5" r="3" fill="#ff9f1c"/>
      <circle cx="27" cy="37.5" r="3" fill="#ff9f1c"/>
      <circle cx="37" cy="37.5" r="3" fill="#ff9f1c"/>
    </svg>
  `,

  tabFiretruck: `
    <svg viewBox="0 0 72 50" class="svg-icon" aria-hidden="true">
      <rect x="12" y="8" width="32" height="5" rx="2.5" fill="#e9ecef"/>
      <rect x="10" y="14" width="50" height="21" rx="5" fill="#e63946" stroke="#ffffff" stroke-width="2.5"/>
      <rect x="42" y="17" width="14" height="9" rx="2" fill="#a8f0d8"/>
      <rect x="10" y="26" width="50" height="4" fill="#ffffff"/>
      <circle cx="22" cy="37" r="9" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="22" cy="37" r="4" fill="#ffbe0b"/>
      <circle cx="48" cy="37" r="9" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="48" cy="37" r="4" fill="#ffbe0b"/>
    </svg>
  `,

  tabMonster: `
    <svg viewBox="0 0 72 50" class="svg-icon" aria-hidden="true">
      <path d="M 10 25 L 20 12 L 46 12 L 60 20 L 60 29 L 10 29 Z" fill="#0077b6" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="24" y="15" width="18" height="8" rx="2" fill="#a8f0d8"/>
      <circle cx="20" cy="36" r="11" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="20" cy="36" r="5" fill="#ff9f1c"/>
      <circle cx="50" cy="36" r="11" fill="#2b2d42" stroke="#ffffff" stroke-width="2"/>
      <circle cx="50" cy="36" r="5" fill="#ff9f1c"/>
    </svg>
  `,

  mischiefMud: `
    <svg viewBox="0 0 48 48" class="svg-icon" aria-hidden="true">
      <path d="M 24 6 C 18 14, 8 18, 10 28 C 12 38, 36 38, 38 28 C 40 18, 30 14, 24 6 Z" fill="#7f4f24" stroke="#ffffff" stroke-width="3"/>
      <circle cx="19" cy="24" r="3" fill="#ffffff"/>
      <circle cx="29" cy="24" r="3" fill="#ffffff"/>
    </svg>
  `,

  flagGo: `
    <svg viewBox="0 0 48 48" class="svg-icon" aria-hidden="true">
      <line x1="10" y1="6" x2="10" y2="42" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M 10 8 L 40 14 L 34 26 L 40 32 L 10 28 Z" fill="#ffffff" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
      <polygon points="12,10 24,12 24,20 12,18" fill="#1e293b"/>
      <polygon points="24,20 35,22 35,29 24,27" fill="#1e293b"/>
    </svg>
  `,

  soundOn: `
    <svg viewBox="0 0 48 48" class="svg-icon" aria-hidden="true">
      <polygon points="8,18 18,18 28,9 28,39 18,30 8,30" fill="#ffffff"/>
      <path d="M 34 16 Q 40 24 34 32" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
      <path d="M 39 10 Q 47 24 39 38" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `,

  soundOff: `
    <svg viewBox="0 0 48 48" class="svg-icon" aria-hidden="true">
      <polygon points="8,18 18,18 28,9 28,39 18,30 8,30" fill="#cbd5e1"/>
      <line x1="33" y1="17" x2="43" y2="31" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="43" y1="17" x2="33" y2="31" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round"/>
    </svg>
  `
};

// Çıkartma (Decal) Vektör Şablonları
const DECAL_SVGS = {
  flame: (x, y) => `
    <g transform="translate(${x}, ${y})" class="decal-item">
      <path d="M 0 -20 C 11 -9, 18 4, 11 16 C 5 24, -7 24, -12 15 C -18 4, -9 -11, 0 -20 Z" fill="#e63946" stroke="#ffffff" stroke-width="2.5"/>
      <path d="M 0 -9 C 5 -2, 9 5, 5 13 C 2 18, -4 18, -6 12 C -9 5, -4 -2, 0 -9 Z" fill="#ffbe0b"/>
    </g>
  `,
  lightning: (x, y) => `
    <g transform="translate(${x}, ${y})" class="decal-item">
      <polygon points="4,-22 -13,2 -2,2 -6,22 15,-4 2,-4" fill="#ffbe0b" stroke="#ffffff" stroke-width="2.5" stroke-linejoin="round"/>
    </g>
  `,
  starBadge: (x, y) => `
    <g transform="translate(${x}, ${y})" class="decal-item">
      <circle cx="0" cy="0" r="18" fill="#0077b6" stroke="#ffffff" stroke-width="3"/>
      <polygon points="0,-12 3.5,-3.5 13,-3.5 5.5,2.5 8,12 0,7 -8,12 -5.5,2.5 -13,-3.5 -3.5,-3.5" fill="#ffbe0b"/>
    </g>
  `,
  numberThree: (x, y) => `
    <g transform="translate(${x}, ${y})" class="decal-item">
      <circle cx="0" cy="0" r="18" fill="#ffffff" stroke="#2b2d42" stroke-width="3"/>
      <text x="0" y="8" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="23" fill="#e63946">3</text>
    </g>
  `,
  dinoCrest: (x, y) => `
    <g transform="translate(${x}, ${y})" class="decal-item">
      <circle cx="0" cy="0" r="18" fill="#2a9d8f" stroke="#ffffff" stroke-width="3"/>
      <polygon points="-9,7 -3,-9 2,7" fill="#e9c46a"/>
      <polygon points="-1,7 5,-11 11,7" fill="#e9c46a"/>
    </g>
  `
};

window.SVG_ICONS = SVG_ICONS;
window.DECAL_SVGS = DECAL_SVGS;
window.renderSparkleStar = renderSparkleStar;
window.uid = uid;
