// js/donations.js
import { requireAuth } from './auth.js';
import { renderHeader } from './nav.js';
import { db, storage } from './firebase-config.js';
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-storage.js";

(async ()=> {
  await requireAuth();
  renderHeader(document.getElementById('header'));

  const form = document.getElementById('donForm');
  const list = document.getElementById('donList');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const donor = document.getElementById('dDonor').value.trim();
    const amount = parseFloat(document.getElementById('dAmount').value || 0);
    const method = document.getElementById('dMethod').value;
    const file = document.getElementById('dReceipt').files[0];
    let receiptUrl = null;
    if (file) {
      const storageRef = sRef(storage, `receipts/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      receiptUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db,'donations'), { donor, amount, method, receiptUrl, createdAt: new Date() });
    form.reset();
  });

  onSnapshot(collection(db,'donations'), snap => {
    list.innerHTML = '';
    snap.docs.forEach(d => {
      const r = d.data();
      const node = document.createElement('div');
      node.className = 'card';
      node.style.marginBottom = '8px';
      node.innerHTML = `<div><strong>${escape(r.donor||'Anonymous')}</strong> — ${Number(r.amount||0).toFixed(2)}</div>
        <div class="small">${escape(r.method||'')}</div>
        ${r.receiptUrl ? `<div style="margin-top:6px"><a href="${r.receiptUrl}" target="_blank">View receipt</a></div>` : ''}`;
      list.appendChild(node);
    });
  });

  function escape(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
})();
