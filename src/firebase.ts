import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

// Replace these with your real Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCYjZ32Sdo_RFW0rc6krVpnJJSmkbTkoys",
  authDomain: "techsuccession-2e132.firebaseapp.com",
  projectId: "techsuccession-2e132",
  storageBucket: "techsuccession-2e132.firebasestorage.app",
  messagingSenderId: "738144638883",
  appId: "1:738144638883:web:0c899c18883ad0afceec16",
  measurementId: "G-CHT9G8GMFH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const trackEvent = (eventName: string, params?: object) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};
