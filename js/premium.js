/* HHS Capital: premium layer behaviour. Styles are in css/premium.css. */
(function(){
  var d=document,root=d.documentElement,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
  root.classList.add('pm');
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
