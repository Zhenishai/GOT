import { addFavorite, removeFavorite } from "../auth/favorites";
import { useAuth } from "../context/useAuth";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoriteButton({ episode }) {
  const { user } = useAuth();
  const { setFavorites, isFavorite } = useFavorites();

  if (!user) return null;

  const liked = isFavorite(episode.id);

  const toggleFavorite = async () => {
    if (liked) {
      await removeFavorite(user.uid, episode.id);
      setFavorites((prev) =>
        prev.filter((f) => f.episodeId !== episode.id)
      );
    } else {
      await addFavorite(user.uid, episode);
      setFavorites((prev) => [
        ...prev,
        { episodeId: episode.id }
      ]);
    }
  };

  return (
    <button
      className={`fav-btn ${liked ? "liked" : ""}`}
      onClick={toggleFavorite}
      aria-label="Toggle favorite"
    >
      ♥
    </button>
  );
}
