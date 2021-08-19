import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyAKOIqr-HHHwtz2BY6yYkUuCGNZWoUFzUg",
  authDomain: "todo-app-2b873.firebaseapp.com",
  projectId: "todo-app-2b873",
  storageBucket: "todo-app-2b873.appspot.com",
  messagingSenderId: "943536017740",
  appId: "1:943536017740:web:9ad25efd6993602fb8bfe9"
}).auth();


export const db = firebase.firestore();
