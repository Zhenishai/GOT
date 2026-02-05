import { useState, useEffect } from "react";
import EpisodeGrid from "../components/EpisodeGrid";
import EpisodeOverlay from "../components/EpisodeOverlay";
import { useEpisodes } from "../hooks/useEpisodes";
import "../styles/gallery.css";

export default function Episodes() {
  const episodes = useEpisodes();
  const [activeEpisode, setActiveEpisode] = useState(null);

  useEffect(() => {
    document.dispatchEvent(new Event("click"));
  }, []);

  return (
    <section className="episodes-page">
      {/* ===== TITLE ===== */}
      <header className="episodes-header">
        <h1>Episodes Archive</h1>
        <p>Every story, every battle, every betrayal</p>
      </header>

      {/* ===== GALLERY ===== */}
      <div className="gallery-page">
        <EpisodeGrid
          episodes={episodes}
          onSelect={setActiveEpisode}
        />

        <EpisodeOverlay
          episode={activeEpisode}
          onClose={() => setActiveEpisode(null)}
        />
      </div>
    </section>
  );
}
