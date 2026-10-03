const startBtn = document.getElementById('startBtn');
const boot = document.getElementById('boot');
const home = document.getElementById('home');
const items = [...document.querySelectorAll('.menu-item')];
const panels = [...document.querySelectorAll('.panel')];

function enterSite(){
  boot.classList.add('hidden');
  home.classList.remove('hidden');
  items[0].focus();
}
startBtn.addEventListener('click', enterSite);
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.code === 'Space') && !home.classList.contains('hidden')) return;
  if ((e.key === 'Enter' || e.code === 'Space') && !boot.classList.contains('hidden')) enterSite();
});

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    items.forEach(x => x.classList.remove('active'));
    panels.forEach(x => x.classList.remove('active-panel'));
    item.classList.add('active');
    document.getElementById(item.dataset.panel).classList.add('active-panel');
  });
});

// PSP-ish left/right navigation
document.addEventListener('keydown', e => {
  if (home.classList.contains('hidden')) return;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    const next = (items.indexOf(document.querySelector('.menu-item.active')) + 1) % items.length;
    items[next].click();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    const current = items.indexOf(document.querySelector('.menu-item.active'));
    items[(current - 1 + items.length) % items.length].click();
  }
});
