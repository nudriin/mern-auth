// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import "dotenv/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${import.meta.env.FIREBASE_API_KEY}`, // import dari dotenv
    authDomain: "mern-auth-5a53c.firebaseapp.com",
    projectId: "mern-auth-5a53c",
    storageBucket: "mern-auth-5a53c.appspot.com",
    messagingSenderId: "921031839392",
    appId: "1:921031839392:web:f7e710413ae329d39ec3c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);