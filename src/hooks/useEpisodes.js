import { useEffect, useState } from "react";
import fetchEpisodes from "../api/tvmaze";


export function useEpisodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetchEpisodes().then(setEpisodes);
  }, []);

  return episodes;
}
