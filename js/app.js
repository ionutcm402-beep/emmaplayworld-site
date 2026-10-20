/*
 * Emma Play World: builds the page from config/site.config.js.
 * No content is hard-coded here. To change links, availability, videos,
 * characters or games, edit the config file.
 */
(function () {
  "use strict";
  var S = window.SITE;
  if (!S) { return; }
  var COLORS = ["c-pink", "c-orange", "c-yellow", "c-green", "c-blue", "c-purple"];
  var CHIP = ["--b-pink", "--b-blue", "--b-orange", "--b-green", "--b-purple", "--b-yellow"];

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  }
  function el(tag, props, kids) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "text") n.textContent = props[k];
      else if (k === "class") n.className = props[k];
      else if (k === "style") n.setAttribute("style", props[k]);
      else n.setAttribute(k, props[k]);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function svg(path, vb) {
    var ns = "http://www.w3.org/2000/svg";
    var s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", vb || "0 0 24 24"); s.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path"); p.setAttribute("d", path); s.appendChild(p);
    return s;
  }
  var ICONS = {
    play: "M8 5.5v13l11-6.5z",
    star: "M12 2.8l2.8 6 6.5.8-4.8 4.5 1.3 6.4L12 17.2l-5.8 3.3 1.3-6.4L2.7 9.6l6.5-.8z",
    bulb: "M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2zm-2 18h4v1.5a1 1 0 01-1 1h-2a1 1 0 01-1-1z"
  };

  /* ---------- plain text bindings ---------- */
  Array.prototype.forEach.call(document.querySelectorAll("[data-cfg]"), function (n) {
    var v = get(n.getAttribute("data-cfg"));
    if (typeof v === "string" && v) n.textContent = v;
  });

  var games = Array.isArray(S.games) ? S.games : [];
  var main = games.filter(function (g) { return g.featured; })[0] || games[0];
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
    var host = $("stores"); host.textContent = "";
    Object.keys(STORES).forEach(function (kind) {
      var cfg = game.stores && game.stores[kind];
      var st = storeState(kind, cfg);
      if (st === "hidden") return;
      var soon = st === "soon";
      var cls = "badge" + (soon ? " soon" : "") + (cfg.badge ? " has-art" : "");
      var badge = soon
        ? el("div", { class: cls, role: "img", "aria-label": STORES[kind].label + " version coming soon, not yet available" }, [badgeBody(kind, cfg, true, game.name)])
        : el("a", { class: cls, href: cfg.url, target: "_blank", rel: "noopener", "aria-label": "Get " + game.name + " on " + STORES[kind].label }, [badgeBody(kind, cfg, false, game.name)]);
      host.appendChild(el("div", { class: "slot" }, [soon ? el("span", { class: "status soon", text: "Coming soon" }) : null, badge]));
    });
  }

  if (main) {
    $("gameName").textContent = main.name;
    if (main.tagline) $("gameTagline").textContent = main.tagline;
    $("signName").textContent = "";
    var parts = main.name.split(" ");
    $("signName").appendChild(document.createTextNode(parts.slice(0, -1).join(" ") + " "));
    $("signName").appendChild(el("em", { text: parts[parts.length - 1] }));
    renderStores(main);
  }

  /* ---------- video showcase ---------- */
  var screen = $("screen"), poster = $("poster");
  var letters = "ABCDEFGHIJKLMNOPQR".split("");
  letters.forEach(function (l, i) {
    var b = el("b", { text: l, style: "--c:var(" + ["--b-red", "--b-orange", "--b-yellow", "--b-green", "--b-blue", "--b-purple"][i % 6] + ");--i:" + i });
    $("pboard").appendChild(b);
  });
  if (channel) {
    $("ytLink").href = channel; $("subBtn").href = channel + "?sub_confirmation=1"; poster.href = channel;
  } else {
    $("ytLink").hidden = true; $("subBtn").hidden = true;
  }

  var videos = ((main && main.videos) || []).filter(function (v) { return v && /^[\w-]{11}$/.test(v.id || ""); });
  var current = 0;
  function watchUrl(v) { return "https://www.youtube.com/watch?v=" + v.id; }
  function selectVideo(i) {
    current = i; var v = videos[i];
    $("capT").textContent = v.title || main.name;
    $("capS").textContent = v.note || "Watch on YouTube";
    poster.href = watchUrl(v);
    Array.prototype.forEach.call(document.querySelectorAll(".ep"), function (e, k) { e.setAttribute("aria-pressed", String(k === i)); });
    var old = screen.querySelector("iframe"); if (old) old.remove();
    poster.hidden = false;
  }
  function playVideo() {
    var v = videos[current];
    var f = el("iframe", { src: "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0&playsinline=1",
      allow: "autoplay; encrypted-media; picture-in-picture", allowfullscreen: "", title: v.title || main.name });
    screen.appendChild(f); poster.hidden = true;
  }
  if (videos.length) {
    videos.forEach(function (v, i) {
      var ic = el("span", { class: "ic", style: "--c:var(" + CHIP[i % CHIP.length] + ")" }, [svg("M0 0l10 6-10 6z", "0 0 10 12")]);
      var b = el("button", { class: "ep", type: "button", id: "ep" + i }, [ic, el("div", {}, [el("strong", { text: v.title || "Video" }), v.note ? el("span", { text: v.note }) : null])]);
      b.addEventListener("click", function () { selectVideo(i); });
      $("eps").appendChild(b);
    });
    poster.addEventListener("click", function (e) { e.preventDefault(); playVideo(); });
    selectVideo(0);
  } else {
    $("eps").hidden = true;
    if (main) $("capT").textContent = main.name;
    $("capS").textContent = channel ? "Watch on YouTube" : "";
    if (!channel) poster.removeAttribute("href");
  }

  /* Real screenshots, only when supplied in the config. Tap one to enlarge it. */
  var shots = ((main && main.screenshots) || []).filter(function (s) { return s && s.src; });
  if (shots.length) {
    var viewer = $("viewer");
    shots.forEach(function (s) {
      var img = el("img", { src: s.src, alt: s.alt || (main.name + " screenshot"), loading: "lazy" });
      var b = el("button", { type: "button", class: "shot", role: "listitem", "aria-label": "Enlarge: " + (s.alt || main.name + " screenshot") }, [img]);
      b.addEventListener("click", function () {
        $("viewerImg").src = s.src; $("viewerImg").alt = s.alt || "";
        if (viewer.showModal) viewer.showModal(); else viewer.setAttribute("open", "");
      });
      $("shots").appendChild(b);
    });
    var closeV = function () { if (viewer.close) viewer.close(); else viewer.removeAttribute("open"); };
    $("viewerClose").addEventListener("click", closeV);
    viewer.addEventListener("click", function (e) { if (e.target === viewer) closeV(); });
    $("gallery").hidden = false; $("navGallery").hidden = false;
  }

  /* ---------- the game: letter board ---------- */
  var board = main && main.board;
  if (board) {
    var t = $("learnTitle"); t.textContent = "";
    t.appendChild(document.createTextNode((board.title || "") + " "));
    if (board.titleAccent) t.appendChild(el("em", { text: board.titleAccent }));
    if (board.intro) $("learnIntro").textContent = board.intro;
    (board.features || []).forEach(function (f) {
      var fi = el("span", { class: "fi c-" + (f.color || "pink") }, [svg(ICONS[f.icon] || ICONS.star)]);
      $("feats").appendChild(el("div", { class: "feat" }, [fi, el("b", { text: f.title }), el("span", { text: f.text })]));
    });
    (board.keys || []).forEach(function (k, i) {
      var b = el("button", { class: "pp-bubble " + COLORS[i % 6], type: "button", "aria-label": "Pop " + k, style: "--i:" + i, text: k });
      b.addEventListener("click", function () {
        b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
        var r = b.getBoundingClientRect();
        if (window.burst) window.burst(r.left + r.width / 2, r.top + r.height / 2, 10);
      });
      b.addEventListener("animationend", function (e) { if (e.animationName === "pop") b.classList.remove("pop"); });
      $("board").appendChild(b);
    });
  } else {
    $("game").hidden = true;
  }

  /* ---------- Emma's friends ---------- */
  var chars = Array.isArray(S.characters) ? S.characters : [];
  if (!chars.length) {
    $("friends").hidden = true;
  } else {
    var picker = $("picker"), spot = $("spot"), spotImg = $("spotImg"), stage = $("stage");
    var cur = 0, auto = null, reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    var pickFriend = function (i, burst) {
      cur = (i + chars.length) % chars.length; var f = chars[cur];
      spotImg.classList.add("out");
      setTimeout(function () { spotImg.src = f.img; spotImg.alt = f.name; spotImg.classList.remove("out"); }, 180);
      var nm = $("frName"); nm.textContent = f.name; nm.style.setProperty("--nc", f.c || "");
      $("frCount").textContent = (cur + 1) + " of " + chars.length;
      var say = $("spotSay"); say.hidden = !f.say; say.textContent = f.say || "";
      stage.style.setProperty("--tint", f.pc || "#efe6ff");
      Array.prototype.forEach.call(picker.children, function (b, k) {
        b.setAttribute("aria-pressed", String(k === cur)); b.style.setProperty("--nc2", chars[k].c || "");
      });
      spot.classList.remove("boing"); void spot.offsetWidth; spot.classList.add("boing");
      if (burst && window.burst) { var r = spot.getBoundingClientRect(); window.burst(r.left + r.width / 2, r.top + r.height / 2, 22); }
    };
    var userPick = function (i) { if (auto) { clearInterval(auto); auto = null; } pickFriend(i, true); };
    chars.forEach(function (f, i) {
      var b = el("button", { class: "pick", type: "button", id: "pick" + i, "aria-label": f.name, style: "--pc:" + (f.pc || "#ece2ff") }, [
        el("span", { class: "av" }, [el("img", { src: f.thumb || f.img, alt: "", loading: "lazy" })]),
        el("span", { class: "nm", text: f.name })
      ]);
      b.addEventListener("click", function () { userPick(i); });
      picker.appendChild(b);
    });
    $("prevF").addEventListener("click", function () { userPick(cur - 1); });
    $("nextF").addEventListener("click", function () { userPick(cur + 1); });
    var sx = null;
    spot.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    spot.addEventListener("touchend", function (e) {
      if (sx == null) return; var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) userPick(cur + (dx < 0 ? 1 : -1)); sx = null;
    });
    pickFriend(0, false);
    if (!reduce) auto = setInterval(function () { pickFriend(cur + 1, false); }, 4500);
  }

  /* ---------- more games (every game that is not the featured one) ---------- */
  var others = games.filter(function (g) { return g !== main; });
  if (others.length) {
    others.forEach(function (g) {
      var live = Object.keys(STORES).filter(function (k) { return storeState(k, g.stores && g.stores[k]) === "available"; })[0];
      var card = el(live ? "a" : "article", { class: "game", style: g.gradient ? "--g:" + g.gradient : "" }, [
        el("span", { class: "when", text: live ? "Available now" : "Coming soon" }),
        el("i", { style: "width:96px;height:96px;right:26px;top:36px" }),
        el("i", { style: "width:46px;height:46px;right:120px;top:22px;animation-delay:-3s" }),
        el("h3", { text: g.name }),
        g.tagline ? el("p", { text: g.tagline }) : null
      ]);
      if (live) { card.href = g.stores[live].url; card.target = "_blank"; card.rel = "noopener"; card.setAttribute("aria-label", g.name + " on " + STORES[live].label); }
      $("moreGames").appendChild(card);
    });
    $("games").hidden = false; $("navGames").hidden = false;
  }

  /* ---------- footer ---------- */
  $("copy").textContent = "© " + new Date().getFullYear() + " " + (S.brand.name || "") + (S.brand.domain ? " · " + S.brand.domain : "");
  var nav = $("footNav");
  [["Watch", "#watch"], ["The game", "#game"]].concat(shots.length ? [["Gallery", "#gallery"]] : [], [["Friends", "#friends"]], others.length ? [["More games", "#games"]] : []).forEach(function (l) { nav.appendChild(el("a", { href: l[1], text: l[0] })); });
  if (S.legal && S.legal.privacyUrl) nav.appendChild(el("a", { href: S.legal.privacyUrl, text: "Privacy", rel: "noopener" }));
  if (S.legal && S.legal.termsUrl) nav.appendChild(el("a", { href: S.legal.termsUrl, text: "Terms", rel: "noopener" }));
  if (S.brand.contactEmail) $("mail").href = "mailto:" + S.brand.contactEmail; else $("mail").hidden = true;

  /* ---------- gentle rise for sections below the fold (content is visible at rest) ---------- */
  try {
    var items = Array.prototype.filter.call(document.querySelectorAll(".rise"), function (n) { return n.getBoundingClientRect().top > window.innerHeight; });
    items.forEach(function (n) { n.classList.add("pre"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("pre"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    items.forEach(function (n) { io.observe(n); });
  } catch (e) { /* the page works without it */ }
})();
