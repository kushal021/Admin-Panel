import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2y8RD2eAlxef2pjzh6yaaEqDoOOSdLlc",
  authDomain: "admin-panel-2161.firebaseapp.com",
  projectId: "admin-panel-2161",
  storageBucket: "admin-panel-2161.appspot.com",
  messagingSenderId: "428290628061",
  appId: "1:428290628061:web:db172bd906616766abfe34",
  measurementId: "G-WZC4SCVD03",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
export { db, auth, storage };
