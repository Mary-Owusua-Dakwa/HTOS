import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
