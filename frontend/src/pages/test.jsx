// Examples on interacting with API endpoints
// POST to add a user.
// DELETE to remove a user.
// PUT to update a user's details.
// GET to retrieve a user's information.

import { useState } from "react";
import axios from "axios";

const Test = () => {
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/user/", { uid, email });
      console.log(response);
      setMessage("User added successfully!");
      setUid("");
      setEmail("");
    } catch (error) {
      setMessage("Error adding user: " + error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Please enter a user ID to delete.");
      return;
    }
    try {
      await axios.delete(`http://localhost:5001/api/user/${userId}`);
      setMessage("User deleted successfully!");
      setUserId("");
    } catch (error) {
      setMessage("Error deleting user: " + error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Please enter a user ID to update.");
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5001/api/user/${userId}`, { uid, email });
      console.log(response);
      setMessage("User updated successfully!");
      setUid("");
      setEmail("");
      setUserId("");
    } catch (error) {
      setMessage("Error updating user: " + error.message);
    }
  };

  const handleGet = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Please enter a user ID to retrieve.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5001/api/user/${userId}`);
      setUser([response.data]);
      console.log(user);
      setMessage("User retrieved successfully!");
    } catch (error) {
      setMessage("Error getting user: " + error.message);
    }
  };

  return (
    <>
      <h1>User Management</h1>

      {message && <p style={{ color: "blue", fontWeight: "bold" }}>{message}</p>}

      <section style={{ marginBottom: "20px" }}>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>UID: </label>
            <input type="text" value={uid} onChange={(e) => setUid(e.target.value)} required />
          </div>
          <div>
            <label>Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Add User</button>
        </form>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Update User</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label>User ID: </label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <div>
            <label>New UID: </label>
            <input type="text" value={uid} onChange={(e) => setUid(e.target.value)} required />
          </div>
          <div>
            <label>New Email: </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit">Update User</button>
        </form>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Delete User</h2>
        <form onSubmit={handleDelete}>
          <div>
            <label>User ID: </label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <button type="submit">Delete User</button>
        </form>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Get User</h2>
        <form onSubmit={handleGet}>
          <div>
            <label>User ID: </label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <button type="submit">Get User</button>
        </form>
      </section>
    </>
  );
};

export default Test;