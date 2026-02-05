import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function EpisodeOverlay({ episode, onClose }) {
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  /* ============================
     OPEN ANIMATION
  ============================ */
  useEffect(() => {
    if (!episode) return;

    const tl = gsap.timeline();

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    )
      .fromTo(
        imageRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      )
      .fromTo(
        textRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12
        },
        0.2
      );

    return () => {
      tl.kill();
    };
  }, [episode]);

  /* ============================
     CLOSE ANIMATION
  ============================ */
  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  if (!episode) return null;

  return (
    <div className="episode-overlay" ref={overlayRef}>
      {/* BACK ARROW — TOP RIGHT */}
      <button
        className="overlay-back"
        onClick={handleClose}
        aria-label="Back to gallery"
      >
        ←
      </button>

      {/* LEFT — IMAGE */}
      <div className="overlay-left">
        <img
          ref={imageRef}
          src={episode.image?.original}
          alt={episode.name}
        />
      </div>

      {/* RIGHT — TEXT */}
      <div className="overlay-right" ref={textRef}>
        <h2>{episode.name}</h2>

        <div
          className="overlay-summary"
          dangerouslySetInnerHTML={{ __html: episode.summary }}
        />

        <a
            href={episode.url}
            target="_blank"
            rel="noreferrer"
            className="overlay-link"
         >
  View on TVMaze →
</a>
      </div>
    </div>
  );
}
