// js/nav.js
import { logoutAndRedirect } from './auth.js';

export function renderHeader(containerEl, title = 'Dashboard') {
  containerEl.innerHTML = `
    <header>
      <div class="header-inner container">
        <div><strong>High Throne</strong></div>
        <nav class="nav">
          <a href="dashboard.html">Dashboard</a>
          <a href="members.html">Members</a>
          <a href="events.html">Events</a>
          <a href="donations.html">Donations</a>
          <a href="sermons.html">Sermons</a>
          <a href="attendance.html">Attendance</a>
          <a href="groups.html">Groups</a>
          <a href="reports.html">Reports</a>
        </nav>
        <div><button id="signOutBtn" style="background:#ef4444;padding:6px 10px;border-radius:6px;color:white;border:0">Sign out</button></div>
      </div>
    </header>
  `;
  document.getElementById('signOutBtn').addEventListener('click', logoutAndRedirect);
}
