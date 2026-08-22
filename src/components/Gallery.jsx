import outreach from "../assets/community-outreach.jpg";
import food from "../assets/food-distribution.jpg";
import medical from "../assets/medical-camp.jpg";
import children from "../assets/childrens-program.jpg";
import support from "../assets/community-support.jpg";
import relief from "../assets/humanitarian-relief.jpg";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
function Gallery() {
  const [index, setIndex] = useState(-1);
  const slides = [
  { src: outreach },
  { src: food },
  { src: medical },
  { src: children },
  { src: support },
  { src: relief },
];
  return (
    <section id="gallery" className="gallery">

      <h2>Gallery</h2>

      <p className="gallery-intro">
        Every smile, every helping hand, every prayer and every act of
        compassion tells a story. As The Kaunyangi Foundation grows,
        this gallery will capture moments of hope, service and
        transformation from our mission.
      </p>

      <div className="gallery-grid">

        <div className="gallery-card">
          <img
  src={outreach}
  alt="Community Outreach"
  onClick={() => setIndex(0)}
/>
        </div>

        <div className="gallery-card">
          <img
  src={food}
  alt="Food Distribution"
  onClick={() => setIndex(1)}
/>
        </div>

        <div className="gallery-card">
          <img
  src={medical}
  alt="Medical Camp"
  onClick={() => setIndex(2)}
/>
        </div>

        <div className="gallery-card">
          <img
  src={children}
  alt="Children's Program"
  onClick={() => setIndex(3)}
/>
        </div>

        <div className="gallery-card">
          <img
  src={support}
  alt="Community Support"
  onClick={() => setIndex(4)}
/>
        </div>

        <div className="gallery-card">
          <img
  src={relief}
  alt="Humanitarian Relief"
  onClick={() => setIndex(5)}
/>
        </div>

      </div>

    <Lightbox
  open={index >= 0}
  close={() => setIndex(-1)}
  index={index}
  slides={slides}
/>
    </section>
  );
}

export default Gallery;