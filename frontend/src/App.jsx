import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  const [editItem, setEditItem] = useState(null); 
  const [editForm, setEditForm] = useState({ name: "", description: "" });


  const fetchItems = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/items/");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Create
  const createItem = async () => {
    await axios.post("http://127.0.0.1:8000/api/items/", form);
    setForm({ name: "", description: "" });
    fetchItems();
  };

  // Update
  const updateItem = async () => {
    await axios.put(`http://127.0.0.1:8000/api/items/${editItem.id}/`, editForm);
    setEditItem(null);
    fetchItems();
  };

  // Delete
  const deleteItem = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`);
    fetchItems();
  };

  return (
    <div className="container">
      <h2>React + DRF CRUD (Table View)</h2>

      <div className="form-box">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="create-btn" onClick={createItem}>
          Add Item
        </button>
      </div>

      {/* Table */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditItem(item);
                    setEditForm({
                      name: item.name,
                      description: item.description,
                    });
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Item</h3>

            <input
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />

            <textarea
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
            />

            <button className="update-btn" onClick={updateItem}>
              Update
            </button>
            <button className="cancel-btn" onClick={() => setEditItem(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
