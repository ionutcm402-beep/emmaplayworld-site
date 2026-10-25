/*
 * Emma Play World: builds the home page from config/site.config.js.
 * No content is hard-coded here. To change games, links, availability,
 * videos, screenshots or characters, edit the config file.
 */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { return; }

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S); }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") n.textContent = props[k];
      else if (k === "class") n.className = props[k];
      else n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function svgPlay() {
    var ns = "http://www.w3.org/2000/svg", s = document.createElementNS(ns, "svg"), p = document.createElementNS(ns, "path");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); p.setAttribute("d", "M8 5.5v13l11-6.5z"); s.appendChild(p); return s;
  }
  function parts(name) { var w = name.split(" "); return w; }

  Array.prototype.forEach.call(document.querySelectorAll("[data-cfg]"), function (n) {
    var v = get(n.getAttribute("data-cfg")); if (typeof v === "string" && v) n.textContent = v;
  });

  var games = (Array.isArray(S.games) ? S.games : []).filter(function (g) { return g && g.id && g.name; });
  var chars = Array.isArray(S.characters) ? S.characters : [];
  var channel = (S.youtube && S.youtube.url) || "";

  /* ---------- store badges ---------- */
  var STORES = {
    googlePlay: { label: "Google Play", pre: "GET IT ON", soonPre: "COMING TO",
      valid: /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[A-Za-z0-9._]+/,
      icon: "M12 7v7m-3-3 3 3 3-3" },
    appStore: { label: "App Store", pre: "DOWNLOAD ON THE", soonPre: "COMING TO THE",
      valid: /^https:\/\/apps\.apple\.com\//,
      icon: "M12 8v4l2.5 1.5" }
  };

  /* A store only counts as "available" with a real listing URL. Otherwise it is shown as coming soon. */
  function storeState(kind, cfg) {
    if (!cfg || cfg.status === "hidden") return "hidden";
    if (cfg.status === "available" && STORES[kind].valid.test(cfg.url || "")) return "available";
    return "soon";
  }

  function badgeBody(kind, cfg, soon, gameName) {
    var meta = STORES[kind];
    if (cfg.badge) {
      return el("img", { src: cfg.badge, alt: soon ? meta.label + " version of " + gameName + " coming soon" : "Get " + gameName + " on " + meta.label });
    }
    var icon = svg(meta.icon);
    icon.removeAttribute("viewBox"); icon.setAttribute("viewBox", "0 0 24 24");
    var frame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    frame.setAttribute("x", "6"); frame.setAttribute("y", "2.5"); frame.setAttribute("width", "12"); frame.setAttribute("height", "19"); frame.setAttribute("rx", "3");
    icon.insertBefore(frame, icon.firstChild);
    return el("span", { class: "fallback" }, [icon, el("span", {}, [
      el("small", { text: soon ? meta.soonPre : meta.pre }),
      el("b", { text: meta.label })
    ])]);
  }


  function renderStores(game) {
    var host = el("div", { class: "stores" });
    Object.keys(STORES).forEach(function (kind) {
      var cfg = game.stores && game.stores[kind];
      var st = storeState(kind, cfg);
      if (st === "hidden") return;
      var soon = st === "soon";
      var cls = "badge" + (soon ? " soon" : "") + (cfg.badge ? " has-art" : "");
      var badge = soon
        ? el("div", { class: cls, role: "img", "aria-label": STORES[kind].label + " version of " + game.name + " coming soon, not yet available" }, [badgeBody(kind, cfg, true, game.name)])
        : el("a", { class: cls, href: cfg.url, target: "_blank", rel: "noopener", "aria-label": "Get " + game.name + " on " + STORES[kind].label }, [badgeBody(kind, cfg, false, game.name)]);
      host.appendChild(el("div", { class: "slot" }, [soon ? el("span", { class: "status", text: "Coming soon" }) : null, badge]));
    });
    return host;
  }
  function anyLive(g) { return Object.keys(STORES).some(function (k) { return storeState(k, g.stores && g.stores[k]) === "available"; }); }
  function anySoon(g) { return Object.keys(STORES).some(function (k) { return storeState(k, g.stores && g.stores[k]) === "soon"; }); }

  /* ---------- top navigation ---------- */
  var nav = $("mainNav"); nav.textContent = "";
  games.forEach(function (g) { nav.appendChild(el("a", { href: "#" + g.id, text: g.name })); });
  if (S.brand.contactEmail) nav.appendChild(el("a", { class: "cta", href: "mailto:" + S.brand.contactEmail, text: "Say hello" }));

  /* ---------- hero: one card per product ---------- */
  var picks = $("picks"); picks.textContent = "";
  games.forEach(function (g) {
    var pic = el("span", { class: "pic" }, [g.art && g.art.src ? el("img", { src: g.art.src, alt: g.art.alt || "", width: "900", height: "560" }) : null]);
    var body = el("span", { class: "body" }, [
      el("span", { class: "pill", text: g.kind || "App" }),
      el("h2", { text: g.name }),
      g.tagline ? el("p", { text: g.tagline }) : null,
      anySoon(g) && !anyLive(g) ? el("span", { class: "soon-note", text: "Coming soon" }) : null,
      el("span", { class: "go", text: "Explore " + g.name + " →" })
    ]);
    picks.appendChild(el("a", { class: "pick t-" + g.theme + " rise", href: "#" + g.id }, [pic, body]));
  });
  if (S.brand.banner && S.brand.banner.src) {
    $("hero").appendChild(el("div", { class: "banner rise" }, [el("img", { src: S.brand.banner.src, alt: S.brand.banner.alt || "", width: "1200", height: "675", loading: "lazy" })]));
  }

  /* ---------- one section per product ---------- */
  var viewer = $("viewer");
  function openShot(s) {
    $("viewerImg").src = s.src; $("viewerImg").alt = s.alt || "";
    if (viewer.showModal) viewer.showModal(); else viewer.setAttribute("open", "");
  }
  var closeV = function () { if (viewer.close) viewer.close(); else viewer.removeAttribute("open"); };
  $("viewerClose").addEventListener("click", closeV);
  viewer.addEventListener("click", function (e) { if (e.target === viewer) closeV(); });

  function featuresBlock(g) {
    if (!g.features || !g.features.length) return null;
    var grid = el("div", { class: "feats rise" });
    g.features.forEach(function (f) {
      grid.appendChild(el("div", { class: "feat" }, [
        el("span", { class: "em c-" + (f.color || "pink"), "aria-hidden": "true", text: f.emoji || "★" }),
        el("h3", { text: f.title }), el("p", { text: f.text })
      ]));
    });
    return el("div", {}, [el("h3", { class: "sub", text: g.features.length > 3 ? "What's inside" : "How it works" }), grid]);
  }

  function momentsBlock(g) {
    if (!g.moments || !g.moments.length) return null;
    var box = el("div", { class: "moments rise" });
    g.moments.forEach(function (m) { box.appendChild(el("figure", {}, [el("img", { src: m.src, alt: m.alt || "", loading: "lazy", width: "600", height: "450" })])); });
    return el("div", {}, [el("h3", { class: "sub", text: "A little garden of habits" }), box]);
  }

  function videoBlock(g) {
    var vids = (g.videos || []).filter(function (v) { return v && /^[\w-]{11}$/.test(v.id || ""); });
    if (!vids.length) return null;
    var v = vids[0];
    var screen = el("div", { class: "screen" });
    var poster = el("a", { class: "poster", href: "https://www.youtube.com/watch?v=" + v.id, target: "_blank", rel: "noopener", "aria-label": "Play: " + (v.title || g.name) }, [
      g.cover && g.cover.src ? el("img", { src: g.cover.src, alt: g.cover.alt || "", width: "1280", height: "720", loading: "lazy" }) : null,
      el("span", { class: "playbtn", "aria-hidden": "true" }, [svgPlay()])
    ]);
    if (g.cover && g.cover.src) poster.classList.add("has-cover");
    poster.addEventListener("click", function (e) {
      e.preventDefault();
      screen.appendChild(el("iframe", { src: "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0&playsinline=1",
        allow: "autoplay; encrypted-media; picture-in-picture", allowfullscreen: "", title: v.title || g.name }));
      poster.hidden = true;
    });
    screen.appendChild(poster);
    var cap = el("div", { class: "cap" }, [el("div", {}, [el("strong", { text: v.title || g.name }), el("span", { text: v.note || "Watch on YouTube" })])]);
    if (channel) cap.appendChild(el("a", { class: "btn", href: channel + "?sub_confirmation=1", target: "_blank", rel: "noopener", text: "Subscribe on YouTube" }));
    return el("div", {}, [el("h3", { class: "sub", text: "Watch " + g.name }), el("div", { class: "video rise" }, [screen, cap])]);
  }

  function shotsBlock(g) {
    var shots = (g.screenshots || []).filter(function (s) { return s && s.src; });
    if (!shots.length) return null;
    var row = el("div", { class: "shots rise", role: "list" });
    shots.forEach(function (s) {
      var b = el("button", { type: "button", class: "shot", role: "listitem", "aria-label": "Enlarge: " + (s.alt || g.name + " screenshot") }, [el("img", { src: s.src, alt: s.alt || (g.name + " screenshot"), loading: "lazy" })]);
      b.addEventListener("click", function () { openShot(s); });
      row.appendChild(b);
    });
    return el("div", {}, [el("h3", { class: "sub", text: "Take a peek inside" }), row, el("p", { class: "hint", text: "Tap a picture to see it bigger" })]);
  }

  function trustBlock(g) {
    if (!(g.trust && g.trust.length) && !g.note) return null;
    var kids = [];
    if (g.trust && g.trust.length) { var ul = el("ul", { class: "trust" }); g.trust.forEach(function (t) { ul.appendChild(el("li", { text: t })); }); kids.push(ul); }
    if (g.note) kids.push(el("p", { class: "note", text: g.note }));
    return el("div", { class: "rise", style: "margin-top:30px" }, kids);
  }

  function friendsBlock() {
    var withPoses = chars.filter(function (c) { return c && c.poses && c.poses.length; });
    if (!withPoses.length) return null;
    var duo = el("div", { class: "duo rise" });
    withPoses.forEach(function (f, i) {
      var idx = 0, img = el("img", { src: f.poses[0].src, alt: f.poses[0].alt || f.name, loading: "lazy", width: "500", height: "500" });
      var b = el("button", { class: "fr-card", type: "button", "aria-label": f.name + ": tap to change pose",
        style: "--nc:" + (f.c || "#6a3fe0") + ";--nc2:" + (f.c2 || f.c || "#8a5cf7") + ";--pc:" + (f.pc || "#efe6ff") + ";--tilt:" + (i % 2 ? "3deg" : "-3deg") }, [
        el("span", { class: "fr-glow", "aria-hidden": "true" }),
        el("span", { class: "fr-pic" }, [img]),
        el("span", { class: "fr-tag", text: f.name })
      ]);
      f.poses.forEach(function (ps, k) { if (k) { var pre = new Image(); pre.src = ps.src; } });
      b.addEventListener("click", function () {
        idx = (idx + 1) % f.poses.length;
        img.src = f.poses[idx].src; img.alt = f.poses[idx].alt || f.name;
        b.classList.remove("boing"); void b.offsetWidth; b.classList.add("boing");
        var pop = el("span", { class: "fr-pop", "aria-hidden": "true" });
        var cols = ["#ff6fb5", "#9b5cf0", "#3b9cf0", "#ffd23f", "#3cc56b", "#ff9a3c"];
        for (var q = 0; q < 14; q++) {
          var ang = (q / 14) * 6.283 + Math.random() * 0.4, dist = 70 + Math.random() * 60, sz = 8 + Math.random() * 12;
          pop.appendChild(el("i", { style: "--dx:" + (Math.cos(ang) * dist).toFixed(0) + "px;--dy:" + (Math.sin(ang) * dist - 20).toFixed(0) + "px;width:" + sz.toFixed(0) + "px;height:" + sz.toFixed(0) + "px;--c:" + cols[q % 6] }));
        }
        b.appendChild(pop); setTimeout(function () { if (pop.parentNode) pop.parentNode.removeChild(pop); }, 900);
      });
      duo.appendChild(b);
    });
    return el("div", { id: "friends" }, [el("h3", { class: "sub", text: "Meet Emma's friends" }), el("p", { class: "hintf", text: "Tap a friend to change their pose!" }), duo]);
  }

  var host = $("products"); host.textContent = "";
  games.forEach(function (g) {
    var w = parts(g.name);
    var name = el("h2", { class: "name" }); name.textContent = g.name;
    var copy = el("div", { class: "copy" }, [
      el("span", { class: "pill", text: g.kind || "App" }), name,
      g.tagline ? el("p", { class: "tagline", text: g.tagline }) : null,
      g.intro ? el("p", { class: "intro", text: g.intro }) : null,
      renderStores(g),
      g.privacyUrl ? el("a", { class: "plink", href: g.privacyUrl, text: "Privacy notice for " + g.name }) : null
    ]);
    var art = g.art && g.art.src ? el("div", { class: "art rise" }, [el("img", { src: g.art.src, alt: g.art.alt || "", width: "900", height: "560" })]) : null;
    var sec = el("section", { class: "prod theme-" + g.theme, id: g.id, "aria-label": g.name }, [
      el("div", { class: "wrap" }, [
        el("div", { class: "prod-head" }, [copy, art]),
        featuresBlock(g), momentsBlock(g), videoBlock(g), shotsBlock(g), trustBlock(g), g.friends ? friendsBlock() : null
      ])
    ]);
    host.appendChild(sec);
  });
  if (!games.length) host.hidden = true;

  /* ---------- closing + footer ---------- */
  var ci = S.brand.closingImage;
  if (ci && ci.src) $("closingArt").appendChild(el("img", { src: ci.src, alt: ci.alt || "", width: "900", height: "600", loading: "lazy" })); else $("closingArt").hidden = true;
  $("copy").textContent = "© " + new Date().getFullYear() + " " + (S.brand.name || "") + (S.brand.domain ? " · " + S.brand.domain : "");
  var fn = $("footNav"); fn.textContent = "";
  games.forEach(function (g) { fn.appendChild(el("a", { href: "#" + g.id, text: g.name })); });
  if (S.legal && S.legal.privacyUrl) fn.appendChild(el("a", { href: S.legal.privacyUrl, text: "Privacy" }));
  if (S.legal && S.legal.termsUrl) fn.appendChild(el("a", { href: S.legal.termsUrl, text: "Terms" }));
  if (channel) fn.appendChild(el("a", { href: channel, target: "_blank", rel: "noopener", text: "YouTube" }));
  if (S.brand.contactEmail) $("mail").href = "mailto:" + S.brand.contactEmail; else $("mail").hidden = true;

  /* ---------- gentle rise for things below the fold (content is visible at rest) ---------- */
  try {
    var items = Array.prototype.filter.call(document.querySelectorAll(".rise"), function (n) { return n.getBoundingClientRect().top > window.innerHeight; });
    items.forEach(function (n) { n.classList.add("pre"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    items.forEach(function (n) { io.observe(n); });
  } catch (e) { /* the page works without it */ }
})();

/* Gentle floating bubbles drawn over the artwork pictures (not the game screenshots). */
(function () {
  try {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    function addFx(box, n) {
      if (!box || box.querySelector(".fx")) return;
      var fx = document.createElement("span"); fx.className = "fx"; fx.setAttribute("aria-hidden", "true");
      for (var i = 0; i < n; i++) {
        var b = document.createElement("i"), d = 7 + rnd() * 15;
        b.style.cssText = "left:" + (4 + rnd() * 90).toFixed(1) + "%;top:" + (6 + rnd() * 84).toFixed(1) + "%;width:" + d.toFixed(0) + "px;height:" + d.toFixed(0) +
          "px;animation-duration:" + (4.5 + rnd() * 4).toFixed(1) + "s;animation-delay:-" + (rnd() * 8).toFixed(1) + "s;--sw:" + (rnd() < .5 ? -1 : 1) * (4 + rnd() * 6).toFixed(0) + "px";
        fx.appendChild(b);
      }
      box.appendChild(fx);
    }
    function run() {
      Array.prototype.forEach.call(document.querySelectorAll(".art,.banner,.closing-art,.poster.has-cover,.moments figure"), function (n) { addFx(n, 12); });
      Array.prototype.forEach.call(document.querySelectorAll(".fr-pic"), function (n) { addFx(n, 9); });
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { setTimeout(run, 0); }); else setTimeout(run, 0);
  } catch (e) { /* decoration only */ }
})();
