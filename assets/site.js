/* Arthur Murray Mt. Pleasant: site behavior (plain JS, no framework).
   All page content is in the HTML; this file only adds interactivity. */
(function () {
  "use strict";
  var CFG = {
    formspreeId: "xnjydwkn",
    googleAdsId: "AW-17691580121",
    googleAdsLabel: "LFifCPO-q7scENmtgPRB"
  };
  var PHONE = "843-212-7059";
  var isHome = document.body.getAttribute("data-page") === "home";

  /* ---------- Tracking ---------- */
  function track(name, params) {
    params = params || {};
    try { if (window.gtag) window.gtag("event", name, params); } catch (e) {}
    try { if (window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, params)); } catch (e) {}
    try {
      if (window.fbq) {
        if (name === "generate_lead") window.fbq("track", "Lead", params);
        else if (name === "click_call") window.fbq("track", "Contact", { method: "call" });
        else if (name === "click_text") window.fbq("track", "Contact", { method: "text" });
        else window.fbq("trackCustom", name, params);
      }
    } catch (e) {}
  }
  function utms() {
    var p = new URLSearchParams(location.search);
    return { utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "", utm_campaign: p.get("utm_campaign") || "", referrer: document.referrer || "" };
  }
  if (isHome) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var h = a.getAttribute("href");
      if (a.closest(".nav, .footer")) return;
      if (h.indexOf("tel:") === 0) track("click_call");
      else if (h.indexOf("sms:") === 0) track("click_text");
      else if (h.indexOf("mailto:") === 0) track("click_email");
      else if (a.classList.contains("gbadge__count")) track("click_reviews");
      else if (a.classList.contains("visit__cta")) track("click_directions");
    });
  }

  /* ---------- Smooth scroll to the booking form ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href="#start"]');
    if (!a) return;
    var t = document.getElementById("start");
    if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Mobile menu (modal dialog) ---------- */
  var nav = document.querySelector(".nav");
  var btn = nav && nav.querySelector(".nav__menu-btn");
  if (nav && btn) {
    var links = nav.querySelectorAll(".nav__links a");
    var dialog = null, prevOverflow = "";
    var focusable = function () {
      return Array.prototype.filter.call(dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'), function (el) { return el.offsetParent !== null; });
    };
    var onKey = function (e) {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "Tab") {
        var f = focusable(); if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    var setBtn = function (open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      btn.querySelector(".nav__menu-label").textContent = open ? "Close" : "Menu";
      nav.classList.toggle("nav--open", open);
    };
    var open = function () {
      dialog = document.createElement("div");
      dialog.className = "nav__mobile";
      dialog.setAttribute("role", "dialog");
      dialog.setAttribute("aria-modal", "true");
      dialog.setAttribute("aria-label", "Main menu");
      dialog.tabIndex = -1;
      var html = '<button type="button" class="nav__mobile-close" aria-label="Close menu"><span aria-hidden="true">&#10005;</span></button><div class="nav__mobile-inner"><p class="nav__mobile-eyebrow">Arthur Murray Mt. Pleasant</p><div class="nav__mobile-links">';
      Array.prototype.forEach.call(links, function (l) {
        html += '<a href="' + l.getAttribute("href") + '"' + (l.getAttribute("aria-current") ? ' aria-current="page"' : "") + ">" + l.textContent + "</a>";
      });
      html += '</div><div class="nav__mobile-foot"><span class="nav__mobile-foot-label">Call or text</span><a class="nav__mobile-phone" href="tel:+18432127059">' + PHONE + "</a></div></div>";
      dialog.innerHTML = html;
      nav.appendChild(dialog);
      dialog.addEventListener("click", function (e) {
        if (e.target === dialog || e.target.closest(".nav__mobile-close") || e.target.closest(".nav__mobile-links a")) close();
      });
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
      setBtn(true);
      var f = focusable(); (f[0] || dialog).focus();
    };
    var close = function () {
      if (!dialog) return;
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      dialog.remove(); dialog = null;
      setBtn(false);
      btn.focus();
    };
    btn.addEventListener("click", function () { dialog ? close() : open(); });
  }

  /* ---------- Hero slideshow (cross-fade) ---------- */
  var slides = document.querySelectorAll(".reel .reel__v");
  if (slides.length > 1) {
    var idx = 0;
    setInterval(function () {
      slides[idx].style.opacity = 0;
      idx = (idx + 1) % slides.length;
      slides[idx].style.opacity = 1;
    }, 4200);
  }

  /* ---------- Reviews carousel ---------- */
  var rv = document.querySelector(".reviews");
  if (rv) {
    var track = rv.querySelector(".reviews__track");
    var cards = track.querySelectorAll(".rcard");
    var navEl = rv.querySelector(".reviews__nav");
    var dotsEl = rv.querySelector(".reviews__dots");
    var page = 0, perPage = 3, pages = 1;
    var render = function () {
      track.style.transform = "translateX(calc(-" + page * 100 + "% - " + page * 24 + "px))";
      Array.prototype.forEach.call(dotsEl.children, function (d, i) { d.setAttribute("aria-current", i === page ? "true" : "false"); });
    };
    var calc = function () {
      perPage = window.innerWidth <= 600 ? 1 : window.innerWidth <= 920 ? 2 : 3;
      var np = Math.ceil(cards.length / perPage);
      if (np !== pages || !dotsEl.children.length) {
        pages = np;
        dotsEl.innerHTML = "";
        for (var i = 0; i < pages; i++) {
          var b = document.createElement("button");
          b.className = "reviews__dot";
          b.setAttribute("aria-label", "Reviews page " + (i + 1));
          (function (n) { b.addEventListener("click", function () { page = n; render(); }); })(i);
          dotsEl.appendChild(b);
        }
      }
      if (page > pages - 1) page = 0;
      navEl.style.display = pages > 1 ? "" : "none";
      render();
    };
    var arrows = rv.querySelectorAll(".reviews__arrow");
    arrows[0].addEventListener("click", function () { page = (page - 1 + pages) % pages; render(); });
    arrows[1].addEventListener("click", function () { page = (page + 1) % pages; render(); });
    calc();
    window.addEventListener("resize", calc);
  }

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var faqItems = document.querySelectorAll(".faq__item");
  Array.prototype.forEach.call(faqItems, function (item) {
    item.querySelector(".faq__q").addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      Array.prototype.forEach.call(faqItems, function (o) {
        o.classList.remove("is-open");
        o.querySelector(".faq__q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        item.querySelector(".faq__q").setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Forms → Formspree → Thank You page ---------- */
  function goToThankYou(source, u) {
    var q = new URLSearchParams();
    if (source) q.set("source", source);
    Object.keys(u || {}).forEach(function (k) { if (u[k]) q.set(k, u[k]); });
    var qs = q.toString();
    location.assign("Thank You.html" + (qs ? "?" + qs : ""));
  }
  Array.prototype.forEach.call(document.querySelectorAll("form.form"), function (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var srcInput = form.querySelector('input[name="source"]');
    var source = srcInput ? srcInput.value : "homepage-hero";
    var label = submitBtn.textContent;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var err = form.querySelector(".form__status--err");
      if (err) err.remove();
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending\u2026";
      var data = new FormData(form);
      var u = utms();
      Object.keys(u).forEach(function (k) { data.append(k, u[k]); });
      var fail = function () {
        submitBtn.disabled = false;
        submitBtn.textContent = label;
        var s = document.createElement("span");
        s.className = "form__status form__status--err";
        s.textContent = "Something went wrong. Please call or text " + PHONE + ".";
        submitBtn.parentNode.appendChild(s);
      };
      fetch("https://formspree.io/f/" + CFG.formspreeId, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) { if (res.ok) goToThankYou(source, u); else fail(); })
        .catch(fail);
    });
  });

  /* ---------- Thank You page: count the lead conversion once ---------- */
  if (document.body.getAttribute("data-page") === "thank-you") {
    var p = new URLSearchParams(location.search);
    var params = { source: p.get("source") || "website", utm_source: p.get("utm_source") || "", utm_medium: p.get("utm_medium") || "", utm_campaign: p.get("utm_campaign") || "" };
    try { if (window.gtag) window.gtag("event", "generate_lead", params); } catch (e) {}
    try { if (window.dataLayer) window.dataLayer.push(Object.assign({ event: "generate_lead" }, params)); } catch (e) {}
    try { if (window.fbq) window.fbq("track", "Lead", params); } catch (e) {}
    try { if (window.gtag) window.gtag("event", "conversion", { send_to: CFG.googleAdsId + "/" + CFG.googleAdsLabel }); } catch (e) {}
  }
})();
