/* ===== v10 — glam ✦ : desenha as estrelas halftone (pontinhos) uma vez, em canvas ===== */
(function () {
  const root = document.getElementById('glam'); if (!root) return;
  // estrela de 4 pontas (brilhinho y2k); k = quão "fina" é a cintura
  function star(x, cx, cy, R, k) {
    x.beginPath(); x.moveTo(cx, cy - R);
    x.quadraticCurveTo(cx + R * k, cy - R * k, cx + R, cy); x.quadraticCurveTo(cx + R * k, cy + R * k, cx, cy + R);
    x.quadraticCurveTo(cx - R * k, cy + R * k, cx - R, cy); x.quadraticCurveTo(cx - R * k, cy - R * k, cx, cy - R); x.closePath();
  }
  function halftone(size, step, k, rings) {
    const m = document.createElement('canvas'); m.width = m.height = size; const x = m.getContext('2d'), c = size / 2, R = size * .47;
    star(x, c, c, R, k); x.fillStyle = '#fff'; x.fill();
    if (rings) { // contorno duplo: vaza uma estrela menor e preenche o miolo, como nas estrelas do vídeo
      x.globalCompositeOperation = 'destination-out'; star(x, c, c, R * .76, k); x.fill();
      x.globalCompositeOperation = 'source-over'; star(x, c, c, R * .5, k); x.fill();
    }
    x.globalCompositeOperation = 'destination-in'; // dots menores perto das pontas
    const g = x.createRadialGradient(c, c, 0, c, c, R); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(.55, 'rgba(255,255,255,.85)'); g.addColorStop(1, 'rgba(255,255,255,.4)');
    x.fillStyle = g; x.fillRect(0, 0, size, size);
    const d = x.getImageData(0, 0, size, size).data, o = document.createElement('canvas'); o.width = o.height = size; const ox = o.getContext('2d'); ox.fillStyle = '#fff';
    const rowH = step * .866;
    for (let r = 0, y = step / 2; y < size; r++, y += rowH) for (let xx = (r % 2 ? step : step / 2); xx < size; xx += step) {
      const a = d[(Math.min(size - 1, y | 0) * size + Math.min(size - 1, xx | 0)) * 4 + 3] / 255;
      if (a < .08) continue; ox.beginPath(); ox.arc(xx, y, step * .56 * Math.pow(a, .75), 0, 7); ox.fill();
    }
    return o;
  }
  const mk = (cls, size, step, k, rings) => { const w = document.createElement('div'); w.className = 'gs ' + cls; w.appendChild(halftone(size, step, k, rings)); root.appendChild(w); };
  mk('g0', 1100, 10, .13, true); mk('g1', 800, 9, .15, true); mk('g2', 900, 10, .14, true); mk('g3', 160, 7, .17, false); mk('g4', 160, 7, .17, false);
  for (const c of ['irid', 'streak']) { const i = document.createElement('i'); i.className = c; root.insertBefore(i, root.firstChild); }
  // as estrelas dão uma "batidinha" com a música (angel.js publica window.angelBeat)
  let last = -1; (function loop() { const b = Math.round(Math.min(1, window.angelBeat || 0) * 40) / 40; if (b !== last) { last = b; root.style.setProperty('--beat', b); } requestAnimationFrame(loop); })();
})();
