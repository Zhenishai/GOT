export default function EpisodeCard({ episode, onSelect }) {
  return (
    <div className="grid-item" onClick={onSelect}>
      <img
        src={episode.image?.medium}
        alt={episode.name}
        draggable={false}
      />
    </div>
  );
}
