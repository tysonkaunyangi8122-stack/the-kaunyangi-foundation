import { useNetlifyForm } from "../hooks/useNetlifyForm";
import { WhatsAppIcon } from "../components/ContactIcons";
import { PHONE_DISPLAY, WHATSAPP_URL } from "../content/contact";

function Partner() {
  const { status, handleSubmit } = useNetlifyForm();

  return (
    <section className="engagement-page">
      <div className="engagement-container">
        <h1>Partner with us</h1>
        <p className="engagement-intro">
          We welcome churches, schools, businesses, organizations, community groups, and individuals who share our desire to create meaningful and lasting impact.
        </p>

        <div className="engagement-card">
          <h2>Let’s work together</h2>
          <p>Partnerships can include resources, expertise, community initiatives, mentorship, volunteering, and opportunities that strengthen vulnerable individuals and communities.</p>

          <form
            className="engagement-form"
            name="partnership"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="partnership" />
            <label className="hidden-field" aria-hidden="true">Leave this field empty<input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
            <label htmlFor="partnership-organization">Name or organization
              <input id="partnership-organization" type="text" name="organization" minLength="2" maxLength="120" autoComplete="organization" required />
            </label>
            <label htmlFor="partnership-email">Email address
              <input id="partnership-email" type="email" name="email" maxLength="254" autoComplete="email" required />
            </label>
            <label htmlFor="partnership-phone">Phone or WhatsApp (optional)
              <input id="partnership-phone" type="tel" name="phone" maxLength="30" autoComplete="tel" />
            </label>
            <label htmlFor="partnership-message">How would you like to partner with us?
              <textarea id="partnership-message" name="message" rows="5" minLength="10" maxLength="3000" required />
            </label>
            <p className="form-feedback" data-state={status.state} role="status" aria-live="polite">{status.message}</p>
            <button type="submit" className="secondary-btn" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Send partnership enquiry"}
            </button>
          </form>

          <div className="whatsapp-option">
            <p>Prefer to speak directly?</p>
            <a className="whatsapp-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Contact the Foundation on WhatsApp at ${PHONE_DISPLAY}`}>
              <WhatsAppIcon /> WhatsApp · {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <p className="contact-note">We will review your enquiry and follow up using the contact details you provide.</p>
      </div>
    </section>
  );
}

export default Partner;
