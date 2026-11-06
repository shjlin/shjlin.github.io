/* ============================================================
   Main interactions: theme · language · reveal · nav · misc
   ============================================================ */
(function () {
  "use strict";

  var LANGS = ["en", "zh-HK", "zh-CN"];
  var doc = document.documentElement;

  /* ---------- Theme ---------- */
  function setTheme(mode) {
    doc.setAttribute("data-theme", mode);
    try { localStorage.setItem("theme", mode); } catch (e) {}
  }
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    if (saved === "dark" || saved === "light") setTheme(saved);
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
  })();
  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(doc.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Language ---------- */
  function currentLang() {
    var l = doc.lang;
    return LANGS.indexOf(l) > -1 ? l : "en";
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1 || !window.I18N || !window.I18N[lang]) return;
    var dict = window.I18N[lang];
    doc.lang = lang;
    document.title = dict["meta.title"];
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", dict["meta.desc"]);

    var el, key;
    var texts = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < texts.length; i++) {
      el = texts[i]; key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    }
    var htmls = document.querySelectorAll("[data-i18n-html]");
    for (var j = 0; j < htmls.length; j++) {
      el = htmls[j]; key = el.getAttribute("data-i18n-html");
      if (dict[key] != null) el.innerHTML = dict[key];
    }

    var btns = document.querySelectorAll(".lang-switch [data-lang]");
    for (var k = 0; k < btns.length; k++) {
      var active = btns[k].getAttribute("data-lang") === lang;
      btns[k].classList.toggle("active", active);
      btns[k].setAttribute("aria-pressed", active ? "true" : "false");
    }
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }

  applyLang(currentLang());

  var langBtns = document.querySelectorAll(".lang-switch [data-lang]");
  for (var b = 0; b < langBtns.length; b++) {
    langBtns[b].addEventListener("click", function () {
      applyLang(this.getAttribute("data-lang"));
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  var nav = document.querySelector(".nav");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("show", y > 640);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    for (var r = 0; r < reveals.length; r++) io.observe(reveals[r]);
  } else {
    for (var q = 0; q < reveals.length; q++) reveals[q].classList.add("in");
  }

  /* ---------- Tab pages ---------- */
  var tabLinks = document.querySelectorAll(".nav-links a");
  var panels = document.querySelectorAll(".tab-panel");

  function activateTab(id, scrollTop) {
    var i;
    for (i = 0; i < panels.length; i++) {
      panels[i].classList.toggle("active", panels[i].id === id);
    }
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].classList.toggle("active", tabLinks[i].getAttribute("href") === "#" + id);
    }
    var panel = document.getElementById(id);
    if (panel) {
      var rv = panel.querySelectorAll(".reveal:not(.in)");
      for (i = 0; i < rv.length; i++) rv[i].classList.add("in");
    }
    if (scrollTop !== false) window.scrollTo(0, 0);
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", location.pathname + location.search + "#" + id);
    }
  }

  function tabFromHash() {
    var h = (location.hash || "").slice(1);
    var el = h && document.getElementById(h);
    return (el && el.classList.contains("tab-panel")) ? h : "home";
  }

  for (var tl = 0; tl < tabLinks.length; tl++) {
    tabLinks[tl].addEventListener("click", function (e) {
      e.preventDefault();
      activateTab(this.getAttribute("href").slice(1), true);
    });
  }
  window.addEventListener("hashchange", function () {
    activateTab(tabFromHash(), true);
  });
  activateTab(tabFromHash(), false);

  /* ---------- Copy email ---------- */
  var copyBtns = document.querySelectorAll("[data-copy]");
  for (var c = 0; c < copyBtns.length; c++) {
    copyBtns[c].addEventListener("click", function () {
      var addr = this.getAttribute("data-copy");
      var btn = this;
      function done() {
        btn.classList.add("copied");
        setTimeout(function () { btn.classList.remove("copied"); }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done, done);
      } else {
        var ta = document.createElement("textarea");
        ta.value = addr; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* ---------- To top ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Anchor links to #top ---------- */
  /* Switch back to the About tab, then smooth-scroll. */
  var topAnchors = document.querySelectorAll('a[href="#top"]');
  for (var t = 0; t < topAnchors.length; t++) {
    topAnchors[t].addEventListener("click", function (e) {
      e.preventDefault();
      activateTab("home", false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
