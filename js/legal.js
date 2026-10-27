document.getElementById("y").textContent=new Date().getFullYear();
/* the purple button follows the section you tapped or are reading */
(function () {
  var links = document.querySelectorAll('.pick a'), web = document.getElementById('website'), app = document.getElementById('app');
  if (!links.length || !web || !app) return;
  function mark(which) { links.forEach(function (a) { if (a.getAttribute('data-k') === which) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }); }
  links[0].setAttribute('data-k', 'website'); links[1].setAttribute('data-k', 'app'); links[2].setAttribute('data-k', 'bloom');
  function fromScroll() { mark(app.getBoundingClientRect().top < window.innerHeight * 0.4 ? 'app' : 'website'); }
  links[0].addEventListener('click', function () { mark('website'); });
  links[1].addEventListener('click', function () { mark('app'); });
  function fromHash() { if (location.hash === '#app') mark('app'); else if (location.hash === '#website') mark('website'); }
  fromHash(); window.addEventListener('hashchange', fromHash); window.addEventListener('load', function () { setTimeout(fromScroll, 150); });
  var t = null; window.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(fromScroll, 80); }, { passive: true });
})();
