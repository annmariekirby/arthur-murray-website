/* global React, ReactDOM, SiteHeader, Footer, ContactFormSection */
const { useState } = React;

const FAQS = [
  { q: "Is it too late in life to learn?", a: "It is never too late. We teach adults of every age and stage, from people in their twenties to dancers well into their eighties. Dance is also one of the rare pastimes that is genuinely good for you: it sharpens memory and focus, improves balance, posture, and coordination, and keeps you moving, all without ever feeling like exercise. Some students are getting ready for a wedding, some want a new hobby or a standing date night, and some simply always meant to learn. Whatever brought you, you will be in good company." },
  { q: "What should I expect at my first lesson?", a: "Your first lesson is on us: a complimentary 30 minutes with a certified instructor. No partner or experience needed. Come learn a few steps, ask questions, and see if we are the right fit. There is no obligation either way." },
  { q: "Do I need a special occasion, or to know which dances I want to learn?", a: "Not at all. You do not need a wedding, a cruise, or any event on the calendar to start, and you do not need to know a single dance by name. Most people are not sure what they want to learn, and that is exactly what we are here for. We will guide you in the right direction and teach you how to recognize different kinds of music, so you know what to dance, and how, whenever a song comes on." },
  { q: "What should I wear to the dance studio?", a: "Comfortable clothes you can move in: jeans, slacks, leggings, or a casual dress all work. For shoes, anything with a smooth-ish sole that will not stick to the floor is great. You do not need dance shoes for your first lesson." },
  { q: "What dances do you teach?", a: "Waltz, Tango, Foxtrot, Viennese Waltz, Quickstep, Rumba, Cha-Cha, Mambo, Bolero, Paso Doble, Argentine Tango, Swing, Lindy Hop, West Coast Swing, Carolina Shag, Hustle, Salsa, Bachata, Merengue, Country Swing, Two-Step, Polka, and more." },
  { q: "Do I need a partner?", a: "No. In fact, it is often more efficient to learn independently, since it lets you focus on developing your own skills. We even recommend that couples learning together occasionally take one-on-one lessons with their instructor." },
  { q: "How much does it cost?", a: "Every student's journey is different, so pricing depends on your goals. Reach out anytime to ask about our current package offerings, or come in for your free first lesson and we will walk you through every option and find your best fit." },
  { q: "How long will it take me to learn to dance?", a: "There is no one-size-fits-all answer. Everyone learns at a different pace depending on experience, practice, and natural ability. What matters most is that you keep moving forward and enjoy the process." },
];

const Chevron = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6" /></svg>);

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={"faq__item" + (open ? " is-open" : "")}>
      <button className="faq__q" onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <Chevron className="faq__icon" />
      </button>
      <div className="faq__a">
        <div className="faq__a-clip"><p>{a}</p></div>
      </div>
    </div>
  );
}

function FaqPage() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <React.Fragment>
      <SiteHeader />
      <PageHeadFaq />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="faq">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </section>
      <ContactFormSection
        eyebrow="Still wondering?"
        title="Ask us anything."
        text="Do not see your question here? Send it our way and we will get you a straight answer. Or call or text the studio anytime."
        subject="Question from the FAQ page at arthurmurraymtpleasant.com"
        source="FAQ page"
        messageLabel="Your question"
        messagePlaceholder="I have never danced before and I do not have a partner. Is the group class still a good place to start?"
      />
      <Footer />
    </React.Fragment>
  );
}

function PageHeadFaq() {
  return (
    <section className="pagehead">
      <div className="wrap wrap--narrow">
        <p className="eyebrow">Good to know</p>
        <h1 className="display">Frequently asked questions</h1>
        <hr className="rule-short" />
        <p className="pagehead__lede">The things couples and first-timers ask us most, answered.</p>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<FaqPage />);
