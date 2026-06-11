/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle */
const { useState, useEffect, useRef } = React;

/* ============================ Config ===================================== *
 * Your team fills these in once and everything wires up automatically.
 * Leave a value empty ("") and that feature stays in safe demo mode.       */
window.AM_CONFIG = Object.assign({
  formspreeId:  "xnjydwkn",   // form posts to formspree.io/f/xnjydwkn and emails you
  heroVideoMp4: "",   // e.g. "assets/studio.mp4"  (upload it, then paste path)
  heroImage:    "assets/photos/hero.jpg", // shown when no video is set
  heroPoster:   "",   // optional still image shown before/while the video loads
  ga4Id:        "",   // e.g. "G-XXXXXXX"
  metaPixelId:  "",   // e.g. "123456789012345"
  googleAdsId:  "AW-17691580121",   // Google Ads account (also loaded in every page head)
  googleAdsLabel: "LFifCPO-q7scENmtgPRB", // conversion label — fires on the Thank You page
  reviewsUrl:   "https://share.google/LR0pyaYVrIhL8RW0n",
  instagram:    "https://instagram.com/arthurmurraymtpleasant",
  facebook:     "https://facebook.com/arthurmurraymtpleasant",
}, window.AM_CONFIG || {});

const PHONE = "843-212-7059";
const PHONE_TEL = "+18432127059";
const EMAIL = "team@arthurmurraymtpleasant.com";
const ADDRESS = "1136 Hungryneck Blvd, Suite E, Mount Pleasant, SC 29464";
const MAPS_EMBED = "https://www.google.com/maps?q=" + encodeURIComponent("Arthur Murray Dance Studio of Mt. Pleasant, " + ADDRESS) + "&output=embed";
const MAPS_DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(ADDRESS);

/* ====================== Conversion tracking ============================== *
 * Fires GA4, Meta Pixel and Google Ads events when present. All optional.   */
function trackConversion(name, params) {
  params = params || {};
  try { if (window.gtag) window.gtag('event', name, params); } catch (e) {}
  try { if (window.dataLayer) window.dataLayer.push(Object.assign({ event: name }, params)); } catch (e) {}
  try {
    if (window.fbq) {
      if (name === 'generate_lead') window.fbq('track', 'Lead', params);
      else if (name === 'click_call') window.fbq('track', 'Contact', { method: 'call' });
      else if (name === 'click_text') window.fbq('track', 'Contact', { method: 'text' });
      else window.fbq('trackCustom', name, params);
    }
  } catch (e) {}
  try {
    if (window.gtag && AM_CONFIG.googleAdsId && AM_CONFIG.googleAdsLabel && name === 'generate_lead') {
      window.gtag('event', 'conversion', { send_to: AM_CONFIG.googleAdsId + '/' + AM_CONFIG.googleAdsLabel });
    }
  } catch (e) {}
}
function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    referrer: document.referrer || '',
  };
}

/* ============================== Icons ==================================== */
const Phone = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const MsgIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);
const MailIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>);
const Pin = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>);
const Arrow = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
const FbIcon = (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12z"/></svg>);
const IgIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>);
const Sound = ({ muted }) => muted
  ? (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>)
  : (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>);
const GoogleG = (p) => (<svg viewBox="0 0 48 48" {...p}><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>);

/* ============================ Reviews data =============================== */
/* 100% genuine reviews, transcribed verbatim from the studio's Google Business
 * profile (June 2026). Longer reviews are excerpted; omissions are marked with
 * an ellipsis and no words are altered. Emoji are omitted per brand voice.
 * Dates are derived from Google's "N weeks ago" stamps. */
const REVIEWS = [
  { n: "Debbie", d: "5/25/2026", c: "#3F7E84", t: "Everyone should learn to dance - especially at this studio! Ann Marie and staff are professional and trained to teach in a way that fits your learning style. And, you will have fun while learning a skill that is so good for body and brain. I have been taking lessons for 3 years and love it! The lessons and dance party are always a part of my week that I look forward to." },
  { n: "Susan Wood", d: "5/18/2026", c: "#3E6B3C", t: "The atmosphere at Arthur Murray of Mt Pleasant is warm and welcoming. The instructors are exceptional teachers and they are so supportive. Group classes are fun and accommodate all skill levels. I highly recommend this dance studio\u2026 it's the best in Charleston!" },
  { n: "Sara Hampton", d: "5/11/2026", c: "#2F6DB5", t: "Dancing is such a fun date night! My husband gifted me a package several years ago, and we have loved it ever since! Throw in the weekly party as a fun night to practice\u2026 Highly recommend!" },
  { n: "Linda Canterbury", d: "5/4/2026", c: "#6E4593", t: "I absolutely LOVE dancing at Arthur Murray. The new Mt Pleasant location is convenient and taking lessons here brings me true JOY. Dance lessons are the highlight of my week. I cannot recommend Arthur Murray Mt Pleasant enough. I love it here!" },
  { n: "Katie Knies", d: "1/19/2026", c: "#6B7B82", t: "AnnMarie is truly one of a kind. Whether you want to choreograph a wedding dance, learn salsa or shag, start competing, or you're simply curious and have never danced a day in your life, this is the place to be. AnnMarie and her staff meet you exactly where you are and support you every step of the way. I can't recommend them highly enough." },
  { n: "Crystal Wickersham", d: "3/16/2026", c: "#3A7CA5", t: "I have been taking lessons with AnneMarie and her staff for well over a year. As a 'Senior' with mobility issues I had concerns. AnneMarie and Maria were extremely patient with me and never pushed me to do more than I felt I could safely do. I feel better and stronger than I have in a while, and my doctor always tells me 'Keep Dancing!' I live in Summerville, and it's well worth the drive to Mt Pleasant!" },
  { n: "Matt Costa", d: "2/16/2026", c: "#4A6B82", t: "I was the sort of person who would have 'never been caught dead on the dance floor,' so to speak. AnnMarie helped me change that! As someone who was petrified of dancing, AnnMarie was able to make even the most challenging dances comfortable. Her down-to-earth communication makes you feel like an individual with personal goals rather than a number on a student roster." },
  { n: "David Alexander", d: "2/2/2026", c: "#8A6E5E", t: "When I began taking dance lessons, I did it only for my wife and viewed it a short term commitment. Three years later it has become something we both enjoy and time we value\u2026 She adapts her teaching to your individual learning style, making the lessons fun instead of anxiety producing. I would give Ann Marie more than 5 stars if it were possible!" },
  { n: "Kambridge Montgomery", d: "3/2/2026", c: "#8E6F47", t: "Excellent professional instructors. I've danced with Maria, Charles, and Anne Marie. All are great and bring unique strengths to each dance. They focus on your goals and your interests. Sometimes we are working towards a special occasion and sometimes we just dance for the fun of it. It's a great time for the mind and body. Highly recommend." },
  { n: "uai godwin", d: "1/19/2026", c: "#5A5A5A", t: "The best dance lesson experience! Instructor AnnMarie genuinely understands how to balance the technical details of teaching dances while also making it truly enjoyable for the student. Not an easy feat but she does it with ease! If you want to learn to dance and also enjoy the journey, this is the place!" },
  { n: "Conner Patton", d: "12/8/2025", c: "#2F6DB5", t: "What makes it deserving of 5 stars is the teaching. Whether you are low or high level, the atmosphere of the dance studio is one of welcomed curiosity and fun\u2026 AM Mt Pleasant strikes the perfect balance. With a nearly unnatural skill to understand what every person needs, both in technique and in enjoyment\u2026 Learning is a marathon, and AM Mt Pleasant gives you the mechanics, the fuel, and the desire to keep going. Highly recommend." },
  { n: "dung vo", d: "12/22/2025", c: "#9C3E3E", t: "This is a wonderful experience. A great way to boost self confidence! Recommend for anyone that thought they have two left feet! Could also be a great consistent date night for couples!" },
];
function Stars({ n }) { return (<span>{"\u2605".repeat(n || 5)}</span>); }

/* Nav, Marquee and Footer now live in site/shared.jsx (loaded before this file). */

/* ============================ Hero ======================================= */
/* Highlight reel: curated clips + the seconds to play from each.
 * Filmed vertically on a phone, so each is shown cropped to its centered
 * 9:16 content (the black side-bars are cropped away by object-fit: cover). */
const REEL = [
  { src: "assets/reel/clip9.mp4", start: 6.5,  end: 14.0 }, // striped-shirt couple, the spins (mid)
  { src: "assets/reel/clip5.mp4", start: 2.0,  end: 9.6  }, // couple in black, sunlit salsa
  { src: "assets/reel/clip4.mp4", start: 0.8,  end: 8.0  }, // older couple, joyful swing
];
const REEL_FADE = 1.1; // seconds of cross-fade overlap between clips (gentle dissolve)

/* Two stacked <video>s that cross-fade clip-to-clip for a seamless loop. Used
 * on every device: each element keeps its own decoded frame, so swapping a clip
 * never flashes the poster, and the rAF loop clips each segment to its agreed
 * in/out points. (A single-element player flashed the poster on every reload.) */
function HeroReel() {
  const aRef = useRef(null), bRef = useRef(null);
  useEffect(() => {
    const els = [aRef.current, bRef.current];
    if (!els[0] || !els[1]) return;
    let cur = 0;            // index (0|1) of the element that is visible + playing
    const segOf = [0, 1];   // which REEL segment each element currently holds
    let raf = 0, stopped = false, transitioning = false;

    // Clips are fetched as in-memory blob URLs so they're fully seekable even when
    // the host has no HTTP range support (otherwise currentTime can't jump to a
    // mid-clip start and the clip just plays from 0).
    const urlCache = {};
    const getUrl = async (src) => {
      if (urlCache[src]) return urlCache[src];
      const blob = await (await fetch(src)).blob();
      return (urlCache[src] = URL.createObjectURL(blob));
    };

    // Load element `ei` with REEL[segIndex], seek to its start, decode that frame.
    const prep = async (ei, segIndex) => {
      const el = els[ei], seg = REEL[segIndex % REEL.length];
      segOf[ei] = segIndex % REEL.length;
      const url = await getUrl(seg.src);
      await new Promise((res) => {
        let done = false;
        const finish = () => { if (done) return; done = true; el.removeEventListener('seeked', finish); res(); };
        const seek = () => { el.addEventListener('seeked', finish); try { el.currentTime = seg.start; } catch (e) { finish(); } setTimeout(finish, 1500); };
        if (el.dataset.src !== seg.src) {
          el.dataset.src = seg.src; el.src = url;
          const onReady = () => { el.removeEventListener('loadeddata', onReady); seek(); };
          el.addEventListener('loadeddata', onReady);
          el.load();
        } else { seek(); }
      });
    };

    const begin = async () => {
      await prep(0, 0);
      await prep(1, 1);
      els[0].style.opacity = '1'; els[1].style.opacity = '0';
      try { await els[0].play(); } catch (e) {}
      raf = requestAnimationFrame(loop);
    };

    const loop = async () => {
      if (stopped) return;
      const el = els[cur], seg = REEL[segOf[cur]];
      if (!transitioning && el.currentTime >= seg.end - REEL_FADE) {
        transitioning = true;
        const inc = 1 - cur;                 // incoming element (already prepped a cycle ago)
        const inSeg = REEL[segOf[inc]];
        try { els[inc].currentTime = inSeg.start; } catch (e) {}
        try { await els[inc].play(); } catch (e) {}   // ensure it's PLAYING before we show it
        if (stopped) return;
        els[inc].style.opacity = '1';
        els[cur].style.opacity = '0';
        const outgoing = cur;
        cur = inc;
        setTimeout(async () => {
          if (stopped) return;
          els[outgoing].pause();                         // hide-then-pause the old clip
          await prep(outgoing, segOf[inc] + 1);          // re-arm it for the clip after next
          transitioning = false;
        }, REEL_FADE * 1000);
      }
      raf = requestAnimationFrame(loop);
    };

    begin();
    return () => { stopped = true; cancelAnimationFrame(raf); Object.values(urlCache).forEach(u => { try { URL.revokeObjectURL(u); } catch (e) {} }); };
  }, []);
  return (
    <div className="reel">
      <video ref={aRef} className="reel__v" muted playsInline preload="auto" poster="assets/photos/reel-still.jpg"></video>
      <video ref={bRef} className="reel__v" muted playsInline preload="auto" poster="assets/photos/reel-still.jpg"></video>
    </div>
  );
}

function HeroMedia({ inFrame }) {
  const ref = useRef(null);
  const [muted, setMuted] = useState(true);
  const hasReel = REEL && REEL.length > 0;
  const hasVideo = !!AM_CONFIG.heroVideoMp4;
  useEffect(() => { if (ref.current) ref.current.muted = muted; }, [muted]);
  if (hasReel) {
    return (
      <div className={inFrame ? "" : "hero__media"} style={inFrame ? { position: 'absolute', inset: 0 } : null}>
        <HeroReel />
      </div>
    );
  }
  return (
    <div className={inFrame ? "" : "hero__media"} style={inFrame ? { position: 'absolute', inset: 0 } : null}>
      {hasVideo ? (
        <video ref={ref} autoPlay loop muted playsInline poster={AM_CONFIG.heroPoster || undefined}>
          <source src={AM_CONFIG.heroVideoMp4} type="video/mp4" />
        </video>
      ) : AM_CONFIG.heroImage ? (
        <img src={AM_CONFIG.heroImage} alt="Dancers on the floor at Arthur Murray Mt. Pleasant" />
      ) : (
        <div className="hero__poster-fallback">
          <span>Hero video &mdash; upload your studio MP4</span>
        </div>
      )}
      {hasVideo && !inFrame && (
        <button className="hero__sound" onClick={() => setMuted(m => !m)} aria-label={muted ? "Unmute video" : "Mute video"}>
          <Sound muted={muted} />
        </button>
      )}
    </div>
  );
}

function HeroCopy({ onBook, onLight }) {
  const primaryCls = onLight ? "btn btn--primary" : "btn btn--ondark";
  return (
    <React.Fragment>
      <h1 className="display">Be the confident dancer at <em>every occasion<span className="hl-dot">.</span></em></h1>
      <p className="hero__lede">For the wedding, the cruise, the date nights, or simply because you've waited long enough. We teach adults to dance, no partner or experience needed.</p>
      <div className="hero__actions">
        <a className={primaryCls} href="#start" onClick={onBook}>Request Your Free First Lesson</a>
      </div>
    </React.Fragment>
  );
}

function Hero({ style, onBook }) {
  if (style === 'split') {
    return (
      <section className="hero hero--split" id="top">
        <div className="hero__grid">
          <div className="stack">
            <HeroCopy onBook={onBook} onLight={true} />
          </div>
          <div className="hero__framewrap">
            <div className="hero__frame"><HeroMedia inFrame={true} /></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="hero hero--fullbleed" id="top">
      <HeroMedia inFrame={false} />
      <div className="hero__content">
        <div className="wrap">
          <div className="stack" style={{ maxWidth: 760 }}>
            <HeroCopy onBook={onBook} onLight={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== Value + reassurance ============================== */
function ValueSection({ onBook }) {
  return (
    <section className="section value" id="story">
      <div className="wrap wrap--narrow">
        <h2 className="display">Private lessons, group classes, and weekly parties.</h2>
        <p className="value__lede">Private lessons shape the steps around your goals. Group classes add new patterns and new faces. And our weekly party is where it all comes together: the practice that feels like a night out.</p>
      </div>
    </section>
  );
}

function Reassure() {
  const items = [
    "Your first lesson is on us. No pressure, no commitment.",
    "Patient instructors who teach adults every single day.",
    "A warm, social crowd you'll look forward to seeing each week.",
  ];
  return (
    <section className="section section--alt">
      <div className="wrap">
        <div className="reassure">
          <div className="reassure__media">
            <div className="reassure__photo reassure__photo--arch">
              <img src="assets/photos/nervous.jpg" alt="A smiling couple during a lesson at Arthur Murray Mt. Pleasant" />
            </div>
          </div>
          <div className="reassure__text">
            <p className="eyebrow">Almost everyone is, at first</p>
            <h2 className="display">Nervous? You're in good company.</h2>
            <p>Most students arrive certain they have two left feet, then surprise themselves within the first ten minutes. We keep it patient, relaxed, and genuinely fun.</p>
            <ul className="reassure__list">
              {items.map((t, i) => (
                <li key={i}><span className="reassure__num">{String(i + 1).padStart(2, '0')}</span><span>{t}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ Reviews ==================================== */
function Reviews() {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth <= 600 ? 1 : window.innerWidth <= 920 ? 2 : 3);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  const pages = Math.ceil(REVIEWS.length / perPage);
  useEffect(() => { if (page > pages - 1) setPage(0); }, [pages, page]);
  const go = (d) => setPage(p => (p + d + pages) % pages);
  return (
    <section className="section reviews" id="reviews">
      <div className="wrap">
        <div className="reviews__head">
          <div className="reviews__title">
            <p className="eyebrow">From our students</p>
            <h2 className="display" style={{ marginTop: 14 }}>Hear from our happy dancers.</h2>
          </div>
          <div className="gbadge">
            <GoogleG className="gbadge__logo" />
            <div className="gbadge__score">5.0</div>
            <div className="gbadge__meta">
              <div className="gbadge__stars"><Stars n={5} /></div>
              <a className="gbadge__count" href={AM_CONFIG.reviewsUrl} target="_blank" rel="noopener" onClick={() => trackConversion('click_reviews')}>31 Google reviews &rarr;</a>
            </div>
          </div>
        </div>
        <div className="reviews__viewport">
          <div className="reviews__track" style={{ transform: `translateX(calc(-${page * 100}% - ${page * 24}px))` }}>
            {REVIEWS.map((r, i) => (
              <article className="rcard" key={i}>
                <div className="rcard__top">
                  <div className="rcard__avatar" style={{ background: r.c }}>{r.n[0]}</div>
                  <div className="rcard__who">
                    <div className="rcard__name">{r.n}</div>
                    <div className="rcard__date">{r.d}</div>
                  </div>
                </div>
                <div className="rcard__stars"><Stars n={5} /></div>
                <p className="rcard__body">"{r.t}"</p>
                <div className="rcard__src"><GoogleG className="rcard__g" /> Posted on Google</div>
              </article>
            ))}
          </div>
        </div>
        {pages > 1 ? (
        <div className="reviews__nav">
          <button className="reviews__arrow" onClick={() => go(-1)} aria-label="Previous reviews"><Arrow style={{ width: 18, height: 18, transform: 'rotate(180deg)' }} /></button>
          <div className="reviews__dots">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} className="reviews__dot" aria-current={i === page} aria-label={"Reviews page " + (i + 1)} onClick={() => setPage(i)} />
            ))}
          </div>
          <button className="reviews__arrow" onClick={() => go(1)} aria-label="Next reviews"><Arrow style={{ width: 18, height: 18 }} /></button>
        </div>
        ) : null}
      </div>
    </section>
  );
}

/* ============================ Lead form ================================== */
function ContactChips() {
  return (
    <div className="lead__contacts">
      <a className="chip" href={"tel:" + PHONE_TEL} onClick={() => trackConversion('click_call')}><Phone /> Call</a>
      <a className="chip" href={"sms:" + PHONE_TEL} onClick={() => trackConversion('click_text')}><MsgIcon /> Text</a>
      <a className="chip" href={"mailto:" + EMAIL} onClick={() => trackConversion('click_email')}><MailIcon /> Email</a>
    </div>
  );
}

/* Direct-contact list with the real numbers/address shown (call · text · email) */
function ContactDirect() {
  return (
    <div className="contactdirect">
      <a className="cdrow" href={"tel:" + PHONE_TEL} onClick={() => trackConversion('click_call')}>
        <span className="cdrow__icon"><Phone /></span>
        <span className="cdrow__text"><span className="cdrow__label">Call us</span><span className="cdrow__value">{PHONE}</span></span>
      </a>
      <a className="cdrow" href={"sms:" + PHONE_TEL} onClick={() => trackConversion('click_text')}>
        <span className="cdrow__icon"><MsgIcon /></span>
        <span className="cdrow__text"><span className="cdrow__label">Text us</span><span className="cdrow__value">{PHONE}</span></span>
      </a>
      <a className="cdrow" href={"mailto:" + EMAIL} onClick={() => trackConversion('click_email')}>
        <span className="cdrow__icon"><MailIcon /></span>
        <span className="cdrow__text"><span className="cdrow__label">Email us</span><span className="cdrow__value">{EMAIL}</span></span>
      </a>
    </div>
  );
}

function LeadForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const formRef = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.reportValidity()) return;
    setStatus('sending');
    const data = new FormData(form);
    const utm = getUTMs();
    Object.keys(utm).forEach(k => data.append(k, utm[k]));

    if (!AM_CONFIG.formspreeId) {
      // Demo mode: no endpoint configured yet. Redirect anyway so the flow is reviewable.
      setTimeout(() => goToThankYou('homepage-hero', utm), 700);
      return;
    }
    try {
      const res = await fetch("https://formspree.io/f/" + AM_CONFIG.formspreeId, {
        method: 'POST', body: data, headers: { 'Accept': 'application/json' },
      });
      if (res.ok) goToThankYou('homepage-hero', utm);
      else setStatus('error');
    } catch (err) { setStatus('error'); }
  };

  // On success the page navigates to Thank You.html, where the lead conversion
  // event fires on load. The button stays in its "Sending…" state until then.
  return (
    <form className="form" ref={formRef} onSubmit={submit} noValidate>
      <input type="hidden" name="_subject" value="New lead from arthurmurraymtpleasant.com" />
      <div className="field--row">
        <div className="field">
          <label htmlFor="lf-name">Name <span className="req">*</span></label>
          <input id="lf-name" name="name" type="text" required placeholder="First and last" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="lf-phone">Phone Number <span className="req">*</span></label>
          <input id="lf-phone" name="phone" type="tel" required placeholder="(843) 000-0000" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="lf-email">Email <span className="req">*</span></label>
        <input id="lf-email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="lf-contact">Preferred means of contact <span className="req">*</span></label>
        <div className="field__select">
          <select id="lf-contact" name="preferred_contact" required defaultValue="">
            <option value="" disabled>Choose one&hellip;</option>
            <option value="Email">Email</option>
            <option value="Phone call">Phone call</option>
            <option value="Text message">Text message</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="lf-msg">What brings you in?</label>
        <textarea id="lf-msg" name="message" placeholder="Wedding in the fall, a new hobby, date nights… tell us a little and we'll match you with the right instructor."></textarea>
      </div>
      <div className="form__foot">
        <button className="btn btn--primary form__btn" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status === 'error' && <span className="form__status form__status--err">Something went wrong. Please call or text {PHONE}.</span>}
      </div>
    </form>
  );
}

function LeadSection() {
  return (
    <section className="section lead" id="start">
      <div className="wrap">
        <div className="lead__grid">
          <div className="lead__intro">
            <p className="eyebrow">Get started</p>
            <h2 className="display" style={{ marginTop: 14 }}>Ready? Let's get you started.</h2>
            <hr className="rule-short" />
            <p>Call, text, or email the studio directly, or fill out the form and one of our team members will get in touch with you to schedule your free first lesson.</p>
            <ContactChips />
          </div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

/* ============================ Social ===================================== */
function Social() {
  return (
    <section className="section social" id="follow">
      <div className="wrap">
        <p className="eyebrow">Follow along</p>
        <h2 className="display" style={{ marginTop: 14 }}>See us on Facebook &amp; Instagram.</h2>
        <div className="social__icons">
          <a className="social__icon" href={AM_CONFIG.facebook} target="_blank" rel="noopener" aria-label="Facebook" onClick={() => trackConversion('click_facebook')}><FbIcon /></a>
          <a className="social__icon" href={AM_CONFIG.instagram} target="_blank" rel="noopener" aria-label="Instagram" onClick={() => trackConversion('click_instagram')}><IgIcon /></a>
        </div>
      </div>
    </section>
  );
}

/* ============================ Hours + Map ================================ */
const HOURS = [
  ["Mon", "By appointment"], ["Tue", "9:00 AM – 9:00 PM"], ["Wed", "9:00 AM – 9:00 PM"],
  ["Thu", "9:00 AM – 9:00 PM"], ["Fri", "By appointment"], ["Sat", "9:00 AM – 5:30 PM"], ["Sun", "Closed"],
];
function Hours() {
  const todayIdx = (new Date().getDay() + 6) % 7; // Mon=0
  return (
    <section className="section hours-block" id="hours">
      <div className="wrap">
        <p className="eyebrow">Studio hours</p>
        <h2 className="display" style={{ marginTop: 14 }}>When to find us.</h2>
        <ul className="hours-list">
          {HOURS.map(([d, h], i) => (
            <li key={d} className={i === todayIdx ? "is-today" : ""}>
              <span className="day">{d}</span>
              <span className={h === "Closed" ? "closed" : ""}>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="section visit" id="visit">
      <div className="wrap">
        <div className="visit__grid">
          <div className="visit__info">
            <p className="eyebrow">Find the studio</p>
            <h2 className="display" style={{ marginTop: 14 }}>Visit us in Mt. Pleasant.</h2>
            <div className="visit__addr">
              <div className="visit__name">Arthur Murray Dance Studio of Mt. Pleasant</div>
              <p>1136 Hungryneck Blvd, Suite E<br />Mount Pleasant, SC 29464</p>
            </div>
            <ContactDirect />
            <a className="btn btn--ghost visit__cta" href={MAPS_DIRECTIONS} target="_blank" rel="noopener" onClick={() => trackConversion('click_directions')}><Pin style={{ width: 16, height: 16 }} /> Get Directions</a>
          </div>
          <div className="map">
            <iframe title="Map to Arthur Murray Mt. Pleasant" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ App ======================================== */
function PhotoBand() {
  const go = (e) => { e.preventDefault(); document.getElementById('start').scrollIntoView({ behavior: 'smooth' }); };
  return (
    <section className="photoband">
      <img className="photoband__img" src="assets/photos/band.jpg" alt="A couple dancing at Arthur Murray Mt. Pleasant" />
      <div className="photoband__content">
        <p className="eyebrow photoband__eyebrow">Ready when you are</p>
        <h2 className="display photoband__title">The hardest step<br />is the first one.</h2>
        <a className="btn btn--ondark" href="#start" onClick={go}>Request Your Free First Lesson</a>
      </div>
    </section>
  );
}
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroStyle": "split",
  "headlineType": "serif",
  "formPlacement": "split",
  "sectionOrder": "reviews-first",
  "accent": "brass"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const el = document.documentElement;
    el.dataset.type = t.headlineType;
    el.dataset.form = t.formPlacement;
    el.dataset.accent = t.accent;
  }, [t.headlineType, t.formPlacement, t.accent]);

  /* Arriving with a hash (e.g. the nav "Contact" link -> index.html#start):
   * React renders after the browser's native hash jump, so the target doesn't
   * exist yet on load. Once mounted, scroll to it ourselves. */
  useEffect(() => {
    const id = (window.location.hash || '').replace('#', '');
    if (!id) return;
    let tries = 0;
    const tick = () => {
      const node = document.getElementById(id);
      if (node) { node.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      else if (tries++ < 20) { requestAnimationFrame(tick); }
    };
    requestAnimationFrame(tick);
  }, []);

  const scrollToStart = (e) => { e.preventDefault(); document.getElementById('start').scrollIntoView({ behavior: 'smooth' }); };

  const reviews = <Reviews key="reviews" />;
  const lead = <LeadSection key="lead" />;
  const ordered = t.sectionOrder === 'form-first' ? [lead, reviews] : [reviews, lead];

  return (
    <React.Fragment>
      <Marquee />
      <Nav />
      <Hero style={t.heroStyle} onBook={scrollToStart} />
      <ValueSection onBook={scrollToStart} />
      <Reassure />
      <PhotoBand />
      {ordered}
      <Social />
      <Hours />
      <Visit />
      <Footer />

      <a className="btn btn--primary floatcta" href="#start" onClick={scrollToStart}>Request Free Lesson</a>

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio label="Treatment" value={t.heroStyle} options={["fullbleed", "split"]} onChange={(v) => setTweak('heroStyle', v)} />
        <TweakSection label="Typography" />
        <TweakRadio label="Headlines" value={t.headlineType} options={["serif", "caps"]} onChange={(v) => setTweak('headlineType', v)} />
        <TweakSection label="Lead form" />
        <TweakRadio label="Layout" value={t.formPlacement} options={["section", "split", "float"]} onChange={(v) => setTweak('formPlacement', v)} />
        <TweakRadio label="Order" value={t.sectionOrder} options={["reviews-first", "form-first"]} onChange={(v) => setTweak('sectionOrder', v)} />
        <TweakSection label="Accent" />
        <TweakRadio label="Brass accent" value={t.accent} options={["off", "brass"]} onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
