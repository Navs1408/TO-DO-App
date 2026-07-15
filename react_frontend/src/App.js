import { useState } from 'react';
import Login from './Login';
import Todos from './Todos';

export default function App() {
  const savedUser = localStorage.getItem('user');
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return user
    ? <Todos user={user} onLogout={handleLogout} />
    : <Login onLogin={handleLogin} />;
}