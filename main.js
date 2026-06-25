/* VELES CAPITAL — interactions */

/* ---------- Cookie consent + Google Analytics (GA4) ---------- */
/* GDPR/PECR: GA4 only loads after the visitor accepts. Default = no tracking. */
(function(){
  var GA_ID = 'G-55TJ57M3QL';
  var KEY = 'veles-consent';

  function loadGA(){
    if(window.__gaLoaded) return; window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function showBanner(){
    var css = '.cc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:1200;max-width:720px;margin:0 auto;background:rgba(8,26,18,.97);backdrop-filter:blur(12px);border:1px solid rgba(200,162,74,.32);border-radius:14px;padding:18px 20px;display:flex;gap:14px 18px;align-items:center;flex-wrap:wrap;justify-content:space-between;box-shadow:0 20px 50px rgba(0,0,0,.45);transform:translateY(160%);transition:transform .45s cubic-bezier(.2,.7,.2,1)}'
      + '.cc-banner.cc-in{transform:none}'
      + '.cc-text{color:#eef0ea;font-size:.86rem;line-height:1.55;flex:1 1 320px;margin:0}'
      + '.cc-actions{display:flex;gap:10px;flex:0 0 auto}'
      + '.cc-btn{font:inherit;font-size:.82rem;font-weight:600;padding:11px 22px;border-radius:100px;cursor:pointer;border:1px solid transparent;transition:all .25s}'
      + '.cc-decline{background:transparent;border-color:rgba(245,243,236,.3);color:#f5f3ec}'
      + '.cc-decline:hover{border-color:#c8a24a;color:#e2c987}'
      + '.cc-accept{background:#c8a24a;color:#0c2a1f}'
      + '.cc-accept:hover{background:#e2c987}'
      + '@media(max-width:560px){.cc-banner{flex-direction:column;align-items:stretch}.cc-actions{justify-content:flex-end}}';
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

    var b = document.createElement('div');
    b.className = 'cc-banner'; b.setAttribute('role','dialog'); b.setAttribute('aria-label','Cookie consent');
    b.innerHTML = '<p class="cc-text">We use cookies to measure traffic and improve your experience. Analytics only runs if you accept.</p>'
      + '<div class="cc-actions">'
      + '<button class="cc-btn cc-decline" type="button">Decline</button>'
      + '<button class="cc-btn cc-accept" type="button">Accept</button>'
      + '</div>';
    document.body.appendChild(b);
    requestAnimationFrame(function(){ b.classList.add('cc-in'); });
    function choose(v){
      try{ localStorage.setItem(KEY, v); }catch(e){}
      b.classList.remove('cc-in');
      setTimeout(function(){ if(b.parentNode) b.parentNode.removeChild(b); }, 400);
      if(v === 'granted') loadGA();
    }
    b.querySelector('.cc-accept').addEventListener('click', function(){ choose('granted'); });
    b.querySelector('.cc-decline').addEventListener('click', function(){ choose('denied'); });
  }

  var choice = null;
  try{ choice = localStorage.getItem(KEY); }catch(e){}
  if(choice === 'granted'){ loadGA(); }
  else if(choice !== 'denied'){
    if(document.body){ showBanner(); } else { document.addEventListener('DOMContentLoaded', showBanner); }
  }
})();

(function(){
  // ---- shared nav injection ----
  var path = location.pathname;
  var inSub = /\/journal\//.test(path);
  var pre = inSub ? '../' : '';
  var file = (path.split('/').pop() || 'index.html');
  if(file === '') file = 'index.html';
  function active(href){
    if(inSub && href === 'journal.html') return ' class="active"';
    return (file === href) ? ' class="active"' : '';
  }
  var navMount = document.getElementById('nav');
  if(navMount){
    navMount.outerHTML =
      '<nav class="nav">'
      + '<a class="brand" href="'+pre+'index.html"><span class="mark">V</span><span class="wordmark">Veles Capital<small>Scalable Growth</small></span></a>'
      + '<div class="nav-links">'
      + '<a href="'+pre+'index.html"'+active('index.html')+'>Home</a>'
      + '<a href="'+pre+'services.html"'+active('services.html')+'>What We Do</a>'
      + '<a href="'+pre+'opportunities.html"'+active('opportunities.html')+'>For Investors</a>'
      + '<a href="'+pre+'about.html"'+active('about.html')+'>Team</a>'
      + '<a href="'+pre+'journal.html"'+active('journal.html')+'>Insights</a>'
      + '<a href="'+pre+'contact.html" class="btn btn-gold">Get in touch <span class="arrow">&rarr;</span></a>'
      + '</div>'
      + '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>'
      + '</nav>';
  }

  // sticky nav + progress bar
  var nav=document.querySelector('.nav');
  var bar=document.querySelector('.progress-bar');
  function onScroll(){
    var y=window.scrollY||window.pageYOffset;
    if(nav){nav.classList.toggle('scrolled',y>40);}
    if(bar){
      var h=document.documentElement.scrollHeight-window.innerHeight;
      bar.style.width=(h>0?(y/h)*100:0)+'%';
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // mobile menu
  var toggle=document.querySelector('.nav-toggle');
  var links=document.querySelector('.nav-links');
  if(toggle&&links){
    toggle.addEventListener('click',function(){links.classList.toggle('open');});
    links.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){links.classList.remove('open');});});
  }

  // scroll reveal
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  // count-up stats
  function animateCount(el){
    var target=parseFloat(el.getAttribute('data-count'));
    var suffix=el.getAttribute('data-suffix')||'';
    var prefix=el.getAttribute('data-prefix')||'';
    var dur=1500,start=null;
    function tick(t){
      if(!start)start=t;
      var p=Math.min((t-start)/dur,1);
      var ease=1-Math.pow(1-p,3);
      var val=target*ease;
      el.textContent=prefix+(target%1===0?Math.round(val):val.toFixed(1))+suffix;
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var cio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){animateCount(e.target);cio.unobserve(e.target);}});
  },{threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(function(el){cio.observe(el);});

  // year in footer
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  // ---- investor self-certification gate ----
  var gateBtn=document.getElementById('gateBtn');
  if(gateBtn){
    var checks=document.querySelectorAll('.gate-check');
    function sync(){
      var all=true;
      checks.forEach(function(c){if(!c.checked)all=false;});
      gateBtn.disabled=!all;
    }
    checks.forEach(function(c){c.addEventListener('change',sync);});
    sync();
    gateBtn.addEventListener('click',function(){
      var gate=document.getElementById('gate');
      var vault=document.getElementById('vault');
      if(gate)gate.style.display='none';
      if(vault){
        vault.classList.remove('locked');
        vault.setAttribute('aria-hidden','false');
        window.scrollTo({top:(vault.getBoundingClientRect().top+window.scrollY-90),behavior:'smooth'});
        // re-trigger reveals now visible
        vault.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
      }
    });
  }
})();
