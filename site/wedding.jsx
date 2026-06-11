/* global React, ReactDOM, SiteHeader, Footer, ContactFormSection */

function PageHead({ eyebrow, title, lede }) {
  return (
    <section className="pagehead">
      <div className="wrap wrap--narrow">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display">{title}</h1>
        <hr className="rule-short" />
        {lede ? <p className="pagehead__lede">{lede}</p> : null}
      </div>
    </section>
  );
}

function Prow({ flip, slotId, src, portrait, placeholder, title, children }) {
  return (
    <div className={"prow" + (flip ? " prow--flip" : "")}>
      <div className="prow__media">
        <div className={"prow__frame" + (portrait ? " prow__frame--portrait" : "")}>
          <img className="prow__photo" src={src} alt={title} loading="lazy" />
        </div>
      </div>
      <div className="prow__text">
        <h2 className="display">{title}</h2>
        <p>{children}</p>
      </div>
    </div>
  );
}

/* Real Google reviews from wedding couples. Transcribed verbatim from the
 * studio's Google Business profile (June 2026); the Jamie McKee entry is an
 * excerpt of a longer review, with omissions marked by an ellipsis. */
const WEDDING_REVIEWS = [
  {
    n: "Justin Hovick", d: "3/9/2026", c: "#3E6B3C",
    t: "Highly recommend to everyone interested in learning some dance. We did lessons for our first dance for our wedding and they were exceptional, patient, and will help design it based on your vision.",
  },
  {
    n: "Anthony Facca", d: "5/11/2026", c: "#6E4593",
    t: "My wife and I took lessons here before our wedding. We started with zero experience, but the instructors made it fun and easy to learn. They broke each step down into small simple steps that we could put together into one big dance. They helped us feel comfortable and confident so we could enjoy our first dance. We highly recommend for anybody getting married and wanting to learn a few moves for their big day!",
  },
  {
    n: "Jamie McKee", d: "6/1/2026", c: "#3F7E84",
    t: "Our son's wedding was coming up, so my wife signed us all up\u2026 She took lessons with our son, so they'd be comfortable for the mother/groom dance. They're kind and helpful when we make mistakes, and so we can laugh at ourselves while learning. They're so observant: a small change they suggest can make such a difference and a stumbling dance move turns effortless.",
  },
];

function WeddingStars() { return (<span>{"\u2605\u2605\u2605\u2605\u2605"}</span>); }
const WeddingGoogleG = (p) => (
  <svg viewBox="0 0 48 48" {...p}><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"></path><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"></path><path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"></path><path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"></path></svg>
);

function WeddingReviews() {
  const reviewsUrl = (window.AM_CONFIG && window.AM_CONFIG.reviewsUrl) || "#";
  return (
    <section className="section reviews" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="reviews__head">
          <div className="reviews__title">
            <p className="eyebrow">From couples we have married off</p>
            <h2 className="display" style={{ marginTop: 14 }}>Danced down the aisle.</h2>
          </div>
          <div className="gbadge">
            <WeddingGoogleG className="gbadge__logo" />
            <div className="gbadge__meta">
              <div className="gbadge__stars rcard__stars"><WeddingStars /></div>
              <a className="gbadge__count" href={reviewsUrl} target="_blank" rel="noopener">Read more on Google &rarr;</a>
            </div>
          </div>
        </div>
        <div className="wreviews__grid">
          {WEDDING_REVIEWS.map((r, i) => (
            <article className="rcard" key={i}>
              <div className="rcard__top">
                <div className="rcard__avatar" style={{ background: r.c }}>{r.n[0]}</div>
                <div className="rcard__who">
                  <div className="rcard__name">{r.n}</div>
                  <div className="rcard__date">{r.d}</div>
                </div>
              </div>
              <div className="rcard__stars"><WeddingStars /></div>
              <p className="rcard__body">“{r.t}”</p>
              <div className="rcard__src"><WeddingGoogleG className="rcard__g" /> Posted on Google</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  const facts = [
    { label: "First dance", title: "From a sway to spins", text: "A simple, elegant first dance, or something bigger with dips and a showstopper or two." },
    { label: "Family dances", title: "Father-daughter & more", text: "We will prep the father-daughter and mother-son dances right alongside yours." },
    { label: "Timeline", title: "Six months or six weeks", text: "Start whenever you are. Tell us your date and we will build a plan that fits." },
  ];
  return (
    <div className="quickfacts">
      {facts.map((f, i) => (
        <div className="qfact" key={i}>
          <div className="qfact__label">{f.label}</div>
          <div className="qfact__title">{f.title}</div>
          <p className="qfact__text">{f.text}</p>
        </div>
      ))}
    </div>
  );
}

function WeddingPage() {
  return (
    <React.Fragment>
      <SiteHeader />
      <PageHead
        eyebrow="For couples & wedding parties"
        title={<React.Fragment>Wedding dance lessons in <em>Mt. Pleasant</em></React.Fragment>}
        lede="First dances, father-daughter and mother-son dances, built around you and your timeline, whether your day is six months or six weeks away."
      />
      <section className="section" style={{ paddingTop: 0, paddingBottom: 96 }}>
        <div className="wrap">
          <QuickFacts />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prows">
            <Prow slotId="wed-first-dance" src="assets/photos/wed-firstdance.jpg" placeholder="Drop a first-dance photo" title="A break from the planning chaos">
              <span className="lead-in">Your lessons become time that is just the two of you</span>, away from the venue, the guest list, and a hundred small decisions. Most couples tell us it is some of the most fun of the whole engagement.
            </Prow>
            <Prow flip slotId="wed-timeline" src="assets/photos/wed-timeline.jpg" placeholder="Drop a couple photo" title="Whatever your timeline">
              <span className="lead-in">Couples come to us six months out and six weeks out alike.</span> The earlier you start, the more we can polish, but even a handful of lessons gives you a confident plan. Tell us your wedding date and we will build around it.
            </Prow>
            <Prow slotId="wed-build" src="assets/photos/wed-build.jpg" placeholder="Drop a wedding-party photo" title="How we build your dance">
              <span className="lead-in">Never danced before? Neither had most of our couples.</span> We start from a simple, elegant sway and add as much as you like: dips, spins, a few showstopping moments. You do not even need your song picked yet, and we will help with the father-daughter and mother-son dances too.
            </Prow>
            <Prow flip slotId="wed-unexpected" src="assets/photos/wed-unexpected.jpg" portrait placeholder="Drop a fun / upbeat dance photo" title="Or do something unexpected">
              <span className="lead-in">The slow, traditional first dance is not for everyone.</span> More and more couples are choosing an upbeat number, a surprise key change, or a bit of fun choreography no one sees coming. If you have a bold idea, bring it. Those are some of our favorite dances to put together.
            </Prow>
          </div>
        </div>
      </section>
      <WeddingReviews />
      <ContactFormSection
        eyebrow="Your first dance"
        title="Tell us your wedding date."
        text="Send us a note with your date and we will put together a plan that fits, whether your day is six months or six weeks away. Or call or text the studio directly."
        subject="Wedding dance enquiry from arthurmurraymtpleasant.com"
        source="Wedding Dances page"
        messageLabel="Your wedding date & what you have in mind"
        messagePlaceholder="Our date is October 18th. We would love a first dance, maybe a slow song with a dip at the end, and help with the father-daughter dance too."
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<WeddingPage />);
