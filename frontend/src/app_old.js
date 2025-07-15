import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [userForm, setUserForm] = useState({ full_name: '', military_rank: '', email: '', password: '' });
  const [catForm, setCatForm] = useState({ category_name: '', description: '' });
  const [itemForm, setItemForm] = useState({ item_name: '', description: '', category_id: '', current_quantity: 0 });

  useEffect(() => {
    fetch('http://localhost:8000/users').then(res => res.json()).then(setUsers);
    fetch('http://localhost:8000/categories').then(res => res.json()).then(setCategories);
    fetch('http://localhost:8000/items').then(res => res.json()).then(setItems);
  }, []);

  const submitForm = (path, data) => {
    fetch(`http://localhost:8000/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(() => window.location.reload());
  };

  const deleteEntry = (path, id) => {
    fetch(`http://localhost:8000/${path}/${id}`, { method: 'DELETE' }).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Add User</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('users', userForm); }}>
        {Object.keys(userForm).map(k => (
          <input key={k} placeholder={k} value={userForm[k]} onChange={e => setUserForm({ ...userForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h2>Add Category</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('categories', catForm); }}>
        {Object.keys(catForm).map(k => (
          <input key={k} placeholder={k} value={catForm[k]} onChange={e => setCatForm({ ...catForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h2>Add Item</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('items', itemForm); }}>
        {Object.keys(itemForm).map(k => (
          <input key={k} placeholder={k} value={itemForm[k]} onChange={e => setItemForm({ ...itemForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h3>Users</h3>
      <ul>{users.map(u => (
        <li key={u.user_id}>
          <span dangerouslySetInnerHTML={{ __html: u.full_name }} /> - {u.email}
          <button onClick={() => deleteEntry('users', u.user_id)}>Delete</button>
        </li>
      ))}</ul>

      <h3>Categories</h3>
      <ul>{categories.map(c => (
        <li key={c.category_id}>
          {c.category_name}: {c.description}
          <button onClick={() => deleteEntry('categories', c.category_id)}>Delete</button>
        </li>
      ))}</ul>

      <h3>Items</h3>
      <ul>{items.map(i => (
        <li key={i.item_id}>
          {i.item_name} (qty: {i.current_quantity}) - {i.description}
          <button onClick={() => deleteEntry('items', i.item_id)}>Delete</button>
        </li>
      ))}</ul>
    </div>
  );
}

export default App;
