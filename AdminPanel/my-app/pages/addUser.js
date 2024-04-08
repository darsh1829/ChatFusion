import React, { useState } from "react";
import { useRouter } from 'next/router';

export default function AddUserPage() {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const router = useRouter();

  const addUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newUserEmail, password: newUserPassword, displayName: displayName }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`User created successfully: ${data.uid}`);
        //clearing the fields
        setNewUserEmail('');
        setNewUserPassword('');
        setDisplayName('');
      } else {
        throw new Error(`Failed to create user: ${data.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message);
    }
  };
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New User</h1>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ marginRight: '10px', fontSize: '16px' }}>Email:</span>
        <input
          type="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
          placeholder="Email"
          style={{ flex: '1', padding: '8px', fontSize: '16px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ marginRight: '10px', fontSize: '16px' }}>Password:</span>
        <input
          type="password"
          value={newUserPassword}
          onChange={(e) => setNewUserPassword(e.target.value)}
          placeholder="Password"
          style={{ flex: '1', padding: '8px', fontSize: '16px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ marginRight: '10px', fontSize: '16px' }}>Display Name:</span>
        <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
        style={{ flex: '1', padding: '8px', fontSize: '16px' }}
        />
      </div>
      <button onClick={addUser} style={{ width: '100%', padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Add User</button>
      <br></br><br></br>
      <button onClick={() => router.push('/dashboard')} style={{ width: '100%', padding: '10px', backgroundColor: '#808080', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Back to Dashboard</button>
    </div>
  );
}
