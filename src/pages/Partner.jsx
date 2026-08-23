function Partner() {
  const whatsappMessage = encodeURIComponent(
    "Hello The Kaunyangi Foundation. I am interested in partnering with the Foundation and would like to discuss how we can work together."
  );

  return (
    <section className="engagement-page">

      <div className="engagement-container">

        <h1>Partner With Us</h1>

        <p className="engagement-intro">
          We welcome churches, schools, businesses, organizations,
          community groups, and individuals who share our desire to
          create meaningful and lasting impact.
        </p>

        <div className="engagement-card">

          <h2>Let's Work Together</h2>

          <p>
            Partnerships can take many forms, including financial support,
            resources, expertise, community initiatives, mentorship,
            volunteering, and opportunities that strengthen vulnerable
            individuals and communities.
          </p>

          <form
            name="partnership"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <input type="hidden" name="form-name" value="partnership" />

            <p className="hidden-field">
              <label>
                Don't fill this out if you're human:
                <input name="bot-field" />
              </label>
            </p>

            <label>
              Name / Organization
              <input type="text" name="organization" required />
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
              How would you like to partner with us?
              <textarea
                name="message"
                rows="5"
                placeholder="Tell us about your organization or the partnership you have in mind."
                required
              />
            </label>

            <button type="submit" className="secondary-btn">
              Send Partnership Enquiry
            </button>

          </form>

          <div className="whatsapp-option">
            <p>Prefer to speak with us directly?</p>

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

export default Partner;