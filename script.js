// CURSOR
const cur=document.getElementById('cursor'),curR=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-6+'px';cur.style.top=my-6+'px';});
(function tick(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;curR.style.left=rx-20+'px';curR.style.top=ry-20+'px';requestAnimationFrame(tick);})();
document.querySelectorAll('a,button,.sc,.cc,.ic,.award-card,.wc,.ec,.tc,.co,.ps-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='scale(2)';curR.style.width='60px';curR.style.height='60px';curR.style.opacity='0.3';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='scale(1)';curR.style.width='40px';curR.style.height='40px';curR.style.opacity='0.65';});
});

// NAVBAR
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>50));

// MOBILE NAV
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('mobileNav').classList.add('open'));
document.getElementById('mobClose').addEventListener('click',closeNav);
function closeNav(){document.getElementById('mobileNav').classList.remove('open');}

// REVEAL
const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:.08,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal,.trust-item').forEach(el=>obs.observe(el));

// COUNTERS
const cObs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){const el=e.target,t=+el.dataset.target,step=t/120;let c=0;const ti=setInterval(()=>{c=Math.min(c+step,t);el.textContent=Math.floor(c);if(c>=t)clearInterval(ti);},16);cObs.unobserve(el);}});},{threshold:.5});
document.querySelectorAll('.counter').forEach(c=>cObs.observe(c));

// FAQ
function toggleFAQ(btn){const fi=btn.closest('.fi');const was=fi.classList.contains('open');document.querySelectorAll('.fi.open').forEach(i=>i.classList.remove('open'));if(!was)fi.classList.add('open');}
function filterFAQ(cat,btn){document.querySelectorAll('.fc').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.fi').forEach(fi=>{fi.style.display=(cat==='all'||fi.dataset.cat===cat)?'block':'none';});}

// HERO FORM
function handleHeroForm(btn){
  const card=btn.closest('.hero-form-card');
  const inputs=card.querySelectorAll('input,select,textarea');
  let ok=true;
  inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='rgba(200,169,110,.5)';ok=false;}else{i.style.borderColor=''}});
  if(!ok)return;
  btn.innerHTML='✓ Sent! We\'ll be in touch within 24 hours.';
  btn.style.background='linear-gradient(135deg,#1a7a4a,#22a060)';
  btn.disabled=true;
  inputs.forEach(i=>i.value='');
}

// CTA FORM
function handleCtaForm(btn){
  const card=btn.closest('.cta-form-card');
  const inputs=card.querySelectorAll('input,select');
  let ok=true;
  inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='rgba(200,169,110,.5)';ok=false;}else{i.style.borderColor=''}});
  if(!ok)return;
  btn.innerHTML='✓ Request Received! We\'ll call you within 24 hours.';
  btn.style.background='linear-gradient(135deg,#1a7a4a,#22a060)';
  btn.disabled=true;
  inputs.forEach(i=>i.value='');
}

// PARALLAX
document.addEventListener('mousemove',e=>{
  const gx=(e.clientX/innerWidth-.5)*20,gy=(e.clientY/innerHeight-.5)*20;
  const g=document.querySelector('.hero-grid');if(g)g.style.transform=`translate(${gx}px,${gy}px)`;
  const o1=document.querySelector('.hero-orb-1');if(o1)o1.style.transform=`translate(${gx*.5}px,${gy*.5}px)`;
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth'});});});

// ACTIVE NAV
const secs=document.querySelectorAll('section[id]');const nls=document.querySelectorAll('.nav-links a');
secs.forEach(sec=>{new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)nls.forEach(l=>{l.style.color=l.getAttribute('href')==='#'+e.target.id?'var(--gold)':'';});});},{threshold:.3}).observe(sec);});

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
  document.querySelectorAll('.tech-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const grid=document.getElementById('techGrid');
  grid.innerHTML=techData[key].map(t=>`<div class="tech-card"><div class="tech-em">${t.em}</div><div class="tech-name">${t.name}</div></div>`).join('');
}
switchTech('frontend',document.querySelector('.tech-tab.active'));

// CALCULATOR
let calcAnswers={},currentStep=1;
const labels={
  stage:{idea:'Idea Stage',prototype:'Prototype',mvp:'MVP / Scale'},
  timeline:{short:'1–3 Months',medium:'3–6 Months',long:'6+ Months'},
  type:{mobile:'Mobile App',web:'Web Platform',both:'Both'},
  features:{basic:'Standard',advanced:'Advanced + AI',enterprise:'Enterprise'}
};

function selectOpt(el,key,val){
  el.closest('.calc-opts').querySelectorAll('.co').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  calcAnswers[key]=val;
}
function updateStepBar(step){
  for(let i=1;i<=4;i++){
    const csb=document.getElementById('csb'+i);
    if(!csb)continue;
    csb.classList.remove('active','done');
    if(i<step)csb.classList.add('done');
    else if(i===step)csb.classList.add('active');
  }
}
function nextStep(n){
  document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active'));
  currentStep=n;
  const s=document.getElementById(n<=4?'step'+n:'stepResult');
  if(s)s.classList.add('active');
  if(n<=4)updateStepBar(n);
}
function showResult(){
  const ranges={
    'idea-short-mobile-basic':'$8,000 – $18,000',
    'idea-short-mobile-advanced':'$15,000 – $35,000',
    'idea-short-web-basic':'$10,000 – $22,000',
    'idea-medium-web-advanced':'$25,000 – $55,000',
    'idea-medium-both-advanced':'$35,000 – $75,000',
    'prototype-short-mobile-basic':'$12,000 – $28,000',
    'prototype-medium-web-advanced':'$30,000 – $65,000',
    'prototype-medium-both-advanced':'$40,000 – $90,000',
    'mvp-medium-mobile-advanced':'$30,000 – $70,000',
    'mvp-long-web-enterprise':'$60,000 – $140,000',
    'mvp-long-both-enterprise':'$80,000 – $180,000',
    'idea-long-both-enterprise':'$70,000 – $160,000',
  };
  const key=`${calcAnswers.stage||'idea'}-${calcAnswers.timeline||'medium'}-${calcAnswers.type||'mobile'}-${calcAnswers.features||'basic'}`;
  const range=ranges[key]||'$15,000 – $75,000';
  document.getElementById('calcResultRange').textContent=range;
  document.getElementById('calcResultNote').textContent=`For a ${labels.type[calcAnswers.type]||'software'} project in ${labels.timeline[calcAnswers.timeline]||'standard timeline'} with ${labels.features[calcAnswers.features]||'standard'} features — delivered by our Dubai expert team.`;
  // Summary chips
  const summaryEl=document.getElementById('calcSummary');
  summaryEl.innerHTML=Object.entries(calcAnswers).map(([k,v])=>`<div class="cr-chip">${k.charAt(0).toUpperCase()+k.slice(1)}: <span>${labels[k]?.[v]||v}</span></div>`).join('');
  nextStep(5);
  document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('stepResult').classList.add('active');
  for(let i=1;i<=4;i++){const csb=document.getElementById('csb'+i);if(csb){csb.classList.remove('active');csb.classList.add('done');}}
}
function resetCalc(){
  calcAnswers={};currentStep=1;
  document.querySelectorAll('.calc-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('step1').classList.add('active');
  updateStepBar(1);
}