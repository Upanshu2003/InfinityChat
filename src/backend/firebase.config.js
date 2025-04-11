import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6oPP6lxTonOBgihRQnRAo41fz4d-Z1lI",
  authDomain: "infinitychat-62592.firebaseapp.com",
  projectId: "infinitychat-62592",
  storageBucket: "infinitychat-62592.firebasestorage.app",
  messagingSenderId: "832895917189",
  appId: "1:832895917189:web:647ac5df481ea5e89a1dec",
  measurementId: "G-JCC5RXD3SW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };