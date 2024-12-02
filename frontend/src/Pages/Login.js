import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Login successful:', data);
    
          // Store token in localStorage
          localStorage.setItem('token', data.token);
    
          // Redirect based on role
          if (data.role === 'admin') {
            navigate('/admin'); // Redirect to admin screen
          } else {
            navigate('/map'); // Redirect to map screen
          }
        } else {
          console.error('Login failed:', data.message || data.errors);
          alert(data.message || 'Failed to login');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('An error occurred. Please try again.');
      }
    };

    const handleSignUp = async () => {
      navigate('/signup')
    };
  
    return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            
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
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '15px' }}>
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
              <div style={{ marginBottom: '15px' }}>
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
                Login
              </button>
            </form>
            <button
                onClick={handleSignUp}
                style={{
                  
                    background: 'none',
                    color: '#007BFF',
                    border: 'none',
                    padding: '10px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '14px',
                  }}
            >
                Sign Up
            </button>
          </div>
        </div>
      );
}

export default Login;