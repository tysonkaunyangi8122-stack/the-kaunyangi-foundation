import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useSiteContent } from "../hooks/useSiteContent";

function Gallery() {
  const [index, setIndex] = useState(-1);
  const siteContent = useSiteContent();
  const slides = siteContent.gallery.map((image) => ({ src: image.image, alt: image.title }));

  return (
    <section id="gallery" className="gallery">
      <div className="section-inner">
        <h2>Gallery</h2>
        <p className="gallery-intro">
          Every smile, helping hand, prayer, and act of compassion tells a story. This gallery shares moments from the Foundation’s service and community work.
        </p>
        <div className="gallery-grid">
          {siteContent.gallery.map((image, imageIndex) => (
            <article className="gallery-card" key={`${image.image}-${image.title}`}>
              <button type="button" onClick={() => setIndex(imageIndex)} aria-label={`Open photo: ${image.title}`}>
                <img src={image.image} alt={image.title} loading="lazy" decoding="async" />
              </button>
            </article>
          ))}
        </div>
      </div>
      <Lightbox open={index >= 0} close={() => setIndex(-1)} index={index} slides={slides} />
    </section>
  );
}

export default Gallery;
