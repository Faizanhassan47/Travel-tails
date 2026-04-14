import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

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
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Join TripLens</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Become a part of our global traveler community.</p>
        </div>

        {error && (
          <div style={{ 
            background: 'rgba(244, 63, 94, 0.1)', 
            color: 'var(--danger)', 
            padding: '12px', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '20px', 
            textAlign: 'center',
            fontSize: '0.9rem',
            border: '1px solid rgba(244, 63, 94, 0.2)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="form-group">
             <label className="form-label">Account Type</label>
             <select name="role" className="form-input" value={formData.role} onChange={handleChange} style={{ appearance: 'none', cursor: 'pointer' }}>
                <option value="consumer">Consumer (Browse & Rate)</option>
                <option value="creator">Creator (Upload Photos)</option>
             </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
            <UserPlus size={20} /> Create Free Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
