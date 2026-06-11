/* global React, ReactDOM, SiteHeader, Footer, ContactFormSection */
const { useState, useEffect } = React;

const TICKETS_URL = "https://datenight.simplelovecounseling.com/";
const DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent("1136 Hungryneck Blvd, Suite E, Mount Pleasant, SC 29464");
const GRAND_OPENING = new Date("2026-07-19T11:00:00-04:00");

/* Line icons (Lucide-style, 1.6px stroke) for the "what's included" grid. */
const IcoMusic = (p) => (<svg className="incl__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>);
const IcoHeart = (p) => (<svg className="incl__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>);
const IcoUsers = (p) => (<svg className="incl__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>);
const IcoWine = (p) => (<svg className="incl__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 22h8"/><path d="M7 10h10"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-1-7H8c-.5 3-1 5-1 7a5 5 0 0 0 5 5Z"/></svg>);
const Check = (p) => (<svg className="forif__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>);

const INCLUDES = [
  { Ico: IcoMusic, title: "Dance + Movement", text: "Led by the instructors at Arthur Murray Dance Studio of Mt. Pleasant." },
  { Ico: IcoHeart, title: "Communication Games", text: "Guided by a licensed marriage & family therapist from Simple Love Counseling." },
  { Ico: IcoUsers, title: "An Intimate Group", text: "Just 12 couples, so the room stays cozy and the conversation stays real." },
  { Ico: IcoWine, title: "Food + Refreshments", text: "Light bites, beer, and wine, all included with your spot." },
];

const FOR_YOU_IF = [
  "You are tired of dinner-and-a-movie being the whole plan",
  "You want to have fun and feel more connected at the same time",
  "You wonder where the breakdowns are in your communication",
  "You have never danced together and want to try something new",
  "You want an activity that makes you feel more \u201cin tune\u201d and intimate",
  "You just want to have fun and learn something together",
];

const SCHEDULE = [
  ["Carolina Shag & Swing", "11:00"],
  ["Country Two-Step & Line Dancing", "11:45"],
  ["Wedding First Dance & Reception", "12:30"],
  ["Salsa & Bachata", "1:15"],
];

function Countdown({ target }) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    const s = Math.floor(diff / 1000);
    return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n) => String(n).padStart(2, '0');
  const cells = [["Days", t.days], ["Hours", pad(t.hours)], ["Minutes", pad(t.minutes)], ["Seconds", pad(t.seconds)]];
  return (
    <div className="countdown">
      {cells.map(([label, val]) => (
        <div className="cd" key={label}>
          <div className="cd__num">{val}</div>
          <div className="cd__label">{label}</div>
        </div>
      ))}
    </div>
  );
}

function EventMasthead({ eyebrow, title, mon, day, year }) {
  return (
    <header className="evt-head">
      <div className="evt-head__lead">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="evt-head__title">{title}</h2>
      </div>
      <div className="evt-head__date" aria-hidden="true">
        <span className="evt-head__mon">{mon}</span>
        <span className="evt-head__day">{day}</span>
        <span className="evt-head__yr">{year}</span>
      </div>
    </header>
  );
}

function EventsPage() {
  return (
    <React.Fragment>
      <SiteHeader />
      <section className="pagehead">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">On the calendar</p>
          <h1 className="display">Upcoming events</h1>
          <hr className="rule-short" />
          <p className="pagehead__lede">From time to time we open our doors to the public: a couples workshop, a studio celebration, a themed dance party. Here is what is coming up next.</p>
        </div>
      </section>

      {/* ===================== EVENT FLYERS ===================== */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="flyers">

            {/* FLYER 1: Couples Workshop */}
            <article className="flyer">
              <div className="flyer__media">
                <img className="flyer__photo" src="assets/photos/evt-language.webp" alt="A couple dancing together at home" loading="lazy" />
              </div>
              <div className="flyer__body">
                <div className="flyer__date"><span className="flyer__day">28</span><span className="flyer__mon">June<br/>2026</span></div>
                <p className="eyebrow">Couples Workshop &middot; with Simple Love Counseling</p>
                <h2 className="flyer__title">The Language Between Us</h2>
                <p className="flyer__tagline">Part dance, part conversation, and entirely unlike any date night you have had before.</p>
                <p className="flyer__meta"><span>Sun, June 28</span><span className="dot">&middot;</span><span>1:00–3:00 PM</span><span className="dot">&middot;</span><span>At the studio</span></p>
                <p className="flyer__desc">Led together by our instructors and a licensed couples therapist, you will build real communication skills through games, guided activities, and movement. Expect laughter, a few aha moments, and a dance lesson you will actually remember. No experience required.</p>
                <ul className="flyer__incl">
                  {INCLUDES.map((it, i) => { const Ico = it.Ico; return (<li key={i}><Ico /><span>{it.title}</span></li>); })}
                </ul>
                <div className="flyer__foot">
                  <a className="btn btn--primary" href={TICKETS_URL} target="_blank" rel="noopener">Reserve Your Spot &rarr;</a>
                  <p className="flyer__fine">Just 12 couples. Light bites, beer &amp; wine included.</p>
                </div>
              </div>
            </article>

            {/* FLYER 2: Grand Opening (ink poster) */}
            <article className="flyer flyer--ink">
              <div className="flyer__body">
                <div className="flyer__date"><span className="flyer__day">19</span><span className="flyer__mon">July<br/>2026</span></div>
                <p className="eyebrow">Studio Celebration &middot; Open House</p>
                <h2 className="flyer__title">Our Grand Opening</h2>
                <p className="flyer__tagline">You are invited.</p>
                <p className="flyer__meta"><span>Sun, July 19</span><span className="dot">&middot;</span><span>11 AM–2 PM</span><span className="dot">&middot;</span><span>1136 Hungryneck Blvd</span></p>
                <p className="flyer__desc">Drop in any time between 11 and 2. Our instructors will teach four short classes, paired with refreshments, performances, and a few surprises. Built for the absolute beginner. No partner necessary, but the more the merrier.</p>
                <Countdown target={GRAND_OPENING} />
                <div className="flyer__foot">
                  <a className="btn btn--primary" href={DIRECTIONS_URL} target="_blank" rel="noopener">Get Directions &rarr;</a>
                </div>
              </div>
              <div className="flyer__aside">
                <p className="eyebrow">The schedule</p>
                <ul className="flyer__sched">
                  {SCHEDULE.map(([name, time], i) => (
                    <li key={i}><span className="flyer__sname">{name}</span><span className="flyer__stime">{time}</span></li>
                  ))}
                </ul>
                <p className="flyer__note">Come as you are. Casual dress, just wear shoes you can move around in.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      <ContactFormSection
        eyebrow="Questions before you book?"
        title="Want to know more first?"
        text="Have a question about an upcoming event, like what to expect, whether it is a fit, or if there is still room? Send it our way and we will get back to you. Some events are ticketed through our partners; we will point you in the right direction."
        subject="Event question from arthurmurraymtpleasant.com"
        source="Upcoming Events page"
        messageLabel="Your question"
        messagePlaceholder="I would love to know more about your upcoming events. What is a good fit for a couple who have never danced before, and how do we reserve a spot?"
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EventsPage />);
