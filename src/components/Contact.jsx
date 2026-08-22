function Contact() {
  return (
    <section id="contact"
    className="contact">

      <h2>Contact Us</h2>

      <p className="contact-intro">
        We would love to hear from you. Whether you would like to volunteer,
        partner with us, support our mission, request prayer, or simply learn
        more about The Kaunyangi Foundation, please send us a message.
        Together, we can transform lives through love and service.
      </p>

      <div className="contact-container">

        <div className="contact-info">

          <h3>Get In Touch</h3>

          <p>
            <strong>📍 Address</strong><br />
            Ruaraka, Lucky Summer<br />
            Nairobi, Kenya
          </p>

          <p>
            <strong>📞 Phone</strong><br />
            +254 796 118 488
          </p>

          <p>
            <strong>💬 WhatsApp</strong><br />
            +254 796 118 488
          </p>

          <p>
            <strong>✉️ Email</strong><br />
            info.thekaunyangifoundation@gmail.com
          </p>

          <p>
            <strong>🌐 Social Media</strong><br />
            Official social media pages coming soon.
          </p>

        </div>

        <div className="contact-form">

          <input
            type="text"
            placeholder="Your Full Name"
          />

          <input
            type="email"
            placeholder="Your Email Address"
          />

          <input
            type="text"
            placeholder="Subject"
          />

          <textarea
            rows="6"
            placeholder="Write your message here..."
          ></textarea>

          <button>
            Send Message
          </button>

        </div>

      </div>

    </section>
  );
}

export default Contact;