import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4Dktf-x3fIBgtd_I1WnzLccZUcwNQpY8",
  authDomain: "vite-contact-d4dc8.firebaseapp.com",
  projectId: "vite-contact-d4dc8",
  storageBucket: "vite-contact-d4dc8.firebasestorage.app",
  messagingSenderId: "483753362886",
  appId: "1:483753362886:web:c292f7825225ea51239ec7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);