// ===== НАЛАШТУВАННЯ — змінюй тут =====
const CONFIG = {
  letter: "Happy birthday to you! Я бажаю, щоб твій день був наповнений любов'ю, сміхом і всіма твоїми улюбленими дрібничками. Ти заслуговуєш на весь щасливий світ — сьогодні і завжди. Нехай цей рік наблизить тебе до мрій і подарує купу милих, незабутніх моментів. Залишайся дивовижною, залишайся собою і не забувай, яка ти особлива для всіх навколо.",
};
// =====================================

document.querySelectorAll('.line').forEach((el, k) => {
  el.style.setProperty('--d', k ? '.8s' : '0s');
  [...el.dataset.text].forEach((ch, i) => {
    const s = document.createElement('span'); s.textContent = ch; s.style.setProperty('--i', i); el.appendChild(s);
  });
});

const hero = document.getElementById('hero');
const start = () => { hero.classList.remove('go'); void hero.offsetWidth; hero.classList.add('go'); };

// ===== ЗАСТАВКА З КОНВЕРТОМ =====
const gate = document.getElementById('gate'), env = document.getElementById('env');
const yes = document.getElementById('yes'), no = document.getElementById('no'), msg = document.getElementById('gateMsg');
const jokes = ['Ой, не вийшло 🙈','Спробуй ще 😏','Кнопка «Ні» зламалась 🥺','Може, все-таки «Так»? 💗','Ну будь ласка 🥹','Ти ж хочеш 😌'];
let tries = 0;
function dodge(e){
  e.preventDefault(); e.stopPropagation();
  no.classList.add('run');
  const m = 20, w = no.offsetWidth, h = no.offsetHeight;
  no.style.left = m + Math.random()*(innerWidth - w - 2*m) + 'px';
  no.style.top  = m + Math.random()*(innerHeight - h - 2*m) + 'px';
  msg.textContent = jokes[tries++ % jokes.length];
}
['pointerenter','pointerdown','touchstart','click'].forEach(ev => no.addEventListener(ev, dodge, {passive:false}));

yes.addEventListener('click', () => {
  yes.disabled = true; no.style.display = 'none';
  document.getElementById('gateQ').textContent = 'Це тобі 💌';
  msg.textContent = '';
  env.classList.add('opened');
  setTimeout(() => gate.classList.add('leave'), 1700);
  setTimeout(() => {
    gate.style.display = 'none';
    document.body.classList.remove('locked');
    window.scrollTo(0,0); start();
  }, 2600);
});
document.getElementById('replay').onclick = () => { window.scrollTo({top:0}); setTimeout(start, 500); };

// падаючі сердечка
const fall = document.getElementById('fall');
for (let i = 0; i < 16; i++) {
  const h = document.createElement('i'); h.textContent = i % 3 ? '♥' : '✿';
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = 12 + Math.random()*16 + 'px';
  h.style.setProperty('--dx', (Math.random()*120-60) + 'px');
  h.style.animationDuration = 8 + Math.random()*8 + 's';
  h.style.animationDelay = -Math.random()*14 + 's';
  fall.appendChild(h);
}

// поява секцій + друкування листа
let typed = false;
function type() {
  if (typed) return; typed = true;
  const t = document.getElementById('letterText'), box = document.querySelector('.letter'); let i = 0;
  (function tick(){ t.textContent = CONFIG.letter.slice(0, ++i);
    if (i < CONFIG.letter.length) setTimeout(tick, 28); else box.classList.add('done'); })();
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  if (e.target.id === 'letterSec') setTimeout(type, 700);
}), { threshold: .3 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));