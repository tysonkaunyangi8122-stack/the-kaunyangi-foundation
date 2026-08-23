import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "./components/Loader";
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
import Testimonials from "./components/Testimonials.jsx";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import Donate from "./pages/Donate";
import Partner from "./pages/Partner";
import Volunteer from "./pages/Volunteer";
function App() {
  const [loading, setLoading] = useState(true);

useEffect(() => {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  const timer = setTimeout(() => {
    setLoading(false);
  }, 4000);

  return () => clearTimeout(timer);
}, []);
if (loading) {
  return <Loader />;
}
return (
  <>
    <Routes>

      <Route
        path="/"
        element={
          <>
            <ScrollProgress />
            <Navbar />
            <Hero />
            <ImpactStats />
            <About />
            <MissionVision />
            <Programs />
            <CoreValues />
            <Impact />
            <JoinMission />
            <Testimonials />
            <Gallery />
            <Contact />
            <Footer />
            <BackToTop />
          </>
        }
      />

      <Route path="/donate" element={<Donate />} />

      <Route path="/partner" element={<Partner />} />

      <Route path="/volunteer" element={<Volunteer />} />

    </Routes>
  </>
);
}

export default App;
