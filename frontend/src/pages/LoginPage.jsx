import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authBg from '../assets/alishagram_auth_bg.png';
import { LogIn, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

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
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
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

        <h2 className="auth-title-large">WELCOME /<br/>BACK</h2>

        <form onSubmit={handleSubmit} className="auth-form-minimal" style={{ marginTop: '32px' }}>
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
