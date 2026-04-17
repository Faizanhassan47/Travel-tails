import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="kreativ-auth">
      <div className="auth-visual-side">
        <img src="/src/assets/alishagram_auth_bg.png" alt="Auth Background" />
        <div className="auth-vignette"></div>
      </div>

      <div className="auth-form-side">
        <div className="auth-header-minimal">
          <h1 className="title-giant">Access</h1>
        </div>

        <div className="auth-card-minimal">
          <button onClick={() => navigate(-1)} className="minimal-back-btn" style={{ marginBottom: '40px' }}>
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>

        <h2 className="auth-title-large">Welcome /<br/>Back</h2>

        {error && <div className="minimal-error" style={{ marginBottom: '32px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form-minimal">
          <div className="auth-input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="auth-input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-submit-btn">
             PROCEED TO JOURNEY
          </button>
        </form>

        <div className="auth-footer-minimal">
          New to Alishagram? <Link to="/register">Create inner circle account</Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

