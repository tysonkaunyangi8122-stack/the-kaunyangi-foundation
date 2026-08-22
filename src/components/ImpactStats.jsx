import Counter from "./Counter";
function ImpactStats() {
  return (
    <section className="impact-stats">

      <h2>Our Journey So Far</h2>

      <p className="impact-stats-intro">
        Every journey begins with a single step. Since its founding,
        The Kaunyangi Foundation has been privileged to serve families,
        children, students, and individuals facing different challenges.
        While our journey is still in its early stages, every life touched
        reminds us that love, compassion, and service can transform
        communities.
      </p>

      <div className="stats-grid">

        <div className="stat-card">
          <h3>
  <Counter end={70} />+
</h3>
          <h4>Lives Reached</h4>
          <p>
            Through food support, mentorship, prayer,
            compassion, and community outreach.
          </p>
        </div>

        <div className="stat-card">
          <h3>
  <Counter end={20} />+
</h3>
          <h4>Families Visited</h4>
          <p>
            Providing food assistance,
            encouragement, and hope to vulnerable households.
          </p>
        </div>

        <div className="stat-card">
          <h3>
  <Counter end={1} />
</h3>
          <h4>Changing Futures</h4>
          <p>
            Supporting young people to remain in school,
            pursue their dreams, and build a brighter future.
          </p>
        </div>

        <div className="stat-card">
          <h3>Growing Every Day</h3>
          <h4>Our Mission Continues</h4>
          <p>
            Every act of love today lays the foundation
            for greater impact tomorrow.
          </p>
        </div>

      </div>

    </section>
  );
}

export default ImpactStats;