import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sections = [
  ["About", "about"],
  ["Programs", "programs"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const targetId = location.hash.slice(1);
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
    }
  }, [location.pathname, location.hash]);

  function openSection(event, id) {
    event.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    window.history.replaceState(null, "", `/#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="logo" to="/" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          The Kaunyangi Foundation
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>

        <ul id="primary-navigation" className="nav-links" data-open={menuOpen}>
          <li><Link to="/" aria-current={location.pathname === "/" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Home</Link></li>
          {sections.map(([label, id]) => (
            <li key={id}>
              <a href={`/#${id}`} onClick={(event) => openSection(event, id)}>{label}</a>
            </li>
          ))}
          <li><Link to="/donate" aria-current={location.pathname === "/donate" ? "page" : undefined} onClick={() => setMenuOpen(false)}>Donate</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
