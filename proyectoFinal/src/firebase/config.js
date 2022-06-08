// Import the functions you need from the SDKs you need
import app from 'firebase/app'
import firebase from 'firebase'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDd6FtjzbAZxudBvOKlu9e8gZozAX-thc0",
  authDomain: "proyecto-reactnative-3.firebaseapp.com",
  projectId: "proyecto-reactnative-3",
  storageBucket: "proyecto-reactnative-3.appspot.com",
  messagingSenderId: "792737020165",
  appId: "1:792737020165:web:7595532e790e326135df6c"
};

// Initialize Firebase
app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()

