import { Link } from "react-router-dom";
import { EmailIcon, WhatsAppIcon } from "./ContactIcons";
import { FOUNDATION_EMAIL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from "../content/contact";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>The Kaunyangi Foundation</h3>
          <p><strong>Leading with Love. Transforming Lives.</strong></p>
          <p>We exist to restore hope, uplift communities, and demonstrate the love of Christ through compassionate service.</p>
        </div>
        <div className="footer-section">
          <h3>Explore</h3>
          <p><Link to="/">Home</Link></p>
          <p><a href="/#about">About</a></p>
          <p><a href="/#programs">Programs</a></p>
          <p><Link to="/volunteer">Volunteer</Link></p>
          <p><Link to="/partner">Partner with us</Link></p>
          <p><Link to="/donate">Donate</Link></p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Ruaraka, Lucky Summer, Nairobi, Kenya</p>
          <p><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p>
          <p><a className="contact-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp</a></p>
          <p><a className="contact-link" href={`mailto:${FOUNDATION_EMAIL}`}><EmailIcon /> {FOUNDATION_EMAIL}</a></p>
        </div>
      </div>
      <hr />
      <p className="copyright">© {new Date().getFullYear()} The Kaunyangi Foundation. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
