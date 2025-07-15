import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const [userForm, setUserForm] = useState({ full_name: '', military_rank: '', email: '', password: '' });
  const [catForm, setCatForm] = useState({ category_name: '', description: '' });
  const [itemForm, setItemForm] = useState({ item_name: '', description: '', category_id: '', current_quantity: 0 });

const [editUser, setEditUser] = useState(null);
const [editCategory, setEditCategory] = useState(null);
const [editItem, setEditItem] = useState(null);

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
      <h2>Agregar Usuario</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('users', userForm); }}>
        {Object.keys(userForm).map(k => (
          <input key={k} placeholder={k} value={userForm[k]} onChange={e => setUserForm({ ...userForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h2>Agregar Categoría</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('categories', catForm); }}>
        {Object.keys(catForm).map(k => (
          <input key={k} placeholder={k} value={catForm[k]} onChange={e => setCatForm({ ...catForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h2>Agregar Item</h2>
      <form onSubmit={e => { e.preventDefault(); submitForm('items', itemForm); }}>
        {Object.keys(itemForm).map(k => (
          <input key={k} placeholder={k} value={itemForm[k]} onChange={e => setItemForm({ ...itemForm, [k]: e.target.value })} />
        ))}
        <button type="submit">Add</button>
      </form>

      <h3>Usuarios</h3>
      <ul>{users.map(u => (
        <li key={u.user_id}>
          <span dangerouslySetInnerHTML={{ __html: u.full_name }} /> - {u.email}
          <button onClick={() => {
            const { password_nohash, ...rest } = u;
            setEditUser({ ...rest, password: password_nohash });
          }}>Editar</button>
          <button onClick={() => deleteEntry('users', u.user_id)}>Eliminar</button>
        </li>
      ))}</ul>

      {editUser && (
        <form onSubmit={e => {
          e.preventDefault();
          fetch(`http://localhost:8000/users/${editUser.user_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editUser),
          }).then(() => {
            window.location.reload();
          });
        }}>
          <h3>Editando usuario: {editUser.full_name}</h3>
          {Object.keys(editUser).map(k => (
            k !== "user_id" && (
              <input key={k} placeholder={k} value={editUser[k]} onChange={e => setEditUser({ ...editUser, [k]: e.target.value })} />
            )
          ))}
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditUser(null)}>Cancelar</button>
        </form>
      )}



      <h3>Categorias</h3>
      <ul>{categories.map(c => (
        <li key={c.category_id}>
          {c.category_name}: {c.description}
          <button onClick={() => setEditCategory(c)}>Editar</button>
          <button onClick={() => deleteEntry('categories', c.category_id)}>Eliminar</button>
        </li>
      ))}</ul>


      {editCategory && (
        <form onSubmit={e => {
          e.preventDefault();
          fetch(`http://localhost:8000/categories/${editCategory.category_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editCategory),
          }).then(() => window.location.reload());
        }}>
          <h3>Editando categoría: {editCategory.category_name}</h3>
          {Object.keys(editCategory).map(k => (
            k !== "category_id" && (
              <input
                key={k}
                placeholder={k}
                value={editCategory[k]}
                onChange={e => setEditCategory({ ...editCategory, [k]: e.target.value })}
              />
            )
          ))}
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditCategory(null)}>Cancelar</button>
        </form>
      )}

      <h3>Items</h3>
      <ul>{items.map(i => (
        <li key={i.item_id}>
          {i.item_name} (qty: {i.current_quantity}) - {i.description}
           <button onClick={() => setEditItem(i)}>Editar</button>
          <button onClick={() => deleteEntry('items', i.item_id)}>Eliminar</button>
        </li>
      ))}</ul>

      {editItem && (
        <form onSubmit={e => {
          e.preventDefault();
          fetch(`http://localhost:8000/items/${editItem.item_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editItem),
          }).then(() => window.location.reload());
        }}>
          <h3>Editando ítem: {editItem.item_name}</h3>
          {Object.keys(editItem).map(k => (
            k !== "item_id" && (
              <input
                key={k}
                placeholder={k}
                value={editItem[k]}
                onChange={e => setEditItem({ ...editItem, [k]: e.target.value })}
              />
            )
          ))}
          <button type="submit">Actualizar</button>
          <button type="button" onClick={() => setEditItem(null)}>Cancelar</button>
        </form>
      )}
    </div>
  );
}

export default App;
