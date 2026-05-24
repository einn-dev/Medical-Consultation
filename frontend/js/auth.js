// ============================================================
//  auth.js — Login, Logout, Role-Based Access Control
//  Connects to backend POST /api/auth/login
// ============================================================

const API = 'http://localhost:3000/api';

// Tracks the currently logged-in role across the session
let currentActiveRole = '';

// Role → which nav tabs are visible
// Must match rolePermissions in backend/controllers/authCtrl.js
const rolePermissions = {
  Administrator: ['dashboard','patients','doctors','appointments','consultations','medications','billing','referrals','reports'],
  Doctor:        ['dashboard','patients','appointments','consultations'],
  Receptionist:  ['dashboard','patients','appointments'],
  Cashier:       ['dashboard','billing'],
};

// ── LOGIN ─────────────────────────────────────────────────────
async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const role     = document.getElementById('role').value;

  if (!username || !password || !role) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const res  = await fetch(`${API}/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ username, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      // Backend returned 401 or 400
      alert(data.error || 'Login failed. Check your credentials.');
      return;
    }

    // ── Login success ──
    currentActiveRole = data.role;

    // Show the role badge in the sidebar
    document.getElementById('userDisplayRole').innerText = data.role;

    // Show main system, hide login page
    document.getElementById('loginPage').style.display  = 'none';
    document.getElementById('mainSystem').style.display = 'flex';

    // Apply role-based nav restrictions
    applyRoleSecurity(data.role);

    // Load dashboard counts from backend
    loadDashboardCounts();

  } catch (err) {
    alert('Cannot connect to server. Make sure the backend is running on port 3000.');
    console.error(err);
  }
}

// ── LOGOUT ────────────────────────────────────────────────────
function logout() {
  alert('Logged Out Successfully!');

  currentActiveRole = '';

  document.getElementById('mainSystem').style.display = 'none';
  document.getElementById('loginPage').style.display  = 'flex';

  // Clear login form
  document.getElementById('username').value  = '';
  document.getElementById('password').value  = '';
  document.getElementById('role').value = '';
}

// ── ROLE SECURITY ─────────────────────────────────────────────
// Hides nav items the current role is not allowed to see
function applyRoleSecurity(role) {
  const allowed    = rolePermissions[role] || ['dashboard'];
  const allNavItems = document.querySelectorAll('.nav-item');

  allNavItems.forEach(nav => {
    const moduleKey = nav.id.replace('nav-', '');
    nav.style.display = allowed.includes(moduleKey) ? 'flex' : 'none';
  });
}

// ── ALLOW TAB SWITCH CHECK ────────────────────────────────────
// Called by ui.js switchTab() to guard restricted sections
function isAllowed(sectionKey) {
  if (!currentActiveRole) return false;
  return (rolePermissions[currentActiveRole] || []).includes(sectionKey);
}

// ── ALLOW LOGIN WITH ENTER KEY ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('password').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') login();
  });
});
