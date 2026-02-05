import { db } from "./firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp
} from "firebase/firestore";

export async function addFavorite(userId, episode) {
  const favRef = doc(
    db,
    "users",
    userId,
    "favorites",
    String(episode.id)
  );

  await setDoc(favRef, {
    episodeId: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
    code: `S${String(episode.season).padStart(2, "0")}E${String(
      episode.number
    ).padStart(2, "0")}`,
    image: episode.image?.medium || null,
    url: episode.url,
    createdAt: serverTimestamp()
  });
}

export async function removeFavorite(userId, episodeId) {
  const favRef = doc(
    db,
    "users",
    userId,
    "favorites",
    String(episodeId)
  );

  await deleteDoc(favRef);
}

export async function getFavorites(userId) {
  const snap = await getDocs(
    collection(db, "users", userId, "favorites")
  );

  return snap.docs.map((doc) => doc.data());
}
