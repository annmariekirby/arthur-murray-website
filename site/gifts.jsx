/* global React, ReactDOM, SiteHeader, Footer, ContactFormSection */

const OCCASIONS = [
  { title: "Christmas", text: "A favorite year after year. Tuck a few lessons under the tree for someone who would never book them for themselves.", note: "Holiday favorite" },
  { title: "Birthdays", text: "An experience to look forward to, not one more thing to unwrap, and a skill they keep for good." },
  { title: "Valentine's Day", text: "A date night they will remember far longer than dinner, and a reason to keep coming back together." },
  { title: "Mother's Day", text: "Something she will genuinely look forward to, and a fun excuse to get the family on the floor." },
  { title: "Engagements", text: "A head start on the first dance, given long before the wedding planning even begins." },
  { title: "Anniversaries", text: "Mark the years with a standing night out, just the two of you, dancing." },
];

const STEPS = [
  { n: "1", title: "Reach out", text: "Call, text, email, or send the form below. Tell us the occasion and who it is for." },
  { n: "2", title: "Pay securely online", text: "We will settle on an amount that fits your budget and handle payment digitally. Quick, secure, and no trip required." },
  { n: "3", title: "Choose how it arrives", text: "We will email a beautifully presented certificate to you or straight to the recipient, mail a printed one, or have it waiting at the studio to pick up." },
];

function Occasions() {
  return (
    <div className="gift-occasions">
      <div className="occ-head">
        <p className="eyebrow">Popular for every occasion</p>
        <h2 className="display" style={{ marginTop: 14 }}>A gift for the moments that matter.</h2>
        <p>Folks give the gift of dancing all year round, but the holidays are when it really shines. If it is a Christmas gift, reach out early in December so we can have it ready in time.</p>
      </div>
      <div className="occasions">
        {OCCASIONS.map((o, i) => (
          <div className="occ" key={i}>
            <h3 className="occ__title">{o.title}</h3>
            <p className="occ__text">{o.text}</p>
            {o.note ? <span className="occ__note">{o.note}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Steps() {
  return (
    <div className="wrap wrap--narrow">
      <div className="occ-head" style={{ textAlign: 'center', marginBottom: 56 }}>
        <p className="eyebrow">How it works</p>
        <h2 className="display" style={{ marginTop: 14 }}>Simple to give.</h2>
      </div>
      <div className="steps">
        {STEPS.map((s, i) => (
          <div className="step" key={i}>
            <div className="step__num">{s.n}</div>
            <div className="step__title">{s.title}</div>
            <p className="step__text">{s.text}</p>
          </div>
        ))}
      </div>
      <p className="steps__note">From there, they book their complimentary first lesson whenever they are ready.</p>
    </div>
  );
}

function GiftsPage() {
  return (
    <React.Fragment>
      <SiteHeader />
      <section className="pagehead">
        <div className="wrap wrap--narrow">
          <p className="eyebrow">Gift Certificates</p>
          <h1 className="display">Give the gift of dancing</h1>
          <hr className="rule-short" />
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="prows">
            <div className="prow prow--flip">
              <div className="prow__media">
                <div className="prow__frame prow__frame--portrait">
                  <img className="prow__photo" src="assets/photos/gift-giving.jpg" alt="Giving the gift of dance lessons" loading="lazy" />
                </div>
              </div>
              <div className="prow__text">
                <h2 className="display">A gift that stays with them.</h2>
                <p>
                  <span className="lead-in">It is not one more thing to unwrap.</span> It is lessons, a night out, and a skill they carry for life. Perfect for the person who has everything, or a gentle nudge for someone who has always wanted to learn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--alt">
        <div className="wrap">
          <Occasions />
        </div>
      </section>
      <section className="section">
        <Steps />
      </section>
      <ContactFormSection
        eyebrow="Ready when you are"
        title="Let us set up a certificate."
        text="Tell us the occasion and who it is for, and we will get a certificate ready that fits. You can also call, text, or email the studio directly."
        subject="Gift certificate enquiry from arthurmurraymtpleasant.com"
        source="Gift Certificates page"
        messageLabel="Who is it for & the occasion"
        messagePlaceholder="A gift for my husband's birthday. He has always wanted to learn to dance. Thinking a few lessons to start."
      />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<GiftsPage />);
