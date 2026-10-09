/* ===== v11 — wow ✦ ===== (veja o comentário no começo do wow.css) */
(() => {
  'use strict';
  const $ = s => document.querySelector(s), B = document.body;
  const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  const fx = () => !REDUCE && !B.classList.contains('lite');   // efeitos pesados só fora do modo leve
  const mk = (cls) => { const e = document.createElement('div'); e.className = cls; return e; };
  const home = $('#home'), halo = $('.halo'), menu = $('.menu');
  if (!home) return;

  /* faíscas voando pra fora a partir de um ponto */
  function sparks(x, y, n, dmin, dmax, life) {
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283 + rand(-.25, .25), d = rand(dmin, dmax);
      const s = document.createElement('i'); s.className = 'wow-spk'; s.textContent = ['✦', '✧', '·', '✦'][i % 4];
      s.style.cssText = `left:${x}px;top:${y}px;--dx:${Math.cos(a) * d | 0}px;--dy:${Math.sin(a) * d | 0}px;--r:${rand(-160, 160) | 0}deg;--t:${(life || 1.2) + rand(0, .5)}s;animation-delay:${rand(0, .12).toFixed(2)}s`;
      B.appendChild(s); setTimeout(() => s.remove(), 2200);
    }
  }

  /* 1) ASCENSÃO: ao abrir o site, luz sai do halo */
  let ascended = false;
  function ascend() {
    if (ascended || !fx()) return; ascended = true;
    let cx = innerWidth / 2, cy = innerHeight * .14;
    const r = halo && halo.getBoundingClientRect(); if (r && r.width) { cx = r.left + r.width / 2; cy = r.top + r.height / 2; }
    const o = mk('wow-asc'); o.style.setProperty('--cx', cx + 'px'); o.style.setProperty('--cy', cy + 'px');
    o.innerHTML = '<i class="wa-flash"></i><i class="wa-rays"></i><i class="wa-ring"></i><i class="wa-ring r2"></i><i class="wa-ring r3"></i>';
    B.appendChild(o); sparks(cx, cy, 26, 140, 520, 1.3); setTimeout(() => o.remove(), 2500);
  }
  new MutationObserver(() => { if (home.classList.contains('hidden')) ascended = false; else ascend(); })
    .observe(home, {attributes: true, attributeFilter: ['class']});

  /* 2) TROCA DE ABA: anel de luz, faíscas, varredura no painel e título decodificando */
  const G = 'ABCDEFGHJKLMNPQRSTUVWXYZ01#';
  function decode(el) {
    const n = [...el.childNodes].find(x => x.nodeType === 3 && x.nodeValue.trim()); if (!n) return;
    const full = n.nodeValue, F = 10; let f = 0; clearInterval(el._d);
    el._d = setInterval(() => {
      f++; const k = Math.floor(full.length * f / F);
      n.nodeValue = full.slice(0, k) + [...full.slice(k)].map(c => /[A-Z0-9]/.test(c) ? G[Math.random() * G.length | 0] : c).join('');
      if (f >= F) { clearInterval(el._d); n.nodeValue = full; }
    }, 45);
  }
  function onTab(item) {
    if (home.classList.contains('hidden')) return;
    const p = document.getElementById(item.dataset.panel);
    if (p) { const t = p.querySelector('.panel-title'); if (t && !REDUCE) decode(t); }
    if (!fx()) return;
    const r = item.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const ring = mk('wow-ring'); ring.style.left = x + 'px'; ring.style.top = y + 'px'; B.appendChild(ring); setTimeout(() => ring.remove(), 800);
    sparks(x, y, 9, 40, 110, .8);
    if (p) { p.classList.remove('wow-scan'); void p.offsetWidth; p.classList.add('wow-scan'); setTimeout(() => p.classList.remove('wow-scan'), 750); }
  }
  if (menu) new MutationObserver(recs => {
    recs.forEach(m => {
      const el = m.target;
      if (el.classList && el.classList.contains('menu-item') && el.classList.contains('active') && !(m.oldValue || '').split(/\s+/).includes('active')) onTab(el);
    });
  }).observe(menu, {attributes: true, attributeFilter: ['class'], attributeOldValue: true, subtree: true});

  /* 3) INCLINAÇÃO 3D dos cards e clips seguindo o mouse */
  const TILT = '.link-card,.clip';
  let cur = null, raf = 0, px = 0, py = 0;
  const reset = el => { if (el) el.style.transform = ''; };
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch' || !fx()) return;
    const el = e.target.closest ? e.target.closest(TILT) : null;
    if (el !== cur) { reset(cur); cur = el; }
    if (!el) return;
    px = e.clientX; py = e.clientY;
    if (!raf) raf = requestAnimationFrame(() => {
      raf = 0; if (!cur) return;
      const r = cur.getBoundingClientRect(), dx = (px - r.left) / r.width - .5, dy = (py - r.top) / r.height - .5;
      cur.style.transform = `perspective(700px) rotateX(${(-dy * 9).toFixed(2)}deg) rotateY(${(dx * 11).toFixed(2)}deg) translateZ(0)`;
    });
  }, {passive: true});
  addEventListener('blur', () => { reset(cur); cur = null; });
  document.addEventListener('pointerleave', () => { reset(cur); cur = null; });
})();
