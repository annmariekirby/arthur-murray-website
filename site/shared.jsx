/* global React */
/* Shared site chrome: the dance marquee, top nav, and footer used by every page.
 * Loaded before each page's own script; components are published to window so the
 * page scripts (which each get their own Babel scope) can render <Nav/> etc. */
const { useState: useNavState, useRef: useSharedRef } = React;

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
        <button className="nav__menu-btn" onClick={() => setOpen(o => !o)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          <span className="nav__menu-label">{open ? "Close" : "Menu"}</span>
          <span className="nav__menu-rule" aria-hidden="true"></span>
        </button>
      </div>
      {open && (
        <div className="nav__mobile" role="dialog" aria-modal="true" aria-label="Site menu">
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
