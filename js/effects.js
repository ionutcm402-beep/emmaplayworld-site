/* Emma Play World: visual effects only (no site content lives here). */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Bouncing, softly coloured letters in the headline word. */
  var em = document.getElementById("wobble");
  if (em) {
    var cols = ["#8a5cf7", "#7d5ff6", "#6f63f5", "#6a6df5", "#8a62ee", "#c463d6", "#ff6fb5", "#ff6fb5"];
    var word = em.textContent;
    em.setAttribute("aria-label", word);
    em.textContent = "";
    Array.prototype.forEach.call(word, function (ch, i) {
      var s = document.createElement("span");
      s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i);
      s.style.color = cols[Math.min(i, cols.length - 1)];
      s.textContent = ch;
      em.appendChild(s);
    });
  }

  /* Floating bubbles that rise, wobble and pop when tapped. */
  var cv = document.getElementById("fizz");
  if (!cv || !cv.getContext) return;
  var cx = cv.getContext("2d");
  var HUES = ["#ff6fb5", "#9b5cf0", "#3b9cf0", "#ffd23f", "#3cc56b", "#ff9a3c"];
  var W, H, dpr, bubs = [], parts = [];

  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function count() { return Math.round(Math.min(26, W / 34)); }
  function make(y) {
    var r = 3 + Math.random() * 9;
    return { x: Math.random() * W, y: y == null ? H + r + Math.random() * H * 0.3 : y, r: r,
             v: 0.25 + Math.random() * 0.55, ph: Math.random() * 6.28, c: HUES[(Math.random() * 6) | 0] };
  }
  function drawBub(b) {
    var g = cx.createRadialGradient(b.x - b.r * 0.35, b.y - b.r * 0.4, b.r * 0.1, b.x, b.y, b.r);
    g.addColorStop(0, "rgba(255,255,255,.85)");
    g.addColorStop(0.35, b.c + "33");
    g.addColorStop(0.9, b.c + "55");
    g.addColorStop(1, b.c + "88");
    cx.fillStyle = g; cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, 7); cx.fill();
    cx.strokeStyle = "rgba(255,255,255,.7)"; cx.lineWidth = 1; cx.stroke();
  }

  /* Used by the page to add a little burst (letter bubbles, friend picker). */
  window.burst = function (x, y, n, col) {
    n = n || 12;
    for (var i = 0; i < n; i++) {
      var a = Math.random() * 6.28, s = 1.5 + Math.random() * 3.5;
      parts.push({ x: x, y: y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1, life: 1, r: 2 + Math.random() * 4,
                   c: col || HUES[(Math.random() * 6) | 0] });
    }
  };

  size();
  window.addEventListener("resize", size);
  for (var i = 0; i < count(); i++) bubs.push(make(Math.random() * H));

  window.addEventListener("pointerdown", function (e) {
    if (reduce) return;
    if (e.target.closest && e.target.closest("a,button,iframe")) return;
    for (var k = bubs.length - 1; k >= 0; k--) {
      var b = bubs[k];
      if (Math.hypot(e.clientX - b.x, e.clientY - b.y) < b.r + 14) {
        window.burst(b.x, b.y, 14, b.c); bubs.splice(k, 1); bubs.push(make()); return;
      }
    }
    window.burst(e.clientX, e.clientY, 8);
  });

  var t = 0;
  function tick() {
    t += 1;
    cx.clearRect(0, 0, W, H);
    while (bubs.length < count()) bubs.push(make());
    bubs.forEach(function (b) {
      b.y -= b.v; b.x += Math.sin(t * 0.02 + b.ph) * 0.35;
      if (b.y < -b.r - 10) Object.assign(b, make());
      drawBub(b);
    });
    for (var j = parts.length - 1; j >= 0; j--) {
      var p = parts[j];
      p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.025;
      if (p.life <= 0) { parts.splice(j, 1); continue; }
      cx.globalAlpha = p.life; cx.fillStyle = p.c;
      cx.beginPath(); cx.arc(p.x, p.y, p.r * p.life + 0.5, 0, 7); cx.fill();
      cx.globalAlpha = 1;
    }
    requestAnimationFrame(tick);
  }
  if (reduce) { bubs.forEach(drawBub); } else { tick(); }
})();
