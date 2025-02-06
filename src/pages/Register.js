import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import Alert from '../components/Alert';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setAlert({
        type: 'error',
        message: 'Passwords do not match'
      });
      return;
    }

    try {
      await registerUser(email, password);
      setAlert({
        type: 'success',
        message: 'Registration successful! Please check your email for verification.'
      });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.message || 'Failed to register'
      });
    }
  };

  return (
    <div className="auth-container">
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)} 
        />
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <p>
          Already have an account? 
          <span onClick={() => navigate('/login')} className="auth-link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register; 