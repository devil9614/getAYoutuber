import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA2jRScDgIf6H6EnDf7BYUlNjkyUi4ZGJw",
  authDomain: "getar-f1ed9.firebaseapp.com",
  projectId: "getar-f1ed9",
  storageBucket: "getar-f1ed9.appspot.com",
  messagingSenderId: "516703883176",
  appId: "1:516703883176:web:79aaf2117bc7e66fea179d",
  measurementId: "G-MBH7F1PY7J"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     const user = res.user;
//     await db.collection("users").add({
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
export {
  auth,
//   signInWithGoogle,
  signInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
}