// js/sermons.js
import { requireAuth } from './auth.js';
import { renderHeader } from './nav.js';
import { db } from './firebase-config.js';
import { collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

(async ()=> {
  await requireAuth();
  renderHeader(document.getElementById('header'));

  const form = document.getElementById('sermonForm');
  const list = document.getElementById('sermonList');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('sTitle').value.trim();
    const preacher = document.getElementById('sPreacher').value.trim();
    const date = document.getElementById('sDate').value;
    const url = document.getElementById('sUrl').value.trim();
    if(!title) return alert('Title required');
    await addDoc(collection(db,'sermons'), { title, preacher, date, url, createdAt: new Date() });
    form.reset();
  });

  onSnapshot(collection(db,'sermons'), snap => {
    list.innerHTML = '';
    snap.docs.forEach(d => {
      const s = d.data();
      const node = document.createElement('div');
      node.className = 'card';
      node.style.marginBottom = '8px';
      node.innerHTML = `<strong>${escape(s.title)}</strong> — <span class="small">${escape(s.preacher||'')}</span>
        ${s.url ? `<div style="margin-top:6px"><a href="${s.url}" target="_blank">Play</a></div>` : ''}`;
      list.appendChild(node);
    });
  });

  function escape(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
})();
