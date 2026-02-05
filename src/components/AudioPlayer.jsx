import { useEffect, useRef, useState } from "react";
import "../styles/audio.css";

export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true); 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
    audio.loop = true;
    audio.muted = muted;

    const playAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener("click", playAudio);
    };

    window.addEventListener("click", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
    };
  }, [muted]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/got-theme.mp3"
        preload="auto"
      />

      {/* MUTE BUTTON */}
      <button
        className="audio-toggle"
        onClick={toggleMute}
        aria-label="Toggle sound"
      >
        {muted ? "🔇" : "🔊"}
      </button>
    </>
  );
}
