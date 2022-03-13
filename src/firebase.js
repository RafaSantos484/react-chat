import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7QyNDFFHJh3k4Z0JycEcKHjbVeH3EJtA",
  authDomain: "react-chat-81fe0.firebaseapp.com",
  projectId: "react-chat-81fe0",
  storageBucket: "react-chat-81fe0.appspot.com",
  messagingSenderId: "511726385829",
  appId: "1:511726385829:web:e1d91d3820b1e8f9b76b4c",
  measurementId: "G-VKWBGJPCZT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createUser(userObj) {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      userObj.email,
      userObj.password
    );
    const user = res.user;
    addDoc(collection(db, "users"), { ...userObj, uid: user.uid }).catch(
      async (error) => {
        alert("entrou");
        await user.delete();
        throw error;
      }
    );
  } catch (error) {
    throw error;
  }
}

async function userExists(username) {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

async function getUserDoc(user) {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();

    return data;
  } catch (error) {
    throw error;
  }
}

export { app, auth, db, createUser, userExists, getUserDoc };
