import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from '../services/authService'; 

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      //using signIn from authservice
      await signIn(email, password);
      router.push('/dashboard'); 
    } catch (error) {
      handleFirebaseError(error.code); 
    }
  };

  //navigation
  const redirectToSignUp = () => {
    router.push('/signup');
  };

  //error handling
  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        setError("Invalid email format.");
        break;
      case 'auth/user-disabled':
        setError("This user has been disabled.");
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        setError("Invalid email or password.");
        break;
      default:
        setError("Please check your email and password");
        break;
    }
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <header style={{ backgroundColor: '#333', padding: '20px 0', color: 'white', textAlign: 'center', width: '100%', position: 'fixed', top: 0 }}>
        <h1 style={{ margin: '0' }}>ChatFusion Admin Panel</h1>
      </header>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, marginTop: '80px' }}>
        <h2 style={{ color: '#333' }}>Sign In</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }} onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            required
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginBottom: '10px' }}>Sign In</button>
          <button type="button" onClick={redirectToSignUp} style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Not an admin yet? Sign Up</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>} 
      </div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center', width: '100%' }}>
        <p style={{ margin: '0' }}>© 2024 ChatFusion.</p>
      </footer>
    </div>
  );
}
