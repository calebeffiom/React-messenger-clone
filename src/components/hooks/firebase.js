// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { getDatabase, ref, set, get,child, update } from "firebase/database";
import { getFirestore, collection, query, where, doc, setDoc, getDocs, getDoc, updateDoc, arrayUnion } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHXppeXDCVEgKPuLgTforT_awUyqOG118",
  authDomain: "fir-chat-ac139.firebaseapp.com",
  databaseURL: "https://fir-chat-ac139-default-rtdb.firebaseio.com",
  projectId: "fir-chat-ac139",
  storageBucket: "fir-chat-ac139.appspot.com",
  messagingSenderId: "202688867394",
  appId: "1:202688867394:web:fc7df14b3cd15e511291db",
  measurementId: "G-H2WELSZTHG"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const createUser = createUserWithEmailAndPassword;
const signInUser = signInWithEmailAndPassword;
const rdb = getDatabase();
const fdb = getFirestore(app);

export { rdb, auth, fdb, createUser, signInUser, ref, set, get, child, update, doc, setDoc, collection, query, where, getDocs, getDoc, updateDoc, arrayUnion }
