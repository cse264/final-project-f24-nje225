import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSignUp = async (e) => {
      e.preventDefault();
  
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match!');
        return;
      }

      // Need to access username, email, password here
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Registration successful:', data);
          navigate('/');
        } else {
          console.error('Registration failed:', data.message || data.errors);
          alert(data.message || 'Failed to register');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred. Please try again.');
      }
    };
  
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', // Full viewport height
        }}
      >
        <div
          style={{
            width: '400px',
            height: '300px',
            display: 'flex', // Add this
            flexDirection: 'column', // Stack elements vertically
            justifyContent: 'center', // Center vertically
            alignItems: 'center', // Center horizontally
            textAlign: 'center',
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            backgroundColor: '#F5F5DC',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1>Lehigh Loo Review</h1>
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '400px',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                placeholder="Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '400px',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '400px',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                placeholder="Confirm Password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {errorMessage && (
              <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
            )}
            <button
              type="submit"
              style={{
                padding: '10px',
                backgroundColor: '#2A5678',
                color: 'white',
                width: '200px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }

export default SignUp;