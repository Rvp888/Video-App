
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjrfHlyYsNSWAKO2U451RyliqTm_c24xY",
  authDomain: "video-app-7d9fc.firebaseapp.com",
  projectId: "video-app-7d9fc",
  storageBucket: "video-app-7d9fc.appspot.com",
  messagingSenderId: "151769718520",
  appId: "1:151769718520:web:f468ac1b843e14f9d4650d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);