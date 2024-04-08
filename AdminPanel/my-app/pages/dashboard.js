import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      const response = await fetch("http://localhost:3000/totalUsers");
      const data = await response.json();
      setTotalUsers(data.total);
    };

    fetchTotalUsers();
  }, []);

  //navigation
  const manageUsers = () => {
    router.push('/manageUsers'); 
  };

  const handleSignOut = () => {
    router.push('/signin');
  };

  const addNewUser = () => {
    router.push('/addUser'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
        }
      `}</style>
      <header style={{ backgroundColor: '#333', padding: '20px 0', color: 'white', textAlign: 'center', width: '100%', position: 'fixed', top: 0, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>ChatFusion Admin Panel</h1>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, marginTop: '80px' }}>
        <h2 style={{ color: '#333', fontSize: '50px', marginBottom: '20px' }}>Dashboard</h2>
        <div style={{ marginBottom: '20px', fontSize:'22px', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Total Users: {totalUsers}</div>
        <button onClick={addNewUser} style={{ width: '200px', padding: '12px 0', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>Add a New User</button>
        <button onClick={manageUsers} style={{ width: '200px', padding: '12px 0', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginBottom: '10px' }}>Manage Users</button>
        <button onClick={handleSignOut} style={{ width: '200px', padding: '12px 0', backgroundColor: '#ff0000', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>Sign Out</button>
      </div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center', width: '100%', boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.2)' }}>
        <p style={{ margin: '0' }}>© 2024 ChatFusion.</p>
      </footer>
    </div>
  );
}
