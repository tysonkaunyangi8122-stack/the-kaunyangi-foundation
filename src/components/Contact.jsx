import { useState } from "react";
import { EmailIcon, WhatsAppIcon } from "./ContactIcons";
import { FOUNDATION_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "../content/contact";

function Contact() {
  const [status, setStatus] = useState({ state: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending", message: "Sending your message…" });

    try {
      const formData = new FormData(form);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) {
        throw new Error("The form service did not accept the message.");
      }

      form.reset();
      setStatus({ state: "success", message: "Your message was submitted. Thank you for contacting the Foundation." });
    } catch {
      setStatus({
        state: "error",
        message: "We could not submit your message. Please try again or contact us by WhatsApp or email.",
      });
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="section-inner">
        <h2>Contact Us</h2>
        <p className="contact-intro">
          We would love to hear from you. Whether you would like to volunteer,
          partner with us, support our mission, request prayer, or simply learn
          more about The Kaunyangi Foundation, please send us a message.
        </p>

        <div className="contact-container">
          <div className="contact-info">
            <h3>Get in touch</h3>
            <p><strong>Address</strong><br />Ruaraka, Lucky Summer<br />Nairobi, Kenya</p>
            <p><strong>Phone</strong><br /><a className="contact-link" href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
            <p>
              <strong>WhatsApp</strong><br />
              <a className="contact-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Contact the Foundation on WhatsApp at ${PHONE_DISPLAY}`}>
                <WhatsAppIcon /> {PHONE_DISPLAY}
              </a>
            </p>
            <p>
              <strong>Email</strong><br />
              <a className="contact-link" href={`mailto:${FOUNDATION_EMAIL}`}>
                <EmailIcon /> {FOUNDATION_EMAIL}
              </a>
            </p>
          </div>

          <form
            className="contact-form"
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <label className="hidden-field" aria-hidden="true">
              Leave this field empty
              <input name="bot-field" tabIndex="-1" autoComplete="off" />
            </label>
            <label htmlFor="contact-name">Your name
              <input id="contact-name" name="name" type="text" autoComplete="name" minLength="2" maxLength="100" required />
            </label>
            <label htmlFor="contact-email">Email address
              <input id="contact-email" name="email" type="email" autoComplete="email" maxLength="254" required />
            </label>
            <label htmlFor="contact-subject">Subject
              <input id="contact-subject" name="subject" type="text" minLength="3" maxLength="120" required />
            </label>
            <label htmlFor="contact-message">Message
              <textarea id="contact-message" name="message" rows="6" minLength="10" maxLength="3000" required />
            </label>
            <p className="form-feedback" data-state={status.state} role="status" aria-live="polite">{status.message}</p>
            <button type="submit" disabled={status.state === "sending"}>
              {status.state === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
