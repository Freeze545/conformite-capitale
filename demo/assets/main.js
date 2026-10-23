/* Maison Levain — JS minimal, aucun stockage, aucun appel réseau */
(function(){
  var header=document.querySelector('.site-header');
  var banner=document.querySelector('.demo-banner');
  var onScroll=function(){var f=window.scrollY>60;header.classList.toggle('is-fixed',f);header.style.top=f?'':(banner?banner.offsetHeight:0)+'px'};
  window.addEventListener('resize',onScroll);
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var burger=document.querySelector('.burger');
  if(burger){burger.addEventListener('click',function(){
    var open=header.classList.toggle('nav-open');burger.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':'';});
    header.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){header.classList.remove('nav-open');document.body.style.overflow='';burger.setAttribute('aria-expanded','false')})});}

  var els=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});

  // Horaire : jour courant + statut
  var hours={0:[8,16],1:null,2:[7,18],3:[7,18],4:[7,19],5:[7,19],6:[7,17]};
  var now=new Date(),d=now.getDay(),h=now.getHours()+now.getMinutes()/60;
  var row=document.querySelector('#hours tr[data-d="'+d+'"]');if(row)row.classList.add('today');
  var st=document.getElementById('open-status'),t=hours[d];
  if(st){ if(t&&h>=t[0]&&h<t[1]) st.textContent='Ouvert maintenant · jusqu’à '+t[1]+' h';
    else if(t&&h<t[0]) st.textContent='Ouvre aujourd’hui à '+t[0]+' h';
    else st.textContent='Fermé · de retour demain dès 7 h'; }
  var yr=document.getElementById('yr');if(yr)yr.textContent=now.getFullYear();

  // Formulaire : prépare un courriel (mailto), rien n’est envoyé à un serveur
  var f=document.getElementById('contact-form');
  if(f){f.addEventListener('submit',function(ev){
    ev.preventDefault();if(!f.reportValidity())return;
    var v=function(id){return (document.getElementById(id).value||'').trim()};
    var body='Nom : '+v('f-nom')+'\nTéléphone : '+v('f-tel')+'\nDate souhaitée : '+v('f-date')+'\n\n'+v('f-msg');
    location.href='mailto:bonjour@maisonlevain.example?subject='+encodeURIComponent('[Site web] '+v('f-objet'))+'&body='+encodeURIComponent(body);
  });}
})();
