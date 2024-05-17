// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqirNxC1VFkeGCiv5uNxaz5ixghohI5Ck",
  authDomain: "react-netflix-478e4.firebaseapp.com",
  projectId: "react-netflix-478e4",
  storageBucket: "react-netflix-478e4.appspot.com",
  messagingSenderId: "836987083220",
  appId: "1:836987083220:web:b5675e9a45be5510011e41",
  measurementId: "G-3YNSH5WJMW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(app);
// export default app;