/* global React, ReactDOM, SiteHeader, Footer */
const { useState, useEffect } = React;

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

/* Order is deliberately mixed — landscape/portrait alternated, and subjects
 * (group floor shots, couples, workshop exercises) interleaved. */
const GALLERY = [
  { src: "assets/photos/gallery/g1.jpg", o: "land", alt: "Couples on the studio floor" },
  { src: "assets/photos/gallery/g14.jpg", o: "port", alt: "Two dancers finishing a routine with an arm raised" },
  { src: "assets/photos/gallery/g12.jpg", o: "port", alt: "A couple laughing together in a dance hold" },
  { src: "assets/photos/gallery/g11.jpg", o: "port", alt: "Students seated on the studio floor during a workshop exercise" },
  { src: "assets/photos/gallery/g4.jpg", o: "land", alt: "The full floor moving together in a group class" },
  { src: "assets/photos/gallery/g2.jpg", o: "port", alt: "A couple practicing a turn together" },
  { src: "assets/photos/gallery/g9.jpg", o: "port", alt: "Two guests at the studio" },
  { src: "assets/photos/gallery/g5.jpg", o: "port", alt: "A couple dancing by the studio windows" },
  { src: "assets/photos/gallery/g7.jpg", o: "land", alt: "Guests gathered on the floor before a lesson" },
  { src: "assets/photos/gallery/g13.jpg", o: "port", alt: "Students taking part in a partnering exercise" },
  { src: "assets/photos/gallery/g3.jpg", o: "port", alt: "A student and instructor mid-dance, laughing" },
  { src: "assets/photos/gallery/g8.jpg", o: "land", alt: "Students and instructors together at the studio" },
  { src: "assets/photos/gallery/g6.jpg", o: "port", alt: "Partners working through a pattern at the mirrors" },
  { src: "assets/photos/gallery/g10.jpg", o: "port", alt: "Two guests together at the studio" },
];

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

      {/* ===================== NO EVENT SCHEDULED (placeholder) ===================== */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="flyers">

            <article className="flyer flyer--ink flyer--simple">
              <div className="flyer__body">
                <h2 className="flyer__title">More to come</h2>
                <p className="flyer__tagline">Our next special event is in the works.</p>
                <p className="flyer__desc">Scroll to see highlights from recent events.</p>
              </div>
            </article>

          </div>
        </div>
      </section>

      <section className="section section--tight gallery">
        <div className="wrap">
          <div className="gallery__head">
            <h2 className="display">A look back</h2>
            <p className="gallery__lede">Moments from recent events.</p>
          </div>
          <div className="gallery__strip">
            {GALLERY.map((g, i) => (
              <figure key={i} className={"gallery__frame gallery__frame--" + g.o}>
                <img src={g.src} alt={g.alt} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<EventsPage />);
