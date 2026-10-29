import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ImpactStats from "./components/ImpactStats";
import About from "./components/About";
import MissionVision from "./components/MissionVision";
import Programs from "./components/Programs";
import CoreValues from "./components/CoreValues";
import Impact from "./components/Impact";
import JoinMission from "./components/JoinMission";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Donate from "./pages/Donate";
import Partner from "./pages/Partner";
import Volunteer from "./pages/Volunteer";
import Admin from "./pages/Admin";

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <ImpactStats />
      <About />
      <MissionVision />
      <Programs />
      <CoreValues />
      <Impact />
      <JoinMission />
      <Gallery />
      <Contact />
    </>
  );
}

function NotFound() {
  return (
    <section className="not-found-page">
      <h1>Page not found</h1>
      <p>The page you’re looking for isn’t here. Return to the homepage to explore the Foundation’s work.</p>
      <a className="primary-btn" href="/">Return to home</a>
    </section>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "The Kaunyangi Foundation | Changing Lives Through Love",
      "/donate": "Support Our Mission | The Kaunyangi Foundation",
      "/partner": "Partner With Us | The Kaunyangi Foundation",
      "/volunteer": "Volunteer | The Kaunyangi Foundation",
      "/admin": "Administration | The Kaunyangi Foundation",
    };
    const descriptions = {
      "/": "The Kaunyangi Foundation serves vulnerable communities through compassion, education, humanitarian aid, healthcare and sustainable development.",
      "/donate": "Contact the Foundation president for current donation instructions. The Foundation does not yet have its own bank account or official donation channel.",
      "/partner": "Learn how to partner with The Kaunyangi Foundation through service, resources, mentorship, and community initiatives.",
      "/volunteer": "Volunteer with The Kaunyangi Foundation and support vulnerable communities through your time, skills, and compassion.",
      "/admin": "Private administration tools for The Kaunyangi Foundation.",
    };
    const title = titles[location.pathname] ?? "Page Not Found | The Kaunyangi Foundation";
    document.title = title;
    const description = descriptions[location.pathname] ?? "The page you requested could not be found.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
