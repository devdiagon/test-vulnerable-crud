import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ full_name: '', military_rank: '', email: '', password: '' });

  useEffect(() => {
    fetch('http://localhost:8000/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h2>Add User (No validation/XSS possible)</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map(k => (
          <input key={k} placeholder={k} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>
      <h3>User List</h3>
      <ul>
        {users.map(u => (
          <li key={u.user_id}>
            <b dangerouslySetInnerHTML={{ __html: u.full_name }}></b> - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;