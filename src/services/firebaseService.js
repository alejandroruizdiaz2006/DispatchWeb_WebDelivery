import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5oBGpFc7xiHclPQO5CqqlTp-wnzGGwdg",
  authDomain: "dispatch-web-ard.firebaseapp.com",
  projectId: "dispatch-web-ard",
  storageBucket: "dispatch-web-ard.firebasestorage.app",
  messagingSenderId: "339941422712",
  appId: "1:339941422712:web:a5383c3a793869416a1f8d",
  measurementId: "G-F18DYDRQ5K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const getCharacters = async () => {
  const querySnapshot = await getDocs(collection(db, "characters"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCharacter = async (characterData) => {
  const docRef = await addDoc(collection(db, "characters"), characterData);
  return docRef.id;
};