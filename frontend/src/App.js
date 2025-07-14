import React, { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description: desc }),
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map(item => <li key={item.id}>{item.name}: {item.description}</li>)}
      </ul>
    </div>
  );
}

export default App;