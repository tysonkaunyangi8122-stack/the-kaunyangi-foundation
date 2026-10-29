import { EmailIcon, WhatsAppIcon } from "../components/ContactIcons";
import { FOUNDATION_EMAIL, PHONE_DISPLAY, WHATSAPP_URL } from "../content/contact";

function Donate() {
  return (
    <section className="engagement-page">
      <div className="engagement-container">
        <h1>Support Our Mission</h1>
        <p className="engagement-intro">
          Your support can help the Foundation serve vulnerable communities with compassion and practical care.
        </p>

        <div className="engagement-card">
          <h2>How to make a contribution</h2>
          <p>
            The Foundation does not yet have its own bank account or established official donation channel. For now, please contact the Foundation president before making a contribution. The president will explain the current arrangements and which Foundation activity a contribution can support.
          </p>
          <div className="donation-placeholder">
            <h3>Temporary arrangements</h3>
            <p>
              The contact number below connects you with the Foundation president. It is a contact number for discussing contributions; it is not presented as a Foundation-owned bank account or payment account. Please ask for the current instructions before sending funds.
            </p>
          </div>
          <div className="donation-contact">
            <h3>Contact the Foundation president</h3>
            <p>Ask a question or request current donation instructions through either verified contact channel.</p>
            <a className="whatsapp-btn" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={`Contact the Foundation president on WhatsApp at ${PHONE_DISPLAY}`}>
              <WhatsAppIcon /> WhatsApp · {PHONE_DISPLAY}
            </a>
            <p className="email-option">
              <a href={`mailto:${FOUNDATION_EMAIL}`}><EmailIcon /> Email the Foundation</a>
            </p>
          </div>
        </div>

        <p className="contact-note">Please contact the Foundation before making a contribution. No payment is taken on this website.</p>
      </div>
    </section>
  );
}

export default Donate;
