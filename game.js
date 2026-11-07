// Usta Aren'in Çılgın Tamirhanesi - 60FPS Tablet Optimize Fizik ve Etkileşim Motoru

(() => {
  let currentVehicleId = 'tractor';
  let currentTool = 'drill';
  let stars = 0;
  let isTestDrive = false;
  let isAppliancePlay = false;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  const vehicleStates = {
    tractor: window.createInitialVehicleState('tractor'),
    excavator: window.createInitialVehicleState('excavator'),
    firetruck: window.createInitialVehicleState('firetruck'),
    monster: window.createInitialVehicleState('monster'),
    washer: window.createInitialVehicleState('washer'),
    dishwasher: window.createInitialVehicleState('dishwasher')
  };

  // Çamaşır & Bulaşık Makinesi Etkileşimli Yıkama Oyunu Durumu
  const appliancePlayState = {
    washer: {
      itemsLoaded: [false, false, false, false],
      detergentAdded: false,
      isWashing: false,
      isClean: false,
      spinAngle: 0,
      washTimer: 0
    },
    dishwasher: {
      itemsLoaded: [false, false, false, false],
      detergentAdded: false,
      isWashing: false,
      isClean: false,
      spinAngle: 0,
      washTimer: 0
    }
  };

  // Atölye Süspansiyon Yay Fiziği (Hareketsizken Uyku Moduna Geçer -> 0 CPU/GPU Yükü)
  const rigPhysics = {
    y: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    wheelAngle: 0,
    wheelVel: 0,
    awake: false
  };

  // Test Sürüşü Araç Fiziği (Gölge Sabit, Gövde Havalanır!)
  const drivePhysics = {
    y: 0,
    vy: 0,
    rot: 0,
    turboTimer: 0,
    wheelAngle: 0,
    spawnTimer: 0
  };

  const TOOL_PHRASES = {
    drill: [
      'Vıııınn! Şarjlı matkap vidaları sımsıkı sıkıyor, pasları parlatıyor Usta Aren!',
      'Matkap ucu hızla dönüyor, harikasın Aren Usta!',
      'Bütün gevşek vidalar matkapla sıkıldı, pırıl pırıl oldu Aren!'
    ],
    wrench: [
      'Fıss fıss! Yeşil hava pompası patlak lastiği şişirdi Usta Aren!',
      'Tekerlek taş gibi sağlam oldu, aferin Aren Usta!'
    ],
    paint: [
      'Fırçayla boyuyoruz! Bu parlak renk çok yakıştı Usta Aren!',
      'Gri astar boyandı, yepyeni oldu Aren Usta!'
    ],
    hammer: [
      'Tak tak tak! Ne güçlü bir çekiç Usta Aren, yamuk yerler dümdüz oldu!'
    ],
    wacky: [
      'Hahaha! Çılgın parçalar takıldı, burada kuralları Aren Usta koyar!'
    ],
    wash: [
      'Köpüklerle tertemiz yıkandı, yıldız gibi parlıyor Usta Aren!'
    ]
  };

  const WASHER_PHRASES = {
    drill: [
      'Şarjlı matkapla çamaşır makinesinin gevşek vidalarını sıktık Usta Aren!',
      'Bütün gevşek vidalar matkapla sıkıldı, pırıl pırıl oldu Aren!'
    ],
    wrench: [
      'Su tahliye borusu tamir edildi, kapağa sıkışan çorap kurtarıldı Usta Aren!'
    ],
    paint: [
      'Çamaşır makinesi fırçayla boyandı, harika görünüyor Usta Aren!',
      'Fırçayla boyuyoruz! Bu parlak renk çok yakıştı Usta Aren!'
    ],
    hammer: [
      'Tak tak tak! Ne güçlü bir çekiç Usta Aren, yamuk yerler dümdüz oldu!'
    ],
    wacky: [
      'Hahaha! Çılgın parçalar takıldı, burada kuralları Aren Usta koyar!'
    ],
    wash: [
      'Köpüklerle tertemiz yıkandı, yıldız gibi parlıyor Usta Aren!'
    ]
  };

  const DISHWASHER_PHRASES = {
    drill: [
      'Şarjlı matkapla bulaşık makinesinin kapak vidalarını sağlamlaştırdık Usta Aren!',
      'Bütün gevşek vidalar matkapla sıkıldı, pırıl pırıl oldu Aren!'
    ],
    wrench: [
      'Bulaşık makinesinin su pompası ve fıskiye pervanesi tamir edildi Usta Aren!'
    ],
    paint: [
      'Bulaşık makinesini pırıl pırıl boyadık, ellerine sağlık Aren Usta!',
      'Fırçayla boyuyoruz! Bu parlak renk çok yakıştı Usta Aren!'
    ],
    hammer: [
      'Tak tak tak! Ne güçlü bir çekiç Usta Aren, yamuk yerler dümdüz oldu!'
    ],
    wacky: [
      'Hahaha! Çılgın parçalar takıldı, burada kuralları Aren Usta koyar!'
    ],
    wash: [
      'Köpüklerle tertemiz yıkandı, yıldız gibi parlıyor Usta Aren!'
    ]
  };

  // DOM Referansları
  const welcomeDialog = document.getElementById('welcome-dialog');
  const startGameBtn = document.getElementById('start-game-btn');
  const vehicleStage = document.getElementById('vehicle-stage');
  const subPaletteBar = document.getElementById('sub-palette-bar');
  const speechBubble = document.getElementById('speech-bubble');
  const speechText = document.getElementById('speech-text');
  const starCountEl = document.getElementById('star-count');
  const garageDoor = document.getElementById('garage-door');
  const mischiefBtn = document.getElementById('mischief-btn');
  const testDriveBtn = document.getElementById('test-drive-btn');
  const testDriveText = document.getElementById('test-drive-text');
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconSlot = document.getElementById('sound-icon-slot');
  const floatingTool = document.getElementById('floating-tool');
  const srAnnouncer = document.getElementById('sr-announcer');

  const chipBolts = document.getElementById('chip-bolts');
  const chipBoltsText = document.getElementById('chip-bolts-text');
  const chipDents = document.getElementById('chip-dents');
  const chipMud = document.getElementById('chip-mud');

  const testDriveStage = document.getElementById('test-drive-stage');
  const drivingVehicle = document.getElementById('driving-vehicle');
  const obstaclesContainer = document.getElementById('obstacles-container');
  const roadTrack = document.getElementById('road-track');
  const driveHornBtn = document.getElementById('drive-horn-btn');
  const driveJumpBtn = document.getElementById('drive-jump-btn');
  const backGarageBtn = document.getElementById('back-garage-btn');

  const appliancePlayStage = document.getElementById('appliance-play-stage');
  const applianceItemsTray = document.getElementById('appliance-items-tray');
  const applianceMachineView = document.getElementById('appliance-machine-view');
  const appStartWashBtn = document.getElementById('app-start-wash-btn');
  const appStartWashText = document.getElementById('app-start-wash-text');
  const appResetItemsBtn = document.getElementById('app-reset-items-btn');
  const appBackGarageBtn = document.getElementById('app-back-garage-btn');

  let appSpinNodes = [];

  // Önbelleğe Alınmış SVG Alt Düğüm Referansları (Her Karede querySelector Çağrısını Önler)
  const workshopRefs = {
    chassis: null,
    shadow: null,
    wheels: []
  };

  const driveRefs = {
    airborneGroup: null,
    groundShadow: null,
    wheels: []
  };

  // Önbelleğe Alınmış Ekran ve Araç Koordinatları (mainLoop İçinde getBoundingClientRect / Reflow Yok!)
  const layoutMetrics = {
    vw: window.innerWidth,
    vh: window.innerHeight,
    stageCenterX: window.innerWidth * 0.5,
    stageCenterY: window.innerHeight * 0.5,
    stageLeft: 0,
    stageTop: 0,
    stageWidth: 680,
    stageHeight: 360,
    carLeft: 80,
    carRight: 380,
    carTop: 320,
    carBottom: 520
  };

  function cacheWorkshopRefs() {
    workshopRefs.chassis = vehicleStage.querySelector('#chassis-rig');
    workshopRefs.shadow = vehicleStage.querySelector('#vehicle-ground-shadow');
    workshopRefs.wheels = Array.from(vehicleStage.querySelectorAll('.wheel-spin-node'));
  }

  function cacheDriveRefs() {
    driveRefs.airborneGroup = drivingVehicle.querySelector('#vehicle-airborne-group');
    driveRefs.groundShadow = drivingVehicle.querySelector('#vehicle-ground-shadow');
    driveRefs.wheels = Array.from(drivingVehicle.querySelectorAll('.wheel-spin-node'));
  }

  function mountStaticSVGIcons() {
    document.getElementById('welcome-avatar').innerHTML = window.SVG_ICONS.ustaArenAvatar;
    document.getElementById('header-avatar').innerHTML = window.SVG_ICONS.ustaArenAvatar;
    document.getElementById('start-btn-icon').innerHTML = window.SVG_ICONS.drill;
    document.getElementById('star-icon-slot').innerHTML = window.SVG_ICONS.star;
    soundIconSlot.innerHTML = window.SVG_ICONS.soundOn;

    document.querySelectorAll('[data-icon]').forEach((el) => {
      const key = el.dataset.icon;
      if (window.SVG_ICONS[key]) {
        el.innerHTML = window.SVG_ICONS[key];
      }
    });
  }

  // 60FPS Vektör Parçacık Motoru (Boştayken clearRect Çağrılmaz)
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  const particles = [];
  const shockwaves = [];
  let canvasDirty = false;

  function refreshLayoutMetrics() {
    layoutMetrics.vw = window.innerWidth;
    layoutMetrics.vh = window.innerHeight;
    canvas.width = layoutMetrics.vw;
    canvas.height = layoutMetrics.vh;

    if (!isTestDrive) {
      const sRect = vehicleStage.getBoundingClientRect();
      if (sRect.width > 0) {
        layoutMetrics.stageLeft = sRect.left;
        layoutMetrics.stageTop = sRect.top;
        layoutMetrics.stageWidth = sRect.width;
        layoutMetrics.stageHeight = sRect.height;
        layoutMetrics.stageCenterX = sRect.left + sRect.width * 0.5;
        layoutMetrics.stageCenterY = sRect.top + sRect.height * 0.5;
      }
    } else {
      const cRect = drivingVehicle.getBoundingClientRect();
      if (cRect.width > 0) {
        layoutMetrics.carLeft = cRect.left;
        layoutMetrics.carRight = cRect.right;
        layoutMetrics.carTop = cRect.top;
        layoutMetrics.carBottom = cRect.bottom;
      }
    }
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refreshLayoutMetrics, 80);
  }, { passive: true });

  function drawFourPointSparkle(c, r) {
    c.beginPath();
    c.moveTo(0, -r);
    c.quadraticCurveTo(0, 0, r, 0);
    c.quadraticCurveTo(0, 0, 0, r);
    c.quadraticCurveTo(0, 0, -r, 0);
    c.quadraticCurveTo(0, 0, 0, -r);
    c.closePath();
    c.fill();
  }

  function drawStarShape(c, r) {
    c.beginPath();
    for (let i = 0; i < 5; i++) {
      const a1 = (i * 72 - 90) * (Math.PI / 180);
      const a2 = ((i * 72 + 36) - 90) * (Math.PI / 180);
      c.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
      c.lineTo(Math.cos(a2) * (r * 0.45), Math.sin(a2) * (r * 0.45));
    }
    c.closePath();
    c.fill();
  }

  function spawnVectorParticles(x, y, toolId, requestedCount = 18) {
    const count = isCoarsePointer ? Math.min(12, Math.ceil(requestedCount * 0.6)) : requestedCount;
    if (shockwaves.length < 4) {
      shockwaves.push({ x, y, r: 8, alpha: 0.85, color: '#ffffff' });
    }

    const colorSets = {
      drill: ['#fff3b0', '#ffbe0b', '#ff9f1c', '#9c6644'],
      wrench: ['#70e000', '#38b000', '#ffffff', '#caf0f8'],
      paint: ['#ff9f1c', '#e63946', '#2ec4b6', '#ffbe0b', '#ffffff'],
      hammer: ['#ff9f1c', '#ffbe0b', '#ffffff', '#adb5bd'],
      wacky: ['#ff4d8d', '#7209b7', '#ffbe0b', '#2ec4b6'],
      wash: ['#caf0f8', '#90e0ef', '#ffffff', '#00b4d8'],
      crate: ['#d97706', '#b45309', '#ffbe0b', '#ffffff']
    };
    const palette = colorSets[toolId] || colorSets.drill;

    // Tablet GPU fill-rate koruması: aynı anda en fazla 48 aktif parçacık
    if (particles.length > 48) {
      particles.splice(0, particles.length - 36);
    }

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 9.0;
      let shape = 'spark';
      if (toolId === 'wash') shape = 'bubble';
      else if (toolId === 'paint') shape = i % 2 === 0 ? 'twinkle' : 'spark';
      else if (toolId === 'crate') shape = i % 2 === 0 ? 'plank' : 'star';
      else if (i % 3 === 0) shape = 'twinkle';

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (toolId === 'wash' ? 2.4 : 3.0),
        gravity: toolId === 'wash' ? -0.05 : 0.28,
        life: 1,
        decay: 0.024 + Math.random() * 0.016,
        size: 6.5 + Math.random() * 8,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.2,
        shape,
        color: palette[i % palette.length]
      });
    }
    canvasDirty = true;
  }

  let speechPopTimer = null;
  function setSpeech(message, speakAloud = true, forceVoice = false) {
    speechText.textContent = message;
    srAnnouncer.textContent = message;
    speechBubble.classList.add('pop');
    if (speechPopTimer) clearTimeout(speechPopTimer);
    speechPopTimer = setTimeout(() => {
      speechBubble.classList.remove('pop');
    }, 190);

    if (speakAloud) {
      window.arenAudio.speak(message, forceVoice);
    }
  }

  function addStars(amount = 1) {
    stars += amount;
    starCountEl.textContent = String(stars);
  }

  const toolbeltDock = document.querySelector('.toolbelt-dock');
  const wrenchToolNameEl = document.querySelector('[data-tool="wrench"] .tool-name');
  const washToolNameEl = document.querySelector('[data-tool="wash"] .tool-name');
  const wrenchToolSvgEl = document.querySelector('[data-tool="wrench"] .tool-svg-slot');
  const washToolSvgEl = document.querySelector('[data-tool="wash"] .tool-svg-slot');

  function updateHeaderActionLabels() {
    const cfg = window.VEHICLE_CATALOG[currentVehicleId];
    const isApp = Boolean(cfg && cfg.isAppliance);
    if (chipBoltsText) {
      chipBoltsText.textContent = isApp ? 'Boru & Vidalar' : 'Lastik & Vidalar';
    }
    if (wrenchToolNameEl) {
      wrenchToolNameEl.textContent = isApp ? 'Boru Anahtarı' : 'Hava Pompası';
    }
    if (washToolNameEl) {
      washToolNameEl.textContent = isApp ? 'Köpük & Sünger' : 'Köpük & Korna';
    }
    if (wrenchToolSvgEl) {
      wrenchToolSvgEl.innerHTML = isApp ? window.SVG_ICONS.pipeWrench : window.SVG_ICONS.wrench;
    }
    if (washToolSvgEl) {
      washToolSvgEl.innerHTML = isApp ? window.SVG_ICONS.sponge : window.SVG_ICONS.wash;
    }
    if (testDriveText) {
      if (currentVehicleId === 'washer') {
        testDriveText.textContent = 'Çamaşır Yıka!';
      } else if (currentVehicleId === 'dishwasher') {
        testDriveText.textContent = 'Bulaşık Yıka!';
      } else {
        testDriveText.textContent = 'Sürüşe Çık!';
      }
    }
  }

  function updateRepairStatusChips() {
    const st = vehicleStates[currentVehicleId];
    const boltsAndTiresFixed = !st.boltsLoose.some(Boolean) && !st.wheelsBroken.some(Boolean);
    const bodyAndPaintFixed = !st.primerUnpainted && !st.roofDent && !st.engineDent;
    const mudClean = st.mudLevels.every((m) => m <= 0.05);

    chipBolts.classList.toggle('fixed', boltsAndTiresFixed);
    chipDents.classList.toggle('fixed', bodyAndPaintFixed);
    chipMud.classList.toggle('fixed', mudClean);
    if (testDriveBtn) {
      testDriveBtn.classList.toggle('ready-pulse', boltsAndTiresFixed && bodyAndPaintFixed && mudClean);
    }
    updateHeaderActionLabels();
  }

  function mountOrUpdateVehicle(forceSubPalette = false) {
    const st = vehicleStates[currentVehicleId];
    const refsChanged = window.updateVehicleInPlace(vehicleStage, currentVehicleId, st, false);
    if (refsChanged || !workshopRefs.chassis) {
      cacheWorkshopRefs();
    }
    applyWorkshopRigTransforms();
    updateRepairStatusChips();
    if (forceSubPalette && !subPaletteBar.hidden) {
      renderSubPalette();
    }
  }

  function applyWorkshopRigTransforms() {
    if (workshopRefs.chassis) {
      workshopRefs.chassis.setAttribute(
        'transform',
        `translate(0, ${rigPhysics.y.toFixed(2)}) rotate(${rigPhysics.rot.toFixed(2)} 345 210)`
      );
    }
    if (workshopRefs.shadow) {
      const scale = Math.max(0.75, Math.min(1.12, 1 + rigPhysics.y * 0.004));
      workshopRefs.shadow.setAttribute('rx', (225 * scale).toFixed(1));
    }

    const angleStr = `rotate(${rigPhysics.wheelAngle.toFixed(1)})`;
    for (let idx = 0; idx < workshopRefs.wheels.length; idx++) {
      if (workshopRefs.wheels[idx]) {
        workshopRefs.wheels[idx].setAttribute('transform', angleStr);
      }
    }
  }

  function impulseVehicle(vy = 12, vrot = 4, wheelSpin = 0) {
    rigPhysics.vy += vy;
    rigPhysics.vrot += vrot;
    rigPhysics.wheelVel += wheelSpin;
    rigPhysics.awake = true;
  }

  // İmleci Takip Eden Canlı SVG Alet (Sıfır Layout/Reflow: Sadece translate3d ve Tek Seferlik innerHTML)
  let hideToolTimeout = null;
  let strikeAnimTimeout = null;
  let lastToolX = 0;
  let lastToolY = 0;

  function showFloatingToolAt(clientX, clientY, strike = true) {
    const cfg = window.VEHICLE_CATALOG[currentVehicleId];
    const isApp = Boolean(cfg && cfg.isAppliance);
    let iconKey = currentTool;
    if (isApp && currentTool === 'wrench') iconKey = 'pipeWrench';
    else if (isApp && currentTool === 'wash') iconKey = 'sponge';
    const iconMarkup = window.SVG_ICONS[iconKey] || window.SVG_ICONS.drill;
    if (floatingTool.dataset.tool !== iconKey) {
      floatingTool.dataset.tool = iconKey;
      floatingTool.innerHTML = iconMarkup;
    }
    if (floatingTool.hidden) {
      floatingTool.hidden = false;
    }

    const size = 108;
    const left = Math.max(0, Math.min(clientX - size * 0.42, layoutMetrics.vw - size));
    const top = Math.max(0, Math.min(clientY - size * 0.52, layoutMetrics.vh - size));
    lastToolX = left;
    lastToolY = top;
    floatingTool.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`;

    if (strike) {
      floatingTool.classList.add('tool-active-swing');
      if (strikeAnimTimeout) clearTimeout(strikeAnimTimeout);
      strikeAnimTimeout = setTimeout(() => {
        floatingTool.classList.remove('tool-active-swing');
      }, 220);
    }

    if (hideToolTimeout) clearTimeout(hideToolTimeout);
    hideToolTimeout = setTimeout(() => {
      if (!isDraggingTool) {
        floatingTool.hidden = true;
      }
    }, 640);
  }

  let actionCounter = 0;

  function applyToolAtPoint(toolId, targetEl, clientX, clientY) {
    const st = vehicleStates[currentVehicleId];
    actionCounter += 1;
    addStars(1);

    const partEl = targetEl && targetEl.closest ? targetEl.closest('.interactive-part') : null;
    const partType = partEl ? partEl.dataset.part : 'body';
    if (partEl && partEl.dataset.sceneTool && partEl.dataset.sceneTool !== toolId) {
      toolId = partEl.dataset.sceneTool;
      selectTool(toolId);
    }

    showFloatingToolAt(clientX, clientY, true);

    if (partType === 'arm' || currentVehicleId === 'excavator') {
      st.bucketAngle = st.bucketAngle === 0 ? -18 : st.bucketAngle === -18 ? 12 : 0;
    }

    let paletteNeedsSync = false;
    const cfg = window.VEHICLE_CATALOG[currentVehicleId];
    const isApp = Boolean(cfg && cfg.isAppliance);

    if (toolId === 'drill') {
      window.arenAudio.playDrill();
      impulseVehicle(6, (Math.random() - 0.5) * 3.5, 32);

      if (partType === 'bolt' && partEl && partEl.dataset.boltIndex !== undefined) {
        const bIdx = Number(partEl.dataset.boltIndex);
        if (st.boltsLoose[bIdx]) {
          st.boltsLoose[bIdx] = false;
        } else {
          const looseIdx = st.boltsLoose.findIndex(Boolean);
          if (looseIdx !== -1) st.boltsLoose[looseIdx] = false;
        }
      } else {
        const looseIdx = st.boltsLoose.findIndex(Boolean);
        if (looseIdx !== -1) {
          st.boltsLoose[looseIdx] = false;
        }
      }
      spawnVectorParticles(clientX, clientY, 'drill', 20);
    } else if (toolId === 'wrench') {
      window.arenAudio.playWrench();
      impulseVehicle(14, -4, 26);

      st.wheelsBroken = [false, false];
      spawnVectorParticles(clientX, clientY, 'wrench', 18);
    } else if (toolId === 'paint') {
      window.arenAudio.playPaint();
      impulseVehicle(7, -2, 14);

      if (st.primerUnpainted) {
        st.primerUnpainted = false;
      } else {
        st.colorIndex = (st.colorIndex + 1) % window.PAINT_PALETTE.length;
      }
      st.roofDent = false;
      st.engineDent = false;
      paletteNeedsSync = true;
      spawnVectorParticles(clientX, clientY, 'paint', 20);
    } else if (toolId === 'hammer') {
      window.arenAudio.playHammer();
      impulseVehicle(18, (Math.random() - 0.5) * 8, 18);

      st.roofDent = false;
      st.engineDent = false;
      spawnVectorParticles(clientX, clientY, 'hammer', 18);
    } else if (toolId === 'wacky') {
      window.arenAudio.playWacky();
      impulseVehicle(15, -5, 28);

      st.wheelsBroken = [false, false];
      st.roofDent = false;
      if (isApp || partType === 'roof') {
        const rIdx = (window.ROOF_TYPES.indexOf(st.roofType) + 1) % window.ROOF_TYPES.length;
        st.roofType = window.ROOF_TYPES[rIdx];
      } else if (partType === 'wheel') {
        const wIdx = (window.WHEEL_TYPES.indexOf(st.wheelType) + 1) % window.WHEEL_TYPES.length;
        st.wheelType = window.WHEEL_TYPES[wIdx];
      } else {
        const wIdx = (window.WHEEL_TYPES.indexOf(st.wheelType) + 1) % window.WHEEL_TYPES.length;
        st.wheelType = window.WHEEL_TYPES[wIdx === 0 ? 1 : wIdx];
        const rIdx = (window.ROOF_TYPES.indexOf(st.roofType) + 1) % window.ROOF_TYPES.length;
        st.roofType = window.ROOF_TYPES[rIdx === 0 ? 1 : rIdx];
      }
      paletteNeedsSync = true;
      spawnVectorParticles(clientX, clientY, 'wacky', 20);
    } else if (toolId === 'wash') {
      if (isApp) {
        window.arenAudio.playWaterSplash();
      } else {
        window.arenAudio.playHorn();
      }
      impulseVehicle(6, 2, 28);

      st.mudLevels = [0, 0, 0];
      spawnVectorParticles(clientX, clientY, 'wash', 20);
    }

    mountOrUpdateVehicle(paletteNeedsSync);

    let phraseBank = TOOL_PHRASES;
    if (currentVehicleId === 'washer') phraseBank = WASHER_PHRASES;
    else if (currentVehicleId === 'dishwasher') phraseBank = DISHWASHER_PHRASES;
    const phrases = phraseBank[toolId] || TOOL_PHRASES.drill;
    setSpeech(phrases[actionCounter % phrases.length], true, false);
  }

  function syncSubPalettePressedState() {
    if (subPaletteBar.hidden) return;
    const st = vehicleStates[currentVehicleId];
    subPaletteBar.querySelectorAll('[data-paint-idx]').forEach((btn) => {
      const idx = Number(btn.dataset.paintIdx);
      btn.setAttribute('aria-pressed', String(st.colorIndex === idx && !st.primerUnpainted));
    });
    subPaletteBar.querySelectorAll('[data-wheel-type]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(st.wheelType === btn.dataset.wheelType));
    });
    subPaletteBar.querySelectorAll('[data-roof-type]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(st.roofType === btn.dataset.roofType));
    });
  }

  function renderSubPalette() {
    const st = vehicleStates[currentVehicleId];

    if (currentTool === 'paint') {
      subPaletteBar.hidden = false;
      if (subPaletteBar.dataset.mode === 'paint') {
        syncSubPalettePressedState();
        return;
      }
      subPaletteBar.dataset.mode = 'paint';

      const colorBtns = window.PAINT_PALETTE.map((p, idx) => `
        <button type="button" class="swatch-btn" data-paint-idx="${idx}"
          aria-pressed="${st.colorIndex === idx && !st.primerUnpainted}"
          aria-label="${p.name}"
          style="background: ${p.primary};"></button>
      `).join('');

      const decalLabels = {
        flame: 'Alev',
        lightning: 'Şimşek',
        starBadge: 'Yıldız',
        numberThree: '3 Yaş',
        dinoCrest: 'Dino'
      };
      const decalBtns = window.DECAL_KEYS.map((key) => `
        <button type="button" class="mod-chip-btn" data-decal-key="${key}">+ ${decalLabels[key]}</button>
      `).join('');

      subPaletteBar.innerHTML = colorBtns + decalBtns;

      subPaletteBar.querySelectorAll('[data-paint-idx]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const curSt = vehicleStates[currentVehicleId];
          curSt.colorIndex = Number(btn.dataset.paintIdx);
          curSt.primerUnpainted = false;
          window.arenAudio.playPaint();
          impulseVehicle(8, 0, 10);
          mountOrUpdateVehicle(false);
          syncSubPalettePressedState();
        });
      });

      subPaletteBar.querySelectorAll('[data-decal-key]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const curSt = vehicleStates[currentVehicleId];
          const key = btn.dataset.decalKey;
          if (curSt.decals.length >= 3) curSt.decals.shift();
          curSt.decals.push(key);
          window.arenAudio.playPaint();
          impulseVehicle(9, -3, 0);
          mountOrUpdateVehicle(false);
        });
      });
      return;
    }

    if (currentTool === 'wacky') {
      subPaletteBar.hidden = false;
      const cfg = window.VEHICLE_CATALOG[currentVehicleId];
      const isApp = Boolean(cfg && cfg.isAppliance);
      const modeKey = isApp ? 'wacky-appliance' : 'wacky-vehicle';
      if (subPaletteBar.dataset.mode === modeKey) {
        syncSubPalettePressedState();
        return;
      }
      subPaletteBar.dataset.mode = modeKey;

      const wheelNames = {
        normal: 'İş Lastiği',
        donut: 'Çörek Teker',
        monster: 'Canavar Teker',
        hover: 'Uçan Jet',
        gear: 'Altın Dişli'
      };
      const roofNames = {
        normal: isApp ? 'Standart Üst' : 'Projektör',
        rocket: 'Süper Roket',
        dino: 'T-Rex Dino',
        rotor: 'Pervane',
        siren: 'Çakar Siren'
      };

      const wBtns = isApp
        ? ''
        : window.WHEEL_TYPES.map((w) => `
          <button type="button" class="mod-chip-btn" data-wheel-type="${w}" aria-pressed="${st.wheelType === w}">
            ${wheelNames[w]}
          </button>
        `).join('');

      const rBtns = window.ROOF_TYPES.map((r) => `
        <button type="button" class="mod-chip-btn" data-roof-type="${r}" aria-pressed="${st.roofType === r}">
          ${roofNames[r]}
        </button>
      `).join('');

      const decalLabels = {
        flame: 'Alev',
        lightning: 'Şimşek',
        starBadge: 'Yıldız',
        numberThree: '3 Yaş',
        dinoCrest: 'Dino'
      };
      const appDecalBtns = isApp
        ? window.DECAL_KEYS.map((key) => `
          <button type="button" class="mod-chip-btn" data-decal-key="${key}">+ ${decalLabels[key]}</button>
        `).join('')
        : '';

      subPaletteBar.innerHTML = wBtns + rBtns + appDecalBtns;

      subPaletteBar.querySelectorAll('[data-wheel-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const curSt = vehicleStates[currentVehicleId];
          curSt.wheelType = btn.dataset.wheelType;
          curSt.wheelsBroken = [false, false];
          window.arenAudio.playWacky();
          impulseVehicle(14, -4, 25);
          mountOrUpdateVehicle(false);
          syncSubPalettePressedState();
        });
      });

      subPaletteBar.querySelectorAll('[data-roof-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const curSt = vehicleStates[currentVehicleId];
          curSt.roofType = btn.dataset.roofType;
          curSt.roofDent = false;
          window.arenAudio.playWacky();
          impulseVehicle(12, 4, 10);
          mountOrUpdateVehicle(false);
          syncSubPalettePressedState();
        });
      });

      subPaletteBar.querySelectorAll('[data-decal-key]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const curSt = vehicleStates[currentVehicleId];
          const key = btn.dataset.decalKey;
          if (curSt.decals.length >= 3) curSt.decals.shift();
          curSt.decals.push(key);
          window.arenAudio.playPaint();
          impulseVehicle(9, -3, 0);
          mountOrUpdateVehicle(false);
        });
      });
      return;
    }

    subPaletteBar.hidden = true;
    subPaletteBar.dataset.mode = '';
  }

  // Alet Seçimi ve Pointer Capture ile Sürükleme (Sürükleme Boyunca Sadece GPU translate3d)
  const toolButtons = document.querySelectorAll('.tool-btn');
  let dragStartX = 0;
  let dragStartY = 0;
  let isDraggingTool = false;
  let draggedToolId = null;
  let lastDragApplyTime = 0;

  function selectTool(toolId) {
    currentTool = toolId;
    toolButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.tool === toolId ? 'true' : 'false');
    });
    renderSubPalette();
  }

  toolButtons.forEach((btn) => {
    btn.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      const toolId = btn.dataset.tool;
      selectTool(toolId);

      dragStartX = event.clientX;
      dragStartY = event.clientY;
      isDraggingTool = false;
      draggedToolId = toolId;

      btn.setPointerCapture(event.pointerId);
    });

    btn.addEventListener('pointermove', (event) => {
      if (!btn.hasPointerCapture(event.pointerId)) return;
      const dist = Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY);

      if (dist > 6 && !isDraggingTool) {
        isDraggingTool = true;
        btn.classList.add('dragging');
      }

      if (isDraggingTool) {
        showFloatingToolAt(event.clientX, event.clientY, false);
        const now = performance.now();
        if (now - lastDragApplyTime > 310) {
          lastDragApplyTime = now;
          const hitEl = document.elementFromPoint(event.clientX, event.clientY);
          if (hitEl && vehicleStage.contains(hitEl)) {
            applyToolAtPoint(draggedToolId, hitEl, event.clientX, event.clientY);
          }
        }
      }
    });

    btn.addEventListener('pointerup', (event) => {
      if (isDraggingTool) {
        btn.classList.remove('dragging');
        const hitEl = document.elementFromPoint(event.clientX, event.clientY);
        if (hitEl && vehicleStage.contains(hitEl)) {
          applyToolAtPoint(draggedToolId, hitEl, event.clientX, event.clientY);
        }
      }
      isDraggingTool = false;
      floatingTool.hidden = true;
    });

    btn.addEventListener('lostpointercapture', () => {
      btn.classList.remove('dragging');
      isDraggingTool = false;
      floatingTool.hidden = true;
    });
  });

  // Araç Üzerine Doğrudan Dokunma veya Sürükleme
  let stagePointerActive = false;
  let lastStageTick = 0;

  vehicleStage.addEventListener('pointerdown', (event) => {
    if (isTestDrive) return;
    stagePointerActive = true;
    lastStageTick = performance.now();
    applyToolAtPoint(currentTool, event.target, event.clientX, event.clientY);
  });

  vehicleStage.addEventListener('pointermove', (event) => {
    if (!stagePointerActive || isTestDrive) return;
    showFloatingToolAt(event.clientX, event.clientY, false);
    const now = performance.now();
    if (now - lastStageTick > 290) {
      lastStageTick = now;
      applyToolAtPoint(currentTool, event.target, event.clientX, event.clientY);
    }
  });

  window.addEventListener('pointerup', () => {
    stagePointerActive = false;
  }, { passive: true });

  // Araç Sekmesi Değiştirme
  const vehicleTabs = document.querySelectorAll('.vehicle-tab');
  vehicleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.vehicle;
      if (targetId === currentVehicleId && !isTestDrive && !isAppliancePlay) return;

      if (isTestDrive) stopTestDrive(false);
      if (isAppliancePlay) stopAppliancePlay(false);

      vehicleTabs.forEach((t) => {
        t.setAttribute('aria-pressed', t.dataset.vehicle === targetId ? 'true' : 'false');
      });

      garageDoor.classList.add('closed');
      window.arenAudio.playHammer();
      setSpeech(window.VEHICLE_CATALOG[targetId].welcomeVoice, true, true);

      setTimeout(() => {
        currentVehicleId = targetId;
        mountOrUpdateVehicle(true);
        impulseVehicle(14, -3, 18);
        garageDoor.classList.remove('closed');
      }, 360);
    });
  });

  // Afacan Modu ("Kirlet / Boz!")
  mischiefBtn.addEventListener('click', () => {
    if (isTestDrive) stopTestDrive(false);
    if (isAppliancePlay) stopAppliancePlay(false);
    const cfg = window.VEHICLE_CATALOG[currentVehicleId];
    const st = vehicleStates[currentVehicleId];
    st.boltsLoose = cfg && cfg.isAppliance ? [true, true, true, true] : [true, true, true];
    st.wheelsBroken = [true, false];
    st.primerUnpainted = true;
    st.roofDent = true;
    st.engineDent = true;
    st.mudLevels = [1, 1, 1];

    window.arenAudio.playMischief();
    impulseVehicle(20, -8, -15);
    mountOrUpdateVehicle(true);

    spawnVectorParticles(layoutMetrics.stageCenterX, layoutMetrics.stageCenterY, 'drill', 22);
    let msg = 'Hahaha! Afacan Aren kamyonu çamura buladı ve lastiğini patlattı! Hadi baştan tamir edelim!';
    if (currentVehicleId === 'washer') {
      msg = 'Hahaha! Afacan Aren çamaşır makinesinin vidalarını gevşetti ve kapağa çorap sıkıştırdı!';
    } else if (currentVehicleId === 'dishwasher') {
      msg = 'Hahaha! Afacan Aren bulaşık makinesini köpüğe buladı ve vidalarını gevşetti!';
    }
    setSpeech(msg, true, true);
  });

  // ÇAMAŞIR & BULAŞIK MAKİNESİ ETKİLEŞİMLİ YIKAMA OYUNU MODU
  const WASHER_ITEMS = [
    {
      name: 'Kırmızı Tişört',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <path d="M 16 10 L 24 10 C 26 16, 38 16, 40 10 L 48 10 L 58 22 L 50 30 L 45 24 L 45 48 L 19 48 L 19 24 L 14 30 L 6 22 Z"
            fill="#e63946" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          ${dirty ? `<circle cx="28" cy="28" r="5" fill="#7f4f24"/><circle cx="37" cy="36" r="4" fill="#582f0e"/>` : ''}
        </svg>`
    },
    {
      name: 'Sarı Çorap',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <path d="M 26 8 L 42 8 L 40 34 C 40 44, 18 46, 16 36 C 14 28, 24 26, 26 22 Z"
            fill="#ffbe0b" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          <line x1="26" y1="15" x2="41" y2="15" stroke="#ff4d8d" stroke-width="4"/>
          ${dirty ? `<circle cx="28" cy="34" r="4.5" fill="#7f4f24"/>` : ''}
        </svg>`
    },
    {
      name: 'Mavi Pantolon',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <path d="M 18 8 L 46 8 L 50 48 L 36 48 L 32 24 L 28 48 L 14 48 Z"
            fill="#0077b6" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          ${dirty ? `<circle cx="23" cy="34" r="4.5" fill="#7f4f24"/><circle cx="41" cy="28" r="4" fill="#582f0e"/>` : ''}
        </svg>`
    },
    {
      name: 'Mor Havlu',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <rect x="14" y="10" width="36" height="36" rx="6" fill="#7209b7" stroke="#ffffff" stroke-width="3"/>
          <line x1="16" y1="18" x2="48" y2="18" stroke="#ffbe0b" stroke-width="3.5"/>
          <line x1="16" y1="38" x2="48" y2="38" stroke="#ffbe0b" stroke-width="3.5"/>
          ${dirty ? `<circle cx="32" cy="28" r="5.5" fill="#7f4f24"/>` : ''}
        </svg>`
    }
  ];

  const DISHWASHER_ITEMS = [
    {
      name: 'Soslu Tabak',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <circle cx="32" cy="28" r="21" fill="#ffffff" stroke="#38bdf8" stroke-width="4"/>
          <circle cx="32" cy="28" r="13" fill="#f1f5f9" stroke="#bae6fd" stroke-width="2"/>
          ${dirty ? `<circle cx="29" cy="25" r="5" fill="#e63946"/><circle cx="36" cy="32" r="4" fill="#d97706"/>` : ''}
        </svg>`
    },
    {
      name: 'Çikolatalı Kase',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <path d="M 10 20 L 54 20 C 52 44, 12 44, 10 20 Z" fill="#ff4d8d" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          ${dirty ? `<circle cx="28" cy="28" r="4.5" fill="#582f0e"/><circle cx="38" cy="27" r="3.5" fill="#7f4f24"/>` : ''}
        </svg>`
    },
    {
      name: 'Meyveli Bardak',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <path d="M 42 18 L 52 18 C 56 18, 56 34, 52 34 L 42 34" fill="none" stroke="#ffffff" stroke-width="4"/>
          <rect x="16" y="10" width="28" height="36" rx="5" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
          ${dirty ? `<circle cx="30" cy="26" r="5" fill="#d97706"/>` : ''}
        </svg>`
    },
    {
      name: 'Turuncu Tencere',
      svg: (dirty) => `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <rect x="8" y="22" width="8" height="8" rx="2" fill="#334155"/>
          <rect x="48" y="22" width="8" height="8" rx="2" fill="#334155"/>
          <rect x="14" y="16" width="36" height="28" rx="6" fill="#ff9f1c" stroke="#ffffff" stroke-width="3"/>
          ${dirty ? `<circle cx="28" cy="30" r="5" fill="#7f4f24"/><circle cx="37" cy="28" r="4" fill="#b45309"/>` : ''}
        </svg>`
    }
  ];

  function renderApplianceInteractiveSVG(appId) {
    const pState = appliancePlayState[appId];
    const vState = vehicleStates[appId];
    const palette = window.PAINT_PALETTE[vState.colorIndex % window.PAINT_PALETTE.length];
    const bodyColor = vState.primerUnpainted ? '#94a3b8' : palette.primary;
    const sideColor = vState.primerUnpainted ? '#64748b' : palette.dark;
    const loadedCount = pState.itemsLoaded.filter(Boolean).length;

    if (appId === 'washer') {
      return `
        <svg viewBox="0 0 540 390" role="img" aria-label="Etkileşimli Çamaşır Makinesi">
          <ellipse cx="270" cy="364" rx="170" ry="15" fill="#0f172a" opacity="0.22"/>
          <rect x="116" y="22" width="308" height="330" rx="28" fill="#ffffff" stroke="#ffffff" stroke-width="10"/>
          <rect x="120" y="26" width="300" height="322" rx="24" fill="${bodyColor}"/>
          <path d="M 396 26 L 400 26 C 412 26, 420 35, 420 46 L 420 328 C 420 339, 412 348, 400 348 L 396 348 Z" fill="${sideColor}" opacity="0.85"/>

          <!-- Üst Kontrol Paneli ve Deterjan Çekmecesi (Dokunulabilir!) -->
          <path d="M 120 48 C 120 35, 130 26, 142 26 L 398 26 C 410 26, 420 35, 420 48 L 420 96 L 120 96 Z" fill="#f1f5f9"/>
          <line x1="120" y1="96" x2="420" y2="96" stroke="#94a3b8" stroke-width="4"/>

          <!-- Sol: Deterjan Çekmecesi -->
          <g class="app-click-zone" data-app-zone="detergent" style="cursor: pointer;">
            <rect x="136" y="40" width="96" height="42" rx="9" fill="${pState.detergentAdded ? '#bae6fd' : '#e2e8f0'}" stroke="${pState.detergentAdded ? '#0284c7' : '#64748b'}" stroke-width="3"/>
            <rect x="156" y="56" width="56" height="10" rx="5" fill="#0284c7"/>
            ${pState.detergentAdded ? `
              <circle cx="152" cy="40" r="9" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
              <circle cx="172" cy="36" r="7" fill="#caf0f8" stroke="#ffffff" stroke-width="2"/>
              <circle cx="212" cy="40" r="8" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
            ` : ''}
          </g>

          <!-- Orta: Dijital LED Gösterge -->
          <rect x="244" y="40" width="96" height="42" rx="9" fill="#0f172a" stroke="#475569" stroke-width="3"/>
          <circle cx="262" cy="61" r="6" fill="${pState.isClean ? '#38b000' : pState.isWashing ? '#38bdf8' : '#ffbe0b'}"/>
          <text x="298" y="67" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="18" fill="#38bdf8">
            ${pState.isClean ? 'TEMİZ' : pState.isWashing ? 'YIKIYOR' : `${loadedCount}/4`}
          </text>

          <!-- Sağ: Başlat Kadranı -->
          <g class="app-click-zone" data-app-zone="start" style="cursor: pointer;">
            <circle cx="378" cy="61" r="20" fill="#38b000" stroke="#ffffff" stroke-width="3"/>
            <polygon points="373,52 389,61 373,70" fill="#ffffff"/>
          </g>

          <!-- ORTA DEV TAMBUR (Dokununca Çamaşır Ekler!) -->
          <g transform="translate(270, 218)" class="app-click-zone" data-app-zone="drum" style="cursor: pointer;">
            <circle cx="0" cy="0" r="98" fill="#1e293b"/>
            <circle cx="0" cy="0" r="84" fill="#0f172a"/>

            <g class="app-spin-node">
              <circle cx="0" cy="0" r="78" fill="#334155"/>
              <circle cx="0" cy="-58" r="5" fill="#0f172a"/>
              <circle cx="50" cy="-29" r="5" fill="#0f172a"/>
              <circle cx="50" cy="29" r="5" fill="#0f172a"/>
              <circle cx="0" cy="58" r="5" fill="#0f172a"/>
              <circle cx="-50" cy="29" r="5" fill="#0f172a"/>
              <circle cx="-50" cy="-29" r="5" fill="#0f172a"/>

              <!-- Tambura Atılan Çamaşırlar -->
              ${pState.itemsLoaded[0] ? `
                <g transform="translate(-26, -20) rotate(-14)">
                  <path d="M -22 -14 L 22 -14 L 28 16 L -28 16 Z" fill="#e63946" stroke="#ffffff" stroke-width="2.5"/>
                  ${!pState.isClean && !pState.isWashing ? `<circle cx="-6" cy="2" r="5" fill="#7f4f24"/>` : ''}
                </g>
              ` : ''}
              ${pState.itemsLoaded[1] ? `
                <g transform="translate(26, -18) rotate(18)">
                  <path d="M -12 -18 L 8 -18 L 6 14 C 6 24, -18 24, -18 14 Z" fill="#ffbe0b" stroke="#ffffff" stroke-width="2.5"/>
                  ${!pState.isClean && !pState.isWashing ? `<circle cx="-4" cy="6" r="4" fill="#7f4f24"/>` : ''}
                </g>
              ` : ''}
              ${pState.itemsLoaded[2] ? `
                <g transform="translate(-22, 24) rotate(10)">
                  <path d="M -20 -14 L 20 -14 L 24 18 L 4 18 L 0 0 L -4 18 L -24 18 Z" fill="#0077b6" stroke="#ffffff" stroke-width="2.5"/>
                  ${!pState.isClean && !pState.isWashing ? `<circle cx="-8" cy="4" r="4.5" fill="#7f4f24"/>` : ''}
                </g>
              ` : ''}
              ${pState.itemsLoaded[3] ? `
                <g transform="translate(22, 22) rotate(-12)">
                  <rect x="-22" y="-16" width="44" height="32" rx="6" fill="#7209b7" stroke="#ffffff" stroke-width="2.5"/>
                  ${!pState.isClean && !pState.isWashing ? `<circle cx="0" cy="0" r="5" fill="#7f4f24"/>` : ''}
                </g>
              ` : ''}

              <!-- Yıkama Sırasında Köpüklü Su Dalgası -->
              ${(pState.isWashing || pState.detergentAdded) ? `
                <path d="M -74 12 Q -36 -14 0 12 T 74 12 A 74 74 0 0 1 -74 12 Z" fill="#38bdf8" opacity="${pState.isWashing ? '0.86' : '0.45'}"/>
                <circle cx="-28" cy="-12" r="10" fill="#ffffff" opacity="0.88"/>
                <circle cx="24" cy="-22" r="8" fill="#caf0f8" opacity="0.92"/>
                <circle cx="10" cy="18" r="11" fill="#ffffff" opacity="0.82"/>
                <circle cx="-32" cy="24" r="8" fill="#caf0f8" opacity="0.88"/>
              ` : ''}
            </g>

            <!-- Cam Kapak Çerçevesi -->
            <circle cx="0" cy="0" r="88" fill="none" stroke="#cbd5e1" stroke-width="14"/>
            <circle cx="0" cy="0" r="88" fill="none" stroke="#f8fafc" stroke-width="5"/>
            <path d="M -52 -36 A 64 64 0 0 1 42 -46" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.55"/>
            <rect x="74" y="-18" width="16" height="36" rx="6" fill="#334155" stroke="#ffffff" stroke-width="2.5"/>

            ${pState.isClean ? `
              ${window.renderSparkleStar(-38, -32, 16, 0.1)}
              ${window.renderSparkleStar(38, -28, 14, 0.3)}
              ${window.renderSparkleStar(0, 32, 16, 0.5)}
            ` : ''}
          </g>
        </svg>
      `;
    }

    // BULAŞIK MAKİNESİ YIKAMA SAHNESİ
    return `
      <svg viewBox="0 0 540 390" role="img" aria-label="Etkileşimli Bulaşık Makinesi">
        <ellipse cx="270" cy="364" rx="175" ry="15" fill="#0f172a" opacity="0.22"/>
        <rect x="112" y="22" width="316" height="330" rx="22" fill="#ffffff" stroke="#ffffff" stroke-width="10"/>
        <rect x="116" y="26" width="308" height="322" rx="18" fill="${bodyColor}"/>
        <path d="M 398 26 L 406 26 C 416 26, 424 34, 424 44 L 424 330 C 424 340, 416 348, 406 348 L 398 348 Z" fill="${sideColor}" opacity="0.85"/>

        <!-- Üst Ankastre Kontrol Paneli -->
        <path d="M 116 44 C 116 34, 124 26, 134 26 L 406 26 C 416 26, 424 34, 424 44 L 424 92 L 116 92 Z" fill="#1e293b"/>
        <line x1="116" y1="92" x2="424" y2="92" stroke="#94a3b8" stroke-width="4"/>

        <!-- Sol: Tablet Deterjan Yuvası (Dokunulabilir!) -->
        <g class="app-click-zone" data-app-zone="detergent" style="cursor: pointer;">
          <rect x="132" y="38" width="92" height="40" rx="8" fill="${pState.detergentAdded ? '#fef08a' : '#334155'}" stroke="#ffffff" stroke-width="2.5"/>
          <circle cx="156" cy="58" r="10" fill="#38bdf8"/>
          <circle cx="182" cy="58" r="10" fill="#ff4d8d"/>
          <circle cx="204" cy="58" r="7" fill="#38b000"/>
        </g>

        <!-- Orta: Dijital Ekran -->
        <rect x="236" y="38" width="110" height="40" rx="8" fill="#0f172a" stroke="#475569" stroke-width="2.5"/>
        <text x="291" y="64" text-anchor="middle" font-family="system-ui, sans-serif" font-weight="900" font-size="17" fill="#38bdf8">
          ${pState.isClean ? 'TERTEMİZ' : pState.isWashing ? '65°C YIKIYOR' : `${loadedCount}/4 BULAŞIK`}
        </text>

        <!-- Sağ: Başlat Düğmesi -->
        <g class="app-click-zone" data-app-zone="start" style="cursor: pointer;">
          <circle cx="384" cy="58" r="20" fill="#38b000" stroke="#ffffff" stroke-width="3"/>
          <polygon points="379,49 395,58 379,67" fill="#ffffff"/>
        </g>

        <!-- BULAŞIK MAKİNESİ İÇ SEPETLER VE FISKİYE (Dokununca Bulaşık Dizer!) -->
        <g transform="translate(270, 220)" class="app-click-zone" data-app-zone="drum" style="cursor: pointer;">
          <rect x="-126" y="-102" width="252" height="204" rx="16" fill="#0f172a" stroke="#cbd5e1" stroke-width="9"/>
          <rect x="-116" y="-92" width="232" height="184" rx="12" fill="#1e293b"/>

          <!-- Yıkama Öncesinde Sepetlerin Arkasında Duran Alt Su Fıskiyesi (Tabakların Önünü Kapatmaz!) -->
          ${!pState.isWashing ? `
            <g transform="translate(0, 80)" opacity="0.78">
              <rect x="-78" y="-5" width="156" height="10" rx="5" fill="#38bdf8" stroke="#ffffff" stroke-width="2"/>
              <circle cx="0" cy="0" r="9" fill="#ffbe0b" stroke="#ffffff" stroke-width="2"/>
            </g>
          ` : ''}

          <!-- ÜST SEPET (Kase ve Bardak) -->
          <g transform="translate(0, -44)">
            ${pState.itemsLoaded[1] ? `
              <g transform="translate(-52, -8)">
                <path d="M -28 -12 L 28 -12 C 24 18, -24 18, -28 -12 Z" fill="#ff4d8d" stroke="#ffffff" stroke-width="3"/>
                ${!pState.isClean && !pState.isWashing ? `<circle cx="-6" cy="-2" r="5" fill="#582f0e"/><circle cx="8" cy="0" r="4" fill="#7f4f24"/>` : ''}
              </g>
            ` : ''}
            ${pState.itemsLoaded[2] ? `
              <g transform="translate(42, -16)">
                <rect x="-18" y="-12" width="36" height="36" rx="6" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
                ${!pState.isClean && !pState.isWashing ? `<circle cx="0" cy="6" r="5.5" fill="#d97706"/>` : ''}
              </g>
            ` : ''}
            <line x1="-106" y1="16" x2="106" y2="16" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
            <line x1="-80" y1="2" x2="-80" y2="16" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="-40" y1="2" x2="-40" y2="16" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="0" y1="2" x2="0" y2="16" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="40" y1="2" x2="40" y2="16" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round"/>
            <line x1="80" y1="2" x2="80" y2="16" stroke="#cbd5e1" stroke-width="3.5" stroke-linecap="round"/>
          </g>

          <!-- ALT SEPET (Soslu Tabaklar ve Tencere) -->
          <g transform="translate(0, 48)">
            ${pState.itemsLoaded[0] ? `
              <g transform="translate(-54, -4)">
                <ellipse cx="-20" cy="0" rx="10" ry="28" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
                <ellipse cx="4" cy="0" rx="10" ry="28" fill="#caf0f8" stroke="#0077b6" stroke-width="3"/>
                <ellipse cx="28" cy="0" rx="10" ry="28" fill="#ffffff" stroke="#38bdf8" stroke-width="3"/>
                ${!pState.isClean && !pState.isWashing ? `<circle cx="-20" cy="-4" r="5" fill="#e63946"/><circle cx="28" cy="4" r="5" fill="#d97706"/>` : ''}
              </g>
            ` : ''}
            ${pState.itemsLoaded[3] ? `
              <g transform="translate(48, 0)">
                <rect x="-32" y="-16" width="64" height="36" rx="8" fill="#ff9f1c" stroke="#ffffff" stroke-width="3"/>
                ${!pState.isClean && !pState.isWashing ? `<circle cx="-8" cy="2" r="5.5" fill="#7f4f24"/><circle cx="10" cy="4" r="4.5" fill="#b45309"/>` : ''}
              </g>
            ` : ''}
            <line x1="-106" y1="26" x2="106" y2="26" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          </g>

          <!-- SADECE YIKAMA SIRASINDA ÖNDE DÖNEN 60FPS ÇİFT SU FISKİYESİ VE KÖPÜKLÜ SU JETLERİ -->
          ${pState.isWashing ? `
            <g transform="translate(0, 4)">
              <g class="app-spin-node">
                <rect x="-86" y="-7" width="172" height="14" rx="7" fill="#38bdf8" stroke="#ffffff" stroke-width="3"/>
                <rect x="-7" y="-58" width="14" height="116" rx="7" fill="#00b4d8" stroke="#ffffff" stroke-width="3"/>
                <circle cx="0" cy="0" r="14" fill="#ffbe0b" stroke="#ffffff" stroke-width="3"/>
                <circle cx="-64" cy="-24" r="9" fill="#caf0f8" opacity="0.92"/>
                <circle cx="64" cy="24" r="9" fill="#ffffff" opacity="0.92"/>
                <circle cx="28" cy="-44" r="8" fill="#38bdf8" opacity="0.9"/>
                <circle cx="-32" cy="44" r="10" fill="#caf0f8" opacity="0.9"/>
              </g>
            </g>
          ` : ''}

          ${pState.isClean ? `
            ${window.renderSparkleStar(-56, -48, 16, 0.1)}
            ${window.renderSparkleStar(52, -44, 15, 0.3)}
            ${window.renderSparkleStar(-48, 42, 16, 0.2)}
            ${window.renderSparkleStar(52, 42, 16, 0.5)}
          ` : ''}
        </g>
      </svg>
    `;
  }

  function renderDetergentCardSVG(appId) {
    if (appId === 'washer') {
      return `
        <svg viewBox="0 0 64 56" class="item-card-svg">
          <rect x="24" y="4" width="14" height="8" rx="3" fill="#ff4d8d" stroke="#ffffff" stroke-width="2.5"/>
          <path d="M 16 14 C 16 10, 46 10, 46 14 L 50 48 C 50 51, 14 51, 14 48 Z" fill="#38bdf8" stroke="#ffffff" stroke-width="3" stroke-linejoin="round"/>
          <path d="M 42 20 C 52 20, 52 36, 42 36" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
          <circle cx="31" cy="32" r="9" fill="#ffffff" opacity="0.9"/>
          <circle cx="29" cy="30" r="4" fill="#ffbe0b"/>
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 64 56" class="item-card-svg">
        <rect x="10" y="12" width="44" height="32" rx="8" fill="#ffffff" stroke="#38bdf8" stroke-width="3.5"/>
        <rect x="14" y="16" width="18" height="24" rx="4" fill="#38bdf8"/>
        <rect x="32" y="16" width="18" height="24" rx="4" fill="#38b000"/>
        <circle cx="32" cy="28" r="8" fill="#ff4d8d" stroke="#ffffff" stroke-width="2.5"/>
      </svg>
    `;
  }

  function bindApplianceCardInteraction(btn, onActivate) {
    let startX = 0;
    let startY = 0;
    let dragged = false;

    btn.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      startX = e.clientX;
      startY = e.clientY;
      dragged = false;
      btn.setPointerCapture(e.pointerId);
    });

    btn.addEventListener('pointermove', (e) => {
      if (!btn.hasPointerCapture(e.pointerId)) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!dragged && Math.hypot(dx, dy) > 8) {
        dragged = true;
        btn.style.zIndex = '60';
      }
      if (dragged) {
        btn.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(1.08)`;
      }
    });

    btn.addEventListener('pointerup', (e) => {
      btn.style.transform = '';
      btn.style.zIndex = '';
      onActivate(e.clientX || layoutMetrics.stageCenterX, e.clientY || layoutMetrics.stageCenterY);
      dragged = false;
    });

    btn.addEventListener('lostpointercapture', () => {
      btn.style.transform = '';
      btn.style.zIndex = '';
      dragged = false;
    });
  }

  function syncAppliancePlayDOM() {
    if (!isAppliancePlay) return;
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    const pState = appliancePlayState[appId];
    const catalog = appId === 'washer' ? WASHER_ITEMS : DISHWASHER_ITEMS;

    const itemCardsHtml = catalog.map((item, idx) => {
      const loaded = pState.itemsLoaded[idx];
      return `
        <button type="button" class="appliance-item-card ${loaded ? 'loaded' : ''}" data-app-item="${idx}">
          ${item.svg(!loaded && !pState.isClean)}
          <span>${loaded ? `${item.name} (Eklendi)` : item.name}</span>
        </button>
      `;
    }).join('');

    const detLabel = appId === 'washer'
      ? (pState.detergentAdded ? 'Deterjan & Köpük Hazır!' : '+ Deterjan & Yumuşatıcı Koy')
      : (pState.detergentAdded ? 'Parlatıcı Tablet Hazır!' : '+ Parlatıcı Bulaşık Tableti Koy');

    const detCardHtml = `
      <button type="button" class="appliance-item-card detergent-card ${pState.detergentAdded ? 'loaded' : ''}" data-app-detergent="true">
        ${renderDetergentCardSVG(appId)}
        <span>${detLabel}</span>
      </button>
    `;

    applianceItemsTray.innerHTML = itemCardsHtml + detCardHtml;
    applianceMachineView.innerHTML = renderApplianceInteractiveSVG(appId);
    appSpinNodes = Array.from(applianceMachineView.querySelectorAll('.app-spin-node'));

    if (appStartWashText) {
      appStartWashText.textContent = pState.isWashing
        ? 'KÖPÜK TURBO!'
        : pState.isClean
          ? 'TEKRAR YIKA!'
          : 'YIKAMAYI BAŞLAT!';
    }

    applianceItemsTray.querySelectorAll('[data-app-item]').forEach((btn) => {
      const idx = Number(btn.dataset.appItem);
      bindApplianceCardInteraction(btn, (cx, cy) => {
        loadApplianceItem(idx, cx, cy);
      });
    });

    const detBtn = applianceItemsTray.querySelector('[data-app-detergent]');
    if (detBtn) {
      bindApplianceCardInteraction(detBtn, (cx, cy) => {
        addApplianceDetergent(cx, cy);
      });
    }

    applianceMachineView.querySelectorAll('.app-click-zone').forEach((zone) => {
      zone.addEventListener('click', (e) => {
        const zType = zone.dataset.appZone;
        if (zType === 'detergent') {
          addApplianceDetergent(e.clientX, e.clientY);
        } else if (zType === 'start') {
          triggerApplianceWashCycle();
        } else {
          const nextIdx = pState.itemsLoaded.findIndex((v) => !v);
          if (nextIdx !== -1) {
            loadApplianceItem(nextIdx, e.clientX, e.clientY);
          } else if (!pState.detergentAdded) {
            addApplianceDetergent(e.clientX, e.clientY);
          } else {
            triggerApplianceWashCycle();
          }
        }
      });
    });
  }

  function loadApplianceItem(idx, clientX, clientY) {
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    const pState = appliancePlayState[appId];
    if (pState.isWashing) return;
    pState.isClean = false;
    pState.itemsLoaded[idx] = true;
    addStars(1);
    window.arenAudio.playWacky();
    spawnVectorParticles(clientX, clientY, 'wacky', 16);
    syncAppliancePlayDOM();

    const msg = appId === 'washer'
      ? 'Hop! Kirli çamaşırı çamaşır makinesinin tamburuna attık Usta Aren!'
      : 'Harika! Kirli bulaşığı bulaşık makinesinin sepetine yerleştirdik Usta Aren!';
    setSpeech(msg, true, true);
  }

  function addApplianceDetergent(clientX, clientY) {
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    const pState = appliancePlayState[appId];
    if (pState.isWashing) return;
    pState.isClean = false;
    pState.detergentAdded = true;
    addStars(1);
    window.arenAudio.playWaterSplash();
    spawnVectorParticles(clientX, clientY, 'wash', 18);
    syncAppliancePlayDOM();

    const msg = appId === 'washer'
      ? 'Mis kokulu sıvı deterjanı ve yumuşatıcıyı çekmeceye koyduk Usta Aren!'
      : 'Parlatıcı bulaşık tabletini deterjan kutusuna taktık Usta Aren!';
    setSpeech(msg, true, true);
  }

  function triggerApplianceWashCycle() {
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    const pState = appliancePlayState[appId];

    if (pState.isWashing) {
      pState.washTimer = Math.max(40, pState.washTimer - 45);
      window.arenAudio.playWaterSplash();
      spawnVectorParticles(layoutMetrics.stageCenterX, layoutMetrics.stageCenterY, 'wash', 20);
      return;
    }

    // Adım adım oyun mekaniği: Önce kirli çamaşır/bulaşık eklenmeli, sonra deterjan konmalı!
    if (!pState.itemsLoaded.some(Boolean)) {
      window.arenAudio.playWrench();
      applianceItemsTray.querySelectorAll('[data-app-item]').forEach((el) => {
        el.classList.add('needs-attention');
      });
      const needItemsMsg = appId === 'washer'
        ? 'Önce kirli çamaşırları makinenin içine atalım Usta Aren!'
        : 'Önce kirli tabak ve bardakları sepete dizelim Usta Aren!';
      setSpeech(needItemsMsg, true, true);
      return;
    }

    if (!pState.detergentAdded) {
      window.arenAudio.playWrench();
      const detEl = applianceItemsTray.querySelector('[data-app-detergent]');
      if (detEl) detEl.classList.add('needs-attention');
      const needDetMsg = appId === 'washer'
        ? 'Deterjan koymayı unutmayalım Usta Aren! Deterjan şişesine dokun!'
        : 'Bulaşık tabletini koymayı unutmayalım Usta Aren! Deterjan kutusuna dokun!';
      setSpeech(needDetMsg, true, true);
      return;
    }

    pState.isClean = false;
    pState.isWashing = true;
    pState.washTimer = 240; // ~4 saniye 60FPS yıkama döngüsü
    window.arenAudio.playWaterSplash();
    spawnVectorParticles(layoutMetrics.stageCenterX, layoutMetrics.stageCenterY, 'wash', 22);
    syncAppliancePlayDOM();

    const startMsg = appId === 'washer'
      ? 'Çamaşır makinesi çalışıyor! Su doluyor, köpüklerle tambur dönüyor Usta Aren!'
      : 'Bulaşık makinesi çalışıyor! Sıcak su fıskiyeleri dönüyor, bulaşıklar yıkanıyor Usta Aren!';
    setSpeech(startMsg, true, true);
  }

  function resetApplianceItems() {
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    const pState = appliancePlayState[appId];
    pState.itemsLoaded = [false, false, false, false];
    pState.detergentAdded = false;
    pState.isWashing = false;
    pState.isClean = false;
    pState.washTimer = 0;
    window.arenAudio.playWrench();
    syncAppliancePlayDOM();

    const msg = appId === 'washer'
      ? 'Çamaşır yıkama zamanı Usta Aren! Kirli çamaşırları tambura at, deterjanı koy ve yıkamayı başlat!'
      : 'Bulaşık yıkama zamanı Usta Aren! Kirli tabakları ve bardakları sepete diz, tableti koy ve makineyi çalıştır!';
    setSpeech(msg, true, true);
  }

  function startAppliancePlay() {
    isAppliancePlay = true;
    appliancePlayStage.hidden = false;
    subPaletteBar.hidden = true;
    if (toolbeltDock) toolbeltDock.hidden = true;
    syncAppliancePlayDOM();
    refreshLayoutMetrics();
    window.arenAudio.playVictory();

    const msg = currentVehicleId === 'washer'
      ? 'Çamaşır yıkama zamanı Usta Aren! Kirli çamaşırları tambura at, deterjanı koy ve yıkamayı başlat!'
      : 'Bulaşık yıkama zamanı Usta Aren! Kirli tabakları ve bardakları sepete diz, tableti koy ve makineyi çalıştır!';
    setSpeech(msg, true, true);
  }

  function stopAppliancePlay(announce = true) {
    isAppliancePlay = false;
    appliancePlayStage.hidden = true;
    if (toolbeltDock) toolbeltDock.hidden = false;
    const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
    appliancePlayState[appId].isWashing = false;
    mountOrUpdateVehicle(true);
    renderSubPalette();
    refreshLayoutMetrics();
    if (announce) {
      setSpeech('Tamirhaneye döndük Usta Aren! Şimdi neyi tamir edelim?', true, true);
    }
  }

  // Test Sürüşü Engelleri (Saf Vektör Beyaz Sticker Çerçeveli)
  function createObstacleSVG(type) {
    if (type === 'cone') {
      return `
        <svg viewBox="0 0 84 84" class="svg-icon">
          <g stroke="#ffffff" stroke-width="6" stroke-linejoin="round">
            <polygon points="42,10 68,72 16,72" fill="#ffffff"/>
            <rect x="10" y="68" width="64" height="10" rx="4" fill="#ffffff"/>
          </g>
          <polygon points="42,10 68,72 16,72" fill="#ff7b00"/>
          <polygon points="33,30 51,30 56,42 28,42" fill="#ffffff"/>
          <polygon points="25,50 59,50 63,60 21,60" fill="#ffffff"/>
          <rect x="10" y="68" width="64" height="10" rx="4" fill="#e05300"/>
        </svg>
      `;
    }
    if (type === 'starRing') {
      return window.SVG_ICONS.star;
    }
    return `
      <svg viewBox="0 0 84 84" class="svg-icon">
        <rect x="10" y="12" width="64" height="64" rx="8" fill="#ffffff"/>
        <rect x="14" y="16" width="56" height="56" rx="5" fill="#d97706"/>
        <rect x="20" y="22" width="44" height="44" fill="#f59e0b"/>
        <line x1="20" y1="22" x2="64" y2="66" stroke="#b45309" stroke-width="6"/>
        <line x1="64" y1="22" x2="20" y2="66" stroke="#b45309" stroke-width="6"/>
      </svg>
    `;
  }

  let obstacles = [];

  function startTestDrive() {
    isTestDrive = true;
    testDriveStage.hidden = false;
    subPaletteBar.hidden = true;
    if (toolbeltDock) toolbeltDock.hidden = true;

    const st = vehicleStates[currentVehicleId];
    window.updateVehicleInPlace(drivingVehicle, currentVehicleId, st, true);
    cacheDriveRefs();
    refreshLayoutMetrics();

    obstaclesContainer.innerHTML = '';
    obstacles = [];
    drivePhysics.y = 0;
    drivePhysics.vy = 0;
    drivePhysics.rot = 0;
    drivePhysics.turboTimer = 0;

    window.arenAudio.playVictory();
    setSpeech('Test sürüşü başladı Usta Aren! Kutuları devirmek için ekrana dokun veya Zıpla düğmesine bas!', true, true);
  }

  function stopTestDrive(announce = true) {
    isTestDrive = false;
    testDriveStage.hidden = true;
    if (toolbeltDock) toolbeltDock.hidden = false;
    obstaclesContainer.innerHTML = '';
    obstacles = [];
    mountOrUpdateVehicle(true);
    renderSubPalette();
    refreshLayoutMetrics();
    if (announce) {
      setSpeech('Tamirhaneye döndük Usta Aren! Şimdi neyi tamir edelim?', true, true);
    }
  }

  function triggerDriveJump() {
    if (!isTestDrive) return;
    if (drivePhysics.y > -20) {
      drivePhysics.vy = -16.5;
    }
    drivePhysics.turboTimer = 42;
    window.arenAudio.playWacky();
    spawnVectorParticles(layoutMetrics.carLeft + 40, layoutMetrics.carBottom - 30, 'wacky', 16);
    addStars(1);
  }

  testDriveBtn.addEventListener('click', () => {
    const cfg = window.VEHICLE_CATALOG[currentVehicleId];
    if (cfg && cfg.isAppliance) {
      if (isAppliancePlay) stopAppliancePlay(true);
      else startAppliancePlay();
      return;
    }
    if (isTestDrive) stopTestDrive(true);
    else startTestDrive();
  });

  appStartWashBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerApplianceWashCycle();
  });

  appResetItemsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resetApplianceItems();
  });

  appBackGarageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    stopAppliancePlay(true);
  });

  driveHornBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.arenAudio.playHorn();
    spawnVectorParticles(layoutMetrics.carRight - 20, layoutMetrics.carTop + 40, 'wash', 16);
    setSpeech('Düt düüüt! Yolu açın Usta Aren hızla geliyor!', true, false);
  });

  driveJumpBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerDriveJump();
    setSpeech('Süper Turbo Zıplama! Harikasın Aren Usta!', true, false);
  });

  roadTrack.addEventListener('pointerdown', () => {
    triggerDriveJump();
  });

  backGarageBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    stopTestDrive();
  });

  soundToggleBtn.addEventListener('click', () => {
    const active = window.arenAudio.toggleMute();
    soundToggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    soundIconSlot.innerHTML = active ? window.SVG_ICONS.soundOn : window.SVG_ICONS.soundOff;
  });

  // iPadOS / iOS Safari İçin User Activation'ı Bozmazken Çift Dokunma ve Çimdikleme Zoom'unu Engelleyen Korumalar
  document.addEventListener('dblclick', (e) => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('gesturechange', (e) => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('gestureend', (e) => {
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  window.addEventListener('keydown', (event) => {
    if (welcomeDialog.open) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        startGameBtn.click();
      }
      return;
    }
    if (isTestDrive) {
      if (event.key === 'Escape') stopTestDrive();
      else triggerDriveJump();
      return;
    }
    const rx = layoutMetrics.stageLeft + layoutMetrics.stageWidth * (0.35 + Math.random() * 0.3);
    const ry = layoutMetrics.stageTop + layoutMetrics.stageHeight * (0.35 + Math.random() * 0.3);
    const hitEl = document.elementFromPoint(rx, ry);
    applyToolAtPoint(currentTool, hitEl, rx, ry);
  });

  // Ana 60FPS Oyun Döngüsü (Sıfır Layout Thrashing, Boştayken Sıfır DOM/Canvas İşlemi)
  function mainLoop() {
    if (isAppliancePlay) {
      const appId = currentVehicleId === 'dishwasher' ? 'dishwasher' : 'washer';
      const pState = appliancePlayState[appId];
      if (pState.isWashing) {
        pState.spinAngle = (pState.spinAngle + 14) % 360;
        const rotStr = `rotate(${pState.spinAngle.toFixed(1)})`;
        for (let i = 0; i < appSpinNodes.length; i++) {
          appSpinNodes[i].setAttribute('transform', rotStr);
        }
        if (pState.washTimer % 28 === 0) {
          spawnVectorParticles(
            layoutMetrics.vw * (0.48 + (Math.random() - 0.5) * 0.18),
            layoutMetrics.vh * (0.48 + (Math.random() - 0.5) * 0.18),
            'wash',
            10
          );
        }
        pState.washTimer -= 1;
        if (pState.washTimer <= 0) {
          pState.isWashing = false;
          pState.isClean = true;
          addStars(5);
          window.arenAudio.playVictory();
          spawnVectorParticles(layoutMetrics.vw * 0.55, layoutMetrics.vh * 0.48, 'paint', 24);
          syncAppliancePlayDOM();
          const doneMsg = appId === 'washer'
            ? 'Yaşasın! Bütün çamaşırlar bembeyaz ve mis kokulu yıkandı, harikasın Usta Aren!'
            : 'Yaşasın! Bütün tabaklar ve bardaklar gıcır gıcır tertemiz oldu, aferin Usta Aren!';
          setSpeech(doneMsg, true, true);
        }
      }
    } else if (!isTestDrive) {
      if (rigPhysics.awake) {
        const springForceY = -0.18 * rigPhysics.y;
        rigPhysics.vy = (rigPhysics.vy + springForceY) * 0.82;
        rigPhysics.y += rigPhysics.vy;

        const springForceRot = -0.18 * rigPhysics.rot;
        rigPhysics.vrot = (rigPhysics.vrot + springForceRot) * 0.82;
        rigPhysics.rot += rigPhysics.vrot;

        rigPhysics.wheelVel *= 0.91;
        rigPhysics.wheelAngle = (rigPhysics.wheelAngle + rigPhysics.wheelVel) % 360;

        if (
          Math.abs(rigPhysics.y) > 0.05 ||
          Math.abs(rigPhysics.vy) > 0.05 ||
          Math.abs(rigPhysics.rot) > 0.05 ||
          Math.abs(rigPhysics.vrot) > 0.05 ||
          Math.abs(rigPhysics.wheelVel) > 0.08
        ) {
          applyWorkshopRigTransforms();
        } else {
          rigPhysics.y = 0;
          rigPhysics.vy = 0;
          rigPhysics.rot = 0;
          rigPhysics.vrot = 0;
          rigPhysics.wheelVel = 0;
          rigPhysics.awake = false;
          applyWorkshopRigTransforms();
        }
      }
    } else {
      // Test Sürüşü 60FPS Fizik (Önbelleklenmiş Referanslar ve Saf Matematiksel Çarpışma)
      drivePhysics.vy += 0.68;
      drivePhysics.y += drivePhysics.vy;
      if (drivePhysics.y >= 0) {
        drivePhysics.y = 0;
        drivePhysics.vy = 0;
      }

      const speed = drivePhysics.turboTimer > 0 ? 11.5 : 7.5;
      if (drivePhysics.turboTimer > 0) drivePhysics.turboTimer -= 1;

      drivePhysics.rot = drivePhysics.y < 0 ? Math.max(-13, drivePhysics.vy * 0.85) : Math.sin(performance.now() * 0.02) * 1.1;
      drivePhysics.wheelAngle = (drivePhysics.wheelAngle + speed * 1.65) % 360;

      if (driveRefs.airborneGroup) {
        const svgJumpY = drivePhysics.y * 1.45;
        driveRefs.airborneGroup.setAttribute(
          'transform',
          `translate(0, ${svgJumpY.toFixed(1)}) rotate(${drivePhysics.rot.toFixed(1)} 345 220)`
        );
      }
      if (driveRefs.groundShadow) {
        const heightRatio = Math.max(0.38, 1 + drivePhysics.y * 0.0042);
        driveRefs.groundShadow.setAttribute('rx', (225 * heightRatio).toFixed(1));
        driveRefs.groundShadow.setAttribute('opacity', (0.24 * heightRatio).toFixed(2));
      }

      const wheelRotStr = `rotate(${drivePhysics.wheelAngle.toFixed(1)})`;
      for (let i = 0; i < driveRefs.wheels.length; i++) {
        driveRefs.wheels[i].setAttribute('transform', wheelRotStr);
      }

      // Yeni Engel Üretimi
      drivePhysics.spawnTimer += 1;
      if (drivePhysics.spawnTimer > 92) {
        drivePhysics.spawnTimer = 0;
        const types = ['crate', 'cone', 'starRing'];
        const type = types[Math.floor(Math.random() * types.length)];
        const obsEl = document.createElement('div');
        obsEl.className = 'road-obstacle';
        obsEl.innerHTML = createObstacleSVG(type);
        const startX = layoutMetrics.vw + 60;
        obsEl.style.transform = `translate3d(${startX}px, 0, 0)`;
        obstaclesContainer.appendChild(obsEl);
        obstacles.push({ el: obsEl, x: startX, type, hit: false });
      }

      // Saf Matematiksel Çarpışma (mainLoop İçinde getBoundingClientRect Yok!)
      const hitLeft = layoutMetrics.carLeft + 35;
      const hitRight = layoutMetrics.carRight - 35;
      const isLowEnoughToHit = drivePhysics.y > -62;

      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= speed;

        if (
          !obs.hit &&
          isLowEnoughToHit &&
          obs.x < hitRight &&
          obs.x + 84 > hitLeft
        ) {
          obs.hit = true;
          window.arenAudio.playSmash();
          addStars(2);
          spawnVectorParticles(obs.x + 42, layoutMetrics.carBottom - 36, 'crate', 20);
          obs.el.remove();
          obstacles.splice(i, 1);
          continue;
        }

        if (obs.x < -120) {
          obs.el.remove();
          obstacles.splice(i, 1);
          continue;
        }

        obs.el.style.transform = `translate3d(${obs.x.toFixed(1)}px, 0, 0)`;
      }
    }

    // Vektör Parçacık Çizimi (Sadece aktif parçacık varken çalışır)
    if (particles.length > 0 || shockwaves.length > 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasDirty = true;

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.r += 4.5;
        sw.alpha -= 0.048;
        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = sw.alpha;
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rot += p.vrot;
        p.life -= p.decay;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;

        if (p.shape === 'twinkle') {
          drawFourPointSparkle(ctx, p.size * 1.3);
        } else if (p.shape === 'star') {
          drawStarShape(ctx, p.size * 1.15);
        } else if (p.shape === 'bubble') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(202, 240, 248, 0.65)';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();
        } else if (p.shape === 'plank') {
          ctx.fillRect(-p.size * 1.3, -p.size * 0.45, p.size * 2.6, p.size * 0.9);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    } else if (canvasDirty) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvasDirty = false;
    }

    requestAnimationFrame(mainLoop);
  }

  mountStaticSVGIcons();
  mountOrUpdateVehicle(true);
  refreshLayoutMetrics();
  welcomeDialog.showModal();
  requestAnimationFrame(mainLoop);

  startGameBtn.addEventListener('click', () => {
    if (!welcomeDialog.open) return;
    welcomeDialog.close();
    refreshLayoutMetrics();
    window.arenAudio.ensureContext();
    window.arenAudio.playVictory();
    impulseVehicle(16, -4, 24);
    spawnVectorParticles(layoutMetrics.stageCenterX, layoutMetrics.stageCenterY, 'drill', 22);
    setSpeech('Merhaba Usta Aren! Çılgın Tamirhaneye hoş geldin! Hadi tamire başlayalım!', true, true);
  });
})();
