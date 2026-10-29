import { useSiteContent } from "../hooks/useSiteContent";

function Programs() {
  const siteContent = useSiteContent();
  return (
    <section id="programs" className="programs">
      <div className="section-inner">
        <h2>Our Programs</h2>
        <p className="programs-intro">
          Through faith, compassion, and practical action, The Kaunyangi Foundation serves vulnerable communities by creating sustainable opportunities that restore hope, dignity, and purpose.
        </p>
        <div className="program-grid">
          {siteContent.programs.map((program) => (
            <article className="program-card" key={program.title}>
              <h3>{program.title}</h3>
              <p>{program.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Programs;
