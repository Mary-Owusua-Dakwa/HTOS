// js/firebase-config.js
// Firebase modular SDK config + exports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxRdQ7zS_IYF1mhKhkZ05oFPs3CW7FYHM",
  authDomain: "high-throne-of-sanctory.firebaseapp.com",
  databaseURL: "https://high-throne-of-sanctory-default-rtdb.firebaseio.com",
  projectId: "high-throne-of-sanctory",
  storageBucket: "high-throne-of-sanctory.firebasestorage.app",
  messagingSenderId: "648629578383",
  appId: "1:648629578383:web:bd58e75415a2275c1a5efa",
  measurementId: "G-RZGX95DL0V"
};

const app = initializeApp(firebaseConfig);
try { getAnalytics(app); } catch (e) { /* analytics may fail in dev */ }

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
