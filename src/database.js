import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function createUser(userObj) {
  const database = getFirestore();

  await setDoc(doc(database, "users", userObj.uid), userObj);
}

export async function userExists(username) {
  const database = getFirestore();
  const q = query(
    collection(database, "users"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  
  return !querySnapshot.empty;
}
