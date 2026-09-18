import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DB, formatRupiah } from '../data/db';
import { LogIn, User } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(userId, password)) {
      navigate('/');
    } else {
      setError('User ID atau Password salah!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <User size={40} color="#4361ee" />
        </div>
        <h1>Sewa Kebaya</h1>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Masukkan User ID" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Masukkan Password" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <LogIn size={18} /> Login
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
        <p className="hint">Default: admin / admin</p>
      </div>
    </div>
  );
};

export default Login;
