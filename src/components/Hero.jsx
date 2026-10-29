import heroImage from "../assets/hero-image.jpg";
import { Link } from "react-router-dom";
function Hero() {
  return (
  <section id="home"
  className="hero"
  style={{
    backgroundImage: `url(${heroImage})`
  }}
>

      <h1>Changing Lives Through Love</h1>

      <p className="hero-text">
        Serving orphans, widows, the poor, the sick,
        street children and vulnerable communities with
        compassion, dignity and hope.
      </p>

      <div className="hero-buttons">
        <a href="#about">Our Story</a>
        <Link to="/donate">Support Our Mission</Link>
      </div>

    </section>
  );
}

export default Hero;
