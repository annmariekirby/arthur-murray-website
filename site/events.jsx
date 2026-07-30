/* global React, ReactDOM, SiteHeader, Footer, ContactFormSection */
const { useState, useEffect } = React;

const DANCE_PARTY = new Date("2026-08-08T18:30:00-04:00");

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
  "You're tired of dinner-and-a-movie being the whole plan",
  "You want to have fun and feel more connected at the same time",
  "You wonder where the breakdowns are in your communication",
  "You've never danced together and want to try something new",
  "You want an activity that makes you feel more \u201cin tune\u201d and intimate",
  "You just want to have fun and learn something together",
];

const EVENING = [
  "Instruction in several styles of partner dancing, taught at an easy pace",
  "Music and open social dancing",
  "Snacks and refreshments",
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
          <p className="pagehead__lede">Beyond our regular calendar of classes and parties, a few times a year we host a special event that's open to everyone. Check back to see what's coming up.</p>
        </div>
      </section>

      {/* ===================== EVENT FLYERS ===================== */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="flyers">

            {/* FLYER: Dance Party with GiGi's Playhouse (ink poster) */}
            <article className="flyer flyer--ink">
              <div className="flyer__body">
                <div className="flyer__date"><span className="flyer__day">8</span><span className="flyer__mon">August<br/>2026</span></div>
                <p className="eyebrow">A Beyond the Ballroom Event &middot; With GiGi's Playhouse</p>
                <h2 className="flyer__title">Dance Party</h2>
                <p className="flyer__tagline">An inclusive introduction to ballroom dancing.</p>
                <p className="flyer__meta"><span>Sat, August 8</span><span className="dot">&middot;</span><span>6:30–8 PM</span><span className="dot">&middot;</span><span>1136 Hungryneck Blvd</span></p>
                <p className="flyer__desc">Arthur Murray Mt. Pleasant is hosting GiGi's Playhouse and friends for an evening of partner dancing. Our instructors will teach a few social styles at a comfortable pace, then the floor is open. Free to all, ages 16 and up. No partner or experience needed.</p>
                <Countdown target={DANCE_PARTY} />
                <div className="flyer__foot">
                  <a className="btn btn--primary" href="#rsvp">RSVP to Attend &rarr;</a>
                </div>
              </div>
              <div className="flyer__aside">
                <p className="eyebrow">The evening includes</p>
                <ul className="flyer__sched">
                  {EVENING.map((name, i) => (
                    <li key={i}><span className="flyer__sname">{name}</span></li>
                  ))}
                </ul>
                <p className="flyer__note">Free to all &middot; Ages 16+ &middot; Please <a className="link-underline" href="#rsvp">RSVP</a> so we know how many to expect &mdash; include family, friends, and aides in your count.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      <ContactFormSection
        id="rsvp"
        title="RSVP"
        text="Please let us know the total head count of your party. If you have any questions before the 8th, ask away and we'll get right back to you."
        subject="Dance Party RSVP (Aug 8) from arthurmurraymtpleasant.com"
        source="Dance Party RSVP — Upcoming Events page"
        messageLabel="How many are coming, and anything we should know?"
        messagePlaceholder="I'd like to RSVP for the August 8 dance party. There will be two of us."
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EventsPage />);
