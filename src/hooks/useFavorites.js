import { useEffect, useState } from "react";
import { getFavorites } from "../auth/favorites";
import { useAuth } from "../context/useAuth";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;

    getFavorites(user.uid).then((data) => {
      setFavorites(data);
    });
  }, [user]);

  const isFavorite = (episodeId) =>
    favorites.some((f) => f.episodeId === episodeId);

  return {
    favorites,
    setFavorites,
    isFavorite
  };
}
