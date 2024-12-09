import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCUIeOec7ogGWAXX3LlKwN22qoD0A6O8Xw",
    authDomain: "sinhvienhoacuong.firebaseapp.com",
    projectId: "sinhvienhoacuong",
    storageBucket: "sinhvienhoacuong.firebasestorage.app",
    messagingSenderId: "436028962994",
    appId: "1:436028962994:web:97827346362ce86354b1ab"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
