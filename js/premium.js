/* HHS Capital: premium layer. Loaded by app.js on every page. Adds type scale, depth and motion on top of the base styles. */
(function(){
  var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
  var css=''
  +':root{--cream:#f5f2ea;--e:cubic-bezier(.16,1,.3,1)}'
  +'html.pm body{animation:pmIn .6s ease both}@keyframes pmIn{from{opacity:.4}to{opacity:1}}'
  +'::selection{background:#c8a24a;color:#0c2a1f}'
  +'.eyebrow{letter-spacing:.02em;text-transform:none;font-size:.98rem;font-weight:500;margin-bottom:20px}'
  +'.hero{min-height:100svh;background:radial-gradient(90% 80% at 85% -10%,#1b5139 0%,#0c2a1f 48%,#06140e 100%)}'
  +'.hero h1,.page-hero h1{font-size:clamp(3rem,6.2vw,5.6rem);letter-spacing:-.045em;line-height:.98;max-width:15ch}.hero{padding:120px 0 70px}'
  +'.page-hero h1{font-size:clamp(2.6rem,6vw,5rem);max-width:16ch}'
  +'.hero p.lead{font-size:clamp(1.1rem,1.6vw,1.34rem);max-width:46ch;margin:32px 0 40px}'
  +'.orb.a{transform:translate(var(--ox,0),var(--oy,0))}.orb.b{opacity:.42}'
  +'section{padding:clamp(84px,11vw,160px) 0}'
  +'.section-head{max-width:820px;margin-bottom:64px}'
  +'.section-head h2,.cta h2,.split h2{font-size:clamp(2.3rem,4.8vw,4.3rem);letter-spacing:-.04em;line-height:1}'
  +'.cta h2{font-size:clamp(2.8rem,6.6vw,6rem)}'
  +'.lead-big{font-size:clamp(1.7rem,3.4vw,2.9rem);letter-spacing:-.03em;line-height:1.14;max-width:18ch}'
  +'.stat .num{font-size:clamp(3rem,5.6vw,5.2rem);letter-spacing:-.04em}'
  +'.card,.step,.post,.founder-card{border-radius:24px}'
  +'.card{padding:44px 36px;box-shadow:0 1px 0 rgba(12,42,31,.04)}'
  +'.card h3{font-size:1.6rem;letter-spacing:-.025em}'
  +'.card,.step,.post{position:relative}'
  +'.card::after,.step::after,.post::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .35s;background:radial-gradient(420px circle at var(--x,50%) var(--y,50%),rgba(200,162,74,.16),transparent 60%)}'
  +'.card:hover::after,.step:hover::after,.post:hover::after{opacity:1}'
  +'.step{padding:36px 28px;background:rgba(255,255,255,.04);backdrop-filter:blur(6px)}'
  +'.step::before{font-size:3.2rem;line-height:1;letter-spacing:-.04em;margin-bottom:22px}'
  +'.step h4{font-size:1.35rem;letter-spacing:-.02em}'
  +'.btn{padding:17px 30px;will-change:transform}'
  +'.btn-gold{box-shadow:0 14px 44px -14px rgba(200,162,74,.75)}'
  +'.reveal{transform:translateY(44px);transition:opacity 1s ease,transform 1.2s var(--e)}'
  +'.pm-w{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.12em;margin-bottom:-.12em}'
  +'.pm-w>span{display:inline-block;transform:translateY(110%) rotate(4deg);transition:transform 1.1s var(--e);transition-delay:calc(var(--i)*60ms)}'
  +'.pm-on .pm-w>span{transform:none}'
  +'.pm-grain{position:fixed;inset:0;z-index:900;pointer-events:none;opacity:.06;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")}'
  +'.pm-cur{position:fixed;left:0;top:0;z-index:950;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#e2c987;mix-blend-mode:difference;pointer-events:none;transition:width .35s var(--e),height .35s var(--e),margin .35s var(--e)}'
  +'.pm-cur.on{width:46px;height:46px;margin:-23px 0 0 -23px}'
  +'.pm-band{overflow:hidden;white-space:nowrap;padding:54px 0;background:#0c2a1f}'
  +'.pm-band div{display:inline-block;font-family:var(--serif);font-weight:600;font-size:clamp(80px,15vw,240px);line-height:.9;letter-spacing:-.05em;color:#f5f2ea;transform:translateX(calc(6% - var(--p,0)*55%));will-change:transform}'
  +'.pm-band em{font-style:normal;color:transparent;-webkit-text-stroke:1.5px rgba(226,201,135,.7)}'
  +'html.lenis,html.lenis body{height:auto;scroll-behavior:auto}'
  +'@media(max-width:720px){.hero h1{font-size:clamp(2.7rem,12vw,3.6rem)}.card{padding:32px 26px}}'
  +'@media(prefers-reduced-motion:reduce){.pm-w>span{transform:none}.pm-band div{transform:none;white-space:normal;font-size:56px}html.pm body{animation:none}}';
  var st=d.createElement('style');st.id='pm-style';st.textContent=css;d.head.appendChild(st);root.classList.add('pm');
  function ready(f){if(d.readyState!=='loading')f();else d.addEventListener('DOMContentLoaded',f)}
  ready(function(){
    var g=d.createElement('div');g.className='pm-grain';g.setAttribute('aria-hidden','true');d.body.appendChild(g);
    // headline words rise in
    var h1=d.querySelector('.hero h1, .page-hero h1');
    if(h1&&!reduce){var i=0;h1.setAttribute('aria-label',h1.textContent.trim());
      [].slice.call(h1.childNodes).forEach(function(n){
        if(n.nodeType===3){var f=d.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w)){f.appendChild(d.createTextNode(' '));return}var o=d.createElement('span');o.className='pm-w';o.style.setProperty('--i',i++);o.setAttribute('aria-hidden','true');var s=d.createElement('span');s.textContent=w;o.appendChild(s);f.appendChild(o)});h1.replaceChild(f,n)}
        else{i++}
      });
      requestAnimationFrame(function(){requestAnimationFrame(function(){h1.classList.add('pm-on')})});
    }
    // a line that slides with the scroll, after the logo strip on the home page
    var logos=d.querySelector('.logos-band');
    if(logos&&logos.parentNode){var b=d.createElement('div');b.className='pm-band';b.setAttribute('aria-hidden','true');b.innerHTML='<div>Scale. <em>Invest.</em> Rebuild. <em>Scale.</em> Invest. <em>Rebuild.</em></div>';logos.parentNode.insertBefore(b,logos.nextSibling);
      if(!reduce){var t=false;var fr=function(){t=false;var r=b.getBoundingClientRect();b.style.setProperty('--p',Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height))).toFixed(4))};addEventListener('scroll',function(){if(!t){t=true;requestAnimationFrame(fr)}},{passive:true});fr()}}
    if(reduce||!fine)return;
    // smooth scrolling
    var ls=d.createElement('script');ls.src='https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js';ls.onload=function(){try{var l=new Lenis({lerp:.09,anchors:true});(function raf(t){l.raf(t);requestAnimationFrame(raf)})(0)}catch(e){}};d.head.appendChild(ls);
    // cursor
    var c=d.createElement('div');c.className='pm-cur';c.setAttribute('aria-hidden','true');d.body.appendChild(c);var cx=0,cy=0,tx=0,ty=0;
    var orb=d.querySelector('.orb.a');
    addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY;if(orb&&scrollY<innerHeight){orb.style.setProperty('--ox',((e.clientX/innerWidth-.5)*60)+'px');orb.style.setProperty('--oy',((e.clientY/innerHeight-.5)*40)+'px')}},{passive:true});
    (function loop(){cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;c.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
    d.addEventListener('pointerover',function(e){var a=e.target.closest&&e.target.closest('a,button,summary,input,select,textarea');c.classList.toggle('on',!!a)});
    // spotlight and magnetic buttons
    d.querySelectorAll('.card,.step,.post').forEach(function(el){el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect();el.style.setProperty('--x',(e.clientX-r.left)+'px');el.style.setProperty('--y',(e.clientY-r.top)+'px')})});
    d.querySelectorAll('.btn').forEach(function(b){b.addEventListener('pointermove',function(e){var r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.2)+'px,'+((e.clientY-r.top-r.height/2)*.3)+'px)'});b.addEventListener('pointerleave',function(){b.style.transform=''})});
  });
})();
