function Volunteer() {
  const whatsappMessage = encodeURIComponent(
    "Hello The Kaunyangi Foundation. I am interested in volunteering and would like to learn more about how I can get involved."
  );

  return (
    <section className="engagement-page">

      <div className="engagement-container">

        <h1>Become a Volunteer</h1>

        <p className="engagement-intro">
          Your time, skills, compassion, and willingness to serve can make
          a meaningful difference. Join The Kaunyangi Foundation in bringing
          hope, dignity, and practical support to vulnerable communities.
        </p>

        <div className="engagement-card">

          <h2>Volunteer With Us</h2>

          <p>
            Tell us a little about yourself and how you would like to
            contribute to the Foundation.
          </p>

          <form
            name="volunteer"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="volunteer" />

            <p className="hidden-field">
              <label>
                Don't fill this out if you're human:
                <input name="bot-field" />
              </label>
            </p>

            <label>
              Full Name
              <input type="text" name="name" required />
            </label>

            <label>
              Email Address
              <input type="email" name="email" required />
            </label>

            <label>
              Phone / WhatsApp
              <input type="tel" name="phone" />
            </label>

            <label>
              How would you like to help?
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about your skills, interests, or how you would like to serve."
                required
              />
            </label>

            <button type="submit" className="primary-btn">
              Submit Volunteer Application
            </button>

          </form>

          <div className="whatsapp-option">
            <p>Prefer a quicker conversation?</p>

            <a
              href={`https://wa.me/254796118488?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              💬 Chat with us on WhatsApp
            </a>
          </div>

        </div>

        <div className="contact-note">
          <p>
            You can also contact us directly by email or WhatsApp.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Volunteer;