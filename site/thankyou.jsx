/* global React, ReactDOM, SiteHeader, Footer, PHONE, PHONE_TEL, EMAIL */
/* Dedicated post-submit confirmation page.
 * Lives at its own URL ("Thank You.html") so it can be used as the conversion
 * destination in Google Ads / Meta — the lead event fires ONCE here on load,
 * which is the canonical way to count a form submission as a conversion.    */

/* Self-contained tracking (mirrors the homepage's trackConversion) so this
 * page doesn't depend on app.jsx, which only the homepage loads. Every call
 * is wrapped — if a tag isn't installed yet, nothing breaks. */
function fireLeadConversion() {
  const cfg = window.AM_CONFIG || {};
  const p = new URLSearchParams(window.location.search);
  const params = {
    source: p.get('source') || 'website',
    utm_source: p.get('utm_source') || '',
    utm_medium: p.get('utm_medium') || '',
    utm_campaign: p.get('utm_campaign') || '',
  };
  // GA4 / Google Tag
  try { if (window.gtag) window.gtag('event', 'generate_lead', params); } catch (e) {}
  try { if (window.dataLayer) window.dataLayer.push(Object.assign({ event: 'generate_lead' }, params)); } catch (e) {}
  // Meta Pixel
  try { if (window.fbq) window.fbq('track', 'Lead', params); } catch (e) {}
  // Google Ads conversion (only when the account + label are configured)
  try {
    if (window.gtag && cfg.googleAdsId && cfg.googleAdsLabel) {
      window.gtag('event', 'conversion', { send_to: cfg.googleAdsId + '/' + cfg.googleAdsLabel });
    }
  } catch (e) {}
}

const TyPhoneIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const TyMsgIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>);
const TyMailIcon = (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>);

function ThankYouPage() {
  React.useEffect(() => { fireLeadConversion(); }, []);

  return (
    <React.Fragment>
      <SiteHeader />

      <main className="ty">
        <section className="ty__hero">
          <div className="wrap wrap--narrow">
            <p className="eyebrow ty__eyebrow">Message received</p>
            <h1 className="display ty__title">Thank you &mdash; we&rsquo;ll be in touch.</h1>
            <hr className="rule-short" />
            <p className="ty__lede">
              We&rsquo;ve received your note and a member of our team will get back to
              you shortly.
            </p>

            <div className="ty__actions">
              <a className="btn btn--ghost" href="index.html">Back to home</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ThankYouPage />);
