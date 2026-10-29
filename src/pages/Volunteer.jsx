import { useNetlifyForm } from "../hooks/useNetlifyForm";
import { WhatsAppIcon } from "../components/ContactIcons";
import { PHONE_DISPLAY, WHATSAPP_URL } from "../content/contact";

function Volunteer() {
  const { status, handleSubmit } = useNetlifyForm();

  return (
    <section className="engagement-page">
      <div className="engagement-container">
        <h1>Become a volunteer</h1>
        <p className="engagement-intro">
          Your time, skills, compassion, and willingness to serve can make a meaningful difference. Join The Kaunyangi Foundation in bringing hope, dignity, and practical support to vulnerable communities.
        </p>

        <div className="engagement-card">
          <h2>Volunteer with us</h2>
          <p>Tell us a little about yourself and how you would like to contribute to the Foundation.</p>

          <form
            className="engagement-form"
            name="volunteer"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="volunteer" />
            <label className="hidden-field" aria-hidden="true">Leave this field empty<input name="bot-field" tabIndex="-1" autoComplete="off" /></label>
            <label htmlFor="volunteer-name">Full name
              <input id="volunteer-name" type="text" name="name" minLength="2" maxLength="100" autoComplete="name" required />
            </label>
            <label htmlFor="volunteer-email">Email address
              <input id="volunteer-email" type="email" name="email" maxLength="254" autoComplete="email" required />
            </label>
            <label htmlFor="volunteer-phone">Phone or WhatsApp (optional)
              <input id="volunteer-phone" type="tel" name="phone" maxLength="30" autoComplete="tel" />
            </label>
            <label htmlFor="volunteer-message">How would you like to help?
              <textarea id="volunteer-message" name="message" rows="5" minLength="10" maxLength="3000" required />
            </label>
            <p className="form-feedback" data-state={status.state} role="status" aria-live="polite">{status.message}</p>
            <button type="submit" className="primary-btn" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Submit volunteer application"}
            </button>
          </form>

          <div className="whatsapp-option">
            <p>Prefer a quick conversation?</p>
            <a className="whatsapp-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Contact the Foundation on WhatsApp at ${PHONE_DISPLAY}`}>
              <WhatsAppIcon /> WhatsApp · {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <p className="contact-note">We will review your application and follow up using the contact details you provide.</p>
      </div>
    </section>
  );
}

export default Volunteer;
