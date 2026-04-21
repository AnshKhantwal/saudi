// 1. CURSOR & PARALLAX (GPU-Accelerated & Throttled)
const cur = document.getElementById('cursor'), curR = document.getElementById('cursorRing');
const heroGrid = document.querySelector('.hero-grid'), heroOrb = document.querySelector('.hero-orb-1');
let mx = 0, my = 0, rx = 0, ry = 0;
let isMoving = false;

// Initialize cursor position CSS so translate works correctly
cur.style.top = '0'; cur.style.left = '0';
curR.style.top = '0'; curR.style.left = '0';

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  
  if (!isMoving) {
    isMoving = true;
    requestAnimationFrame(() => {
      // Hardware-accelerated cursor
      cur.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      
      // Hardware-accelerated parallax (only runs if user is near the top)
      if (window.scrollY < window.innerHeight) {
        const gx = (mx / innerWidth - .5) * 20, gy = (my / innerHeight - .5) * 20;
        if (heroGrid) heroGrid.style.transform = `translate(${gx}px, ${gy}px)`;
        if (heroOrb) heroOrb.style.transform = `translate(${gx*.5}px, ${gy*.5}px)`;
      }
      isMoving = false;
    });
  }
}, { passive: true });

(function tick() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  curR.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
  requestAnimationFrame(tick);
})();

// 2. EVENT DELEGATION FOR HOVER (Fixes massive DOM listener loop)
const hoverSelectors = 'a, button, .sc, .cc, .ic, .award-card, .wc, .ec, .tc, .co, .ps-card';
document.addEventListener('mouseover', e => {
  if (e.target.closest(hoverSelectors)) {
    cur.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(2)`;
    curR.style.width = '60px'; curR.style.height = '60px'; curR.style.opacity = '0.3';
  }
});
document.addEventListener('mouseout', e => {
  if (e.target.closest(hoverSelectors)) {
    cur.style.transform = `translate(${mx - 6}px, ${my - 6}px) scale(1)`;
    curR.style.width = '40px'; curR.style.height = '40px'; curR.style.opacity = '0.65';
  }
});

// 3. NAVBAR SCROLL (Throttled)
const nav = document.getElementById('navbar');
let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });

// MOBILE NAV
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('mobileNav').classList.add('open'));
document.getElementById('mobClose').addEventListener('click',closeNav);
function closeNav(){document.getElementById('mobileNav').classList.remove('open');}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  });
});

// 4. COMBINED INTERSECTION OBSERVER (Saves memory)
const globalObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const el = e.target;
      if (el.classList.contains('reveal') || el.classList.contains('trust-item')) {
        el.classList.add('visible');
      }
      if (el.classList.contains('counter')) {
        animateCounter(el);
        globalObserver.unobserve(el);
      }
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .trust-item, .counter').forEach(el => globalObserver.observe(el));

// GPU-Friendly Counter Animation
function animateCounter(el) {
  const target = +el.dataset.target, duration = 2000, start = performance.now();
  function update(currentTime) {
    const progress = Math.min((currentTime - start) / duration, 1);
    el.textContent = Math.floor(progress * (2 - progress) * target); // Ease-out
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

// ACTIVE NAV
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nav-links a');
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      nls.forEach(l => l.style.color = l.getAttribute('href') === '#' + e.target.id ? 'var(--gold)' : '');
    }
  });
}, { threshold: 0.3 });
secs.forEach(sec => secObserver.observe(sec));

// FAQ
function toggleFAQ(btn){const fi=btn.closest('.fi');const was=fi.classList.contains('open');document.querySelectorAll('.fi.open').forEach(i=>i.classList.remove('open'));if(!was)fi.classList.add('open');}
function filterFAQ(cat,btn){document.querySelectorAll('.fc').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.fi').forEach(fi=>{fi.style.display=(cat==='all'||fi.dataset.cat===cat)?'block':'none';});}

// FORMS
function handleHeroForm(btn){
  const inputs=btn.closest('.hero-form-card').querySelectorAll('input,select,textarea');
  let ok=true;
  inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='rgba(200,169,110,.5)';ok=false;}else{i.style.borderColor=''}});
  if(!ok)return;
  btn.innerHTML='✓ Sent! We\'ll be in touch within 24 hours.'; btn.style.background='linear-gradient(135deg,#1a7a4a,#22a060)'; btn.disabled=true; inputs.forEach(i=>i.value='');
}
function handleCtaForm(btn){
  const inputs=btn.closest('.cta-form-card').querySelectorAll('input,select');
  let ok=true;
  inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='rgba(200,169,110,.5)';ok=false;}else{i.style.borderColor=''}});
  if(!ok)return;
  btn.innerHTML='✓ Request Received!'; btn.style.background='linear-gradient(135deg,#1a7a4a,#22a060)'; btn.disabled=true; inputs.forEach(i=>i.value='');
}

// TECH STACK
const techData={
  frontend:[{em:'⚛️',name:'React.js'},{em:'🅰️',name:'Angular'},{em:'💚',name:'Vue.js'},{em:'⚡',name:'Next.js'},{em:'🎨',name:'TailwindCSS'},{em:'🟦',name:'TypeScript'},{em:'📱',name:'PWA'},{em:'🖼️',name:'Three.js'}],
  backend:[{em:'🟩',name:'Node.js'},{em:'🐍',name:'Python'},{em:'🛤️',name:'Django'},{em:'🚀',name:'FastAPI'},{em:'💎',name:'Ruby on Rails'},{em:'🔷',name:'Laravel'},{em:'☕',name:'Java Spring'},{em:'🦀',name:'Go'}],
  mobile:[{em:'📱',name:'Flutter'},{em:'⚛️',name:'React Native'},{em:'🍎',name:'Swift'},{em:'🤖',name:'Kotlin'},{em:'🔷',name:'Objective-C'},{em:'🌐',name:'Ionic'},{em:'⚡',name:'Expo'},{em:'🎯',name:'Xamarin'}],
  database:[{em:'🍃',name:'MongoDB'},{em:'🐘',name:'PostgreSQL'},{em:'🐬',name:'MySQL'},{em:'🔥',name:'Firebase'},{em:'⚡',name:'Redis'},{em:'📊',name:'Elasticsearch'},{em:'☁️',name:'DynamoDB'},{em:'🗄️',name:'SQLite'}],
  devops:[{em:'🐳',name:'Docker'},{em:'☸️',name:'Kubernetes'},{em:'🔄',name:'Jenkins'},{em:'🦊',name:'GitLab CI'},{em:'🌱',name:'Terraform'},{em:'📦',name:'Ansible'},{em:'🔵',name:'AWS'},{em:'☁️',name:'Azure'}],
  ai:[{em:'🧠',name:'TensorFlow'},{em:'🔥',name:'PyTorch'},{em:'🤗',name:'Hugging Face'},{em:'🔗',name:'LangChain'},{em:'📊',name:'scikit-learn'},{em:'👁️',name:'OpenCV'},{em:'💬',name:'OpenAI API'},{em:'📈',name:'Pandas'}]
};
function switchTech(key,btn){
  document.querySelectorAll('.tech-tab').forEach(t=>t.classList.remove('active')); btn.classList.add('active');
  document.getElementById('techGrid').innerHTML=techData[key].map(t=>`<div class="tech-card"><div class="tech-em">${t.em}</div><div class="tech-name">${t.name}</div></div>`).join('');
}
switchTech('frontend',document.querySelector('.tech-tab.active'));

// CALCULATOR (Logic unchanged)
let calcAnswers={},currentStep=1;
const labels={stage:{idea:'Idea Stage',prototype:'Prototype',mvp:'MVP / Scale'},timeline:{short:'1–3 Months',medium:'3–6 Months',long:'6+ Months'},type:{mobile:'Mobile App',web:'Web Platform',both:'Both'},features:{basic:'Standard',advanced:'Advanced + AI',enterprise:'Enterprise'}};
function selectOpt(el,key,val){el.closest('.calc-opts').querySelectorAll('.co').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');calcAnswers[key]=val;}
function updateStepBar(step){for(let i=1;i<=4;i++){const csb=document.getElementById('csb'+i);if(!csb)continue;csb.classList.remove('active','done');if(i<step)csb.classList.add('done');else if(i===step)csb.classList.add('active');}}
function nextStep(n){document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active'));currentStep=n;const s=document.getElementById(n<=4?'step'+n:'stepResult');if(s)s.classList.add('active');if(n<=4)updateStepBar(n);}
function showResult(){
  const ranges={'idea-short-mobile-basic':'$8,000 – $18,000','idea-short-mobile-advanced':'$15,000 – $35,000','idea-short-web-basic':'$10,000 – $22,000','idea-medium-web-advanced':'$25,000 – $55,000','idea-medium-both-advanced':'$35,000 – $75,000','prototype-short-mobile-basic':'$12,000 – $28,000','prototype-medium-web-advanced':'$30,000 – $65,000','prototype-medium-both-advanced':'$40,000 – $90,000','mvp-medium-mobile-advanced':'$30,000 – $70,000','mvp-long-web-enterprise':'$60,000 – $140,000','mvp-long-both-enterprise':'$80,000 – $180,000','idea-long-both-enterprise':'$70,000 – $160,000'};
  const key=`${calcAnswers.stage||'idea'}-${calcAnswers.timeline||'medium'}-${calcAnswers.type||'mobile'}-${calcAnswers.features||'basic'}`;
  document.getElementById('calcResultRange').textContent=ranges[key]||'$15,000 – $75,000';
  document.getElementById('calcResultNote').textContent=`For a ${labels.type[calcAnswers.type]||'software'} project in ${labels.timeline[calcAnswers.timeline]||'standard timeline'} with ${labels.features[calcAnswers.features]||'standard'} features.`;
  document.getElementById('calcSummary').innerHTML=Object.entries(calcAnswers).map(([k,v])=>`<div class="cr-chip">${k.charAt(0).toUpperCase()+k.slice(1)}: <span>${labels[k]?.[v]||v}</span></div>`).join('');
  nextStep(5); document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active')); document.getElementById('stepResult').classList.add('active');
  for(let i=1;i<=4;i++){const csb=document.getElementById('csb'+i);if(csb){csb.classList.remove('active');csb.classList.add('done');}}
}
function resetCalc(){calcAnswers={};currentStep=1;document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active'));document.getElementById('step1').classList.add('active');updateStepBar(1);}