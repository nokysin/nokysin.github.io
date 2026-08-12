'use strict';

(function () {

  /**
   * Кути рахуються за годинниковою стрілкою від верхньої точки кола.
   * Стрілочка стоїть праворуч, тобто вказує на кут 90°.
   */

  var MOTO = { emoji: '🏍️', event: 'Тріп на Ендуро' };
  var CLIMBER = { emoji: '🧗', event: 'Мотузковий парк' };

  var SECTORS = [MOTO, CLIMBER, MOTO, MOTO, CLIMBER, MOTO, CLIMBER, CLIMBER, MOTO, CLIMBER];

  var COUNT = SECTORS.length;
  var STEP = 360 / COUNT;
  var POINTER_ANGLE = 90;
  var SPIN_MS = 7000;
  var POPUP_DELAY_MS = 2000 / 3;

  var CONFETTI_COUNT = 140;
  var CONFETTI_COLORS = ['#ff8fc0', '#e0417f', '#ffffff', '#ffd166', '#ff5fa2'];
  var CONFETTI_LIFE_MS = 2600;

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var CX = 150;
  var CY = 150;
  var R = 148;

  var wheel = document.getElementById('wheel');
  var spinBtn = document.getElementById('spinBtn');
  var statusEl = document.getElementById('status');
  var overlay = document.getElementById('overlay');
  var popupText = document.getElementById('popupText');
  var popupEmoji = document.getElementById('popupEmoji');
  var againBtn = document.getElementById('againBtn');
  var popup = document.querySelector('.popup');
  var confettiCanvas = document.getElementById('confetti');

  var rotation = 0;
  var spinning = false;

  function pointOnCircle(angleDeg, radius) {
    var rad = (angleDeg - 90) * Math.PI / 180;
    return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
  }

  function buildWheel() {
    var i;
    for (i = 0; i < COUNT; i++) {
      var from = i * STEP;
      var to = from + STEP;
      var start = pointOnCircle(from, R);
      var end = pointOnCircle(to, R);

      var path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', [
        'M', CX, CY,
        'L', start.x.toFixed(2), start.y.toFixed(2),
        'A', R, R, 0, 0, 1, end.x.toFixed(2), end.y.toFixed(2),
        'Z'
      ].join(' '));
      // Кольори чергуються: парні сектори — білі, непарні — рожеві.
      path.setAttribute('fill', i % 2 === 0 ? '#ffffff' : '#ff8fc0');
      path.setAttribute('stroke', 'rgba(224, 65, 127, 0.45)');
      path.setAttribute('stroke-width', '1');
      wheel.appendChild(path);

      var mid = from + STEP / 2;
      var labelPos = pointOnCircle(mid, R * 0.68);
      var text = document.createElementNS(SVG_NS, 'text');
      text.setAttribute('x', labelPos.x.toFixed(2));
      text.setAttribute('y', labelPos.y.toFixed(2));
      text.setAttribute('font-size', '30');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('transform', 'rotate(' + mid + ' ' + labelPos.x.toFixed(2) + ' ' + labelPos.y.toFixed(2) + ')');
      text.textContent = SECTORS[i].emoji;
      wheel.appendChild(text);
    }

    var hub = document.createElementNS(SVG_NS, 'circle');
    hub.setAttribute('cx', CX);
    hub.setAttribute('cy', CY);
    hub.setAttribute('r', '22');
    hub.setAttribute('fill', '#e0417f');
    hub.setAttribute('stroke', '#ffffff');
    hub.setAttribute('stroke-width', '4');
    wheel.appendChild(hub);
  }

  function applyRotation(deg) {
    wheel.style.transform = 'rotate(' + deg + 'deg)';
  }

  /** Миттєво ставить колесо в кут без анімації. */
  function setRotationInstantly(deg) {
    wheel.style.transition = 'none';
    applyRotation(deg);
    void wheel.offsetWidth; // примусовий reflow, щоб 'none' встиг застосуватись
    wheel.style.transition = '';
  }

  function spin() {
    if (spinning) {
      return;
    }
    spinning = true;
    spinBtn.disabled = true;
    statusEl.textContent = 'Колесо крутиться…';

    var target = Math.floor(Math.random() * COUNT);
    // Довільна точка всередині сектора, щоб зупинка не була завжди по центру.
    var offset = STEP / 2 + (Math.random() - 0.5) * (STEP * 0.6);
    var sectorAngle = target * STEP + offset;

    var base = ((POINTER_ANGLE - sectorAngle) % 360 + 360) % 360;
    var minTurns = 6 + Math.floor(Math.random() * 3);
    var finalRotation = base;
    while (finalRotation < rotation + minTurns * 360) {
      finalRotation += 360;
    }

    // Анімацію веде CSS-transition: вона працює на композиторі (плавно на мобільних)
    // і, на відміну від requestAnimationFrame, не завмирає у згорнутій вкладці.
    wheel.style.transition = 'transform ' + SPIN_MS + 'ms cubic-bezier(0.22, 1, 0.36, 1)';
    applyRotation(finalRotation);

    var finishTimer = null;
    var finished = false;

    function finish() {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(finishTimer);
      wheel.removeEventListener('transitionend', onTransitionEnd);
      rotation = finalRotation % 360;
      setRotationInstantly(rotation);
      onStop(target);
    }

    function onTransitionEnd(event) {
      if (event.target === wheel && event.propertyName === 'transform') {
        finish();
      }
    }

    wheel.addEventListener('transitionend', onTransitionEnd);
    // Страхувальний таймер: якщо transitionend не спрацює, стан усе одно завершиться.
    finishTimer = setTimeout(finish, SPIN_MS + 100);
  }

  function onStop(index) {
    spinning = false;
    var prize = SECTORS[index];
    statusEl.textContent = 'Стрілочка вказує на ' + prize.emoji;
    setTimeout(function () {
      showPopup(prize);
    }, POPUP_DELAY_MS);
  }

  function showPopup(prize) {
    popupEmoji.textContent = prize.emoji;
    popupText.textContent = 'Вітаю! Вам випало ' + prize.event;
    overlay.hidden = false;
    launchConfetti();
  }

  function closePopup() {
    overlay.hidden = true;
    spinBtn.disabled = false;
    stopConfetti();
  }

  /* --- Конфеті --- */

  var ctx = confettiCanvas.getContext('2d');
  var particles = [];
  var confettiRaf = null;
  var confettiLastTime = 0;

  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    confettiCanvas.width = Math.round(window.innerWidth * dpr);
    confettiCanvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function launchConfetti() {
    if (prefersReducedMotion()) {
      return;
    }
    sizeCanvas();

    // Салют б'є з верхніх кутів попапа — так стрічки летять повз текст, а не закривають його.
    var box = popup.getBoundingClientRect();
    var origins = [
      { x: box.left, y: box.top, dir: 1 },
      { x: box.right, y: box.top, dir: -1 }
    ];

    particles = [];
    for (var i = 0; i < CONFETTI_COUNT; i++) {
      var origin = origins[i % origins.length];
      // Віяло вгору й до центру екрана від свого кута.
      var angle = -Math.PI / 2 + origin.dir * (Math.random() * 0.9) - 0.15 + Math.random() * 0.3;
      var speed = 6 + Math.random() * 8;
      particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.35,
        flutter: Math.random() * Math.PI * 2,
        life: 0
      });
    }

    if (confettiRaf === null) {
      confettiLastTime = 0;
      confettiRaf = window.requestAnimationFrame(confettiFrame);
    }
  }

  function confettiFrame(now) {
    // Крок нормалізуємо до 60 к/с, щоб швидкість не залежала від частоти екрана.
    var step = confettiLastTime ? Math.min((now - confettiLastTime) / 16.67, 3) : 1;
    var elapsed = confettiLastTime ? now - confettiLastTime : 0;
    confettiLastTime = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    var alive = 0;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.life += elapsed;
      if (p.life >= CONFETTI_LIFE_MS || p.y - p.h > window.innerHeight) {
        continue;
      }
      alive++;

      p.vy += 0.28 * step;          // тяжіння
      p.vx *= Math.pow(0.99, step); // опір повітря
      p.vy *= Math.pow(0.99, step);
      p.x += p.vx * step;
      p.y += p.vy * step;
      p.rotation += p.spin * step;
      p.flutter += 0.12 * step;

      var fade = Math.max(0, 1 - p.life / CONFETTI_LIFE_MS);
      ctx.save();
      ctx.globalAlpha = Math.min(1, fade * 2);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      // Стиснення по вертикалі імітує перевертання стрічки в повітрі.
      ctx.scale(1, Math.abs(Math.cos(p.flutter)) * 0.8 + 0.2);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (alive > 0) {
      confettiRaf = window.requestAnimationFrame(confettiFrame);
      return;
    }
    stopConfetti();
  }

  function stopConfetti() {
    if (confettiRaf !== null) {
      window.cancelAnimationFrame(confettiRaf);
      confettiRaf = null;
    }
    particles = [];
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }

  spinBtn.addEventListener('click', spin);

  againBtn.addEventListener('click', function () {
    closePopup();
    spin();
  });

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closePopup();
    }
  });

  window.addEventListener('resize', function () {
    if (confettiRaf !== null) {
      sizeCanvas();
    }
  });

  buildWheel();
  applyRotation(rotation);
}());
