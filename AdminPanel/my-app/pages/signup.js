import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signUp } from '../services/authService'; 

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
        //using signUp from authservice
      await signUp(email, password, secretCode);
      alert("Sign-up successful! You'll be redirected to the sign-in page");
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } catch (error) {
        handleFirebaseError(error);
    }
  };

  //navigation
  const redirectToSignIn = () => {
    router.push('/signin');
  };

  //error handling
  const handleFirebaseError = (error) => {
    console.log(error.code)
    console.log(error.message)

    if (error.message.includes('401')) {
        setError("Invalid secret code.");
    }
    else{
        switch (error.code) {
        case 'auth/invalid-email':
            setError("Invalid email format.");
            break;
        case 'auth/email-already-in-use':
            setError("Email is already in use.");
            break;
        case 'auth/weak-password':
            setError("Password is too weak.");
            break;
        default:
            setError("An error occurred. Please try again later.");
            break;
        }
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
        <h2 style={{ color: '#333' }}>Sign Up</h2>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }} onSubmit={handleSignUp}>
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
          <input
            type="password"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value)}
            placeholder="Secret Code"
            style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
            required
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginBottom: '10px' }}>Sign Up</button>
          <button type="button" onClick={redirectToSignIn} style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Already an admin? Sign In</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center', width: '100%' }}>
        <p style={{ margin: '0' }}>© 2024 ChatFusion.</p>
      </footer>
    </div>
  );
}
