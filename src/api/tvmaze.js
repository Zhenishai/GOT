export default async function fetchEpisodes() {
  const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
  return res.json();
}