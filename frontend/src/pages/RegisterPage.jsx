import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'consumer' });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.name, formData.email, formData.password, formData.role);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
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
          <h1 className="title-giant">Create</h1>
        </div>

        <div className="auth-card-minimal">
          <button onClick={() => navigate(-1)} className="minimal-back-btn" style={{ marginBottom: '40px' }}>
            <ArrowLeft size={24} />
            <span>Back</span>
          </button>

        <h2 className="auth-title-large">Join /<br/>Community</h2>

        {error && <div className="minimal-error" style={{ marginBottom: '32px' }}>{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form-minimal">
          <div className="auth-input-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="auth-input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="auth-input-group">
             <label>Account Type</label>
             <select name="role" value={formData.role} onChange={handleChange} className="minimal-select" style={{ background: 'transparent', border: 'none', borderBottom: '2px solid #eee', padding: '16px 0', fontSize: '1.1rem', outline: 'none' }}>
                <option value="consumer">Consumer (Browse & Rate)</option>
                <option value="creator">Creator (Upload Photos)</option>
             </select>
          </div>

          <button type="submit" className="auth-submit-btn">
            CREATE INNER CIRCLE ACCOUNT
          </button>
        </form>

        <div className="auth-footer-minimal">
          Already a member? <Link to="/login">Sign in to your account</Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default RegisterPage;

