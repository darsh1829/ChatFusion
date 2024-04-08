import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState("");
  const [editedDisplayName, setEditedDisplayName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  //fetching all users
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/allUsers');
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //to delete a user
  const deleteUser = async (uid) => {
    if (window.confirm(`Are you sure you want to delete user ${uid}?`)) {
      try {
        const response = await fetch(`http://localhost:3000/deleteUser/${uid}`, { method: 'DELETE' });
        const data = await response.json();
        if (data.success) {
          alert(`User ${uid} deleted successfully.`);
          fetchUsers(); 
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user.");
      }
    }
  };
  
  // to edit a user
  const saveEdit = async (uid) => {
    try {
      //email check
      if (!editedEmail.trim()) {
        alert("Email cannot be empty.");
        return;
      }

      //email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(editedEmail)) {
        alert("Please enter a valid email address.");
        return;
      }

      const response = await fetch('http://localhost:3000/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          email: editedEmail,
          displayName: editedDisplayName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`User ${uid} updated successfully.`);
        setEditUserId(null); 
        fetchUsers(); 
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  };

  // enable/disable users
  const toggleUserStatus = async (uid, shouldBeDisabled) => {
    const action = shouldBeDisabled ? 'disable' : 'enable';
    if (window.confirm(`Are you sure you want to ${action} user ${uid}?`)) {
      try {
        const response = await fetch('http://localhost:3000/toggleUserStatus', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid: uid, disabled: shouldBeDisabled }),
        });
        const data = await response.json();
        if (data.success) {
          alert(`User ${uid} ${shouldBeDisabled ? 'disabled' : 'enabled'} successfully.`);
          fetchUsers(); 
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(`Error toggling user status to ${action}:`, error);
        alert(`Error toggling user status to ${action}.`);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ textAlign: 'left' }}>Manage Users</h1>
        <button onClick={() => router.push('/dashboard')} style={{ padding: '8px 16px', backgroundColor: '#808080', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Back to Dashboard</button>
      </div>
      <hr></hr>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>UID</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Display Name</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Last Sign-In Time</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Creation Time</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.uid}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {editUserId === user.uid ? (
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    style={{fontSize: '16px' }}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.uid}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {editUserId === user.uid ? (
                  <input
                    type="text"
                    value={editedDisplayName}
                    onChange={(e) => setEditedDisplayName(e.target.value)}
                    style={{ fontSize: '16px' }}
                  />
                ) : (
                  user.displayName || 'N/A'
                )}
              </td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.lastSignInTime}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.creationTime}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{user.disabled ? "Disabled" : "Enabled"}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                {editUserId === user.uid ? (
                  <div>
                  <button onClick={() => saveEdit(user.uid)} style={{ padding: '6px 12px', marginRight: '5px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Save</button>
                  <button onClick={() => setEditUserId(null)} style={{ padding: '6px 12px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => { setEditUserId(user.uid); setEditedEmail(user.email); setEditedDisplayName(user.displayName);}} style={{ padding: '6px 12px', marginRight: '5px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>Edit</button>
                    <button onClick={() => deleteUser(user.uid)} style={{ padding: '6px 12px', marginRight: '5px', fontSize: '16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>Delete</button>
                    <select
                      defaultValue={user.disabled ? "Disabled" : "Enabled"}
                      onChange={(e) => toggleUserStatus(user.uid, e.target.value === "Disabled")}
                      style={{ padding: '6px', marginRight: '5px', fontSize: '16px', backgroundColor: '#0070f3', color: 'white', border: '1px solid #0070f3', borderRadius: '4px' }}
                    >
                      <option value="Enabled" style={{ backgroundColor: '#4CAF50', color: 'white' }}>Enable</option>
                      <option value="Disabled" style={{ backgroundColor: '#f44336', color: 'white' }}>Disable</option>
                    </select>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
