import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2jRScDgIf6H6EnDf7BYUlNjkyUi4ZGJw",
  authDomain: "getar-f1ed9.firebaseapp.com",
  projectId: "getar-f1ed9",
  storageBucket: "getar-f1ed9.appspot.com",
  messagingSenderId: "516703883176",
  appId: "1:516703883176:web:79aaf2117bc7e66fea179d",
  measurementId: "G-MBH7F1PY7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);