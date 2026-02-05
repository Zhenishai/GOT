import { db } from "./firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export async function saveQuizResult(uid, score, total) {
  const ref = doc(db, "users", uid, "quiz", "result");

  await setDoc(ref, {
    score,
    total,
    finishedAt: serverTimestamp()
  });
}

export async function getQuizResult(uid) {
  const ref = doc(db, "users", uid, "quiz", "result");
  const snap = await getDoc(ref);

  return snap.exists() ? snap.data() : null;
}
