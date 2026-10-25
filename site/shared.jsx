/* global React */
/* Shared site chrome: the dance marquee, top nav, and footer used by every page.
 * Loaded before each page's own script; components are published to window so the
 * page scripts (which each get their own Babel scope) can render <Nav/> etc. */
const { useState: useNavState, useRef: useSharedRef, useEffect: useNavEffect } = React;

/* Site-wide config available to every page (wedding/gifts/events/faq load only
 * this file). The homepage's app.jsx merges its own keys over this. */
window.AM_CONFIG = Object.assign({
  reviewsUrl: "https://share.google/LR0pyaYVrIhL8RW0n",
  formspreeId: "xnjydwkn",   // forms post to formspree.io/f/xnjydwkn and email the studio
  googleAdsId: "AW-17691580121",            // Google Ads account (also loaded in every page head)
  googleAdsLabel: "LFifCPO-q7scENmtgPRB",   // conversion label — fires on the Thank You page
}, window.AM_CONFIG || {});

const PHONE = "843-212-7059";
const PHONE_TEL = "+18432127059";
const EMAIL = "team@arthurmurraymtpleasant.com";

/* Real page links (used across the whole site) */
const NAV_ITEMS = [
  { href: "index.html", label: "Home" },
  { href: "Wedding Dances.html", label: "Wedding Dances" },
  { href: "Upcoming Events.html", label: "Upcoming Events" },
  { href: "Gift Certificates.html", label: "Gift Certificates" },
  { href: "FAQ.html", label: "FAQ's" },
  { href: "index.html#start", label: "Contact" },
];

function currentFile() {
  const p = (location.pathname.split("/").pop() || "index.html");
  return decodeURIComponent(p) || "index.html";
}
function isActive(href) {
  const target = decodeURIComponent(href.split("#")[0]);
  // "Contact" (index.html#start) shouldn't mark Home active and vice-versa.
  if (href.indexOf("#") !== -1) return false;
  return target === currentFile();
}

const DANCE_STYLES = ["Waltz", "Tango", "Foxtrot", "Viennese Waltz", "Quickstep", "Rumba", "Cha-Cha", "Bolero", "Mambo", "Salsa", "Merengue", "Bachata", "Samba", "East Coast Swing", "West Coast Swing", "Jive", "Hustle", "Carolina Shag", "Country Two-Step", "Nightclub Two-Step", "Argentine Tango", "Paso Doble", "Lindy Hop", "Wedding First Dance"];
function Marquee() {
  const seq = DANCE_STYLES.concat(DANCE_STYLES);
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {seq.map((s, i) => (<span className="marquee__item" key={i}>{s}<span className="marquee__dot">&middot;</span></span>))}
      </div>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useNavState(false);
  const close = () => setOpen(false);
  const dialogRef = useSharedRef(null);
  const btnRef = useSharedRef(null);

  // Real-modal behavior while the mobile menu is open: lock background scroll,
  // move focus into the dialog, trap Tab inside it, close on Escape, and return
  // focus to the hamburger on close.
  useNavEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = btnRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () => Array.from(
      dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter((el) => el.offsetParent !== null);
    const items = focusable();
    (items[0] || dialog).focus();
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
      if (e.key === "Tab") {
        const f = focusable();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (opener) opener.focus();
    };
  }, [open]);

  const left = NAV_ITEMS.slice(0, 3);
  const right = NAV_ITEMS.slice(3);
  const cls = (href) => "nav__link" + (isActive(href) ? " is-active" : "");
  return (
    <nav className={"nav" + (open ? " nav--open" : "")}>
      <div className="nav__inner">
        <div className="nav__links nav__links--left">
          {left.map((it) => (<a key={it.label} className={cls(it.href)} href={it.href} aria-current={isActive(it.href) ? "page" : undefined}>{it.label}</a>))}
        </div>
        <a className="nav__logo" href="index.html" aria-label="Arthur Murray Dance Studio of Mt. Pleasant home">
          <img src="assets/logo-lockup.png" alt="Arthur Murray Dance Studios, Mt. Pleasant" />
        </a>
        <div className="nav__links nav__links--right">
          {right.map((it) => (<a key={it.label} className={cls(it.href)} href={it.href} aria-current={isActive(it.href) ? "page" : undefined}>{it.label}</a>))}
        </div>
        <button className="nav__menu-btn" ref={btnRef} onClick={() => setOpen(o => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <span className="nav__menu-label">{open ? "Close" : "Menu"}</span>
          <span className="nav__menu-rule" aria-hidden="true"></span>
        </button>
      </div>
      {open && (
        <div className="nav__mobile" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Main menu" tabIndex={-1} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <button type="button" className="nav__mobile-close" onClick={close} aria-label="Close menu"><span aria-hidden="true">&#10005;</span></button>
          <div className="nav__mobile-inner">
            <p className="nav__mobile-eyebrow">Arthur Murray Mt. Pleasant</p>
            <div className="nav__mobile-links">
              {NAV_ITEMS.map((it) => (<a key={it.label} href={it.href} onClick={close} aria-current={isActive(it.href) ? "page" : undefined}>{it.label}</a>))}
            </div>
            <div className="nav__mobile-foot">
              <span className="nav__mobile-foot-label">Call or text</span>
              <a className="nav__mobile-phone" href={"tel:" + PHONE_TEL}>{PHONE}</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="index.html" aria-label="Home"><img className="footer__logo" src="assets/logo-lockup.png" alt="Arthur Murray Dance Studios, Mt. Pleasant" /></a>
        <nav className="footer__nav">
          {NAV_ITEMS.map((it) => (<a key={it.label} href={it.href}>{it.label}</a>))}
        </nav>
        <div className="footer__social">
          <a href="https://instagram.com/arthurmurraymtpleasant" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24"><defs><radialGradient id="igGrad" cx="30%" cy="107%" r="150%"><stop offset="0" stopColor="#FDF497"/><stop offset="0.05" stopColor="#FDF497"/><stop offset="0.45" stopColor="#FD5949"/><stop offset="0.6" stopColor="#D6249F"/><stop offset="0.9" stopColor="#285AEB"/></radialGradient></defs><g fill="url(#igGrad)"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></g></svg></a>
          <a href="https://facebook.com/arthurmurraymtpleasant" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07z"/></svg></a>
        </div>
        <div className="footer__bottom">
          <div>© 2026 Arthur Murray Dance Studio of Mt. Pleasant</div>
          <div><em>Teaching the world to dance for over 100 years.</em></div>
        </div>
      </div>
    </footer>
  );
}

/* SiteHeader = marquee + nav, the standard top of every sub-page. */
function SiteHeader() {
  return (<React.Fragment><Marquee /><Nav /></React.Fragment>);
}

/* Contact icons + a shared closing call-to-action used by the sub-pages. */
const PhoneIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const MsgIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);
const MailIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>);

function CTAChips() {
  return (
    <div className="lead__contacts">
      <a className="chip" href={"tel:" + PHONE_TEL}><PhoneIcon /> Call</a>
      <a className="chip" href={"sms:" + PHONE_TEL}><MsgIcon /> Text</a>
      <a className="chip" href={"mailto:" + EMAIL}><MailIcon /> Email</a>
    </div>
  );
}

function ContactCTA({ eyebrow, title, text }) {
  return (
    <section className="pagecta">
      <div className="wrap wrap--narrow">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="display">{title}</h2>
        {text ? <p>{text}</p> : null}
        <div className="pagecta__actions">
          <a className="btn btn--primary" href="index.html#start">Request Your Free First Lesson</a>
        </div>
        <CTAChips />
      </div>
    </section>
  );
}

/* ===================== Shared lead form (sub-pages) ===================== *
 * A self-contained version of the homepage form so Wedding / Gifts / FAQ /
 * Events can each carry their own enquiry form with page-relevant copy.
 * Reads window.AM_CONFIG.formspreeId when present; otherwise demo mode.    */
function getSharedUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
    referrer: document.referrer || '',
  };
}
function sharedTrack(name, params) {
  try { if (window.gtag) window.gtag('event', name, params || {}); } catch (e) {}
  try { if (window.fbq && name === 'generate_lead') window.fbq('track', 'Lead', params || {}); } catch (e) {}
}
/* Redirect to the dedicated confirmation page, forwarding the lead source and
 * any UTM params so the Thank You page can attribute the conversion. */
function goToThankYou(source, utm) {
  const q = new URLSearchParams();
  if (source) q.set('source', source);
  Object.keys(utm || {}).forEach(k => { if (utm[k]) q.set(k, utm[k]); });
  const qs = q.toString();
  window.location.assign('Thank You.html' + (qs ? '?' + qs : ''));
}

/* messageLabel / messagePlaceholder / subject / source are page-specific. */
function ContactForm({ subject, source, messageLabel, messagePlaceholder, contactDefault }) {
  const [status, setStatus] = useNavState('idle'); // idle | sending | sent | error
  const formRef = useSharedRef(null);
  const cfg = window.AM_CONFIG || {};

  const submit = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form.reportValidity()) return;
    setStatus('sending');
    const data = new FormData(form);
    const utm = getSharedUTMs();
    Object.keys(utm).forEach(k => data.append(k, utm[k]));
    if (!cfg.formspreeId) {
      setTimeout(() => goToThankYou(source, utm), 700);
      return;
    }
    try {
      const res = await fetch("https://formspree.io/f/" + cfg.formspreeId, {
        method: 'POST', body: data, headers: { 'Accept': 'application/json' },
      });
      if (res.ok) goToThankYou(source, utm);
      else setStatus('error');
    } catch (err) { setStatus('error'); }
  };

  // On success we navigate to the dedicated Thank You page (the lead event
  // fires there on load, so ads can count it as a conversion). The inline
  // "sending" state keeps the button busy until the redirect happens.
  return (
    <form className="form" ref={formRef} onSubmit={submit} noValidate>
      <input type="hidden" name="_subject" value={subject || "New enquiry from arthurmurraymtpleasant.com"} />
      <input type="hidden" name="source" value={source || ""} />
      <div className="field--row">
        <div className="field">
          <label htmlFor="cf-name">Name <span className="req">*</span></label>
          <input id="cf-name" name="name" type="text" required placeholder="First and last" autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone Number <span className="req">*</span></label>
          <input id="cf-phone" name="phone" type="tel" required placeholder="(843) 000-0000" autoComplete="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email <span className="req">*</span></label>
        <input id="cf-email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-contact">Preferred means of contact <span className="req">*</span></label>
        <div className="field__select">
          <select id="cf-contact" name="preferred_contact" required defaultValue={contactDefault || ""}>
            <option value="" disabled>Choose one&hellip;</option>
            <option value="Email">Email</option>
            <option value="Phone call">Phone call</option>
            <option value="Text message">Text message</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">{messageLabel || "Your message"}</label>
        <textarea id="cf-msg" name="message" placeholder={messagePlaceholder || ""}></textarea>
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

/* Full section: page-relevant intro copy + contact chips + the form. */
function ContactFormSection({ eyebrow, title, text, subject, source, messageLabel, messagePlaceholder, contactDefault, id }) {
  return (
    <section className="section lead" id={id || "start"}>
      <div className="wrap">
        <div className="lead__grid">
          <div className="lead__intro">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 className="display" style={{ marginTop: 14 }}>{title}</h2>
            <hr className="rule-short" />
            {text ? <p>{text}</p> : null}
            <CTAChips />
          </div>
          <ContactForm
            subject={subject}
            source={source}
            messageLabel={messageLabel}
            messagePlaceholder={messagePlaceholder}
            contactDefault={contactDefault}
          />
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Marquee, Nav, Footer, SiteHeader, ContactCTA, ContactForm, ContactFormSection, goToThankYou, PHONE, PHONE_TEL, EMAIL });
