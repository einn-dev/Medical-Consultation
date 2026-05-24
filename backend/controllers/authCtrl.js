// Simple role-based login matching the frontend rolePermissions
// In a real system, you'd store users in MongoDB with hashed passwords.
// For your final project demo, this is clean and defensible.

const USERS = [
  { username: 'admin',       password: 'password', role: 'Administrator' },
  { username: 'doctor1',     password: 'password', role: 'Doctor'        },
  { username: 'receptionist',password: 'password', role: 'Receptionist'  },
  { username: 'cashier1',    password: 'password', role: 'Cashier'       },
];

const rolePermissions = {
  Administrator: ['dashboard','patients','doctors','appointments','consultations','medications','billing','referrals','reports'],
  Doctor:        ['dashboard','patients','appointments','consultations'],
  Receptionist:  ['dashboard','patients','appointments'],
  Cashier:       ['dashboard','billing'],
};

exports.login = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Please fill in all login fields' });
  }

  const user = USERS.find(
    u => u.username === username && u.password === password && u.role === role
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials or role' });
  }

  res.json({
    message:     `Welcome, ${user.role}!`,
    role:        user.role,
    permissions: rolePermissions[user.role],
  });
};
