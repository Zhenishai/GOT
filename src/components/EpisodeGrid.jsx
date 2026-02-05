import FavoriteButton from "./FavoriteButton";

export default function EpisodeGrid({ episodes, onSelect }) {
  return (
    <div className="grid-container">
      {episodes.map((ep) => (
        <div
          key={ep.id}
          className="grid-item"
          onClick={() => onSelect(ep)}
        >
          <img src={ep.image.medium} alt={ep.name} />

          <span className="episode-code">
            S{String(ep.season).padStart(2, "0")}
            E{String(ep.number).padStart(2, "0")}
          </span>

          <FavoriteButton episode={ep} />
        </div>
      ))}
    </div>
  );
}
