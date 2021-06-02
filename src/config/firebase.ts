import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCELZUvvnBQsxYfCb9Bl-p8QB3uQKuUWJc",
  authDomain: "first-firebase-4cd37.firebaseapp.com",
  projectId: "first-firebase-4cd37",
  storageBucket: "first-firebase-4cd37.appspot.com",
  messagingSenderId: "116369059692",
  appId: "1:116369059692:web:adb10ff3f756c51a520d49",
  measurementId: "G-6D5B5Q5L10",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;
