import firebase from "firebase/App";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

export const firebaseApp = firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGE_APP_ID,
  appId: process.env.VUE_APP_MESSAGE_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
});
