import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};
const db = firebaseApp.firestore();

export { firebaseApp, providers, db };
