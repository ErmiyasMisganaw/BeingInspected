// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE6sdj_Jx2j2F-NOnUbGiQ320z8sWrxBo",
  authDomain: "inspectit-cdb8f.firebaseapp.com",
  projectId: "inspectit-cdb8f",
  storageBucket: "inspectit-cdb8f.firebasestorage.app",
  messagingSenderId: "10334045692",
  appId: "1:10334045692:web:f1e3d4b07c6dffd0725e79",
  measurementId: "G-LENJY97453"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);