/* VELES CAPITAL — interactions */
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
