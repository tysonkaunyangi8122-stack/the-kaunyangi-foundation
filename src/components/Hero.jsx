import heroImage from "../assets/hero-image.jpg";
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
        <button onClick={() =>
  document.getElementById("about").scrollIntoView({
    behavior: "smooth"
  })
}>
  Our Story
</button>
        <button onClick={() =>
  document.getElementById("join-mission").scrollIntoView({
    behavior: "smooth"
  })
}>
  Support Our Mission
</button>
      </div>

    </section>
  );
}

export default Hero;