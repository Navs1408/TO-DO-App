import { useState } from 'react';

export default function Login({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  async function handleLogin() {
    setError('');
    if (!userName || !password) { setError('Please enter both fields'); return; }

    try {
      const res  = await fetch('http://127.0.0.1:8000/api/login/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ user_name: userName, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('access', data.access);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Could not connect to server. Is Django running?');
    }
  }

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', background:'#f0f2f5' }}>
      <div style={{ background:'white', padding:'2rem', borderRadius:'10px', width:'320px', boxShadow:'0 2px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom:'1.5rem' }}>Login</h2>
        <input
          style={{ width:'100%', padding:'0.6rem', marginBottom:'1rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          style={{ width:'100%', padding:'0.6rem', marginBottom:'1rem', border:'1px solid #ddd', borderRadius:'6px', boxSizing:'border-box', display:'block' }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ width:'100%', padding:'0.7rem', background:'#4f46e5', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'1rem' }}
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p style={{ color:'red', marginTop:'0.5rem' }}>{error}</p>}
      </div>
    </div>
  );
}