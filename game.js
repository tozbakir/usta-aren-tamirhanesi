// Usta Aren'in Çılgın Tamirhanesi - 60FPS Stüdyo Fizik ve Etkileşim Motoru

(() => {
  let currentVehicleId = 'tractor';
  let currentTool = 'drill';
  let stars = 0;
  let isTestDrive = false;

  const vehicleStates = {
    tractor: window.createInitialVehicleState('tractor'),
    excavator: window.createInitialVehicleState('excavator'),
    firetruck: window.createInitialVehicleState('firetruck'),
    monster: window.createInitialVehicleState('monster')
  };

  // Atölye Süspansiyon Yay Fiziği (60FPS)
  const rigPhysics = {
    y: 0,
    vy: 0,
    rot: 0,
    vrot: 0,
    wheelAngle: 0,
    wheelVel: 0
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
      'Vıııınn! Taşlama makinesi pasları parlatıyor, vidaları sıkıyor Usta Aren!',
      'Kıvılcımlar çıkıyor! Harikasın Aren Usta!',
      'Bütün vidalar ve metal kasalar pırıl pırıl oldu Aren!'
    ],
    wrench: [
      'Fıss fıss! Yeşil hava pompası patlak lastiği şişirdi Usta Aren!',
      'Tekerlek taş gibi sağlam oldu, aferin Aren Usta!',
      'Basınç tamam! Kamyon yola çıkmaya hazır Aren!'
    ],
    paint: [
      'Fırçayla boyuyoruz! Bu parlak renk çok yakıştı Usta Aren!',
      'Gri astar boyandı, kamyon yepyeni oldu Aren Usta!',
      'Süper tasarım! Burada kuralları Aren Usta koyar!'
    ],
    hammer: [
      'Tak tak tak! Ne güçlü bir çekiç Usta Aren!',
      'Güm! Yamuk yerler dümdüz oldu, süspansiyon zıpladı!',
      'Süper çekiç darbesi Aren Usta!'
    ],
    wacky: [
      'Hahaha! Çörek tekerlek mi taktın Usta Aren?!',
      'Çılgın modifiye! Süper parçalar takıldı Aren!',
      'Burası Aren’in tamirhanesi, burada kuralları Aren koyar!'
    ],
    wash: [
      'Düt düüüt! Köpüklerle tertemiz oldu Usta Aren!',
      'Bütün çamurlar yıkandı, yıldız gibi parlıyor Aren!',
      'Havalı korna çalıyor! Yolu açın Usta Aren geliyor!'
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
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundIconSlot = document.getElementById('sound-icon-slot');
  const floatingTool = document.getElementById('floating-tool');
  const srAnnouncer = document.getElementById('sr-announcer');

  const chipBolts = document.getElementById('chip-bolts');
  const chipDents = document.getElementById('chip-dents');
  const chipMud = document.getElementById('chip-mud');

  const testDriveStage = document.getElementById('test-drive-stage');
  const drivingVehicle = document.getElementById('driving-vehicle');
  const obstaclesContainer = document.getElementById('obstacles-container');
  const roadTrack = document.getElementById('road-track');
  const driveHornBtn = document.getElementById('drive-horn-btn');
  const driveJumpBtn = document.getElementById('drive-jump-btn');
  const backGarageBtn = document.getElementById('back-garage-btn');

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

  // 60FPS Vektör Parçacık Motoru
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d');
  const particles = [];
  const shockwaves = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

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
    c.lineWidth = 2;
    c.strokeStyle = '#ffffff';
    c.stroke();
  }

  function spawnVectorParticles(x, y, toolId, count = 22) {
    shockwaves.push({ x, y, r: 8, alpha: 0.85, color: '#ffffff' });

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

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 9.5;
      let shape = 'spark';
      if (toolId === 'wash') shape = 'bubble';
      else if (toolId === 'paint') shape = i % 2 === 0 ? 'twinkle' : 'spark';
      else if (toolId === 'crate') shape = i % 2 === 0 ? 'plank' : 'star';
      else if (i % 3 === 0) shape = 'twinkle';

      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (toolId === 'wash' ? 2.5 : 3.2),
        gravity: toolId === 'wash' ? -0.05 : 0.26,
        life: 1,
        decay: 0.018 + Math.random() * 0.014,
        size: 7 + Math.random() * 9,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.22,
        shape,
        color: palette[i % palette.length]
      });
    }
  }

  function setSpeech(message, speakAloud = true, forceVoice = false) {
    speechText.textContent = message;
    srAnnouncer.textContent = message;
    speechBubble.classList.remove('pop');
    void speechBubble.offsetWidth;
    speechBubble.classList.add('pop');
    if (speakAloud) {
      window.arenAudio.speak(message, forceVoice);
    }
  }

  function addStars(amount = 1) {
    stars += amount;
    starCountEl.textContent = String(stars);
  }

  function updateRepairStatusChips() {
    const st = vehicleStates[currentVehicleId];
    const boltsAndTiresFixed = !st.boltsLoose.some(Boolean) && !st.wheelsBroken.some(Boolean);
    const bodyAndPaintFixed = !st.primerUnpainted && !st.roofDent && !st.engineDent;
    const mudClean = st.mudLevels.every((m) => m <= 0.05);

    chipBolts.classList.toggle('fixed', boltsAndTiresFixed);
    chipDents.classList.toggle('fixed', bodyAndPaintFixed);
    chipMud.classList.toggle('fixed', mudClean);
  }

  function mountOrUpdateVehicle() {
    const st = vehicleStates[currentVehicleId];
    vehicleStage.innerHTML = window.buildCompleteVehicleSVG(currentVehicleId, st, false);
    applyWorkshopRigTransforms();
    updateRepairStatusChips();
    if (!subPaletteBar.hidden) {
      renderSubPalette();
    }
  }

  function applyWorkshopRigTransforms() {
    const chassis = vehicleStage.querySelector('#chassis-rig');
    if (chassis) {
      chassis.setAttribute(
        'transform',
        `translate(0, ${rigPhysics.y.toFixed(2)}) rotate(${rigPhysics.rot.toFixed(2)} 345 210)`
      );
    }
    // Gölge yerde sabit kalır, şasi yaylandıkça gölge genişliği hafifçe tepki verir
    const shadow = vehicleStage.querySelector('#vehicle-ground-shadow');
    if (shadow) {
      const scale = Math.max(0.75, Math.min(1.12, 1 + rigPhysics.y * 0.004));
      shadow.setAttribute('rx', (235 * scale).toFixed(1));
    }

    const wheelNodes = vehicleStage.querySelectorAll('.wheel-spin-node');
    const st = vehicleStates[currentVehicleId];
    wheelNodes.forEach((node, idx) => {
      if (!st.wheelsBroken[idx]) {
        node.setAttribute('transform', `rotate(${rigPhysics.wheelAngle.toFixed(1)})`);
      }
    });
  }

  function impulseVehicle(vy = 12, vrot = 4, wheelSpin = 0) {
    rigPhysics.vy += vy;
    rigPhysics.vrot += vrot;
    rigPhysics.wheelVel += wheelSpin;
  }

  let hideToolTimeout = null;
  function showFloatingToolAt(clientX, clientY, strike = true) {
    floatingTool.innerHTML = window.SVG_ICONS[currentTool] || window.SVG_ICONS.drill;
    floatingTool.hidden = false;
    const size = 108;
    const left = Math.max(0, Math.min(clientX - size * 0.42, window.innerWidth - size));
    const top = Math.max(0, Math.min(clientY - size * 0.52, window.innerHeight - size));
    floatingTool.style.left = `${left}px`;
    floatingTool.style.top = `${top}px`;

    if (strike) {
      floatingTool.classList.remove('tool-active-swing');
      void floatingTool.offsetWidth;
      floatingTool.classList.add('tool-active-swing');
    }

    if (hideToolTimeout) clearTimeout(hideToolTimeout);
    hideToolTimeout = setTimeout(() => {
      if (!isDraggingTool) {
        floatingTool.hidden = true;
      }
    }, 680);
  }

  let actionCounter = 0;

  function applyToolAtPoint(toolId, targetEl, clientX, clientY) {
    const st = vehicleStates[currentVehicleId];
    actionCounter += 1;
    addStars(1);

    const partEl = targetEl && targetEl.closest ? targetEl.closest('.interactive-part') : null;
    const partType = partEl ? partEl.dataset.part : 'body';
    if (partEl && partEl.dataset.sceneTool) {
      toolId = partEl.dataset.sceneTool;
      selectTool(toolId);
    }

    showFloatingToolAt(clientX, clientY, true);

    if (partType === 'arm' || currentVehicleId === 'excavator') {
      st.bucketAngle = st.bucketAngle === 0 ? -18 : st.bucketAngle === -18 ? 12 : 0;
    }

    if (toolId === 'drill') {
      // Taşlama & Matkap: Referans görseldeki gibi pas/çamuru kazır VE gevşek vidaları sıkar!
      window.arenAudio.playDrill();
      impulseVehicle(5, (Math.random() - 0.5) * 3, 24);

      if (partType === 'mud') {
        const mIdx = Number(partEl.dataset.mudIndex);
        st.mudLevels[mIdx] = 0;
      } else if (partType === 'bolt') {
        const bIdx = Number(partEl.dataset.boltIndex);
        st.boltsLoose[bIdx] = false;
      } else {
        const dirtyIdx = st.mudLevels.findIndex((m) => m > 0.05);
        if (dirtyIdx !== -1) {
          st.mudLevels[dirtyIdx] = Math.max(0, st.mudLevels[dirtyIdx] - 0.6);
        }
        const looseIdx = st.boltsLoose.findIndex(Boolean);
        if (looseIdx !== -1) {
          st.boltsLoose[looseIdx] = false;
        }
      }
      spawnVectorParticles(clientX, clientY, 'drill', 26);
    } else if (toolId === 'wrench') {
      // Yeşil Hava Pompası: Referans görseldeki patlak lastiği şişirir, dalı çıkarır!
      window.arenAudio.playWrench();
      impulseVehicle(14, -4, 22);

      st.wheelsBroken = [false, false];
      const looseIdx = st.boltsLoose.findIndex(Boolean);
      if (looseIdx !== -1) st.boltsLoose[looseIdx] = false;
      spawnVectorParticles(clientX, clientY, 'wrench', 24);
    } else if (toolId === 'paint') {
      // Boya Fırçası: Referans görseldeki gibi gri astarlı damper kasasını boyar ve renk/çıkartma ekler!
      window.arenAudio.playPaint();
      impulseVehicle(7, -2, 8);

      if (st.primerUnpainted) {
        st.primerUnpainted = false;
      } else {
        st.colorIndex = (st.colorIndex + 1) % window.PAINT_PALETTE.length;
      }
      st.mudLevels = st.mudLevels.map((m) => Math.max(0, m - 0.55));
      spawnVectorParticles(clientX, clientY, 'paint', 26);
    } else if (toolId === 'hammer') {
      window.arenAudio.playHammer();
      impulseVehicle(18, (Math.random() - 0.5) * 8, 10);

      st.roofDent = false;
      st.engineDent = false;
      st.boltsLoose = [false, false, false, false];
      spawnVectorParticles(clientX, clientY, 'hammer', 24);
    } else if (toolId === 'wacky') {
      window.arenAudio.playWacky();
      impulseVehicle(15, -5, 26);

      st.wheelsBroken = [false, false];
      st.roofDent = false;
      if (partType === 'roof') {
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
      spawnVectorParticles(clientX, clientY, 'wacky', 28);
    } else if (toolId === 'wash') {
      window.arenAudio.playHorn();
      impulseVehicle(6, 2, 12);

      if (partType === 'mud') {
        const mIdx = Number(partEl.dataset.mudIndex);
        st.mudLevels[mIdx] = 0;
      } else {
        st.mudLevels = st.mudLevels.map((m) => Math.max(0, m - 0.6));
      }
      spawnVectorParticles(clientX, clientY, 'wash', 26);
    }

    mountOrUpdateVehicle();

    const phrases = TOOL_PHRASES[toolId] || TOOL_PHRASES.drill;
    setSpeech(phrases[actionCounter % phrases.length], true, false);
  }

  function renderSubPalette() {
    const st = vehicleStates[currentVehicleId];

    if (currentTool === 'paint') {
      subPaletteBar.hidden = false;
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
          st.colorIndex = Number(btn.dataset.paintIdx);
          st.primerUnpainted = false;
          window.arenAudio.playPaint();
          impulseVehicle(8, 0, 10);
          mountOrUpdateVehicle();
        });
      });

      subPaletteBar.querySelectorAll('[data-decal-key]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const key = btn.dataset.decalKey;
          if (st.decals.length >= 3) st.decals.shift();
          st.decals.push(key);
          window.arenAudio.playPaint();
          impulseVehicle(9, -3, 0);
          mountOrUpdateVehicle();
        });
      });
      return;
    }

    if (currentTool === 'wacky') {
      subPaletteBar.hidden = false;
      const wheelNames = {
        normal: 'İş Lastiği',
        donut: 'Çörek Teker',
        monster: 'Canavar Teker',
        hover: 'Uçan Jet',
        gear: 'Altın Dişli'
      };
      const roofNames = {
        normal: 'Projektör',
        rocket: 'Süper Roket',
        dino: 'T-Rex Dino',
        rotor: 'Pervane',
        siren: 'Çakar Siren'
      };

      const wBtns = window.WHEEL_TYPES.map((w) => `
        <button type="button" class="mod-chip-btn" data-wheel-type="${w}" aria-pressed="${st.wheelType === w}">
          ${wheelNames[w]}
        </button>
      `).join('');

      const rBtns = window.ROOF_TYPES.map((r) => `
        <button type="button" class="mod-chip-btn" data-roof-type="${r}" aria-pressed="${st.roofType === r}">
          ${roofNames[r]}
        </button>
      `).join('');

      subPaletteBar.innerHTML = wBtns + rBtns;

      subPaletteBar.querySelectorAll('[data-wheel-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          st.wheelType = btn.dataset.wheelType;
          st.wheelsBroken = [false, false];
          window.arenAudio.playWacky();
          impulseVehicle(14, -4, 25);
          mountOrUpdateVehicle();
        });
      });

      subPaletteBar.querySelectorAll('[data-roof-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          st.roofType = btn.dataset.roofType;
          st.roofDent = false;
          window.arenAudio.playWacky();
          impulseVehicle(12, 4, 10);
          mountOrUpdateVehicle();
        });
      });
      return;
    }

    subPaletteBar.hidden = true;
  }

  // Alet Seçimi ve Pointer Capture ile Sürükleme
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
        if (now - lastDragApplyTime > 290) {
          const hitEl = document.elementFromPoint(event.clientX, event.clientY);
          if (hitEl && vehicleStage.contains(hitEl)) {
            lastDragApplyTime = now;
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
    if (now - lastStageTick > 260) {
      lastStageTick = now;
      applyToolAtPoint(currentTool, event.target, event.clientX, event.clientY);
    }
  });

  window.addEventListener('pointerup', () => {
    stagePointerActive = false;
  });

  // Araç Sekmesi Değiştirme
  const vehicleTabs = document.querySelectorAll('.vehicle-tab');
  vehicleTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.vehicle;
      if (targetId === currentVehicleId && !isTestDrive) return;

      if (isTestDrive) stopTestDrive();

      vehicleTabs.forEach((t) => {
        t.setAttribute('aria-pressed', t.dataset.vehicle === targetId ? 'true' : 'false');
      });

      garageDoor.classList.add('closed');
      window.arenAudio.playHammer();

      setTimeout(() => {
        currentVehicleId = targetId;
        mountOrUpdateVehicle();
        impulseVehicle(14, -3, 18);
        garageDoor.classList.remove('closed');
        setSpeech(window.VEHICLE_CATALOG[targetId].welcomeVoice, true, true);
      }, 360);
    });
  });

  // Afacan Modu ("Kirlet / Boz!")
  mischiefBtn.addEventListener('click', () => {
    if (isTestDrive) stopTestDrive();
    const st = vehicleStates[currentVehicleId];
    st.boltsLoose = [true, true, true, true];
    st.wheelsBroken = [true, false];
    st.primerUnpainted = true;
    st.roofDent = true;
    st.engineDent = true;
    st.mudLevels = [1, 1, 1];

    window.arenAudio.playMischief();
    impulseVehicle(20, -8, -15);
    mountOrUpdateVehicle();

    const rect = vehicleStage.getBoundingClientRect();
    spawnVectorParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'drill', 30);
    setSpeech('Hahaha! Afacan Aren kamyonu çamura buladı ve lastiğini patlattı! Hadi baştan tamir edelim!', true, true);
  });

  // Test Sürüşü Engelleri (Beyaz Sticker Çerçeveli Stüdyo Vektör)
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

    const st = vehicleStates[currentVehicleId];
    // isDriving = true ile çağrıldığında patlak tekerlek ve uyarı halkaları gizlenir, gölge ayrılır!
    drivingVehicle.innerHTML = window.buildCompleteVehicleSVG(currentVehicleId, st, true);
    obstaclesContainer.innerHTML = '';
    obstacles = [];
    drivePhysics.y = 0;
    drivePhysics.vy = 0;
    drivePhysics.rot = 0;
    drivePhysics.turboTimer = 0;

    window.arenAudio.playVictory();
    setSpeech('Test sürüşü başladı Usta Aren! Kutuları devirmek için ekrana dokun veya Zıpla düğmesine bas!', true, true);
  }

  function stopTestDrive() {
    isTestDrive = false;
    testDriveStage.hidden = true;
    obstaclesContainer.innerHTML = '';
    obstacles = [];
    mountOrUpdateVehicle();
    renderSubPalette();
    setSpeech('Tamirhaneye döndük Usta Aren! Şimdi hangi aracı tamir edelim?', true, true);
  }

  function triggerDriveJump() {
    if (!isTestDrive) return;
    if (drivePhysics.y > -20) {
      drivePhysics.vy = -16.5;
    }
    drivePhysics.turboTimer = 42;
    window.arenAudio.playWacky();
    const rect = drivingVehicle.getBoundingClientRect();
    spawnVectorParticles(rect.left + 40, rect.bottom - 30, 'wacky', 18);
    addStars(1);
  }

  testDriveBtn.addEventListener('click', () => {
    if (isTestDrive) stopTestDrive();
    else startTestDrive();
  });

  driveHornBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.arenAudio.playHorn();
    const rect = drivingVehicle.getBoundingClientRect();
    spawnVectorParticles(rect.right - 20, rect.top + 40, 'wash', 20);
    setSpeech('DÜÜÜT DÜÜÜT! Yolu açın Usta Aren hızla geliyor!', true, false);
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
    const rect = vehicleStage.getBoundingClientRect();
    const rx = rect.left + rect.width * (0.35 + Math.random() * 0.3);
    const ry = rect.top + rect.height * (0.35 + Math.random() * 0.3);
    const hitEl = document.elementFromPoint(rx, ry);
    applyToolAtPoint(currentTool, hitEl, rx, ry);
  });

  // Ana 60FPS Oyun Döngüsü
  function mainLoop() {
    if (!isTestDrive) {
      const springForceY = -0.18 * rigPhysics.y;
      rigPhysics.vy = (rigPhysics.vy + springForceY) * 0.82;
      rigPhysics.y += rigPhysics.vy;

      const springForceRot = -0.18 * rigPhysics.rot;
      rigPhysics.vrot = (rigPhysics.vrot + springForceRot) * 0.82;
      rigPhysics.rot += rigPhysics.vrot;

      rigPhysics.wheelVel *= 0.92;
      rigPhysics.wheelAngle = (rigPhysics.wheelAngle + rigPhysics.wheelVel) % 360;

      if (
        Math.abs(rigPhysics.y) > 0.05 ||
        Math.abs(rigPhysics.rot) > 0.05 ||
        Math.abs(rigPhysics.wheelVel) > 0.1
      ) {
        applyWorkshopRigTransforms();
      }
    } else {
      // Test Sürüşü 60FPS Fizik
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

      // KRİTİK BUG ÇÖZÜMÜ: Zıplama dönüşümü SADECE #vehicle-airborne-group'a uygulanır!
      // #vehicle-ground-shadow ise yerde sabit kalır ve araba yükseldikçe gerçekçi biçimde küçülür!
      const airborneGroup = drivingVehicle.querySelector('#vehicle-airborne-group');
      const groundShadow = drivingVehicle.querySelector('#vehicle-ground-shadow');
      if (airborneGroup) {
        const svgJumpY = drivePhysics.y * 1.45;
        airborneGroup.setAttribute(
          'transform',
          `translate(0, ${svgJumpY.toFixed(1)}) rotate(${drivePhysics.rot.toFixed(1)} 345 220)`
        );
      }
      if (groundShadow) {
        const heightRatio = Math.max(0.38, 1 + drivePhysics.y * 0.0042);
        groundShadow.setAttribute('rx', (235 * heightRatio).toFixed(1));
        groundShadow.setAttribute('opacity', (0.26 * heightRatio).toFixed(2));
      }

      drivingVehicle.querySelectorAll('.wheel-spin-node').forEach((w) => {
        w.setAttribute('transform', `rotate(${drivePhysics.wheelAngle.toFixed(1)})`);
      });

      // Yeni Engel Üretimi
      drivePhysics.spawnTimer += 1;
      if (drivePhysics.spawnTimer > 92) {
        drivePhysics.spawnTimer = 0;
        const types = ['crate', 'cone', 'starRing'];
        const type = types[Math.floor(Math.random() * types.length)];
        const obsEl = document.createElement('div');
        obsEl.className = 'road-obstacle';
        obsEl.innerHTML = createObstacleSVG(type);
        const startX = window.innerWidth + 60;
        obsEl.style.transform = `translateX(${startX}px)`;
        obstaclesContainer.appendChild(obsEl);
        obstacles.push({ el: obsEl, x: startX, type, hit: false });
      }

      const carRect = drivingVehicle.getBoundingClientRect();
      // Çarpışma kutusunu zıplama yüksekliğine göre hesapla
      const effectiveCarBottom = carRect.bottom + drivePhysics.y;
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.x -= speed;
        obs.el.style.transform = `translateX(${obs.x.toFixed(1)}px)`;

        const obsRect = obs.el.getBoundingClientRect();
        if (
          !obs.hit &&
          obsRect.left < carRect.right - 35 &&
          obsRect.right > carRect.left + 35 &&
          effectiveCarBottom > obsRect.top + 15
        ) {
          obs.hit = true;
          window.arenAudio.playSmash();
          addStars(2);
          spawnVectorParticles(obsRect.left + 40, obsRect.top + 40, 'crate', 26);
          obs.el.remove();
          obstacles.splice(i, 1);
          continue;
        }

        if (obs.x < -120) {
          obs.el.remove();
          obstacles.splice(i, 1);
        }
      }
    }

    // Vektör Parçacık Çizimi
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.r += 4.5;
      sw.alpha -= 0.045;
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
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.strokeRect(-p.size * 1.3, -p.size * 0.45, p.size * 2.6, p.size * 0.9);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(mainLoop);
  }

  mountStaticSVGIcons();
  mountOrUpdateVehicle();
  welcomeDialog.showModal();
  requestAnimationFrame(mainLoop);

  startGameBtn.addEventListener('click', () => {
    welcomeDialog.close();
    window.arenAudio.ensureContext();
    window.arenAudio.playVictory();
    impulseVehicle(16, -4, 24);
    const rect = vehicleStage.getBoundingClientRect();
    spawnVectorParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 'drill', 28);
    setSpeech('Merhaba Usta Aren! Çılgın Tamirhaneye hoş geldin! Hadi Dev Kamyonu tamir edelim!', true, true);
  });
})();
