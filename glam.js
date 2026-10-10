/* ===== v10 — glam ✦ : desenha tudo uma vez (canvas/SVG estáticos) ===== */
(function () {
  const root = document.getElementById('glam'); if (!root) return;
  const mobile = matchMedia('(max-width: 760px)').matches;
  function star(x, cx, cy, R, k) { // v-wine: desenha uma borboleta em vez da estrela de 4 pontas
    x.beginPath();
    for (const m of [1, -1]) {
      x.moveTo(cx, cy - R * .08);
      x.bezierCurveTo(cx + m * R * .2, cy - R * .98, cx + m * R * 1.08, cy - R * .98, cx + m * R * .96, cy - R * .12);
      x.bezierCurveTo(cx + m * R * .96, cy + R * .1, cx + m * R * .72, cy + R * .92, cx + m * R * .32, cy + R * .78);
      x.bezierCurveTo(cx + m * R * .1, cy + R * .62, cx + m * R * .05, cy + R * .3, cx, cy + R * .1);
    }
    x.closePath();
  }
  function halftone(size, step, k, rings) {
    const m = document.createElement('canvas'); m.width = m.height = size; const x = m.getContext('2d'), c = size / 2, R = size * .47;
    star(x, c, c, R, k); x.fillStyle = '#fff'; x.fill();
    if (rings) { x.globalCompositeOperation = 'destination-out'; star(x, c, c, R * .76, k); x.fill(); x.globalCompositeOperation = 'source-over'; star(x, c, c, R * .5, k); x.fill(); }
    x.globalCompositeOperation = 'destination-in';
    const g = x.createRadialGradient(c, c, 0, c, c, R); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.55, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,.4)');
    x.fillStyle = g; x.fillRect(0, 0, size, size);
    const d = x.getImageData(0, 0, size, size).data, o = document.createElement('canvas'); o.width = o.height = size; const ox = o.getContext('2d'); ox.fillStyle = '#d4162f';
    const rowH = step * .866;
    for (let r = 0, y = step / 2; y < size; r++, y += rowH) for (let xx = (r % 2 ? step : step / 2); xx < size; xx += step) {
      const a = d[(Math.min(size - 1, y | 0) * size + Math.min(size - 1, xx | 0)) * 4 + 3] / 255;
      if (a < .08) continue; ox.beginPath(); ox.arc(xx, y, step * .56 * Math.pow(a, .75), 0, 7); ox.fill();
    }
    return o;
  }
  const add = (cls, node) => { const w = document.createElement('div'); w.className = 'gs ' + cls; w.appendChild(node); root.appendChild(w); };
  const sz = mobile ? .6 : 1; // menos pixels no celular
  if (!mobile) { add('g0', halftone(800, 10, .13, true)); add('g3', halftone(160, 7, .17, false)); add('g4', halftone(160, 7, .17, false)); }
  add('g1', halftone(Math.round(800 * sz), Math.round(9 * sz), .15, true)); add('g2', halftone(Math.round(900 * sz), Math.round(10 * sz), .14, true));
  if (mobile) return;
  for (const c of ['irid', 'streak']) { const i = document.createElement('i'); i.className = c; root.insertBefore(i, root.firstChild); }

  // ---- adesivos ----
  let uid = 0;
  const chrome = () => { const id = 'cs' + (uid++); return `<svg viewBox="-50 -50 100 100"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5468"/><stop offset=".45" stop-color="#b3122b"/><stop offset=".6" stop-color="#e03a52"/><stop offset="1" stop-color="#4a0612"/></linearGradient></defs>
    <path d="M-2-6C-8-44-40-50-47-34c-5 14 4 30 20 34 8 2 20 0 25-6zM2-6C8-44 40-50 47-34c5 14-4 30-20 34-8 2-20 0-25-6zM-2 4C-18 2-36 12-32 32c3 12 20 14 28 4 4-6 4-20 2-32zM2 4C18 2 36 12 32 32c-3 12-20 14-28 4-4-6-4-20-2-32z" fill="url(#${id})" stroke="#1a0208" stroke-width="1.8" stroke-linejoin="round"/><path d="M0-12V30" stroke="#12010a" stroke-width="4" stroke-linecap="round"/></svg>`; };
  const sticker = (cls, html, css) => { const s = document.createElement('i'); s.className = 'st ' + cls; s.innerHTML = html; if (css) s.style.cssText = css; root.appendChild(s); return s; };
  [['12vw', '31vh', '6.5vmin', -12], ['31vw', '9vh', '4.4vmin', 10], ['69vw', '17vh', '5.5vmin', 6], ['89vw', '60vh', '4vmin', -8], ['21vw', '74vh', '4.8vmin', 14], ['80vw', '82vh', '3.4vmin', 0]]
    .forEach(([l, t, w, r]) => sticker('sp', chrome(), `left:${l};top:${t};width:${w};transform:rotate(${r}deg)`));
  sticker('cd', '');
  const txt = 'stay beautiful ✦ butterfly effect ✦ lnerita ✦ ';
  sticker('gring', `<svg viewBox="0 0 120 120"><defs><path id="rp" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0"/></defs><circle cx="60" cy="60" r="57" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.55)" stroke-width="1"/><text font-family="DM Mono,monospace" font-size="9.4" letter-spacing="2.6" fill="#fff"><textPath href="#rp">${txt}${txt}</textPath></text><g transform="translate(60 60) scale(.5)"><path d="M-2-6C-8-44-40-50-47-34c-5 14 4 30 20 34 8 2 20 0 25-6zM2-6C8-44 40-50 47-34c5 14-4 30-20 34-8 2-20 0-25-6zM-2 4C-18 2-36 12-32 32c3 12 20 14 28 4 4-6 4-20 2-32zM2 4C18 2 36 12 32 32c-3 12-20 14-28 4-4-6-4-20-2-32z" fill="#ff6b81"/></g></svg>`);
  const b1 = document.createElement('span'); b1.className = 'st bar'; b1.textContent = '🦋 lnerita — butterfly system — est. 2026 🦋'; root.appendChild(b1);
  const b2 = document.createElement('span'); b2.className = 'st bar2'; b2.textContent = 'stay pretty ✧ stay dangerous ✧ stay pretty'; root.appendChild(b2);
  const bc = document.createElement('span'); bc.className = 'st code'; root.appendChild(bc);
})();
