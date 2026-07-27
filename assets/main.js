/* ==========================================
   AL AMAL DIGITAL AGENCY — SHARED JS
   Three.js WebGL + GSAP + Cursor + Nav + Interactions
   ========================================== */

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── CURSOR ──
const cDot = document.getElementById('cDot');
const cCircle = document.getElementById('cCircle');
if (cDot && cCircle) {
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cDot.style.left = mx + 'px'; cDot.style.top = my + 'px';
  });
  (function animCursor() {
    cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12;
    cCircle.style.left = cx + 'px'; cCircle.style.top = cy + 'px';
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a, button, .svc-card, .svc-full, .p-card, .tm-card, .b-card, .faq-q').forEach(el => {
    el.addEventListener('mouseenter', () => cCircle.classList.add('hover'));
    el.addEventListener('mouseleave', () => cCircle.classList.remove('hover'));
  });
}

// ── NAV SCROLL ──
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
}

// ── ACTIVE NAV LINK ──
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) a.classList.add('active');
  });
})();

// ── MOBILE NAV ──
const menuBtn = document.getElementById('menuBtn');
let mOpen = false;
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mOpen = !mOpen;
    const links = document.querySelector('.nav-links');
    if (mOpen) {
      links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(6,6,18,0.97);padding:24px 6%;gap:20px;border-bottom:1px solid rgba(255,255,255,0.07);z-index:999;backdrop-filter:blur(20px);';
    } else {
      links.style.cssText = '';
    }
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = mOpen ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = mOpen ? '0' : '1';
    spans[2].style.transform = mOpen ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { if (mOpen) { mOpen = false; menuBtn.click(); } });
  });
}

// ── LANGUAGE TOGGLE ──
let isAr = false;
const langBtn = document.getElementById('langBtn');
if (langBtn) {
  langBtn.addEventListener('click', () => {
    isAr = !isAr;
    document.body.classList.toggle('rtl', isAr);
    document.documentElement.lang = isAr ? 'ar' : 'en';
    langBtn.textContent = isAr ? 'EN' : 'عربي';
    document.querySelectorAll('[data-en],[data-ar]').forEach(el => {
      const val = isAr ? el.getAttribute('data-ar') : el.getAttribute('data-en');
      if (val) el.innerHTML = val;
    });
  });
}

// ── COUNTER ANIMATION ──
let countersRan = false;
function animateCounters() {
  if (countersRan) return;
  countersRan = true;
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const pre = el.dataset.pre || '';
    const suf = el.dataset.suf || '';
    const dur = 2400;
    const ease = t => 1 - Math.pow(1 - t, 4);
    const startTime = performance.now();
    const update = (now) => {
      const p = Math.min((now - startTime) / dur, 1);
      el.textContent = pre + Math.floor(ease(p) * target) + (p >= 1 ? suf : '');
      if (p < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}
const statsEl = document.getElementById('stats');
if (statsEl) {
  new IntersectionObserver(entries => { if (entries[0].isIntersecting) animateCounters(); }, { threshold: 0.4 }).observe(statsEl);
}

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => revealObs.observe(el));

// ── 3D CARD TILT ──
document.querySelectorAll('.svc-full, .price-card, .t-card, .b-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
  });
});
document.querySelectorAll('.p-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.7s cubic-bezier(0.16,1,0.3,1)';
  });
});

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-glow, .btn-outline, .nav-cta, .form-submit').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.3}px)`;
    btn.style.transition = 'transform 0.1s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  });
});

// ── PORTFOLIO FILTER ──
window.filterP = function(cat, btn) {
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.p-card').forEach(c => {
    const show = cat === 'all' || c.dataset.cat === cat;
    c.style.opacity = show ? '1' : '0.15';
    c.style.transform = show ? '' : 'scale(0.95)';
    c.style.pointerEvents = show ? 'auto' : 'none';
  });
};

// ── TESTIMONIALS SLIDER ──
const tTrack = document.getElementById('tTrack');
if (tTrack) {
  let tCur = 0;
  const tCards = tTrack.querySelectorAll('.t-card');
  const tDotsEl = document.getElementById('tDots');
  const tTotal = Math.ceil(tCards.length / 3);
  function updateT() {
    const w = tCards[0] ? (tCards[0].offsetWidth + 20) : 0;
    tTrack.style.transform = `translateX(-${tCur * w * 3}px)`;
    if (tDotsEl) tDotsEl.querySelectorAll('.tdot').forEach((d, i) => d.classList.toggle('on', i === tCur));
  }
  window.goT = i => { tCur = i; updateT(); };
  const tNext = document.getElementById('tNext');
  const tPrev = document.getElementById('tPrev');
  if (tNext) tNext.addEventListener('click', () => { tCur = (tCur + 1) % tTotal; updateT(); });
  if (tPrev) tPrev.addEventListener('click', () => { tCur = (tCur - 1 + tTotal) % tTotal; updateT(); });
  setInterval(() => { tCur = (tCur + 1) % tTotal; updateT(); }, 5500);
}

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-q').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── GSAP ANIMATIONS (progressive enhancement) ──
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.reveal').forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      delay: (i % 4) * 0.06,
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });
  gsap.utils.toArray('.reveal-l').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: -60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
  gsap.utils.toArray('.reveal-r').forEach(el => {
    gsap.fromTo(el, { opacity: 0, x: 60 }, {
      opacity: 1, x: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });
  ScrollTrigger.create({
    start: 'top -10',
    onUpdate: self => {
      if (nav) nav.classList.toggle('scrolled', self.scroll() > 50);
    }
  });
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    gsap.set('#eyebrow, #heroSub, #heroActions, #heroMetrics', { opacity: 0, y: 20 });
    gsap.set('#heroTitle .word', { opacity: 0, y: 80 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to('#eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('#heroTitle .word', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, '-=0.3')
      .to('#heroSub', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to('#heroActions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to('#heroMetrics', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }
}

// ── THREE.JS WEBGL SCENE (Awwwards-inspired) ──
(function initWebGL() {
  if (!window.THREE) return;
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);
  const torus = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.8, 0.5, 200, 16, 2, 3),
    new THREE.MeshPhongMaterial({ color: 0x2563EB, wireframe: true, opacity: 0.15, transparent: true })
  );
  scene.add(torus);
  const sphere = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.2, 2),
    new THREE.MeshBasicMaterial({ color: 0x7C3AED, wireframe: true, opacity: 0.05, transparent: true })
  );
  scene.add(sphere);
  const pCount = 1600;
  const pPos = new Float32Array(pCount * 3);
  const pCol = new Float32Array(pCount * 3);
  const cols = [new THREE.Color(0x2563EB), new THREE.Color(0x06B6D4), new THREE.Color(0x7C3AED), new THREE.Color(0x10B981)];
  for (let i = 0; i < pCount; i++) {
    pPos[i*3] = (Math.random()-.5)*20; pPos[i*3+1] = (Math.random()-.5)*20; pPos[i*3+2] = (Math.random()-.5)*20;
    const c = cols[i % 4]; pCol[i*3]=c.r; pCol[i*3+1]=c.g; pCol[i*3+2]=c.b;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.7 }));
  scene.add(particles);
  const floaters = [];
  [[0x2563EB,0.12],[0x06B6D4,0.1],[0x7C3AED,0.08]].forEach(([color, size], gi) => {
    for (let i = 0; i < 5; i++) {
      const geo = gi===0 ? new THREE.OctahedronGeometry(size) : gi===1 ? new THREE.TetrahedronGeometry(size) : new THREE.IcosahedronGeometry(size,0);
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, wireframe: true, opacity: 0.4, transparent: true }));
      m.position.set((Math.random()-.5)*10, (Math.random()-.5)*10, (Math.random()-.5)*6);
      m.userData = { rx: (Math.random()-.5)*0.02, ry: (Math.random()-.5)*0.02, baseY: m.position.y, phase: Math.random()*Math.PI*2 };
      scene.add(m); floaters.push(m);
    }
  });
  scene.add(new THREE.AmbientLight(0xffffff, 0.2));
  const pl1 = new THREE.PointLight(0x2563EB, 3, 20); pl1.position.set(5,5,5); scene.add(pl1);
  const pl2 = new THREE.PointLight(0x7C3AED, 2, 20); pl2.position.set(-5,-5,3); scene.add(pl2);
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
  document.addEventListener('mousemove', e => { mouseX = (e.clientX/window.innerWidth-.5)*2; mouseY = (e.clientY/window.innerHeight-.5)*2; });
  window.addEventListener('resize', () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
  const clock = new THREE.Clock();
  let scrollY = 0;
  window.addEventListener('scroll', () => scrollY = window.scrollY);
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    targetX += (mouseX*.5 - targetX) * .05;
    targetY += (mouseY*.5 - targetY) * .05;
    camera.position.x = targetX; camera.position.y = -targetY;
    torus.rotation.x = t*.12; torus.rotation.y = t*.08;
    sphere.rotation.y = -t*.05;
    particles.rotation.y = t*.03;
    floaters.forEach(f => { f.rotation.x += f.userData.rx; f.rotation.y += f.userData.ry; f.position.y = f.userData.baseY + Math.sin(t + f.userData.phase) * .3; });
    canvas.style.opacity = Math.max(0.25, 0.8 - Math.min(scrollY/800,1)*.55).toString();
    renderer.render(scene, camera);
  })();
})();
