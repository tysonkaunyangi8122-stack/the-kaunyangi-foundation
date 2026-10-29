import { useSiteContent } from "../hooks/useSiteContent";

function ImpactStats() {
  const siteContent = useSiteContent();
  return (
    <section className="impact-stats">
      <div className="section-inner">
        <h2>Our Journey So Far</h2>
        <p className="impact-stats-intro">
          Every journey begins with a single step. The Foundation serves families, children, students, and individuals facing different challenges. As this work grows, every act of love, compassion, and service helps strengthen the communities around us.
        </p>
        <div className="stats-grid">
          {siteContent.impactHighlights.map((highlight) => (
            <article className="stat-card" key={highlight.title}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactStats;
