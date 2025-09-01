import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//     apiKey:import.meta.env.VITE_API_KEY,
//     authDomain:import.meta.env.VITE_AUTH_DOMAIN,
//     projectId:import.meta.env.VITE_PROJECT_ID,
//     storageBucket:import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId:import.meta.env.VITE_MESSAGING_SENDER_ID,
//     appId:import.meta.env.VITE_APP_ID
// };
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtbE2DG9gfqM3C4WQLA3RB4gOWYpC-RrY",
  authDomain: "doctore-appointment-system.firebaseapp.com",
  projectId: "doctore-appointment-system",
  storageBucket: "doctore-appointment-system.firebasestorage.app",
  messagingSenderId: "796274188198",
  appId: "1:796274188198:web:1147446c740e262df93967"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);