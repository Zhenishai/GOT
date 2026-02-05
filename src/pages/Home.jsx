import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/useAuth";
import "../styles/home.css";
import gsap from "gsap";

const images = [
  "/gotImages/home-1.webp",
  "/gotImages/home-2.jpg",
  "/gotImages/home-3.webp"
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const imgRefs = useRef([]);
  const { user } = useAuth();

  const prevIndex = (index - 1 + images.length) % images.length;
  const nextIndex = (index + 1) % images.length;

  useEffect(() => {
    gsap.to(imgRefs.current, {
      scale: (i) => (i === 1 ? 1.15 : 0.9),
      opacity: (i) => (i === 1 ? 1 : 0.6),
      duration: 0.9,
      ease: "power3.inOut",
      stagger: 0.05
    });
  }, [index]);

  return (
    <PageWrapper>
      <section className="home">
<div className="home-left">
  {user && (
    <h2 className="welcome">
      Hello, {user.displayName || "Friend"} 🐺
    </h2>
  )}

  <h1>Welcome to Westeros</h1>
  <p>This website is created for fans of Game of Thrones who want to explore episodes, revisit the story, and enjoy the world of Westeros.

All episode data, images, and descriptions are provided by TVMaze and are used for educational and non-commercial purposes only.

This project is a personal learning exercise built while studying web development. It is not affiliated with HBO, TVMaze, or any official Game of Thrones production.

Created with passion for the story — and for learning programming.</p>

  <Link to="/episodes" className="home-button">
    Enter the Gallery →
  </Link>
</div>


        {/* RIGHT */}
        <div className="home-right">
          <div className="carousel-stacked">
            {[prevIndex, index, nextIndex].map((imgIndex, i) => (
              <img
                key={imgIndex}
                ref={(el) => (imgRefs.current[i] = el)}
                src={images[imgIndex]}
                className={`carousel-img ${
                  i === 1 ? "center" : i === 0 ? "left" : "right"
                }`}
                onClick={() =>
                  i === 0
                    ? setIndex(prevIndex)
                    : i === 2
                    ? setIndex(nextIndex)
                    : null
                }
              />
            ))}

            <div className="carousel-controls">
              <button onClick={() => setIndex(prevIndex)}>←</button>
              <button onClick={() => setIndex(nextIndex)}>→</button>
            </div>

            <Link to="/episodes" className="carousel-button">
              View Episodes
            </Link>
          </div>
        </div>

      </section>
    </PageWrapper>
  );
}
