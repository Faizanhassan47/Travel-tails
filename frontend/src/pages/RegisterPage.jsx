import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authBg from '../assets/alishagram_auth_bg.png';
import { UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'consumer' });
  const [error, setError] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Auto-hide error popup after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

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
      {/* Toast Popup Notification */}
      <AnimatePresence>
        {error && (
          <motion.div 
            className="auth-toast-popup"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <AlertCircle size={20} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="auth-visual-side">
        <img src={authBg} alt="Auth Background" />
        <div className="auth-vignette"></div>
      </div>

      <div className="auth-form-side">
        <div className="auth-card-minimal">
          <button onClick={() => navigate(-1)} className="minimal-back-btn">
            <ArrowLeft size={18} strokeWidth={3} />
            <span>Back</span>
          </button>

        <h2 className="auth-title-large">JOIN /<br/>COMMUNITY</h2>

        <form onSubmit={handleSubmit} className="auth-form-minimal" style={{ marginTop: '32px' }}>
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
             <select name="role" value={formData.role} onChange={handleChange} className="minimal-select">
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
