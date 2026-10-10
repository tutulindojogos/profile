/* ===== borboletas vermelhas voando pela tela ===== */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const mobile = matchMedia('(max-width: 760px)').matches, N = mobile ? 5 : 10;
  const r = (a, b) => a + Math.random() * (b - a);
  for (let i = 0; i < N; i++) {
    const left = i % 2 === 1, front = i % 3 === 0, e = document.createElement('i');
    e.className = 'bfly' + (left ? ' l' : '') + (front ? ' front' : '') + (i % 4 === 3 ? ' dark' : '');
    e.setAttribute('aria-hidden', 'true');
    e.style.cssText = `--s:${(front ? r(20, 30) : r(26, 56)).toFixed(0)}px;--y:${r(4, 92).toFixed(0)};--t:${r(20, 38).toFixed(1)}s;--d:${(-r(0, 36)).toFixed(1)}s;--amp:${r(30, 110).toFixed(0)}px;--bt:${r(2.4, 4.6).toFixed(1)}s;--fl:${r(.22, .36).toFixed(2)}s`;
    e.innerHTML = '<b><u></u></b>';
    document.body.appendChild(e);
  }
})();
