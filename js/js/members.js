import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const form = document.getElementById('memberForm');
const tableBody = document.querySelector('#membersTable tbody');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  await addDoc(collection(db, 'members'), { name, email, phone });
  form.reset();
});

onSnapshot(collection(db, 'members'), (snapshot) => {
  tableBody.innerHTML = '';
  snapshot.forEach(doc => {
    const m = doc.data();
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${m.name}</td><td>${m.email}</td><td>${m.phone}</td>`;
    tableBody.appendChild(tr);
  });
});
