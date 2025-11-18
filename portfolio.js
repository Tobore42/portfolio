// footer years
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('year2').textContent = new Date().getFullYear();

// color panel + theme toggle
const gear = document.getElementById('gearBtn');
const panel = document.getElementById('colorPanel');
gear.onclick = () => panel.classList.toggle('show');

const root = document.documentElement;
const savedTheme = localStorage.getItem('tt-theme');
const savedAccent = localStorage.getItem('tt-accent');

if (savedTheme) root.setAttribute('data-theme', savedTheme);
if (savedAccent) root.setAttribute('data-accent', savedAccent);

document.getElementById('themeBtn').onclick = () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('tt-theme', next);
};

document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    root.setAttribute('data-accent', btn.dataset.color);
    localStorage.setItem('tt-accent', btn.dataset.color);
  });
});

// Typewriter effect
const words = ["Security Analyst", "Cybersecurity Engineer", "Vulnerability Analyst", "Threat Hunter"];
const out = document.getElementById('typed');
let wi = 0, ch = 0, del = false;

function typeTick(){
  const w = words[wi % words.length];
  if(!del){
    ch++; out.textContent = w.slice(0, ch);
    if(ch === w.length){ del = true; setTimeout(typeTick, 1200); return; }
  } else {
    ch--; out.textContent = w.slice(0, ch);
    if(ch === 0){ del = false; wi++; }
  }
  setTimeout(typeTick, del ? 50 : 90);
}
typeTick();

// Router Navigation
const links = [...document.querySelectorAll('#sideNav a')];
const pages = [...document.querySelectorAll('.page')];
let current = document.querySelector('.page.active');

function setActiveLink(hash){
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === hash));
}

function showPage(id, push=true){
  const target = document.getElementById(id);
  if(!target || target === current) return;

  current.classList.remove('active');
  current.classList.add('exit-left');

  target.classList.remove('exit-left');
  target.classList.add('active');

  setTimeout(() => {
    current.classList.remove('exit-left');
    current = target;
  }, 800);

  if(push) history.pushState({page:id}, '', '#' + id);

  setActiveLink('#' + id);
}

links.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href').replace('#','');
    showPage(id, true);
  });
});

const start = (location.hash || '#home').replace('#','');
if(start !== 'home') showPage(start, false);
else setActiveLink('#home');

window.addEventListener('popstate', () => {
  const id = (location.hash || '#home').replace('#','');
  showPage(id, false);
});
